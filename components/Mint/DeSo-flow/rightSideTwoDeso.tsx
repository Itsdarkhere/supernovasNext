import styles from "../../../styles/Mint/rightSideTwoDeso.module.scss";
import Avatar from "../../Reusables/avatar";

const RightSideTwoDeso = () => {
  // <!-- LEFT SIDE DESKTOP STEPS >= 4 -->
  return (
    <div className="mint-page-image-container d-flex flex-center">
      <div className="fake-card">
        {/* <!-- LEFT SIDE DESKTOP STEPS 3 - 4 --> */}
        <div className="fake-card-image-box">
          <div className="w-100 z-index-2 h-100 background-secondary position-relative d-flex flex-center">
            {postImageArweaveSrc ? (
              <img
                className="fake-card-image"
                src="{{ postImageArweaveSrc }}"
              />
            ) : null}

            {videoType || audioType ? (
              <div
                className={[
                  "fake-card-video-icon-container d-flex flex-center",
                  !showVideoTypeIcon ? "opacity_0" : "",
                ].join(" ")}
              >
                {!arweaveVideoLoading && videoType ? (
                  <img
                    className="fake-card-video-icon"
                    src="/assets/icons/video-type-white.svg"
                    alt="icon"
                  />
                ) : null}

                {audioType ? (
                  <img
                    className="fake-card-video-icon"
                    src="/assets/icons/music-type-white.svg"
                    alt="icon"
                  />
                ) : null}

                {arweaveVideoLoading ? (
                  <i className="fa fa-spinner fa-spin fa-2x"></i>
                ) : null}
              </div>
            ) : null}

            {postVideoArweaveSrc && videoType ? (
              <video
                onMouseEnter={() => activateOnHover(true)}
                onMouseLeave={() => activateOnHover(false)}
                muted={true}
                id="fake-video-nft-1"
                className="fake-card-video-tag"
                src={postVideoArweaveSrc}
              ></video>
            ) : null}
          </div>
        </div>

        <div className="caption-cover w-100">
          <p className="font-weight-semibold fs-20px-im">{NAME_OF_PIECE}</p>
          <div className="d-flex flex-row">
            <div className="card-header p-0px" style="border-bottom: 0px">
              <div className="profile-img">
                <Avatar
                  classN="avatar"
                  avatar={
                    loggedInUser.ProfileEntryResponse?.PublicKeyBase58Check
                  }
                ></Avatar>
              </div>
            </div>
            <div className="d-flex flex-column">
              <p className="creator-text-nft-card font-weight-bold">CREATOR</p>
              <div className="username-nft-card font-weight-bold">
                {globalVars.loggedInUser.ProfileEntryResponse.Username}
                {loggedInUser.ProfileEntryResponse.IsVerified ? (
                  <i className="fas fa-check-circle pl-5px fa-md text-primary"></i>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="bid-cover flex-wrap colors-not-sold">
          <div className="bid-row">
            <div className="d-flex bid_inner_row">
              <>
                <div className="bid-col">
                  <p className="p-lighter">Minimum bid</p>
                  <p className="font-weight-semiboldn">{MIN_PRICE} DESO</p>
                </div>
              </>
              <>
                <div className="ml-50px bid-col">
                  <p className="p-lighter">Edition of</p>
                  <p className="font-weight-bold">1</p>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  //     <!-- matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
  // [matTooltip]="mOfNNFTTooltip"
  // #NFTMOfNTooltip="matTooltip" -->
};
export default RightSideTwoDeso;
