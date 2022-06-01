import { useEffect } from "react";
import {
  Init,
  setRequestingStorageAccess,
  setUpdateEverything,
} from "../utils/global-context";
import "../styles/globals.scss";
import { Subscription, take } from "rxjs";
import { User } from "../utils/backendapi-context";
import * as _ from "lodash";
import Loader from "../components/loader";
import {
  GetStorage,
  MessageMetaKey,
  IdentityUsersKey,
  SetStorage,
  DeleteIdentities,
  RemoveStorage,
  LegacyUserListKey,
  LastLoggedInUserKey,
  GetUsersStateless,
  GetAppState,
  GetTxn,
  LegacySeedListKey,
} from "../utils/backendapi-context";
import {
  identityServicePublicKeyAdded,
  identityServiceUsers,
  setIdentityServicePKAddedVariable,
  setIdentityServiceUsersVariable,
  info,
  storageGranted,
  setIsTestNet,
} from "../utils/identity-context";
import {
  localNode,
  userList,
  loggedInUser,
  setLoggedInUser,
  checkOnboardingStatus,
  SetupMessages,
  GetUnreadNotifications,
  setYouHodlMap,
  setLoadingInitialAppState,
  setDefaultFeeRateNanosPerKB,
  setGloboMods,
  _updateDeSoExchangeRate,
  setminSatoshisBurnedForProfileCreation,
  setShowBuyWithETH,
  setShowBuyWithUSD,
  showPhoneNumberVerification,
  setShowJumio,
  setJumioDeSoNanos,
  setIsTestNetGlob,
  setTransactionFeeInfo,
  setShowPhoneNumberVerification,
  setCreateProfileFeeNanos,
  setIsCompProfileCreation,
  setBuyETHAddress,
  setNodes,
  setTransactionFeeMap,
  setTransactionFeeMax,
  setdiamondLevelMap,
  nanosToUSD,
  messageMeta,
  setMessageMeta,
  iterateAndSetUserList,
  updateEverything,
  pausePolling,
  setRequestedStorageAccess,
  setUserList,
  loadingInitialAppState,
  requestedStorageAccess,
} from "../utils/global-context";

