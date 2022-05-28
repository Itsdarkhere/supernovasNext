import { Observable, Observer } from "../node_modules/rxjs";
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
import { MixpanelService } from "./mixpanel";
import { BackendApiService } from "./backendapi-context";
import ConfettiGenerator from "confetti-js";
import Swal from "sweetalert2";
import Timer = NodeJS.Timer;
import { Link, ImmutableXClient } from "@imtbl/imx-sdk";
import { useNavigate } from "react-router-dom";
import { SwalHelper } from "./helpers/swal-helper";
import { IdentityService } from "./identity-context";

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

export class GlobalVarsService {
  profileData: any;

  navigate = useNavigate();

  //   isCreator boolean
  isCreator: boolean;
  //   isCollector boolean
  isCollector: boolean;
  //   isVerified boolean
  isVerified: boolean;
  //   isVerifiedRes
  isVerifiedRes: any;
  //   isVerifiedStrBool
  isVerifiedStrBool: string;
  //   username
  username: any;
  //   isNullUsername
  isNullUsername: boolean;
  //   isNullUsernameRes
  isNullUsernameRes: any;
  //   isOnboardingComplete
  isOnboardingComplete: boolean;
  //   wantToVerifyPhone
  wantToVerifyPhone: boolean;
  //   phoneVerified
  phoneVerified: boolean;

  needToPickCreatorOrCollector: boolean;

  createdNFTsToShow = [];
  collectedNFTsToShow = [];

  //   ----------------------------- imx global vars -----------------------------
  imxWalletConnected: boolean;
  imxWalletAddress: string;
  imxClient: any;
  imxBalance: any;
  wantToDepositEth: boolean;
  wantToBuyEth: boolean;
  isEthereumNFTForSale: boolean;
  ethWalletAddresShort: string;
  isEthQuoteRepost: boolean = false;
  isEthWalletAssociatedToDesoProfile: boolean = false;
  //   ethMarketplaceCanFilter: boolean = false;

  //   ----------------------------- end of imx global vars -----------------------------

  // Note: I don't think we should have default values for this. I think we should just
  // loading spinner until we get a correct value. That said, I'm not going to fix that
  // right now, I'm just moving this magic number into a constant.
  static DEFAULT_NANOS_PER_USD_EXCHANGE_RATE = 1e9;
  static NANOS_PER_UNIT = 1e9;
  static WEI_PER_ETH = 1e18;

  constructor(
    private mixPanel: MixpanelService,
    private backendApi: BackendApiService,
    private identityService: IdentityService
  ) {}

  static MAX_POST_LENGTH = 560;

  static FOUNDER_REWARD_BASIS_POINTS_WARNING_THRESHOLD = 50 * 100;

  static CREATOR_COIN_RESERVE_RATIO = 0.3333333;
  static CREATOR_COIN_TRADE_FEED_BASIS_POINTS = 1;

  // This is set to false immediately after our first attempt to get a loggedInUser.
  loadingInitialAppState = true;

  // We're waiting for the user to grant storage access (full-screen takeover)
  requestingStorageAccess = false;
  // Check if we have requested storage access, if so dont show supernovas loader anymore
  requestedStorageAccess = false;

  // Track if the user is dragging the diamond selector. If so, need to disable text selection in the app.
  userIsDragging = false;

  RouteNames = RouteNames;

  pausePolling = false; // TODO: Monkey patch for when polling conflicts with other calls.
  pauseMessageUpdates = false; // TODO: Monkey patch for when message polling conflicts with other calls.

  desoToUSDExchangeRateToDisplay = "Fetching...";

  // We keep information regarding the messages tab in global vars for smooth
  // transitions to and from messages.
  messageNotificationCount = 0;
  messagesSortAlgorithm = "time";
  messagesPerFetch = 25;
  openSettingsTray = false;
  newMessagesFromPage = 0;
  messagesRequestsHoldersOnly = true;
  messagesRequestsHoldingsOnly = false;
  messagesRequestsFollowersOnly = false;
  messagesRequestsFollowedOnly = false;

  // Whether or not to show processing spinners in the UI for unmined transactions.
  // TODO: Move into environment.ts
  showProcessingSpinners = false;

  // We track logged-in state
  loggedInUser: User;
  userList: User[] = [];

  // map[pubkey]->bool of globomods
  globoMods: any;
  feeRateDeSoPerKB = 1000 / 1e9;
  postsToShow = [];
  followFeedPosts = [];
  hotFeedPosts = [];
  // Marketplace is loading / filtering
  isMarketplaceLoading = false;
  isMarketplaceLoadingMore = false;
  isCollectionLoadingMore = false;
  marketplaceNFTsData: NFTCollectionResponse[];
  ethMarketplaceNFTsData: NFTCollectionResponse[];
  ethMarketplaceNFTsDataToShow: NFTCollectionResponse[];
  ethNFTsCollected: NFTCollectionResponse[];
  ethNFTsCreated: NFTCollectionResponse[];
  marketplaceCreatorData: CreatorCardResponse[];
  // The buttons on the marketplace
  // ETH
  ethMarketplaceStatus = "all";
  ethMarketplaceNFTCategory = "all";
  ethMarketplaceVerifiedCreators = "verified";
  // Deso
  desoMarketplace = true;
  marketplaceViewTypeCard = true;
  marketplaceVerifiedCreators = "all";
  marketplaceContentFormat = "all";
  marketplaceStatus = "has bids";
  marketplaceNFTCategory = "all";
  marketplaceLowPriceNanos = 0;
  marketplaceHighPriceNanos = 0;
  marketplaceLowPriceUSD = 0;
  marketplaceHighPriceUSD = 0;
  marketplacePriceRangeSet = false;
  marketplaceMarketType = "all";
  marketplaceSortType = "most recent first";
  // Marketplace Offset
  marketplaceNFTsOffset = 0;
  ethMarketplaceNFTsOffset = 0;
  // Discovery nfts page
  nftsDataToShow: NFTCollectionResponse[];
  nftsStartIndex = 0;
  nftsEndIndex = 20;
  // Collection page
  collectionNFTsLoading = true;
  collectionOffset = 0;

