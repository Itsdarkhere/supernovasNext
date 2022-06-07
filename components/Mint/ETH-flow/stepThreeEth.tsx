import styles from "../../../styles/Mint/stepThreeEth.module.scss";

const StepThreeEth = () => {
  // <!-- step 5 -->
  //     [@mintSwipeAnimation]="animationType"
  //   [ngClass]="mobile ? 'w-100' : 'w-50'"
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
        <div className="w-100 mt-20px m eth-step-2-container">
          <img
            className="eth-sale-success-img"
            src="/assets/eth/walletConnectedSuccess.svg"
          />
          <h2 className="mb-5px font-weight-semiboldn w-100 text-align-start fs-23-responsive ml-5px eth-minted-step-2-header">
            Congratulations! 🎉
          </h2>
          <label className="mb-0px w-100 fs-14-responsive text-align-start ml-5px eth-minted-step-2-body">
            Your NFT is now for sale on Supernovas!
          </label>
        </div>
      </div>
      {/* [ngClass]="mobile ? 'w-90' : 'w-80'"
    (click)="quoteEthRepost($event)" */}
      <button className="mt-20px font-weight-semiboldn mint-page-step-2-continue eth-minted-step-2-sale-now-button">
        {/* *ngIf="!isSubmitPress" */}
        <label className="mb-0px">Quote Repost on Supernovas</label>
        {/* *ngIf="isSubmitPress" */}
        <i className="fa fa-spinner fa-spin"></i>
      </button>
      {/* [ngClass]="mobile ? 'w-90' : 'w-80'"
    (click)="viewEthPost()" */}
      <button className="mt-20px font-weight-semiboldn mint-page-step-2-continue eth-minted-step-2-sale-later-button">
        {/* *ngIf="!isSubmitPress" */}
        <label className="mb-0px">See your NFT</label>
        {/* *ngIf="isSubmitPress" */}
        <i className="fa fa-spinner fa-spin"></i>
      </button>
    </div>
  );
};
export default StepThreeEth;