function MyApp({ Component, pageProps }) {
  const DYNAMICALLY_ADDED_ROUTER_LINK_CLASS =
    "js-app-component__dynamically-added-router-link-class";

  let showUsernameTooltip = false;

  let desoToUSDExchangeRateToDisplay = "fetching...";

  // Throttle the calls to update the top-level data so they only happen after a
  // previous call has finished.
  let callingUpdateTopLevelData = false;
  let problemWithNodeConnection = false;
  let callingUpdateNodeInfo = false;

  useEffect(() => {
    // Init global-context
    Init(null, []);

    // Rewrite in react
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     // Save data if user navigates to nft page but clear it otherwise
    //     // Scroll keeps on return and new data is loaded when coming back from another url
    //     if (!(event.url.includes("nft") || event.url.includes("Marketplace")) && this.globalVars.marketplaceNFTsData) {
    //       this.globalVars.marketplaceNFTsData = null;
    //       this.globalVars.marketplaceNFTsOffset = 0;

    //       this.globalVars.ethMarketplaceNFTsData = null;
    //       this.globalVars.ethMarketplaceNFTsOffset = 0;
    //       // This below handles discovery -> nfts-page data
    //     } else if (!(event.url.includes("nft") || event.url.includes("nfts")) && this.globalVars.nftsDataToShow) {
    //       this.globalVars.nftsDataToShow = null;
    //       this.globalVars.nftsStartIndex = 0;
    //       this.globalVars.nftsEndIndex = 20;
    //     }
    //   }
    // });

    // Rewrite in react
    // Object.defineProperty(document, "referrer", {
    //   get() {
    //     return "";
    //   },
    // });
    // Object.defineProperty(document, "referer", {
    //   get() {
    //     return "";
    //   },
    // });

    // Load the theme
    //this.themeService.setTheme("light");

    // Rewrite in react
    // this.themeService.init();
    // Rewrite in react end

    // Update the BitClout <-> Bitcoin exchange rate every five minutes. This prevents
    // a stale price from showing in a tab that's been open for a while
    setInterval(() => {
      _updateDeSoExchangeRate();
    }, 5 * 60 * 1000);

    setUpdateEverything(_updateEverything);

    // We need to fetch this data before we start an import. Can remove once import code is gone.
    _updateDeSoExchangeRate();
    _updateAppState();
    info().subscribe((res) => {
      // If the browser is not supported, display the browser not supported screen.
      if (!res.browserSupported) {
        setRequestingStorageAccess(true);
        setRequestedStorageAccess(true);
        return;
      }
      const isLoggedIn = GetStorage(LastLoggedInUserKey);
      if (res.hasStorageAccess || !isLoggedIn) {
        loadApp();
      } else {
        setRequestingStorageAccess(true);
        storageGranted.subscribe(() => {
          setRequestingStorageAccess(false);
          setRequestedStorageAccess(true);
          loadApp();
        });
      }
    });

    installDD();

    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      const pixelHeight = window.innerHeight;

      document.documentElement.style.setProperty("--vh", `${vh}px`);
      document.documentElement.style.setProperty(
        "--pixelHeight",
        `${pixelHeight}px`
      );
    };

    window.addEventListener("load", setVh);
    window.addEventListener("resize", setVh);
  }, []);

  useEffect(function mount() {
    function onClick(event) {
      if (event.target instanceof HTMLAnchorElement) {
        const element = event.target as HTMLAnchorElement;
        if (element.className === DYNAMICALLY_ADDED_ROUTER_LINK_CLASS) {
          event.preventDefault();

          if (!element) {
            return;
          }

          const route = element.getAttribute("href");
          if (route) {
            // FYI, this seems to give a js error if the route isn't in our list
            // of routes, which should help prevent attackers from tricking users into
            // clicking misleading links
            // fix navigate
            // let navigate = GetNav();
            // navigate(route, { replace: false });
          }
        }
      }
    }

    window.addEventListener("document:click", onClick);
  });

  function _updateTopLevelData(): Subscription {
    if (callingUpdateTopLevelData) {
      return new Subscription();
    }
    const publicKeys = Object.keys(identityServiceUsers);

    let loggedInUserPublicKey =
      loggedInUser?.PublicKeyBase58Check ||
      GetStorage(LastLoggedInUserKey) ||
      publicKeys[0];

    // If we recently added a new public key, log in the user and clear the value
    if (identityServicePublicKeyAdded) {
      loggedInUserPublicKey = identityServicePublicKeyAdded;
      setIdentityServicePKAddedVariable(null);
    }

    callingUpdateTopLevelData = true;

    return GetUsersStateless(
      localNode,
      [loggedInUserPublicKey],
      false
    ).subscribe(
      (res: any) => {
        problemWithNodeConnection = false;
        callingUpdateTopLevelData = false;
        const loggedInUserr: User = res.data.UserList[0];
        // Check works ,,, this might take too long to iterate for it to work...
        iterateAndSetUserList(loggedInUserr, loggedInUserPublicKey);
        // Only call setLoggedInUser if logged in user has changed.
        console.log(loggedInUser);
        console.log(loggedInUserr);
        if (!_.isEqual(loggedInUser, loggedInUserr) && loggedInUserPublicKey) {
          console.log("set logged in");
          setLoggedInUser(loggedInUserr);

          checkOnboardingStatus();
        }

        // Setup messages for the logged in user
        SetupMessages();

        // Get unread notifications for the logged in user
        GetUnreadNotifications();

        // Convert the lists of coin balance entries into maps.
        // TODD: I've intermittently seen errors here where UsersYouHODL is null.
        // That's why I added this || [] thing. We should figure
        // out the root cause.
        setYouHodlMap(loggedInUser?.UsersYouHODL);

        if (res.DefaultFeeRateNanosPerKB > 0) {
          setDefaultFeeRateNanosPerKB(res.DefaultFeeRateNanosPerKB);
        }
        setGloboMods(res.GloboMods);

        // Check works,,, react changedetection is different with the virtual dom so idk if we need this
        // ref.detectChanges();
        setLoadingInitialAppState(false);
      },
      (error) => {
        problemWithNodeConnection = true;
        callingUpdateTopLevelData = false;
        setLoadingInitialAppState(false);
        console.error(error);
      }
    );
  }

  function updateDeSoExchangeRate() {
    _updateDeSoExchangeRate();
  }

  function _updateAppState() {
    GetAppState(localNode, loggedInUser?.PublicKeyBase58Check).subscribe(
      (res: any) => {
        setminSatoshisBurnedForProfileCreation(
          res.data.MinSatoshisBurnedForProfileCreation
        );
        setdiamondLevelMap(res.data.DiamondLevelMap);
        setShowBuyWithUSD(res.data.HasWyreIntegration);
        setShowBuyWithETH(res.data.BuyWithETH);
        setShowJumio(res.data.HasJumioIntegration);
        setJumioDeSoNanos(res.data.JumioDeSoNanos);
        setIsTestNetGlob(res.data.IsTestnet);
        setIsTestNet(res.data.IsTestnet);
        setShowPhoneNumberVerification(
          res.data.HasTwilioAPIKey && res.data.HasStarterDeSoSeed
        );
        setCreateProfileFeeNanos(res.data.CreateProfileFeeNanos);
        setIsCompProfileCreation(
          showPhoneNumberVerification && res.data.CompProfileCreation
        );
        setBuyETHAddress(res.data.BuyETHAddress);
        setNodes(res.data.Nodes);

        setTransactionFeeMap(res.data.TransactionFeeMap);

        // Calculate max fee for display in frontend
        // Sort so highest fee is at the top
        var simpleFeeMap: { txnType: string; fees: number }[] = Object.keys(
          res.data.TransactionFeeMap
        )
          .map((k) => {
            if (res.data.TransactionFeeMap[k] !== null) {
              // only return for non empty transactions
              // sum in case there are multiple fee earners for the txn type
              var sumOfFees = res.data.TransactionFeeMap[k]
                .map((f) => f.AmountNanos)
                .reduce((partial_sum, a) => partial_sum + a, 0);
              // Capitalize and use spaces in Txn type
              var txnType = (" " + k)
                .replace(/_/g, " ")
                .toLowerCase()
                .replace(
                  /[^a-zA-Z0-9]+(.)/g,
                  (m, chr) => " " + chr.toUpperCase()
                )
                .trim();
              return { txnType: txnType, fees: sumOfFees };
            }
          })
          .sort((a, b) => b.fees - a.fees);

        //Get the max of all fees
        setTransactionFeeMax(Math.max(...simpleFeeMap?.map((k) => k?.fees)));

        //Prepare text detailed info of fees and join with newlines
        setTransactionFeeInfo(
          simpleFeeMap
            ?.map((k) => `${k?.txnType}: ${nanosToUSD(k?.fees, 4)}`)
            .join("\n")
        );
      }
    );
  }

  const _updateEverything = (
    waitTxn: string = "",
    successCallback: (comp: any) => void = () => {},
    errorCallback: (comp: any) => void = () => {},
    comp: any = ""
  ) => {
    // Refresh the messageMeta periodically.
    setMessageMeta(GetStorage(MessageMetaKey));
    if (!messageMeta) {
      setMessageMeta({
        decryptedMessgesMap: {},
        notificationMap: {},
      });
    }
    // If we have a transaction to wait for, we do a GetTxn call for a maximum of 10s (250ms * 40).
    // There is a success and error callback so that the caller gets feedback on the polling.
    if (waitTxn !== "") {
      let attempts = 0;
      let numTries = 160;
      let timeoutMillis = 750;
      // Set an interval to repeat
      let interval = setInterval(() => {
        if (attempts >= numTries) {
          errorCallback(comp);
          clearInterval(interval);
        }
        GetTxn(localNode, waitTxn)
          .subscribe(
            (res: any) => {
              if (!res.TxnFound) {
                return;
              }

              updateDeSoExchangeRate();
              _updateAppState();
              _updateTopLevelData().add(() => {
                // We make sure the logged in user is updated before the success callback triggers
                successCallback(comp);
                clearInterval(interval);
              });
            },
            (error) => {
              clearInterval(interval);
              errorCallback(comp);
            }
          )
          .add(() => attempts++);
      }, timeoutMillis) as any;
    } else {
      if (pausePolling) {
        return;
      }
      updateDeSoExchangeRate();
      _updateAppState();
      return _updateTopLevelData();
    }
  };

  function loadApp() {
    setIdentityServiceUsersVariable(GetStorage(IdentityUsersKey) || {});
    // Filter out invalid public keys
    const publicKeys = Object.keys(identityServiceUsers);
    for (const publicKey of publicKeys) {
      if (!publicKey.match(/^[a-zA-Z0-9]{54,55}$/)) {
        console.log("DELETING identityServiceUsers");
        delete identityServiceUsers[publicKey];
      }
    }
    SetStorage(IdentityUsersKey, identityServiceUsers);

    GetUsersStateless(localNode, publicKeys, true).subscribe((res) => {
      if (!_.isEqual(userList, res.UserList)) {
        setUserList(res.UserList || []);
      }
      updateEverything();
    });

    // Clean up legacy seedinfo storage. only called when a user visits the site again after a successful import
    DeleteIdentities(localNode).subscribe();
    RemoveStorage(LegacyUserListKey);
    RemoveStorage(LegacySeedListKey);
  }

  function installDD() {
    const apiKey = process.env.NEXT_PUBLIC_apiKey;
    const jsPath = process.env.NEXT_PUBLIC_jsPath;
    const ajaxListenerPath = process.env.NEXT_PUBLIC_ajaxListenerPath;
    const endpoint = process.env.NEXT_PUBLIC_endpoint;
    if (!apiKey || !jsPath || !ajaxListenerPath || !endpoint) {
      return;
    }

    // @ts-ignore
    window.ddjskey = apiKey;
    // @ts-ignore
    window.ddoptions = { ajaxListenerPath, endpoint };

    const datadomeScript = document.createElement("script");
    const firstScript = document.getElementsByTagName("script")[0];
    datadomeScript.async = true;
    datadomeScript.src = jsPath;
    firstScript.parentNode.insertBefore(datadomeScript, firstScript);
  }

  return (
    <>
      <Component {...pageProps} />;
      {/* {loadingInitialAppState && !requestedStorageAccess ? (
        <Loader></Loader>
      ) : null} */}
    </>
  );
}

export default MyApp;
