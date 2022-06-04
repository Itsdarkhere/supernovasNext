import styles from "../../styles/Wallet/walletComponent.module.scss";
import Image from "next/image";
import keyIcon from "../public/icons/key_icon.svg";
import copyIcon from "../public/icons/copy_icon.svg";
import desoBlackIcon from "../public/icons/wallet_deso_icon_black.svg";
import creatorCoinIcon from "../public/icons/wallet_cc_icon_black.svg";
import desoIcon from "../public/deso/desologo.svg";
import chevronRightIcon from "../public/icons/chevron_right.svg";
import ethIcon from "../public/eth/ethlogo.svg";
import { useState, useEffect } from "react";
import {
  isMobile,
  nanosToDeSo,
  nanosToUSD,
  _copyText,
} from "../../utils/global-context";
import { useAppSelector } from "../../utils/Redux/hooks";

const WalletComponent = () => {
  // Redux
  const imxWalletConnected = useAppSelector((state) => state.imx.imxWalletConnected);
  const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  // Redux end
  
  const [showYouDontOwnCreatorCoins, setShowYouDontOwnCreatorCoins] =
    useState(false);
  const [mobile, setMobile] = useState(false);
  const [tabCreatorCoin, setTabCreatorCoin] = useState(false);
  const [tabDeso, setTabDeso] = useState(true);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Lifecycle
  useEffect(() => {
    const setMobileBasedOnViewport = () => {
      setMobile(isMobile());
    };

    setMobileBasedOnViewport();

    window.addEventListener("resize", setMobileBasedOnViewport, false);
  }, []);
  // Functions
  const copyPublicKey = () => {
    setCopiedSuccess(true);
    _copyText(loggedInUser.PublicKeyBase58Check);
    setTimeout(() => {
      setCopiedSuccess(false);
    }, 1500);
  };

  const tabDesoClick = () => {
    setTabDeso(true);
    setTabCreatorCoin(false);
  };

  const tabCreatorCoinClick = () => {
    setTabCreatorCoin(true);
    setTabDeso(false);
  };

  // Functions end

  // Dom manipulation
  const getCoinLabels = () => {
    if (showYouDontOwnCreatorCoins) {
      return (
        <>
          <div
            className={[
              styles.creator_coin_top_bar + " w-100",
              mobile ? "w2" : "",
            ].join(" ")}
          >
            <label
              className="font-weight-semiboldn mb-0px fs-14px text-align-start pl-20px"
              style={{ color: "#7a7a7a" }}
            >
              CREATOR
            </label>
            <label
              className={
                styles.padding_left_10_perc +
                " font-weight-semiboldn mb-0px fs-14px text-align-center hide_on_mobile"
              }
              style={{ color: "#7a7a7a" }}
            >
              COIN PRICE
            </label>
            <label
              className={
                styles.padding_left_10_perc +
                " font-weight-semiboldn mb-0px fs-14px text-align-start"
              }
              style={{ color: "#7a7a7a" }}
            >
              VALUE IN USD
            </label>
          </div>
          <div
            className={[
              styles.creator_coin_list,
              "disable-scrollbars",
              mobile ? " w2" : "",
            ].join(" ")}
          >
            {/* <!-- IF NO COINS ARE OWNED --> */}
            {/* (click)="routeToSellCoin(creator)" *ngFor="let creator of usersYouPurchased" */}
            <button className="position-relative">
              <div
                className={
                  styles.cc_button_value +
                  " d-flex flex-row flex-center-start pl-10px"
                }
              >
                {/* [avatar]="creator.ProfileEntryResponse.PublicKeyBase58Check" */}
                <div className={styles.wallet_cc_avatar + " mr-5px"}></div>
                <label
                  className="font-weight-bold fs-12px mb-0px"
                  style={{ color: "#000000" }}
                >
                  {/* {{ creator.ProfileEntryResponse?.Username }} */}
                </label>
              </div>
              <label
                className={
                  styles.cc_button_value +
                  " text-align-center padding-left-10-perc fs-18px mb-0px hide_on_mobile"
                }
                style={{ color: "#2d2d2d" }}
              >
                {/* { nanosToUSD(creator.ProfileEntryResponse.CoinPriceDeSoNanos, 2) } */}
              </label>
              <span
                className={
                  styles.c_button_value +
                  " " +
                  styles.padding_left_10_perc +
                  " font-weight-semiboldn fs-18px mb-0px d-flex flex-center-start flex-row"
                }
                style={{ color: "#2d2d2d" }}
              >
                {/* {
          globalVars.usdYouWouldGetIfYouSoldDisplay(creator.BalanceNanos, creator.ProfileEntryResponse.CoinEntry)
        } */}
              </span>
              <Image
                height={"50px"}
                className={styles.creator_coin_arrow}
                src={chevronRightIcon}
                alt="arrow right"
              />
            </button>
          </div>
        </>
      );
    }
    return (
      <div className={styles.dont_own_cc}>
        You dont own any creator coins...
      </div>
    );
  };

  const getCreatorCoinTab = () => {
    if (tabCreatorCoin) {
      {
        /*  [@tabChangeAnimation] */
      }
      return (
        <div className={styles.wallet_bottom_container}>{getCoinLabels()}</div>
      );
    }
    return null;
  };

  const getEthButton = () => {
    if (!imxWalletConnected) {
      return (
        <div
          className={
            styles.wallet_coin_button +
            " " +
            styles.padding_left_7_5_perc +
            " py-10px w-100 d-flex flex-row justify-content-between"
          }
        >
          <div className="h-100 d-flex flex-row flex-center">
            <Image
              height={"50px"}
              className="deso-logo"
              src={ethIcon}
              alt="eth"
            />
            <label
              className={styles.deso_name + "fs-28px mb-0px color-text pl-10px"}
            >
              Ethereum
            </label>
          </div>
          <div className="h-100 d-flex flex-row flex-center">
            {/* (click)="openGeneralSuccessModal()" */}
            <button
              className={
                styles.connect_wallet_button +
                " black-rounded-button d-flex flex-center font-weight-bold fs-15px mt-5px"
              }
            >
              Connect Wallet
            </button>
          </div>
        </div>
      );
    } else {
      // (click)="routeToImxPage()"
      return (
        <button
          className={
            styles.wallet_coin_button +
            " " +
            styles.padding_left_7_5_perc +
            " py-10px w-100 d-flex flex-row justify-content-between"
          }
        >
          <div className="h-100 d-flex flex-row flex-center">
            <Image
              className={styles.deso_logo}
              height={"50px"}
              src={ethIcon}
              alt="eth"
            />
            <label
              className={
                styles.deso_name + " fs-28px mb-0px color-text pl-10px"
              }
            >
              Ethereum
            </label>
          </div>
          <div className="h-100 d-flex flex-row flex-center">
            <div className="h-100 d-flex flex-row flex-center">
              <div
                className={
                  styles.imxBalanceContainer +
                  " d-flex w-100 flex-column flex-start-center mr-10px"
                }
              >
                <label
                  className={
                    styles.eth_balance + " fs-28px mb-0px font-weight-semiboldn"
                  }
                  style={{ color: "#2d2d2d" }}
                >
                  {/* {imxBalanceFull} */}
                </label>
              </div>
              <Image
                height={"50px"}
                className={styles.wallet_button_arrow}
                src={chevronRightIcon}
                alt="arrow right"
              />
            </div>
          </div>
        </button>
      );
    }
  };

  const getDesoTab = () => {
  
    if (tabDeso) {
      {
        /* ANIMATE [@tabChangeAnimation] */
      }
      return (
        <div className={styles.wallet_bottom_container}>
          <div className={styles.wallet_crypto_container}>
            {/* (click)="routeToBuyDeso()" */}
            <button
              className={
                styles.wallet_coin_button +
                " " +
                styles.padding_left_7_5_perc +
                " py-10px w-100 d-flex flex-row justify-content-between"
              }
            >
              <div className="h-100 d-flex flex-row flex-center">
                <Image
                  className="deso-logo"
                  height={"50px"}
                  width={"50px"}
                  src={desoIcon}
                  alt="deso"
                />
                <label
                  className={
                    styles.deso_name + " fs-28px mb-0px color-text pl-10px"
                  }
                >
                  Deso
                </label>
              </div>
              <div
                className={[
                  "h-100 d-flex flex-row flex-center",
                  mobile ? "" : "w-30",
                ].join(" ")}
              >
                <div className="d-flex w-100 flex-column flex-start-center mr-10px">
                  <label
                    className={
                      styles.balance_usd +
                      "fs-28px mb-0px font-weight-semiboldn"
                    }
                    style={{ color: "#2d2d2d" }}
                  >
                    {nanosToUSD(loggedInUser?.BalanceNanos, 2)}
                  </label>
                  <label
                    className={styles.balance_deso + "fs-20px mb-0"}
                    style={{ color: "#6d6d6d" }}
                  >
                    {nanosToDeSo(loggedInUser?.BalanceNanos, 2)} DESO
                  </label>
                </div>
                <Image
                  height={"50px"}
                  className={styles.wallet_button_arrow}
                  src={chevronRightIcon}
                  alt="arrow right"
                />
              </div>
            </button>
            {getEthButton()}
          </div>
        </div>
      );
    }
    return null;
  };

  const getUsername = () => {
    // Redux
    const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  
    if (loggedInUser?.ProfileEntryResponse?.Username) {
      return (
        <span className="pl-5px">
          @{loggedInUser?.ProfileEntryResponse?.Username}
        </span>
      );
    }
    return null;
  };

  const getCopyIcon = () => {
    if (copiedSuccess) {
      return (
        <Image
          height={"50px"}
          className="cursor-pointer"
          alt="key"
          src={copyIcon}
        />
      );
    }
    return <i className="fas fa-check-circle fa-md align-middle"></i>;
  };
  // dom manipulation end

  // Main return...
  return (
    <div className={styles.wallet_container}>
      <div
        className={
          styles.wallet_top_section + " " + styles.padding_left_right_7_5_perc
        }
      >
        <div className="d-flex flex-column hide_on_mobile">
          <h4
            className="font-weight-semiboldn fs-16px"
            style={{ color: "#565656" }}
          >
            YOUR WALLET
          </h4>
          <div
            className="font-weight-bold d-flex flex-row fs-24px mt-20px"
            style={{ color: "#0d0d0d" }}
          >
            {/* [avatar]="globalVars.loggedInUser.PublicKeyBase58Check" */}
            <div className={styles.wallet_avatar}></div>
            {getUsername()}
          </div>
        </div>
        <div
          className={[
            styles.wallet_pk_box_wrapper,
            mobile ? " mobile" : "",
          ].join(" ")}
        >
          <h4
            className="font-weight-semiboldn pl-10px fs-16px"
            style={{ color: "#565656" }}
          >
            PUBLIC KEY
          </h4>
          <div onClick={() => copyPublicKey()} className={styles.wallet_pk_box}>
            <Image alt="key" height={"50px"} src={keyIcon} />
            <span
              style={{ color: "#424242" }}
              className="font-weight-semiboldn fs-16px px-5px"
            >
              {loggedInUser?.ProfileEntryResponse?.PublicKeyBase58Check}
            </span>
            <div className={styles.wallet_copy_container}>{getCopyIcon()}</div>
          </div>
        </div>
      </div>
      <div className={styles.wallet_gradient_container}>
        <div
          className={
            styles.wallet_gradient_cover +
            " " +
            styles.padding_left_right_7_5_perc
          }
        >
          <h4
            className="fs-20px font-weight-semiboldn"
            style={{ color: "#e0e0e0" }}
          >
            Total Balance
          </h4>
          <label
            className="fs-40px mb-0px font-weight-semiboldn mt-10px"
            style={{ color: "#ffffff" }}
          >
            {/* { globalVars.nanosToDeSo(globalVars.loggedInUser.BalanceNanos + totalValue(), 2) } $DESO */}
          </label>
          <label
            className={styles.mtm_5px + " fs-32px"}
            style={{ color: "#eaeaea" }}
          >
            {/* { globalVars.nanosToUSD(globalVars.loggedInUser.BalanceNanos + totalValue(), 2) } */}
          </label>
        </div>
        <div className={styles.wallet_tab_selector}>
          <button
            onClick={() => tabDesoClick()}
            className={[
              styles.wallet_button,
              tabDeso === true ? styles.active : "",
            ].join(" ")}
          >
            <Image
              height={"50px"}
              src={desoBlackIcon}
              className={styles.wallet_button_svg + " mb-5px"}
              alt="creator coin icon"
            />
            <label className="mb-0px pl-5px cursor-pointer hide_on_mobile">
              Wallets
            </label>
          </button>
          <button
            onClick={() => tabCreatorCoinClick()}
            className={[
              styles.wallet_button,
              tabCreatorCoin === true ? styles.active : "",
            ].join(" ")}
          >
            <Image
              height={"50px"}
              className={styles.wallet_button_svg}
              src={creatorCoinIcon}
              alt="creator coin icon"
            />
            <label className="mb-0px pl-5px cursor-pointer hide_on_mobile">
              Creator Coins
            </label>
          </button>
        </div>
      </div>
      <div className={styles.background_grey + " d-flex flex-center"}>
        {getDesoTab()}
        {getCreatorCoinTab()}
      </div>
    </div>
  );
};
export default WalletComponent;
