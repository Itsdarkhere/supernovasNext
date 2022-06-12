import styles from "../../../styles/Mint/rightSideOneDeso.module.scss";
import { transformVideoURL } from "../../../utils/sanitizeVideoURL";

const RightSideOneDeso = () => {
  // <!-- LEFT SIDE DESKTOP STEPS 1 - 2 -->
  // <!-- This is not just the left? -->
  return (
    <div className="mint-page-image-container d-flex flex-column flex-center">
      {/* <!-- ALLOW IF ARWEAVE PROBLEMS --> */}

      {!postImageArweaveSrc && !postVideoDESOSrc && !audioType && !modelType ? (
        <label className="mb-0px illuminate-color pr-20px pl-20px text-align-center">
          Illuminate the digital universe with your imagination.
          <br />
          And never stop.
        </label>
      ) : null}

      {(audioType || modelType) && step === 2 ? (
        <label className="mb-0px illuminate-color pr-20px pl-20px text-align-center">
          Illuminate the digital universe with your imagination.
          <br />
          And never stop.
        </label>
      ) : null}

      {postImageArweaveSrc ? (
        <div className="mint-page__image-container m-w-80">
          {/* (click)="removeImage()" */}
          <i className="icon-close feed-post__image-delete"></i>
          <img
            className="feed-post__image br-0px"
            src="{{ postImageArweaveSrc }}"
          />
        </div>
      ) : null}

      {/* <!-- Video Player --> */}
      {postVideoDESOSrc && readyToStream ? (
        <div className="feed-post__video-container m-w-80">
          <iframe
            allowFullScreen
            src={transformVideoURL() ? postVideoDESOSrc : null}
            allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;"
            className="feed-post__video"
          ></iframe>
        </div>
      ) : null}

      {videoUploadPercentage !== null ? (
        <div className="d-flex flex-column align-items-center">
          <div>Uploading: {videoUploadPercentage}% Complete</div>
          {/* <mat-progress-bar [value]="videoUploadPercentage" [mode]="'determinate'"></mat-progress-bar> */}
        </div>
      ) : null}

      {postVideoDESOSrc && !readyToStream ? (
        <div className="d-flex flex-column align-items-center">
          <div>Video Processing In Progress</div>
          {/* <simple-center-loader [height]="150"></simple-center-loader> */}
        </div>
      ) : null}

      {/* <!-- Audio Upload Cover Image + Preview -->
  <!-- If no audio uploaded, show input area -->*/}
      {audioType && !postImageArweaveSrc && step === 3 ? (
        <div className="w-100 h-50 d-flex flex-center">
          {/* dropUpload
    (onFileDropped)="dropFileCoverImage($event)" */}
          <label
            htmlFor="file-upload-cover-image"
            className="mint-page-custom-file-audio-right mb-0px background-white d-flex flex-row flex-center position-relative"
          >
            {!isCoverImageUploading && !(postImageArweaveSrc?.length > 0) ? (
              <div className="text-align-center h-100 d-flex flex-column flex-center">
                <div className="audio-cover-img-box mb-20px d-flex flex-column flex-center">
                  <img src="/assets/icons/audio-icon-small.svg" />
                  <p className="font-weight-semiboldn mt-10px fs-12px">
                    Cover Image
                  </p>
                </div>
                <span className="font-weight-semiboldn fs-14-responsive">
                  <img
                    src="/assets/icons/upload.svg"
                    alt="upload-icon"
                    className="mr-5px"
                  />
                  Upload a cover photo for your audio
                </span>
                <p
                  className={["fs-12px p-5px", mobile ? "w-90" : "w-80"].join(
                    " "
                  )}
                  style={{ color: "#7e7e7e" }}
                >
                  For optimal results, please upload 500px x 500px. Cover photo
                  will show in NFT card and NFT profile on Supernovas.
                </p>
              </div>
            ) : null}

            {isCoverImageUploading ? (
              <i className="fa fa-2x fa-spinner fa-spin"></i>
            ) : null}
          </label>
          {/* #imageInput*/}
          <input
            onChange={(e) => _handleFilesInputCoverImage(e.target.files)}
            type="file"
            accept="image(*"
            id="file-upload-cover-image"
            className="br-6px"
          />
        </div>
      ) : null}

      {/* <!-- 3D Model Upload Cover Image + Preview --> */}
      {modelType && !postImageArweaveSrc && step === 3 ? (
        <div className="w-100 h-50 d-flex flex-center">
          {/* dropUpload
    (onFileDropped)="dropFileCoverImage($event)" */}
          <label
            htmlFor="file-upload-cover-image"
            className="mint-page-custom-file-audio-right mb-0px background-white d-flex flex-row flex-center position-relative"
          >
            {!isCoverImageUploading && !(postImageArweaveSrc?.length > 0) ? (
              <div className="text-align-center h-100 d-flex flex-column flex-center">
                <div className="audio-cover-img-box mb-20px d-flex flex-column flex-center">
                  <img src="/assets/icons/3D-type.png" />
                  <p className="font-weight-semiboldn mt-10px fs-12px">
                    Cover Image
                  </p>
                </div>
                <span className="font-weight-semiboldn fs-14-responsive">
                  <img
                    src="/assets/icons/upload.svg"
                    alt="upload-icon"
                    className="mr-5px"
                  />
                  Upload a cover photo for your 3D model
                </span>
                <p
                  className={["fs-12px p-5px", mobile ? "w-90" : "w-80"].join(
                    " "
                  )}
                  style={{ color: "#7e7e7e" }}
                >
                  For optimal results, please upload 500px x 500px. Cover photo
                  will show in NFT card and NFT profile on Supernovas.
                </p>
              </div>
            ) : null}

            {isCoverImageUploading ? (
              <i className="fa fa-2x fa-spinner fa-spin"></i>
            ) : null}
          </label>
          {/* #imageInput */}
          <input
            onChange={(e) => _handleFilesInputCoverImage(e.target.files)}
            type="file"
            accept="image(*"
            id="file-upload-cover-image"
            className="br-6px"
          />
        </div>
      ) : null}
    </div>
  );
};
export default RightSideOneDeso;
