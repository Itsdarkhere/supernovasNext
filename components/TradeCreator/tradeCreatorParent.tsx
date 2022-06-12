import styles from "../../styles/TradeCreator/tradeCreatorParent.module.scss";
import ActionResponseSlideUp from "../Reusables/actionResponseSlideUp";
import TradeCreatorBuy from "./tradeCreatorBuy";

const TradeCreatorParent = () => {
  return (
    <>
      <div className="w-100 d-flex flex-center">
        {readyForDisplay() ? (
          <div
            className={[
              "d-flex flex-center flex-column mt-20px",
              mobile ? "w-100" : "feed-cover",
            ].join(" ")}
          >
            <Avatar
              avatar={creatorProfile.PublicKeyBase58Check}
              classN="trade-creator-avatar"
            ></Avatar>
            <h3
              className="font-weight-semiboldn trade-creator-name-heading mt-20px"
              style="color: #0d0d0d"
            >
              ${creatorProfile.Username} coin
            </h3>
            <div className="d-flex flex-row mt-10px">
              <span
                className="trade-creator-price-heading font-weight-semiboldn"
                style="color: #9c9c9c"
              >
                {globalVars.nanosToUSD(creatorProfile.CoinPriceDeSoNanos, 2)}
              </span>
              <span
                className="trade-creator-coin-price-heading pl-5px"
                style="color: #8a8a8a"
              >
                Coin price
              </span>
            </div>
            <div className="trade-creator-actions-wrapper mt-20px d-flex flex-column flex-center">
              <div className="trade-creator-tab-selector d-flex flex-center px-10px mt-5px">
                <button
                  onClick={() => _handleTabClick("Buy")}
                  className={[
                    "br-top-left-30px font-weight-semiboldn",
                    creatorCoinTrade.tradeType == "Buy" ? "active" : "",
                  ].join(" ")}
                >
                  <label className="mb-0px pl-5px">Buy</label>
                </button>
                <button
                  onClick={() => _handleTabClick("Sell")}
                  className={[
                    "font-weight-semiboldn",
                    creatorCoinTrade.tradeType == "Sell" ? "active" : "",
                  ].join(" ")}
                >
                  <label className="mb-0px pl-5px">Sell</label>
                </button>
                <button
                  onClick={() => _handleTabClick("Transfer")}
                  className={[
                    "br-top-right-30px font-weight-semiboldn",
                    creatorCoinTrade.tradeType == "Transfer" ? "active" : "",
                  ].join(" ")}
                >
                  <label className="mb-0px pl-5px">Transfer</label>
                </button>
              </div>
              {creatorCoinTrade.tradeType === "Buy" ? (
                <TradeCreatorBuy
                  buyClick={() => _buyOrSellCreatorCoin()}
                  buyingCoin={creatorCoinTradeBeingCalled}
                  invalidateAndUpdateAmounts={() =>
                    _invalidateAndUpdateAmounts()
                  }
                  creatorProfile={creatorProfile}
                  creatorCoinTrade={creatorCoinTrade}
                ></TradeCreatorBuy>
              ) : null}

              {creatorCoinTrade.tradeType === "Sell" ? (
                <TradeCreatorSell
                  sellClick={() => _buyOrSellCreatorCoin()}
                  sellingCoin={creatorCoinTradeBeingCalled}
                  sellMax={() => _maxButtonClicked()}
                  invalidateAndUpdateAmounts={() =>
                    _invalidateAndUpdateAmounts()
                  }
                  creatorProfile={creatorProfile}
                  creatorCoinTrade={creatorCoinTrade}
                ></TradeCreatorSell>
              ) : null}

              {creatorCoinTrade.tradeType === "Transfer" ? (
                <TradeCreatorTransfer
                  transferClick={() => _transferCreatorCoin()}
                  transferingCoin={creatorCoinTradeBeingCalled}
                  invalidateAndUpdateAmounts={() =>
                    _invalidateAndUpdateAmounts()
                  }
                  creatorProfile={creatorProfile}
                  creatorCoinTrade={creatorCoinTrade}
                ></TradeCreatorTransfer>
              ) : null}
            </div>
            <ActionResponseSlideUp
              isOpen={openMobileActionResponse}
              closeSlideUp={(e) => closeSlideUp(e)}
              headingText={headingText}
              mainText={mainText}
              buttonOneText={buttonOneText}
            ></ActionResponseSlideUp>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default TradeCreatorParent;
