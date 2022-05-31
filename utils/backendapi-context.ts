import {
  track46,
  track40,
  track70,
  track41,
  track50,
  track49,
  track48,
} from "./mixpanel";
import {
  identityServiceParamsForKey,
  jwt,
  sign,
  launch,
  burn,
  encrypt,
  decrypt,
  setIdentityServicePKAddedVariable,
  setIdentityServiceUsersVariable,
} from "./identity-context";
import Axios from "axios-observable";
import { AxiosError } from "axios";
import { Observable, of, throwError } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";

export class BackendRoutes {
  static ExchangeRateRoute = "/api/v0/get-exchange-rate";
  static ExchangeBitcoinRoute = "/api/v0/exchange-bitcoin";
  static SendDeSoRoute = "/api/v0/send-deso";
  static MinerControlRoute = "/api/v0/miner-control";

  static GetUsersStatelessRoute = "/api/v0/get-users-stateless";
  static RoutePathSubmitPost = "/api/v0/submit-post";
  static RoutePathUploadImage = "/api/v0/upload-image";
  static RoutePathSubmitTransaction = "/api/v0/submit-transaction";
  static RoutePathUpdateProfile = "/api/v0/update-profile";
  static RoutePathGetPostsStateless = "/api/v0/get-posts-stateless";
  static RoutePathGetProfiles = "/api/v0/get-profiles";
  static RoutePathGetSingleProfile = "/api/v0/get-single-profile";
  static RoutePathGetSingleProfilePicture =
    "/api/v0/get-single-profile-picture";
  static RoutePathGetPostsForPublicKey = "/api/v0/get-posts-for-public-key";
  static RoutePathGetDiamondedPosts = "/api/v0/get-diamonded-posts";
  static RoutePathGetHodlersForPublicKey = "/api/v0/get-hodlers-for-public-key";
  static RoutePathSendMessageStateless = "/api/v0/send-message-stateless";
  static RoutePathGetMessagesStateless = "/api/v0/get-messages-stateless";
  static RoutePathMarkContactMessagesRead =
    "/api/v0/mark-contact-messages-read";
  static RoutePathMarkAllMessagesRead = "/api/v0/mark-all-messages-read";
  static RoutePathGetFollowsStateless = "/api/v0/get-follows-stateless";
  static RoutePathCreateFollowTxnStateless =
    "/api/v0/create-follow-txn-stateless";
  static RoutePathCreateLikeStateless = "/api/v0/create-like-stateless";
  static RoutePathBuyOrSellCreatorCoin = "/api/v0/buy-or-sell-creator-coin";
  static RoutePathTransferCreatorCoin = "/api/v0/transfer-creator-coin";
  static RoutePathUpdateUserGlobalMetadata =
    "/api/v0/update-user-global-metadata";
  static RoutePathGetUserGlobalMetadata = "/api/v0/get-user-global-metadata";
  static RoutePathGetNotifications = "/api/v0/get-notifications";

  static RoutePathGetUnreadNotificationsCount =
    "/api/v0/get-unread-notifications-count";
  static RoutePathSetNotificationMetadata = "/api/v0/set-notification-metadata";

  static RoutePathGetAppState = "/api/v0/get-app-state";
  static RoutePathGetSinglePost = "/api/v0/get-single-post";
  static RoutePathSendPhoneNumberVerificationText =
    "/api/v0/send-phone-number-verification-text";
  static RoutePathSubmitPhoneNumberVerificationCode =
    "/api/v0/submit-phone-number-verification-code";
  static RoutePathBlockPublicKey = "/api/v0/block-public-key";
  static RoutePathGetBlockTemplate = "/api/v0/get-block-template";
  static RoutePathGetTxn = "/api/v0/get-txn";
  static RoutePathDeleteIdentities = "/api/v0/delete-identities";
  static RoutePathSendDiamonds = "/api/v0/send-diamonds";
  static RoutePathGetDiamondsForPublicKey =
    "/api/v0/get-diamonds-for-public-key";
  static RoutePathGetLikesForPost = "/api/v0/get-likes-for-post";
  static RoutePathGetDiamondsForPost = "/api/v0/get-diamonds-for-post";
  static RoutePathGetRepostsForPost = "/api/v0/get-reposts-for-post";
  static RoutePathGetQuoteRepostsForPost = "/api/v0/get-quote-reposts-for-post";
  static RoutePathGetJumioStatusForPublicKey =
    "/api/v0/get-jumio-status-for-public-key";
  static RoutePathGetHotFeed = "/api/v0/get-hot-feed";
  static RoutePathGetUserMetadata = "/api/v0/get-user-metadata";

  // Verify
  static RoutePathVerifyEmail = "/api/v0/verify-email";
  static RoutePathResendVerifyEmail = "/api/v0/resend-verify-email";

  // Delete PII
  static RoutePathDeletePII = "/api/v0/delete-pii";

  // Tutorial
  static RoutePathStartOrSkipTutorial = "/api/v0/start-or-skip-tutorial";
  static RoutePathCompleteTutorial = "/api/v0/complete-tutorial";
  static RoutePathGetTutorialCreators = "/api/v0/get-tutorial-creators";
  static RoutePathUpdateTutorialStatus = "/api/v0/update-tutorial-status";

  // Media
  static RoutePathUploadVideo = "/api/v0/upload-video";
  static RoutePathGetVideoStatus = "/api/v0/get-video-status";

  // NFT routes.
  static RoutePathCreateNft = "/api/v0/create-nft";
  static RoutePathUpdateNFT = "/api/v0/update-nft";
  static RoutePathCreateNFTBid = "/api/v0/create-nft-bid";
  static RoutePathAcceptNFTBid = "/api/v0/accept-nft-bid";
  static RoutePathGetNFTBidsForNFTPost = "/api/v0/get-nft-bids-for-nft-post";
  static RoutePathGetNFTsForUser = "/api/v0/get-nfts-for-user";
  static RoutePathGetNFTBidsForUser = "/api/v0/get-nft-bids-for-user";
  static RoutePathGetNFTShowcase = "/api/v0/get-nft-showcase";
  static RoutePathGetNFTShowcaseSupernovas =
    "/api/v0/get-nft-showcase-supernovas";
  static RoutePathGetNFTShowcaseStripped = "/api/v0/get-nft-showcase-stripped";
  static RoutePathGetNFTShowcasePaginated =
    "/api/v0/get-nft-showcase-paginated";
  static RoutePathGetNextNFTShowcase = "/api/v0/get-next-nft-showcase";
  static RoutePathGetNFTCollectionSummary =
    "/api/v0/get-nft-collection-summary";
  static RoutePathGetNFTEntriesForPostHash =
    "/api/v0/get-nft-entries-for-nft-post";
  static RoutePathTransferNFT = "/api/v0/transfer-nft";
  static RoutePathAcceptNFTTransfer = "/api/v0/accept-nft-transfer";
  static RoutePathBurnNFT = "/api/v0/burn-nft";

  // ExtraData
  static RoutePathAppendExtraData = "/api/v0/append-extra-data";

  // ETH
  static RoutePathSubmitETHTx = "/api/v0/submit-eth-tx";
  static RoutePathQueryETHRPC = "/api/v0/query-eth-rpc";

  // Admin routes.
  static NodeControlRoute = "/api/v0/admin/node-control";
  static ReprocessBitcoinBlockRoute = "/api/v0/admin/reprocess-bitcoin-block";
  static RoutePathSwapIdentity = "/api/v0/admin/swap-identity";
  static RoutePathAdminUpdateUserGlobalMetadata =
    "/api/v0/admin/update-user-global-metadata";
  static RoutePathAdminGetAllUserGlobalMetadata =
    "/api/v0/admin/get-all-user-global-metadata";
  static RoutePathAdminGetUserGlobalMetadata =
    "/api/v0/admin/get-user-global-metadata";
  static RoutePathAdminUpdateGlobalFeed = "/api/v0/admin/update-global-feed";
  static RoutePathAdminPinPost = "/api/v0/admin/pin-post";
  static RoutePathAdminRemoveNilPosts = "/api/v0/admin/remove-nil-posts";
  static RoutePathAdminGetMempoolStats = "/api/v0/admin/get-mempool-stats";
  static RoutePathAdminGrantVerificationBadge =
    "/api/v0/admin/grant-verification-badge";
  static RoutePathAdminRemoveVerificationBadge =
    "/api/v0/admin/remove-verification-badge";
  static RoutePathAdminGetVerifiedUsers = "/api/v0/admin/get-verified-users";
  static RoutePathAdminGetUserAdminData = "/api/v0/admin/get-user-admin-data";
  static RoutePathAdminGetUsernameVerificationAuditLogs =
    "/api/v0/admin/get-username-verification-audit-logs";
  static RoutePathUpdateGlobalParams = "/api/v0/admin/update-global-params";
  static RoutePathSetUSDCentsToDeSoReserveExchangeRate =
    "/api/v0/admin/set-usd-cents-to-deso-reserve-exchange-rate";
  static RoutePathGetUSDCentsToDeSoReserveExchangeRate =
    "/api/v0/admin/get-usd-cents-to-deso-reserve-exchange-rate";
  static RoutePathSetBuyDeSoFeeBasisPoints =
    "/api/v0/admin/set-buy-deso-fee-basis-points";
  static RoutePathGetBuyDeSoFeeBasisPoints =
    "/api/v0/admin/get-buy-deso-fee-basis-points";
  static RoutePathAdminGetGlobalParams = "/api/v0/admin/get-global-params";
  static RoutePathGetGlobalParams = "/api/v0/get-global-params";
  static RoutePathEvictUnminedBitcoinTxns =
    "/api/v0/admin/evict-unmined-bitcoin-txns";
  static RoutePathGetWyreWalletOrdersForPublicKey =
    "/api/v0/admin/get-wyre-wallet-orders-for-public-key";
  static RoutePathAdminGetNFTDrop = "/api/v0/admin/get-nft-drop";
  static RoutePathAdminUpdateNFTDrop = "/api/v0/admin/update-nft-drop";
  // Discovery postgres routes
  static RoutePathGetCommunityFavourites = "/api/v0/get-community-favourites";
  static RoutePathGetFreshDrops = "/api/v0/get-fresh-drops";
  static RoutePathGetNFTsByCategory = "/api/v0/get-nfts-by-category";
  static RoutePathGetTrendingAuctions = "/api/v0/get-trending-auctions";
  static RoutePathGetRecentSales = "/api/v0/get-recent-sales";
  static RoutePathGetSecondaryListings = "/api/v0/get-secondary-listings";
  // Collection
  static RoutePathCreateCollection = "/api/v0/create-collection";
  static RoutePathAddToCollection = "/api/v0/add-to-collection";
  static RoutePathSortCollection = "/api/v0/sort-collection";
  static RoutePathGetUserCollectionsData = "/api/v0/get-user-collections-data";
  static RoutePathGetCollectionInfo = "/api/v0/get-collection-info";
  static RoutePathGetAllUserCollections = "/api/v0/get-all-user-collections";
  static RoutePathGetAllUserCollectionNames =
    "/api/v0/get-all-user-collection-names";
  static RoutePathInsertIntoCollection = "/api/v0/insert-into-collection";
  // Marketplace postgres
  static RoutePathSortMarketplace = "/api/v0/sort-marketplace";
  static RoutePathSortCreators = "/api/v0/sort-creators";
  // PG verified list
  static RoutePathInsertIntoPGVerified = "/api/v0/insert-into-pg-verified";
  // PG blocked list
  static RoutePathRemoveUserFromQueries = "/api/v0/remove-user-from-queries";
  // PG profile details
  static RoutePathInsertOrUpdateProfileDetails =
    "/api/v0/insert-or-update-profile-details";
  static RoutePathGetPGProfileDetails = "/api/v0/get-pg-profile-details";
  static RoutePathUpdateCollectorOrCreator =
    "/api/v0/update-collector-or-creator";
  static RoutePathGetCollectorOrCreator = "/api/v0/get-collector-or-creator";
  static RoutePathInsertOrUpdateIMXPK = "/api/v0/insert-or-update-imx-pk";
  // Same as the two above but for supernovas uses
  static RoutePathGetMarketplaceRefSupernovas =
    "/api/v0/get-marketplace-ref-supernovas";
  static RoutePathAddToMarketplaceSupernovas =
    "/api/v0/add-to-marketplace-supernovas";
  // Transactional Emails
  static RoutePathSendWelcomeEmail = "/api/v0/send-welcome-email";
  static RoutePathReportPostEmail = "/api/v0/report-post-email";
  static RoutePathAddToInvestorEmailList = "/api/v0/add-to-investor-email-list";
  // Server time for dao page
  static RoutePathGetCurrentTime = "/api/v0/get-time-now-presale";
  // Overdeso
  static RoutePathGetNFTTradeList = "/v1";
  // Admin continues
  static RoutePathAdminResetJumioForPublicKey =
    "/api/v0/admin/reset-jumio-for-public-key";
  static RoutePathAdminUpdateJumioDeSo = "/api/v0/admin/update-jumio-deso";
  static RoutePathAdminUpdateTutorialCreators =
    "/api/v0/admin/update-tutorial-creators";
  static RoutePathAdminResetTutorialStatus =
    "/api/v0/admin/reset-tutorial-status";
  static RoutePathAdminGetTutorialCreators =
    "/api/v0/admin/get-tutorial-creators";
  static RoutePathAdminJumioCallback = "/api/v0/admin/jumio-callback";
  static RoutePathAdminGetUnfilteredHotFeed =
    "/api/v0/admin/get-unfiltered-hot-feed";
  static RoutePathAdminGetHotFeedAlgorithm =
    "/api/v0/admin/get-hot-feed-algorithm";
  static RoutePathAdminUpdateHotFeedAlgorithm =
    "/api/v0/admin/update-hot-feed-algorithm";
  static RoutePathAdminUpdateHotFeedPostMultiplier =
    "/api/v0/admin/update-hot-feed-post-multiplier";
  static RoutePathAdminUpdateHotFeedUserMultiplier =
    "/api/v0/admin/update-hot-feed-user-multiplier";
  static RoutePathAdminGetHotFeedUserMultiplier =
    "/api/v0/admin/get-hot-feed-user-multiplier";

