import { Observable, Observer } from "rxjs";
import {
  User,
  NFTCollectionResponse,
  BalanceEntryResponse,
  TransactionFee,
  DeSoNode,
  PostEntryResponse,
  RouteNames,
  TutorialStatus,
  CreatorCardResponse,
} from "./backendapi-context";
import { LoggedInUserObservableResult } from "./observable-results/logged-in-user-observable-result";
import { FollowChangeObservableResult } from "./observable-results/follow-change-observable-result";
import { track68, track54, identify1, peopleset } from "./mixpanel";
import {
  GetCollectorOrCreator,
  GetStorage,
  SetStorage,
  GetUnreadNotificationsCount,
  SetNotificationsMetadata,
  stringifyError,
  GetMessages,
  LastLoggedInUserKey,
  setIdentityServiceUsers,
  LastLocalNodeKey,
  LastIdentityServiceKey,
  GetExchangeRate,
  ResendVerifyEmail,
  StartOrSkipTutorial,
  GetJumioStatusForPublicKey,
  GetReferralInfoForReferralHash,
  SortETHMarketplace,
  GetSinglePost,
  GetReferralInfoForUser,
} from "./backendapi-context";
import ConfettiGenerator from "confetti-js";
import Swal from "sweetalert2";
import Timer = NodeJS.Timer;
import { Link, ImmutableXClient } from "@imtbl/imx-sdk";
import { useNavigate } from "react-router-dom";
import { SwalHelper } from "./helpers/swal-helper";
import {
  setIdentityServiceURL,
  setSanitizedIdentityServiceURL,
  launch,
} from "./identity-context";

export enum ConfettiSvg {
  DIAMOND = "diamond",
  BOMB = "bomb",
  ROCKET = "rocket",
  COMET = "comet",
  LAMBO = "lambo",
}

const svgToProps = {
  [ConfettiSvg.DIAMOND]: { size: 10, weight: 1 },
  [ConfettiSvg.ROCKET]: { size: 18, weight: 1 },
  [ConfettiSvg.BOMB]: { size: 18, weight: 1 },
  [ConfettiSvg.COMET]: { size: 18, weight: 1 },
  [ConfettiSvg.LAMBO]: { size: 18, weight: 1 },
};

let profileData: any;

//   isCreator boolean
let isCreator: boolean;
//   isCollector boolean
let isCollector: boolean;
//   isVerified boolean
let isVerified: boolean;
//   isVerifiedRes
let isVerifiedRes: any;
//   isVerifiedStrBool
let isVerifiedStrBool: string;
//   username
let username: any;
//   isNullUsername
let isNullUsername: boolean;
//   isNullUsernameRes
let isNullUsernameRes: any;
//   isOnboardingComplete
let isOnboardingComplete: boolean;
//   wantToVerifyPhone
let wantToVerifyPhone: boolean;
//   phoneVerified
let phoneVerified: boolean;

let needToPickCreatorOrCollector: boolean;

let createdNFTsToShow = [];
let collectedNFTsToShow = [];

//   ----------------------------- imx global vars -----------------------------
let imxWalletConnected: boolean;
let imxWalletAddress: string;
let imxClient: any;
let imxBalance: any;
let wantToDepositEth: boolean;
let wantToBuyEth: boolean;
let isEthereumNFTForSale: boolean;
let ethWalletAddresShort: string;
let isEthQuoteRepost: boolean = false;
let isEthWalletAssociatedToDesoProfile: boolean = false;
//   ethMarketplaceCanFilter: boolean = false;

//   ----------------------------- end of imx global vars -----------------------------

// Note: I don't think we should have default values for this. I think we should just
// loading spinner until we get a correct value. That said, I'm not going to fix that
// right now, I'm just moving this magic number into a constant.
const DEFAULT_NANOS_PER_USD_EXCHANGE_RATE = 1e9;
const NANOS_PER_UNIT = 1e9;
const WEI_PER_ETH = 1e18;

const MAX_POST_LENGTH = 560;

const FOUNDER_REWARD_BASIS_POINTS_WARNING_THRESHOLD = 50 * 100;

const CREATOR_COIN_RESERVE_RATIO = 0.3333333;
const CREATOR_COIN_TRADE_FEED_BASIS_POINTS = 1;

// This is set to false immediately after our first attempt to get a loggedInUser.
let loadingInitialAppState = true;

// We're waiting for the user to grant storage access (full-screen takeover)
let requestingStorageAccess = false;
// Check if we have requested storage access, if so dont show supernovas loader anymore
let requestedStorageAccess = false;

// Track if the user is dragging the diamond selector. If so, need to disable text selection in the app.
let userIsDragging = false;

const routeNames = RouteNames;

export let pausePolling = false; // TODO: Monkey patch for when polling conflicts with other calls.
let pauseMessageUpdates = false; // TODO: Monkey patch for when message polling conflicts with other calls.

let desoToUSDExchangeRateToDisplay = "Fetching...";

// We keep information regarding the messages tab in global vars for smooth
// transitions to and from messages.
let messageNotificationCount = 0;
let messagesSortAlgorithm = "time";
let messagesPerFetch = 25;
let openSettingsTray = false;
let newMessagesFromPage = 0;
let messagesRequestsHoldersOnly = true;
let messagesRequestsHoldingsOnly = false;
let messagesRequestsFollowersOnly = false;
let messagesRequestsFollowedOnly = false;

// Whether or not to show processing spinners in the UI for unmined transactions.
// TODO: Move into environment.ts
let showProcessingSpinners = false;

// We track logged-in state
export let loggedInUser: User;
export let userList: User[] = [];

// map[pubkey]->bool of globomods
export let globoMods: any;
let feeRateDeSoPerKB = 1000 / 1e9;
let postsToShow = [];
let followFeedPosts = [];
let hotFeedPosts = [];
// Marketplace is loading / filtering
let isMarketplaceLoading = false;
let isMarketplaceLoadingMore = false;
let isCollectionLoadingMore = false;
let marketplaceNFTsData: NFTCollectionResponse[];
let ethMarketplaceNFTsData: NFTCollectionResponse[];
let ethMarketplaceNFTsDataToShow: NFTCollectionResponse[];
let ethNFTsCollected: NFTCollectionResponse[];
let ethNFTsCreated: NFTCollectionResponse[];
let marketplaceCreatorData: CreatorCardResponse[];
// The buttons on the marketplace
// ETH
let ethMarketplaceStatus = "all";
let ethMarketplaceNFTCategory = "all";
let ethMarketplaceVerifiedCreators = "verified";
// Deso
let desoMarketplace = true;
let marketplaceViewTypeCard = true;
let marketplaceVerifiedCreators = "all";
let marketplaceContentFormat = "all";
let marketplaceStatus = "has bids";
let marketplaceNFTCategory = "all";
let marketplaceLowPriceNanos = 0;
let marketplaceHighPriceNanos = 0;
let marketplaceLowPriceUSD = 0;
let marketplaceHighPriceUSD = 0;
let marketplacePriceRangeSet = false;
let marketplaceMarketType = "all";
let marketplaceSortType = "most recent first";
// Marketplace Offset
let marketplaceNFTsOffset = 0;
let ethMarketplaceNFTsOffset = 0;
// Discovery nfts page
let nftsDataToShow: NFTCollectionResponse[];
let nftsStartIndex = 0;
let nftsEndIndex = 20;
// Collection page
let collectionNFTsLoading = true;
let collectionOffset = 0;

export let messageResponse = null;
export let messageMeta = {
  // <public_key || tstamp> -> messageObj
  decryptedMessgesMap: {},
  // <public_key> -> numMessagesRead
  notificationMap: {},
};
// Search and filter params
let filterType = "";
// The coin balance and user profiles of the coins the the user
// hodls and the users who hodl him.
let youHodlMap: { [k: string]: BalanceEntryResponse } = {};

// Map of diamond level to deso nanos.
let diamondLevelMap = {};

// TODO(performance): We used to call the functions called by this function every
// second. Now we call them only when needed, but the future is to get rid of this
// and make everything use sockets.
export let updateEverything: any;

const emailRegExp =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const emailRegExTest =
  /(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*:(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)(?:,\s*(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*))*)?;\s*)/;

