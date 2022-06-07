import styles from "../../../styles/Mint/stepTwoEth.module.scss";

const StepTwoEth = () => {
  //  <!-- step 3 -->
  // [@mintSwipeAnimation]="animationType"
  // [ngClass]="mobile ? 'w-100' : 'w-50'"
  return (
    <div className="mint-page-text-container-no-max h-95">
      {/* [ngClass]="mobile ? 'w-90' : 'w-80'" */}
      <div className="mint-page-inner-inner disable-scrollbars">
        {/* (click)="previousStepEth()" */}
        <button className="previous-step-button color-light">
          <img
            className="previous-step-arrow mr-5px"
            src="/assets/icons/arrow-left-lighter.svg"
          />
          Back
        </button>
        <h2 className="mb-5px font-weight-semiboldn w-100 text-align-start fs-23-responsive ml-5px">
          Put your NFT for Sale
        </h2>
        <div className="w-100 mt-20px">
          <label className="mb-0px font-weight-semiboldn w-100 fs-14-responsive text-align-start ml-5px">
            Selling Price
          </label>
          {/* <!-- <button (click)="testDisabled()">test disabled button</button> --> */}
          <label className="color-light fs-12-responsive mb-0px ml-5px mt-5px">
            Set the price collectors are able to buy your NFT in Ethereum.
          </label>
          <div className="position-relative d-flex flex-row flex-start w-100 mint-page-min-price mt-10px">
            {/* [(ngModel)]="sellingPriceETH"
          (ngModelChange)="updateSellingPriceETH($event)" */}
            <input
              matInput
              type="number"
              placeholder="0"
              className="pl-10px color-text font-weight-semiboldn flex-center pr-10px mint-page-min-price-input m-0px h-100 w-60"
            />
            <button className="mint-page-min-price-label h-100 w-40 fs-23-responsive pt-5px">
              <img
                src="assets/eth/ethlogo-white.svg"
                className="mr-5px eth-price-logo"
              />
              <label className="mb-0px eth-price-text">ETH</label>
            </button>
          </div>

          <div className="mt-30px imx-fee-container">
            <div className="imx-fee-container-line-1">
              <p className="imx-fee-container-line-1-text">Immutable X Fee</p>
              <p className="imx-fee-container-line-1-text">0.00 ETH</p>
            </div>
            <div className="imx-fee-container-line-break"></div>
            <div className="imx-fee-container-line-2">
              <p className="imx-fee-container-line-2-text">
                Supernovas Service Fee
              </p>
              <p className="imx-fee-container-line-2-text">0.00 ETH</p>
            </div>
          </div>
        </div>
      </div>
      {/* [ngClass]="mobile ? 'w-90' : 'w-80'"
    [disabled]="hasUnreasonableEthSalePrice()"
    (click)="nextStepEth()" */}
      <button className="mt-20px font-weight-semiboldn mint-page-step-2-continue">
        {/* *ngIf="!isSubmitPress" */}
        <label className="mb-0px">Mint your NFT</label>
        {/* *ngIf="isSubmitPress" */}
        <i className="fa fa-spinner fa-spin"></i>
      </button>
    </div>
  );
};
export default StepTwoEth;