  // Referral program admin routes.
  static RoutePathAdminCreateReferralHash =
    "/api/v0/admin/create-referral-hash";
  static RoutePathAdminGetAllReferralInfoForUser =
    "/api/v0/admin/get-all-referral-info-for-user";
  static RoutePathAdminUpdateReferralHash =
    "/api/v0/admin/update-referral-hash";
  static RoutePathAdminDownloadReferralCSV =
    "/api/v0/admin/download-referral-csv";
  static RoutePathAdminDownloadRefereeCSV =
    "/api/v0/admin/download-referee-csv";
  static RoutePathAdminUploadReferralCSV = "/api/v0/admin/upload-referral-csv";

  // Referral program non-admin routes
  static RoutePathGetReferralInfoForUser = "/api/v0/get-referral-info-for-user";
  static RoutePathGetReferralInfoForReferralHash =
    "/api/v0/get-referral-info-for-referral-hash";

  static RoutePathGetFullTikTokURL = "/api/v0/get-full-tiktok-url";

  // Wyre routes.
  static RoutePathGetWyreWalletOrderQuotation =
    "/api/v0/get-wyre-wallet-order-quotation";
  static RoutePathGetWyreWalletOrderReservation =
    "/api/v0/get-wyre-wallet-order-reservation";

  // Admin Node Fee routes
  static RoutePathAdminSetTransactionFeeForTransactionType =
    "/api/v0/admin/set-txn-fee-for-txn-type";
  static RoutePathAdminSetAllTransactionFees = "/api/v0/admin/set-all-txn-fees";
  static RoutePathAdminGetTransactionFeeMap =
    "/api/v0/admin/get-transaction-fee-map";
  static RoutePathAdminAddExemptPublicKey =
    "/api/v0/admin/add-exempt-public-key";
  static RoutePathAdminGetExemptPublicKeys =
    "/api/v0/admin/get-exempt-public-keys";

  // Nonce supernovas, allows inline execution of script safely
  static RoutePathGetBase64Nonce = "/api/v0/get-base64-nonce";
  // IMX SUPERNOVAS
  static RoutePathGetIMXMetadataById = "/api/v0/imx/metadata";
  static RoutePathInsertIMXMetadata = "/api/v0/insert/imx";
  static RoutePathUpdateIMXMetadataPostHash = "/api/v0/update-imx-post-hash";
  static RoutePathGetDesoPKbyETHPK = "/api/v0/get-deso-pk-by-ethpk";
  static RoutePathSortETHMarketplace = "/api/v0/sort-eth-marketplace";
  // SUPERNOVAS ANALYTICS
  static RoutePathGetUniqueCreators = "/api/v0/get-unique-creators";
  static RoutePathGetUniqueCollectors = "/api/v0/get-unique-collectors";
  static RoutePathGetDesoSalesCapGraph = "/api/v0/get-deso-sales-cap-graph";
  static RoutePathGetDesoMarketCapGraph = "/api/v0/get-deso-market-cap-graph";
  static RoutePathGetTopNFTSales = "/api/v0/get-top-nft-sales";
  static RoutePathGetTopBidsToday = "/api/v0/get-top-bids-today";
  static RoutePathGetTopEarningCollectors =
    "/api/v0/get-top-earning-collectors";
  static RoutePathGetTopEarningCreators = "/api/v0/get-top-earning-creators";
  static RoutePathGetQuickFacts = "/api/v0/get-quick-facts";
  // Supernovas profile created
  static RoutePathGetCreatedNfts = "/api/v0/get-created-nfts";
}
export class Transaction {
  inputs: {
    txID: string;
    index: number;
  }[];
  outputs: {
    amountNanos: number;
    publicKeyBase58Check: string;
  }[];

  txnType: string;
  publicKeyBase58Check: string;
  signatureBytesHex: string;
}
// Store collections in this
export class CollectionResponse {
  Collection: string;
  CollectionBannerLocation: string;
  CollectionCreatorName: string;
  CollectionDescription: string;
  CollectionProfilePicLocation: string;
  FloorPrice: number;
  Pieces: number;
}
export class ProfileEntryResponse {
  Username: string;
  Description: string;
  ProfilePic?: string;
  CoinEntry?: {
    DeSoLockedNanos: number;
    CoinWatermarkNanos: number;
    CoinsInCirculationNanos: number;
    CreatorBasisPoints: number;
  };
  CoinPriceDeSoNanos?: number;
  StakeMultipleBasisPoints?: number;
  PublicKeyBase58Check?: string;
  UsersThatHODL?: any;
  Posts?: PostEntryResponse[];
  IsReserved?: boolean;
  IsVerified?: boolean;
}
export class CreatorCardResponse {
  Username: string;
  ImageURLs: string[];
}

export enum TutorialStatus {
  EMPTY = "",
  STARTED = "TutorialStarted",
  SKIPPED = "TutorialSkipped",
  CREATE_PROFILE = "TutorialCreateProfileComplete",
  INVEST_OTHERS_BUY = "InvestInOthersBuyComplete",
  INVEST_OTHERS_SELL = "InvestInOthersSellComplete",
  INVEST_SELF = "InvestInYourselfComplete",
  FOLLOW_CREATORS = "FollowCreatorsComplete",
  DIAMOND = "GiveADiamondComplete",
  COMPLETE = "TutorialComplete",
}

export class User {
  ProfileEntryResponse: ProfileEntryResponse;

  PublicKeyBase58Check: string;
  PublicKeysBase58CheckFollowedByUser: string[];
  EncryptedSeedHex: string;

  BalanceNanos: number;
  UnminedBalanceNanos: number;

  NumActionItems: any;
  NumMessagesToRead: any;

  UsersYouHODL: BalanceEntryResponse[];
  UsersWhoHODLYouCount: number;

  HasPhoneNumber: boolean;
  CanCreateProfile: boolean;
  HasEmail: boolean;
  EmailVerified: boolean;
  JumioVerified: boolean;
  JumioReturned: boolean;
  JumioFinishedTime: number;

  ReferralInfoResponses: any;

  IsFeaturedTutorialWellKnownCreator: boolean;
  IsFeaturedTutorialUpAndComingCreator: boolean;

  BlockedPubKeys: { [key: string]: object };

  IsAdmin?: boolean;
  IsSuperAdmin?: boolean;

  TutorialStatus: TutorialStatus;
  CreatorPurchasedInTutorialUsername?: string;
  CreatorCoinsPurchasedInTutorial: number;
  MustCompleteTutorial: boolean;
}

export class PostEntryResponse {
  PostHashHex: string;
  PosterPublicKeyBase58Check: string;
  ParentStakeID: string;
  Body: string;
  RepostedPostHashHex: string;
  ImageURLs: string[];
  VideoURLs: string[];
  RepostPost: PostEntryResponse;
  CreatorBasisPoints: number;
  StakeMultipleBasisPoints: number;
  TimestampNanos: number;
  IsHidden: boolean;
  ConfirmationBlockHeight: number;
  // PostEntryResponse of the post that this post reposts.
  RepostedPostEntryResponse: PostEntryResponse;
  // The profile associated with this post.
  ProfileEntryResponse: ProfileEntryResponse;
  // The comments associated with this post.
  Comments: PostEntryResponse[];
  LikeCount: number;
  RepostCount: number;
  QuoteRepostCount: number;
  DiamondCount: number;
  // Information about the reader's state w/regard to this post (e.g. if they liked it).
  PostEntryReaderState?: PostEntryReaderState;
  // True if this post hash hex is in the global feed.
  InGlobalFeed: boolean;
  InHotFeed: boolean;
  CommentCount: number;
  // A list of parent posts for this post (ordered: root -> closest parent post).
  ParentPosts: PostEntryResponse[];
  PostExtraData: PostExtraData;
  InMempool: boolean;
  IsPinned: boolean;
  DiamondsFromSender?: number;
  NumNFTCopies: number;
  NumNFTCopiesForSale: number;
  NumNFTCopiesBurned: number;
  HasUnlockable: boolean;
  IsNFT: boolean;
  NFTRoyaltyToCoinBasisPoints: number;
  NFTRoyaltyToCreatorBasisPoints: number;
  HotnessScore: number;
  PostMultiplier: number;
  // This is full on supernovas
  // Enables us to select
  // Now used in create-collection
  selected: boolean;
  // This enables us to disable nfts on create-collection
  // So that user does not add duplicates on collections
  disabled: boolean;
}

export class DiamondsPost {
  Post: PostEntryResponse;
  // Boolean that is set to true when this is the first post at a given diamond level.
  ShowDiamondDivider?: boolean;
}

export class PostEntryReaderState {
  // This is true if the reader has liked the associated post.
  LikedByReader?: boolean;

  // This is true if the reader has reposted the associated post.
  RepostedByReader?: boolean;

  // This is the post hash hex of the repost
  RepostPostHashHex?: string;

  // Level of diamond the user gave this post.
  DiamondLevelBestowed?: number;
}

export class PostTxnBody {
  Body?: string;
  ImageURLs?: string[];
  VideoURLs?: string[];
}

export class BalanceEntryResponse {
  // The public keys are provided for the frontend
  HODLerPublicKeyBase58Check: string;
  // The public keys are provided for the frontend
  CreatorPublicKeyBase58Check: string;

  // Has the hodler purchased these creator coins
  HasPurchased: boolean;
  // How much this HODLer owns of a particular creator coin.
  BalanceNanos: number;
  // The net effect of transactions in the mempool on a given BalanceEntry's BalanceNanos.
  // This is used by the frontend to convey info about mining.
  NetBalanceInMempool: number;

  ProfileEntryResponse: ProfileEntryResponse;
}

export class NFTEntryResponse {
  OwnerPublicKeyBase58Check: string;
  ProfileEntryResponse: ProfileEntryResponse | undefined;
  PostEntryResponse: PostEntryResponse | undefined;
  SerialNumber: number;
  IsPending: boolean;
  IsForSale: boolean;
  IsBuyNow: boolean;
  MinBidAmountNanos: number;
  LastAcceptedBidAmountNanos: number;
  BuyNowPriceNanos: number;
  HighestBidAmountNanos: number;
  LowestBidAmountNanos: number;

  // only populated when the reader is the owner of the nft and there is an unlockable.
  LastOwnerPublicKeyBase58Check: string | undefined;
  EncryptedUnlockableText: string | undefined;
  DecryptedUnlockableText: string | undefined;
}

export class NFTBidEntryResponse {
  PublicKeyBase58Check: string;
  ProfileEntryResponse: ProfileEntryResponse;
  PostHashHex: string;
  PostEntryResponse: PostEntryResponse | undefined;
  SerialNumber: number;
  BidAmountNanos: number;

  HighestBidAmountNanos: number | undefined;
  LowestBidAmountNanos: number | undefined;

  BidderBalanceNanos: number;

  selected?: boolean;
}

export class NFTCollectionResponse {
  AvailableSerialNumbers: number[];
  NFTEntryResponse: NFTEntryResponse;
  PostEntryResponse: PostEntryResponse;
  ProfileEntryResponse: ProfileEntryResponse;
  NumCopiesForSale: number;
  HighestBidAmountNanos: number;
  LowestBidAmountNanos: number;
}

export class NFTBidData {
  PostEntryResponse: PostEntryResponse;
  NFTEntryResponses: NFTEntryResponse[];
  BidEntryResponses: NFTBidEntryResponse[];
}

export class TransactionFee {
  PublicKeyBase58Check: string;
  AmountNanos: number;
  ProfileEntryResponse?: ProfileEntryResponse;
}

export class PostExtraData {
  Node: string;
  category: string;
  name: string;
  properties: string;
}
export class DeSoNode {
  Name: string;
  URL: string;
  Owner: string;
}
export class RouteNames {
  // Not sure if we should have a smarter schema for this, e.g. what happens if we have
  //   1. /:username/following
  //   2. /some/other/path/following
  // and we want to rename (1) but not (2) ?

  // /:username/following
  public static FOLLOWING = "following";

  // /:username/followers
  public static FOLLOWERS = "followers";

  public static ACTIVITY = "activity";
  public static ANALYTICS = "analytics";
  public static SIGNUP = "signup";
  public static NFT_PAGE = "nfts";
  public static MINT_PAGE = "mint";
  public static BROWSE = "browse";
  public static CREATORS = "creators";
  public static BUY_DESO = "buy-deso";
  public static WALLET = "wallet";
  public static SETTINGS = "settings";
  public static USER_PREFIX = "u";
  public static INBOX_PREFIX = "inbox";
  public static TRANSFER_CREATOR = "transfer";
  public static PICK_A_COIN = "select-creator-coin";
  public static BUY_CREATOR = "buy";
  public static SELL_CREATOR = "sell";
  public static COMPLETE_PROFILE = "complete-profile";
  public static UPDATE_PROFILE = "update-profile";
  public static NOTIFICATIONS = "notifications";
  public static NOT_FOUND = "404";
  public static POSTS = "posts";
  public static DESO_PAGE = "deso-page";
  public static IMX_PAGE = "imx-page";
  // TODO: how do I make this /posts/new?
  public static CREATE_POST = "posts/new";
  public static TOS = "terms-of-service";
  public static ADMIN = "admin";
  public static GET_STARTER_DESO = "get-starter-deso";
  public static LANDING = "home";
  public static DIAMONDS = "diamonds";
  public static TRENDS = "marketplace";
  public static REFERRALS = "referrals";
  public static NFT = "nft";
  public static ETH_NFT = "eth_nft";
  public static TRANSFERS = "transfers";
  public static VERIFY_EMAIL = "verify-email";
  public static DAO_PAGE = "dao";

