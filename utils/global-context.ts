import { Observable, Observer } from "rxjs";
import {
  User,
  PostEntryResponse,
  RouteNames,
  TutorialStatus,
} from "./backendapi-context";
import { LoggedInUserObservableResult } from "./observable-results/logged-in-user-observable-result";
import { track68, identify1, peopleset } from "./mixpanel";
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
  GetExchangeRate,
  ResendVerifyEmail,
  StartOrSkipTutorial,
  GetJumioStatusForPublicKey,
  SortETHMarketplace,
  GetSinglePost,
  GetReferralInfoForUser,
} from "./backendapi-context";
import ConfettiGenerator from "confetti-js";
import Swal from "sweetalert2";
import Timer = NodeJS.Timer;
import { Link, ImmutableXClient } from "@imtbl/imx-sdk";
import { SwalHelper } from "./helpers/swal-helper";
import { launch } from "./identity-context";
import store from "./Redux/store";
// Redux
import { useAppSelector, useAppDispatch } from "./Redux/hooks";
// Actions
import { setIsLeftBarMobileOpen } from "./Redux/Slices/openSlice";
import {
  setIsCollector,
  setIsCreator,
  setIsNullUsername,
  setIsOnBoardingComplete,
  setIsVerified,
  setNeedToPickCreatorOrCollector,
  setUsername,
  setYouHodlMap,
} from "./Redux/Slices/userSlice";
import {
  setMessageNotificationCount,
  setMessageRequestsFollowedOnly,
  setMessageResponse,
  setMessagesRequestsFollowersOnly,
  setMessagesRequestsHoldersOnly,
  setMessagesRequestsHoldingsOnly,
  setMessagesSortAlgorithm,
  setNewMessagesFromPage,
} from "./Redux/Slices/messagesSlice";
import {
  setLoggedInUserReferralInfoResponses,
  setLoggedInUserState,
  setUserList,
} from "./Redux/Slices/loggedInSlice";
import {
  setDesoToUSDExchangeRateToDisplay,
  setExchangeUSDCentsPerDeSo,
  setLatestBitcoinAPIResponse,
  setNanosPerETHExchangeRate,
  setNanosPerUSDExchangeRate,
  setProtocolUSDCentsPerBitcoinExchangeRate,
  setSatoshisPerDeSoExchangeRate,
  setUSDCentsPerDeSoReservePrice,
  setUSDPerBitcoinExchangeRate,
  setUSDPerETHExchangeRate,
} from "./Redux/Slices/exhangeRatesSlice";
import { setFollowFeedPosts } from "./Redux/Slices/feedSlice";
import {
  setCanvasCount,
  setConfetti,
  setNanosSold,
} from "./Redux/Slices/otherSlice";
import { setLocalNode } from "./Redux/Slices/nodeSlice";
import { setBuyDeSoFeeBasisPoints } from "./Redux/Slices/feesSlice";
import {
  pushToETHMarketplaceNFTsData,
  setETHMarketplaceNFTsData,
  setETHMarketplaceNFTsDataToShow,
  setIsMarketplaceLoading,
} from "./Redux/Slices/marketplaceSlice";
import { setMarketplaceSortType } from "./Redux/Slices/sortSlice";
import {
  concatToCollectedNFTsToShow,
  concatToCreatedNFTsToShow,
  concatToETHNFTsCollected,
  setETHNFTsCollected,
  setETHNFTsCreated,
} from "./Redux/Slices/profileSlice";
import { setIMXClient } from "./Redux/Slices/imxSlice";
import { FollowChangeObservableResult } from "./observable-results/follow-change-observable-result";
// Redux end

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

export const NANOS_PER_UNIT = 1e9;
export const WEI_PER_ETH = 1e18;
export const MAX_POST_LENGTH = 560;
export const FOUNDER_REWARD_BASIS_POINTS_WARNING_THRESHOLD = 50 * 100;
export const DEFAULT_NANOS_PER_USD_EXCHANGE_RATE = 1e9;
export const CREATOR_COIN_RESERVE_RATIO = 0.3333333;
export const CREATOR_COIN_TRADE_FEED_BASIS_POINTS = 1;
// No idea to what extent these stay in state
let formatUSDMemo = {};
// No idea to what extent these stay in state
let nanosToDeSoMemo = {};
const routeNames = RouteNames;

