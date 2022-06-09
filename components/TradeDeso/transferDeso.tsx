import styles from "../../styles/TradeDeso/transferDeso.module.scss";

const TransferDeso = () => {
  return (
    <div className="transfer-deso-wrapper d-flex flex-column flex-center-start h-100">
      <label className="trade-creator-coins-to-transfer mt-20px">
        DESO TO TRANSFER
      </label>
      <div className="position-relative trade-creator-input-container d-flex flex-row flex-start w-90 mt-5px">
        {/* [(ngModel)]="amount" */}
        <input
          matInput
          type="number"
          placeholder="0"
          className="pl-10px color-text font-weight-bold flex-center pr-10px trade-creator-input m-0px h-100 w-80"
        />
        {/* <!-- Problems with other elements than button --> */}
        <button className="trade-creator-input-button h-100 pt-5px">
          <img
            src="assets/deso/logo-cropped.png"
            className="mb-5px trade-creator-deso-logo"
          />
        </button>
      </div>
      <label className="trade-creator-coins-to-transfer mt-20px">
        TRANSFER TO
      </label>
      {/* <!-- Passing sickSearchBar makes it look like this --> */}
      {/* *ngIf="!payToCreator" */}
      <search-bar
        class="w-95 mt-5px"
        startingSearchText="startingSearchText"
        isSearchForUsersToSendDESO="true"
        creatorToMessage="_handleCreatorSelectedInSearch($event)"
        sickSearchBar="true"
      ></search-bar>
      {/* *ngIf="payToCreator" */}
      {/* (click)="payToCreator = null" */}
      <button className="creator-selected-button position-relative w-95 mt-5px">
        <span className="input-group-text search-bar__icon search_bar__icon_sick">
          <Avatar
            avatar={payToCreator?.PublicKeyBase58Check}
            class="sick-search-avatar"
          ></Avatar>
        </span>
        <p className="creator-selected-user font-weight-semiboldn">
          {payToCreator?.Username
            ? "@" + payToCreator?.Username
            : payToCreator?.PublicKeyBase58Check}
        </p>
      </button>
      <div className="trade-creator-spacer"></div>
      <div className="trade-creator-coin-info-box d-flex flex-center flex-column">
        <div className="coin-info-box-top">
          <span className="you-receive">You are transferring</span>
          {/* *ngIf="amount > 0" */}
          <span className="amount-of-coins font-weight-semiboldn">
            {globalVars.nanosToUSD(amount * 1e9, 2)} $USD
          </span>
        </div>
        <div className="coin-info-box-bottom">
          <span className="network-fees">Network fees</span>
          <span className="amount-of-coins font-weight-semiboldn">
            {globalVars.nanosToDeSo(networkFee * 1e9)} $DESO
          </span>
        </div>
      </div>
      {/* [disabled]="!payToCreator || !(amount > 0) || sendingDeSo" */}
      {/* (click)="emitSendDeso()" */}
      <button className="black-rounded-button bounce-button mt-20px trade-creator-button">
        {/* *ngIf="sendingDeSo; else elseBlock" */}
        <i className="fa fa-spinner fa-spin"></i>
        {/* <ng-template #elseBlock>Transfer</ng-template> */}
      </button>
    </div>
  );
};
export default TransferDeso;