  public static TUTORIAL = "tutorial";
  public static CREATE_PROFILE = "create-profile";
  public static INVEST = "invest";
  public static DISCOVERY = "discovery";

  public static COLLECTIONS = "collections";
  public static COLLECTION = "collection";
  public static CREATE_COLLECTION = "create-collection";
  public static ADD_TO_COLLECTION = "add-to-collection";
  public static COLLECTION_SUCCESS_PAGE = "collection-success-page";
}

// previously this was the constructor
const ax = Axios;

const GET_PROFILES_ORDER_BY_INFLUENCER_COIN_PRICE = "influencer_coin_price";
const BUY_CREATOR_COIN_OPERATION_TYPE = "buy";
const SELL_CREATOR_COIN_OPERATION_TYPE = "sell";

// TODO: Cleanup - this should be a configurable value on the node. Leaving it in the frontend
// is fine for now because BlockCypher has strong anti-abuse measures in place.
let blockCypherToken = "cd455c8a5d404bb0a23880b72f56aa86";

// Store sent messages and associated metadata in localStorage
export let MessageMetaKey = "messageMetaKey";

// Store the identity users in localStorage
export let IdentityUsersKey = "identityUsers";

// Store last local node URL in localStorage
export let LastLocalNodeKey = "lastLocalNodeV2";

// Store last logged in user public key in localStorage
export let LastLoggedInUserKey = "lastLoggedInUser";

// Store the last identity service URL in localStorage
export let LastIdentityServiceKey = "lastIdentityServiceURL";

// TODO: Wipe all this data when transition is complete
export let LegacyUserListKey = "userList";
export let LegacySeedListKey = "seedList";

export function SetStorage(key: string, value: any) {
  localStorage.setItem(
    key,
    value || value === false ? JSON.stringify(value) : ""
  );
}

export function RemoveStorage(key: string) {
  localStorage.removeItem(key);
}

export function GetStorage(key: string) {
  const data = localStorage.getItem(key);
  if (data === "") {
    return null;
  }
  return JSON.parse(data);
}

// Assemble a URL to hit the BE with.
export function _makeRequestURL(
  endpoint: string,
  routeName: string,
  adminPublicKey?: string
): string {
  let queryURL = location.protocol + "//" + endpoint + routeName;
  // If the protocol is specified within the endpoint then use that.
  if (endpoint.startsWith("http")) {
    queryURL = endpoint + routeName;
  }
  if (adminPublicKey) {
    queryURL += `?admin_public_key=${adminPublicKey}`;
  }
  return queryURL;
}

// CHECK WORKS
export function _handleError(error: AxiosError) {
  if (error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error("An error occurred:", error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error)}`
    );
  }
  // return an observable with a user-facing error message
  return throwError(() => error);
}

// Stores identity service users in identityService and localStorage
export function setIdentityServiceUsers(users: any, publicKeyAdded?: string) {
  SetStorage(IdentityUsersKey, users);
  console.log("setIdentityServiceUsers");
  // Check works ,,, this used to be just var = value;
  setIdentityServiceUsersVariable(users);
  setIdentityServicePKAddedVariable(publicKeyAdded);
}

export function signAndSubmitTransaction(
  endpoint: string,
  request: Observable<any>,
  PublicKeyBase58Check: string
): Observable<any> {
  return request
    .pipe(
      switchMap((res) =>
        sign({
          transactionHex: res.TransactionHex,
          ...identityServiceParamsForKey(PublicKeyBase58Check),
        }).pipe(
          switchMap((signed) => {
            if (signed.approvalRequired) {
              return launch("/approve", {
                tx: res.TransactionHex,
              }).pipe(
                map((approved) => {
                  setIdentityServiceUsers(approved.users);
                  return { ...res, ...approved };
                })
              );
            } else {
              return of({ ...res, ...signed });
            }
          })
        )
      )
    )
    .pipe(
      switchMap((res) =>
        SubmitTransaction(endpoint, res.signedTransactionHex).pipe(
          map((broadcasted) => ({ ...res, ...broadcasted }))
        )
      )
    )
    .pipe(catchError(_handleError));
}

export function get(endpoint: string, path: string) {
  return ax
    .get<any>(_makeRequestURL(endpoint, path))
    .pipe(catchError(_handleError));
}

export function post(
  endpoint: string,
  path: string,
  body: any
): Observable<any> {
  return ax
    .post(_makeRequestURL(endpoint, path), body)
    .pipe(catchError(_handleError));
}

export function jwtPost(
  endpoint: string,
  path: string,
  publicKey: string,
  body: any
): Observable<any> {
  const request = jwt({
    ...identityServiceParamsForKey(publicKey),
  });

  return request.pipe(
    switchMap((signed) => {
      body = {
        JWT: signed.jwt,
        ...body,
      };

      return post(endpoint, path, body).pipe(
        map((res) => ({ ...res, ...signed }))
      );
    })
  );
}

export function GetExchangeRate(endpoint: string): Observable<any> {
  return get(endpoint, BackendRoutes.ExchangeRateRoute);
}

// Use empty string to return all top categories.
export function GetBitcoinFeeRateSatoshisPerKB(): Observable<any> {
  return ax
    .get<any>("https://api.blockchain.com/mempool/fees")
    .pipe(catchError(_handleError));
}

export function SendPhoneNumberVerificationText(
  endpoint: string,
  PublicKeyBase58Check: string,
  PhoneNumber: string,
  PhoneNumberCountryCode: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathSendPhoneNumberVerificationText,
    PublicKeyBase58Check,
    {
      PublicKeyBase58Check,
      PhoneNumber,
      PhoneNumberCountryCode,
    }
  );
}

export function SubmitPhoneNumberVerificationCode(
  endpoint: string,
  PublicKeyBase58Check: string,
  PhoneNumber: string,
  PhoneNumberCountryCode: string,
  VerificationCode: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathSubmitPhoneNumberVerificationCode,
    PublicKeyBase58Check,
    {
      PublicKeyBase58Check,
      PhoneNumber,
      PhoneNumberCountryCode,
      VerificationCode,
    }
  );
}

export function GetBlockTemplate(
  endpoint: string,
  PublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetBlockTemplate, {
    PublicKeyBase58Check,
    HeaderVersion: 1,
  });
}

export function GetTxn(endpoint: string, TxnHashHex: string): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetTxn, {
    TxnHashHex,
  });
}

export function DeleteIdentities(endpoint: string): Observable<any> {
  return ax
    .post<any>(
      _makeRequestURL(endpoint, BackendRoutes.RoutePathDeleteIdentities),
      {},
      { withCredentials: true }
    )
    .pipe(catchError(_handleError));
}

export function ExchangeBitcoin(
  endpoint: string,
  LatestBitcionAPIResponse: any,
  BTCDepositAddress: string,
  PublicKeyBase58Check: string,
  BurnAmountSatoshis: number,
  FeeRateSatoshisPerKB: number,
  Broadcast: boolean
): Observable<any> {
  let req = post(endpoint, BackendRoutes.ExchangeBitcoinRoute, {
    PublicKeyBase58Check,
    BurnAmountSatoshis,
    LatestBitcionAPIResponse,
    BTCDepositAddress,
    FeeRateSatoshisPerKB,
    Broadcast: false,
  });

  if (Broadcast) {
    req = req.pipe(
      switchMap((res) =>
        burn({
          ...identityServiceParamsForKey(PublicKeyBase58Check),
          unsignedHashes: res.UnsignedHashes,
        }).pipe(map((signed) => ({ ...res, ...signed })))
      )
    );

    req = req.pipe(
      switchMap((res) =>
        post(endpoint, BackendRoutes.ExchangeBitcoinRoute, {
          PublicKeyBase58Check,
          BurnAmountSatoshis,
          LatestBitcionAPIResponse,
          BTCDepositAddress,
          FeeRateSatoshisPerKB,
          SignedHashes: res.signedHashes,
          Broadcast,
        }).pipe(map((broadcasted) => ({ ...res, ...broadcasted })))
      )
    );
  }

  return req.pipe(catchError(_handleError));
}

// TODO: Use Broadcast bool isntead
export function SendDeSoPreview(
  endpoint: string,
  SenderPublicKeyBase58Check: string,
  RecipientPublicKeyOrUsername: string,
  AmountNanos: number,
  MinFeeRateNanosPerKB: number
): Observable<any> {
  return post(endpoint, BackendRoutes.SendDeSoRoute, {
    SenderPublicKeyBase58Check,
    RecipientPublicKeyOrUsername,
    AmountNanos: Math.floor(AmountNanos),
    MinFeeRateNanosPerKB,
  });
}

export function SendDeSo(
  endpoint: string,
  SenderPublicKeyBase58Check: string,
  RecipientPublicKeyOrUsername: string,
  AmountNanos: number,
  MinFeeRateNanosPerKB: number
): Observable<any> {
  const request = SendDeSoPreview(
    endpoint,
    SenderPublicKeyBase58Check,
    RecipientPublicKeyOrUsername,
    AmountNanos,
    MinFeeRateNanosPerKB
  );

  return signAndSubmitTransaction(
    endpoint,
    request,
    SenderPublicKeyBase58Check
  );
}

export function SubmitTransaction(
  endpoint: string,
  TransactionHex: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathSubmitTransaction, {
    TransactionHex,
  });
}

export function SendMessage(
  endpoint: string,
  SenderPublicKeyBase58Check: string,
  RecipientPublicKeyBase58Check: string,
  MessageText: string,
  MinFeeRateNanosPerKB: number
): Observable<any> {
  //First encrypt message in identity
  //Then pipe ciphertext to RoutePathSendMessageStateless
  let req = encrypt({
    ...identityServiceParamsForKey(SenderPublicKeyBase58Check),
    recipientPublicKey: RecipientPublicKeyBase58Check,
    message: MessageText,
  }).pipe(
    switchMap((encrypted) => {
      const EncryptedMessageText = encrypted.encryptedMessage;
      return post(endpoint, BackendRoutes.RoutePathSendMessageStateless, {
        SenderPublicKeyBase58Check,
        RecipientPublicKeyBase58Check,
        EncryptedMessageText,
        MinFeeRateNanosPerKB,
      }).pipe(
        map((request) => {
          return { ...request };
        })
      );
    })
  );
  return signAndSubmitTransaction(endpoint, req, SenderPublicKeyBase58Check);
}

export function GetHotFeed(
  endpoint: string,
  ReaderPublicKeyBase58Check: string,
  SeenPosts,
  ResponseLimit
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetHotFeed, {
    ReaderPublicKeyBase58Check,
    SeenPosts,
    ResponseLimit,
  });
}

export function InsertIMXMetadata(
  endpoint: string,
  Name: string,
  Description: string,
  Image: string,
  Image_url: string,
  Category: string,
  PostHashHex: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathInsertIMXMetadata, {
    Name,
    Description,
    Image,
    Image_url,
    Category,
    PostHashHex,
  });
}
export function GetBase64Nonce(endpoint: string): Observable<any> {
  return ax.get<any>(GetBase64NonceURL(endpoint), {});
}
export function GetBase64NonceURL(endpoint: string): string {
  return _makeRequestURL(endpoint, BackendRoutes.RoutePathGetBase64Nonce);
}
export function GetIMXMetadatById(endpoint: string): Observable<any> {
  return ax.get<any>(GetIMXMetadataURL(endpoint), {});
}
export function GetIMXMetadataURL(endpoint: string): string {
  return _makeRequestURL(
    endpoint,
    BackendRoutes.RoutePathGetIMXMetadataById + "/1"
  );
}

export function UpdateIMXMetadataPostHash(
  endpoint: string,
  Token_id: string,
  PostHashHex: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathUpdateIMXMetadataPostHash, {
    Token_id,
    PostHashHex,
  });
}

export function GetDesoPKbyETHPK(
  endpoint: string,
  ETHPK: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetDesoPKbyETHPK, {
    ETHPK,
  });
}

export function SortETHMarketplace(
  endpoint: string,
  ReaderPublicKeyBase58Check: string,
  TokenIdArray: string[],
  Category: string,
  SortType: string,
  CreatorsType: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathSortETHMarketplace, {
    ReaderPublicKeyBase58Check,
    TokenIdArray,
    Category,
    SortType,
    CreatorsType,
  });
}

// User-related functions.
export function GetUsersStateless(
  endpoint: string,
  publicKeys: any[],
  SkipForLeaderboard: boolean = false
): Observable<any> {
  return post(endpoint, BackendRoutes.GetUsersStatelessRoute, {
    PublicKeysBase58Check: publicKeys,
    SkipForLeaderboard,
  });
}

export function getAllTransactionOutputs(tx: any): Promise<any> {
  return new Promise((resolve, reject) => {
    // If the tx doesn't have more outputs then return.
    if (!tx.next_outputs || tx.outputs.length < 20) {
      resolve(tx);
      return;
    }

    // Else query the next_output and add the new outputs to the tx.
    // Do this recursively until everything has been fetched.
    ax.get<any>(tx.next_outputs + `&token=${blockCypherToken}`)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError(_handleError)
      )
      .subscribe(
        (res) => {
          // Add the next_outputs to the back of the txn
          if (res.data.outputs) {
            for (let ii = 0; ii < res.data.outputs.length; ii++) {
              tx.outputs.push(res.data.outputs[ii]);
            }
          }

          // If there are more outputs, then we do a dirty hack. We change
          // the next_outputs of the current txn to the next_outputs of the
          // response. Then call this function recursively to add the
          // remaining outputs.
          // BlockCypher also
          // doesn't tell us when a transaction is out of outputs, so we have
          // to assume it has more outputs if its at the maximum number of outputs,
          // which is 20 for BlockCypher.
          if (res.data.outputs.length >= 20) {
            tx.next_outputs = res.data.next_outputs;
            getAllTransactionOutputs(tx).then(
              (res) => {
                resolve(res);
              },
              (err) => {
                console.error(err);
                resolve(tx);
              }
            );
          } else {
            resolve(tx);
          }
        },
        (err) => {
          console.error(err);
          resolve(err);
        }
      );
  });
}

export function GetBitcoinAPIInfo(
  bitcoinAddr: string,
  isTestnet: boolean
): Observable<any> {
  let endpoint = `https://api.blockcypher.com/v1/btc/main/addrs/${bitcoinAddr}/full?token=${blockCypherToken}`;
  if (isTestnet) {
    endpoint = `https://api.blockcypher.com/v1/btc/test3/addrs/${bitcoinAddr}/full?token=${blockCypherToken}`;
  }

  return ax.get<any>(endpoint).pipe(
    map((res) => {
      // If the response has no transactions or if the final balance is zero
      // then just return it.
      if (!res.data.txs || !res.data.final_balance) {
        return new Promise((resolve, reject) => {
          resolve(res);
        });
      }

      // For each transaction, continuously fetch its outputs until we
      // run out of them.
      const txnPromises = [];
      // TODO: This causes us to hit rate limits if there are too many
      // transactions in the backlog. We should fix this at some point.
      for (let ii = 0; ii < res.data.txs.length; ii++) {
        txnPromises.push(getAllTransactionOutputs(res.data.txs[ii]));
      }

      return Promise.all(txnPromises).then((xxx) => res);
    }),
    catchError(_handleError)
  );
}
export function AcceptNFTTransfer(
  endpoint: string,
  UpdaterPublicKeyBase58Check: string,
  NFTPostHashHex: string,
  SerialNumber: number,
  MinFeeRateNanosPerKB: number
): Observable<any> {
  const request = post(endpoint, BackendRoutes.RoutePathAcceptNFTTransfer, {
    UpdaterPublicKeyBase58Check,
    NFTPostHashHex,
    SerialNumber,
    MinFeeRateNanosPerKB,
  });
  track50("Accept NFT Transfer", {
    "Public Key": UpdaterPublicKeyBase58Check,
    "Post hex": NFTPostHashHex,
    "Serial Number": SerialNumber,
    "Min fee rate per KB": MinFeeRateNanosPerKB,
  });
  track70("On-chain activity");
  return signAndSubmitTransaction(
    endpoint,
    request,
    UpdaterPublicKeyBase58Check
  );
}

