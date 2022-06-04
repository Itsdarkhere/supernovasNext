import { useEffect } from "react";
import "../styles/globals.scss";
import { Observable, Subscription } from "rxjs";
import * as _ from "lodash";
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
  GetReferralInfoForReferralHash, 
  LastIdentityServiceKey, 
  LastLocalNodeKey, 
  User
} from "../utils/backendapi-context";
import {
  identityServicePublicKeyAdded,
  identityServiceUsers,
  setIdentityServicePKAddedVariable,
  setIdentityServiceUsersVariable,
  info,
  storageGranted,
  setIdentityServiceURL,
  setSanitizedIdentityServiceURL,
} from "../utils/identity-context";
import {
  setLoggedInUser,
  checkOnboardingStatus,
  SetupMessages,
  GetUnreadNotifications,
  _updateDeSoExchangeRate,
  nanosToUSD,
  iterateAndSetUserList,
} from "../utils/global-context";
// Redux
import { Provider } from "react-redux";
import store from "../utils/Redux/store";
import { useAppSelector, useAppDispatch } from "../utils/Redux/hooks";
import { setBuyETHAddress, setJumioDeSoNanos, setMinSatoshisBurnedForProfileCreation, 
  setReferralUSDCents, 
  setUpdateEverything } from "../utils/Redux/Slices/otherSlice";
import { setGloboMods, setLoadingInitialAppState, setRequestedStorageAccess, 
  setRequestingStorageAccess, setShowBuyWithETH, setShowBuyWithUSD, setShowJumio, 
  setShowPhoneNumberVerification } from "../utils/Redux/Slices/appSlice";
import { pushToLoggedInUserObservers, setLoggedInUserObservable, setUserList } from "../utils/Redux/Slices/loggedInSlice";
import { setMessageMeta } from "../utils/Redux/Slices/messagesSlice";
import { setDefaultFeeRateNanosPerKB, setFeeRateDeSoPerKB, setTransactionFeeInfo, setTransactionFeeMap, 
  setTransactionFeeMax } from "../utils/Redux/Slices/feesSlice";
import { createYouHodlMap, setDiamondLevelMap } from "../utils/Redux/Slices/userSlice";
import { setIsCompProfileCreation, setIsTestnetGlob, setLocalNode, setNodes } from "../utils/Redux/Slices/nodeSlice";
import { pushToFollowChangeObservers, setFollowChangeObservable } from "../utils/Redux/Slices/followsSlice";
import { setNanosPerUSDExchangeRate, setSatoshisPerDeSoExchangeRate, setUSDPerBitcoinExchangeRate } 
from "../utils/Redux/Slices/exhangeRatesSlice";
// Redux end