let latestBitcoinAPIResponse: any;

// Whether the left bar (hamburger) menu for mobile is currently open
let isLeftBarMobileOpen = false;

// Whether the left bar (hamburger) menu for mobile Marketplace is currently open
let isMarketplaceLeftBarMobileOpen = false;
let isEthMarketplaceLeftBarMobileOpen = false;

// NFT view type
let nftsPageViewTypeCard = true;

// If no erros received on mobile verification
let isPhoneNumberVerificationTextServerErrorFree: boolean;

let loggedInUserObservable: Observable<LoggedInUserObservableResult>;
let loggedInUserObservers = [] as Observer<LoggedInUserObservableResult>[];

let followChangeObservable: Observable<FollowChangeObservableResult>;
let followChangeObservers = [] as Observer<FollowChangeObservableResult>[];

let nodeInfo: any;
// The API node we connect to
export let localNode: string = null;
// Whether or not the node is running on the testnet or mainnet.
let isTestnet = false;

// Whether or not to show the Verify phone number flow.
export let showPhoneNumberVerification = true;

// Whether or not to show the Buy DeSo with USD flow.
let showBuyWithUSD = false;

// Buy DESO with ETH
let showBuyWithETH = false;

// Whether or not to show the Jumio verification flow.
let showJumio = false;

//   // Weather or not to show Username insert in signup flow
//   mobileVerified = false;

// Whether or not this node comps profile creation.
let isCompProfileCreation = false;

// Current fee to create a profile.
let createProfileFeeNanos: number;

// ETH exchange rates
let usdPerETHExchangeRate: number;
let nanosPerETHExchangeRate: number;

// BTC exchange rates
let satoshisPerDeSoExchangeRate: number;
let usdPerBitcoinExchangeRate: number;

// USD exchange rates
let nanosPerUSDExchangeRate: number;

let defaultFeeRateNanosPerKB: number;

let NanosSold: number;
let ProtocolUSDCentsPerBitcoinExchangeRate: number;

let nanosToDeSoMemo = {};
let formatUSDMemo = {};

let confetti: any;
let canvasCount = 0;
export let minSatoshisBurnedForProfileCreation: number;

// Price of DeSo values
let ExchangeUSDCentsPerDeSo: number;
let USDCentsPerDeSoReservePrice: number;
let BuyDeSoFeeBasisPoints: number = 0;

// Timestamp of last profile update
let profileUpdateTimestamp: number;

let jumioDeSoNanos = 0;

let referralUSDCents: number = 0;

// How many unread notifications the user has
export let unreadNotifications: number = 0;

let transactionFeeMap: { [k: string]: TransactionFee[] };
let transactionFeeMax: number = 0;
let transactionFeeInfo: string;

let buyETHAddress: string = "";

let nodes: { [id: number]: DeSoNode };

let NFTRoyaltyToCoinBasisPoints: any;
let NFTRoyaltyToCreatorBasisPoints: any;

export function setLoadingInitialAppState(appState) {
  loadingInitialAppState = appState;
}
export function setDefaultFeeRateNanosPerKB(feeRate: number) {
  defaultFeeRateNanosPerKB = feeRate;
}
export function setGloboMods(mods: any) {
  globoMods = mods;
}
export function setminSatoshisBurnedForProfileCreation(minSatoshis: number) {
  minSatoshisBurnedForProfileCreation = minSatoshis;
}
export function setShowBuyWithUSD(buyWithUSD: boolean) {
  showBuyWithUSD = buyWithUSD;
}
export function setShowBuyWithETH(buyWithETH: boolean) {
  showBuyWithETH = buyWithETH;
}
export function setShowJumio(showJ: boolean) {
  showJumio = showJ;
}
export function setJumioDeSoNanos(desoNanos: number) {
  jumioDeSoNanos = desoNanos;
}
export function setIsTestNetGlob(testNet: boolean) {
  isTestnet = testNet;
}
export function setShowPhoneNumberVerification(showNumberVer: boolean) {
  showPhoneNumberVerification = showNumberVer;
}
export function setCreateProfileFeeNanos(createProfileFee: number) {
  createProfileFeeNanos = createProfileFee;
}
export function setIsCompProfileCreation(compProfileCreation: boolean) {
  isCompProfileCreation = compProfileCreation;
}
export function setBuyETHAddress(ETHAddress: string) {
  buyETHAddress = ETHAddress;
}
export function setNodes(nodesToSet: { [id: number]: DeSoNode }) {
  nodes = nodesToSet;
}
export function setTransactionFeeMap(feeMap: {
  [k: string]: TransactionFee[];
}) {
  transactionFeeMap = feeMap;
}
export function setdiamondLevelMap(diamondMap: {}) {
  diamondLevelMap = diamondMap;
}
export function setTransactionFeeInfo(transacFeeInfo: string) {
  transactionFeeInfo = transacFeeInfo;
}
export function setTransactionFeeMax(feeMax: number) {
  transactionFeeMax = feeMax;
}
export function setYouHodlMap(entries: BalanceEntryResponse[]) {
  for (const entry of entries || []) {
    youHodlMap[entry.CreatorPublicKeyBase58Check] = entry;
  }
}
export async function iterateAndSetUserList(toSet: User, loggedIn: any) {
  let loggedInUserFound = false;
  userList.forEach((user, index) => {
    if (user.PublicKeyBase58Check === toSet.PublicKeyBase58Check) {
      loggedInUserFound = true;
      userList[index] = toSet;
      // This breaks out of the lodash foreach.
    }
  });
  // If the logged-in user wasn't in the list, add it to the list.
  if (!loggedInUserFound && loggedIn) {
    userList.push(toSet);
  }
}
export function setUserList(userL: User[]) {
  userList = userL;
}
export function setUpdateEverything(updateEverythingSet: any) {
  updateEverything = updateEverythingSet;
}
export function setRequestingStorageAccess(requestingAccess: boolean) {
  requestingStorageAccess = requestingAccess;
}
export function setRequestedStorageAccess(requestedStorageAccessSet: boolean) {
  requestedStorageAccess = requestedStorageAccessSet;
}

export function setMessageMeta(meta: {
  // <public_key || tstamp> -> messageObj
  decryptedMessgesMap: {};
  // <public_key> -> numMessagesRead
  notificationMap: {};
}) {
  messageMeta = meta;
}

//   ------------------------------------ update globalVars for loggedInUser ------------------------------------
export function getCircularReplacer() {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
}

export function closeLeftBarMobile() {
  let scrollPosition: number;
  let body = document.querySelector("body");
  // Disable scroll
  body.style.removeProperty("overflow");
  body.style.removeProperty("position");
  body.style.removeProperty("top");
  body.style.removeProperty("width");
  window.scrollTo(0, scrollPosition);
  // Close
  isLeftBarMobileOpen = false;
}

export function openLeftBarMobile() {
  let scrollPosition: number;
  let body = document.querySelector("body");
  // Get scroll position
  scrollPosition = window.pageYOffset;
  body.style.overflow = "hidden";
  body.style.position = "fixed";
  body.style.top = `-${scrollPosition}px`;
  body.style.width = "100%";
  // Close
  isLeftBarMobileOpen = true;
}

export function checkIsVerified() {
  isVerifiedRes = JSON.stringify(loggedInUser?.ProfileEntryResponse);
  if (isVerifiedRes === "null") {
    isVerified = false;
  } else {
    isVerifiedStrBool = JSON.stringify(
      loggedInUser?.ProfileEntryResponse["IsVerified"]
    );
    if (isVerifiedStrBool === "true") {
      isVerified = true;
    } else {
      isVerified = false;
    }
  }
  // console.log(` ------------------------------------ isVerified status is ${this.isVerified} ------------------- `);
}