export function BurnNFT(
  endpoint: string,
  UpdaterPublicKeyBase58Check: string,
  NFTPostHashHex: string,
  SerialNumber: number,
  MinFeeRateNanosPerKB: number
) {
  const request = post(endpoint, BackendRoutes.RoutePathBurnNFT, {
    UpdaterPublicKeyBase58Check,
    NFTPostHashHex,
    SerialNumber,
    MinFeeRateNanosPerKB,
  });
  track49("Burn NFT", {
    "Public Key": UpdaterPublicKeyBase58Check,
    "Post hex": NFTPostHashHex,
    "Serial Number": SerialNumber,
    "Min fee rate per KB": MinFeeRateNanosPerKB,
  });
  track70("On-chain activity");
  return signAndSubmitTransaction(
    endpoint,
    request,
    UpdaterPublicKeyBase58Check
  );
}

export function TransferNFT(
  endpoint: string,
  SenderPublicKeyBase58Check: string,
  ReceiverPublicKeyBase58Check: string,
  NFTPostHashHex: string,
  SerialNumber: number,
  EncryptedUnlockableText: string,
  MinFeeRateNanosPerKB: number
): Observable<any> {
  let req = encrypt({
    ...identityServiceParamsForKey(SenderPublicKeyBase58Check),
    recipientPublicKey: ReceiverPublicKeyBase58Check,
    message: EncryptedUnlockableText,
  }).pipe(
    switchMap((encrypted) => {
      const EncryptedUnlockableText = encrypted.encryptedMessage;
      return post(endpoint, BackendRoutes.RoutePathTransferNFT, {
        SenderPublicKeyBase58Check,
        ReceiverPublicKeyBase58Check,
        NFTPostHashHex,
        SerialNumber,
        EncryptedUnlockableText,
        MinFeeRateNanosPerKB,
      }).pipe(
        map((request) => {
          return { ...request };
        })
      );
    })
  );
  track48("Transfer NFT", {
    Sender: SenderPublicKeyBase58Check,
    Receiver: ReceiverPublicKeyBase58Check,
    "Post hex": NFTPostHashHex,
    "Serial Number": SerialNumber,
    "Min fee rate per KB": MinFeeRateNanosPerKB,
  });
  return signAndSubmitTransaction(endpoint, req, SenderPublicKeyBase58Check);
}

export function UploadImage(
  endpoint: string,
  UserPublicKeyBase58Check: string,
  file: File
): Observable<any> {
  const request = jwt({
    ...identityServiceParamsForKey(UserPublicKeyBase58Check),
  });
  return request.pipe(
    switchMap((signed) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("UserPublicKeyBase58Check", UserPublicKeyBase58Check);
      formData.append("JWT", signed.jwt);

      return post(endpoint, BackendRoutes.RoutePathUploadImage, formData);
    })
  );
}

export function CreateNft(
  endpoint: string,
  UpdaterPublicKeyBase58Check: string,
  NFTPostHashHex: string,
  NumCopies: number,
  NFTRoyaltyToCreatorBasisPoints: number,
  NFTRoyaltyToCoinBasisPoints: number,
  HasUnlockable: boolean,
  IsForSale: boolean,
  MinBidAmountNanos: number,
  // added
  IsBuyNow: boolean,
  BuyNowPriceNanos: number,
  AdditionalDESORoyaltiesMap: { [k: string]: number },
  AdditionalCoinRoyaltiesMap: { [k: string]: number },
  MinFeeRateNanosPerKB: number
): Observable<any> {
  const request = post(endpoint, BackendRoutes.RoutePathCreateNft, {
    UpdaterPublicKeyBase58Check,
    NFTPostHashHex,
    NumCopies,
    NFTRoyaltyToCreatorBasisPoints,
    NFTRoyaltyToCoinBasisPoints,
    HasUnlockable,
    IsForSale,
    MinBidAmountNanos,
    IsBuyNow,
    BuyNowPriceNanos,
    AdditionalDESORoyaltiesMap,
    AdditionalCoinRoyaltiesMap,
    MinFeeRateNanosPerKB,
  });
  return signAndSubmitTransaction(
    endpoint,
    request,
    UpdaterPublicKeyBase58Check
  );
}

export function UpdateNFT(
  endpoint: string,
  UpdaterPublicKeyBase58Check: string,
  NFTPostHashHex: string,
  SerialNumber: number,
  IsForSale: boolean,
  MinBidAmountNanos: number,
  IsBuyNow: boolean,
  BuyNowPriceNanos: number,
  MinFeeRateNanosPerKB: number
): Observable<any> {
  const request = post(endpoint, BackendRoutes.RoutePathUpdateNFT, {
    UpdaterPublicKeyBase58Check,
    NFTPostHashHex,
    SerialNumber,
    IsForSale,
    MinBidAmountNanos,
    IsBuyNow,
    BuyNowPriceNanos,
    MinFeeRateNanosPerKB,
  });
  track46("NFT set for resale", {
    Poster: UpdaterPublicKeyBase58Check,
    "Post hex": NFTPostHashHex,
    "Serial Number": SerialNumber,
    "For Sale": IsForSale,
    "Min Bid": MinBidAmountNanos / 1e9,
    "Min fee rate per KB": MinFeeRateNanosPerKB,
  });
  return signAndSubmitTransaction(
    endpoint,
    request,
    UpdaterPublicKeyBase58Check
  );
}

export function CreateNFTBid(
  endpoint: string,
  UpdaterPublicKeyBase58Check: string,
  NFTPostHashHex: string,
  SerialNumber: number,
  BidAmountNanos: number,
  MinFeeRateNanosPerKB: number
): Observable<any> {
  const request = post(endpoint, BackendRoutes.RoutePathCreateNFTBid, {
    UpdaterPublicKeyBase58Check,
    NFTPostHashHex,
    SerialNumber,
    BidAmountNanos,
    MinFeeRateNanosPerKB,
  });
  return signAndSubmitTransaction(
    endpoint,
    request,
    UpdaterPublicKeyBase58Check
  );
}

export function AcceptNFTBid(
  endpoint: string,
  UpdaterPublicKeyBase58Check: string,
  NFTPostHashHex: string,
  SerialNumber: number,
  BidderPublicKeyBase58Check: string,
  BidAmountNanos: number,
  UnencryptedUnlockableText: string,
  MinFeeRateNanosPerKB: number
): Observable<any> {
  let request = UnencryptedUnlockableText
    ? encrypt({
        ...identityServiceParamsForKey(UpdaterPublicKeyBase58Check),
        recipientPublicKey: BidderPublicKeyBase58Check,
        message: UnencryptedUnlockableText,
      })
    : of({ encryptedMessage: "" });
  request = request.pipe(
    switchMap((encrypted) => {
      const EncryptedMessageText = encrypted.encryptedMessage;
      return post(endpoint, BackendRoutes.RoutePathAcceptNFTBid, {
        UpdaterPublicKeyBase58Check,
        NFTPostHashHex,
        SerialNumber,
        BidderPublicKeyBase58Check,
        BidAmountNanos,
        EncryptedUnlockableText: EncryptedMessageText,
        MinFeeRateNanosPerKB,
      }).pipe(
        map((request) => {
          return { ...request };
        })
      );
    })
  );
  return signAndSubmitTransaction(
    endpoint,
    request,
    UpdaterPublicKeyBase58Check
  );
}

export function DecryptUnlockableTexts(
  ReaderPublicKeyBase58Check: string,
  UnlockableNFTEntryResponses: NFTEntryResponse[]
): Observable<any> {
  return decrypt({
    ...identityServiceParamsForKey(ReaderPublicKeyBase58Check),
    encryptedMessages: UnlockableNFTEntryResponses.map(
      (unlockableNFTEntryResponses) => ({
        EncryptedHex: unlockableNFTEntryResponses.EncryptedUnlockableText,
        PublicKey: unlockableNFTEntryResponses.LastOwnerPublicKeyBase58Check,
      })
    ),
  })
    .pipe(
      map((decrypted) => {
        for (const unlockableNFTEntryResponse of UnlockableNFTEntryResponses) {
          unlockableNFTEntryResponse.DecryptedUnlockableText =
            decrypted.decryptedHexes[
              unlockableNFTEntryResponse.EncryptedUnlockableText
            ];
        }
        return UnlockableNFTEntryResponses;
      })
    )
    .pipe(catchError(_handleError));
}

export function GetNFTBidsForNFTPost(
  endpoint: string,
  ReaderPublicKeyBase58Check: string,
  PostHashHex: string
): Observable<NFTBidData> {
  return post(endpoint, BackendRoutes.RoutePathGetNFTBidsForNFTPost, {
    ReaderPublicKeyBase58Check,
    PostHashHex,
  });
}

export function GetNFTsForUser(
  endpoint: string,
  UserPublicKeyBase58Check: string,
  ReaderPublicKeyBase58Check: string,
  IsForSale: boolean | null = null
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetNFTsForUser, {
    UserPublicKeyBase58Check,
    ReaderPublicKeyBase58Check,
    IsForSale,
  });
}

export function GetNFTBidsForUser(
  endpoint: string,
  UserPublicKeyBase58Check: string,
  ReaderPublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetNFTBidsForUser, {
    UserPublicKeyBase58Check,
    ReaderPublicKeyBase58Check,
  });
}

export function GetNFTShowcase(
  endpoint: string,
  UserPublicKeyBase58Check: string,
  ReaderPublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetNFTShowcase, {
    UserPublicKeyBase58Check,
    ReaderPublicKeyBase58Check,
  });
}
// This is the one that has been modded on the backend
export function GetNFTShowcaseSupernovas(
  endpoint: string,
  UserPublicKeyBase58Check: string,
  ReaderPublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetNFTShowcaseSupernovas, {
    UserPublicKeyBase58Check,
    ReaderPublicKeyBase58Check,
  });
}
export function GetNFTShowcaseStripped(
  endpoint: string,
  UserPublicKeyBase58Check: string,
  ReaderPublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetNFTShowcaseStripped, {
    UserPublicKeyBase58Check,
    ReaderPublicKeyBase58Check,
  });
}
// PublicKey can be omitted on the analytics queries
export function GetDesoMarketCapGraph(
  endpoint: string,
  PublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetDesoMarketCapGraph, {
    PublicKeyBase58Check,
  });
}
// PublicKey can be omitted on the analytics queries
export function GetDesoSalesCapGraph(
  endpoint: string,
  PublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetDesoSalesCapGraph, {
    PublicKeyBase58Check,
  });
}
export function GetTopNFTSales(
  endpoint: string,
  PublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetTopNFTSales, {
    PublicKeyBase58Check,
  });
}
export function GetTopBidsToday(
  endpoint: string,
  PublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetTopBidsToday, {
    PublicKeyBase58Check,
  });
}
export function GetTopEarningCollectors(
  endpoint: string,
  PublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetTopEarningCollectors, {
    PublicKeyBase58Check,
  });
}
export function GetTopEarningCreators(
  endpoint: string,
  PublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetTopEarningCreators, {
    PublicKeyBase58Check,
  });
}
export function GetQuickFacts(
  endpoint: string,
  PublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetQuickFacts, {
    PublicKeyBase58Check,
  });
}
export function GetCreatedNfts(
  endpoint: string,
  ReaderPublicKeyBase58Check: string,
  Username: string,
  Offset: number
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetCreatedNfts, {
    ReaderPublicKeyBase58Check,
    Username,
    Offset,
  });
}
// PublicKey can be omitted on the analytics queries
export function GetUniqueCreators(
  endpoint: string,
  PublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetUniqueCreators, {
    PublicKeyBase58Check,
  });
}
// PublicKey can be omitted on the analytics queries
export function GetUniqueCollectors(
  endpoint: string,
  PublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetUniqueCollectors, {
    PublicKeyBase58Check,
  });
}
export function GetNFTShowcasePaginated(
  endpoint: string,
  UserPublicKeyBase58Check: string,
  ReaderPublicKeyBase58Check: string,
  PostHashHex: string,
  NumToFetch: number
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetNFTShowcasePaginated, {
    UserPublicKeyBase58Check,
    ReaderPublicKeyBase58Check,
    PostHashHex,
    NumToFetch,
  });
}
export function GetCommunityFavourite(
  endpoint: string,
  ReaderPublicKeyBase58Check: string,
  ProfilePublicKey: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetCommunityFavourites, {
    ReaderPublicKeyBase58Check,
    ProfilePublicKey,
  });
}
export function GetNFTsByCategory(
  endpoint: string,
  ReaderPublicKeyBase58Check: string,
  Category: string,
  Offset: number
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetNFTsByCategory, {
    ReaderPublicKeyBase58Check,
    Category,
    Offset,
  });
}

