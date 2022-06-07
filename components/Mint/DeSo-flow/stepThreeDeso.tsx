import styles from "../../../styles/Mint/stepThreeDeso.module.scss";

const StepThreeDeso = () => {
  // <!--  STEP 4 open auction -->
  //         [@mintSwipeAnimation]="animationType"
  //   *ngIf="openAuction && !isBuyNow"
  //   [ngClass]="mobile ? 'w-100' : 'w-50'"
  return (
    <>
      <div className="mint-page-text-container-no-max h-95">
        {/* [ngClass]="mobile ? 'w-90' : 'w-80'" */}
        <div className="mint-page-inner-inner disable-scrollbars">
          {/* (click)="previousStep()" */}
          <button className="previous-step-button color-light">
            <img
              className="previous-step-arrow mr-5px"
              src="/assets/icons/arrow-left-lighter.svg"
            />
            Back
          </button>
          <h2 className="mb-5px font-weight-semiboldn w-100 text-align-start fs-23-responsive ml-5px">
            Mint your NFT
          </h2>
          <div className="w-100 mt-5px">
            <label className="mb-0px font-weight-semiboldn w-100 fs-14-responsive text-align-start ml-5px">
              Minimum price
            </label>
            <label className="color-light fs-12-responsive mb-0px ml-5px mt-5px">
              Set your minimum price in $DESO that you’d be willing to sell your
              NFT for.
            </label>
            <div className="position-relative d-flex flex-row flex-start w-100 mint-page-min-price mt-10px">
              {/* [(ngModel)]="MIN_PRICE"
          (ngModelChange)="updateBidAmountUSD($event)" */}
              <input
                matInput
                type="number"
                placeholder="0"
                className="pl-10px color-text font-weight-semiboldn flex-center pr-10px mint-page-min-price-input m-0px h-100 w-60"
              />
              <button className="mint-page-min-price-label h-100 w-40 fs-23-responsive pt-5px">
                <img
                  src="assets/deso/logo-cropped.png"
                  className="mr-10px mb-5px mint-page-deso-logo"
                />
                <label className="mb-0px">$DESO</label>
              </button>
            </div>
            <div className="mint-page-deso-to-usd mt-5px ml-20px w-90">
              {/* *ngIf="PRICE_USD" */}
              <label className="mb-0px fs-20-responsive">${PRICE_USD}</label>
            </div>
            <div className="d-flex flex-row justify-content-space-between">
              <div className="w-40">
                <label className="font-weight-semiboldn ml-5px fs-14-responsive text-oneline">
                  Creator Royalty
                </label>
                <div className="d-flex flex-row mint-page-royalty-element position-relative">
                  {/* [(ngModel)]="CREATOR_ROYALTY"
              (ngModelChange)="updateCreatorRoyalty()" */}
                  <input
                    type="number"
                    placeholder="5"
                    className="w-50 color-text font-weight-semiboldn h-100 royalty-element-input"
                  />
                  <button className="w-50 h-100 background-secondary text-color-3 flex-center royalty-element-label fs-23-responsive font-weight-semiboldn">
                    %
                  </button>
                </div>
                <label className="color-light fs-12-responsive mt-10px ml-5px">
                  The royalty you as an artist will receive.
                </label>
              </div>
              <div className="w-40">
                <label className="font-weight-semiboldn ml-5px fs-14-responsive">
                  Coin Royalty
                </label>
                <div className="d-flex flex-row mint-page-royalty-element position-relative">
                  {/* [(ngModel)]="COIN_ROYALTY"
              (ngModelChange)="updateCoinRoyalty()" */}
                  <input
                    type="number"
                    placeholder="5"
                    className="w-50 color-text font-weight-semiboldn h-100 royalty-element-input"
                  />
                  <label className="w-50 h-100 background-secondary flex-center royalty-element-label fs-25px font-weight-semiboldn">
                    %
                  </label>
                </div>
                <label className="color-light fs-12-responsive mt-10px ml-5px">
                  The royalty your coin holders will receive.
                </label>
              </div>
            </div>
          </div>
          {/* <!-- Additional Details --> */}
          <button className="text-color-3 p-0px optional-extras-button font-weight-semiboldn mint-page-flex-start text-align-start mb-20px mt-15px fs-14-responsive ml-5px">
            Add Royalty Splits
            <div className="optional-box">
              <p className="optional-text">OPTIONAL</p>
            </div>
            <label className="switch mb-0px">
              {/* (click)="handleAdditionalRoyaltiesClicked()" */}
              <input type="checkbox" id="additional-royalty-checkbox" />
              <span className="slider round"></span>
            </label>
          </button>
          {/* [ngClass]="extrasOpen ? 'big' : ''" */}
          <div className="accordion w-100 disable-scrollbars">
            <div className="d-flex flex-row">
              <label className="text-color-3 font-weight-semiboldn ml-5px mb-0px mr-5px">
                Creator Royalty Split
              </label>
              <img
                src="/assets/icons/warning_circle_icon.svg"
                alt="info icon"
              />
            </div>
            <div className="d-flex flew-row justify-content-between align-items-end w-100 mt-10px">
              <div className="d-flex flex-column w-50 position-relative">
                <label className="font-weight-semiboldn text-color-4 ml-5px fs-12px mb-5px">
                  CREATOR
                </label>
                <div className="search-bar-cover-mint position-relative">
                  {/* <search-bar
              *ngIf="!currentlySelectedAdditionalCreatorRoyalty"
              class="sb w-100"
              [showCloutavista]="false"
              (creatorToMessage)="_handleCreatorRoyaltyCreatorSelectedInSearch($event)"
              [mintSearchBar]="true"
              [isSearchForUsersToSendDESO]="true"
            ></search-bar> */}

                  {/* *ngIf="currentlySelectedAdditionalCreatorRoyalty"
              (click)="removeCurrentlySelectedCreatorRoyalty()" */}
                  <button className="d-flex flex-row flex-center-start currently-selected-royalty">
                    <img
                      src="/assets/icons/cas_x_icon.svg"
                      className="mr-5px"
                      alt="x icon"
                    />
                    {currentlySelectedAdditionalCreatorRoyalty?.Username
                      ? currentlySelectedAdditionalCreatorRoyalty.Username
                      : currentlySelectedAdditionalCreatorRoyalty.PublicKeyBase58Check}
                  </button>
                </div>
              </div>

              <div className="d-flex flex-column w-20">
                <label className="font-weight-semiboldn text-color-4 ml-5px fs-12px mb-5px">
                  ROYALTY
                </label>
                <div className="d-flex flex-row mint-page-royalty-split-element position-relative">
                  {/* [(ngModel)]="additionalCreatorRoyaltyPercentage" */}
                  <input
                    type="number"
                    placeholder="1"
                    min="1"
                    max="100"
                    className="w-50 color-text font-weight-semiboldn h-100 royalty-split-element-input"
                  />
                  <label className="w-50 h-100 background-secondary flex-center royalty-element-label fs-25px font-weight-semiboldn">
                    %
                  </label>
                </div>
              </div>
              {/* (click)="addNewDesoRoyaltyPreStep()" */}
              <button className="additional-royalty-add-button">
                <img src="/assets/icons/add_user_icon.svg" alt="add user" />
                Add
              </button>
            </div>
            {/* *ngIf="errorInSelectedCreatorRoyaltyReceiver != ''" */}
            <div className="fs-15px fc-red pt-15px">
              {errorInSelectedCreatorRoyaltyReceiver}
            </div>
            {/* *ngFor="let additionalDESORoyalty of additionalDESORoyalties; let ii = index" */}
            {/* <ng-container
        class="d-flex flex-row justify-content-between"
      > */}
            <div className="d-flex flex-row align-items-center mt-15px justify-content-between w-100">
              {/* <!-- SELECTED CREATOR ROYALTY --> */}
              <div className="selected-additional-royalty w-70">
                {/* [avatar]="additionalDESORoyalty.PublicKeyBase58Check" */}
                <div className="additional-royalty-avatar"></div>
                <p className="additional-royalty-name">
                  @
                  {additionalDESORoyalty?.Username
                    ? additionalDESORoyalty.Username
                    : additionalDESORoyalty.PublicKeyBase58Check}
                </p>
                <div className="additional-royalty-percentage">
                  {additionalDESORoyalty.RoyaltyPercent} %
                </div>
              </div>
              {/* (click)="deleteRoyalty(additionalDESORoyalties, ii)" */}
              <button className="additional-royalty-remove-button">
                <img src="/assets/icons/remove_user_icon.svg" alt="add user" />
                Remove
              </button>
            </div>
            {/* </ng-container> */}
            <div className="d-flex flex-row mt-20px">
              <label className="text-color-3 font-weight-semiboldn ml-5px mb-0px mr-5px">
                Coin Holder Royalty Split
              </label>
              <img
                src="/assets/icons/warning_circle_icon.svg"
                alt="info icon"
              />
            </div>
            <div className="d-flex flew-row justify-content-between align-items-end w-100 mt-10px">
              <div className="d-flex flex-column w-50 position-relative">
                <label className="font-weight-semiboldn text-color-4 ml-5px fs-12px mb-5px">
                  CREATOR
                </label>
                <div className="search-bar-cover-mint position-relative">
                  {/* <search-bar
              *ngIf="!currentlySelectedAdditionalCoinRoyalty"
              class="sb w-100"
              [showCloutavista]="false"
              (creatorToMessage)="_handleCoinRoyaltyCreatorSelectedInSearch($event)"
              [mintSearchBar]="true"
              [isSearchForUsersToSendDESO]="true"
            ></search-bar> */}

                  {/* *ngIf="currentlySelectedAdditionalCoinRoyalty"
              (click)="removeCurrentlySelectedCoinRoyalty()" */}
                  <button className="d-flex flex-row flex-center-start currently-selected-royalty">
                    <img
                      src="/assets/icons/cas_x_icon.svg"
                      className="mr-5px"
                      alt="x icon"
                    />
                    {currentlySelectedAdditionalCoinRoyalty?.Username
                      ? currentlySelectedAdditionalCoinRoyalty.Username
                      : currentlySelectedAdditionalCoinRoyalty.PublicKeyBase58Check}
                  </button>
                </div>
              </div>

              <div className="d-flex flex-column w-20">
                <label className="font-weight-semiboldn text-color-4 ml-5px fs-12px mb-5px">
                  ROYALTY
                </label>
                <div className="d-flex flex-row mint-page-royalty-split-element position-relative">
                  {/* [(ngModel)]="additionalCoinRoyaltyPercentage" */}
                  <input
                    type="number"
                    placeholder="1"
                    min="1"
                    max="100"
                    className="w-50 color-text font-weight-semiboldn h-100 royalty-split-element-input"
                  />
                  <label className="w-50 h-100 background-secondary flex-center royalty-element-label fs-25px font-weight-semiboldn">
                    %
                  </label>
                </div>
              </div>
              {/* (click)="addNewCoinRoyaltyPreStep()" */}
              <button className="additional-royalty-add-button">
                <img src="/assets/icons/add_user_icon.svg" alt="add user" />
                Add
              </button>
            </div>
            {/* *ngIf="errorInSelectedCoinRoyaltyReceiver !== ''" */}
            <div className="fs-15px fc-red pt-15px">
              {errorInSelectedCoinRoyaltyReceiver}
            </div>
            {/* *ngFor="let additionalCoinRoyalty of additionalCoinRoyalties; let ii = index" */}
            {/* <ng-container > */}
            <div className="d-flex flex-row align-items-center mt-15px justify-content-between w-100">
              {/* <!-- SELECTED CREATOR ROYALTY --> */}
              <div className="selected-additional-royalty w-70">
                {/* [avatar]="additionalCoinRoyalty.PublicKeyBase58Check" */}
                <div className="additional-royalty-avatar"></div>
                <p className="additional-royalty-name">
                  @
                  {additionalCoinRoyalty?.Username
                    ? additionalCoinRoyalty.Username
                    : additionalCoinRoyalty.PublicKeyBase58Check}
                </p>
                <div className="additional-royalty-percentage">
                  {additionalCoinRoyalty.RoyaltyPercent} %
                </div>
              </div>
              {/* (click)="deleteRoyalty(additionalCoinRoyalties, ii)" */}
              <button className="additional-royalty-remove-button">
                <img src="/assets/icons/remove_user_icon.svg" alt="add user" />
                Remove
              </button>
            </div>
            {/* </ng-container> */}
          </div>
          <div className="w-100">
            <label className="font-weight-semiboldn text-align-start fs-14-responsive mt-10px ml-5px">
              <img src="assets/img/lock.png" className="mr-10px" />
              Add unlockable content
            </label>
            {/* [ngClass]="UNLOCKABLE_CONTENT ? 'electric-border' : ''"
        (click)="setUnlockable()" */}
            <button className="d-flex flex-row mint-page-checkbox-button mint-flex-end position-relative">
              <div className="mb-0px cursor-pointer d-flex flex-row w-20 flex-center background-darker-light mint-page-position-absolute-label fs-14-responsive">
                {/* [checked]="UNLOCKABLE_CONTENT" */}
                <input
                  type="checkbox"
                  className="mint-page-button-input display-none mr-10px"
                />
                <p className="checkbox-input-text">
                  {UNLOCKABLE_CONTENT ? "YES" : "NO"}
                </p>
              </div>
              <label className="w-80 h-100 cursor-pointer text-color-1 mb-0px pl-10px pr-10px mint-boolean-label fs-11-responsive">
                Include exclusive text, like a URL, encrypted for NFT purchases.
                Uploaded once you sell or transfer the NFT
              </label>
            </button>
            <label className="font-weight-semiboldn fs-14-responsive text-align-start ml-5px mt-20px">
              <img
                src="assets/icons/marketplace-icon.svg"
                className="mr-10px"
              />
              Put your NFT for sale
            </label>
            {/* [ngClass]="PUT_FOR_SALE ? 'electric-border' : ''"
        (click)="setForSale()" */}
            <button className="d-flex cursor-pointer mb-15px flex-row mint-page-checkbox-button mint-flex-end position-relative">
              <div className="d-flex flex-row flex-center background-darker-light h-100 w-20 mint-page-position-absolute-label fs-14-responsive">
                {/* [checked]="PUT_FOR_SALE" */}
                <input
                  type="checkbox"
                  className="mint-page-button-input display-none mr-10px"
                />
                <p className="checkbox-input-text">
                  {PUT_FOR_SALE ? "YES" : "NO"}
                </p>
              </div>
              <label className="w-80 h-100 cursor-pointer text-color-1 mb-0px pl-10px pr-10px mint-boolean-label fs-11-responsive">
                If you don't put the NFT for sale, no one is able to place bids
                on it.
              </label>
            </button>
          </div>
        </div>
        {/* [ngClass]="mobile ? 'w-90' : 'w-80'"
    [disabled]="isSubmitPress || !this.isPostReady() || hasUnreasonableRoyalties() || hasUnreasonableMinBidAmount()"
    (click)="_createPost()" */}
        <button className="mt-20px font-weight-semiboldn mint-page-step-2-continue">
          {/* *ngIf="!isSubmitPress" */}
          <label className="mb-0px">Mint your NFT</label>
          {/* *ngIf="isSubmitPress" */}
          <i className="fa fa-spinner fa-spin"></i>
        </button>
      </div>

      {/* <!--  STEP 4 buy now -->
 [@mintSwipeAnimation]="animationType"
   *ngIf="!openAuction && isBuyNow"
[ngClass]="mobile ? 'w-100' : 'w-50'" */}
      <div className="mint-page-text-container-no-max h-95">
        {/* [ngClass]="mobile ? 'w-90' : 'w-80'" */}
        <div className="mint-page-inner-inner disable-scrollbars">
          {/* (click)="previousStep()" */}
          <button className="previous-step-button color-light">
            <img
              className="previous-step-arrow mr-5px"
              src="/assets/icons/arrow-left-lighter.svg"
            />
            Back
          </button>
          <h2 className="mb-5px font-weight-semiboldn w-100 text-align-start fs-23-responsive ml-5px">
            Mint your NFT
          </h2>
          <div className="w-100 mt-5px">
            <label className="mb-0px font-weight-semiboldn w-100 fs-14-responsive text-align-start ml-5px">
              Buy now price
            </label>
            {/* <!-- <button (click)="testDisabled()">test disabled button</button> --> */}
            <label className="color-light fs-12-responsive mb-0px ml-5px mt-5px">
              Set a fixed price that your NFT can be immediately sold at.
            </label>
            <div className="position-relative d-flex flex-row flex-start w-100 mint-page-min-price mt-10px">
              {/* [(ngModel)]="buyNowPriceDESO"
          (ngModelChange)="updateBuyNowBidAmountUSD($event)" */}
              <input
                matInput
                type="number"
                placeholder="0"
                className="pl-10px color-text font-weight-semiboldn flex-center pr-10px mint-page-min-price-input m-0px h-100 w-60"
              />
              <button className="mint-page-min-price-label h-100 w-40 fs-23-responsive pt-5px">
                <img
                  src="assets/deso/logo-cropped.png"
                  className="mr-10px mb-5px mint-page-deso-logo"
                />
                <label className="mb-0px">$DESO</label>
              </button>
            </div>
            <div className="mint-page-deso-to-usd mt-5px ml-20px w-90">
              {/* *ngIf="BUY_NOW_PRICE_USD" */}
              <label className="mb-0px fs-20-responsive">
                ${BUY_NOW_PRICE_USD}
              </label>
            </div>

            {/* <!-- div for add minimum bid --> */}
            <div className="d-flex flex-row mt-5px">
              <label className="mb-0px font-weight-semiboldn fs-14-responsive text-align-start ml-5px">
                Add minimum bid
              </label>
              <div className="optional-box">
                <p className="optional-text">OPTIONAL</p>
              </div>
              <label className="switch">
                {/* (click)="handleMinBidClicked()" */}
                <input type="checkbox" id="checkbox-min-bid" />
                <span className="slider round"></span>
              </label>
            </div>
            <label className="color-light fs-12-responsive mb-0px ml-5px mt-5px">
              In addition to the Buy Now Price, you can set up a minimum bid
              price which is lower than the Buy Now price.
            </label>
            {/* [ngClass]="{ big: minBidClicked }" */}
            <div className="buy-now-price-accordion disable-scrollbars">
              <div className="position-relative d-flex flex-row flex-start w-100 mint-page-min-price mt-10px">
                {/* [(ngModel)]="MIN_PRICE"
            (ngModelChange)="updateBidAmountUSD($event)" */}
                <input
                  matInput
                  type="number"
                  placeholder="0"
                  className="pl-10px color-text font-weight-semiboldn flex-center pr-10px mint-page-min-price-input m-0px h-100 w-60"
                  id="optional-min-bid"
                />
                <button className="mint-page-min-price-label h-100 w-40 fs-23-responsive pt-5px">
                  <img
                    src="assets/deso/logo-cropped.png"
                    className="mr-10px mb-5px mint-page-deso-logo"
                  />
                  <label className="mb-0px">$DESO</label>
                </button>
              </div>
              <div className="mint-page-deso-to-usd mt-5px ml-20px w-90">
                {/* *ngIf="PRICE_USD" */}
                <label className="mb-0px fs-20-responsive">${PRICE_USD}</label>
              </div>
            </div>
            {/* <!-- Additional Details --> */}
            <button className="text-color-3 p-0px optional-extras-button font-weight-semiboldn mint-page-flex-start text-align-start mb-20px mt-15px fs-14-responsive ml-5px">
              Add Royalty Splits
              <div className="optional-box">
                <p className="optional-text">OPTIONAL</p>
              </div>
              <label className="switch mb-0px">
                {/* (click)="handleAdditionalRoyaltiesClicked() */}
                <input type="checkbox" id="additional-royalty-checkbox" />
                <span className="slider round"></span>
              </label>
            </button>
            {/*[ngClass]="extrasOpen ? 'big' : ''"  */}
            <div className="accordion w-100 disable-scrollbars">
              <div className="d-flex flex-row">
                <label className="text-color-3 font-weight-semiboldn ml-5px mb-0px mr-5px">
                  Creator Royalty Split
                </label>
                <img
                  src="/assets/icons/warning_circle_icon.svg"
                  alt="info icon"
                />
              </div>
              <div className="d-flex flew-row justify-content-between align-items-end w-100 mt-10px">
                <div className="d-flex flex-column w-50 position-relative">
                  <label className="font-weight-semiboldn text-color-4 ml-5px fs-12px mb-5px">
                    CREATOR
                  </label>
                  <div className="search-bar-cover-mint position-relative">
                    {/* <search-bar
                *ngIf="!currentlySelectedAdditionalCreatorRoyalty"
                class="sb w-100"
                [showCloutavista]="false"
                (creatorToMessage)="_handleCreatorRoyaltyCreatorSelectedInSearch($event)"
                [mintSearchBar]="true"
                [isSearchForUsersToSendDESO]="true"
              ></search-bar> */}
                    {/* *ngIf="currentlySelectedAdditionalCreatorRoyalty"
                (click)="removeCurrentlySelectedCreatorRoyalty()" */}
                    <button className="d-flex flex-row flex-center-start currently-selected-royalty">
                      <img
                        src="/assets/icons/cas_x_icon.svg"
                        className="mr-5px"
                        alt="x icon"
                      />
                      {currentlySelectedAdditionalCreatorRoyalty?.Username
                        ? currentlySelectedAdditionalCreatorRoyalty.Username
                        : currentlySelectedAdditionalCreatorRoyalty.PublicKeyBase58Check}
                    </button>
                  </div>
                </div>

                <div className="d-flex flex-column w-20">
                  <label className="font-weight-semiboldn text-color-4 ml-5px fs-12px mb-5px">
                    ROYALTY
                  </label>
                  <div className="d-flex flex-row mint-page-royalty-split-element position-relative">
                    {/* [(ngModel)]="additionalCreatorRoyaltyPercentage" */}
                    <input
                      type="number"
                      placeholder="1"
                      min="1"
                      max="100"
                      className="w-50 color-text font-weight-semiboldn h-100 royalty-split-element-input"
                    />
                    <label className="w-50 h-100 background-secondary flex-center royalty-element-label fs-25px font-weight-semiboldn">
                      %
                    </label>
                  </div>
                </div>
                {/* (click)="addNewDesoRoyaltyPreStep()" */}
                <button className="additional-royalty-add-button">
                  <img src="/assets/icons/add_user_icon.svg" alt="add user" />
                  Add
                </button>
              </div>
              {/* *ngIf="errorInSelectedCreatorRoyaltyReceiver != ''" */}
              <div className="fs-15px fc-red pt-15px">
                {errorInSelectedCreatorRoyaltyReceiver}
              </div>
              {/* *ngFor="let additionalDESORoyalty of additionalDESORoyalties; let ii = index" */}
              <ng-container class="d-flex flex-row justify-content-between">
                <div className="d-flex flex-row align-items-center mt-15px justify-content-between w-100">
                  {/* <!-- SELECTED CREATOR ROYALTY --> */}
                  <div className="selected-additional-royalty w-70">
                    {/* [avatar]="additionalDESORoyalty.PublicKeyBase58Check" */}
                    <div className="additional-royalty-avatar"></div>
                    <p className="additional-royalty-name">
                      @
                      {additionalDESORoyalty?.Username
                        ? additionalDESORoyalty.Username
                        : additionalDESORoyalty.PublicKeyBase58Check}
                    </p>
                    <div className="additional-royalty-percentage">
                      {additionalDESORoyalty.RoyaltyPercent} %
                    </div>
                  </div>
                  {/* (click)="deleteRoyalty(additionalDESORoyalties, ii)" */}
                  <button className="additional-royalty-remove-button">
                    <img
                      src="/assets/icons/remove_user_icon.svg"
                      alt="add user"
                    />
                    Remove
                  </button>
                </div>
              </ng-container>
              <div className="d-flex flex-row mt-20px">
                <label className="text-color-3 font-weight-semiboldn ml-5px mb-0px mr-5px">
                  Coin Holder Royalty Split
                </label>
                <img
                  src="/assets/icons/warning_circle_icon.svg"
                  alt="info icon"
                />
              </div>
              <div className="d-flex flew-row justify-content-between align-items-end w-100 mt-10px">
                <div className="d-flex flex-column w-50 position-relative">
                  <label className="font-weight-semiboldn text-color-4 ml-5px fs-12px mb-5px">
                    CREATOR
                  </label>
                  <div className="search-bar-cover-mint position-relative">
                    {/* <search-bar
                *ngIf="!currentlySelectedAdditionalCoinRoyalty"
                class="sb w-100"
                [showCloutavista]="false"
                (creatorToMessage)="_handleCoinRoyaltyCreatorSelectedInSearch($event)"
                [mintSearchBar]="true"
                [isSearchForUsersToSendDESO]="true"
              ></search-bar> */}
                    {/* *ngIf="currentlySelectedAdditionalCoinRoyalty"
                (click)="removeCurrentlySelectedCoinRoyalty()" */}
                    <button className="d-flex flex-row flex-center-start currently-selected-royalty">
                      <img
                        src="/assets/icons/cas_x_icon.svg"
                        className="mr-5px"
                        alt="x icon"
                      />
                      {currentlySelectedAdditionalCoinRoyalty?.Username
                        ? currentlySelectedAdditionalCoinRoyalty.Username
                        : currentlySelectedAdditionalCoinRoyalty.PublicKeyBase58Check}
                    </button>
                  </div>
                </div>

                <div className="d-flex flex-column w-20">
                  <label className="font-weight-semiboldn text-color-4 ml-5px fs-12px mb-5px">
                    ROYALTY
                  </label>
                  <div className="d-flex flex-row mint-page-royalty-split-element position-relative">
                    {/* [(ngModel)]="additionalCoinRoyaltyPercentage" */}
                    <input
                      type="number"
                      placeholder="1"
                      min="1"
                      max="100"
                      className="w-50 color-text font-weight-semiboldn h-100 royalty-split-element-input"
                    />
                    <label className="w-50 h-100 background-secondary flex-center royalty-element-label fs-25px font-weight-semiboldn">
                      %
                    </label>
                  </div>
                </div>
                {/* (click)="addNewCoinRoyaltyPreStep()" */}
                <button className="additional-royalty-add-button">
                  <img src="/assets/icons/add_user_icon.svg" alt="add user" />
                  Add
                </button>
              </div>
              {/* *ngIf="errorInSelectedCoinRoyaltyReceiver !== ''" */}
              <div className="fs-15px fc-red pt-15px">
                {errorInSelectedCoinRoyaltyReceiver}
              </div>
              {/* <ng-container *ngFor="let additionalCoinRoyalty of additionalCoinRoyalties; let ii = index"> */}
              <div className="d-flex flex-row align-items-center mt-15px justify-content-between w-100">
                {/* <!-- SELECTED CREATOR ROYALTY --> */}
                <div className="selected-additional-royalty w-70">
                  {/* [avatar]="additionalCoinRoyalty.PublicKeyBase58Check" */}
                  <div className="additional-royalty-avatar"></div>
                  <p className="additional-royalty-name">
                    @
                    {additionalCoinRoyalty?.Username
                      ? additionalCoinRoyalty.Username
                      : additionalCoinRoyalty.PublicKeyBase58Check}
                  </p>
                  <div className="additional-royalty-percentage">
                    {additionalCoinRoyalty.RoyaltyPercent} %
                  </div>
                </div>
                {/* (click)="deleteRoyalty(additionalCoinRoyalties, ii)" */}
                <button className="additional-royalty-remove-button">
                  <img
                    src="/assets/icons/remove_user_icon.svg"
                    alt="add user"
                  />
                  Remove
                </button>
              </div>
              {/* </ng-container> */}
            </div>

            <div className="d-flex flex-row justify-content-space-between mt-5px">
              <div className="w-40">
                <label className="font-weight-semiboldn ml-5px fs-14-responsive text-oneline">
                  Creator Royalty
                </label>
                <div className="d-flex flex-row mint-page-royalty-element position-relative">
                  {/* [(ngModel)]="CREATOR_ROYALTY" */}
                  <input
                    type="number"
                    placeholder="5"
                    className="w-50 color-text font-weight-semiboldn h-100 royalty-element-input"
                  />
                  <button className="w-50 h-100 background-secondary text-color-3 flex-center royalty-element-label fs-23-responsive font-weight-semiboldn">
                    %
                  </button>
                </div>
                <label className="color-light fs-12-responsive mt-10px ml-5px">
                  The royalty you as an artist will receive.
                </label>
              </div>
              <div className="w-40">
                <label className="font-weight-semiboldn ml-5px fs-14-responsive">
                  Coin Royalty
                </label>
                <div className="d-flex flex-row mint-page-royalty-element position-relative">
                  {/* [(ngModel)]="COIN_ROYALTY" */}
                  <input
                    type="number"
                    placeholder="5"
                    className="w-50 color-text font-weight-semiboldn h-100 royalty-element-input"
                  />
                  <label className="w-50 h-100 background-secondary text-color-1 flex-center royalty-element-label fs-25px font-weight-semiboldn">
                    %
                  </label>
                </div>
                <label className="color-light fs-12-responsive mt-10px ml-5px">
                  The royalty your coin holders will receive.
                </label>
              </div>
            </div>
          </div>
          <div className="w-100">
            <label className="font-weight-semiboldn text-align-start fs-14-responsive mt-10px ml-5px">
              <img src="assets/img/lock.png" className="mr-10px" />
              Add unlockable content
            </label>
            <div className="d-flex flex-row mint-page-checkbox-button mint-flex-end position-relative">
              <div className="mb-0px d-flex flex-row w-20 flex-center background-darker-light mint-page-position-absolute-label fs-14-responsive">
                <img
                  src="../../assets/img/info.png"
                  className="info-img mr-10px"
                  alt="info"
                />
              </div>
              <label className="w-80 h-100 mb-0px pl-10px pr-10px mint-boolean-label fs-11-responsive background-darker-light">
                You cannot unfortunately cannot add unlockable content to NFTs
                which are sold with the Buy Now format.
              </label>
            </div>
            <label className="font-weight-semiboldn fs-14-responsive text-align-start ml-5px mt-20px">
              <img
                src="assets/icons/marketplace-icon.svg"
                className="mr-10px"
              />
              Put your NFT for sale
            </label>
            {/* [ngClass]="PUT_FOR_SALE ? 'electric-border' : ''"
        (click)="PUT_FOR_SALE = !PUT_FOR_SALE" */}
            <button className="d-flex cursor-pointer mb-15px flex-row mint-page-checkbox-button mint-flex-end position-relative">
              <div className="d-flex flex-row flex-center background-darker-light h-100 w-20 mint-page-position-absolute-label fs-14-responsive">
                {/* [checked]="PUT_FOR_SALE" */}
                <input
                  type="checkbox"
                  className="mint-page-button-input display-none mr-10px"
                />
                <p className="checkbox-input-text">
                  {PUT_FOR_SALE ? "YES" : "NO"}
                </p>
              </div>
              <label className="w-80 h-100 cursor-pointer text-color-1 mb-0px pl-10px pr-10px mint-boolean-label fs-11-responsive">
                If you don't put the NFT for sale, no one is able to place bids
                on it.
              </label>
            </button>
          </div>
        </div>
        {/* [ngClass]="mobile ? 'w-90' : 'w-80'"
    [disabled]="
      isSubmitPress ||
      !this.isPostReady() ||
      hasUnreasonableRoyalties() ||
      hasUnreasonableBuyNowPrice() ||
      hasAdditionalRoyaltyError()
    "
    (click)="_createPost()" */}
        <button className="mt-20px font-weight-semiboldn mint-page-step-2-continue">
          {/* *ngIf="!isSubmitPress" */}
          <label className="mb-0px">Mint your NFT</label>
          {/* *ngIf="isSubmitPress" */}
          <i className="fa fa-spinner fa-spin"></i>
        </button>
      </div>
    </>
  );
};
export default StepThreeDeso;
