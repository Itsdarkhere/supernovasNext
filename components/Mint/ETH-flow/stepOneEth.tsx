import styles from "../../../styles/Mint/stepOneEth.module.scss";

const StepOneEth = () => {
  // <!--  STEP 2  -->
  //  [@mintSwipeAnimation]="animationType"
  // [ngClass]="mobile ? 'w-100' : 'w-50'"
  return (
    <div className="mint-page-text-container-no-max h-100">
      {/* [ngClass]="mobile ? 'w-90' : 'w-80' */}
      <div className="mint-page-inner-inner disable-scrollbars">
        {/*(click)="previousStepEth()"*/}
        <button className="previous-step-button color-light">
          <img
            className="previous-step-arrow mr-5px"
            src="/assets/icons/arrow-left-lighter.svg"
          />
          Back
        </button>
        <h2 className="mb-0px fs-23-responsive font-weight-semiboldn w-100 text-align-start ml-5px">
          NFT details
        </h2>
        {/* <!-- IMAGE TYPE --> */}
        <div className="w-100">
          <label className="font-weight-semiboldn w-100 text-align-start mt-10px ml-5px fs-14-responsive">
            Upload an Image
          </label>
          {/* (onFileDropped)="dropFile($event)" */}
          <label
            dropUpload
            htmlFor="file-upload"
            className="mint-page-custom-file-upload mb-0px background-secondary d-flex flex-row flex-center position-relative"
          >
            {/* *ngIf="!isUploading && !(postImageArweaveSrc?.length > 0)" */}
            <div className="text-align-center d-flex flex-column flex-center">
              <span className="font-weight-semiboldn fs-14-responsive">
                <img
                  src="/assets/icons/upload.svg"
                  alt="upload-icon"
                  className="mr-5px"
                />
                Upload an Image
              </span>
              {/* [ngClass]="mobile ? 'w-90' : 'w-80'" */}
              <p className="fs-12px p-5px" style="color: #7e7e7e">
                You can upload files up to 200MB. The file is stored on
                decentralized storage, so it will be available forever.
              </p>
            </div>
            {/* *ngIf="postImageArweaveSrc?.length > 0" */}
            <div className="d-flex flex-row flex-center">
              <i className="fa fa-check mr-10px"></i>
              <p>Image uploaded</p>
            </div>
            {/* *ngIf="isUploading" */}
            <i className="fa fa-spinner fa-spin"></i>
          </label>
          {/*  #imageInput 
      (change)="_handleFilesInput($event.target.files)"
      */}
          <input
            type="file"
            accept="image/*"
            id="file-upload"
            className="br-6px"
          />
        </div>
        <div className="w-100">
          <label className="fs-14-responsive font-weight-semiboldn w-100 text-align-start mt-10px mb-0px ml-5px">
            Name your art piece
          </label>
          <label className="color-light ml-5px fs-12-responsive">
            Give your NFT a name in 25 characters or less.
          </label>
          {/* [(ngModel)]="NAME_OF_PIECE"
        (ngModelChange)="setName()" */}
          <input
            type="text"
            maxLength="30"
            className="w-100 br-6px fs-12-responsive mint-page-input-minh"
            placeholder="Name of art"
          />
        </div>
        <div className="w-100 mt-10px">
          <label className="font-weight-semiboldn w-100 text-align-start mb-0px ml-5px fs-14-responsive">
            Description
          </label>
          <label className="color-light ml-5px fs-12-responsive">
            Describe your art piece in 500 characters or less.
          </label>
          {/* [(ngModel)]="DESCRIPTION"
        (ngModelChange)="setDescription()" */}
          <textarea
            className="w-100 br-6px fs-12-responsive mint-page-textarea"
            maxLength="500"
            placeholder="Art description"
          ></textarea>
        </div>
        <div className="w-100 mt-10px">
          <label className="font-weight-semiboldn w-100 text-align-start mb-0px fs-14-responsive ml-5px">
            Category
          </label>
          <label className="color-light ml-5px fs-12-responsive">
            Select a fitting category so collectors are able to discover your
            work.
          </label>
          {/* [(ngModel)]="CATEGORY"
        (ngModelChange)="setCategory()" */}
          <select className="br-6px fs-12-responsive pt-5px pb-5px color-light w-50 mint-page-select-category">
            {/* [ngValue]="null" */}
            <option disabled hidden selected>
              Select category
            </option>
            <option value="Art">Art</option>
            <option value="Collectibles">Collectibles</option>
            <option value="Generative Art">Generative Art</option>
            <option value="Metaverse & Gaming">Metaverse & Gaming</option>
            <option value="Music">Music</option>
            <option value="Profile Picture">Profile Picture</option>
            <option value="Photography">Photography</option>
          </select>
        </div>
        <div className="d-flex flex-row justify-content-space-between mt-20px">
          <div className="w-100 d-flex flex-column">
            <label className="font-weight-semiboldn ml-5px mb-0px fs-14-responsive">
              Creator Royalty
            </label>
            <label className="color-light fs-12-responsive ml-5px">
              The royalty you as an artist will receive.
            </label>
            <div className="d-flex flex-row mint-page-royalty-element w-50 mb-10px position-relative">
              {/* [(ngModel)]="CREATOR_ROYALTY"
            (ngModelChange)="updateRoyaltyETH($event)" */}
              <input
                type="number"
                placeholder="5"
                className="w-50 color-text font-weight-semiboldn h-100 royalty-element-input"
              />
              <button className="w-50 h-100 background-secondary flex-center royalty-element-label fs-23-responsive font-weight-semiboldn">
                %
              </button>
            </div>
          </div>
        </div>
        {/* <!-- <button (click)="logPriceAndRoyalty()">Click me</button> --> */}
      </div>
      {/* [ngClass]="mobile ? 'w-90' : 'w-80'"
    [disabled]="
      !isDescribed() ||
      !(postImageArweaveSrc?.length > 0) ||
      !isNamed() ||
      !isCategorized() ||
      hasUnreasonableEthRoyalties()
    "
    (click)="nextStepEth()" */}
      <button className="mb-0px font-weight-semiboldn mint-page-step-2-continue">
        Continue
      </button>
    </div>
  );
};
export default StepOneEth;