export function GetTrendingAuctions(
  endpoint: string,
  ReaderPublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetTrendingAuctions, {
    ReaderPublicKeyBase58Check,
  });
}
export function GetRecentSales(
  endpoint: string,
  ReaderPublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetRecentSales, {
    ReaderPublicKeyBase58Check,
  });
}
export function GetSecondaryListings(
  endpoint: string,
  ReaderPublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetSecondaryListings, {
    ReaderPublicKeyBase58Check,
  });
}
export function GetFreshDrops(
  endpoint: string,
  ReaderPublicKeyBase58Check: string,
  ProfilePublicKey: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetFreshDrops, {
    ReaderPublicKeyBase58Check,
    ProfilePublicKey,
  });
}
export function GetNextNFTShowcase(
  endpoint: string,
  UserPublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetNextNFTShowcase, {
    UserPublicKeyBase58Check,
  });
}
// Sends a user a welcoming email
export function SendWelcomeEmail(
  endpoint: string,
  Username: string,
  Email: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathSendWelcomeEmail, {
    Username,
    Email,
  });
}
// Sends post reported event to support@supernovas.app, either send just the postHash or a full blown link
// '<a href=''>View reported content</a>
export function ReportPostEmail(
  endpoint: string,
  ReportedContent: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathReportPostEmail, {
    ReportedContent,
  });
}
export function AddToInvestorEmailList(
  endpoint: string,
  Email: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathAddToInvestorEmailList, {
    Email,
  });
}
export function GetCurrentTime(
  endpoint: string,
  ReaderPublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetCurrentTime, {
    ReaderPublicKeyBase58Check,
  });
}
// Get nft trade list
export function GetNFTTradeList(
  hash: string,
  limit: number,
  method: string
): Observable<any> {
  return post("https://api.overdeso.com/v1", "", [
    {
      method: method,
      params: {
        hash,
        limit,
      },
    },
  ]);
}

export function SortMarketplace(
  endpoint: string,
  ReaderPublicKeyBase58Check: string,
  Offset: number,
  LowPrice: number,
  HighPrice: number,
  AuctionStatus: string,
  MarketType: string,
  Category: string,
  SortType: string,
  ContentFormat: string,
  CreatorsType: string,
  Limit: number
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathSortMarketplace, {
    ReaderPublicKeyBase58Check,
    Offset,
    HighPrice,
    LowPrice,
    AuctionStatus,
    MarketType,
    Category,
    SortType,
    ContentFormat,
    CreatorsType,
    Limit,
  });
}
export function SortCollection(
  endpoint: string,
  ReaderPublicKeyBase58Check: string,
  Username: string,
  CollectionName: string,
  Offset: number,
  Status: string,
  Market: string,
  OrderByType: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathSortCollection, {
    ReaderPublicKeyBase58Check,
    Username,
    CollectionName,
    Offset,
    Status,
    Market,
    OrderByType,
  });
}
// get all rows from collections that have the username as the creator
// Used to filter duplicate posts and collection names inside collection creation
export function GetUserCollectionsData(
  endpoint: string,
  Username: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetUserCollectionsData, {
    Username,
  });
}
export function GetCollectionInfo(
  endpoint: string,
  CollectionName: string,
  CollectionCreatorName: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetCollectionInfo, {
    CollectionName,
    CollectionCreatorName,
  });
}
// Used to show collections in profile
export function GetAllUserCollections(
  endpoint: string,
  Username: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetAllUserCollections, {
    Username,
  });
}
// Used to show which collections the user has -> which collections they can add to
export function GetAllUserCollectionNames(
  endpoint: string,
  Username: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetAllUserCollectionNames, {
    Username,
  });
}
// Insert a single post into a specific collection
export function InsertIntoCollection(
  endpoint: string,
  PostHashHex: string,
  Username: string,
  Collection: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathInsertIntoCollection, {
    PostHashHex,
    Username,
    Collection,
  });
}
export function CreateCollection(
  endpoint: string,
  PostHashHexArray: string[],
  Username: string,
  CollectionName: string,
  CollectionDescription: string,
  CollectionBannerLocation: string,
  CollectionProfilePicLocation: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathCreateCollection, {
    PostHashHexArray,
    Username,
    CollectionName,
    CollectionDescription,
    CollectionBannerLocation,
    CollectionProfilePicLocation,
  });
}
export function AddToCollection(
  endpoint: string,
  PostHashHexArray: string[],
  Username: string,
  CollectionName: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathAddToCollection, {
    PostHashHexArray,
    Username,
    CollectionName,
  });
}
export function SortCreators(
  endpoint: string,
  Offset: number,
  Verified
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathSortCreators, {
    Offset,
    Verified,
  });
}
// Gets info if user is collector / creator / both
export function GetCollectorOrCreator(
  endpoint: string,
  PublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetCollectorOrCreator, {
    PublicKeyBase58Check,
  });
}
// When user connects eth wallet, add it to their profile details
export function InsertOrUpdateIMXPK(
  endpoint: string,
  PublicKeyBase58Check: string,
  ETH_PublicKey: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathInsertOrUpdateIMXPK, {
    PublicKeyBase58Check,
    ETH_PublicKey,
  });
}
// update / set if user creator / collector status
export function UpdateCollectorOrCreator(
  endpoint: string,
  PublicKeyBase58Check: string,
  Creator: boolean,
  Collector: boolean
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathUpdateCollectorOrCreator, {
    PublicKeyBase58Check,
    Creator,
    Collector,
  });
}
// Gets everything needed in profile / update profile
export function GetPGProfileDetails(
  endpoint: string,
  PublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetPGProfileDetails, {
    PublicKeyBase58Check,
  });
}
// Adds to the list of verified users in pg
// tie this to admin panel verification
export function InsertIntoPGVerified(
  endpoint: string,
  Username: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathInsertIntoPGVerified, {
    Username,
  });
}
// Add a base64 publickey to a table of blocked publickeys
// Removes user from marketplace + discovery
export function RemoveUserFromQueries(
  endpoint: string,
  AdminPublicKey: string,
  Base64PublicKey: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathRemoveUserFromQueries,
    AdminPublicKey,
    {
      AdminPublicKey,
      Base64PublicKey,
    }
  );
}
// Works for both initial creation and updating
export function InsertOrUpdateProfileDetails(
  endpoint: string,
  PublicKeyBase58Check: string,
  Twitter: string,
  Website: string,
  Discord: string,
  Instagram: string,
  Name: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathInsertOrUpdateProfileDetails, {
    PublicKeyBase58Check,
    Twitter,
    Website,
    Discord,
    Instagram,
    Name,
  });
}
export function GetNFTCollectionSummary(
  endpoint: string,
  ReaderPublicKeyBase58Check: string,
  PostHashHex: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetNFTCollectionSummary, {
    ReaderPublicKeyBase58Check,
    PostHashHex,
  });
}

export function GetNFTEntriesForNFTPost(
  endpoint: string,
  ReaderPublicKeyBase58Check: string,
  PostHashHex: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetNFTEntriesForPostHash, {
    ReaderPublicKeyBase58Check,
    PostHashHex,
  });
}

export function SubmitPost(
  endpoint: string,
  UpdaterPublicKeyBase58Check: string,
  PostHashHexToModify: string,
  ParentStakeID: string,
  Title: string,
  BodyObj: PostTxnBody,
  RepostedPostHashHex: string,
  PostExtraData: any,
  Sub: string,
  IsHidden: boolean,
  MinFeeRateNanosPerKB: number,
  InTutorial: boolean = false
): Observable<any> {
  const request = post(endpoint, BackendRoutes.RoutePathSubmitPost, {
    UpdaterPublicKeyBase58Check,
    PostHashHexToModify,
    ParentStakeID,
    Title,
    BodyObj,
    RepostedPostHashHex,
    PostExtraData,
    Sub,
    IsHidden,
    MinFeeRateNanosPerKB,
    InTutorial,
  });

  return signAndSubmitTransaction(
    endpoint,
    request,
    UpdaterPublicKeyBase58Check
  );
}

export function GetPostsStateless(
  endpoint: string,
  PostHashHex: string,
  ReaderPublicKeyBase58Check: string,
  OrderBy: string,
  StartTstampSecs: number,
  PostContent: string,
  NumToFetch: number,
  FetchSubcomments: boolean,
  GetPostsForFollowFeed: boolean,
  GetPostsForGlobalWhitelist: boolean,
  GetPostsByDESO: boolean,
  MediaRequired: boolean,
  PostsByDESOMinutesLookback: number,
  AddGlobalFeedBool: boolean
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetPostsStateless, {
    PostHashHex,
    ReaderPublicKeyBase58Check,
    OrderBy,
    StartTstampSecs,
    PostContent,
    NumToFetch,
    FetchSubcomments,
    GetPostsForFollowFeed,
    GetPostsForGlobalWhitelist,
    GetPostsByDESO,
    MediaRequired,
    PostsByDESOMinutesLookback,
    AddGlobalFeedBool,
  });
}

export function GetSinglePost(
  endpoint: string,
  PostHashHex: string,
  ReaderPublicKeyBase58Check: string,
  FetchParents: boolean = true,
  CommentOffset: number = 0,
  CommentLimit: number = 20,
  AddGlobalFeedBool: boolean = false
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetSinglePost, {
    PostHashHex,
    ReaderPublicKeyBase58Check,
    FetchParents,
    CommentOffset,
    CommentLimit,
    AddGlobalFeedBool,
  });
}

export function GetProfiles(
  endpoint: string,
  PublicKeyBase58Check: string,
  Username: string,
  UsernamePrefix: string,
  Description: string,
  OrderBy: string,
  NumToFetch: number,
  ReaderPublicKeyBase58Check: string,
  ModerationType: string,
  FetchUsersThatHODL: boolean,
  AddGlobalFeedBool: boolean = false
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetProfiles, {
    PublicKeyBase58Check,
    Username,
    UsernamePrefix,
    Description,
    OrderBy,
    NumToFetch,
    ReaderPublicKeyBase58Check,
    ModerationType,
    FetchUsersThatHODL,
    AddGlobalFeedBool,
  });
}
export function GetSingleProfile(
  endpoint: string,
  PublicKeyBase58Check: string,
  Username: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetSingleProfile, {
    PublicKeyBase58Check,
    Username,
  });
}

// We add a ts-ignore here as typescript does not expect responseType to be anything but "json".
export function GetSingleProfilePicture(
  endpoint: string,
  PublicKeyBase58Check: string,
  bustCache: string = ""
): Observable<any> {
  return ax.get<any>(
    GetSingleProfilePictureURL(endpoint, PublicKeyBase58Check, bustCache),
    {
      // @ts-ignore
      responseType: "blob",
    }
  );
}
export function GetSingleProfilePictureURL(
  endpoint: string,
  PublicKeyBase58Check: string,
  fallback
): string {
  return _makeRequestURL(
    endpoint,
    BackendRoutes.RoutePathGetSingleProfilePicture +
      "/" +
      PublicKeyBase58Check +
      "?" +
      fallback
  );
}
export function GetDefaultProfilePictureURL(endpoint: string): string {
  return _makeRequestURL(endpoint, "/assets/img/default_profile_pic.png");
}

export function GetPostsForPublicKey(
  endpoint: string,
  PublicKeyBase58Check: string,
  Username: string,
  ReaderPublicKeyBase58Check: string,
  LastPostHashHex: string,
  NumToFetch: number,
  MediaRequired: boolean
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetPostsForPublicKey, {
    PublicKeyBase58Check,
    Username,
    ReaderPublicKeyBase58Check,
    LastPostHashHex,
    NumToFetch,
    MediaRequired,
  });
}

export function GetDiamondedPosts(
  endpoint: string,
  ReceiverPublicKeyBase58Check: string,
  ReceiverUsername: string,
  SenderPublicKeyBase58Check: string,
  SenderUsername: string,
  ReaderPublicKeyBase58Check: string,
  StartPostHashHex: string,
  NumToFetch: number
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetDiamondedPosts, {
    ReceiverPublicKeyBase58Check,
    ReceiverUsername,
    SenderPublicKeyBase58Check,
    SenderUsername,
    ReaderPublicKeyBase58Check,
    StartPostHashHex,
    NumToFetch,
  });
}

