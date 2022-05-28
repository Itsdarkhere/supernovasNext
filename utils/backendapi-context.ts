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
