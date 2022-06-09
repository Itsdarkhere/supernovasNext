import styles from "../../styles/TradeCreator/tradeCreatorBuy.module.scss";

const TradeCreatorBuy = () => {

    return (
        <div className="trade-creator-buy-wrapper position-relative d-flex flex-column flex-center-start w-100 h-100">
          <div className="trade-creator-spacer"></div>
          <div className="position-relative trade-creator-input-container d-flex flex-row flex-start w-90 mt-10px">
            {/* (change)="emitInvalidateAndUpdateAmounts()"
              [formControl]="creatorCoinTrade.amount" */}
              {/* matInput */}
            <input
              type="number"
              placeholder="0"
              name="creatorCoinTrade.amount"
              className="pl-10px color-text font-weight-bold flex-center pr-10px trade-creator-input m-0px h-100 w-60"
            />
            <button className="trade-creator-input-label h-100 w-40 pt-5px">
              <img src="assets/deso/logo-cropped.png" className="mb-5px trade-creator-deso-logo" />
              <label className="mb-0px">$DESO</label>
            </button>
          </div>
          {/* <!-- ERRORS --> */}
          {/* *ngIf="creatorCoinTrade.amount.invalid && (creatorCoinTrade.amount.dirty || creatorCoinTrade.amount.touched)" */}
          <div
            className="text-danger text-center 2-90 errors-fontsize mt-2"
          >
            {/* *ngIf="creatorCoinTrade.amount.errors.required" */}
            <div className="mt-10px">Amount is required</div>
              {/* *ngIf="creatorCoinTrade.amount.errors.exclusiveMin" */}
            <div className="mt-10px">
              Amount must be greater than { _minAmount() | number: "0.0-9" }
              (to cover fees)
            </div>
              {/* *ngIf="creatorCoinTrade.amount.errors.dynamicMax" */}
            <div class="mt-10px">
                {/* *ngIf="this._maxAmount() && this._maxAmount() > 0; else elseBlock" */}
              <div>
                Amount must be less than
                { _maxAmount() | number: "0.0-9" }
                (your balance net of fees)
              </div>
              {/* <ng-template #elseBlock>Amount must be less than your balance plus fees</ng-template> */}
            </div>
              {/* *ngIf="creatorCoinTrade.amount.errors.pattern" */}
            <div className="mt-10px">Amount must be numbers and decimals only</div>
          </div>
          {/* <!-- ERRORS END --> */}
          <div className="trade-creator-spacer-two"></div>
          <span className="trade-creator-balance-info">
            <p className="font-weight-semiboldn">You have { creatorCoinTrade.assetToSellBalance() } DeSo</p>
          </span>
          <div className="trade-creator-spacer"></div>
          <div className="trade-creator-coin-info-box d-flex flex-center flex-column">
            <div className="d-flex flex-row justify-content-between coin-info-box-top">
              <span className="you-receive">You receive</span>
              <span className="amount-of-coins font-weight-semiboldn">
                { creatorCoinTrade.assetReturnedAmount() | number: "0.0-9" } { creatorProfile.Username } coins
              </span>
            </div>
            <span className="founder-reward h-50 d-flex flex-center">
              { creatorProfile.Username } receives { creatorProfile?.CoinEntry?.CreatorBasisPoints / 100 }% as Founder
              Reward
            </span>
          </div>
          {/* [disabled]="creatorCoinTrade.amount.invalid || buyingCoin" */}
          {/* (click)="clickBuy()" */}
          <button
            className="black-rounded-button bounce-button mt-20px trade-creator-button"
          >
        {/* *ngIf="buyingCoin; else elseBlock" */}
        <i className="fa fa-spinner fa-spin"></i>
        {/* <ng-template #elseBlock>Buy</ng-template> */}
      </button>
    </div>

    )
}

export default TradeCreatorBuy;