export function GetHodlersForPublicKey(
  endpoint: string,
  PublicKeyBase58Check: string,
  Username: string,
  LastPublicKeyBase58Check: string,
  NumToFetch: number,
  FetchHodlings: boolean = false,
  FetchAll: boolean = false
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetHodlersForPublicKey, {
    PublicKeyBase58Check,
    Username,
    LastPublicKeyBase58Check,
    NumToFetch,
    FetchHodlings,
    FetchAll,
  });
}
export function UpdateProfile(
  endpoint: string,
  // Specific fields
  UpdaterPublicKeyBase58Check: string,
  // Optional: Only needed when updater public key != profile public key
  ProfilePublicKeyBase58Check: string,
  NewUsername: string,
  NewDescription: string,
  NewProfilePic: string,
  NewCreatorBasisPoints: number,
  NewStakeMultipleBasisPoints: number,
  IsHidden: boolean,
  // End specific fields
  MinFeeRateNanosPerKB: number
): Observable<any> {
  NewCreatorBasisPoints = Math.floor(NewCreatorBasisPoints);
  NewStakeMultipleBasisPoints = Math.floor(NewStakeMultipleBasisPoints);

  const request = post(endpoint, BackendRoutes.RoutePathUpdateProfile, {
    UpdaterPublicKeyBase58Check,
    ProfilePublicKeyBase58Check,
    NewUsername,
    NewDescription,
    NewProfilePic,
    NewCreatorBasisPoints,
    NewStakeMultipleBasisPoints,
    IsHidden,
    MinFeeRateNanosPerKB,
  });

  return signAndSubmitTransaction(
    endpoint,
    request,
    UpdaterPublicKeyBase58Check
  );
}

export function GetFollows(
  endpoint: string,
  Username: string,
  PublicKeyBase58Check: string,
  GetEntriesFollowingUsername: boolean,
  LastPublicKeyBase58Check: string = "",
  NumToFetch: number = 50
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetFollowsStateless, {
    Username,
    PublicKeyBase58Check,
    GetEntriesFollowingUsername,
    LastPublicKeyBase58Check,
    NumToFetch,
  });
}

export function CreateFollowTxn(
  endpoint: string,
  FollowerPublicKeyBase58Check: string,
  FollowedPublicKeyBase58Check: string,
  IsUnfollow: boolean,
  MinFeeRateNanosPerKB: number
): Observable<any> {
  const request = post(
    endpoint,
    BackendRoutes.RoutePathCreateFollowTxnStateless,
    {
      FollowerPublicKeyBase58Check,
      FollowedPublicKeyBase58Check,
      IsUnfollow,
      MinFeeRateNanosPerKB,
    }
  );

  return signAndSubmitTransaction(
    endpoint,
    request,
    FollowerPublicKeyBase58Check
  );
}

export function GetMessages(
  endpoint: string,
  PublicKeyBase58Check: string,
  FetchAfterPublicKeyBase58Check: string = "",
  NumToFetch: number = 25,
  HoldersOnly: boolean = false,
  HoldingsOnly: boolean = false,
  FollowersOnly: boolean = false,
  FollowingOnly: boolean = false,
  SortAlgorithm: string = "time"
): Observable<any> {
  let req = ax.post<any>(
    _makeRequestURL(endpoint, BackendRoutes.RoutePathGetMessagesStateless),
    {
      PublicKeyBase58Check,
      FetchAfterPublicKeyBase58Check,
      NumToFetch,
      HoldersOnly,
      HoldingsOnly,
      FollowersOnly,
      FollowingOnly,
      SortAlgorithm,
    }
  );

  // create an array of messages to decrypt
  req = req.pipe(
    map((res) => {
      // This array contains encrypted messages with public keys
      // Public keys of the other party involved in the correspondence
      const encryptedMessages = [];
      for (const threads of res.data.OrderedContactsWithMessages) {
        for (const message of threads.Messages) {
          const payload = {
            EncryptedHex: message.EncryptedText,
            PublicKey: message.IsSender
              ? message.RecipientPublicKeyBase58Check
              : message.SenderPublicKeyBase58Check,
            IsSender: message.IsSender,
            Legacy: !message.V2,
          };
          encryptedMessages.push(payload);
        }
      }
      return { ...res, encryptedMessages };
    })
  );

  // decrypt all the messages
  req = req.pipe(
    switchMap((res) => {
      return decrypt({
        ...identityServiceParamsForKey(PublicKeyBase58Check),
        encryptedMessages: res.data.encryptedMessages,
      }).pipe(
        map((decrypted) => {
          for (const threads of res.data.OrderedContactsWithMessages) {
            for (const message of threads.Messages) {
              message.DecryptedText =
                decrypted.decryptedHexes[message.EncryptedText];
            }
          }

          return { ...res, ...decrypted };
        })
      );
    })
  );

  return req.pipe(catchError(_handleError));
}

export function CreateLike(
  endpoint: string,
  ReaderPublicKeyBase58Check: string,
  LikedPostHashHex: string,
  IsUnlike: boolean,
  MinFeeRateNanosPerKB: number
): Observable<any> {
  const request = post(endpoint, BackendRoutes.RoutePathCreateLikeStateless, {
    ReaderPublicKeyBase58Check,
    LikedPostHashHex,
    IsUnlike,
    MinFeeRateNanosPerKB,
  });
  track40("Liked post", {
    post: LikedPostHashHex,
  });
  track70("On-chain activity");
  return signAndSubmitTransaction(
    endpoint,
    request,
    ReaderPublicKeyBase58Check
  );
}

export function SendDiamonds(
  endpoint: string,
  SenderPublicKeyBase58Check: string,
  ReceiverPublicKeyBase58Check: string,
  DiamondPostHashHex: string,
  DiamondLevel: number,
  MinFeeRateNanosPerKB: number,
  InTutorial: boolean = false
): Observable<any> {
  const request = post(endpoint, BackendRoutes.RoutePathSendDiamonds, {
    SenderPublicKeyBase58Check,
    ReceiverPublicKeyBase58Check,
    DiamondPostHashHex,
    DiamondLevel,
    MinFeeRateNanosPerKB,
    InTutorial,
  });
  track41("Send Diamond", {
    Receiver: ReceiverPublicKeyBase58Check,
    "Diamond Level": DiamondLevel,
    "Post hash": DiamondPostHashHex,
  });
  track70("On-chain activity");
  return signAndSubmitTransaction(
    endpoint,
    request,
    SenderPublicKeyBase58Check
  );
}

export function GetDiamondsForPublicKey(
  endpoint: string,
  PublicKeyBase58Check: string,
  FetchYouDiamonded: boolean = false
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetDiamondsForPublicKey, {
    PublicKeyBase58Check,
    FetchYouDiamonded,
  });
}

export function GetLikesForPost(
  endpoint: string,
  PostHashHex: string,
  Offset: number,
  Limit: number,
  ReaderPublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetLikesForPost, {
    PostHashHex,
    Offset,
    Limit,
    ReaderPublicKeyBase58Check,
  });
}

export function GetDiamondsForPost(
  endpoint: string,
  PostHashHex: string,
  Offset: number,
  Limit: number,
  ReaderPublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetDiamondsForPost, {
    PostHashHex,
    Offset,
    Limit,
    ReaderPublicKeyBase58Check,
  });
}

export function GetRepostsForPost(
  endpoint: string,
  PostHashHex: string,
  Offset: number,
  Limit: number,
  ReaderPublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetRepostsForPost, {
    PostHashHex,
    Offset,
    Limit,
    ReaderPublicKeyBase58Check,
  });
}

export function GetQuoteRepostsForPost(
  endpoint: string,
  PostHashHex: string,
  Offset: number,
  Limit: number,
  ReaderPublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetQuoteRepostsForPost, {
    PostHashHex,
    Offset,
    Limit,
    ReaderPublicKeyBase58Check,
  });
}

export function BuyOrSellCreatorCoin(
  endpoint: string,

  // The public key of the user who is making the buy/sell.
  UpdaterPublicKeyBase58Check: string,
  // The public key of the profile that the purchaser is trying
  // to buy.
  CreatorPublicKeyBase58Check: string,
  // Whether this is a "buy" or "sell"
  OperationType: string,
  // Generally, only one of these will be used depending on the OperationType
  // set. In a Buy transaction, DeSoToSellNanos will be converted into
  // creator coin on behalf of the user. In a Sell transaction,
  // CreatorCoinToSellNanos will be converted into DeSo. In an AddDeSo
  // operation, DeSoToAddNanos will be aded for the user. This allows us to
  // support multiple transaction types with same meta field.
  DeSoToSellNanos: number,
  CreatorCoinToSellNanos: number,
  DeSoToAddNanos: number,
  // When a user converts DeSo into CreatorCoin, MinCreatorCoinExpectedNanos
  // specifies the minimum amount of creator coin that the user expects from their
  // transaction. And vice versa when a user is converting CreatorCoin for DeSo.
  // Specifying these fields prevents the front-running of users' buy/sell. Setting
  // them to zero turns off the check. Give it your best shot, Ivan.
  MinDeSoExpectedNanos: number,
  MinCreatorCoinExpectedNanos: number,

  MinFeeRateNanosPerKB: number,
  Broadcast: boolean,
  InTutorial: boolean = false
): Observable<any> {
  DeSoToSellNanos = Math.floor(DeSoToSellNanos);
  CreatorCoinToSellNanos = Math.floor(CreatorCoinToSellNanos);
  DeSoToAddNanos = Math.floor(DeSoToAddNanos);
  MinDeSoExpectedNanos = Math.floor(MinDeSoExpectedNanos);
  MinCreatorCoinExpectedNanos = Math.floor(MinCreatorCoinExpectedNanos);

  let request = post(endpoint, BackendRoutes.RoutePathBuyOrSellCreatorCoin, {
    UpdaterPublicKeyBase58Check,
    CreatorPublicKeyBase58Check,
    OperationType,
    DeSoToSellNanos,
    CreatorCoinToSellNanos,
    DeSoToAddNanos,
    MinDeSoExpectedNanos,
    MinCreatorCoinExpectedNanos,
    MinFeeRateNanosPerKB,
    // If we are not broadcasting the transaction, InTutorial should always be false so we don't update the TutorialStatus of the user.
    InTutorial: Broadcast ? InTutorial : false,
  });

  if (Broadcast) {
    request = signAndSubmitTransaction(
      endpoint,
      request,
      UpdaterPublicKeyBase58Check
    );
  }

  return request;
}

export function TransferCreatorCoin(
  endpoint: string,
  SenderPublicKeyBase58Check: string,
  CreatorPublicKeyBase58Check: string,
  ReceiverUsernameOrPublicKeyBase58Check: string,
  CreatorCoinToTransferNanos: number,
  MinFeeRateNanosPerKB: number,
  Broadcast: boolean
): Observable<any> {
  CreatorCoinToTransferNanos = Math.floor(CreatorCoinToTransferNanos);

  const routeName = BackendRoutes.RoutePathTransferCreatorCoin;
  let request = post(endpoint, routeName, {
    SenderPublicKeyBase58Check,
    CreatorPublicKeyBase58Check,
    ReceiverUsernameOrPublicKeyBase58Check,
    CreatorCoinToTransferNanos,
    MinFeeRateNanosPerKB,
  });

  if (Broadcast) {
    request = signAndSubmitTransaction(
      endpoint,
      request,
      SenderPublicKeyBase58Check
    );
  }

  return request;
}

export function BlockPublicKey(
  endpoint: string,
  PublicKeyBase58Check: string,
  BlockPublicKeyBase58Check: string,
  Unblock: boolean = false
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathBlockPublicKey,
    PublicKeyBase58Check,
    {
      PublicKeyBase58Check,
      BlockPublicKeyBase58Check,
      Unblock,
    }
  );
}

export function SetNotificationsMetadata(
  endpoint: string,
  PublicKeyBase58Check: string,
  LastSeenIndex: number,
  LastUnreadNotificationIndex: number,
  UnreadNotifications: number
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathSetNotificationMetadata,
    PublicKeyBase58Check,
    {
      PublicKeyBase58Check,
      LastSeenIndex,
      LastUnreadNotificationIndex,
      UnreadNotifications,
    }
  );
}

export function GetUnreadNotificationsCount(
  endpoint: string,
  PublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetUnreadNotificationsCount, {
    PublicKeyBase58Check,
  });
}

export function MarkContactMessagesRead(
  endpoint: string,
  UserPublicKeyBase58Check: string,
  ContactPublicKeyBase58Check: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathMarkContactMessagesRead,
    UserPublicKeyBase58Check,
    {
      UserPublicKeyBase58Check,
      ContactPublicKeyBase58Check,
    }
  );
}

export function MarkAllMessagesRead(
  endpoint: string,
  UserPublicKeyBase58Check: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathMarkAllMessagesRead,
    UserPublicKeyBase58Check,
    {
      UserPublicKeyBase58Check,
    }
  );
}
// Note that FetchStartIndex < 0 means "fetch me the latest notifications."
// To implement pagination, all you have to do
// is set FetchStartIndex to the Index value of the last notification in
// the list and re-fetch. The endpoint will return NumToFetch notifications
// that include all notifications that are currently in the mempool.
export function GetNotifications(
  endpoint: string,
  PublicKeyBase58Check: string,
  FetchStartIndex: number,
  NumToFetch: number
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetNotifications, {
    PublicKeyBase58Check,
    FetchStartIndex,
    NumToFetch,
  });
}

export function GetAppState(
  endpoint: string,
  PublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetAppState, {
    PublicKeyBase58Check,
  });
}