// Dispatch wont work without being wrapped inside a <Provider> so...
function AppWrapper({children}) {
  // Redux
  const dispatch = useAppDispatch();

  let showUsernameTooltip = false;
  let desoToUSDExchangeRateToDisplay = "fetching...";
  // Throttle the calls to update the top-level data so they only happen after a
  // previous call has finished.
  let callingUpdateTopLevelData = false;
  let problemWithNodeConnection = false;
  let callingUpdateNodeInfo = false;

  // Redux
  const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  const localNode = useAppSelector((state) => state.node.localNode);
  const DEFAULT_NANOS_PER_USD_EXCHANGE_RATE = useAppSelector((state) => state.exhange.DEFAULT_NANOS_PER_USD_EXCHANGE_RATE)
  const userList = useAppSelector((state) => state.loggedIn.userList);
  const updateEverything = useAppSelector((state) => state.other.updateEverything);


  const Init = () => {
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
    dispatch(setSatoshisPerDeSoExchangeRate(0))
    dispatch(setNanosPerUSDExchangeRate(DEFAULT_NANOS_PER_USD_EXCHANGE_RATE))
    dispatch(setUSDPerBitcoinExchangeRate(10000))
    // Set temp vars for state that needs to be done comparisons on
    const tempDefaultFeeRateNanosPerKB = 1000.0;
    let tempLocalNode = GetStorage(LastLocalNodeKey);
    // Also set them to state
    dispatch(setDefaultFeeRateNanosPerKB(1000.0));
    dispatch(setLocalNode(GetStorage(LastLocalNodeKey)));
  
    if (!tempLocalNode) {
      const hostname = (window as any).location.hostname;
      if (process.env.NEXT_PUBLIC_production) {
        dispatch(setLocalNode(hostname))
        tempLocalNode = hostname;
      } else {
        dispatch(setLocalNode(`${hostname}:17001`))
        tempLocalNode = `${hostname}:17001`
      }
  
      SetStorage(LastLocalNodeKey, tempLocalNode);
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
      if (!tempDefaultFeeRateNanosPerKB) {
        return false;
      }
      dispatch(setFeeRateDeSoPerKB(tempDefaultFeeRateNanosPerKB / 1e9))
      return true;
    });
  }

  const _setUpLoggedInUserObservable = () => {
    dispatch(setLoggedInUserObservable(new Observable((observer) => {
      dispatch(pushToLoggedInUserObservers(observer));
    })))
 }
 
 const _setUpFollowChangeObservable = () => {
    dispatch(setFollowChangeObservable(new Observable((observer) => {
      dispatch(pushToFollowChangeObservers(observer))
    })))
 }


  useEffect(() => {
    // Init app
    Init();

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
      updateDeSoExchangeRate();
    }, 5 * 60 * 1000);

    // Check works,,, its missing this.
    dispatch(setUpdateEverything(_updateEverything));

    // We need to fetch this data before we start an import. Can remove once import code is gone.
    updateDeSoExchangeRate();
    _updateAppState();
    info().subscribe((res) => {
      // If the browser is not supported, display the browser not supported screen.
      if (!res.browserSupported) {
        dispatch(setRequestingStorageAccess(true));
        dispatch(setRequestedStorageAccess(true));
        return;
      }
      const isLoggedIn = GetStorage(LastLoggedInUserKey);
      if (res.hasStorageAccess || !isLoggedIn) {
        loadApp();
      } else {
        dispatch(setRequestingStorageAccess(true));
        storageGranted.subscribe(() => {
          dispatch(setRequestingStorageAccess(false));
          dispatch(setRequestedStorageAccess(true));
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

  const getReferralUSDCents = (): void => {
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
          dispatch(setReferralUSDCents(referralInfo.RefereeAmountUSDCents));
        }
      });
    }
  }

  const _globopoll = (passedFunc: any, expirationSecs?: any) => {
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


  function _updateAppState() {
    GetAppState(localNode, loggedInUser?.PublicKeyBase58Check).subscribe(
      (res: any) => {
        dispatch(setMinSatoshisBurnedForProfileCreation(res.data.MinSatoshisBurnedForProfileCreation))
        dispatch(setDiamondLevelMap(res.data.DiamondLevelMap))
        dispatch(setShowBuyWithUSD(res.data.HasWyreIntegration))
        dispatch(setShowBuyWithETH(res.data.BuyWithETH))
        dispatch(setShowJumio(res.data.HasJumioIntegration))
        dispatch(setJumioDeSoNanos(res.data.JumioDeSoNanos))
        dispatch(setIsTestnetGlob(res.data.IsTestnet))
        // FIX NOW
        // dispatch(setIsTestNet(res.data.IsTestnet))
        dispatch(setShowPhoneNumberVerification(
          res.data.HasTwilioAPIKey && res.data.HasStarterDeSoSeed
        ));
        // showPhoneNumberVerification && res.data.CompProfileCreation CODE REMOVAL
        dispatch(setIsCompProfileCreation(false));
        dispatch(setBuyETHAddress(res.data.BuyETHAddress))
        dispatch(setNodes(res.data.Nodes))
        dispatch(setTransactionFeeMap(res.data.TransactionFeeMap))


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
        dispatch(setTransactionFeeMax(Math.max(...simpleFeeMap?.map((k) => k?.fees))));

        //Prepare text detailed info of fees and join with newlines
        dispatch(setTransactionFeeInfo(simpleFeeMap
          ?.map((k) => `${k?.txnType}: ${nanosToUSD(k?.fees, 4)}`)
          .join("\n")));
      }
    );
  }

  const _updateEverything = (
    waitTxn: string = "",
    successCallback: (comp: any) => void = () => {},
    errorCallback: (comp: any) => void = () => {},
    comp: any = ""
  ) => {
    // Redux
    const pausePolling = useAppSelector((state) => state.app.pausePolling);

    // Refresh the messageMeta periodically.
    dispatch(setMessageMeta(GetStorage(MessageMetaKey)));
    let tempMessageMeta = GetStorage(MessageMetaKey);

    if (!tempMessageMeta) {
      dispatch(setMessageMeta({
        decryptedMessgesMap: {},
        notificationMap: {},
      }))
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

  const loadApp = () => {
    // Redux
    setIdentityServiceUsersVariable(GetStorage(IdentityUsersKey) || {});
    // Filter out invalid public keys
    const publicKeys = Object.keys(identityServiceUsers);
    for (const publicKey of publicKeys) {
      if (!publicKey.match(/^[a-zA-Z0-9]{54,55}$/)) {
        delete identityServiceUsers[publicKey];
      }
    }
    SetStorage(IdentityUsersKey, identityServiceUsers);

    GetUsersStateless(localNode, publicKeys, true).subscribe((res) => {
      if (!_.isEqual(userList, res.UserList)) {
        dispatch(setUserList(res.UserList || []));
      }
      updateEverything();
    });

    // Clean up legacy seedinfo storage. only called when a user visits the site again after a successful import
    DeleteIdentities(localNode).subscribe();
    RemoveStorage(LegacyUserListKey);
    RemoveStorage(LegacySeedListKey);
  }

  function updateDeSoExchangeRate() {
    _updateDeSoExchangeRate();
  }

  const installDD = () => {
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

  const _updateTopLevelData = (): Subscription => {
    // Redux
    const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
    const localNode = useAppSelector((state) => state.node.localNode);

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
        dispatch(createYouHodlMap(loggedInUser?.UsersYouHODL))

        if (res.DefaultFeeRateNanosPerKB > 0) {
          dispatch(setDefaultFeeRateNanosPerKB(res.DefaultFeeRateNanosPerKB))
        }
        dispatch(setGloboMods(res.GloboMods));

        // Check works,,, react changedetection is different with the virtual dom so idk if we need this
        // ref.detectChanges();
        dispatch(setLoadingInitialAppState(false));
      },
      (error) => {
        problemWithNodeConnection = true;
        callingUpdateTopLevelData = false;
        dispatch(setLoadingInitialAppState(false));
        console.error(error);
      }
    );
  }

  return (
    <>
      {children}
    </>
  )
}

function MyApp({ Component, pageProps }) {
  const DYNAMICALLY_ADDED_ROUTER_LINK_CLASS =
    "js-app-component__dynamically-added-router-link-class";

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

  return (
    <Provider store={store}>
      <AppWrapper>
          <Component {...pageProps} />
      </AppWrapper>
    </Provider>
  );
}

export default MyApp;
