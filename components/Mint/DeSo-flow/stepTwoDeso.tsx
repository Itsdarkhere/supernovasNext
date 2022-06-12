import styles from "../../../styles/Mint/stepTwoDeso.module.scss";

const StepTwoDeso = () => {
  //     <!--  STEP 3  -->
  //     [@mintSwipeAnimation]="animationType"
  return (
    <div
      className={[
        "mint-page-text-container-no-max h-100",
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

        <h2 className="mb-0px fs-23-responsive font-weight-semiboldn w-100 text-align-start ml-5px">
          NFT details
        </h2>

        {/* // <!-- IMAGE TYPE --> */}
        {imageType ? (
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
              {!isUploading &&
              !(
                postVideoDESOSrc?.length > 0 || postImageArweaveSrc?.length > 0
              ) ? (
                <div className="text-align-center d-flex flex-column flex-center">
                  <span className="font-weight-semiboldn fs-14-responsive">
                    <img
                      src="/assets/icons/upload.svg"
                      alt="upload-icon"
                      className="mr-5px"
                    />
                    Upload an Image
                  </span>
                  <p
                    className={["fs-12px p-5px", mobile ? "w-90" : "w-80"].join(
                      " "
                    )}
                    style={{ color: "#7e7e7e" }}
                  >
                    You can upload files up to 200MB. The file is stored on
                    decentralized storage, so it will be available forever.
                  </p>
                </div>
              ) : null}

              {postImageArweaveSrc?.length > 0 ? (
                <div className="d-flex flex-row flex-center">
                  <i className="fa fa-check mr-10px"></i>
                  <p>Image uploaded</p>
                </div>
              ) : null}

              {isUploading ? <i className="fa fa-spinner fa-spin"></i> : null}
            </label>
            {/*  #imageInput */}
            <input
              onChange={(e) => _handleFilesInput(e.target.files)}
              type="file"
              accept="image(*"
              id="file-upload"
              className="br-6px"
            />
          </div>
        ) : null}

        {/* <!-- VIDEO TYPE --> */}
        {videoType ? (
          <div className="w-100">
            <label className="font-weight-semiboldn w-100 text-align-start mt-10px ml-5px fs-14-responsive">
              Upload a video
            </label>
            {/* (onFileDropped)="dropFile($event)" */}
            <label
              dropUpload
              htmlFor="file-upload"
              className="mint-page-custom-file-upload mb-0px background-secondary d-flex flex-row flex-center"
            >
              {!isUploading && !(postVideoDESOSrc?.length > 0) ? (
                <div className="text-align-center d-flex flex-column flex-center">
                  <span className="font-weight-semiboldn fs-14-responsive">
                    <img
                      src="/assets/icons/upload.svg"
                      alt="upload-icon"
                      className="mr-5px"
                    />
                    Click to upload a video
                  </span>
                  <p
                    className={["fs-12px p-5px", mobile ? "w-90" : "w-80"].join(
                      " "
                    )}
                    style={{ color: "#7e7e7e" }}
                  >
                    You can upload files up to 200MB. The file is stored on
                    decentralized storage, so it will be available forever.
                  </p>
                </div>
              ) : null}

              {postVideoDESOSrc?.length > 0 && readyToStream ? (
                <div className="d-flex flex-row flex-center">
                  <i className="fa fa-check mr-10px"></i>
                  <p>Video uploaded</p>
                </div>
              ) : null}

              {isUploading && !readyToStream ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : null}
            </label>
            {/* #imageInput*/}
            <input
              onChange={(e) => _handleFilesInput(e.target.files)}
              type="file"
              accept="video/*"
              id="file-upload"
              className="br-6px"
            />
          </div>
        ) : null}

        {/* <!-- AUDIO TYPE -->
    <!-- NFT details section --> */}
        {audioType ? (
          <div className="w-100">
            <label className="font-weight-semiboldn w-100 text-align-start mt-10px ml-5px fs-14-responsive">
              {mobile ? "Upload audio & cover image" : "Upload audio"}
            </label>

            <div className="w-100 d-flex flex-row justify-content-between">
              {/* <!-- Audio File Upload Event --> */}
              {/* dropUpload
        (onFileDropped)="dropFile($event)"
        for="file-upload" */}
              <label
                className={[
                  "mint-page-custom-file-upload mb-0px background-secondary d-flex flex-row flex-center",
                  mobile ? "w-45" : "w-100",
                ].join(" ")}
              >
                {!isUploading && !(postAudioArweaveSrc?.length > 0) ? (
                  <div className="text-align-center d-flex flex-column flex-center">
                    <span className="font-weight-semiboldn fs-14-responsive p-5px">
                      <img
                        src="/assets/icons/upload.svg"
                        alt="upload-icon"
                        className="mr-5px"
                      />
                      Upload an MP3
                    </span>
                    {/* [ngClass]="mobile ? 'w-90' : 'w-80'" */}
                    <p className="fs-12px p-5px" style="color: #7e7e7e">
                      {mobile
                        ? "You can upload mp3 files up to 200Mb."
                        : "You can upload files up to 200MB. The file is stored on decentralized storage, so it will be available forever."}
                    </p>
                  </div>
                ) : null}

                {/* <!-- Appears after audio uploads --> */}
                {postAudioArweaveSrc?.length > 0 ? (
                  <div className="d-flex flex-row flex-center">
                    <i className="fa fa-check mr-10px"></i>
                    <p>Audio uploaded</p>
                  </div>
                ) : null}

                {isUploading ? <i className="fa fa-spinner fa-spin"></i> : null}
              </label>
              {/* #imageInput*/}
              <input
                onChange={(e) => _handleFilesInput(e.target.files)}
                type="file"
                accept="audio/*"
                id="file-upload"
                className="br-6px"
              />

              {/* <!-- Mobile details? --> */}
              {/*(onFileDropped)="dropFileCoverImage($event)" */}
              {mobile ? (
                <label
                  dropUpload
                  htmlFor="file-upload-cover-image"
                  className="mint-page-custom-file-upload w-45 mb-0px background-secondary d-flex flex-row flex-center"
                >
                  {!isCoverImageUploading &&
                  !(postImageArweaveSrc?.length > 0) ? (
                    <div className="text-align-center h-100 d-flex flex-column flex-center">
                      <span className="font-weight-semiboldn fs-14-responsive p-5px">
                        <img
                          src="/assets/icons/upload.svg"
                          alt="upload-icon"
                          className="mr-5px"
                        />
                        Upload cover image
                      </span>
                      {/* [ngClass]="mobile ? 'w-90' : 'w-80'" */}
                      <p className="fs-12px p-5px" style="color: #7e7e7e">
                        Cover image will be displayed alongside your audio NFT.
                      </p>
                    </div>
                  ) : null}

                  {isCoverImageUploading ? (
                    <i className="fa fa-2x fa-spinner fa-spin"></i>
                  ) : null}
                </label>
              ) : null}

              {/* #imageInput*/}
              <input
                onChange={(e) =>
                  _handleFilesInputCoverImage($event.target.files)
                }
                type="file"
                accept="image(*"
                id="file-upload-cover-image"
                className="br-6px"
              />
            </div>
          </div>
        ) : null}

        {/* <!-- 3D MODEL TYPE -->
    <!-- NFT details section --> */}
        {modelType ? (
          <div className="w-100">
            <label className="font-weight-semiboldn w-100 text-align-start mt-10px ml-5px fs-14-responsive">
              {mobile ? "Upload 3D model & cover image" : "Upload 3D model"}
            </label>

            <div className="w-100 d-flex flex-row justify-content-between">
              {/* (onFileDropped)="dropFile($event)" 
        [ngClass]="mobile ? 'w-45' : 'w-100'"
        */}
              <label
                dropUpload
                htmlFor="file-upload"
                className="mint-page-custom-file-upload mb-0px background-secondary d-flex flex-row flex-center"
              >
                {!isUploading && !(postModelArweaveSrc?.length > 0) ? (
                  <div className="text-align-center d-flex flex-column flex-center">
                    <span className="font-weight-semiboldn fs-14-responsive p-5px">
                      <img
                        src="/assets/icons/upload.svg"
                        alt="upload-icon"
                        className="mr-5px"
                      />
                      Upload an 3D model
                    </span>
                    <p
                      className={[
                        "fs-12px p-5px",
                        mobile ? "w-90" : "w-80",
                      ].join(" ")}
                      style={{ color: "#7e7e7e" }}
                    >
                      {mobile
                        ? "You can upload GLB or GLTF files up to 200Mb."
                        : "You can upload GLB or GLTF files up to 200MB. The file is stored on decentralized storage, so it will be available forever."}
                    </p>
                  </div>
                ) : null}

                {/* <!-- Appears after model uploads --> */}
                {!isUploading && postModelArweaveSrc?.length > 0 ? (
                  <div className="d-flex flex-row flex-center">
                    <i className="fa fa-check mr-10px"></i>
                    <p>3D model uploaded</p>
                  </div>
                ) : null}

                {isUploading ? <i className="fa fa-spinner fa-spin"></i> : null}
              </label>

              {/*  #imageInput*/}
              <input
                onChange={(e) => _handleFilesInput(e.target.files)}
                type="file"
                accept=".GLB, .GLTF"
                id="file-upload"
                className="br-6px"
              />

              {/* <!-- Mobile details? --> */}
              {/*
        (onFileDropped)="dropFileCoverImage($event)" */}
              {mobile ? (
                <label
                  dropUpload
                  htmlFor="file-upload-cover-image"
                  className="mint-page-custom-file-upload w-45 mb-0px background-secondary d-flex flex-row flex-center"
                >
                  {!isCoverImageUploading &&
                  !(postImageArweaveSrc?.length > 0) ? (
                    <div className="text-align-center h-100 d-flex flex-column flex-center">
                      <span className="font-weight-semiboldn fs-14-responsive p-5px">
                        <img
                          src="/assets/icons/upload.svg"
                          alt="upload-icon"
                          className="mr-5px"
                        />
                        Upload cover image
                      </span>
                      {/* [ngClass]="mobile ? 'w-90' : 'w-80'" */}
                      <p className="fs-12px p-5px" style="color: #7e7e7e">
                        Cover image will be displayed with your 3D NFT card.
                      </p>
                    </div>
                  ) : null}

                  {isCoverImageUploading ? (
                    <i className="fa fa-2x fa-spinner fa-spin"></i>
                  ) : null}
                </label>
              ) : null}

              {/* #imageInput*/}
              <input
                onChange={(e) => _handleFilesInputCoverImage(e.target.files)}
                type="file"
                accept="image(*"
                id="file-upload-cover-image"
                className="br-6px"
              />
            </div>
          </div>
        ) : null}

        {/* <!-- Other NFT Details: Name, Description, Category --> */}
        <div className="w-100">
          <label className="fs-14-responsive font-weight-semiboldn w-100 text-align-start mt-10px mb-0px ml-5px">
            Name your art piece
          </label>
          <label className="color-light ml-5px fs-12-responsive">
            Give your NFT a name in 25 characters or less.
          </label>
          <input
            value={NAME_OF_PIECE}
            onChange={() => setName()}
            type="text"
            maxLength="30"
            className="w-100 br-6px fs-12-responsive mint-page-input-minh"
            placeholder="Name of art"
          />
        </div>
        {!this.oneEdition && this.multipleEditions ? (
          <div className="w-100 mt-10px">
            <label className="font-weight-semiboldn w-100 text-align-start mb-0px ml-5px fs-14-responsive">
              Number of copies
            </label>
            <label
              className="color-light ml-5px fs-12-responsive"
              htmlFor="editionAmount"
            >
              Select the number of editions you want to mint.
            </label>
            <input
              value={EDITIONAMOUNTNUM}
              onChange={() => setEditionNumber()}
              className="w-100 br-6px fs-12-responsive mint-page-input-minh"
              type="number"
              id="editionAmount"
              name="editionAmount"
              min="1"
              max="10000"
              placeholder="1-10,000"
            />
          </div>
        ) : null}

        <div className="w-100 mt-10px">
          <label className="font-weight-semiboldn w-100 text-align-start mb-0px ml-5px fs-14-responsive">
            Description
          </label>
          <label className="color-light ml-5px fs-12-responsive">
            Describe your art piece in 500 characters or less.
          </label>
          <textarea
            value={DESCRIPTION}
            onChange={() => setDescription()}
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
          <select
            value={CATEGORY}
            onChange={() => setCategory()}
            className="br-6px fs-12-responsive pt-5px pb-5px color-light w-50 mint-page-select-category"
          >
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

        {/* <!-- Additional Details --> */}
        <button className="text-color-3 p-0px optional-extras-button font-weight-semiboldn mint-page-flex-start text-align-start mb-20px mt-15px fs-14-responsive ml-5px">
          Properties
          <div className="optional-box">
            <p className="optional-text">OPTIONAL</p>
          </div>
          <label className="switch mb-0px">
            <input
              onClick={() => handlePropertiesClicked()}
              type="checkbox"
              id="additional-properties"
            />
            <span className="slider round"></span>
          </label>
        </button>

        <div
          className={[
            "accordion disable-scrollbars",
            extrasOpen ? "big" : "",
          ].join(" ")}
        >
          <label className="color-light fs-12-responsive ml-5px">
            Insert up to 10 key value combinations. These are individual
            characteristics that differentiate NFT’s from one another in a
            collection. For example, “key” could be “hair” and “value” could be
            “blue.”
          </label>
          <div className="d-flex flex-row justify-content-space-between">
            <div className="w-40">
              <label className="fs-14-responsive font-weight-semiboldn ml-5px">
                Key
              </label>
              <input
                value={KEY}
                type="text"
                className="br-6px fs-12-responsive mint-page-input-minh"
                maxLength="20"
                placeholder="Add key"
              />
            </div>
            <div className="w-40">
              <label className="fs-14-responsive font-weight-semiboldn ml-5px">
                Value
              </label>

              <input
                value={VALUE}
                type="text"
                maxLength="20"
                className="w-100 br-6px fs-12-responsive mint-page-input-minh"
                placeholder="Add value"
              />
            </div>
            <div className="add-button-container hover-scale fs-12-responsive">
              <button
                onClick={() => addKV()}
                disabled={!hasKeyValue() || this.KVMap.size > 9}
                className="extras-add-button"
                style="white-space: nowrap"
              >
                + Add
              </button>
            </div>
          </div>
          <div className="w-100 kv-container">
            {KVMap.map((values, key) => (
              <div key={key} className="d-flex flex-row mt-10px">
                <button
                  onClick={() => deleteKV(values.key)}
                  className="key-value-box fs-14px d-flex flex-row"
                >
                  {values.key + ": " + values.value}
                  <img
                    className="ml-5px close-icon-kv"
                    src="/assets/icons/close.svg"
                  />
                </button>
                <div className="w-10px"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <!-- Continue Button Validators --> */}
      {videoType || imageType ? (
        <button
          onClick={() => nextStep()}
          disabled={
            !isDescribed() ||
            !(
              postImageArweaveSrc?.length > 0 || postVideoDESOSrc?.length > 0
            ) ||
            !isNamed() ||
            !isCategorized()
          }
          className={[
            "mb-0px font-weight-semiboldn mint-page-step-2-continue",
            mobile ? "w-90" : "w-80",
          ].join(" ")}
        >
          Continue
        </button>
      ) : null}
      {audioType || modelType ? (
        <button
          onClick={() => nextStep()}
          disabled={
            !isDescribed() ||
            !(
              postImageArweaveSrc?.length > 0 &&
              (postAudioArweaveSrc?.length > 0 ||
                postModelArweaveSrc?.length > 0)
            ) ||
            !isNamed() ||
            !isCategorized()
          }
          className={[
            "mb-0px font-weight-semiboldn mint-page-step-2-continue",
            mobile ? "w-90" : "w-80",
          ].join(" ")}
        >
          Continue
        </button>
      ) : null}
    </div>
  );
};
export default StepTwoDeso;
