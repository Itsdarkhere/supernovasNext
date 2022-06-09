import styles from "../../styles/TradeCreator/tradeCreatorSell.module.scss";

const TradeCreatorSell = () => {

    return (
        <div class="trade-creator-buy-wrapper position-relative d-flex flex-column flex-center-start w-100 h-100">
        <div class="trade-creator-spacer"></div>
        <div class="position-relative trade-creator-input-container d-flex flex-row flex-start w-90 mt-10px">
            {/* *ngIf="creatorCoinTrade.amount" */}
            {/* [formControl]="creatorCoinTrade.amount" */}
          <input
            
            matInput
            type="number"
            placeholder="0"
            name="creatorCoinTrade.amount"
            
            id="trade-creator-sell-input"
            class="pl-10px color-text font-weight-bold flex-center pr-10px trade-creator-input m-0px h-100 w-80"
          />
          {/* <!-- Problems with other elements than button --> */}
          <button class="trade-creator-input-label h-100 pt-5px">
            <Avatar avatar={creatorProfile.PublicKeyBase58Check} classN="trade-creator-transfer-avatar"></Avatar>
          </button>
        </div>
        {/* <!-- ERRORS --> */}
        {/* *ngIf="creatorCoinTrade.amount.invalid && (creatorCoinTrade.amount.dirty || creatorCoinTrade.amount.touched)" */}
        <div
          class="text-danger text-center fs-14px mt-2 w-90"
        >
            {/* *ngIf="creatorCoinTrade.amount.errors.required" */}
          <div class="mt-10px">Amount is required</div>
        {/* *ngIf="creatorCoinTrade.amount.errors.exclusiveMin" */}
          <div class="mt-10px">
            Amount must be greater than { this._minAmount() | number: "0.0-9" }
            (to cover fees)
          </div>
            {/*  *ngIf="creatorCoinTrade.amount.errors.dynamicMax" */}
          <div class="mt-10px">
            {/* *ngIf="this._maxAmount() && this._maxAmount() > 0; else elseBlock" */}
            <div>
              Amount must be less than
              { this._maxAmount() | number: "0.0-9" }
              (your balance net of fees)
            </div>
            {/* <ng-template #elseBlock>Amount must be less than your balance plus fees</ng-template> */}
          </div>
        {/* *ngIf="creatorCoinTrade.amount.errors.pattern" */}
          <div class="mt-10px">Amount must be numbers and decimals only</div>
        </div>
        {/* <!-- ERRORS END --> */}
        <div class="trade-creator-spacer-two"></div>
        <div class="trade-creator-coin-sell-info d-flex flex-row flex-center">
          <div class="sell-info-image-container d-flex flex-center">
            <img alt="waller" src="/assets/icons/wallet-icon.svg" />
          </div>
          <div class="sell-info-text-container pl-10px d-flex flex-column flex-start-center w-70">
            <span class="you-own">You own</span>
            <span class="you-own-amount font-weight-semiboldn">
              { creatorCoinTrade.assetToSellBalance() } ${ creatorProfile.Username }
            </span>
          </div>
          {/* (click)="emitSellMax()" */}
          <button class="trade-creator-see-all-button w-20">SELL ALL</button>
        </div>
        <div class="trade-creator-spacer"></div>
        <div class="trade-creator-coin-info-box d-flex flex-center flex-column">
          <div class="coin-info-box-top">
            <span class="you-receive">You are selling</span>
            <span class="amount-of-coins font-weight-semiboldn">{ creatorCoinTrade.amount.value } ${ creatorProfile.Username } coins</span>
          </div>
          <div class="coin-info-box-bottom">
            <span class="network-fees">Your receive</span>
            <span class="amount-of-coins font-weight-semiboldn">
              { creatorCoinTrade.assetReturnedAmount() | number } $DeSo
            </span>
          </div>
        </div>
        {/* [disabled]="creatorCoinTrade.amount.invalid || sellingCoin" */}
        {/* (click)="clickSell()" */}
        <button
          class="black-rounded-button bounce-button mt-20px trade-creator-button"
        >
            {/* *ngIf="sellingCoin; else elseBlock" */}
          <i class="fa fa-spinner fa-spin"></i>
          {/* <ng-template #elseBlock>Sell</ng-template> */}
        </button>
      </div>
      
    )
}

export default TradeCreatorSell;