// No idea to what extent these stay in state
let loggedInUserObservable: Observable<LoggedInUserObservableResult>;
let loggedInUserObservers = [] as Observer<LoggedInUserObservableResult>[];

// No idea to what extent these stay in state
let followChangeObservable: Observable<FollowChangeObservableResult>;
let followChangeObservers = [] as Observer<FollowChangeObservableResult>[];

const emailRegExp =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const emailRegExTest =
  /(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*:(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)(?:,\s*(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*))*)?;\s*)/;

// How many unread notifications the user has
export let unreadNotifications: number = 0;

export async function iterateAndSetUserList(toSet: User, loggedIn: any) {
  // Redux
  let tempUserList = store.getState().loggedIn.userList;

  let loggedInUserFound = false;
  tempUserList.forEach((user, index) => {
    if (user.PublicKeyBase58Check === toSet.PublicKeyBase58Check) {
      loggedInUserFound = true;
      tempUserList[index] = toSet;
      // This breaks out of the lodash foreach.
    }
  });
  // If the logged-in user wasn't in the list, add it to the list.
  if (!loggedInUserFound && loggedIn) {
    console.log(toSet);
    console.log(tempUserList);
    // tempUserList.push(toSet);
    tempUserList = tempUserList.concat(...tempUserList, toSet);
  }
  // Update userList in state
  store.dispatch(setUserList(tempUserList));
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
  const dispatch = useAppDispatch();
  dispatch(setIsLeftBarMobileOpen(false));
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
  const dispatch = useAppDispatch();
  dispatch(setIsLeftBarMobileOpen(false));
}

export function checkIsVerified() {
  // Redux
  const loggedInUser = store.getState().loggedIn.loggedInUser;

  const isVerifiedRes = JSON.stringify(loggedInUser?.ProfileEntryResponse);
  if (isVerifiedRes === "null") {
    store.dispatch(setIsVerified(false));
  } else {
    const isVerifiedStrBool = JSON.stringify(
      loggedInUser?.ProfileEntryResponse["IsVerified"]
    );
    if (isVerifiedStrBool === "true") {
      store.dispatch(setIsVerified(true));
    } else {
      store.dispatch(setIsVerified(false));
    }
  }
  // console.log(` ------------------------------------ isVerified status is ${this.isVerified} ------------------- `);
}

