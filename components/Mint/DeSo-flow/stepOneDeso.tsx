import styles from "../../../styles/Mint/stepOneDeso.module.scss";

const StepOneDeso = () => {
  // [@mintSwipeAnimation]="animationType"
  return (
    <div
      className={[
        "mint-page-text-container flex-center",
        mobile ? "w-100" : "w-50",
      ].join(" ")}
    >
      <div
        className={[
          "mint-page-inner-inner disable-scrollbars",
          mobile ? "w-90" : "w-80",
        ].join(" ")}
      >
        <button
          onClick={() => previousStep()}
          className="previous-step-button color-light"
        >
          <img
            className="previous-step-arrow mr-5px"
            src="/assets/icons/arrow-left-lighter.svg"
          />
          Back
        </button>
        <h2 className="font-weight-semiboldn w-100 text-align-start ml-5px fs-23-responsive">
          Create your NFT
        </h2>
        <label className="mt-10px font-weight-semiboldn w-100 mb-0px text-align-start fs-14-responsive ml-5px">
          Editions
        </label>
        <label className="color-light ml-5px fs-12-responsive">
          Choose between minting either a 1:1 NFT or a collection of NFTs.
        </label>
        <div className="w-100 d-flex flex-row edition-selector-parent-container">
          <button
            onClick={() => oneEditionSelected()}
            className={[
              "mint-page-edition-selection",
              oneEdition ? "electric-box-shadow" : "",
              mobile ? "m-10px" : "",
            ].join(" ")}
          >
            <div className="h-60 w-100 d-flex flex-center edition-selector-top">
              <img
                src="/assets/img/single.png"
                className="make-smaller"
                alt="nft-card-mockup"
              />
            </div>
            <div className="h-40 d-flex flex-column flex-center">
              <label className="font-weight-semiboldn w-100 text-align-center mt-5px mb-0px text-color-1 fs-14-responsive">
                Edition of 1
              </label>
              <label className="w-80 text-align-center fs-10-responsive text-color-1">
                Create an unique art piece
              </label>
            </div>
          </button>
          <button
            onClick={() => multipleEditionsSelected()}
            className={[
              "mint-page-edition-selection",
              multipleEditions ? "electric-box-shadow" : "",
              mobile ? "m-10px" : "",
            ].join(" ")}
          >
            <div className="h-60 w-100 d-flex flex-center edition-selector-top">
              <img
                src="/assets/img/single.png"
                className="make-smaller"
                alt="nft-card-mockup"
              />
              <img
                src="/assets/img/single.png"
                className="make-smaller"
                alt="nft-card-mockup"
              />
              <img
                src="/assets/img/single.png"
                className="make-smaller"
                alt="nft-card-mockup"
              />
            </div>
            <div className="h-40 d-flex flex-column flex-center">
              <label className="font-weight-semiboldn w-100 text-align-center text-color-1 mt-5px mb-0px fs-14-responsive">
                Multiple Editions
              </label>
              <label className="w-80 text-align-center fs-10-responsive text-color-1">
                Create an NFT with multiple editions.
              </label>
            </div>
          </button>
        </div>
        <div className="w-100 d-flex mb-10px flex-column mint-custom-container">
          <label className="mt-20px font-weight-semiboldn mb-0px fs-14-responsive ml-5px">
            Auction mechanism
          </label>
          <label className="color-light ml-5px mb-0px mt-5px fs-12-responsive">
            This is the format in which your NFT will be sold.
          </label>
          <button
            onClick={() => openAuctionSelected()}
            className={[
              "w-100 mt-10px mint-page-auction-selection background-white",
              openAuction ? "electric-box-shadow" : "",
              mobile ? "m-10px" : "",
            ].join(" ")}
          >
            <div className="background-secondary w-30 h-100 flex-center text-align-center">
              <label className="mb-0px p-5px text-color-1 font-weight-semiboldn fs-12-responsive">
                OPEN AUCTION
              </label>
            </div>
            <div className="w-70 text-color-1 text-align-start mb-0px pl-10px pr-10px fs-10-responsive">
              An auction without an ending time in which you select the winning
              bid.
            </div>
          </button>
          <button
            onClick={() => buyNowSelected()}
            className={[
              "w-100 mt-10px mint-page-auction-selection background-white",
              isBuyNow ? "electric-box-shadow" : "",
              mobile ? "m-10px" : "",
            ].join(" ")}
          >
            <div className="background-secondary w-30 h-100 flex-center text-align-center">
              <label className="mb-0px p-5px text-color-1 font-weight-semiboldn fs-12-responsive">
                BUY NOW
              </label>
            </div>
            <div className="w-70 text-color-1 text-align-start mb-0px pl-10px pr-10px fs-10-responsive">
              Set a fixed price that your NFT can be immediately sold at.
            </div>
          </button>
          <div className="w-100 mint-page-auction-selection mt-10px pointer-events-none">
            <div className="background-secondary w-30 h-100 flex-center text-align-center">
              <label className="mb-0px p-5px color-light font-weight-semiboldn fs-12-responsive">
                TIMED AUCTION
              </label>
            </div>
            <div className="w-70 mb-0px pl-10px pr-10px fs-10-responsive">
              Coming soon!
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => nextStep()}
        disabled={!isBuyNow && !openAuction}
        className={[
          "mb-0px font-weight-semiboldn mint-page-step-2-continue",
          mobile ? "w-90" : "w-80",
        ].join(" ")}
      >
        CONTINUE
      </button>
    </div>
  );
};
export default StepOneDeso;
