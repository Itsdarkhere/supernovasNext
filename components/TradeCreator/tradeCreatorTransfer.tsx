import styles from "../../styles/TradeCreator/tradeCreatorTransfer.module.scss";

const TradeCreatorTransfer = () => {
    /*
    We need to take this Angular code and make it work in react,
    we can ignore imports but need to make the syntax work.
    */

    return (
        <div class="trade-creator-buy-wrapper position-relative d-flex flex-column flex-center-start w-100 h-100">
  <div class="trade-creator-spacer"></div>
  <label class="trade-creator-coins-to-transfer">COINS TO TRANSFER</label>
  <div class="position-relative trade-creator-input-container d-flex flex-row flex-start w-90 mt-10px">
    {/* [formControl]="creatorCoinTrade.amount" */}
    <input
      matInput
      type="number"
      placeholder="0"
      name="creatorCoinTrade.amount"
      class="pl-10px color-text font-weight-bold flex-center pr-10px trade-creator-input m-0px h-100 w-80"
    />
    {/* <!-- Problems with other elements than button --> */}
    <button class="trade-creator-input-label h-100 pt-5px">
      <Avatar avatar={globalVars?.loggedInUser?.PublicKeyBase58Check} class="trade-creator-transfer-avatar"></Avatar>
    </button>
  </div>
  {/* <!-- Errors--> */}
  {/* *ngIf="creatorCoinTrade.amount.invalid && (creatorCoinTrade.amount.dirty || creatorCoinTrade.amount.touched)" */}
  <div
    class="text-danger text-center w-90 fs-14px mt-2"
  >
    {/* *ngIf="creatorCoinTrade.amount.errors.required" */}
    <div class="mt-10px">Amount is required</div>
        {/* *ngIf="creatorCoinTrade.amount.errors.exclusiveMin" */}
    <div class="mt-10px">
      Amount must be greater than { this._minAmount() | number: "0.0-9" }
      (to cover fees)
    </div>
        {/* *ngIf="creatorCoinTrade.amount.errors.dynamicMax" */}
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
  <label class="trade-creator-coins-to-transfer mt-20px">TRANSFER TO</label>
  {/* <!-- Passing sickSearchBar makes it look like this _handleCreatorSelectedInSearch($event) --> */}
  {/* *ngIf="!selectedCreator" */}
  <search-bar
    class="sb w-90 mt-10px"
    showCloutavista="false"
    creatorToMessage="_handleCreatorSelectedInSearch($event)"
    isSearchForUsersToSendDESO="true"
    sickSearchBar="true"
  ></search-bar>
  {/* *ngIf="selectedCreator" */}
  {/* (click)="selectedCreator = null" */}
  <button
    class="creator-selected-button position-relative w-90 mt-10px"
  >
    <span class="input-group-text search-bar__icon search_bar__icon_sick">
      <Avatar avatar={selectedCreator?.PublicKeyBase58Check} classN="sick-search-avatar"></Avatar>
    </span>
    <p class="creator-selected-user font-weight-semiboldn">
      { selectedCreator?.Username ? "@" + selectedCreator?.Username : selectedCreator?.PublicKeyBase58Check }
    </p>
  </button>
  <div class="trade-creator-spacer"></div>
  <div class="trade-creator-coin-info-box d-flex flex-center flex-column">
    <div class="coin-info-box-top">
      <span class="you-receive">You are transferring</span>
      <span class="amount-of-coins font-weight-semiboldn">
        { creatorCoinTrade.amount.value } ${ creatorProfile.Username } coins
      </span>
    </div>
    <div class="coin-info-box-bottom">
      <span class="network-fees">Network fees</span>
      <span class="amount-of-coins font-weight-semiboldn">0.00 $DESO</span>
    </div>
  </div>
  {/* [disabled]="creatorCoinTrade.amount.invalid || !selectedCreator || transferingCoin" */}
  {/* (click)="transferEmit()" */}
  <button
    class="black-rounded-button bounce-button mt-20px trade-creator-button"
  >
    {/* *ngIf="transferingCoin; else elseBlock" */}
    <i class="fa fa-spinner fa-spin"></i>
    {/* <ng-template #elseBlock>Transfer</ng-template> */}
  </button>
</div>

    )
}

export default TradeCreatorTransfer;