export function UpdateUserGlobalMetadata(
  endpoint: string,
  UserPublicKeyBase58Check: string,
  Email: string,
  MessageReadStateUpdatesByContact: any
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathUpdateUserGlobalMetadata,
    UserPublicKeyBase58Check,
    {
      UserPublicKeyBase58Check,
      Email,
      MessageReadStateUpdatesByContact,
    }
  );
}

export function GetUserGlobalMetadata(
  endpoint: string,

  // The public key of the user to update.
  UserPublicKeyBase58Check: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathGetUserGlobalMetadata,
    UserPublicKeyBase58Check,
    {
      UserPublicKeyBase58Check,
    }
  );
}

export function ResendVerifyEmail(endpoint: string, PublicKey: string) {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathResendVerifyEmail,
    PublicKey,
    {
      PublicKey,
    }
  );
}

export function VerifyEmail(
  endpoint: string,
  PublicKey: string,
  EmailHash: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathVerifyEmail, {
    PublicKey,
    EmailHash,
  });
}

export function GetVerifiedUsers(
  endpoint: string,
  PublicKey: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminGetVerifiedUsers,
    PublicKey,
    {
      PublicKey,
    }
  );
}
export function DeletePII(
  endpoint: string,
  PublicKeyBase58Check: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathDeletePII,
    PublicKeyBase58Check,
    {
      PublicKeyBase58Check,
    }
  );
}

export function GetJumioStatusForPublicKey(
  endpoint: string,
  PublicKeyBase58Check: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathGetJumioStatusForPublicKey,
    PublicKeyBase58Check,
    {
      PublicKeyBase58Check,
    }
  );
}
export function AppendExtraData(
  endpoint: string,
  TransactionHex: string,
  ExtraData: {}
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathAppendExtraData, {
    TransactionHex,
    ExtraData,
  });
}
export function SubmitETHTx(
  endpoint: string,
  PublicKeyBase58Check: string,
  Tx: any,
  ToSign: string[],
  SignedHashes: string[]
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathSubmitETHTx, {
    PublicKeyBase58Check,
    Tx,
    ToSign,
    SignedHashes,
  });
}

export function QueryETHRPC(
  endpoint: string,
  Method: string,
  Params: string[],
  PublicKeyBase58Check: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathQueryETHRPC,
    PublicKeyBase58Check,
    {
      Method,
      Params,
      PublicKeyBase58Check,
    }
  );
}

export function AdminGetVerifiedUsers(
  endpoint: string,
  AdminPublicKey: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathAdminGetVerifiedUsers, {
    AdminPublicKey,
  });
}

export function AdminGetUsernameVerificationAuditLogs(
  endpoint: string,
  AdminPublicKey: string,
  Username: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminGetUsernameVerificationAuditLogs,
    AdminPublicKey,
    {
      AdminPublicKey,
      Username,
    }
  );
}

export function AdminGrantVerificationBadge(
  endpoint: string,
  AdminPublicKey: string,
  UsernameToVerify: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminGrantVerificationBadge,
    AdminPublicKey,
    {
      AdminPublicKey,
      UsernameToVerify,
    }
  );
}
export function AdminGetHotFeedAlgorithm(
  endpoint: string,
  AdminPublicKey: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminGetHotFeedAlgorithm,
    AdminPublicKey,
    {
      AdminPublicKey,
    }
  );
}

export function AdminUpdateHotFeedAlgorithm(
  endpoint: string,
  AdminPublicKey: string,
  InteractionCap: number,
  TimeDecayBlocks: number
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminUpdateHotFeedAlgorithm,
    AdminPublicKey,
    {
      AdminPublicKey,
      InteractionCap,
      TimeDecayBlocks,
    }
  );
}

export function AdminGetUnfilteredHotFeed(
  endpoint: string,
  AdminPublicKey: string,
  ResponseLimit: number,
  SeenPosts: Array<string>
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminGetUnfilteredHotFeed,
    AdminPublicKey,
    {
      AdminPublicKey,
      ResponseLimit,
      SeenPosts,
    }
  );
}

export function AdminUpdateHotFeedPostMultiplier(
  endpoint: string,
  AdminPublicKey: string,
  PostHashHex: string,
  Multiplier: number
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminUpdateHotFeedPostMultiplier,
    AdminPublicKey,
    {
      AdminPublicKey,
      PostHashHex,
      Multiplier,
    }
  );
}

export function AdminUpdateHotFeedUserMultiplier(
  endpoint: string,
  AdminPublicKey: string,
  Username: string,
  InteractionMultiplier: number,
  PostsMultiplier: number
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminUpdateHotFeedUserMultiplier,
    AdminPublicKey,
    {
      AdminPublicKey,
      Username,
      InteractionMultiplier,
      PostsMultiplier,
    }
  );
}

export function AdminGetHotFeedUserMultiplier(
  endpoint: string,
  AdminPublicKey: string,
  Username: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminGetHotFeedUserMultiplier,
    AdminPublicKey,
    {
      AdminPublicKey,
      Username,
    }
  );
}

export function AdminRemoveVerificationBadge(
  endpoint: string,
  AdminPublicKey: string,
  UsernameForWhomToRemoveVerification: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminRemoveVerificationBadge,
    AdminPublicKey,
    {
      AdminPublicKey,
      UsernameForWhomToRemoveVerification,
    }
  );
}

export function AdminGetUserAdminData(
  endpoint: string,
  AdminPublicKey: string,
  UserPublicKeyBase58Check: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminGetUserAdminData,
    AdminPublicKey,
    {
      AdminPublicKey,
      UserPublicKeyBase58Check,
    }
  );
}

export function NodeControl(
  endpoint: string,
  AdminPublicKey: string,
  Address: string,
  OperationType: string
): Observable<any> {
  return jwtPost(endpoint, BackendRoutes.NodeControlRoute, AdminPublicKey, {
    AdminPublicKey,
    Address,
    OperationType,
  });
}

export function UpdateMiner(
  endpoint: string,
  AdminPublicKey: string,
  MinerPublicKeys: string
): Observable<any> {
  return jwtPost(endpoint, BackendRoutes.NodeControlRoute, AdminPublicKey, {
    AdminPublicKey,
    MinerPublicKeys,
    OperationType: "update_miner",
  });
}

export function AdminGetUserGlobalMetadata(
  endpoint: string,
  AdminPublicKey: string,

  // The public key of the user for whom we'd like to get global metadata
  UserPublicKeyBase58Check: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminGetUserGlobalMetadata,
    AdminPublicKey,
    {
      AdminPublicKey,
      UserPublicKeyBase58Check,
    }
  );
}

export function AdminUpdateUserGlobalMetadata(
  endpoint: string,
  AdminPublicKey: string,

  // The public key of the user to update.
  UserPublicKeyBase58Check: string,
  Username: string,
  IsBlacklistUpdate: boolean,
  RemoveEverywhere: boolean,
  RemoveFromLeaderboard: boolean,
  IsWhitelistUpdate: boolean,
  WhitelistPosts: boolean,
  RemovePhoneNumberMetadata: boolean
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminUpdateUserGlobalMetadata,
    AdminPublicKey,
    {
      UserPublicKeyBase58Check,
      Username,
      IsBlacklistUpdate,
      RemoveEverywhere,
      RemoveFromLeaderboard,
      IsWhitelistUpdate,
      WhitelistPosts,
      RemovePhoneNumberMetadata,
      AdminPublicKey,
    }
  );
}

export function AdminGetAllUserGlobalMetadata(
  endpoint: string,
  AdminPublicKey: string,
  NumToFetch: number
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminGetAllUserGlobalMetadata,
    AdminPublicKey,
    {
      AdminPublicKey,
      NumToFetch,
    }
  );
}

export function AdminPinPost(
  endpoint: string,
  AdminPublicKey: string,
  PostHashHex: string,
  UnpinPost: boolean
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminPinPost,
    AdminPublicKey,
    {
      AdminPublicKey,
      PostHashHex,
      UnpinPost,
    }
  );
}

export function AdminUpdateGlobalFeed(
  endpoint: string,
  AdminPublicKey: string,
  PostHashHex: string,
  RemoveFromGlobalFeed: boolean
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminUpdateGlobalFeed,
    AdminPublicKey,
    {
      AdminPublicKey,
      PostHashHex,
      RemoveFromGlobalFeed,
    }
  );
}

export function AdminRemoveNilPosts(
  endpoint: string,
  AdminPublicKey: string,
  NumPostsToSearch: number = 1000
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminRemoveNilPosts,
    AdminPublicKey,
    {
      AdminPublicKey,
      NumPostsToSearch,
    }
  );
}

export function AdminReprocessBitcoinBlock(
  endpoint: string,
  AdminPublicKey: string,
  blockHashOrBlockHeight: string
): Observable<any> {
  return jwtPost(
    endpoint,
    `${BackendRoutes.ReprocessBitcoinBlockRoute}/${blockHashOrBlockHeight}`,
    AdminPublicKey,
    {
      AdminPublicKey,
    }
  );
}

export function AdminGetMempoolStats(
  endpoint: string,
  AdminPublicKey: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminGetMempoolStats,
    AdminPublicKey,
    {
      AdminPublicKey,
    }
  );
}

export function SwapIdentity(
  endpoint: string,
  UpdaterPublicKeyBase58Check: string,
  FromUsernameOrPublicKeyBase58Check: string,
  ToUsernameOrPublicKeyBase58Check: string,
  MinFeeRateNanosPerKB: number
): Observable<any> {
  const request = jwtPost(
    endpoint,
    BackendRoutes.RoutePathSwapIdentity,
    UpdaterPublicKeyBase58Check,
    {
      UpdaterPublicKeyBase58Check,
      FromUsernameOrPublicKeyBase58Check,
      ToUsernameOrPublicKeyBase58Check,
      MinFeeRateNanosPerKB,
      AdminPublicKey: UpdaterPublicKeyBase58Check,
    }
  );

  return signAndSubmitTransaction(
    endpoint,
    request,
    UpdaterPublicKeyBase58Check
  );
}

export function SetUSDCentsToDeSoReserveExchangeRate(
  endpoint: string,
  AdminPublicKey: string,
  USDCentsPerDeSo: number
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathSetUSDCentsToDeSoReserveExchangeRate,
    AdminPublicKey,
    {
      AdminPublicKey,
      USDCentsPerDeSo,
    }
  );
}

export function GetUSDCentsToDeSoReserveExchangeRate(
  endpoint: string
): Observable<any> {
  return get(
    endpoint,
    BackendRoutes.RoutePathGetUSDCentsToDeSoReserveExchangeRate
  );
}

export function SetBuyDeSoFeeBasisPoints(
  endpoint: string,
  AdminPublicKey: string,
  BuyDeSoFeeBasisPoints: number
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathSetBuyDeSoFeeBasisPoints,
    AdminPublicKey,
    {
      AdminPublicKey,
      BuyDeSoFeeBasisPoints,
    }
  );
}

export function GetBuyDeSoFeeBasisPoints(endpoint: string): Observable<any> {
  return get(endpoint, BackendRoutes.RoutePathGetBuyDeSoFeeBasisPoints);
}

export function UpdateGlobalParams(
  endpoint: string,
  UpdaterPublicKeyBase58Check: string,
  USDCentsPerBitcoin: number,
  CreateProfileFeeNanos: number,
  MinimumNetworkFeeNanosPerKB: number,
  MaxCopiesPerNFT: number,
  CreateNFTFeeNanos: number,
  MinFeeRateNanosPerKB: number
): Observable<any> {
  const request = jwtPost(
    endpoint,
    BackendRoutes.RoutePathUpdateGlobalParams,
    UpdaterPublicKeyBase58Check,
    {
      UpdaterPublicKeyBase58Check,
      USDCentsPerBitcoin,
      CreateProfileFeeNanos,
      MaxCopiesPerNFT,
      CreateNFTFeeNanos,
      MinimumNetworkFeeNanosPerKB,
      MinFeeRateNanosPerKB,
      AdminPublicKey: UpdaterPublicKeyBase58Check,
    }
  );
  return signAndSubmitTransaction(
    endpoint,
    request,
    UpdaterPublicKeyBase58Check
  );
}

export function GetGlobalParams(
  endpoint: string,
  UpdaterPublicKeyBase58Check: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetGlobalParams, {
    UpdaterPublicKeyBase58Check,
  });
}

export function AdminGetNFTDrop(
  endpoint: string,
  UpdaterPublicKeyBase58Check: string,
  DropNumber: number
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminGetNFTDrop,
    UpdaterPublicKeyBase58Check,
    {
      DropNumber,
      AdminPublicKey: UpdaterPublicKeyBase58Check,
    }
  );
}

export function AdminUpdateNFTDrop(
  endpoint: string,
  UpdaterPublicKeyBase58Check: string,
  DropNumber: number,
  DropTstampNanos: number,
  IsActive: boolean,
  NFTHashHexToAdd: string,
  NFTHashHexToRemove: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminUpdateNFTDrop,
    UpdaterPublicKeyBase58Check,
    {
      DropNumber,
      DropTstampNanos,
      IsActive,
      NFTHashHexToAdd,
      NFTHashHexToRemove,
      AdminPublicKey: UpdaterPublicKeyBase58Check,
    }
  );
}
// This and the one below are for custom supernovas backend functions
// Main difference is that they can be accessed by others than admins and nobody can delete anything
export function GetMarketplaceRefSupernovas(
  endpoint: string,
  UpdaterPublicKeyBase58Check: string,
  DropNumber: number
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathGetMarketplaceRefSupernovas,
    UpdaterPublicKeyBase58Check,
    {
      DropNumber,
      AdminPublicKey: UpdaterPublicKeyBase58Check, // Says adminpk but it does not matter
    }
  );
}

