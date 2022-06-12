import Link from "next/link";
import Post from "../../../pages/post/[pid]";
import styles from "../../../styles/NFT/NFTPostPage/NFTPostPage.module.scss";
import { RouteNames } from "../../../utils/backendapi-context";
import {
  abbreviateNumber,
  nanosToDeSo,
  nanosToUSD,
} from "../../../utils/global-context";
import { transformVideoURL } from "../../../utils/sanitizeVideoURL";
import { isValidEmbedURL } from "../../../utils/staticServices/embedURLParser";
import PostIconRow from "../../Feed/postIconRow";
import AudioComponent from "../../Media/audioComponent";
import ImageComponent from "../../Media/imageComponent";
import ModelComponent from "../../Media/modelComponent";
import VideoComponent from "../../Media/videoComponent";
import Avatar from "../../Reusables/avatar";
import TabSelector from "../../Reusables/tabSelector";
import BidBox from "../BidBox/bidBox";

const NFTPostPage = () => {
  if (!nftPost) {
    return null;
  }
  return (
    <>
      {/* <!-- Top Bar -->
<!-- FIXME: TODO: post threads: loading skeletons --> */}
      <div className="d-flex flex-column">
        {/* <!-- New Page design --> */}
        <div className="nft_details_main_wrapper">
          {/* <!-- Main Post Area --> */}
          <div className="nft-details-top">
            <div className="nft_bx nft_feed_post_design gray">
              {nftBidData ? (
                <div
                  className="d-flex flex-center"
                  style={{ height: "100%", width: "100%" }}
                >
                  {/* <!--  afterCommentCreatedCallback explanation: Here, the "post" is a top-level post. A new comment on a -->
          <!--  top-level post should be prepended to the post's list of comments --> */}

                  {/* <!-- Image Post --> */}
                  {nftPost.ImageURLs &&
                  nftPost.ImageURLs[0] &&
                  !nftPost.ParentStakeID &&
                  !nftPost.PostExtraData?.arweaveAudioSrc &&
                  !nftPost.PostExtraData?.arweaveModelSrc ? (
                    <ImageComponent
                      imageSrc={nftPost.ImageURLs[0]}
                    ></ImageComponent>
                  ) : null}

                  {/* <!-- Audio Post --> */}
                  {nftPost.PostExtraData?.arweaveAudioSrc ? (
                    <AudioComponent
                      imageSrc={nftPost.ImageURLs[0]}
                      songName={nftPost.PostExtraData?.name}
                      creator={nftPost.ProfileEntryResponse?.Username}
                      audioSrc={nftPost.PostExtraData.arweaveAudioSrc}
                    ></AudioComponent>
                  ) : null}

                  {/* <!-- Video Post --> */}
                  {nftPost.PostExtraData?.arweaveVideoSrc ? (
                    <VideoComponent
                      videoSrc={nftPost.PostExtraData.arweaveVideoSrc}
                    ></VideoComponent>
                  ) : null}

                  {/* <!-- Reqular deso video --> */}
                  {nftPost.VideoURLs &&
                  nftPost.VideoURLs[0] &&
                  !nftPost.ParentStakeID &&
                  !nftPost.PostExtraData.arweaveVideoSrc ? (
                    <div
                      className={[
                        "d-flex flex-center w-100",
                        quotedContent && showQuotedContent ? "mb-10px" : "",
                      ].join(" ")}
                    >
                      <iframe
                        allowFullScreen
                        src={
                          transformVideoURL(nftPost.VideoURLs[0])
                            ? nftPost.VideoURLs[0]
                            : ""
                        }
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                        className="w-100 br-10px"
                      ></iframe>
                    </div>
                  ) : null}

                  {/* <!-- Embedded content --> */}
                  {constructedEmbedURL ? (
                    <div className="d-flex flex-center w-100">
                      <iframe
                        height={getEmbedHeight()}
                        id="embed-iframe"
                        src={
                          isValidEmbedURL(constructedEmbedURL)
                            ? constructedEmbedURL
                            : false
                        }
                        frameBorder="0"
                        allow="picture-in-picture; clipboard-write; encrypted-media; gyroscope; accelerometer; encrypted-media;"
                        allowFullScreen
                        className="w-100 br-10px"
                      ></iframe>
                    </div>
                  ) : null}

                  {/* <!-- 3D Model Post --> */}
                  {nftPost.PostExtraData.arweaveModelSrc ? (
                    <div style={{ height: "100%", width: "100%" }}>
                      {nftPost.ImageURLs &&
                      nftPost.ImageURLs[0] &&
                      !nftPost.ParentStakeID ? (
                        <div
                          style={{ height: "100%", width: "100%" }}
                          className={
                            quotedContent && showQuotedContent ? "mb-10px" : ""
                          }
                        >
                          <ModelComponent
                            postModelArweaveSrc={
                              nftPost.PostExtraData.arweaveModelSrc
                            }
                          ></ModelComponent>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ) : null}

              {/* <!-- Full Screen Post Options --> */}
              {!nftPost.PostExtraData.arweaveModelSrc ? (
                <button
                  onClick={(e) =>
                    openModelModal(e, nftPost.PostExtraData.arweaveModelSrc)
                  }
                  type="button"
                  className="inlrg"
                  data-toggle="modal"
                >
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_231_296)">
                      <path
                        d="M14.1072 0.220215C13.6777 0.220215 13.3295 0.568383 13.3295 0.997869C13.3295 1.42736 13.6777 1.77552 14.1072 1.77552L15.3404 1.77552L12.002 5.11391C11.6983 5.4176 11.6983 5.90999 12.002 6.21368C12.3057 6.51737 12.7981 6.51737 13.1018 6.21368L16.4402 2.87529L16.4402 4.10849C16.4402 4.53798 16.7883 4.88615 17.2178 4.88614C17.6473 4.88614 17.9955 4.53798 17.9955 4.10849L17.9955 0.997869C17.9955 0.568383 17.6473 0.220215 17.2178 0.220215H14.1072ZM3.99769 13.1182L3.99769 11.885C3.99769 11.4555 3.64952 11.1074 3.22004 11.1074C2.79055 11.1074 2.44238 11.4555 2.44238 11.885L2.44239 14.9956C2.44239 15.4251 2.79055 15.7733 3.22004 15.7733H6.33065C6.76014 15.7733 7.10831 15.4251 7.10831 14.9956C7.10831 14.5662 6.76014 14.218 6.33065 14.218H5.09746L8.43585 10.8796C8.73954 10.5759 8.73954 10.0835 8.43585 9.77984C8.13216 9.47614 7.63977 9.47614 7.33608 9.77984L3.99769 13.1182Z"
                        fill="#646464"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_231_296"
                        x="-1.55762"
                        y="0.220215"
                        width="23.553"
                        height="23.5532"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_231_296"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_231_296"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </button>
              ) : null}

              {/* </ng-template> */}

              {/* <!-- Fullscreen button for image posts --> */}
              {!nftPost.PostExtraData.arweaveAudioSrc &&
              !nftPost.PostExtraData.arweaveVideoSrc ? (
                <button
                  onClick={(e) => openImgModal(e, nftPost.ImageURLs[0])}
                  type="button"
                  className="inlrg"
                  data-toggle="modal"
                >
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_231_296)">
                      <path
                        d="M14.1072 0.220215C13.6777 0.220215 13.3295 0.568383 13.3295 0.997869C13.3295 1.42736 13.6777 1.77552 14.1072 1.77552L15.3404 1.77552L12.002 5.11391C11.6983 5.4176 11.6983 5.90999 12.002 6.21368C12.3057 6.51737 12.7981 6.51737 13.1018 6.21368L16.4402 2.87529L16.4402 4.10849C16.4402 4.53798 16.7883 4.88615 17.2178 4.88614C17.6473 4.88614 17.9955 4.53798 17.9955 4.10849L17.9955 0.997869C17.9955 0.568383 17.6473 0.220215 17.2178 0.220215H14.1072ZM3.99769 13.1182L3.99769 11.885C3.99769 11.4555 3.64952 11.1074 3.22004 11.1074C2.79055 11.1074 2.44238 11.4555 2.44238 11.885L2.44239 14.9956C2.44239 15.4251 2.79055 15.7733 3.22004 15.7733H6.33065C6.76014 15.7733 7.10831 15.4251 7.10831 14.9956C7.10831 14.5662 6.76014 14.218 6.33065 14.218H5.09746L8.43585 10.8796C8.73954 10.5759 8.73954 10.0835 8.43585 9.77984C8.13216 9.47614 7.63977 9.47614 7.33608 9.77984L3.99769 13.1182Z"
                        fill="#646464"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_231_296"
                        x="-1.55762"
                        y="0.220215"
                        width="23.553"
                        height="23.5532"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_231_296"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_231_296"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </button>
              ) : null}
              {/* </ng-template> */}
            </div>

            <div className="nft_bx nft_feed_post_wt_design post">
              {nftPost && nftBidData ? (
                <div className="position-relative d-flex justify-content-between flex-column h-100">
                  <FeedPost
                    isNFTProfile={true}
                    isNFTDetail={true}
                    post={nftPost}
                    hoverable={false}
                    includePaddingOnPost={true}
                    isParentPostInThread={true}
                    showLeftSelectedBorder={true}
                    showInteractionDetails={true}
                    blocked={isPostBlocked(nftPost)}
                    showName={true}
                    showNFTDetails={true}
                    showExpandedNFTDetails={true}
                    contentShouldLinkToThread={true}
                    afterCommentCreatedCallback={incrementCommentCounter.bind(
                      this
                    )}
                    showNFTOwnerInfo={hightestBidOwner}
                    bidsOnMyNFTs={bidsOnMyNfts?.length}
                    userBlocked={(e) => afterUserBlocked(e)}
                    changeEdition={(e) => changeEdition(e)}
                  ></FeedPost>
                  <div className="nft-details-wrapper">
                    <BidBox
                      postContent={nftPost}
                      nftBidData={nftBidData}
                      isNFTDetail={true}
                      hightestBidOwner={hightestBidOwner}
                      closeAuction={(e) => closeAuction(e)}
                      nftBidPlaced={(e) => afterNftBidPlaced(e)}
                      sellNFT={(e) => sellNFT(e)}
                      singleBidCancellation={(e) => onSingleBidCancellation(e)}
                      multipleBidsCancellation={(e) =>
                        onMultipleBidsCancellation(e)
                      }
                    ></BidBox>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          {/* <!-- DESKTOP COMMENTS --> */}
          {isMobile ? (
            <div className="nft_profile_mobile_engagement_wrapper">
              {showIconRow ? (
                <PostIconRow
                  isNFTProfile={true}
                  post={post}
                  postContent={postContent}
                  parentPost={parentPost}
                  afterCommentCreatedCallback={prependPostToFeed.bind(this)}
                ></PostIconRow>
              ) : null}
            </div>
          ) : (
            <div className="nft_bx linebx">
              <div className="comments_likes_list">
                <div className="nft-post-icon-row-wrapper h-50 d-flex flex-center">
                  {showIconRow ? (
                    <PostIconRow
                      isNFTProfile={true}
                      post={post}
                      postContent={postContent}
                      parentPost={parentPost}
                      afterCommentCreatedCallback={() =>
                        prependPostToFeed.bind(this)
                      }
                    ></PostIconRow>
                  ) : null}
                </div>
                <div className="nft-profile-engagement-string">
                  <div className="d-flex flex-center">
                    <span className="engagement-string-item">
                      <b>{abbreviateNumber(nftPost.CommentCount)}</b>
                      Comments
                    </span>
                    <span className="engagement-string-item">
                      <b>
                        {abbreviateRepostsNumber(
                          nftPost.RepostCount,
                          nftPost.QuoteRepostCount
                        )}
                      </b>
                      Reposts
                    </span>
                    <span className="engagement-string-item">
                      <b>{abbreviateNumber(nftPost.LikeCount)}</b>
                      Likes
                    </span>
                    <span className="engagement-string-item">
                      <b>{abbreviateNumber(nftPost.DiamondCount)}</b>
                      Diamonds
                    </span>
                  </div>
                </div>
              </div>
              {!nftPost.CommentCount && !nftPost.ParentStakeID ? (
                <div className="p-15px d-flex flex-column flex-center nft-no-comments font-weight-semiboldn">
                  No comments yet
                  <button
                    onClick={(e) => openRepostsModal(e)}
                    className="font-weight-semiboldn mt-20px"
                  >
                    <img src="/assets/icons/comment.svg" alt="plus-icon" />
                    Comment
                  </button>
                </div>
              ) : null}

              {nftPost.CommentCount || nftPost.ParentStakeID ? (
                <div className="nft-profile-comment-section">
                  {loggedInUser?.PublicKeyBase58Check ? (
                    <div className="send-message-thread-container">
                      <div className="fake-textarea-container">
                        <div className="avatar-box-send-message">
                          <Avatar
                            class="messages-thread__avatar_send_message"
                            avatar={loggedInUser?.PublicKeyBase58Check}
                          ></Avatar>
                        </div>
                        {/* #autosize="cdkTextareaAutosize"*/}
                        <textarea
                          onKeyDown={(e) => _messageTextChanged(e)}
                          value={commentText}
                          cdkTextareaAutosize
                          cdkAutosizeMinRows="1"
                          cdkAutosizeMaxRows="5"
                          placeholder="Make a comment!"
                          className="py-5px fs-15px messages-thread__border-radius flex-grow-1 form-control messages-textarea disable-scrollbars"
                          style="height: 50px"
                        ></textarea>
                        {!submittingPost ? (
                          <button
                            onClick={() => submitPost()}
                            className="btn btn-send-message fs-15px ml-15px messages-thread__border-radius"
                          >
                            <img src="/assets/icons/white-send.svg" />
                          </button>
                        ) : (
                          <button className="btn btn-send-message fs-15px ml-15px messages-thread__border-radius">
                            <i className="fa fa-spinner fa-spin"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  ) : null}

                  {/* #postThread */}
                  <Post
                    isNFTProfile={true}
                    hideHeader={true}
                    fromNFTDetail={true}
                    hideCurrentPost={!nftPost.ParentStakeID}
                  ></Post>
                </div>
              ) : null}

              {!(
                nftPost.CommentCount ||
                nftPost.ParentStakeID ||
                canReplaceExistingIcons
              ) ? (
                <button
                  onClick={(e) => openRepostsModal(e)}
                  type="button"
                  className="add_comment_btn"
                >
                  <i>+</i>
                  Comment
                </button>
              ) : null}
            </div>
          )}

          <div className="nft_bx bids_new_sc">
            {!loading ? (
              <div className="borderbg feed-post__blue-border">
                <TabSelector
                  icons={icons}
                  tabs={tabs}
                  activeTab={activeTab}
                  tabClick={(e) => _handleTabClick(e)}
                ></TabSelector>
              </div>
            ) : null}

            {showBidsView ? (
              <div className="nft-post-mobile-padding">
                {!loading && !bids?.length ? (
                  <div className="fs-15px p-15px pb-0 d-flex justify-content-center nft-no-bids">
                    There are no bids yet.
                  </div>
                ) : null}

                {!loading && bids?.length ? (
                  <div>
                    <div className="container d-flex align-items-center fs-14px py-15px link--unstyled">
                      <div
                        onClick={() =>
                          handleColumnHeaderClick(SORT_BY_USERNAME)
                        }
                        className={[
                          "col-5 nft-detail-div",
                          nftPost.NumNFTCopies == 1 ? "col-6" : "col-5",
                        ].join(" ")}
                      >
                        BIDDER
                      </div>
                      <div
                        onClick={() => handleColumnHeaderClick(SORT_BY_PRICE)}
                        className={[
                          "p-0 nft-detail-div",
                          nftPost.NumNFTCopies == 1 ? "col-6" : "col-5",
                        ].join(" ")}
                      >
                        BID AMOUNT
                      </div>
                      {nftPost.NumNFTCopies > 1 ? (
                        <div
                          onClick={() =>
                            handleColumnHeaderClick(SORT_BY_EDITION)
                          }
                          className="col-2 p-0 nft-detail-div"
                        >
                          EDITION
                        </div>
                      ) : null}
                    </div>
                    {/* <simple-center-loader *ngIf="refreshingBids"></simple-center-loader> */}
                    {!refreshingBids ? (
                      <div>
                        {bids?.map((bidEntry, i) => (
                          <div
                            key={i}
                            className="container d-flex align-items-center fs-14px p-15px link--unstyled"
                          >
                            <div className="row no-gutters w-100">
                              <div className="col-5 d-flex align-items-center mb-0 p-0">
                                {/* <!-- checkbox or radio button --> */}
                                {activeTab === NftPostComponent.MY_AUCTIONS &&
                                nftPost.NumNFTCopies > 1 &&
                                userOwnsSerialNumber(bidEntry.SerialNumber) ? (
                                  <input
                                    value={bidEntry.selected}
                                    onChange={() =>
                                      checkSelectedBidEntries(bidEntry)
                                    }
                                    className="pr-10px cursor-pointer"
                                    type="checkbox"
                                    style={{ width: "35px" }}
                                  />
                                ) : null}

                                {/*
                                [value]="bidEntry"
                                [(ngModel)]="selectedBid"*/}
                                {activeTab === MY_AUCTIONS &&
                                nftPost.NumNFTCopies === 1 &&
                                userOwnsSerialNumber(bidEntry.SerialNumber) ? (
                                  <input
                                    value={bidEntry}
                                    onChange={(e) => selectBidEntry(bidEntry)}
                                    className="pr-10px cursor-pointer"
                                    type="radio"
                                    style={{ width: "35px" }}
                                  />
                                ) : null}

                                {activeTab === MY_BIDS ? (
                                  <i
                                    onClick={() => cancelBid(bidEntry)}
                                    className="fas fa-trash pr-10px text-danger cursor-pointer fs-18px"
                                  ></i>
                                ) : null}

                                {/* <!-- Avatar --> */}
                                <Avatar
                                  classN="nft-profile-tabs-avatar mr-10px"
                                  avatar={bidEntry.PublicKeyBase58Check}
                                ></Avatar>
                                <div className="text-truncate holdings__name fs-14px">
                                  <div className="d-flex">
                                    {/*
                    [style.pointer-events]="!!bidEntry.ProfileEntryResponse?.Username ? 'auto' : 'none'"
                    " */}
                                    <Link
                                      href={
                                        "/" +
                                        RouteNames.USER_PREFIX +
                                        "/" +
                                        bidEntry.ProfileEntryResponse.Username
                                      }
                                    ></Link>
                                    <div
                                      className={[
                                        "fc-default font-weight-bold text-truncate fs-14px",
                                        !!bidEntry.ProfileEntryResponse
                                          ?.Username
                                          ? "cursor-pointer"
                                          : "",
                                      ].join(" ")}
                                      style={{ maxWidth: "120px" }}
                                    >
                                      {bidEntry.ProfileEntryResponse
                                        ?.Username ||
                                        bidEntry.PublicKeyBase58Check}
                                    </div>

                                    {/* [matTooltip]="'This account is verified'"
                    #tooltip="matTooltip" */}
                                    {bidEntry.ProfileEntryResponse
                                      ?.IsVerified ? (
                                      <span
                                        onClick={() => tooltip.toggle()}
                                        className="ml-1 mb-1 cursor-pointer text-primary"
                                        matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
                                      >
                                        <i className="fas fa-check-circle fa-md align-middle"></i>
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                              <div
                                className={[
                                  "d-flex align-items-center mb-0 p-0",
                                  nftPost.NumNFTCopies == 1 ? "col-7" : "col-5",
                                ].join(" ")}
                              >
                                <span className="mr-5px last-price-deso">
                                  {nanosToDeSo(bidEntry.BidAmountNanos, 5)} DESO
                                </span>
                                <span className="last-price-usd">
                                  ~{nanosToUSD(bidEntry.BidAmountNanos, 2)}
                                </span>
                              </div>
                              {nftPost.NumNFTCopies > 1 ? (
                                <div className="col-2 d-flex align-items-center mb-0 p-0">
                                  {bidEntry.SerialNumber > 0 &&
                                    "#" + bidEntry.SerialNumber.toString()}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}

            {activeTab === NftPostComponent.OWNERS ? (
              <div className="nft-post-mobile-padding">
                {!loading ? (
                  <div>
                    <div className="container d-flex align-items-center fs-14px py-15px link--unstyled">
                      <div
                        onClick={() =>
                          handleColumnHeaderClick(SORT_BY_USERNAME)
                        }
                        className={[
                          "nft-detail-div pl-0px",
                          nftPost.NumNFTCopies == 1 ? "col-6" : "col-5",
                        ].join(" ")}
                      >
                        OWNER
                      </div>
                      <div
                        onClick={() => handleColumnHeaderClick(SORT_BY_PRICE)}
                        className={[
                          "nft-detail-div pl-0px",
                          nftPost.NumNFTCopies == 1 ? "col-6" : "col-5",
                        ].join(" ")}
                      >
                        LAST PRICE
                      </div>
                      {nftPost.NumNFTCopies > 1 ? (
                        <div
                          onClick={() =>
                            handleColumnHeaderClick(SORT_BY_EDITION)
                          }
                          className="nft-detail-div col-2 pl-0px"
                        >
                          EDITION
                        </div>
                      ) : null}
                    </div>
                    <div>
                      {owners.map((owner, index) => (
                        <div
                          key={index}
                          className="container d-flex align-items-center fs-14px p-15px link--unstyled"
                        >
                          <div className="row no-gutters w-100 py-5px">
                            <div
                              className={[
                                "d-flex align-items-center mb-0 p-0",
                                nftPost.NumNFTCopies == 1 ? "col-6" : "col-5",
                              ].join(" ")}
                            >
                              {/* <!-- Avatar --> */}
                              <Avatar
                                classN="nft-profile-tabs-avatar mr-10px"
                                avatar={owner.OwnerPublicKeyBase58Check}
                              ></Avatar>
                              <div className="d-flex flex-center">
                                {/*
                  [style.pointer-events]="!!owner.ProfileEntryResponse?.Username ? 'auto' : 'none'"
                  " */}{" "}
                                <Link
                                  href={
                                    "/" +
                                    RouteNames.USER_PREFIX +
                                    "/" +
                                    owner.ProfileEntryResponse.Username
                                  }
                                >
                                  <p
                                    className={[
                                      "fc-default font-weight-bold text-truncate holdings__name fs-14px",
                                      !!owner.ProfileEntryResponse?.Username
                                        ? "cursor-pointer"
                                        : "",
                                    ].join(" ")}
                                  >
                                    {owner.ProfileEntryResponse?.Username ||
                                      owner.OwnerPublicKeyBase58Check}
                                  </p>
                                </Link>
                                {/* [matTooltip]="'This account is verified'"
                  #tooltip="matTooltip" */}
                                {owner.ProfileEntryResponse?.IsVerified ? (
                                  <span
                                    onClick={() => tooltip.toggle()}
                                    className="ml-1 cursor-pointer text-primary"
                                    matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
                                  >
                                    <i className="fas fa-check-circle fa-md align-middle"></i>
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            <div
                              className={[
                                "d-flex align-items-center mb-0 p-0",
                                nftPost.NumNFTCopies == 1 ? "col-6" : "col-5",
                              ].join(" ")}
                            >
                              <span className="mr-5px last-price-deso">
                                {nanosToDeSo(
                                  owner.LastAcceptedBidAmountNanos,
                                  5
                                )}{" "}
                                DESO
                              </span>
                              <span className="last-price-usd">
                                {nanosToUSD(
                                  owner.LastAcceptedBidAmountNanos,
                                  2
                                )}
                              </span>
                            </div>
                            {nftPost.NumNFTCopies > 1 ? (
                              <div className="col-2 d-flex align-items-center mb-0 p-0">
                                {owner.SerialNumber > 0 &&
                                  "#" + owner.SerialNumber.toString()}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            {activeTab === NftPostComponent.COMMENTS ? (
              <div className="nft-post-mobile-padding">
                {!nftPost.CommentCount && !nftPost.ParentStakeID ? (
                  <div className="p-15px d-flex flex-column flex-center nft-no-comments font-weight-semiboldn">
                    No comments yet
                    <button
                      onClick={(e) => openRepostsModal(e)}
                      className="font-weight-semiboldn mt-20px"
                    >
                      <img src="/assets/icons/comment.svg" alt="plus-icon" />
                      Comment
                    </button>
                  </div>
                ) : null}

                {nftPost.CommentCount || nftPost.ParentStakeID ? (
                  <div className="nft-profile-comment-section">
                    <div className="send-message-thread-container">
                      <div className="fake-textarea-container">
                        <div className="avatar-box-send-message">
                          <Avatar
                            class="messages-thread__avatar_send_message"
                            avatar="this.globalVars.loggedInUser.PublicKeyBase58Check"
                          ></Avatar>
                        </div>
                        {/*#autosize="cdkTextareaAutosize"*/}
                        <textarea
                          value={commentText}
                          onKeyDown={(e) => _messageTextChanged(e)}
                          cdkTextareaAutosize
                          cdkAutosizeMinRows="1"
                          cdkAutosizeMaxRows="5"
                          placeholder="Make a comment!"
                          className="py-5px fs-15px messages-thread__border-radius flex-grow-1 form-control messages-textarea disable-scrollbars"
                          style={{ height: "50px" }}
                        ></textarea>
                        {!submittingPost ? (
                          <button
                            onClick={() => submitPost()}
                            className="btn btn-send-message fs-15px ml-15px messages-thread__border-radius"
                          >
                            <img src="/assets/icons/white-send.svg" />
                          </button>
                        ) : (
                          <button className="btn btn-send-message fs-15px ml-15px messages-thread__border-radius">
                            <i className="fa fa-spinner fa-spin"></i>
                          </button>
                        )}
                      </div>
                    </div>
                    {/* #postThread */}
                    <Post
                      isNFTProfile={true}
                      hideHeader={true}
                      fromNFTDetail={true}
                      hideCurrentPost={!nftPost.ParentStakeID}
                    ></Post>
                  </div>
                ) : null}

                {!(
                  nftPost.CommentCount ||
                  nftPost.ParentStakeID ||
                  canReplaceExistingIcons
                ) ? (
                  <button
                    onClick={(e) => openRepostsModal(e)}
                    type="button"
                    className="add_comment_btn"
                  >
                    <i>+</i>
                    Comment
                  </button>
                ) : null}
              </div>
            ) : null}

            {/* <!-- DETAILS --> */}
            {activeTab === DETAILS ? (
              <div className="nft-post-mobile-padding">
                {propertiesBool ? (
                  <label className="mt-15px nft-detail-label">PROPERTIES</label>
                ) : null}

                <div className="nft-post-property-container">
                  {properties.map((property, i) => (
                    <div
                      key={i}
                      className="d-flex flex-column flex-center nft-post-property-box mt-10px"
                    >
                      <label className="mb-0px fs-14px pl-10px pr-10px">
                        {property[0].toUpperCase()}
                      </label>
                      <label className="mb-0px font-weight-bold fs-16px pl-10px pr-10px">
                        {property[1]}
                      </label>
                    </div>
                  ))}
                </div>
                <label className="mt-30px nft-detail-label">BLOCKCHAIN</label>
                {/* <!-- DESO --> */}
                <div className="nft-profile-blockchain-deso">
                  <span>
                    <img
                      className="deso-logo"
                      src="/assets/deso/desologo.svg"
                      alt="deso"
                    />
                    <label className="mb-0px">Deso</label>
                  </span>
                  <a onClick={() => viewBlock()}>
                    View on block explorer
                    <img
                      src="/assets/icons/deso_page_link.svg"
                      alt="go to icon"
                    />
                  </a>
                </div>
                {/* <!-- Content storage --> */}
                {!textNFT ? (
                  <label className="mt-30px nft-detail-label">
                    CONTENT STORAGE
                  </label>
                ) : null}

                {/* <!-- ARWEAVE --> */}
                {contentStorage && !textNFT ? (
                  <div className="nft-profile-content-storage-arweave">
                    <img
                      className="arweave-logo"
                      src="/assets/icons/arweave_icon.svg"
                      alt="deso"
                    />
                    <a onClick={() => viewAssetArweave()}>
                      View content
                      <img
                        src="/assets/icons/deso_page_link.svg"
                        alt="go to icon"
                      />
                    </a>
                  </div>
                ) : null}

                {/* <!-- CENTRALIZED --> */}
                {!contentStorage && !textNFT ? (
                  <div className="nft-profile-content-storage-arweave">
                    <div className="warning-centralized-server">
                      <img
                        src="/assets/icons/warning_circle_icon.svg"
                        alt="warning icon"
                      />
                      Centralized Server
                    </div>
                    <a onClick={() => viewAssetCentralized()}>
                      View asset
                      <img
                        src="/assets/icons/deso_page_link.svg"
                        alt="go to icon"
                      />
                    </a>
                  </div>
                ) : null}
              </div>
            ) : null}

            {!loading &&
            activeTab === NftPostComponent.THREAD &&
            !reloadingThread ? (
              <div className="nft-post-mobile-padding">
                {!loading && !bids?.length ? (
                  <div className="fs-15px pb-0 d-flex justify-content-center nft-no-bids font-weight-semibold">
                    There are no bids yet.
                  </div>
                ) : null}

                {!loading && bids?.length ? (
                  <div>
                    <div className="container d-flex align-items-center fs-14px py-15px link--unstyled">
                      <div
                        onClick={() =>
                          handleColumnHeaderClick(SORT_BY_USERNAME)
                        }
                        className={[
                          "nft-detail-div pl-0px",
                          nftPost.NumNFTCopies == 1 ? "col-6" : "col-5",
                        ].join(" ")}
                      >
                        BIDDER
                      </div>
                      <div
                        onClick={() => handleColumnHeaderClick(SORT_BY_PRICE)}
                        className={[
                          "p-0 nft-detail-div pl-0px",
                          nftPost.NumNFTCopies == 1 ? "col-6" : "col-5",
                        ].join(" ")}
                      >
                        BID AMOUNT
                      </div>
                      {nftPost.NumNFTCopies > 1 ? (
                        <div
                          onClick={() =>
                            handleColumnHeaderClick(SORT_BY_EDITION)
                          }
                          className="col-2 nft-detail-div pl-0px"
                        >
                          EDITION
                        </div>
                      ) : null}
                    </div>
                    {/* <simple-center-loader *ngIf="refreshingBids"></simple-center-loader> */}
                    {!refreshingBids ? (
                      <div>
                        {bids.map((bid, i) => (
                          <div
                            key={i}
                            className="container d-flex align-items-center fs-14px p-15px border-color-grey link--unstyled"
                          >
                            <div className="row no-gutters w-100">
                              <div className="col-5 d-flex align-items-center mb-0 p-0">
                                {activeTab === NftPostComponent.MY_AUCTIONS &&
                                nftPost.NumNFTCopies > 1 &&
                                userOwnsSerialNumber(bidEntry.SerialNumber) ? (
                                  <input
                                    value={bidEntry.selected}
                                    onChange={() =>
                                      checkSelectedBidEntries(bidEntry)
                                    }
                                    className="pr-10px cursor-pointer"
                                    type="checkbox"
                                    style={{ width: "35px" }}
                                  />
                                ) : null}

                                {/*
              [value]="bidEntry"
              [(ngModel)]="selectedBid"*/}
                                {activeTab === MY_AUCTIONS &&
                                nftPost.NumNFTCopies === 1 &&
                                userOwnsSerialNumber(bidEntry.SerialNumber) ? (
                                  <input
                                    value={selectedBid}
                                    onChange={() => selectBidEntry(bidEntry)}
                                    className="pr-10px cursor-pointer"
                                    type="radio"
                                    style={{ width: "35px" }}
                                  />
                                ) : null}

                                {activeTab === MY_BIDS ? (
                                  <i
                                    onClick={() => cancelBid(bidEntry)}
                                    className="fas fa-trash pr-10px text-danger cursor-pointer fs-18px"
                                  ></i>
                                ) : null}

                                <Avatar
                                  classN="nft-profile-tabs-avatar mr-10px"
                                  avatar={bidEntry.PublicKeyBase58Check}
                                ></Avatar>
                                <div className="text-truncate holdings__name fs-14px">
                                  <div className="d-flex">
                                    {/* [style.pointer-events]="!!bidEntry.ProfileEntryResponse?.Username ? 'auto' : 'none'"*/}
                                    <Link
                                      href={
                                        "/" +
                                        globalVars.RouteNames.USER_PREFIX +
                                        "/" +
                                        bidEntry.ProfileEntryResponse.Username
                                      }
                                    >
                                      <div
                                        className={[
                                          "fc-default font-weight-bold text-truncate fs-14px",
                                          !!bidEntry.ProfileEntryResponse
                                            ?.Username
                                            ? "cursor-pointer"
                                            : "",
                                        ].join(" ")}
                                        style={{ maxWidth: "120px" }}
                                      >
                                        {bidEntry.ProfileEntryResponse
                                          ?.Username ||
                                          bidEntry.PublicKeyBase58Check}
                                      </div>
                                    </Link>
                                    {/*[matTooltip]="'This account is verified'"
                                    #tooltip="matTooltip"
                                    */}
                                    {bidEntry.ProfileEntryResponse
                                      ?.IsVerified ? (
                                      <span
                                        onClick={() => tooltip.toggle()}
                                        className="ml-1 mb-1 cursor-pointer text-primary"
                                        matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
                                      >
                                        <i className="fas fa-check-circle fa-md align-middle"></i>
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                              <div
                                className={[
                                  "d-flex align-items-center mb-0 p-0",
                                  nftPost.NumNFTCopies == 1 ? "col-6" : "col-5",
                                ].join(" ")}
                              >
                                <span className="mr-5px last-price-deso">
                                  {globalVars.nanosToDeSo(
                                    bidEntry.BidAmountNanos,
                                    5
                                  )}{" "}
                                  DESO
                                </span>
                                <span className="last-price-usd">
                                  {globalVars.nanosToUSD(
                                    bidEntry.BidAmountNanos,
                                    2
                                  )}
                                </span>
                              </div>
                              {nftPost.NumNFTCopies > 1 ? (
                                <div className="col-2 d-flex align-items-center mb-0 p-0">
                                  {bidEntry.SerialNumber > 0 &&
                                    "#" + bidEntry.SerialNumber.toString()}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
          <div className="global__bottom-bar-mobile-height"></div>
        </div>
      </div>
    </>
  );
};
export default NFTPostPage;
