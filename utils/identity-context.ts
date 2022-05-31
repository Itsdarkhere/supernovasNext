import { useState } from "react";
import { Observable, Subject } from "rxjs";
import { v4 as uuid } from "uuid";

// Requests that were sent before the iframe initialized
let pendingRequests = [];

// All outbound request promises we still need to resolve
let outboundRequests = {};

// The currently active identity window
let identityWindow;
let identityWindowSubject;

// The URL of the identity service
let identityServiceURL: string;
export let sanitizedIdentityServiceURL;

// User data
export let identityServiceUsers;
export let identityServicePublicKeyAdded: string;

let initialized = false;
let iframe = null;

// Wait for storageGranted broadcast
export let storageGranted = new Subject();

// Using testnet or mainnet
let isTestnet = false;

export function setIsTestNet(testNet: boolean) {
  isTestnet = testNet;
}

export function setIdentityServiceURL(url: string) {
  identityServiceURL = url;
}
export function setSanitizedIdentityServiceURL(sanitizedURL: string) {
  sanitizedIdentityServiceURL = sanitizedURL;
}

export function setIdentityServiceUsersVariable(users: any) {
  identityServiceUsers = users;
}
export function setIdentityServicePKAddedVariable(publicKeyAdded?: string) {
  identityServicePublicKeyAdded = publicKeyAdded;
}

// Launch a new identity window

export function launch(
  path?: string,
  params?: {
    publicKey?: string;
    tx?: string;
    referralCode?: string;
    public_key?: string;
    hideJumio?: boolean;
    accessLevelRequest?: number;
  }
): Observable<any> {
  let url = identityServiceURL as string;
  if (path) {
    url += path;
  }
  // CHECK WORKS
  let httpParams = new URLSearchParams();
  if (isTestnet) {
    httpParams.append("testnet", "true");
  }

  if (params?.publicKey) {
    httpParams.append("publicKey", params.publicKey);
  }

  if (params?.tx) {
    httpParams.append("tx", params.tx);
  }

  if (params?.referralCode) {
    httpParams.append("referralCode", params.referralCode);
  }

  if (params?.public_key) {
    httpParams.append("public_key", params.public_key);
  }

  if (params?.hideJumio) {
    httpParams.append("hideJumio", params.hideJumio.toString());
  }

  if (params?.accessLevelRequest) {
    httpParams.append(
      "accessLevelRequest",
      params.accessLevelRequest.toString()
    );
  }

  const paramsStr = httpParams.toString();
  if (paramsStr) {
    url += `?${paramsStr}`;
  }

  // center the window
  const h = 1000;
  const w = 800;
  const y = window.outerHeight / 2 + window.screenY - h / 2;
  const x = window.outerWidth / 2 + window.screenX - w / 2;

  identityWindow = window.open(
    url,
    null,
    `toolbar=no, width=${w}, height=${h}, top=${y}, left=${x}`
  );
  identityWindowSubject = new Subject();

  return identityWindowSubject;
}

// Outgoing messages

export function burn(payload: {
  accessLevel: number;
  accessLevelHmac: string;
  encryptedSeedHex: string;
  unsignedHashes: string[];
}): Observable<any> {
  return send("burn", payload);
}

export function signETH(payload: {
  accessLevel: number;
  accessLevelHmac: string;
  encryptedSeedHex: string;
  unsignedHashes: string[];
}): Observable<any> {
  return send("signETH", payload);
}

export function sign(payload: {
  accessLevel: number;
  accessLevelHmac: string;
  encryptedSeedHex: string;
  transactionHex: string;
}): Observable<any> {
  return send("sign", payload);
}

export function encrypt(payload: {
  accessLevel: number;
  accessLevelHmac: string;
  encryptedSeedHex: string;
  recipientPublicKey: string;
  message: string;
}): Observable<any> {
  return send("encrypt", payload);
}

export function decrypt(payload: {
  accessLevel: number;
  accessLevelHmac: string;
  encryptedSeedHex: string;
  encryptedMessages: any;
}): Observable<any> {
  return send("decrypt", payload);
}

export function jwt(payload: {
  accessLevel: number;
  accessLevelHmac: string;
  encryptedSeedHex: string;
}): Observable<any> {
  return send("jwt", payload);
}

export function info(): Observable<any> {
  return send("info", {});
}

export function launchPhoneNumberVerification(
  public_key: string
): Observable<{ phoneNumberSuccess: boolean }> {
  return launch("/verify-phone-number", {
    public_key,
  });
}

// Helpers

export function identityServiceParamsForKey(publicKey: string) {
  const { encryptedSeedHex, accessLevel, accessLevelHmac } =
    identityServiceUsers[publicKey];
  return { encryptedSeedHex, accessLevel, accessLevelHmac };
}

// Incoming messages

export function handleInitialize(event: MessageEvent) {
  if (!initialized) {
    initialized = true;
    iframe = document.getElementById("identity");
    for (const request of pendingRequests) {
      postMessage(request);
    }
    pendingRequests = [];
  }

  // acknowledge, provides hostname data
  respond(event.source as Window, event.data.id, {});
}

export function handleStorageGranted() {
  storageGranted.next(true);
  storageGranted.complete();
}

export function handleLogin(payload: any) {
  identityWindow.close();
  identityWindow = null;

  identityWindowSubject.next(payload);
  identityWindowSubject.complete();
  identityWindowSubject = null;
}

export function handleInfo(id: string) {
  respond(identityWindow, id, {});
}

// Message handling

export function handleMessage(event: MessageEvent) {
  const { data } = event;
  const { service, method } = data;
  if (service !== "identity") {
    return;
  }
  // Methods are present on incoming requests but not responses
  if (method) {
    handleRequest(event);
  } else {
    handleResponse(event);
  }
}

export function handleRequest(event: MessageEvent) {
  const {
    data: { id, method, payload },
  } = event;
  if (method === "initialize") {
    handleInitialize(event);
  } else if (method === "storageGranted") {
    handleStorageGranted();
  } else if (method === "login") {
    handleLogin(payload);
  } else if (method === "info") {
    handleInfo(id);
  } else {
    console.error("Unhandled identity request");
    console.error(event);
  }
}

export function handleResponse(event: MessageEvent) {
  const {
    data: { id, payload },
  } = event;
  const req = outboundRequests[id];
  req.next(payload);
  req.complete();
  delete outboundRequests[id];
}

// Send a new message and expect a response
export function send(method: string, payload: any) {
  const req = {
    id: uuid(),
    method,
    payload,
    service: "identity",
  };
  const subject = new Subject();
  postMessage(req);
  outboundRequests[req.id] = subject;
  return subject;
}

export function postMessage(req: any) {
  if (initialized) {
    iframe.contentWindow.postMessage(req, "*");
  } else {
    pendingRequests.push(req);
  }
}

// Respond to a received message
export function respond(window: Window, id: string, payload: any): void {
  window.postMessage({ id, service: "identity", payload }, "*");
}