  messageResponse = null;
  messageMeta = {
    // <public_key || tstamp> -> messageObj
    decryptedMessgesMap: {},
    // <public_key> -> numMessagesRead
    notificationMap: {},
  };
  // Search and filter params
  filterType = "";
  // The coin balance and user profiles of the coins the the user
  // hodls and the users who hodl him.
  youHodlMap: { [k: string]: BalanceEntryResponse } = {};

  // Map of diamond level to deso nanos.
  diamondLevelMap = {};

  // TODO(performance): We used to call the functions called by this function every
  // second. Now we call them only when needed, but the future is to get rid of this
  // and make everything use sockets.
  updateEverything: any;

  emailRegExp =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  emailRegExTest =
    /(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*:(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)(?:,\s*(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*))*)?;\s*)/;

  latestBitcoinAPIResponse: any;

  // Whether the left bar (hamburger) menu for mobile is currently open
  isLeftBarMobileOpen = false;

  // Whether the left bar (hamburger) menu for mobile Marketplace is currently open
  isMarketplaceLeftBarMobileOpen = false;
  isEthMarketplaceLeftBarMobileOpen = false;

  // NFT view type
  nftsPageViewTypeCard = true;

  // If no erros received on mobile verification
  isPhoneNumberVerificationTextServerErrorFree: boolean;

  loggedInUserObservable: Observable<LoggedInUserObservableResult>;
  loggedInUserObservers = [] as Observer<LoggedInUserObservableResult>[];

  followChangeObservable: Observable<FollowChangeObservableResult>;
  followChangeObservers = [] as Observer<FollowChangeObservableResult>[];

  nodeInfo: any;
  // The API node we connect to
  localNode: string = null;
  // Whether or not the node is running on the testnet or mainnet.
  isTestnet = false;

  // Whether or not to show the Verify phone number flow.
  showPhoneNumberVerification = true;

  // Whether or not to show the Buy DeSo with USD flow.
  showBuyWithUSD = false;

  // Buy DESO with ETH
  showBuyWithETH = false;

  // Whether or not to show the Jumio verification flow.
  showJumio = false;

  //   // Weather or not to show Username insert in signup flow
  //   mobileVerified = false;

  // Whether or not this node comps profile creation.
  isCompProfileCreation = false;

  // Current fee to create a profile.
  createProfileFeeNanos: number;

  // ETH exchange rates
  usdPerETHExchangeRate: number;
  nanosPerETHExchangeRate: number;

  // BTC exchange rates
  satoshisPerDeSoExchangeRate: number;
  usdPerBitcoinExchangeRate: number;

  // USD exchange rates
  nanosPerUSDExchangeRate: number;

  defaultFeeRateNanosPerKB: number;

  NanosSold: number;
  ProtocolUSDCentsPerBitcoinExchangeRate: number;

  nanosToDeSoMemo = {};
  formatUSDMemo = {};

  confetti: any;
  canvasCount = 0;
  minSatoshisBurnedForProfileCreation: number;

  // Price of DeSo values
  ExchangeUSDCentsPerDeSo: number;
  USDCentsPerDeSoReservePrice: number;
  BuyDeSoFeeBasisPoints: number = 0;

  // Timestamp of last profile update
  profileUpdateTimestamp: number;

  jumioDeSoNanos = 0;

  referralUSDCents: number = 0;

  // How many unread notifications the user has
  unreadNotifications: number = 0;

  transactionFeeMap: { [k: string]: TransactionFee[] };
  transactionFeeMax: number = 0;
  transactionFeeInfo: string;

  buyETHAddress: string = "";

  nodes: { [id: number]: DeSoNode };

  NFTRoyaltyToCoinBasisPoints: any;
  NFTRoyaltyToCreatorBasisPoints: any;

  //   ------------------------------------ update globalVars for loggedInUser ------------------------------------
  getCircularReplacer = () => {
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
  };

  scrollPosition: number;
  body = document.querySelector("body");
  closeLeftBarMobile() {
    // Disable scroll
    this.body.style.removeProperty("overflow");
    this.body.style.removeProperty("position");
    this.body.style.removeProperty("top");
    this.body.style.removeProperty("width");
    window.scrollTo(0, this.scrollPosition);
    // Close
    this.isLeftBarMobileOpen = false;
  }
  openLeftBarMobile() {
    // Get scroll position
    this.scrollPosition = window.pageYOffset;
    this.body.style.overflow = "hidden";
    this.body.style.position = "fixed";
    this.body.style.top = `-${this.scrollPosition}px`;
    this.body.style.width = "100%";
    // Close
    this.isLeftBarMobileOpen = true;
  }

  checkIsVerified() {
    this.isVerifiedRes = JSON.stringify(
      this.loggedInUser?.ProfileEntryResponse
    );
    if (this.isVerifiedRes === "null") {
      this.isVerified = false;
    } else {
      this.isVerifiedStrBool = JSON.stringify(
        this.loggedInUser?.ProfileEntryResponse["IsVerified"]
      );
      if (this.isVerifiedStrBool === "true") {
        this.isVerified = true;
      } else {
        this.isVerified = false;
      }
    }
    // console.log(` ------------------------------------ isVerified status is ${this.isVerified} ------------------- `);
  }

  checkNullUsername() {
    this.isNullUsernameRes = JSON.stringify(
      this.loggedInUser?.ProfileEntryResponse
    );

    if (this.isNullUsernameRes === "null") {
      // comment/uncomment line below out for testing
      this.isNullUsername = true;
      //   this.isNullUsername = false;
    } else {
      this.username = JSON.stringify(
        this.loggedInUser?.ProfileEntryResponse["Username"]
      );
      this.username = this.username.replace(/['"]+/g, "");
      //   console.log(` ------------------------ username is ${this.username} ------------------------ `);
      if (this.username) {
        this.isNullUsername = false;
      } else {
        // comment line below out for testing
        this.isNullUsername = true;
      }
    }

    // console.log(
    //   ` -------------------------------- isNullUsername is ${this.isNullUsername} -------------------------------- `
    // );
  }

  checkOnboardingCompleted() {
    //   if they are a creator, have a profile (username) and are verified then onboarding is complete
    // if (this.isCreator === true && this.isNullUsername === false && this.isVerified === true) {
    if (this.isCreator === true && this.isNullUsername === false) {
      this.needToPickCreatorOrCollector = false;
      this.isOnboardingComplete = true;
    }
    // if they are a collector and have a profile (username) then onboarding is complete
    else if (this.isCollector === true && this.isNullUsername === false) {
      this.isOnboardingComplete = true;
      this.needToPickCreatorOrCollector = false;
    } else {
      this.isOnboardingComplete = false;
      this.needToPickCreatorOrCollector = true;
    }

    // console.log(` ------------------------------ isOnboardingComplete ${this.isOnboardingComplete} ---------------- `);
  }

  async checkOnboardingStatus(): Promise<void> {
    const publicKey = this.loggedInUser?.PublicKeyBase58Check;

    if (publicKey) {
      this.backendApi
        .GetCollectorOrCreator(this.localNode, publicKey)
        .subscribe(
          (res) => {
            console.log(
              ` ---------------------------------- res ${JSON.stringify(
                res
              )} ---------------------------------- `
            );
            this.isCreator = res["Creator"];
            this.isCollector = res["Collector"];

            //   update checkIsVerified
            //   this.checkIsVerified();

            //   update checkNullUsername
            this.checkNullUsername();

            //   update onboardingcomplete status
            this.checkOnboardingCompleted();

            //   this.isCreator = false;
            //   this.isCollector = true;
            //   this.isNullUsername = true;
            //   this.isVerified = false;
            //   console.log(` -------------- isCreator true? ${this.isCreator}`);
            //   console.log(` -------------- isNullUsername true? ${this.isNullUsername}`);
            //   console.log(` -------------- isVerified false? ${this.isVerified}`);
            this.mixPanel.track68("Onboarding Complete?", {
              "Onboarding complete?": this.isOnboardingComplete,
            });
            console.log(
              ` -------------- isOnboardingComplete? ${this.isOnboardingComplete} `
            );
          },
          (err) => {
            console.log(err);
            this.isCreator = false;
            this.isCollector = false;
          }
        );
    }
  }
  //   ------------------------------------ end of update globalVars for loggedInUser ------------------------------------

  SetupMessages() {
    // If there's no loggedInUser, we set the notification count to zero
    if (!this.loggedInUser) {
      this.messageNotificationCount = 0;
      return;
    }

    // If a message response already exists, we skip this step
    if (this.messageResponse) {
      return;
    }

    let storedTab = this.backendApi.GetStorage("mostRecentMessagesTab");
    if (storedTab === null) {
      storedTab = "All messages";
      this.backendApi.SetStorage("mostRecentMessagesTab", storedTab);
    }

    // Set the filters most recently used and load the messages
    this.SetMessagesFilter(storedTab);
    this.LoadInitialMessages();
  }

  GetUnreadNotifications() {
    if (this.loggedInUser) {
      this.backendApi
        .GetUnreadNotificationsCount(
          this.localNode,
          this.loggedInUser.PublicKeyBase58Check
        )
        .toPromise()
        .then(
          (res) => {
            this.unreadNotifications = res.NotificationsCount;
            if (res.UpdateMetadata) {
              this.backendApi
                .SetNotificationsMetadata(
                  this.localNode,
                  this.loggedInUser.PublicKeyBase58Check,
                  -1,
                  res.LastUnreadNotificationIndex,
                  res.NotificationsCount
                )
                .toPromise();
            }
          },
          (err) => {
            console.error(this.backendApi.stringifyError(err));
          }
        );
    }
  }
  SetMessagesFilter(tabName: any) {
    // Set the request parameters if it's a known tab.
    // Custom is set in the filter menu component and saved in local storage.
    if (tabName !== "Custom") {
      this.messagesRequestsHoldersOnly = tabName === "My holders";
      this.messagesRequestsHoldingsOnly = false;
      this.messagesRequestsFollowersOnly = false;
      this.messagesRequestsFollowedOnly = false;
      this.messagesSortAlgorithm = "time";
    } else {
      this.messagesRequestsHoldersOnly = this.backendApi.GetStorage(
        "customMessagesRequestsHoldersOnly"
      );
      this.messagesRequestsHoldingsOnly = this.backendApi.GetStorage(
        "customMessagesRequestsHoldingsOnly"
      );
      this.messagesRequestsFollowersOnly = this.backendApi.GetStorage(
        "customMessagesRequestsFollowersOnly"
      );
      this.messagesRequestsFollowedOnly = this.backendApi.GetStorage(
        "customMessagesRequestsFollowedOnly"
      );
      this.messagesSortAlgorithm = this.backendApi.GetStorage(
        "customMessagesSortAlgorithm"
      );
    }
  }

  LoadInitialMessages() {
    if (!this.loggedInUser) {
      return;
    }

    this.backendApi
      .GetMessages(
        this.localNode,
        this.loggedInUser.PublicKeyBase58Check,
        "",
        this.messagesPerFetch,
        this.messagesRequestsHoldersOnly,
        this.messagesRequestsHoldingsOnly,
        this.messagesRequestsFollowersOnly,
        this.messagesRequestsFollowedOnly,
        this.messagesSortAlgorithm
      )
      .subscribe(
        (res) => {
          if (this.pauseMessageUpdates) {
            // We pause message updates when a user sends a messages so that we can
            // wait for it to be sent before updating the thread.  If we do not do this the
            // temporary message place holder would disappear until "GetMessages()" finds it.
          } else {
            this.messageResponse = res;

            // Update the number of new messages so we know when to stop scrolling
            this.newMessagesFromPage = res.OrderedContactsWithMessages.length;
          }
        },
        (err) => {
          console.error(this.backendApi.stringifyError(err));
        }
      );
  }

  _notifyLoggedInUserObservers(
    newLoggedInUser: User,
    isSameUserAsBefore: boolean
  ) {
    this.loggedInUserObservers.forEach((observer) => {
      const result = new LoggedInUserObservableResult();
      result.loggedInUser = newLoggedInUser;
      result.isSameUserAsBefore = isSameUserAsBefore;
      observer.next(result);
    });
  }

  userInTutorial(user: User): boolean {
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
  setLoggedInUser(user: User) {
    const isSameUserAsBefore =
      this.loggedInUser &&
      user &&
      this.loggedInUser.PublicKeyBase58Check === user.PublicKeyBase58Check;

    this.loggedInUser = user;

    if (this.loggedInUser) {
      // Fetch referralLinks for the userList before completing the load.
      this.backendApi
        .GetReferralInfoForUser(
          this.localNode,
          this.loggedInUser?.PublicKeyBase58Check
        )
        .subscribe(
          (res: any) => {
            this.loggedInUser.ReferralInfoResponses = res.ReferralInfoResponses;
          },
          (err: any) => {
            console.log(err);
          }
        );
    }

    // If Jumio callback hasn't returned yet, we need to poll to update the user metadata.
    if (user && user?.JumioFinishedTime > 0 && !user?.JumioReturned) {
      this.pollLoggedInUserForJumio(user.PublicKeyBase58Check);
    }

    if (!isSameUserAsBefore) {
      // Store the user in localStorage
      this.backendApi.SetStorage(
        this.backendApi.LastLoggedInUserKey,
        user?.PublicKeyBase58Check
      );

      // Clear out the message inbox and BitcoinAPI
      this.messageResponse = null;
      this.latestBitcoinAPIResponse = null;

      // Fix the youHodl / hodlYou maps.
      for (const entry of this.loggedInUser?.UsersYouHODL || []) {
        this.youHodlMap[entry.CreatorPublicKeyBase58Check] = entry;
      }
      this.followFeedPosts = [];
    }

    this._notifyLoggedInUserObservers(user, isSameUserAsBefore);
    this.trackLoggedInUser();
  }

  trackLoggedInUser() {
    if (this.loggedInUser) {
      this.mixPanel.identify1(this.loggedInUser?.PublicKeyBase58Check);
      this.mixPanel.peopleset({
        $name: this.loggedInUser?.ProfileEntryResponse?.Username,
      });
    }
  }

  getLinkForReferralHash(referralHash: string) {
    // FIXME: Generalize this once there are referral programs running
    // on other nodes.
    return `https://supernovas.app?r=${referralHash}`;
  }

  hasUserBlockedCreator(publicKeyBase58Check): boolean {
    return (
      this.loggedInUser?.BlockedPubKeys &&
      publicKeyBase58Check in this.loggedInUser?.BlockedPubKeys
    );
  }

  showAdminTools(): boolean {
    return this.loggedInUser?.IsAdmin || this.loggedInUser?.IsSuperAdmin;
  }

  showSuperAdminTools(): boolean {
    return this.loggedInUser?.IsSuperAdmin;
  }

  networkName(): string {
    return this.isTestnet ? "testnet" : "mainnet";
  }

  getUSDForDiamond(index: number): string {
    const desoNanos = this.diamondLevelMap[index];
    const val = this.nanosToUSDNumber(desoNanos);
    if (val < 1) {
      return this.formatUSD(Math.max(val, 0.01), 2);
    }
    return this.abbreviateNumber(val, 0, true);
  }

  nanosToDeSo(nanos: number, maximumFractionDigits?: number): string {
    if (
      this.nanosToDeSoMemo[nanos] &&
      this.nanosToDeSoMemo[nanos][maximumFractionDigits]
    ) {
      return this.nanosToDeSoMemo[nanos][maximumFractionDigits];
    }
    this.nanosToDeSoMemo[nanos] = this.nanosToDeSoMemo[nanos] || {};

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
    this.nanosToDeSoMemo[nanos][maximumFractionDigits] = Number(
      num
    ).toLocaleString("en-US", {
      style: "decimal",
      currency: "USD",
      minimumFractionDigits,
      maximumFractionDigits,
    });
    return this.nanosToDeSoMemo[nanos][maximumFractionDigits];
  }

  formatUSD(num: number, decimal: number): string {
    if (this.formatUSDMemo[num] && this.formatUSDMemo[num][decimal]) {
      return this.formatUSDMemo[num][decimal];
    }

    this.formatUSDMemo[num] = this.formatUSDMemo[num] || {};

    this.formatUSDMemo[num][decimal] = Number(num).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal,
    });
    return this.formatUSDMemo[num][decimal];
  }

  /*
   * Converts long numbers to convenient abbreviations
   * Examples:
   *   value: 12345, decimals: 1 => 12.3K
   *   value: 3492311, decimals: 2 => 3.49M
   * */
  abbreviateNumber(
    value: number,
    decimals: number,
    formatUSD: boolean = false
  ): string {
    let shortValue;
    const suffixes = ["", "K", "M", "B", "T"];
    const suffixNum = Math.floor((("" + value.toFixed(0)).length - 1) / 3);
    if (suffixNum === 0) {
      // if the number is less than 1000, we should only show at most 2 decimals places
      decimals = Math.min(2, decimals);
    }
    shortValue = (value / Math.pow(1000, suffixNum)).toFixed(decimals);
    if (formatUSD) {
      shortValue = this.formatUSD(shortValue, decimals);
    }
    return shortValue + suffixes[suffixNum];
  }

  abbreviateRepostsNumber(
    value1: number,
    value2: number,
    decimals: number,
    formatUSD: boolean = false
  ): string {
    let shortValue1;
    const suffixes1 = ["", "K", "M", "B", "T"];
    const suffixNum1 = Math.floor((("" + value1.toFixed(0)).length - 1) / 3);
    if (suffixNum1 === 0) {
      // if the number is less than 1000, we should only show at most 2 decimals places
      decimals = Math.min(2, decimals);
    }
    shortValue1 = (value1 / Math.pow(1000, suffixNum1)).toFixed(decimals);
    if (formatUSD) {
      shortValue1 = this.formatUSD(shortValue1, decimals);
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
    if (formatUSD) {
      shortValue2 = this.formatUSD(shortValue2, decimals);
    }

    let combinedShortValue2 = shortValue2;
    let combinedShortValue3: any;
    combinedShortValue3 =
      parseInt(combinedShortValue1) + parseInt(combinedShortValue2);
    combinedShortValue3 = combinedShortValue3.toString();

    return combinedShortValue3;
  }

  nanosToUSDNumber(nanos: number): number {
    return nanos / this.nanosPerUSDExchangeRate;
  }

  usdToNanosNumber(usdAmount: number): number {
    return usdAmount * this.nanosPerUSDExchangeRate;
  }

  nanosToUSD(nanos: number, decimal?: number): string {
    if (decimal == null) {
      decimal = 4;
    }
    return this.formatUSD(this.nanosToUSDNumber(nanos), decimal);
  }

  isMobile(): boolean {
    // from https://stackoverflow.com/questions/1248081/how-to-get-the-browser-viewport-dimensions
    const viewportWidth = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    return viewportWidth <= 992;
  }
  isMobileIphone(): boolean {
    const viewportWidth = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    return viewportWidth <= 480;
  }

  // Calculates the amount of deso one would receive if they sold an amount equal to creatorCoinAmountNano
  // given the current state of a creator's coin as defined by the coinEntry
  desoNanosYouWouldGetIfYouSold(
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
          1 / GlobalVarsService.CREATOR_COIN_RESERVE_RATIO
        ));

    return (
      (desoBeforeFeesNanos *
        (100 * 100 - GlobalVarsService.CREATOR_COIN_TRADE_FEED_BASIS_POINTS)) /
      (100 * 100)
    );
  }

  // Return a formatted version of the amount one would receive in USD if they sold creatorCoinAmountNano number of Creator Coins
  // given the current state of a creator's coin as defined by the coinEntry
  usdYouWouldGetIfYouSoldDisplay(
    creatorCoinAmountNano: number,
    coinEntry: any,
    abbreviate: boolean = true
  ): string {
    if (creatorCoinAmountNano == 0) return "$0";
    const usdValue = this.nanosToUSDNumber(
      this.desoNanosYouWouldGetIfYouSold(creatorCoinAmountNano, coinEntry)
    );
    return abbreviate
      ? this.abbreviateNumber(usdValue, 2, true)
      : this.formatUSD(usdValue, 2);
  }

  creatorCoinNanosToUSDNaive(
    creatorCoinNanos,
    coinPriceDeSoNanos,
    abbreviate: boolean = false
  ): string {
    const usdValue = this.nanosToUSDNumber(
      (creatorCoinNanos / 1e9) * coinPriceDeSoNanos
    );
    return abbreviate
      ? this.abbreviateNumber(usdValue, 2, true)
      : this.formatUSD(usdValue, 2);
  }

  createProfileFeeInDeSo(): number {
    return this.createProfileFeeNanos / 1e9;
  }

  createProfileFeeInUsd(): string {
    return this.nanosToUSD(this.createProfileFeeNanos, 2);
  }

  convertTstampToDaysOrHours(tstampNanos: number) {
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

  convertTstampToDateOrTime(tstampNanos: number) {
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

  convertTstampToDateTime(tstampNanos: number) {
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

  doesLoggedInUserHaveProfile() {
    if (!this.loggedInUser) {
      return false;
    }
    const hasProfile =
      this.loggedInUser.ProfileEntryResponse &&
      this.loggedInUser.ProfileEntryResponse.Username.length > 0;

    return hasProfile;
  }

  _copyText(val: string) {
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

  truncate(ss: string, len?: number): string {
    let ll = len;
    if (!ll) {
      ll = 18;
    }
    if (!ss || ss.length <= ll) {
      return ss;
    }
    return ss.slice(0, ll) + "...";
  }

  _parseFloat(val: any) {
    return parseFloat(val) ? parseFloat(val) : 0;
  }

  scrollTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  showLandingPage() {
    return this.userList && this.userList.length === 0;
  }

  _globopoll(passedFunc: any, expirationSecs?: any) {
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

  _alertSuccess(val: any, altTitle?: string, funcAfter?: any) {
    let title = `Success!`;
    if (altTitle) {
      title = altTitle;
    }
    SwalHelper.fire({
      target: this.getTargetComponentSelector(),
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

  _alertError(
    err: any,
    showBuyDeSo: boolean = false,
    showBuyCreatorCoin: boolean = false
  ) {
    SwalHelper.fire({
      target: this.getTargetComponentSelector(),
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
      if (showBuyDeSo && res.isConfirmed) {
        // CHECK WORKS,,, same for all these
        this.navigate(RouteNames.BUY_DESO, {
          replace: false,
        });
      }
      if (showBuyCreatorCoin && res.isConfirmed) {
        this.navigate(RouteNames.CREATORS);
      }
    });
  }

  celebrate(svgList: ConfettiSvg[] = []) {
    const canvasID = "my-canvas-" + this.canvasCount;
    this.canvasCount++;
    this.canvasCount = this.canvasCount % 5;
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
    this.confetti = new ConfettiGenerator(confettiSettings);
    this.confetti.render();
  }

  _setUpLoggedInUserObservable() {
    this.loggedInUserObservable = new Observable((observer) => {
      this.loggedInUserObservers.push(observer);
    });
  }

  _setUpFollowChangeObservable() {
    this.followChangeObservable = new Observable((observer) => {
      this.followChangeObservers.push(observer);
    });
  }

  // Does some basic checks on a public key.
  isMaybePublicKey(pk: string) {
    // Test net public keys start with 'tBC', regular public keys start with 'BC'.
    return (
      (pk.startsWith("tBC") && pk.length == 54) ||
      (pk.startsWith("BC") && pk.length == 55)
    );
  }

  isVanillaRepost(post: PostEntryResponse): boolean {
    return (
      !post.Body && !post.ImageURLs?.length && !!post.RepostedPostEntryResponse
    );
  }

  getPostContentHashHex(post: PostEntryResponse): string {
    return this.isVanillaRepost(post)
      ? post.RepostedPostEntryResponse.PostHashHex
      : post.PostHashHex;
  }

  incrementCommentCount(post: PostEntryResponse): PostEntryResponse {
    if (this.isVanillaRepost(post)) {
      post.RepostedPostEntryResponse.CommentCount += 1;
    } else {
      post.CommentCount += 1;
    }
    return post;
  }

  // Helper to launch the get free deso flow in identity.
  launchGetFreeDESOFlow() {
    this.identityService
      .launch("/get-free-deso", {
        public_key: this.loggedInUser?.PublicKeyBase58Check,
        referralCode: this.referralCode(),
      })
      .subscribe(() => {
        this.updateEverything();
      });
  }

  launchIdentityFlow(event: string): void {
    this.identityService
      .launch("/log-in?accessLevelRequest=4", {
        referralCode: this.referralCode(),
        hideJumio: true,
      })
      .subscribe((res) => {
        this.backendApi.setIdentityServiceUsers(res.users, res.publicKeyAdded);
        this.updateEverything().add(() => {
          this.flowRedirect(res.signedUp, res.publicKeyAdded);
        });
      });
  }

  launchLoginFlow() {
    this.launchIdentityFlow("login");
    this.mixPanel.track54("Login launch");
  }

  launchSignupFlow() {
    this.launchIdentityFlow("create");
  }

  referralCode(): string {
    return localStorage.getItem("referralCode");
  }

  async flowRedirect(signedUp: boolean, publicKey: string): Promise<void> {
    //   flowRedirect(signedUp: boolean, publicKey: string): void {
    // if they are signedup, they need to pick creator or collector
    if (signedUp) {
      // If this node supports phone number verification, go to step 3, else proceed to step 4.
      const stepNum = 2;
      // Check works,,, previous had '/' before routename
      // Also check it works idk about the search...
      this.navigate({
        pathname: RouteNames.SIGNUP,
        search: "?stepNum=" + stepNum,
      });
    } else {
      //   this.checkOnboardingStatus();
      // Check works,,, previous had '/' before routename
      this.navigate(RouteNames.BROWSE);
    }
  }

  Init(loggedInUser: User, userList: User[]) {
    this._setUpLoggedInUserObservable();
    this._setUpFollowChangeObservable();

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

    this.getReferralUSDCents();
    this.userList = userList;
    this.satoshisPerDeSoExchangeRate = 0;
    this.nanosPerUSDExchangeRate =
      GlobalVarsService.DEFAULT_NANOS_PER_USD_EXCHANGE_RATE;
    this.usdPerBitcoinExchangeRate = 10000;
    this.defaultFeeRateNanosPerKB = 1000.0;

    this.localNode = this.backendApi.GetStorage(
      this.backendApi.LastLocalNodeKey
    );

    if (!this.localNode) {
      const hostname = (window as any).location.hostname;
      if (process.env.NEXT_PUBLIC_production) {
        this.localNode = hostname;
      } else {
        this.localNode = `${hostname}:17001`;
      }

      this.backendApi.SetStorage(
        this.backendApi.LastLocalNodeKey,
        this.localNode
      );
    }

    let identityServiceURL = this.backendApi.GetStorage(
      this.backendApi.LastIdentityServiceKey
    );
    if (!identityServiceURL) {
      identityServiceURL = process.env.NEXT_PUBLIC_identityURL;
      this.backendApi.SetStorage(
        this.backendApi.LastIdentityServiceKey,
        identityServiceURL
      );
    }
    this.identityService.identityServiceURL = identityServiceURL;
    this.identityService.sanitizedIdentityServiceURL = `${identityServiceURL}/embed?v=2`;
    // Rewrite in react ,,, perhaps not even needed but check ....
    //   this.sanitizer.bypassSecurityTrustResourceUrl(
    //     `${identityServiceURL}/embed?v=2`
    //   );
    // Rewrite in react end

    this._globopoll(() => {
      if (!this.defaultFeeRateNanosPerKB) {
        return false;
      }
      this.feeRateDeSoPerKB = this.defaultFeeRateNanosPerKB / 1e9;
      return true;
    });
  }

  // Get the highest level parent component that has the app-theme styling.
  getTargetComponentSelector(): string {
    return GlobalVarsService.getTargetComponentSelectorFromRouter();
  }

  static getTargetComponentSelectorFromRouter(): string {
    // Check works ,,,location might have issues idk
    const location = window.location.pathname;
    if (location.startsWith("/" + RouteNames.BROWSE)) {
      return "browse-page";
    }
    if (location.startsWith("/" + RouteNames.LANDING)) {
      return "landing-page";
    }
    if (location.startsWith("/" + RouteNames.INBOX_PREFIX)) {
      return "messages-page";
    }
    return "app-page";
  }

  _updateDeSoExchangeRate() {
    this.backendApi.GetExchangeRate(this.localNode).subscribe(
      (res: any) => {
        // BTC
        this.satoshisPerDeSoExchangeRate = res.SatoshisPerDeSoExchangeRate;
        this.ProtocolUSDCentsPerBitcoinExchangeRate =
          res.USDCentsPerBitcoinExchangeRate;
        this.usdPerBitcoinExchangeRate =
          res.USDCentsPerBitcoinExchangeRate / 100;

        // ETH
        this.usdPerETHExchangeRate = res.USDCentsPerETHExchangeRate / 100;
        this.nanosPerETHExchangeRate = res.NanosPerETHExchangeRate;

        // DESO
        this.NanosSold = res.NanosSold;
        this.ExchangeUSDCentsPerDeSo = res.USDCentsPerDeSoExchangeRate;
        this.USDCentsPerDeSoReservePrice =
          res.USDCentsPerDeSoReserveExchangeRate;
        this.BuyDeSoFeeBasisPoints = res.BuyDeSoFeeBasisPoints;

        const nanosPerUnit = GlobalVarsService.NANOS_PER_UNIT;
        this.nanosPerUSDExchangeRate =
          nanosPerUnit / (this.ExchangeUSDCentsPerDeSo / 100);
        this.desoToUSDExchangeRateToDisplay = this.nanosToUSD(
          nanosPerUnit,
          null
        );
        this.desoToUSDExchangeRateToDisplay = this.nanosToUSD(nanosPerUnit, 2);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  resentVerifyEmail = false;
  resendVerifyEmail() {
    this.backendApi
      .ResendVerifyEmail(this.localNode, this.loggedInUser.PublicKeyBase58Check)
      .subscribe();
    this.resentVerifyEmail = true;
  }

  startTutorialAlert(): void {
    Swal.fire({
      target: this.getTargetComponentSelector(),
      title: "Congrats!",
      html: "You just got some free money!<br><br><b>Now it's time to learn how to earn even more!</b>",
      showConfirmButton: true,
      // Only show skip option to admins
      showCancelButton: !!this.loggedInUser?.IsAdmin,
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
      this.backendApi
        .StartOrSkipTutorial(
          this.localNode,
          this.loggedInUser?.PublicKeyBase58Check,
          !res.isConfirmed /* if it's not confirmed, skip tutorial*/
        )
        .subscribe((response) => {
          // Auto update logged in user's tutorial status - we don't need to fetch it via get users stateless right now.
          this.loggedInUser.TutorialStatus = res.isConfirmed
            ? TutorialStatus.STARTED
            : TutorialStatus.SKIPPED;
          if (res.isConfirmed) {
            // Check works
            // This is not used so I just removed it...
          }
        });
    });
  }

  skipTutorial(): void {
    Swal.fire({
      target: this.getTargetComponentSelector(),
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
        this.backendApi
          .StartOrSkipTutorial(
            this.localNode,
            this.loggedInUser?.PublicKeyBase58Check,
            true
          )
          .subscribe(
            (response) => {
              // Auto update logged in user's tutorial status - we don't need to fetch it via get users stateless right now.
              this.loggedInUser.TutorialStatus = TutorialStatus.SKIPPED;
              this.navigate(RouteNames.BROWSE);
            },
            (err) => {
              this._alertError(err.error.error);
            }
          );
      }
    });
  }

  jumioInterval: Timer = null;
  // If we return from the Jumio flow, poll for up to 10 minutes to see if we need to update the user's balance.
  pollLoggedInUserForJumio(publicKey: string): void {
    if (this.jumioInterval) {
      clearInterval(this.jumioInterval);
    }
    let attempts = 0;
    let numTries = 120;
    let timeoutMillis = 5000;
    this.jumioInterval = setInterval(() => {
      if (attempts >= numTries) {
        clearInterval(this.jumioInterval);
        return;
      }
      this.backendApi
        .GetJumioStatusForPublicKey(
          process.env.NEXT_PUBLIC_verificationEndpointHostname,
          publicKey
        )
        .subscribe(
          (res: any) => {
            if (res.JumioVerified) {
              let user: User;
              this.userList.forEach((userInList, idx) => {
                if (userInList.PublicKeyBase58Check === publicKey) {
                  this.userList[idx].JumioVerified = res.JumioVerified;
                  this.userList[idx].JumioReturned = res.JumioReturned;
                  this.userList[idx].JumioFinishedTime = res.JumioFinishedTime;
                  this.userList[idx].BalanceNanos = res.BalanceNanos;
                  this.userList[idx].MustCompleteTutorial = true;
                  user = this.userList[idx];
                }
              });
              if (user) {
                this.setLoggedInUser(user);
              }
              this.celebrate();
              if (user.TutorialStatus === TutorialStatus.EMPTY) {
                this.startTutorialAlert();
              }
              clearInterval(this.jumioInterval);
              return;
            }
            // If the user wasn't verified by jumio, but Jumio did return a callback, stop polling.
            if (res.JumioReturned) {
              clearInterval(this.jumioInterval);
            }
          },
          (error) => {
            clearInterval(this.jumioInterval);
          }
        )
        .add(() => attempts++);
    }, timeoutMillis);
  }

  getFreeDESOMessage(): string {
    return this.referralUSDCents
      ? this.formatUSD(this.referralUSDCents / 100, 0)
      : this.nanosToUSD(this.jumioDeSoNanos, 0);
  }

  getReferralUSDCents(): void {
    const referralHash = localStorage.getItem("referralCode");
    if (referralHash) {
      this.backendApi
        .GetReferralInfoForReferralHash(
          process.env.NEXT_PUBLIC_verificationEndpointHostname,
          referralHash
        )
        .subscribe((res) => {
          const referralInfo = res.ReferralInfoResponse.Info;
          if (
            res.ReferralInfoResponse.IsActive &&
            (referralInfo.TotalReferrals < referralInfo.MaxReferrals ||
              referralInfo.MaxReferrals == 0)
          ) {
            this.referralUSDCents = referralInfo.RefereeAmountUSDCents;
          }
        });
    }
  }

  //   ----------------- start of eth/imx functions -----------------
  counter = 0;

  getPostsRecursive(metadataPostHashArr) {
    this.getPost(true, metadataPostHashArr[this.counter]).subscribe(
      (res) => {
        console.log(this.counter);
        this.counter++;
        // console.log(res["PostFound"]);
        // console.log(this.ethMarketplaceNFTsData);
        this.ethMarketplaceNFTsData.push(res["PostFound"]);
        // console.log(this.ethMarketplaceNFTsData);
        if (this.counter < metadataPostHashArr.length) {
          this.getPostsRecursive(metadataPostHashArr);
        } else {
          console.log(this.ethMarketplaceNFTsData);
          this.updateDataToShow();
        }
      },
      (err: any) => {
        console.log(err);
        this.counter++;
        if (this.counter < metadataPostHashArr.length) {
          this.getPostsRecursive(metadataPostHashArr);
        } else {
          this.updateDataToShow();
        }
      }
    );
  }

  //   for sale ETH nfts - highest price first
  async sortEthMarketplaceHighestPriceFirst() {
    this.isMarketplaceLoading = true;
    this.ethMarketplaceNFTsData = [];

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
      if (this.ethMarketplaceNFTCategory === "All") {
        metadataPostHashArr.push(metadataResJson["PostHashHex"]);
      } else {
        if (metadataResJson["Category"] === this.ethMarketplaceNFTCategory) {
          metadataPostHashArr.push(metadataResJson["PostHashHex"]);
        } else {
          continue;
        }
      }
    }

    this.counter = 0;
    this.getPostsRecursive(metadataPostHashArr);

    setTimeout(() => {
      this.isMarketplaceLoading = false;
    }, 2000);
  }

  //   for sale ETH nfts - lowest price first
  async sortEthMarketplaceLowestPriceFirst() {
    this.isMarketplaceLoading = true;
    this.ethMarketplaceNFTsData = [];

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
      if (this.ethMarketplaceNFTCategory === "All") {
        metadataPostHashArr.push(metadataResJson["PostHashHex"]);
      } else {
        if (metadataResJson["Category"] === this.ethMarketplaceNFTCategory) {
          metadataPostHashArr.push(metadataResJson["PostHashHex"]);
        } else {
          continue;
        }
      }
    }

    this.counter = 0;
    this.getPostsRecursive(metadataPostHashArr);

    setTimeout(() => {
      this.isMarketplaceLoading = false;
    }, 2000);
  }

  //   get all ETH nfts
  async getAllEthNFTs() {
    this.isMarketplaceLoading = true;
    this.ethMarketplaceNFTsData = [];
    // highest price and lowest price are not available on ethereum
    if (
      this.marketplaceSortType === "highest price first" ||
      this.marketplaceSortType === "lowest price first"
    ) {
      this.marketplaceSortType = "most recent first";
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
    this.backendApi
      .SortETHMarketplace(
        this.localNode,
        this.loggedInUser?.PublicKeyBase58Check,
        NFTsAllArr,
        this.ethMarketplaceNFTCategory,
        this.marketplaceSortType,
        this.ethMarketplaceVerifiedCreators
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.ethMarketplaceNFTsData = res["PostEntryResponse"];
          this.updateDataToShow();
          this.isMarketplaceLoading = false;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  //   get all ETH nfts by filter
  async getEthNFTsByFilter() {
    this.isMarketplaceLoading = true;
    this.ethMarketplaceNFTsData = [];
    // highest price and lowest price are not available on ethereum
    if (
      this.marketplaceSortType === "highest price first" ||
      this.marketplaceSortType === "lowest price first"
    ) {
      this.marketplaceSortType = "most recent first";
    }

    let NFTsAllArr = [];
    // status is all
    if (this.ethMarketplaceStatus === "all") {
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
    else if (this.ethMarketplaceStatus === "for sale") {
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
    this.backendApi
      .SortETHMarketplace(
        this.localNode,
        this.loggedInUser?.PublicKeyBase58Check,
        NFTsAllArr,
        this.ethMarketplaceNFTCategory,
        this.marketplaceSortType,
        this.ethMarketplaceVerifiedCreators
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.ethMarketplaceNFTsData = res["PostEntryResponse"];
          this.updateDataToShow();
          this.isMarketplaceLoading = false;
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

  updateDataToShow() {
    this.ethMarketplaceNFTsDataToShow = this.ethMarketplaceNFTsData.slice(
      0,
      30
    );
    console.log(this.ethMarketplaceNFTsDataToShow);
  }

  getPost(fetchParents: boolean = true, nftPostHashHex: string) {
    // Hit the Get Single Post endpoint with specific parameters
    let readerPubKey = "";
    if (this.loggedInUser) {
      readerPubKey = this.loggedInUser.PublicKeyBase58Check;
    }
    return this.backendApi.GetSinglePost(
      this.localNode,
      nftPostHashHex /*PostHashHex*/,
      readerPubKey /*ReaderPublicKeyBase58Check*/,
      fetchParents,
      0,
      0,
      this.showAdminTools() /*AddGlobalFeedBool*/
    );
  }
  //   end of marketplace imx functions

  // start of profile imx functions
  link = new Link(process.env.NEXT_PUBLIC_MAINNET_LINK_URL);
  getCollectedNFTsCounter = 0;

  getCollectedPostsRecursive(metadataPostHashArr) {
    this.getPost(
      true,
      metadataPostHashArr[this.getCollectedNFTsCounter]
    ).subscribe(
      (res) => {
        console.log(this.getCollectedNFTsCounter);
        this.getCollectedNFTsCounter++;
        console.log(res["PostFound"]);
        console.log(this.ethNFTsCollected);
        this.ethNFTsCollected.push(res["PostFound"]);
        console.log(this.ethNFTsCollected);
        if (this.getCollectedNFTsCounter < metadataPostHashArr.length) {
          this.getCollectedPostsRecursive(metadataPostHashArr);
        } else {
          return;
        }
      },
      (err: any) => {
        console.log(err);
        this.getCollectedNFTsCounter++;
        if (this.getCollectedNFTsCounter < metadataPostHashArr.length) {
          this.getCollectedPostsRecursive(metadataPostHashArr);
        } else {
          return;
        }
      }
    );
  }

  //   get collected eth NFTs for logged in wallet
  async getCollectedNFTs() {
    this.ethNFTsCollected = [];

    const publicApiUrl: string = process.env.NEXT_PUBLIC_MAINNET_ENV_URL ?? "";
    this.imxClient = await ImmutableXClient.build({ publicApiUrl });

    console.log(this.imxWalletAddress);

    let collectedNFTs = await this.imxClient.getAssets({
      user: this.imxWalletAddress,
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
    this.backendApi
      .SortETHMarketplace(
        this.localNode,
        this.loggedInUser?.PublicKeyBase58Check,
        collectedNFTsArr,
        "all",
        "most recent first",
        "all"
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.ethNFTsCollected = res["PostEntryResponse"];
          let temp = [];
          this.ethNFTsCollected.forEach((post) => {
            temp.push({
              PostEntryResponse: post,
              NFTEntryResponses: [],
            });
          });
          this.collectedNFTsToShow = this.collectedNFTsToShow.concat(temp);
          this.collectedNFTsToShow.sort(
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
  async getCreatedNFTs() {
    this.ethNFTsCreated = [];

    const publicApiUrl: string = process.env.NEXT_PUBLIC_MAINNET_ENV_URL ?? "";
    this.imxClient = await ImmutableXClient.build({ publicApiUrl });

    const options = { method: "GET", headers: { Accept: "application/json" } };

    let createdNFTs = await fetch(
      `${process.env.NEXT_PUBLIC_MAINNET_ENV_URL}/mints?user=${this.imxWalletAddress}&token_address=${process.env.NEXT_PUBLIC_TOKEN_ADDRESS}`,
      options
    );

    createdNFTs = await createdNFTs.json();
    console.log(createdNFTs);

    let createdNFTsLength = createdNFTs["result"].length;
    let createdNFTsArr = [];

    for (var i = 0; i < createdNFTsLength; i++) {
      createdNFTsArr.push(
        createdNFTs["result"][i]["token"]["data"]["token_id"]
      );
    }

    // endpoint: string,
    // ReaderPublicKeyBase58Check: string,
    // TokenIdArray: string[],
    // Category: string,
    // SortType: string,
    // CreatorsType: string
    this.backendApi
      .SortETHMarketplace(
        this.localNode,
        this.loggedInUser?.PublicKeyBase58Check,
        createdNFTsArr,
        "all",
        "most recent first",
        "all"
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.ethNFTsCreated = res["PostEntryResponse"];
          this.createdNFTsToShow = this.createdNFTsToShow.concat(
            this.ethNFTsCreated
          );
          this.createdNFTsToShow.sort(
            (a, b) => b.TimestampNanos - a.TimestampNanos
          );
        },
        (err) => {
          console.log(err);
        }
      );
  }
  //   ----------------- end of eth/imx functions -----------------
}

export default GlobalVarsService;