export function checkNullUsername() {
  isNullUsernameRes = JSON.stringify(loggedInUser?.ProfileEntryResponse);

  if (isNullUsernameRes === "null") {
    // comment/uncomment line below out for testing
    isNullUsername = true;
  } else {
    username = JSON.stringify(loggedInUser?.ProfileEntryResponse["Username"]);
    username = username.replace(/['"]+/g, "");
    if (username) {
      isNullUsername = false;
    } else {
      // comment line below out for testing
      isNullUsername = true;
    }
  }
}

export function checkOnboardingCompleted() {
  //   if they are a creator, have a profile (username) and are verified then onboarding is complete
  if (isCreator === true && isNullUsername === false) {
    needToPickCreatorOrCollector = false;
    isOnboardingComplete = true;
  }
  // if they are a collector and have a profile (username) then onboarding is complete
  else if (isCollector === true && isNullUsername === false) {
    isOnboardingComplete = true;
    needToPickCreatorOrCollector = false;
  } else {
    isOnboardingComplete = false;
    needToPickCreatorOrCollector = true;
  }
}

export async function checkOnboardingStatus(): Promise<void> {
  const publicKey = loggedInUser?.PublicKeyBase58Check;

  if (publicKey) {
    GetCollectorOrCreator(localNode, publicKey).subscribe(
      (res) => {
        console.log(
          ` ---------------------------------- res ${JSON.stringify(
            res
          )} ---------------------------------- `
        );
        isCreator = res["Creator"];
        isCollector = res["Collector"];

        //   update checkNullUsername
        checkNullUsername();

        //   update onboardingcomplete status
        checkOnboardingCompleted();

        track68("Onboarding Complete?", {
          "Onboarding complete?": isOnboardingComplete,
        });
        console.log(
          ` -------------- isOnboardingComplete? ${isOnboardingComplete} `
        );
      },
      (err) => {
        console.log(err);
        isCreator = false;
        isCollector = false;
      }
    );
  }
}
//   ------------------------------------ end of update globalVars for loggedInUser ------------------------------------

export function SetupMessages() {
  // If there's no loggedInUser, we set the notification count to zero
  if (!loggedInUser) {
    messageNotificationCount = 0;
    return;
  }

  // If a message response already exists, we skip this step
  if (messageResponse) {
    return;
  }

  let storedTab = GetStorage("mostRecentMessagesTab");
  if (storedTab === null) {
    storedTab = "All messages";
    SetStorage("mostRecentMessagesTab", storedTab);
  }

  // Set the filters most recently used and load the messages
  SetMessagesFilter(storedTab);
  LoadInitialMessages();
}

export function GetUnreadNotifications() {
  if (loggedInUser) {
    GetUnreadNotificationsCount(localNode, loggedInUser.PublicKeyBase58Check)
      .toPromise()
      .then(
        (res) => {
          unreadNotifications = res.NotificationsCount;
          if (res.UpdateMetadata) {
            SetNotificationsMetadata(
              localNode,
              loggedInUser.PublicKeyBase58Check,
              -1,
              res.LastUnreadNotificationIndex,
              res.NotificationsCount
            ).toPromise();
          }
        },
        (err) => {
          console.error(stringifyError(err));
        }
      );
  }
}
export function SetMessagesFilter(tabName: any) {
  // Set the request parameters if it's a known tab.
  // Custom is set in the filter menu component and saved in local storage.
  if (tabName !== "Custom") {
    messagesRequestsHoldersOnly = tabName === "My holders";
    messagesRequestsHoldingsOnly = false;
    messagesRequestsFollowersOnly = false;
    messagesRequestsFollowedOnly = false;
    messagesSortAlgorithm = "time";
  } else {
    messagesRequestsHoldersOnly = GetStorage(
      "customMessagesRequestsHoldersOnly"
    );
    messagesRequestsHoldingsOnly = GetStorage(
      "customMessagesRequestsHoldingsOnly"
    );
    messagesRequestsFollowersOnly = GetStorage(
      "customMessagesRequestsFollowersOnly"
    );
    messagesRequestsFollowedOnly = GetStorage(
      "customMessagesRequestsFollowedOnly"
    );
    messagesSortAlgorithm = GetStorage("customMessagesSortAlgorithm");
  }
}

export function LoadInitialMessages() {
  if (!loggedInUser) {
    return;
  }

  GetMessages(
    localNode,
    loggedInUser.PublicKeyBase58Check,
    "",
    messagesPerFetch,
    messagesRequestsHoldersOnly,
    messagesRequestsHoldingsOnly,
    messagesRequestsFollowersOnly,
    messagesRequestsFollowedOnly,
    messagesSortAlgorithm
  ).subscribe(
    (res) => {
      if (pauseMessageUpdates) {
        // We pause message updates when a user sends a messages so that we can
        // wait for it to be sent before updating the thread.  If we do not do this the
        // temporary message place holder would disappear until "GetMessages()" finds it.
      } else {
        messageResponse = res;

        // Update the number of new messages so we know when to stop scrolling
        newMessagesFromPage = res.OrderedContactsWithMessages.length;
      }
    },
    (err) => {
      console.error(stringifyError(err));
    }
  );
}

export function _notifyLoggedInUserObservers(
  newLoggedInUser: User,
  isSameUserAsBefore: boolean
) {
  loggedInUserObservers.forEach((observer) => {
    const result = new LoggedInUserObservableResult();
    result.loggedInUser = newLoggedInUser;
    result.isSameUserAsBefore = isSameUserAsBefore;
    observer.next(result);
  });
}

export function userInTutorial(user: User): boolean {
  return (
    user &&
    [
      TutorialStatus.COMPLETE,
      TutorialStatus.EMPTY,
      TutorialStatus.SKIPPED,
    ].indexOf(user?.TutorialStatus) < 0
  );
}

// NEVER change loggedInUser property directly. Use this method instead.
export function setLoggedInUser(user: User) {
  const isSameUserAsBefore =
    loggedInUser &&
    user &&
    loggedInUser.PublicKeyBase58Check === user.PublicKeyBase58Check;

  loggedInUser = user;

  if (loggedInUser) {
    // Fetch referralLinks for the userList before completing the load.

    GetReferralInfoForUser(
      localNode,
      loggedInUser?.PublicKeyBase58Check
    ).subscribe(
      (res: any) => {
        loggedInUser.ReferralInfoResponses = res.ReferralInfoResponses;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  // If Jumio callback hasn't returned yet, we need to poll to update the user metadata.
  if (user && user?.JumioFinishedTime > 0 && !user?.JumioReturned) {
    pollLoggedInUserForJumio(user.PublicKeyBase58Check);
  }

  if (!isSameUserAsBefore) {
    // Store the user in localStorage
    SetStorage(LastLoggedInUserKey, user?.PublicKeyBase58Check);

    // Clear out the message inbox and BitcoinAPI
    messageResponse = null;
    latestBitcoinAPIResponse = null;

    // Fix the youHodl / hodlYou maps.
    for (const entry of loggedInUser?.UsersYouHODL || []) {
      youHodlMap[entry.CreatorPublicKeyBase58Check] = entry;
    }
    followFeedPosts = [];
  }

  _notifyLoggedInUserObservers(user, isSameUserAsBefore);
  trackLoggedInUser();
}

export function trackLoggedInUser() {
  if (loggedInUser) {
    identify1(loggedInUser?.PublicKeyBase58Check);
    peopleset({
      $name: loggedInUser?.ProfileEntryResponse?.Username,
    });
  }
}

export function getLinkForReferralHash(referralHash: string) {
  // FIXME: Generalize this once there are referral programs running
  // on other nodes.
  return `https://supernovas.app?r=${referralHash}`;
}

export function hasUserBlockedCreator(publicKeyBase58Check): boolean {
  return (
    loggedInUser?.BlockedPubKeys &&
    publicKeyBase58Check in loggedInUser?.BlockedPubKeys
  );
}

export function showAdminTools(): boolean {
  return loggedInUser?.IsAdmin || loggedInUser?.IsSuperAdmin;
}

export function showSuperAdminTools(): boolean {
  return loggedInUser?.IsSuperAdmin;
}

export function networkName(): string {
  return isTestnet ? "testnet" : "mainnet";
}

export function getUSDForDiamond(index: number): string {
  const desoNanos = diamondLevelMap[index];
  const val = nanosToUSDNumber(desoNanos);
  if (val < 1) {
    return formatUSD(Math.max(val, 0.01), 2);
  }
  return abbreviateNumber(val, 0, true);
}

export function nanosToDeSo(
  nanos: number,
  maximumFractionDigits?: number
): string {
  if (nanosToDeSoMemo[nanos] && nanosToDeSoMemo[nanos][maximumFractionDigits]) {
    return nanosToDeSoMemo[nanos][maximumFractionDigits];
  }
  nanosToDeSoMemo[nanos] = nanosToDeSoMemo[nanos] || {};

  if (!maximumFractionDigits && nanos > 0) {
    // maximumFractionDigits defaults to 3.
    // Set it higher only if we have very small amounts.
    maximumFractionDigits = Math.floor(10 - Math.log10(nanos));
  }

  // Always show at least 2 digits
  if (maximumFractionDigits < 2) {
    maximumFractionDigits = 2;
  }

  // Never show more than 9 digits
  if (maximumFractionDigits > 9) {
    maximumFractionDigits = 9;
  }

  // Always show at least 2 digits
  const minimumFractionDigits = 2;
  const num = nanos / 1e9;
  nanosToDeSoMemo[nanos][maximumFractionDigits] = Number(num).toLocaleString(
    "en-US",
    {
      style: "decimal",
      currency: "USD",
      minimumFractionDigits,
      maximumFractionDigits,
    }
  );
  return nanosToDeSoMemo[nanos][maximumFractionDigits];
}

export function formatUSD(num: number, decimal: number): string {
  if (formatUSDMemo[num] && formatUSDMemo[num][decimal]) {
    return formatUSDMemo[num][decimal];
  }

  formatUSDMemo[num] = formatUSDMemo[num] || {};

  formatUSDMemo[num][decimal] = Number(num).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
  });
  return formatUSDMemo[num][decimal];
}

/*
 * Converts long numbers to convenient abbreviations
 * Examples:
 *   value: 12345, decimals: 1 => 12.3K
 *   value: 3492311, decimals: 2 => 3.49M
 * */
export function abbreviateNumber(
  value: number,
  decimals: number,
  formatUSDbool: boolean = false
): string {
  let shortValue;
  const suffixes = ["", "K", "M", "B", "T"];
  const suffixNum = Math.floor((("" + value.toFixed(0)).length - 1) / 3);
  if (suffixNum === 0) {
    // if the number is less than 1000, we should only show at most 2 decimals places
    decimals = Math.min(2, decimals);
  }
  shortValue = (value / Math.pow(1000, suffixNum)).toFixed(decimals);
  if (formatUSDbool) {
    shortValue = formatUSD(shortValue, decimals);
  }
  return shortValue + suffixes[suffixNum];
}

export function abbreviateRepostsNumber(
  value1: number,
  value2: number,
  decimals: number,
  formatUSDbool: boolean = false
): string {
  let shortValue1;
  const suffixes1 = ["", "K", "M", "B", "T"];
  const suffixNum1 = Math.floor((("" + value1.toFixed(0)).length - 1) / 3);
  if (suffixNum1 === 0) {
    // if the number is less than 1000, we should only show at most 2 decimals places
    decimals = Math.min(2, decimals);
  }
  shortValue1 = (value1 / Math.pow(1000, suffixNum1)).toFixed(decimals);
  if (formatUSDbool) {
    shortValue1 = formatUSD(shortValue1, decimals);
  }

  let combinedShortValue1 = shortValue1;

  let shortValue2;
  const suffixes2 = ["", "K", "M", "B", "T"];
  const suffixNum2 = Math.floor((("" + value1.toFixed(0)).length - 1) / 3);
  if (suffixNum2 === 0) {
    // if the number is less than 1000, we should only show at most 2 decimals places
    decimals = Math.min(2, decimals);
  }
  shortValue2 = (value1 / Math.pow(1000, suffixNum2)).toFixed(decimals);
  if (formatUSDbool) {
    shortValue2 = formatUSD(shortValue2, decimals);
  }

  let combinedShortValue2 = shortValue2;
  let combinedShortValue3: any;
  combinedShortValue3 =
    parseInt(combinedShortValue1) + parseInt(combinedShortValue2);
  combinedShortValue3 = combinedShortValue3.toString();

  return combinedShortValue3;
}

export function nanosToUSDNumber(nanos: number): number {
  return nanos / nanosPerUSDExchangeRate;
}

export function usdToNanosNumber(usdAmount: number): number {
  return usdAmount * nanosPerUSDExchangeRate;
}

export function nanosToUSD(nanos: number, decimal?: number): string {
  if (decimal == null) {
    decimal = 4;
  }
  return formatUSD(nanosToUSDNumber(nanos), decimal);
}

export function isMobile(): boolean {
  // from https://stackoverflow.com/questions/1248081/how-to-get-the-browser-viewport-dimensions
  const viewportWidth = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  return viewportWidth <= 992;
}
export function isMobileIphone(): boolean {
  const viewportWidth = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  return viewportWidth <= 480;
}

// Calculates the amount of deso one would receive if they sold an amount equal to creatorCoinAmountNano
// given the current state of a creator's coin as defined by the coinEntry
export function desoNanosYouWouldGetIfYouSold(
  creatorCoinAmountNano: number,
  coinEntry: any
): number {
  // These calculations are derived from the Bancor pricing formula, which
  // is proportional to a polynomial price curve (and equivalent to Uniswap
  // under certain assumptions). For more information, see the comment on
  // CreatorCoinSlope in constants.go and check out the Mathematica notebook
  // linked in that comment.
  //
  // This is the formula:
  // - B0 * (1 - (1 - dS / S0)^(1/RR))
  // - where:
  //     dS = bigDeltaCreatorCoin,
  //     B0 = bigCurrentDeSoLocked
  //     S0 = bigCurrentCreatorCoinSupply
  //     RR = params.CreatorCoinReserveRatio
  const desoLockedNanos = coinEntry.DeSoLockedNanos;
  const currentCreatorCoinSupply = coinEntry.CoinsInCirculationNanos;
  // const deltaDeSo = creatorCoinAmountNano;
  const desoBeforeFeesNanos =
    desoLockedNanos *
    (1 -
      Math.pow(
        1 - creatorCoinAmountNano / currentCreatorCoinSupply,
        1 / CREATOR_COIN_RESERVE_RATIO
      ));

  return (
    (desoBeforeFeesNanos * (100 * 100 - CREATOR_COIN_TRADE_FEED_BASIS_POINTS)) /
    (100 * 100)
  );
}

// Return a formatted version of the amount one would receive in USD if they sold creatorCoinAmountNano number of Creator Coins
// given the current state of a creator's coin as defined by the coinEntry
export function usdYouWouldGetIfYouSoldDisplay(
  creatorCoinAmountNano: number,
  coinEntry: any,
  abbreviate: boolean = true
): string {
  if (creatorCoinAmountNano == 0) return "$0";
  const usdValue = nanosToUSDNumber(
    desoNanosYouWouldGetIfYouSold(creatorCoinAmountNano, coinEntry)
  );
  return abbreviate
    ? abbreviateNumber(usdValue, 2, true)
    : formatUSD(usdValue, 2);
}

export function creatorCoinNanosToUSDNaive(
  creatorCoinNanos,
  coinPriceDeSoNanos,
  abbreviate: boolean = false
): string {
  const usdValue = nanosToUSDNumber(
    (creatorCoinNanos / 1e9) * coinPriceDeSoNanos
  );
  return abbreviate
    ? abbreviateNumber(usdValue, 2, true)
    : formatUSD(usdValue, 2);
}

export function createProfileFeeInDeSo(): number {
  return createProfileFeeNanos / 1e9;
}

export function createProfileFeeInUsd(): string {
  return nanosToUSD(createProfileFeeNanos, 2);
}

export function convertTstampToDaysOrHours(tstampNanos: number) {
  // get total seconds between the times
  let delta = Math.abs(tstampNanos / 1000000 - new Date().getTime()) / 1000;

  // calculate (and subtract) whole days
  const days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  const minutes = Math.ceil(delta / 60) % 60;

  return `${days ? days + "d " : ""} ${!days && hours ? hours + "h" : ""} ${
    !days && !hours && minutes ? minutes + "m" : ""
  }`;
}

export function convertTstampToDateOrTime(tstampNanos: number) {
  const date = new Date(tstampNanos / 1e6);
  const currentDate = new Date();
  if (
    date.getDate() != currentDate.getDate() ||
    date.getMonth() != currentDate.getMonth() ||
    date.getFullYear() != currentDate.getFullYear()
  ) {
    return date.toLocaleString("default", { month: "short", day: "numeric" });
  }

  return date.toLocaleString("default", {
    hour: "numeric",
    minute: "numeric",
  });
}

export function convertTstampToDateTime(tstampNanos: number) {
  const date = new Date(tstampNanos / 1e6);
  const currentDate = new Date();
  if (
    date.getDate() != currentDate.getDate() ||
    date.getMonth() != currentDate.getMonth() ||
    date.getFullYear() != currentDate.getFullYear()
  ) {
    return date.toLocaleString("default", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
  }

  return date.toLocaleString("default", {
    hour: "numeric",
    minute: "numeric",
  });
}

export function doesLoggedInUserHaveProfile() {
  if (!loggedInUser) {
    return false;
  }
  const hasProfile =
    loggedInUser.ProfileEntryResponse &&
    loggedInUser.ProfileEntryResponse.Username.length > 0;

  return hasProfile;
}

export function _copyText(val: string) {
  const selBox = document.createElement("textarea");
  selBox.style.position = "fixed";
  selBox.style.left = "0";
  selBox.style.top = "0";
  selBox.style.opacity = "0";
  selBox.value = val;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand("copy");
  document.body.removeChild(selBox);
}

export function truncate(ss: string, len?: number): string {
  let ll = len;
  if (!ll) {
    ll = 18;
  }
  if (!ss || ss.length <= ll) {
    return ss;
  }
  return ss.slice(0, ll) + "...";
}

export function _parseFloat(val: any) {
  return parseFloat(val) ? parseFloat(val) : 0;
}

export function scrollTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

export function showLandingPage() {
  return userList && userList.length === 0;
}

export function _globopoll(passedFunc: any, expirationSecs?: any) {
  const startTime = new Date();
  const interval = setInterval(() => {
    if (passedFunc()) {
      clearInterval(interval);
    }
    if (
      expirationSecs &&
      new Date().getTime() - startTime.getTime() > expirationSecs * 1000
    ) {
      return true;
    }
  }, 1000);
}

export function _alertSuccess(val: any, altTitle?: string, funcAfter?: any) {
  let title = `Success!`;
  if (altTitle) {
    title = altTitle;
  }
  SwalHelper.fire({
    target: getTargetComponentSelector(),
    icon: "success",
    title,
    html: val,
    showConfirmButton: true,
    focusConfirm: true,
    customClass: {
      confirmButton: "btn btn-light",
      cancelButton: "btn btn-light no",
    },
  }).then((res: any) => {
    if (funcAfter) {
      funcAfter();
    }
  });
}

export function _alertError(
  err: any,
  showBuyDeSo: boolean = false,
  showBuyCreatorCoin: boolean = false
) {
  SwalHelper.fire({
    target: getTargetComponentSelector(),
    icon: "error",
    title: `Oops...`,
    html: err,
    showConfirmButton: true,
    showCancelButton: showBuyDeSo || showBuyCreatorCoin,
    focusConfirm: true,
    customClass: {
      confirmButton: "btn btn-light",
      cancelButton: "btn btn-light no",
    },
    confirmButtonText: showBuyDeSo
      ? "Buy DeSo"
      : showBuyCreatorCoin
      ? "Buy Creator Coin"
      : "Ok",
    reverseButtons: true,
  }).then((res) => {
    let navigate = GetNav();
    if (showBuyDeSo && res.isConfirmed) {
      // CHECK WORKS,,, same for all these
      navigate(routeNames.BUY_DESO, {
        replace: false,
      });
    }
    if (showBuyCreatorCoin && res.isConfirmed) {
      navigate(routeNames.CREATORS);
    }
  });
}

export const GetNav = () => {
  return useNavigate();
};

export function celebrate(svgList: ConfettiSvg[] = []) {
  const canvasID = "my-canvas-" + canvasCount;
  canvasCount++;
  canvasCount = canvasCount % 5;
  const confettiSettings = {
    target: canvasID,
    max: 500,
    respawn: false,
    size: 2,
    start_from_edge: true,
    rotate: true,
    clock: 100,
  };
  if (svgList.length > 0) {
    confettiSettings["props"] = svgList.map((svg) => {
      return {
        ...{ type: "svg", src: `/assets/img/${svg}.svg` },
        ...svgToProps[svg],
      };
    });
    if (svgList.indexOf(ConfettiSvg.DIAMOND) >= 0) {
      confettiSettings.clock = 150;
    } else {
      confettiSettings.clock = 75;
    }
    confettiSettings.max = 200;
  }
  confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();
}

export function _setUpLoggedInUserObservable() {
  loggedInUserObservable = new Observable((observer) => {
    loggedInUserObservers.push(observer);
  });
}

export function _setUpFollowChangeObservable() {
  followChangeObservable = new Observable((observer) => {
    followChangeObservers.push(observer);
  });
}

// Does some basic checks on a public key.
export function isMaybePublicKey(pk: string) {
  // Test net public keys start with 'tBC', regular public keys start with 'BC'.
  return (
    (pk.startsWith("tBC") && pk.length == 54) ||
    (pk.startsWith("BC") && pk.length == 55)
  );
}

export function isVanillaRepost(post: PostEntryResponse): boolean {
  return (
    !post.Body && !post.ImageURLs?.length && !!post.RepostedPostEntryResponse
  );
}

export function getPostContentHashHex(post: PostEntryResponse): string {
  return isVanillaRepost(post)
    ? post.RepostedPostEntryResponse.PostHashHex
    : post.PostHashHex;
}

export function incrementCommentCount(
  post: PostEntryResponse
): PostEntryResponse {
  if (isVanillaRepost(post)) {
    post.RepostedPostEntryResponse.CommentCount += 1;
  } else {
    post.CommentCount += 1;
  }
  return post;
}

// Helper to launch the get free deso flow in identity.
export function launchGetFreeDESOFlow() {
  launch("/get-free-deso", {
    public_key: loggedInUser?.PublicKeyBase58Check,
    referralCode: referralCode(),
  }).subscribe(() => {
    updateEverything();
  });
}

export function launchIdentityFlow(event: string): void {
  launch("/log-in?accessLevelRequest=4", {
    referralCode: referralCode(),
    hideJumio: true,
  }).subscribe(
    (res) => {
      console.log(res);
      setIdentityServiceUsers(res.users, res.publicKeyAdded);
      updateEverything().add(() => {
        flowRedirect(res.signedUp, res.publicKeyAdded);
      });
    },
    (error) => {
      console.log(error);
    }
  );
}

export function launchLoginFlow() {
  launchIdentityFlow("/login");
  // Bring back mixpanel
  // track54("Login launch");
}

export function launchSignupFlow() {
  launchIdentityFlow("create");
}

export function referralCode(): string {
  return localStorage.getItem("referralCode");
}

export async function flowRedirect(
  signedUp: boolean,
  publicKey: string
): Promise<void> {
  //   flowRedirect(signedUp: boolean, publicKey: string): void {
  // if they are signedup, they need to pick creator or collector
  let navigate = GetNav();
  if (signedUp) {
    // If this node supports phone number verification, go to step 3, else proceed to step 4.
    const stepNum = 2;
    // Check works,,, previous had '/' before routename
    // Also check it works idk about the search...
    navigate({
      pathname: routeNames.SIGNUP,
      search: "?stepNum=" + stepNum,
    });
  } else {
    //   this.checkOnboardingStatus();
    // Check works,,, previous had '/' before routename
    navigate(routeNames.BROWSE);
  }
}

export function Init(loggedInUser: User, userList: User[]) {
  _setUpLoggedInUserObservable();
  _setUpFollowChangeObservable();

  // Rewrite in react ,,, this handles referralcode, which we dont use... but still..
  // route.queryParams.subscribe((queryParams) => {
  //   if (queryParams.r) {
  //     localStorage.setItem("referralCode", queryParams.r);
  //     // Check works ...
  //     this.navigate(
  //       {
  //         pathname: "",
  //         search: "?r=undefined",
  //       },
  //       {
  //         replace: false,
  //       }
  //     );
  //     this.getReferralUSDCents();
  //   }
  // });
  // Rewrite in react END

  getReferralUSDCents();
  userList = userList;
  satoshisPerDeSoExchangeRate = 0;
  nanosPerUSDExchangeRate = DEFAULT_NANOS_PER_USD_EXCHANGE_RATE;
  usdPerBitcoinExchangeRate = 10000;
  defaultFeeRateNanosPerKB = 1000.0;
  localNode = GetStorage(LastLocalNodeKey);
  if (!localNode) {
    const hostname = (window as any).location.hostname;
    if (process.env.NEXT_PUBLIC_production) {
      localNode = hostname;
    } else {
      localNode = `${hostname}:17001`;
    }

    SetStorage(LastLocalNodeKey, localNode);
  }
  // Var at the end since the naming convention is the same here and in identity-context
  let identityServiceURL = GetStorage(LastIdentityServiceKey);
  if (!identityServiceURL) {
    identityServiceURL = process.env.NEXT_PUBLIC_identityURL;
    SetStorage(LastIdentityServiceKey, identityServiceURL);
  }
  // Check works ,,, these used to be var = value
  setIdentityServiceURL(identityServiceURL);
  setSanitizedIdentityServiceURL(`${identityServiceURL}/embed?v=2`);
  // Rewrite in react ,,, perhaps not even needed but check ....
  //   this.sanitizer.bypassSecurityTrustResourceUrl(
  //     `${identityServiceURL}/embed?v=2`
  //   );
  // Rewrite in react end

  _globopoll(() => {
    if (!defaultFeeRateNanosPerKB) {
      return false;
    }
    feeRateDeSoPerKB = defaultFeeRateNanosPerKB / 1e9;
    return true;
  });
}

// Get the highest level parent component that has the app-theme styling.
export function getTargetComponentSelector(): string {
  return getTargetComponentSelectorFromRouter();
}

// CHECK WORKS ,,,,
export function getTargetComponentSelectorFromRouter(): string {
  // Check works ,,,location might have issues idk
  const location = window.location.pathname;
  if (location.startsWith("/" + routeNames.BROWSE)) {
    return "browse-page";
  }
  if (location.startsWith("/" + routeNames.LANDING)) {
    return "landing-page";
  }
  if (location.startsWith("/" + routeNames.INBOX_PREFIX)) {
    return "messages-page";
  }
  return "app-page";
}

export function _updateDeSoExchangeRate() {
  console.log(localNode);
  console.log("GET EXHANGE RATE");
  GetExchangeRate(localNode).subscribe(
    (res: any) => {
      // BTC
      satoshisPerDeSoExchangeRate = res.SatoshisPerDeSoExchangeRate;
      ProtocolUSDCentsPerBitcoinExchangeRate =
        res.USDCentsPerBitcoinExchangeRate;
      usdPerBitcoinExchangeRate = res.USDCentsPerBitcoinExchangeRate / 100;

      // ETH
      usdPerETHExchangeRate = res.USDCentsPerETHExchangeRate / 100;
      nanosPerETHExchangeRate = res.NanosPerETHExchangeRate;

      // DESO
      NanosSold = res.NanosSold;
      ExchangeUSDCentsPerDeSo = res.USDCentsPerDeSoExchangeRate;
      USDCentsPerDeSoReservePrice = res.USDCentsPerDeSoReserveExchangeRate;
      BuyDeSoFeeBasisPoints = res.BuyDeSoFeeBasisPoints;

      const nanosPerUnit = NANOS_PER_UNIT;
      nanosPerUSDExchangeRate = nanosPerUnit / (ExchangeUSDCentsPerDeSo / 100);
      desoToUSDExchangeRateToDisplay = nanosToUSD(nanosPerUnit, null);
      desoToUSDExchangeRateToDisplay = nanosToUSD(nanosPerUnit, 2);
    },
    (error) => {
      console.error(error);
    }
  );
}

let resentVerifyEmail = false;
export function resendVerifyEmail() {
  ResendVerifyEmail(localNode, loggedInUser.PublicKeyBase58Check);
  resentVerifyEmail = true;
}

export function startTutorialAlert(): void {
  Swal.fire({
    target: getTargetComponentSelector(),
    title: "Congrats!",
    html: "You just got some free money!<br><br><b>Now it's time to learn how to earn even more!</b>",
    showConfirmButton: true,
    // Only show skip option to admins
    showCancelButton: !!loggedInUser?.IsAdmin,
    customClass: {
      confirmButton: "btn btn-light",
      cancelButton: "btn btn-light no",
    },
    reverseButtons: true,
    confirmButtonText: "Start Tutorial",
    cancelButtonText: "Skip",
    // User must skip or start tutorial
    allowOutsideClick: false,
    allowEscapeKey: false,
  }).then((res) => {
    StartOrSkipTutorial(
      localNode,
      loggedInUser?.PublicKeyBase58Check,
      !res.isConfirmed /* if it's not confirmed, skip tutorial*/
    ).subscribe((response) => {
      // Auto update logged in user's tutorial status - we don't need to fetch it via get users stateless right now.
      loggedInUser.TutorialStatus = res.isConfirmed
        ? TutorialStatus.STARTED
        : TutorialStatus.SKIPPED;
      if (res.isConfirmed) {
        // Check works
        // This is not used so I just removed it...
      }
    });
  });
}

export function skipTutorial(): void {
  Swal.fire({
    target: getTargetComponentSelector(),
    icon: "warning",
    title: "Exit Tutorial?",
    html: "Are you sure?",
    showConfirmButton: true,
    customClass: {
      confirmButton: "btn btn-light",
    },
    reverseButtons: true,
    confirmButtonText: "Yes",
  }).then((res) => {
    if (res.isConfirmed) {
      StartOrSkipTutorial(
        localNode,
        loggedInUser?.PublicKeyBase58Check,
        true
      ).subscribe(
        (response) => {
          let navigate = GetNav();
          // Auto update logged in user's tutorial status - we don't need to fetch it via get users stateless right now.
          loggedInUser.TutorialStatus = TutorialStatus.SKIPPED;
          navigate(routeNames.BROWSE);
        },
        (err) => {
          _alertError(err.error.error);
        }
      );
    }
  });
}

let jumioInterval: Timer = null;
// If we return from the Jumio flow, poll for up to 10 minutes to see if we need to update the user's balance.
export function pollLoggedInUserForJumio(publicKey: string): void {
  if (jumioInterval) {
    clearInterval(jumioInterval);
  }
  let attempts = 0;
  let numTries = 120;
  let timeoutMillis = 5000;
  jumioInterval = setInterval(() => {
    if (attempts >= numTries) {
      clearInterval(jumioInterval);
      return;
    }

    GetJumioStatusForPublicKey(
      process.env.NEXT_PUBLIC_verificationEndpointHostname,
      publicKey
    )
      .subscribe(
        (res: any) => {
          if (res.JumioVerified) {
            let user: User;
            userList.forEach((userInList, idx) => {
              if (userInList.PublicKeyBase58Check === publicKey) {
                userList[idx].JumioVerified = res.JumioVerified;
                userList[idx].JumioReturned = res.JumioReturned;
                userList[idx].JumioFinishedTime = res.JumioFinishedTime;
                userList[idx].BalanceNanos = res.BalanceNanos;
                userList[idx].MustCompleteTutorial = true;
                user = userList[idx];
              }
            });
            if (user) {
              setLoggedInUser(user);
            }
            celebrate();
            if (user.TutorialStatus === TutorialStatus.EMPTY) {
              startTutorialAlert();
            }
            clearInterval(jumioInterval);
            return;
          }
          // If the user wasn't verified by jumio, but Jumio did return a callback, stop polling.
          if (res.JumioReturned) {
            clearInterval(jumioInterval);
          }
        },
        (error) => {
          clearInterval(jumioInterval);
        }
      )
      .add(() => attempts++);
  }, timeoutMillis);
}

export function getFreeDESOMessage(): string {
  return referralUSDCents
    ? formatUSD(referralUSDCents / 100, 0)
    : nanosToUSD(jumioDeSoNanos, 0);
}

export function getReferralUSDCents(): void {
  const referralHash = localStorage.getItem("referralCode");
  if (referralHash) {
    GetReferralInfoForReferralHash(
      process.env.NEXT_PUBLIC_verificationEndpointHostname,
      referralHash
    ).subscribe((res) => {
      const referralInfo = res.ReferralInfoResponse.Info;
      if (
        res.ReferralInfoResponse.IsActive &&
        (referralInfo.TotalReferrals < referralInfo.MaxReferrals ||
          referralInfo.MaxReferrals == 0)
      ) {
        referralUSDCents = referralInfo.RefereeAmountUSDCents;
      }
    });
  }
}

//   ----------------- start of eth/imx functions -----------------
let counter = 0;

export function getPostsRecursive(metadataPostHashArr) {
  getPost(true, metadataPostHashArr[counter]).subscribe(
    (res) => {
      console.log(counter);
      counter++;
      // console.log(res["PostFound"]);
      // console.log(this.ethMarketplaceNFTsData);
      ethMarketplaceNFTsData.push(res["PostFound"]);
      // console.log(this.ethMarketplaceNFTsData);
      if (counter < metadataPostHashArr.length) {
        getPostsRecursive(metadataPostHashArr);
      } else {
        console.log(ethMarketplaceNFTsData);
        updateDataToShow();
      }
    },
    (err: any) => {
      console.log(err);
      counter++;
      if (counter < metadataPostHashArr.length) {
        getPostsRecursive(metadataPostHashArr);
      } else {
        updateDataToShow();
      }
    }
  );
}

//   for sale ETH nfts - highest price first
export async function sortEthMarketplaceHighestPriceFirst() {
  isMarketplaceLoading = true;
  ethMarketplaceNFTsData = [];

  const options = { method: "GET", headers: { Accept: "*/*" } };

  let res = await fetch(
    `${process.env.NEXT_PUBLIC_MAINNET_ENV_URL}/orders?order_by=buy_quantity&direction=desc&status=active&sell_token_address=${process.env.NEXT_PUBLIC_TOKEN_ADDRESS}`,
    options
  );
  let resJson = await res.json();
  console.log(resJson);
  console.log(resJson["result"]);
  let NFTsForSaleLength = resJson["result"].length;
  let NFTsForSaleArr = [];

  for (var i = 0; i < NFTsForSaleLength; i++) {
    NFTsForSaleArr.push(resJson["result"][i]["sell"]["data"]["token_id"]);
  }

  let metadataPostHashArr = [];
  for (var i = 0; i < NFTsForSaleArr.length; i++) {
    let metadataRes = await fetch(
      `https://supernovas.app/api/v0/imx/metadata/${NFTsForSaleArr[i]}`
    );
    let metadataResJson = await metadataRes.json();
    if (ethMarketplaceNFTCategory === "All") {
      metadataPostHashArr.push(metadataResJson["PostHashHex"]);
    } else {
      if (metadataResJson["Category"] === ethMarketplaceNFTCategory) {
        metadataPostHashArr.push(metadataResJson["PostHashHex"]);
      } else {
        continue;
      }
    }
  }

  counter = 0;
  getPostsRecursive(metadataPostHashArr);

  setTimeout(() => {
    isMarketplaceLoading = false;
  }, 2000);
}

//   for sale ETH nfts - lowest price first
export async function sortEthMarketplaceLowestPriceFirst() {
  isMarketplaceLoading = true;
  ethMarketplaceNFTsData = [];

  const options = { method: "GET", headers: { Accept: "*/*" } };

  let res = await fetch(
    `${process.env.NEXT_PUBLIC_MAINNET_ENV_URL}/orders?order_by=buy_quantity&direction=asc&status=active&sell_token_address=${process.env.NEXT_PUBLIC_TOKEN_ADDRESS}`,
    options
  );
  let resJson = await res.json();
  console.log(resJson);
  console.log(resJson["result"]);
  let NFTsForSaleLength = resJson["result"].length;
  let NFTsForSaleArr = [];

  for (var i = 0; i < NFTsForSaleLength; i++) {
    NFTsForSaleArr.push(resJson["result"][i]["sell"]["data"]["token_id"]);
  }

  let metadataPostHashArr = [];
  for (var i = 0; i < NFTsForSaleArr.length; i++) {
    let metadataRes = await fetch(
      `https://supernovas.app/api/v0/imx/metadata/${NFTsForSaleArr[i]}`
    );
    let metadataResJson = await metadataRes.json();
    if (ethMarketplaceNFTCategory === "All") {
      metadataPostHashArr.push(metadataResJson["PostHashHex"]);
    } else {
      if (metadataResJson["Category"] === ethMarketplaceNFTCategory) {
        metadataPostHashArr.push(metadataResJson["PostHashHex"]);
      } else {
        continue;
      }
    }
  }

  counter = 0;
  getPostsRecursive(metadataPostHashArr);

  setTimeout(() => {
    isMarketplaceLoading = false;
  }, 2000);
}

//   get all ETH nfts
export async function getAllEthNFTs() {
  isMarketplaceLoading = true;
  ethMarketplaceNFTsData = [];
  // highest price and lowest price are not available on ethereum
  if (
    marketplaceSortType === "highest price first" ||
    marketplaceSortType === "lowest price first"
  ) {
    marketplaceSortType = "most recent first";
  }

  let NFTsAllArr = [];
  try {
    const options = {
      method: "GET",
      headers: { Accept: "application/json" },
    };
    // https://api.ropsten.x.immutable.com/v1/mints?token_address=

    let res = await fetch(
      `${process.env.NEXT_PUBLIC_MAINNET_ENV_URL}/mints?token_address=${process.env.NEXT_PUBLIC_TOKEN_ADDRESS}`,
      options
    );
    let resJson = await res.json();
    let NFTsAllLength = resJson["result"].length;

    for (var i = 0; i < NFTsAllLength; i++) {
      NFTsAllArr.push(resJson["result"][i]["token"]["data"]["token_id"]);
    }
    console.log(NFTsAllArr);
  } catch (err) {
    console.error(err);
    // REWRITE IN REACT
    //   this.modalService.show(GeneralSuccessModalComponent, {
    //     class: "modal-dialog-centered nft_placebid_modal_bx  modal-lg",
    //     initialState: {
    //       header: "Error",
    //       text: "There was an error loading the immutable x marketplace. Please try again in a few hours.",
    //       buttonText: "Ok",
    //       buttonClickedAction: "ethMarketplaceError",
    //     },
    //     animated: false,
    //   });
    // REWRITE IN REACT END
  }

  SortETHMarketplace(
    localNode,
    loggedInUser?.PublicKeyBase58Check,
    NFTsAllArr,
    ethMarketplaceNFTCategory,
    marketplaceSortType,
    ethMarketplaceVerifiedCreators
  ).subscribe(
    (res) => {
      console.log(res);
      ethMarketplaceNFTsData = res["PostEntryResponse"];
      updateDataToShow();
      isMarketplaceLoading = false;
    },
    (err) => {
      console.log(err);
    }
  );
}

//   get all ETH nfts by filter
export async function getEthNFTsByFilter() {
  isMarketplaceLoading = true;
  ethMarketplaceNFTsData = [];
  // highest price and lowest price are not available on ethereum
  if (
    marketplaceSortType === "highest price first" ||
    marketplaceSortType === "lowest price first"
  ) {
    marketplaceSortType = "most recent first";
  }

  let NFTsAllArr = [];
  // status is all
  if (ethMarketplaceStatus === "all") {
    try {
      const options = {
        method: "GET",
        headers: { Accept: "application/json" },
      };

      let res = await fetch(
        `${process.env.NEXT_PUBLIC_MAINNET_ENV_URL}/mints?token_address=${process.env.NEXT_PUBLIC_TOKEN_ADDRESS}`,
        options
      );
      let resJson = await res.json();
      let NFTsAllLength = resJson["result"].length;

      for (var i = 0; i < NFTsAllLength; i++) {
        NFTsAllArr.push(resJson["result"][i]["token"]["data"]["token_id"]);
      }
      console.log(NFTsAllArr);
    } catch (err) {
      console.error(err);
      // REWRITE IN REACT
      // this.modalService.show(GeneralSuccessModalComponent, {
      //   class: "modal-dialog-centered nft_placebid_modal_bx  modal-lg",
      //   initialState: {
      //     header: "Error",
      //     text: "There was an error loading the immutable x marketplace. Please try again in a few hours.",
      //     buttonText: "Ok",
      //     buttonClickedAction: "ethMarketplaceError",
      //   },
      //   animated: false,
      // });
      // REWRITE IN REACT END
    }
  }
  // status is for sale
  else if (ethMarketplaceStatus === "for sale") {
    try {
      const options = { method: "GET", headers: { Accept: "*/*" } };

      let res = await fetch(
        `${process.env.NEXT_PUBLIC_MAINNET_ENV_URL}/orders?status=active&sell_token_address=${process.env.NEXT_PUBLIC_TOKEN_ADDRESS}`,
        options
      );
      let resJson = await res.json();
      console.log(resJson);
      console.log(resJson["result"]);
      let NFTsForSaleLength = resJson["result"].length;

      for (var i = 0; i < NFTsForSaleLength; i++) {
        NFTsAllArr.push(resJson["result"][i]["sell"]["data"]["token_id"]);
      }

      console.log(NFTsAllArr);
    } catch (err) {
      console.error(err);
      // REWRITE IN REACT
      // this.modalService.show(GeneralSuccessModalComponent, {
      //   class: "modal-dialog-centered nft_placebid_modal_bx  modal-lg",
      //   initialState: {
      //     header: "Error",
      //     text: "There was an error loading the immutable x marketplace. Please try again in a few hours.",
      //     buttonText: "Ok",
      //     buttonClickedAction: "ethMarketplaceError",
      //   },
      //   animated: false,
      // });
      // REWRITE IN REACT
    }
  }

  // endpoint: string,
  // ReaderPublicKeyBase58Check: string,
  // TokenIdArray: string[],
  // Category: string,
  // SortType: string,
  // CreatorsType: string

  SortETHMarketplace(
    localNode,
    loggedInUser?.PublicKeyBase58Check,
    NFTsAllArr,
    ethMarketplaceNFTCategory,
    marketplaceSortType,
    ethMarketplaceVerifiedCreators
  ).subscribe(
    (res) => {
      console.log(res);
      ethMarketplaceNFTsData = res["PostEntryResponse"];
      updateDataToShow();
      isMarketplaceLoading = false;
    },
    (err) => {
      console.log(err);
      // REWRITE IN REACT
      //   this.modalService.show(GeneralSuccessModalComponent, {
      //     class: "modal-dialog-centered nft_placebid_modal_bx  modal-lg",
      //     initialState: {
      //       header: "Error",
      //       text: "There are no results that match your search criteria. Please search again.",
      //       buttonText: "Ok",
      //       buttonClickedAction: "connectWalletMobileErrorPageReload",
      //     },
      //   });
      // REWRITE IN REACT END
    }
  );
}

export function updateDataToShow() {
  ethMarketplaceNFTsDataToShow = ethMarketplaceNFTsData.slice(0, 30);
  console.log(ethMarketplaceNFTsDataToShow);
}

export function getPost(fetchParents: boolean = true, nftPostHashHex: string) {
  // Hit the Get Single Post endpoint with specific parameters
  let readerPubKey = "";
  if (loggedInUser) {
    readerPubKey = loggedInUser.PublicKeyBase58Check;
  }
  return GetSinglePost(
    localNode,
    nftPostHashHex /*PostHashHex*/,
    readerPubKey /*ReaderPublicKeyBase58Check*/,
    fetchParents,
    0,
    0,
    showAdminTools() /*AddGlobalFeedBool*/
  );
}
//   end of marketplace imx functions

// start of profile imx functions
let link = new Link(process.env.NEXT_PUBLIC_MAINNET_LINK_URL);
let getCollectedNFTsCounter = 0;

export function getCollectedPostsRecursive(metadataPostHashArr) {
  getPost(true, metadataPostHashArr[getCollectedNFTsCounter]).subscribe(
    (res) => {
      console.log(getCollectedNFTsCounter);
      getCollectedNFTsCounter++;
      console.log(res["PostFound"]);
      console.log(ethNFTsCollected);
      ethNFTsCollected.push(res["PostFound"]);
      console.log(ethNFTsCollected);
      if (getCollectedNFTsCounter < metadataPostHashArr.length) {
        getCollectedPostsRecursive(metadataPostHashArr);
      } else {
        return;
      }
    },
    (err: any) => {
      console.log(err);
      getCollectedNFTsCounter++;
      if (getCollectedNFTsCounter < metadataPostHashArr.length) {
        getCollectedPostsRecursive(metadataPostHashArr);
      } else {
        return;
      }
    }
  );
}

//   get collected eth NFTs for logged in wallet
export async function getCollectedNFTs() {
  ethNFTsCollected = [];

  const publicApiUrl: string = process.env.NEXT_PUBLIC_MAINNET_ENV_URL ?? "";
  imxClient = await ImmutableXClient.build({ publicApiUrl });

  console.log(imxWalletAddress);

  let collectedNFTs = await imxClient.getAssets({
    user: imxWalletAddress,
    collection: process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
  });
  console.log(collectedNFTs);

  // let collectedNFTsResJson = await collectedNFTs.json();
  let collectedNFTsLength = collectedNFTs["result"].length;
  let collectedNFTsArr = [];

  for (var i = 0; i < collectedNFTsLength; i++) {
    if (!collectedNFTs["result"][i]["metadata"]["Token_id"]) {
      console.log("not defined -------- ");
    } else {
      collectedNFTsArr.push(
        collectedNFTs["result"][i]["metadata"]["Token_id"].toString()
      );
      console.log(collectedNFTsArr);
    }
  }

  // endpoint: string,
  // ReaderPublicKeyBase58Check: string,
  // TokenIdArray: string[],
  // Category: string,
  // SortType: string,
  // CreatorsType: string

  SortETHMarketplace(
    localNode,
    loggedInUser?.PublicKeyBase58Check,
    collectedNFTsArr,
    "all",
    "most recent first",
    "all"
  ).subscribe(
    (res) => {
      console.log(res);
      ethNFTsCollected = res["PostEntryResponse"];
      let temp = [];
      ethNFTsCollected.forEach((post) => {
        temp.push({
          PostEntryResponse: post,
          NFTEntryResponses: [],
        });
      });
      collectedNFTsToShow = collectedNFTsToShow.concat(temp);
      collectedNFTsToShow.sort(
        (a, b) =>
          b.PostEntryResponse.TimestampNanos -
          a.PostEntryResponse.TimestampNanos
      );
    },
    (err) => {
      console.log(err);
    }
  );
}

//   get created eth NFTs for logged in wallet
export async function getCreatedNFTs() {
  ethNFTsCreated = [];

  const publicApiUrl: string = process.env.NEXT_PUBLIC_MAINNET_ENV_URL ?? "";
  imxClient = await ImmutableXClient.build({ publicApiUrl });

  const options = { method: "GET", headers: { Accept: "application/json" } };

  let createdNFTs = await fetch(
    `${process.env.NEXT_PUBLIC_MAINNET_ENV_URL}/mints?user=${imxWalletAddress}&token_address=${process.env.NEXT_PUBLIC_TOKEN_ADDRESS}`,
    options
  );

  createdNFTs = await createdNFTs.json();
  console.log(createdNFTs);

  let createdNFTsLength = createdNFTs["result"].length;
  let createdNFTsArr = [];

  for (var i = 0; i < createdNFTsLength; i++) {
    createdNFTsArr.push(createdNFTs["result"][i]["token"]["data"]["token_id"]);
  }

  // endpoint: string,
  // ReaderPublicKeyBase58Check: string,
  // TokenIdArray: string[],
  // Category: string,
  // SortType: string,
  // CreatorsType: string

  SortETHMarketplace(
    localNode,
    loggedInUser?.PublicKeyBase58Check,
    createdNFTsArr,
    "all",
    "most recent first",
    "all"
  ).subscribe(
    (res) => {
      console.log(res);
      ethNFTsCreated = res["PostEntryResponse"];
      createdNFTsToShow = createdNFTsToShow.concat(ethNFTsCreated);
      createdNFTsToShow.sort((a, b) => b.TimestampNanos - a.TimestampNanos);
    },
    (err) => {
      console.log(err);
    }
  );
}
//   ----------------- end of eth/imx functions -----------------
