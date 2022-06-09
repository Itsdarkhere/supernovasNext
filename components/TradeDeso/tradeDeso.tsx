import styles from "../../styles/TradeDeso/tradeDeso.module.scss";

const TradeDeso = () => {
  return (
    <>
      {/* *ngIf="globalVars.loggedInUser; else elseBlock" */}
      {/* [ngClass]="mobile ? 'w-100' : 'feed-cover'" */}
      <div className="d-flex flex-column flex-center m-auto">
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
            {/* (click)="tabBuyClick()" */}
            {/* [ngClass]="{ active: tabBuy }" */}
            <button className="br-top-left-30px font-weight-semiboldn">
              <label className="mb-0px pl-5px">Buy</label>
            </button>
            {/* [ngClass]="{ active: tabSell }" */}
            {/* (click)="tabSellClick()" */}
            <button className="font-weight-semiboldn">
              <label className="mb-0px pl-5px">Sell</label>
            </button>
            {/* (click)="tabTransferClick()" */}
            {/* [ngClass]="{ active: tabTransfer }" */}
            <button className="br-top-right-30px font-weight-semiboldn">
              <label className="mb-0px pl-5px">Transfer</label>
            </button>
          </div>
          {/* *ngIf="tabBuy" */}
          <app-buy-deso class="w-100 h-100 pb-10px d-flex flex-center"></app-buy-deso>
          {/*  *ngIf="tabSell" */}
          <app-sell-deso class="w-100 h-100 pb-10px d-flex flex-center"></app-sell-deso>
          {/* *ngIf="tabTransfer" */}
          <app-transfer-deso
            sendDeso="_clickSendDeSo($event)"
            getNetworkFee="_updateSendDeSoTxnFee(false)"
            networkFee="networkFee"
            calculateNetworkFee="calculateNetworkFee($event)"
            sendingDeSo="sendingDeSo"
            class="w-100 h-100 pb-10px d-flex flex-center"
          ></app-transfer-deso>
        </div>
        {/* <!-- SPACER FOR BOTTOM BAR ON MOBILE --> */}
        <div className="global__bottom-bar-mobile-height"></div>
      </div>
      {/* <ng-template #elseBlock> */}
      <div className="w-100 trade-deso-not-logged-in d-flex flex-column flex-center">
        <label>You must log in to send, buy or transfer DeSo</label>
        {/* (click)="routeToBrowse()" */}
        <button className="black-rounded-button basic-button-size font-weight-semiboldn">
          Back to feed
        </button>
      </div>
      {/* </ng-template> */}
      <app-action-response-slideup
        isOpen="openMobileActionResponse"
        closeSlideUp="closeSlideUp($event)"
        headingText="'Transferred!'"
        mainText="'You transferred the DeSo successfully.'"
        buttonOneText="'View Wallet'"
      ></app-action-response-slideup>
    </>
  );
};

export default TradeDeso;
