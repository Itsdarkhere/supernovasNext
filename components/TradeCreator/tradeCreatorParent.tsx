import styles from "../../styles/TradeCreator/tradeCreatorParent.module.scss";
import TradeCreatorBuy from "./tradeCreatorBuy";

const TradeCreatorParent = () => {
  return (
    <>
      <div className="w-100 d-flex flex-center">
        {/*  *ngIf="readyForDisplay(); else loadingElseBlock"
    [ngClass]="mobile ? 'w-100' : 'feed-cover'" */}
        <div className="d-flex flex-center flex-column mt-20px">
          <Avatar
            avatar={creatorProfile.PublicKeyBase58Check}
            class="trade-creator-avatar"
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
              {/* [ngClass]="{ active: creatorCoinTrade.tradeType == 'Buy' }" */}
              {/* (click)="_handleTabClick('Buy')" */}
              <button className="br-top-left-30px font-weight-semiboldn">
                <label className="mb-0px pl-5px">Buy</label>
              </button>
              {/* (click)="_handleTabClick('Sell')" */}
              {/* [ngClass]="{ active: creatorCoinTrade.tradeType == 'Sell' }" */}
              <button className="font-weight-semiboldn">
                <label className="mb-0px pl-5px">Sell</label>
              </button>
              {/* (click)="_handleTabClick('Transfer')" */}
              {/* [ngClass]="{ active: creatorCoinTrade.tradeType == 'Transfer' }" */}
              <button className="br-top-right-30px font-weight-semiboldn">
                <label className="mb-0px pl-5px">Transfer</label>
              </button>
            </div>
            {/* *ngIf="creatorCoinTrade.tradeType === 'Buy'" */}
            <TradeCreatorBuy
              buyClick="_buyOrSellCreatorCoin()"
              buyingCoin="creatorCoinTradeBeingCalled"
              invalidateAndUpdateAmounts="_invalidateAndUpdateAmounts()"
              creatorProfile="creatorProfile"
              creatorCoinTrade="creatorCoinTrade"
              class="w-100 h-100 pb-10px d-flex flex-center"
            ></TradeCreatorBuy>
            {/* *ngIf="creatorCoinTrade.tradeType === 'Sell'" */}
            <TradeCreatorSell
              sellClick="_buyOrSellCreatorCoin()"
              sellingCoin="creatorCoinTradeBeingCalled"
              sellMax="_maxButtonClicked()"
              invalidateAndUpdateAmounts="_invalidateAndUpdateAmounts()"
              creatorProfile="creatorProfile"
              creatorCoinTrade="creatorCoinTrade"
              class="w-100 h-100 pb-10px d-flex flex-center"
            ></TradeCreatorSell>
            {/* *ngIf="creatorCoinTrade.tradeType === 'Transfer'" */}
            <TradeCreatorTransfer
              transferClick="_transferCreatorCoin()"
              transferingCoin="creatorCoinTradeBeingCalled"
              invalidateAndUpdateAmounts="_invalidateAndUpdateAmounts()"
              creatorProfile="creatorProfile"
              creatorCoinTrade="creatorCoinTrade"
              class="w-100 h-100 pb-10px d-flex flex-center"
            ></TradeCreatorTransfer>
          </div>
          <app-action-response-slideup
            isOpen="openMobileActionResponse"
            closeSlideUp="closeSlideUp($event)"
            headingText="headingText"
            mainText="mainText"
            buttonOneText="buttonOneText"
          ></app-action-response-slideup>
        </div>
        {/* <!--

  headingText: "Sold!",
        modalText: "You sold the Creator Coin successfully.",
        buttonOneText: "View Wallet",
--> */}
        {/* <ng-template #loadingElseBlock>
    <simple-center-loader></simple-center-loader>
  </ng-template> */}
      </div>
    </>
  );
};

export default TradeCreatorParent;