export function checkNullUsername() {
  // Redux
  const loggedInUser = store.getState().loggedIn.loggedInUser;

  const isNullUsernameRes = JSON.stringify(loggedInUser?.ProfileEntryResponse);

  if (isNullUsernameRes === "null") {
    // comment/uncomment line below out for testing
    store.dispatch(setIsNullUsername(true));
  } else {
    let tempUsername = JSON.stringify(
      loggedInUser?.ProfileEntryResponse["Username"]
    );
    tempUsername = tempUsername.replace(/['"]+/g, "");
    store.dispatch(setUsername(tempUsername));
    if (tempUsername) {
      store.dispatch(setIsNullUsername(false));
    } else {
      // comment line below out for testing
      store.dispatch(setIsNullUsername(true));
    }
  }
}

export function checkOnboardingCompleted() {
  // Redux
  const isCreator = store.getState().user.isCreator;
  const isCollector = store.getState().user.isCollector;
  const isNullUsername = store.getState().user.isNullUsername;
  //   if they are a creator, have a profile (username) and are verified then onboarding is complete
  if (isCreator === true && isNullUsername === false) {
    store.dispatch(setNeedToPickCreatorOrCollector(false));
    store.dispatch(setIsOnBoardingComplete(true));
  }
  // if they are a collector and have a profile (username) then onboarding is complete
  else if (isCollector === true && isNullUsername === false) {
    store.dispatch(setNeedToPickCreatorOrCollector(false));
    store.dispatch(setIsOnBoardingComplete(true));
  } else {
    store.dispatch(setNeedToPickCreatorOrCollector(true));
    store.dispatch(setIsOnBoardingComplete(false));
  }
}

export async function checkOnboardingStatus(): Promise<void> {
  // Redux
  const localNode = store.getState().node.localNode;
  const loggedInUser = store.getState().loggedIn.loggedInUser;
  const isOnboardingComplete = store.getState().user.isOnboardingComplete;
  // Redux end
  const publicKey = loggedInUser?.PublicKeyBase58Check;

  if (publicKey) {
    GetCollectorOrCreator(localNode, publicKey).subscribe(
      (res) => {
        store.dispatch(setIsCollector(res["Collector"]));
        store.dispatch(setIsCreator(res["Creator"]));

        //   update checkNullUsername
        checkNullUsername();

        //   update onboardingcomplete status
        checkOnboardingCompleted();

        track68("Onboarding Complete?", {
          "Onboarding complete?": isOnboardingComplete,
        });
      },
      (err) => {
        console.log(err);
        store.dispatch(setIsCollector(false));
        store.dispatch(setIsCreator(false));
      }
    );
  }
}
//   ------------------------------------ end of update globalVars for loggedInUser ------------------------------------

export function SetupMessages() {
  // Redux
  const loggedInUser = store.getState().loggedIn.loggedInUser;
  const messageResponse = store.getState().messages.messageResponse;
  // Redux end

  // If there's no loggedInUser, we set the notification count to zero
  if (!loggedInUser) {
    store.dispatch(setMessageNotificationCount(0));
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
  // Redux
  const loggedInUser = store.getState().loggedIn.loggedInUser;
  const localNode = store.getState().node.localNode;
  // Redux end
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
    store.dispatch(setMessagesRequestsHoldersOnly(tabName === "My holders"));
    store.dispatch(setMessagesRequestsHoldingsOnly(false));
    store.dispatch(setMessagesRequestsFollowersOnly(false));
    store.dispatch(setMessageRequestsFollowedOnly(false));
    store.dispatch(setMessagesSortAlgorithm("time"));
  } else {
    store.dispatch(
      setMessagesRequestsHoldersOnly(
        GetStorage("customMessagesRequestsHoldersOnly")
      )
    );
    store.dispatch(
      setMessagesRequestsHoldingsOnly(
        GetStorage("customMessagesRequestsHoldingsOnly")
      )
    );
    store.dispatch(
      setMessagesRequestsFollowersOnly(
        GetStorage("customMessagesRequestsFollowersOnly")
      )
    );
    store.dispatch(
      setMessageRequestsFollowedOnly(
        GetStorage("customMessagesRequestsFollowedOnly")
      )
    );
    store.dispatch(
      setMessagesSortAlgorithm(GetStorage("customMessagesSortAlgorithm"))
    );
  }
}

export function LoadInitialMessages() {
  // Redux ,,, wonder if we can move this to the slice ,,, prolly should
  const loggedInUser = store.getState().loggedIn.loggedInUser;
  const localNode = store.getState().node.localNode;
  const messagesPerFetch = store.getState().messages.messagesPerFetch;
  const messagesRequestsHoldersOnly =
    store.getState().messages.messagesRequestsHoldersOnly;
  const messagesRequestsHoldingsOnly =
    store.getState().messages.messagesRequestsHoldingsOnly;
  const messagesRequestsFollowersOnly =
    store.getState().messages.messagesRequestsFollowersOnly;
  const messagesRequestsFollowedOnly =
    store.getState().messages.messagesRequestsFollowedOnly;
  const messagesSortAlgorithm = store.getState().messages.messagesSortAlgorithm;
  const pauseMessageUpdates = store.getState().messages.pauseMessageUpdates;
  // Redux end
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
        // Redux
        const dispatch = useAppDispatch();
        dispatch(setMessageResponse(res));

        // Update the number of new messages so we know when to stop scrolling
        dispatch(
          setNewMessagesFromPage(res.OrderedContactsWithMessages.length)
        );
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
  // Redux
  const loggedInUserObservers = store.getState().loggedIn.loggedInUserObservers;
  // Redux end
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
  console.log("---SET LOGGED IN----");
  // Redux
  const loggedInUser = store.getState().loggedIn.loggedInUser;
  const localNode = store.getState().node.localNode;
  const youHodlMap = store.getState().user.youHodlMap;
  // Redux end
  const isSameUserAsBefore =
    loggedInUser &&
    user &&
    loggedInUser.PublicKeyBase58Check === user.PublicKeyBase58Check;

  let tempLoggedInUser = user;
  store.dispatch(setLoggedInUserState(user));

  if (tempLoggedInUser) {
    // Fetch referralLinks for the userList before completing the load.

    GetReferralInfoForUser(
      localNode,
      tempLoggedInUser?.PublicKeyBase58Check
    ).subscribe(
      (res: any) => {
        store.dispatch(
          setLoggedInUserReferralInfoResponses(res.ReferralInfoResponses)
        );
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
    store.dispatch(setMessageResponse(null));
    store.dispatch(setLatestBitcoinAPIResponse(null));

    // Fix the youHodl / hodlYou maps.
    let tempYouHodlMap = JSON.parse(JSON.stringify(youHodlMap));
    for (const entry of tempLoggedInUser?.UsersYouHODL || []) {
      tempYouHodlMap[entry.CreatorPublicKeyBase58Check] = entry;
    }
    store.dispatch(setYouHodlMap(tempYouHodlMap));
    store.dispatch(setFollowFeedPosts([]));
  }

  _notifyLoggedInUserObservers(user, isSameUserAsBefore);
  trackLoggedInUser();
}

export function trackLoggedInUser() {
  // Redux
  const loggedInUser = store.getState().loggedIn.loggedInUser;
  // Redux end
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
  // Redux
  const loggedInUser = store.getState().loggedIn.loggedInUser;
  // Redux end
  return (
    loggedInUser?.BlockedPubKeys &&
    publicKeyBase58Check in loggedInUser?.BlockedPubKeys
  );
}

export function showAdminTools(): boolean {
  // Redux
  const loggedInUser = store.getState().loggedIn.loggedInUser;
  // Redux end
  return loggedInUser?.IsAdmin || loggedInUser?.IsSuperAdmin;
}

export function showSuperAdminTools(): boolean {
  // Redux
  const loggedInUser = store.getState().loggedIn.loggedInUser;
  // Redux end
  return loggedInUser?.IsSuperAdmin;
}

export function networkName(): string {
  // Redux
  const isTestnet = store.getState().node.isTestnet;
  // Redux end
  return isTestnet ? "testnet" : "mainnet";
}

export function getUSDForDiamond(index: number): string {
  // Redux
  const diamondLevelMap = store.getState().user.diamondLevelMap;
  // Redux end
  const desoNanos = diamondLevelMap[index];
  const val = nanosToUSDNumber(desoNanos);
  console.log("HERE --- 7");
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
  decimals?: number,
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
    console.log("HERE --- 1");
    shortValue = formatUSD(shortValue, decimals);
  }
  return shortValue + suffixes[suffixNum];
}

export function abbreviateRepostsNumber(
  value1: number,
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
    console.log("HERE --- 2");
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
    console.log("HERE --- 3");
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
  return nanos / store.getState().exhange.nanosPerUSDExchangeRate;
}

export function usdToNanosNumber(usdAmount: number): number {
  return usdAmount * store.getState().exhange.nanosPerUSDExchangeRate;
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
  console.log("HERE --- 4");
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
  console.log("HERE --- 5");
  return abbreviate
    ? abbreviateNumber(usdValue, 2, true)
    : formatUSD(usdValue, 2);
}

export function createProfileFeeInDeSo(): number {
  // Redux
  const createProfileFeeNanos = useAppSelector(
    (state) => state.exhange.createProfileFeeNanos
  );
  // Redux end
  return createProfileFeeNanos / 1e9;
}

export function createProfileFeeInUsd(): string {
  // Redux
  const createProfileFeeNanos = useAppSelector(
    (state) => state.exhange.createProfileFeeNanos
  );
  // Redux end
  console.log("THIS --- 1");
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
  // Redux
  const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  // Redux end
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
  // Redux
  const userList = useAppSelector((state) => state.loggedIn.userList);
  // Redux end
  return userList && userList.length === 0;
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
    // FIX NAVIGATE
    // let navigate = GetNav();
    if (showBuyDeSo && res.isConfirmed) {
      // CHECK WORKS,,, same for all these
      // navigate(routeNames.BUY_DESO, {
      //   replace: false,
      // });
    }
    if (showBuyCreatorCoin && res.isConfirmed) {
      // navigate(routeNames.CREATORS);
    }
  });
}

export function celebrate(svgList: ConfettiSvg[] = []) {
  // Redux
  const canvasCount = useAppSelector((state) => state.other.canvasCount);
  const confetti = useAppSelector((state) => state.other.confetti);
  const dispatch = useAppDispatch();

  const canvasID = "my-canvas-" + canvasCount;
  let tempCanvasCount = canvasCount + 1;
  dispatch(setCanvasCount(tempCanvasCount % 5));

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
  dispatch(setConfetti(new ConfettiGenerator(confettiSettings)));
  confetti.render();
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
  // Redux
  const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  const updateEverything = useAppSelector(
    (state) => state.other.updateEverything
  );
  // Redux
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
      const updateEverything = useAppSelector(
        (state) => state.other.updateEverything
      );
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
  // FIX NAVIGATE
  // let navigate = GetNav();
  if (signedUp) {
    // If this node supports phone number verification, go to step 3, else proceed to step 4.
    const stepNum = 2;
    // Check works,,, previous had '/' before routename
    // Also check it works idk about the search...
    // navigate({
    //   pathname: routeNames.SIGNUP,
    //   search: "?stepNum=" + stepNum,
    // });
  } else {
    //   this.checkOnboardingStatus();
    // Check works,,, previous had '/' before routename
    // navigate(routeNames.BROWSE);
  }
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
  const localNode = store.getState().node.localNode;
  GetExchangeRate(localNode).subscribe({
    next: (res) => {
      // BTC
      store.dispatch(
        setSatoshisPerDeSoExchangeRate(res.data.SatoshisPerDeSoExchangeRate)
      );
      store.dispatch(
        setProtocolUSDCentsPerBitcoinExchangeRate(
          res.data.USDCentsPerBitcoinExchangeRate
        )
      );
      store.dispatch(
        setUSDPerBitcoinExchangeRate(
          res.data.USDCentsPerBitcoinExchangeRate / 100
        )
      );

      // ETH
      store.dispatch(
        setUSDPerETHExchangeRate(res.data.USDCentsPerETHExchangeRate / 100)
      );
      store.dispatch(
        setNanosPerETHExchangeRate(res.data.NanosPerETHExchangeRate)
      );

      // DESO
      store.dispatch(setNanosSold(res.data.NanosSold));
      store.dispatch(
        setExchangeUSDCentsPerDeSo(res.data.USDCentsPerDeSoExchangeRate)
      );
      store.dispatch(
        setUSDCentsPerDeSoReservePrice(
          res.data.USDCentsPerDeSoReserveExchangeRate
        )
      );
      store.dispatch(setBuyDeSoFeeBasisPoints(res.data.BuyDeSoFeeBasisPoints));

      store.dispatch(
        setNanosPerUSDExchangeRate(
          NANOS_PER_UNIT / (res.data.USDCentsPerDeSoExchangeRate / 100)
        )
      );
      store.dispatch(
        setDesoToUSDExchangeRateToDisplay(nanosToUSD(NANOS_PER_UNIT, 2))
      );
    },
    error: (err) => console.log(err),
  });
}

let resentVerifyEmail = false;
export function resendVerifyEmail() {
  // Redux
  const localNode = useAppSelector((state) => state.node.localNode);
  const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  // Redux end
  ResendVerifyEmail(localNode, loggedInUser.PublicKeyBase58Check);
  resentVerifyEmail = true;
}

export function startTutorialAlert(): void {
  // Redux
  const localNode = useAppSelector((state) => state.node.localNode);
  const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  // Redux end
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
  // Redux
  const localNode = useAppSelector((state) => state.node.localNode);
  const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  // Redux end
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
          // FIX NAVIGATE
          // let navigate = GetNav();
          // Auto update logged in user's tutorial status - we don't need to fetch it via get users stateless right now.
          loggedInUser.TutorialStatus = TutorialStatus.SKIPPED;
          // navigate(routeNames.BROWSE);
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
            // Redux ,,, perhaps we could just write this as a reducer, ill ponder on it
            let tempUserList = useAppSelector(
              (state) => state.loggedIn.userList
            );
            tempUserList.forEach((userInList, idx) => {
              if (userInList.PublicKeyBase58Check === publicKey) {
                tempUserList[idx].JumioVerified = res.JumioVerified;
                tempUserList[idx].JumioReturned = res.JumioReturned;
                tempUserList[idx].JumioFinishedTime = res.JumioFinishedTime;
                tempUserList[idx].BalanceNanos = res.BalanceNanos;
                tempUserList[idx].MustCompleteTutorial = true;
                user = tempUserList[idx];
              }
            });
            // More redux
            const dispatch = useAppDispatch();
            dispatch(setUserList(tempUserList));
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
  // Redux
  const referralUSDCents = useAppSelector(
    (state) => state.other.referralUSDCents
  );
  const jumioDeSoNanos = useAppSelector((state) => state.other.jumioDeSoNanos);
  // Redux end
  console.log("HERE --- 6");
  return referralUSDCents
    ? formatUSD(referralUSDCents / 100, 0)
    : nanosToUSD(jumioDeSoNanos, 0);
}

//   ----------------- start of eth/imx functions -----------------
let counter = 0;

export function getPostsRecursive(metadataPostHashArr) {
  getPost(true, metadataPostHashArr[counter]).subscribe(
    (res) => {
      counter++;
      const dispatch = useAppDispatch();
      dispatch(pushToETHMarketplaceNFTsData(res["PostFound"]));

      if (counter < metadataPostHashArr.length) {
        getPostsRecursive(metadataPostHashArr);
      } else {
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
  // Redux
  const ethMarketplaceNFTCategory = useAppSelector(
    (state) => state.sort.ethMarketplaceNFTCategory
  );
  const dispatch = useAppDispatch();
  // Redux end
  dispatch(setIsMarketplaceLoading(true));
  dispatch(setETHMarketplaceNFTsData([]));

  const options = { method: "GET", headers: { Accept: "*/*" } };

  let res = await fetch(
    `${process.env.NEXT_PUBLIC_MAINNET_ENV_URL}/orders?order_by=buy_quantity&direction=desc&status=active&sell_token_address=${process.env.NEXT_PUBLIC_TOKEN_ADDRESS}`,
    options
  );
  let resJson = await res.json();
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
    dispatch(setIsMarketplaceLoading(false));
  }, 2000);
}

//   for sale ETH nfts - lowest price first
export async function sortEthMarketplaceLowestPriceFirst() {
  // Redux
  const dispatch = useAppDispatch();
  dispatch(setIsMarketplaceLoading(true));
  dispatch(setETHMarketplaceNFTsData([]));
  const ethMarketplaceNFTCategory = useAppSelector(
    (state) => state.sort.ethMarketplaceNFTCategory
  );

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
    dispatch(setIsMarketplaceLoading(false));
  }, 2000);
}

