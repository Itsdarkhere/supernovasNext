import styles from "../../styles/TradeDeso/tradeDeso.module.scss";
import ActionResponseSlideUp from "../Reusables/actionResponseSlideUp";
import BuyDeso from "./buyDeso";
import SellDeso from "./sellDeso";
import TransferDeso from "./transferDeso";

const TradeDeso = () => {
  return (
    <>
      {loggedInUser ? (
        <div
          className={[
            "d-flex flex-column flex-center m-auto",
            mobile ? "w-100" : "feed-cover",
          ].join(" ")}
        >
          <div className="deso-page-logo-container d-flex flex-center mt-20px">
            <img
              src="/assets/icons/deso_page_icon.svg"
              alt="deso logo in white background"
            />
          </div>
          <h3 className="font-weight-semiboldn deso-page-name-heading mt-20px">
            Deso
          </h3>
          <span className="deso-page-price-heading font-weight-semiboldn">
            {globalVars.nanosToUSD(globalVars.loggedInUser.BalanceNanos, 2)}
          </span>
          <div className="deso-page-actions-wrapper mt-20px d-flex flex-column flex-center">
            <div className="deso-page-tab-selector d-flex flex-center px-10px mt-5px">
              <button
                onClick={() => tabBuyClick()}
                className={[
                  "br-top-left-30px font-weight-semiboldn",
                  tabBuy ? "active" : "",
                ].join(" ")}
              >
                <label className="mb-0px pl-5px">Buy</label>
              </button>
              <button
                onClick={() => tabSellClick()}
                className={[
                  "font-weight-semiboldn",
                  tabSell ? "active" : "",
                ].join(" ")}
              >
                <label className="mb-0px pl-5px">Sell</label>
              </button>
              <button
                onClick={() => tabTransferClick()}
                className={[
                  "br-top-right-30px font-weight-semiboldn",
                  tabTransfer ? "active" : "",
                ].join(" ")}
              >
                <label className="mb-0px pl-5px">Transfer</label>
              </button>
            </div>
            {tabBuy ? <BuyDeso></BuyDeso> : null}

            {tabSell ? <SellDeso></SellDeso> : null}

            {tabTransfer ? (
              <TransferDeso
                sendDeso={(e) => _clickSendDeSo(e)}
                getNetworkFee={() => _updateSendDeSoTxnFee(false)}
                networkFee={networkFee}
                calculateNetworkFee={(e) => calculateNetworkFee(e)}
                sendingDeSo={sendingDeSo}
              ></TransferDeso>
            ) : null}
          </div>
          {/* <!-- SPACER FOR BOTTOM BAR ON MOBILE --> */}
          <div className="global__bottom-bar-mobile-height"></div>
        </div>
      ) : (
        <div className="w-100 trade-deso-not-logged-in d-flex flex-column flex-center">
          <label>You must log in to send, buy or transfer DeSo</label>
          <button
            onClick={() => routeToBrowse()}
            className="black-rounded-button basic-button-size font-weight-semiboldn"
          >
            Back to feed
          </button>
        </div>
      )}
      <ActionResponseSlideUp
        isOpen={openMobileActionResponse}
        closeSlideUp={(e) => closeSlideUp(e)}
        headingText="Transferred!"
        mainText="You transferred the DeSo successfully."
        buttonOneText="View Wallet"
      ></ActionResponseSlideUp>
    </>
  );
};

export default TradeDeso;
