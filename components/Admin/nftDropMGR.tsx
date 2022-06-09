import styles from "../../styles/Admin/NFTDropMGR.module.scss";
import FeedPost from "../Feed/feedPost";

const NFTDropMGR = () => {
  return (
    <>
      <div
        className="w-100 light-grey-divider border-bottom border-color-grey"
        style={{ height: "10px" }}
      ></div>

      <div className="px-15px pt-15px pb-5px fs-15px">
        <div className="py-5px w-100 d-flex justify-content-between align-items-center">
          <i
            onClick={() => previousDrop()}
            className="fas fa-chevron-left pl-5px pr-15px cursor-pointer"
          ></i>
          <div className="d-flex align-items-center">
            <div className="font-weight-500">Drop #&nbsp;</div>
            <input
              value={dropNumber}
              className="form-control fs-15px lh-18px p-10px"
              style={{ width: "75px", textAlign: "center" }}
              disabled
            />
          </div>
          <div>
            <i
              onClick={() => nextDrop()}
              className="fas fa-chevron-right pr-5px pl-15px cursor-pointer"
            ></i>
          </div>
        </div>
        {dropSelectorError !== "" ? (
          <div className="fc-red">{dropSelectorError}</div>
        ) : null}
      </div>

      {!loading ? (
        <div>
          <div className="px-15px pb-15px fs-15px">
            {/* [ngClass]="{ 'd-flex align-items-center': !globalVars.isMobile() }" */}
            {!hideDateTimeAdjuster ? (
              <div>
                {/* bsDatepicker */}
                <input
                  value={dropTime}
                  type="text"
                  placeholder="Datepicker"
                  className="form-control fs-15px"
                />
                <div className="d-flex align-items-center justify-content-between">
                  {/*  [(ngModel)]="dropTime" */}
                  {/* [ngClass]="{ 'pl-15px': !globalVars.isMobile() }" */}
                  {/* <timepicker
        className="fs-15px pr-15px"
        ></timepicker>  */}
                  <div>
                    <a
                      onClick={() => setDate()}
                      className="btn btn-warning fs-15px ml-5px font-weight-500"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {!settingDate ? (
                        <span>&nbsp;Set Date&nbsp;</span>
                      ) : (
                        <span>Setting...</span>
                      )}
                    </a>
                  </div>
                </div>
              </div>
            ) : null}

            {!hideDateTimeAdjuster ? (
              <pre className="alert alert-info">
                <b>Drop time will be set to: </b>
                <br />
                {dropTime}
                <br />
                <br />
                {dropEntry && dropEntry.DropTstampNanos !== 0 ? (
                  <span>
                    <b>Current Drop State</b>
                    <br />
                    Date: {dropEntry.Date}
                    <br />
                    Is Active: {dropEntry.IsActive}
                    {dropEntry.NFTHashes ? (
                      <span>
                        <br />
                        NFT Count: {dropEntry.NFTHashes.length}
                      </span>
                    ) : (
                      <span>
                        <br />
                        NFT Count: 0
                      </span>
                    )}
                  </span>
                ) : (
                  <b>
                    This drop has not been created. Click "Set Date" to begin.
                  </b>
                )}
              </pre>
            ) : (
              <pre className="alert alert-info">
                This NFT drop occurred on: <br />
                {dropTime}
              </pre>
            )}

            {dropEntry && dropEntry.DropTstampNanos != 0 ? (
              <div>
                {isUpdatable ? (
                  <div className="d-flex">
                    <input
                      value={nftToAdd}
                      className="form-control fs-15px lh-18px p-10px"
                      placeholder="Enter post hash to add."
                    />
                    <div>
                      <a
                        onClick={() => addAnNFT()}
                        className="btn btn-primary fs-15px ml-5px font-weight-500"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Add an NFT
                      </a>
                    </div>
                  </div>
                ) : null}

                {!hideDateTimeAdjuster ? (
                  <div className="d-flex pt-15px">
                    <div>
                      <a
                        onClick={() => toggleActivation()}
                        className="btn btn-primary fs-15px font-weight-500"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {/* *ngIf="!dropEntry.IsActive" */}
                        {!dropEntry.IsActive ? (
                          <span>Activate Drop</span>
                        ) : (
                          <span>Deactivate Drop</span>
                        )}
                      </a>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* <simple-center-loader *ngIf="loading"></simple-center-loader> */}

      <div
        className="w-100 light-grey-divider border-bottom border-top border-color-grey"
        style={{ height: "10px" }}
      ></div>

      {posts.length > 0 && (!loading || loadingNewDrop) ? (
        <div className="p-15px fs-15px">
          {!loadingNewDrop ? <b>NFTs in this drop:</b> : null}

          {/* #uiScroll
      *uiScroll="let post of datasource"
      [ngClass]="{ 'd-flex align-items-center mt-15px border border-color-grey br-8px': !loadingNewDrop }" */}
          <div>
            {!loadingNewDrop ? (
              <i
                onClick={() => removeNFT(post.PostHashHex)}
                className="p-10px far fa-trash-alt fc-red cursor-pointer"
              ></i>
            ) : null}

            {post.PostHashHex !== nftBeingRemoved && !loadingNewDrop ? (
              <FeedPost
                class="flex-grow-1 border-left border-color-grey cursor-pointer"
                post={post}
                includePaddingOnPost={true}
                showReplyingToContent={!!post.parentPost}
                parentPost={post.parentPost}
                contentShouldLinkToThread={true}
              ></FeedPost>
            ) : null}

            {post.PostHashHex === nftBeingRemoved ? (
              <span>&nbsp;Removing...</span>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default NFTDropMGR;