//   get all ETH nfts
export async function getAllEthNFTs() {
  // Redux
  const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  const localNode = useAppSelector((state) => state.node.localNode);
  const marketplaceSortType = useAppSelector(
    (state) => state.sort.marketplaceSortType
  );
  const ethMarketplaceNFTCategory = useAppSelector(
    (state) => state.sort.ethMarketplaceNFTCategory
  );
  const ethMarketplaceVerifiedCreators = useAppSelector(
    (state) => state.sort.ethMarketplaceVerifiedCreators
  );
  const dispatch = useAppDispatch();
  dispatch(setIsMarketplaceLoading(true));
  dispatch(setETHMarketplaceNFTsData([]));

  // highest price and lowest price are not available on ethereum
  if (
    marketplaceSortType === "highest price first" ||
    marketplaceSortType === "lowest price first"
  ) {
    dispatch(setMarketplaceSortType("most recent first"));
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
      updateDataToShow();
      dispatch(setETHMarketplaceNFTsData(res["PostEntryResponse"]));
      dispatch(setIsMarketplaceLoading(false));
    },
    (err) => {
      console.log(err);
    }
  );
}

//   get all ETH nfts by filter
// This is terrible ,,, rewrite
export async function getEthNFTsByFilter() {
  // Redux
  const ethMarketplaceStatus = useAppSelector(
    (state) => state.sort.ethMarketplaceStatus
  );
  const marketplaceSortType = useAppSelector(
    (state) => state.sort.marketplaceSortType
  );
  const ethMarketplaceNFTCategory = useAppSelector(
    (state) => state.sort.ethMarketplaceNFTCategory
  );
  const ethMarketplaceVerifiedCreators = useAppSelector(
    (state) => state.sort.ethMarketplaceVerifiedCreators
  );
  const localNode = useAppSelector((state) => state.node.localNode);
  const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  const dispatch = useAppDispatch();
  dispatch(setIsMarketplaceLoading(true));
  dispatch(setETHMarketplaceNFTsData([]));

  // highest price and lowest price are not available on ethereum
  if (
    marketplaceSortType === "highest price first" ||
    marketplaceSortType === "lowest price first"
  ) {
    setMarketplaceSortType("most recent first");
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
    } catch (err) {
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
      updateDataToShow();
      dispatch(setETHMarketplaceNFTsData(res["PostEntryResponse"]));
      dispatch(setIsMarketplaceLoading(false));
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
  // Redux
  const dispatch = useAppDispatch();
  const ethMarketplaceNFTsData = useAppSelector(
    (state) => state.marketplace.ethMarketplaceNFTsData
  );
  dispatch(
    setETHMarketplaceNFTsDataToShow(ethMarketplaceNFTsData.slice(0, 30))
  );
}

export function getPost(fetchParents: boolean = true, nftPostHashHex: string) {
  // Redux
  const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  const localNode = useAppSelector((state) => state.node.localNode);
  // Redux end

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
      getCollectedNFTsCounter++;
      const dispatch = useAppDispatch();
      dispatch(concatToETHNFTsCollected(res["PostFound"]));
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
  // Redux
  const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  const localNode = useAppSelector((state) => state.node.localNode);
  const imxWalletAddress = useAppSelector(
    (state) => state.imx.imxWalletAddress
  );
  const dispatch = useAppDispatch();

  dispatch(setETHNFTsCollected([]));

  const publicApiUrl: string = process.env.NEXT_PUBLIC_MAINNET_ENV_URL ?? "";
  const tempIMXClient = await ImmutableXClient.build({ publicApiUrl });
  dispatch(setIMXClient(tempIMXClient));

  let collectedNFTs = await tempIMXClient.getAssets({
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
      const dispatch = useAppDispatch();
      dispatch(setETHNFTsCollected(res["PostEntryResponse"]));
      const tempETHNFTsCollected = res["PostEntryResponse"];
      let temp = [];
      tempETHNFTsCollected.forEach((post) => {
        temp.push({
          PostEntryResponse: post,
          NFTEntryResponses: [],
        });
      });
      dispatch(concatToCollectedNFTsToShow(temp));
      // Put back
      // collectedNFTsToShow.sort(
      //   (a, b) =>
      //     b.PostEntryResponse.TimestampNanos -
      //     a.PostEntryResponse.TimestampNanos
      // );
    },
    (err) => {
      console.log(err);
    }
  );
}

//   get created eth NFTs for logged in wallet
export async function getCreatedNFTs() {
  // Redux
  const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  const localNode = useAppSelector((state) => state.node.localNode);
  const imxWalletAddress = useAppSelector(
    (state) => state.imx.imxWalletAddress
  );
  const dispatch = useAppDispatch();

  dispatch(setETHNFTsCreated([]));

  const publicApiUrl: string = process.env.NEXT_PUBLIC_MAINNET_ENV_URL ?? "";
  const tempIMXClient = await ImmutableXClient.build({ publicApiUrl });
  dispatch(setIMXClient(tempIMXClient));

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
      let ethNFTsCreated = res["PostEntryResponse"];
      dispatch(setETHNFTsCreated(res["PostEntryResponse"]));
      dispatch(concatToCreatedNFTsToShow(ethNFTsCreated));
      // Put back
      // createdNFTsToShow.sort((a, b) => b.TimestampNanos - a.TimestampNanos);
    },
    (err) => {
      console.log(err);
    }
  );
}
//   ----------------- end of eth/imx functions -----------------