export function AddToMarketplaceSupernovas(
  endpoint: string,
  UpdaterPublicKeyBase58Check: string,
  DropNumber: number,
  DropTstampNanos: number,
  IsActive: boolean,
  NFTHashHexToAdd: string,
  NFTHashHexToRemove: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAddToMarketplaceSupernovas,
    UpdaterPublicKeyBase58Check,
    {
      DropNumber,
      DropTstampNanos,
      IsActive,
      NFTHashHexToAdd,
      NFTHashHexToRemove,
      AdminPublicKey: UpdaterPublicKeyBase58Check, // Says adminpk but it does not matter
    }
  );
}

export function EvictUnminedBitcoinTxns(
  endpoint: string,
  UpdaterPublicKeyBase58Check,
  BitcoinTxnHashes: string[],
  DryRun: boolean
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathEvictUnminedBitcoinTxns,
    UpdaterPublicKeyBase58Check,
    {
      BitcoinTxnHashes,
      DryRun,
      AdminPublicKey: UpdaterPublicKeyBase58Check,
    }
  );
}

export function GetFullTikTokURL(
  endpoint: string,
  TikTokShortVideoID: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetFullTikTokURL, {
    TikTokShortVideoID,
  }).pipe(
    map((res) => {
      return res.FullTikTokURL;
    })
  );
}

export function AdminResetJumioAttemptsForPublicKey(
  endpoint: string,
  AdminPublicKey: string,
  PublicKeyBase58Check: string,
  Username: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminResetJumioForPublicKey,
    AdminPublicKey,
    {
      AdminPublicKey,
      PublicKeyBase58Check,
      Username,
    }
  );
}

export function AdminUpdateJumioDeSo(
  endpoint: string,
  AdminPublicKey: string,
  DeSoNanos: number
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminUpdateJumioDeSo,
    AdminPublicKey,
    {
      DeSoNanos,
      AdminPublicKey,
    }
  );
}

export function AdminJumioCallback(
  endpoint: string,
  AdminPublicKey: string,
  PublicKeyBase58Check: string,
  Username: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminJumioCallback,
    AdminPublicKey,
    {
      PublicKeyBase58Check,
      Username,
      AdminPublicKey,
    }
  );
}

export function AdminCreateReferralHash(
  endpoint: string,
  AdminPublicKey: string,
  UserPublicKeyBase58Check: string,
  Username: string,
  ReferrerAmountUSDCents: number,
  RefereeAmountUSDCents: number,
  MaxReferrals: number,
  RequiresJumio: boolean
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminCreateReferralHash,
    AdminPublicKey,
    {
      UserPublicKeyBase58Check,
      Username,
      ReferrerAmountUSDCents,
      RefereeAmountUSDCents,
      MaxReferrals,
      RequiresJumio,
      AdminPublicKey,
    }
  );
}

export function AdminUpdateReferralHash(
  endpoint: string,
  AdminPublicKey: string,
  ReferralHashBase58: string,
  ReferrerAmountUSDCents: number,
  RefereeAmountUSDCents: number,
  MaxReferrals: number,
  RequiresJumio: boolean,
  IsActive: boolean
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminUpdateReferralHash,
    AdminPublicKey,
    {
      ReferralHashBase58,
      ReferrerAmountUSDCents,
      RefereeAmountUSDCents,
      MaxReferrals,
      RequiresJumio,
      IsActive,
      AdminPublicKey,
    }
  );
}

export function AdminGetAllReferralInfoForUser(
  endpoint: string,
  AdminPublicKey: string,
  UserPublicKeyBase58Check: string,
  Username: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminGetAllReferralInfoForUser,
    AdminPublicKey,
    {
      UserPublicKeyBase58Check,
      Username,
      AdminPublicKey,
    }
  );
}

export function AdminDownloadReferralCSV(
  endpoint: string,
  AdminPublicKey: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminDownloadReferralCSV,
    AdminPublicKey,
    {
      AdminPublicKey,
    }
  );
}

export function AdminUploadReferralCSV(
  endpoint: string,
  AdminPublicKey: string,
  CSVRows: Array<Array<String>>
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminUploadReferralCSV,
    AdminPublicKey,
    {
      AdminPublicKey,
      CSVRows,
    }
  );
}

export function GetReferralInfoForUser(
  endpoint: string,
  PublicKeyBase58Check: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathGetReferralInfoForUser,
    PublicKeyBase58Check,
    {
      PublicKeyBase58Check,
    }
  );
}

export function GetReferralInfoForReferralHash(
  endpoint: string,
  ReferralHash: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetReferralInfoForReferralHash, {
    ReferralHash,
  });
}

export function AdminResetTutorialStatus(
  endpoint: string,
  AdminPublicKey: string,
  PublicKeyBase58Check: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminResetTutorialStatus,
    AdminPublicKey,
    {
      PublicKeyBase58Check,
      AdminPublicKey,
    }
  );
}

export function AdminUpdateTutorialCreators(
  endpoint: string,
  AdminPublicKey: string,
  PublicKeyBase58Check: string,
  IsRemoval: boolean,
  IsWellKnown: boolean
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminUpdateTutorialCreators,
    AdminPublicKey,
    {
      PublicKeyBase58Check,
      IsRemoval,
      IsWellKnown,
      AdminPublicKey,
    }
  );
}

export function GetTutorialCreators(
  endpoint: string,
  PublicKeyBase58Check: string,
  ResponseLimit: number
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetTutorialCreators, {
    ResponseLimit,
    PublicKeyBase58Check,
  });
}

export function AdminGetTutorialCreators(
  endpoint: string,
  PublicKeyBase58Check: string,
  ResponseLimit: number
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminGetTutorialCreators,
    PublicKeyBase58Check,
    {
      ResponseLimit,
      PublicKeyBase58Check,
      AdminPublicKey: PublicKeyBase58Check,
    }
  );
}

export function GetWyreWalletOrderForPublicKey(
  endpoint: string,
  AdminPublicKeyBase58Check: string,
  PublicKeyBase58Check: string,
  Username: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathGetWyreWalletOrdersForPublicKey,
    AdminPublicKeyBase58Check,
    {
      AdminPublicKey: AdminPublicKeyBase58Check,
      PublicKeyBase58Check,
      Username,
    }
  );
}

// Wyre
export function GetWyreWalletOrderQuotation(
  endpoint: string,
  SourceAmount: number,
  Country: string,
  SourceCurrency: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetWyreWalletOrderQuotation, {
    SourceAmount,
    Country,
    SourceCurrency,
  });
}

export function GetWyreWalletOrderReservation(
  endpoint: string,
  ReferenceId: string,
  SourceAmount: number,
  Country: string,
  SourceCurrency: string
): Observable<any> {
  return post(endpoint, BackendRoutes.RoutePathGetWyreWalletOrderReservation, {
    ReferenceId,
    SourceAmount,
    Country,
    SourceCurrency,
  });
}

// Admin Node Fee Endpoints
export function AdminSetTxnFeeForTxnType(
  endpoint: string,
  AdminPublicKey: string,
  TransactionType: string,
  NewTransactionFees: TransactionFee[]
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminSetTransactionFeeForTransactionType,
    AdminPublicKey,
    {
      AdminPublicKey,
      TransactionType,
      NewTransactionFees,
    }
  );
}

export function AdminSetAllTransactionFees(
  endpoint: string,
  AdminPublicKey: string,
  NewTransactionFees: TransactionFee[]
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminSetAllTransactionFees,
    AdminPublicKey,
    {
      AdminPublicKey,
      NewTransactionFees,
    }
  );
}

export function AdminGetTransactionFeeMap(
  endpoint: string,
  AdminPublicKey: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminGetTransactionFeeMap,
    AdminPublicKey,
    {
      AdminPublicKey,
    }
  );
}

export function AdminAddExemptPublicKey(
  endpoint: string,
  AdminPublicKey: string,
  PublicKeyBase58Check: string,
  IsRemoval: boolean
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminAddExemptPublicKey,
    AdminPublicKey,
    {
      AdminPublicKey,
      PublicKeyBase58Check,
      IsRemoval,
    }
  );
}

export function AdminGetExemptPublicKeys(
  endpoint: string,
  AdminPublicKey: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathAdminGetExemptPublicKeys,
    AdminPublicKey,
    {
      AdminPublicKey,
    }
  );
}

// Tutorial Endpoints
export function StartOrSkipTutorial(
  endpoint: string,
  PublicKeyBase58Check: string,
  IsSkip: boolean
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathStartOrSkipTutorial,
    PublicKeyBase58Check,
    {
      PublicKeyBase58Check,
      IsSkip,
    }
  );
}

export function CompleteTutorial(
  endpoint: string,
  PublicKeyBase58Check: string
): Observable<any> {
  return jwtPost(
    endpoint,
    BackendRoutes.RoutePathCompleteTutorial,
    PublicKeyBase58Check,
    {
      PublicKeyBase58Check,
    }
  );
}

export function GetVideoStatus(
  endpoint: string,
  videoId: string
): Observable<any> {
  return get(endpoint, `${BackendRoutes.RoutePathGetVideoStatus}/${videoId}`);
}

// Error parsing
export function stringifyError(err): string {
  if (err && err.error && err.error.error) {
    return err.error.error;
  }

  return JSON.stringify(err);
}

export function parsePostError(err): string {
  if (err.status === 0) {
    // CHECK WORKS
    return `${process.env.NEXT_PUBLIC_name} is experiencing heavy load. Please try again in one minute.`;
  }

  let errorMessage = JSON.stringify(err);
  if (err && err.error && err.error.error) {
    errorMessage = err.error.error;
    if (errorMessage.indexOf("not sufficient") >= 0) {
      errorMessage = `Your balance is insufficient.`;
    } else if (errorMessage.indexOf("with password") >= 0) {
      errorMessage = "The password you entered was incorrect.";
    } else if (
      errorMessage.indexOf("RuleErrorExistingStakeExceedsMaxAllowed") >= 0
    ) {
      errorMessage =
        "Another staker staked to this post right before you. Please try again.";
    } else if (errorMessage.indexOf("already has stake") >= 0) {
      errorMessage = "You cannot stake to the same post more than once.";
    }
  }
  return errorMessage;
}

export function parseProfileError(err): string {
  if (err.status === 0) {
    // Check works ( node.name )
    return `${process.env.NEXT_PUBLIC_name} is experiencing heavy load. Please try again in one minute.`;
  }

  let errorMessage = JSON.stringify(err);
  if (err && err.error && err.error.error) {
    errorMessage = err.error.error;
    if (errorMessage.indexOf("not sufficient") >= 0) {
      errorMessage = `Your balance is insufficient.`;
    } else if (errorMessage.indexOf("with password") >= 0) {
      errorMessage = "The password you entered was incorrect.";
    } else if (
      errorMessage.indexOf("RuleErrorExistingStakeExceedsMaxAllowed") >= 0
    ) {
      errorMessage =
        "Another staker staked to this profile right before you. Please try again.";
    } else if (errorMessage.indexOf("already has stake") >= 0) {
      errorMessage = "You cannot stake to the same profile more than once.";
    } else if (errorMessage.indexOf("RuleErrorProfileUsernameExists") >= 0) {
      errorMessage = "Sorry, someone has already taken this username.";
    } else if (errorMessage.indexOf("RuleErrorUserDescriptionLen") >= 0) {
      errorMessage = "Your description is too long.";
    } else if (errorMessage.indexOf("RuleErrorProfileUsernameTooLong") >= 0) {
      errorMessage = "Your username is too long.";
    } else if (errorMessage.indexOf("RuleErrorInvalidUsername") >= 0) {
      errorMessage =
        "Your username contains invalid characters. Usernames can only numbers, English letters, and underscores.";
    } else if (
      errorMessage.indexOf("RuleErrorCreatorCoinTransferInsufficientCoins") >= 0
    ) {
      errorMessage =
        "You need more of your own creator coin to give a diamond of this level.";
    } else if (
      errorMessage.indexOf("RuleErrorInputSpendsPreviouslySpentOutput") >= 0
    ) {
      errorMessage =
        "You're doing that a bit too quickly. Please wait a second or two and try again.";
    } else if (
      errorMessage.indexOf(
        "RuleErrorCreatorCoinTransferBalanceEntryDoesNotExist"
      ) >= 0
    ) {
      errorMessage = "You must own this creator coin before transferring it.";
    } else if (
      errorMessage.indexOf(
        "RuleErrorCreatorCoinBuyMustTradeNonZeroDeSoAfterFounderReward"
      ) >= 0
    ) {
      errorMessage =
        "This creator has set their founder's reward to 100%. " +
        "You cannot buy creators that have set their founder's reward to 100%.";
    }
  }
  return errorMessage;
}

export function parseMessageError(err): string {
  if (err.status === 0) {
    // CHECK WORKS ( node.name )
    return `${process.env.NEXT_PUBLIC_name} is experiencing heavy load. Please try again in one minute.`;
  }

  let errorMessage = JSON.stringify(err);
  if (err && err.error && err.error.error) {
    errorMessage = err.error.error;
    if (errorMessage.indexOf("not sufficient") >= 0) {
      errorMessage = `Your balance is insufficient.`;
    } else if (errorMessage.indexOf("with password") >= 0) {
      errorMessage = "The password you entered was incorrect.";
    } else if (
      errorMessage.indexOf(
        "RuleErrorPrivateMessageSenderPublicKeyEqualsRecipientPublicKey"
      ) >= 0
    ) {
      errorMessage = `You can't message yourself.`;
    } else if (errorMessage.indexOf("Problem decoding recipient") >= 0) {
      errorMessage = `The public key you entered is invalid. Check that you copied it in correctly.`;
    }
  }
  return errorMessage;
}
