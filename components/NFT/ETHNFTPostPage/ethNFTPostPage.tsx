import Link from "next/link";
import Post from "../../../pages/post/[pid]";
import styles from "../../../styles/NFT/ETHNFTPostPage/ethNFTPostPage.module.scss";
import { RouteNames } from "../../../utils/backendapi-context";
import { abbreviateRepostsNumber } from "../../../utils/global-context";
import FeedPost from "../../Feed/feedPost";
import PostIconRow from "../../Feed/postIconRow";
import ImageComponent from "../../Media/imageComponent";
import Avatar from "../../Reusables/avatar";
import TabSelector from "../../Reusables/tabSelector";
import BidBox from "../BidBox/bidBox";

const ETHNFTPostPage = () => {
  return (
    <>
      {nftPost ? (
        <div className="d-flex flex-column">
          {/* <!-- New Page design --> */}
          <div className="nft_details_main_wrapper">
            <div className="nft-details-top">
              <div className="nft_bx nft_feed_post_design gray eth-nft-image-container">
                <ImageComponent
                  imageSrc={nftPost.ImageURLs[0]}
                ></ImageComponent>
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
              </div>
              <div className="nft_bx nft_feed_post_wt_design post">
                {nftPost && nftBidData ? (
                  <div className="position-relative d-flex justify-content-between flex-column h-100">
                    <FeedPost
                      isNFTProfile={true}
                      nftBidData={nftBidData}
                      isNFTDetail={true}
                      hoverable={false}
                      post={nftPost}
                      includePaddingOnPost={true}
                      isParentPostInThread={true}
                      showLeftSelectedBorder={true}
                      showInteractionDetails={true}
                      blocked={isPostBlocked(nftPost)}
                      showName={true}
                      showNFTDetails={true}
                      showExpandedNFTDetails={true}
                      contentShouldLinkToThread={false}
                      afterCommentCreatedCallback={incrementCommentCounter.bind(
                        this
                      )}
                      showNFTOwnerInfo={hightestBidOwner}
                      bidsOnMyNFTs={bidsOnMyNfts?.length}
                      userBlocked={(e) => afterUserBlocked(e)}
                      nftBidPlaced={(e) => afterNftBidPlaced(e)}
                      sellNFT={(e) => sellNFT(e)}
                      closeAuction={(e) => closeAuction(e)}
                      onSingleBidCancellation={(e) =>
                        onSingleBidCancellation(e)
                      }
                      onMultipleBidsCancellation={(e) =>
                        onMultipleBidsCancellation(e)
                      }
                    ></FeedPost>
                    <div className="nft-details-wrapper">
                      <BidBox
                        postContent={nftPost}
                        nftBidData={nftBidData}
                        ethNFTOwnerDesoProfile={ethNFTOwnerDesoProfile}
                        ethNFTOwnerDesoPublicKey={ethNFTOwnerDesoPublicKey}
                        ethNFTOwnerWalletAddress={ethNFTOwnerWalletAddress}
                        ethNFTCreatorDesoProfile={ethNFTCreatorDesoProfile}
                        ethNFTCreatorDesoPublicKey={ethNFTCreatorDesoPublicKey}
                        ethNFTCreatorWalletAddress={ethNFTCreatorWalletAddress}
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
            ) : null}

            {!isMobile ? (
              <div className="nft_bx linebx">
                <div className="comments_likes_list">
                  <div className="nft-post-icon-row-wrapper h-50 d-flex flex-center">
                    {showIconRow ? (
                      <PostIconRow
                        class="w-100"
                        isNFTProfile={true}
                        post={post}
                        postContent={postContent}
                        parentPost={parentPost}
                        afterCommentCreatedCallback={prependPostToFeed.bind(
                          this
                        )}
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
                        <b>{globalVars.abbreviateNumber(nftPost.LikeCount)}</b>
                        Likes
                      </span>
                      <span className="engagement-string-item">
                        <b>
                          {globalVars.abbreviateNumber(nftPost.DiamondCount)}
                        </b>
                        Diamonds
                      </span>
                    </div>
                  </div>
                </div>
                {/* <!-- feed-post End --> */}
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
                              avatar={loggedInUser.PublicKeyBase58Check}
                            ></Avatar>
                          </div>
                          {/* #autosize="cdkTextareaAutosize" */}
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
                          {!this.submittingPost ? (
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
                      class="post_thread_likes_wrapper"
                      isNFTProfile="true"
                      hideHeader="true"
                      fromNFTDetail="true"
                      hideCurrentPost="!nftPost.ParentStakeID"
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

            <div className="nft_bx bids_new_sc">
              {!loading ? (
                <div className="borderbg feed-post__blue-border">
                  <TabSelector
                    icons={[
                      "/assets/icons/nft_bids_icon.svg",
                      "/assets/icons/nft_provenance_icon.svg",
                      "/assets/icons/nft_bids_icon.svg",
                    ]}
                    tabs={tabs}
                    activeTab={activeTab}
                    tabClick={(e) => _handleTabClick(e)}
                    extraTab={null}
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
                      <div className="container d-flex align-items-center fs-14px py-15px border-bottom border-color-grey link--unstyled">
                        <div
                          onClick={() =>
                            handleColumnHeaderClick(SORT_BY_USERNAME)
                          }
                          className="col-5 p-0 text-align-center cursor-pointer"
                        >
                          Bidder
                          <i
                            className={[
                              "fas fs-14px",
                              sortByField !== SORT_BY_USERNAME
                                ? "fa-arrows-alt-v"
                                : "",
                              sortByField === SORT_BY_USERNAME && sortDescending
                                ? "fa-sort-alpha-up-alt"
                                : "",
                              sortByField === SORT_BY_USERNAME &&
                              !sortDescending
                                ? "fa-sort-alpha-down"
                                : "",
                            ].join(" ")}
                          ></i>
                        </div>
                        {nftPost.NumNFTCopies > 1 ? (
                          <div
                            onClick={() =>
                              handleColumnHeaderClick(SORT_BY_EDITION)
                            }
                            className="col-2 p-0 text-align-center cursor-pointer"
                          >
                            Edition
                            <i
                              className={[
                                "fas fs-14px",
                                sortByField !== SORT_BY_EDITION
                                  ? "fa-arrows-alt-v"
                                  : "",
                                sortByField === SORT_BY_EDITION &&
                                !sortDescending
                                  ? "fa-sort-amount-up-alt"
                                  : "",
                                sortByField === SORT_BY_EDITION &&
                                sortDescending
                                  ? "fa-sort-amount-down"
                                  : "",
                              ].join(" ")}
                            ></i>
                          </div>
                        ) : null}

                        <div
                          onClick={() => handleColumnHeaderClick(SORT_BY_PRICE)}
                          className={[
                            "p-0 text-align-center cursor-pointer",
                            nftPost.NumNFTCopies == 1 ? "col-7" : "",
                            nftPost.NumNFTCopies > 1 ? "col-5" : "",
                          ].join(" ")}
                        >
                          Bid Amount
                          <i
                            className={[
                              "fas fs-14px",
                              sortByField !== EthNftPostComponent.SORT_BY_PRICE
                                ? "fa-arrows-alt-v"
                                : "",
                              sortByField ===
                                EthNftPostComponent.SORT_BY_PRICE &&
                              !sortDescending
                                ? "fa-sort-amount-up-alt"
                                : "",
                              sortByField ===
                                EthNftPostComponent.SORT_BY_PRICE &&
                              sortDescending
                                ? "fa-sort-amount-down"
                                : "",
                            ].join(" ")}
                          ></i>
                        </div>
                      </div>
                      {/* <simple-center-loader *ngIf="refreshingBids"></simple-center-loader> */}
                      {!refreshingBids ? (
                        <div>
                          {bids?.map((bidEntry, i) => (
                            <div
                              key={i}
                              className="container d-flex align-items-center fs-14px p-15px border-bottom border-color-grey link--unstyled"
                            >
                              <div className="row no-gutters w-100">
                                <div className="col-5 d-flex align-items-center mb-0 p-0">
                                  {/* <!-- checkbox or radio button --> */}

                                  {activeTab ===
                                    EthNftPostComponent.MY_AUCTIONS &&
                                  nftPost.NumNFTCopies > 1 &&
                                  userOwnsSerialNumber(
                                    bidEntry.SerialNumber
                                  ) ? (
                                    <input
                                      value={bidEntry.selected}
                                      onChange={() =>
                                        checkSelectedBidEntries(bidEntry)
                                      }
                                      className="pr-10px cursor-pointer"
                                      type="checkbox"
                                      style="width: 35px"
                                    />
                                  ) : null}

                                  {/*
                                    [value]="bidEntry" ??
                                    [(ngModel)]="selectedBid" ??*/}
                                  {activeTab ===
                                    EthNftPostComponent.MY_AUCTIONS &&
                                  nftPost.NumNFTCopies === 1 &&
                                  userOwnsSerialNumber(
                                    bidEntry.SerialNumber
                                  ) ? (
                                    <input
                                      value={bidEntry}
                                      onChange={() => selectBidEntry(bidEntry)}
                                      className="pr-10px cursor-pointer"
                                      type="radio"
                                      style="width: 35px"
                                    />
                                  ) : null}

                                  {activeTab === MY_BIDS ? (
                                    <i
                                      onClick={() => cancelBid(bidEntry)}
                                      className="fas fa-trash pr-10px text-danger cursor-pointer fs-18px"
                                    ></i>
                                  ) : null}
                                  {/* <!-- Avatar --> */}
                                  <div className="simple-profile-card__avatar-container">
                                    <Avatar
                                      classN="simple-profile-card__avatar br-12px"
                                      avatar={bidEntry.PublicKeyBase58Check}
                                    ></Avatar>
                                  </div>
                                  <div className="text-truncate holdings__name fs-14px">
                                    <div className="d-flex">
                                      <Link
                                        href={
                                          bidEntry.ProfileEntryResponse
                                            ?.Username
                                            ? 
                                                "/" + RouteNames.USER_PREFIX + "/" +
                                                bidEntry.ProfileEntryResponse
                                                  .Username
                                              
                                            : ""
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
                                          style={{
                                            maxWidth: "120px",
                                            pointerEvents: !!bidEntry
                                              .ProfileEntryResponse?.Username
                                              ? "auto"
                                              : "none",
                                          }}
                                        >
                                          {bidEntry.ProfileEntryResponse
                                            ?.Username ||
                                            bidEntry.PublicKeyBase58Check}
                                        </div>
                                      </Link>
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
                                    {bidEntry.ProfileEntryResponse ? (
                                      <div className="text-grey9">
                                        {nanosToUSD(
                                          bidEntry.ProfileEntryResponse
                                            .CoinPriceDeSoNanos,
                                          2
                                        )}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                                {nftPost.NumNFTCopies > 1 ? (
                                  <div className="col-2 d-flex align-items-center justify-content-center mb-0 p-0">
                                    {bidEntry.SerialNumber > 0 &&
                                      "#" + bidEntry.SerialNumber.toString()}
                                  </div>
                                ) : null}

                                <div
                                  className={[
                                    "d-flex align-items-center mb-0 justify-content-around p-0",
                                    nftPost.NumNFTCopies == 1 ? "col-7" : "",
                                    nftPost.NumNFTCopies > 1 ? "col-5" : "",
                                  ].join(" ")}
                                >
                                  <span>
                                    {globalVars.nanosToDeSo(
                                      bidEntry.BidAmountNanos,
                                      5
                                    )}{" "}
                                    $DESO
                                  </span>
                                  <span>
                                    ~{nanosToUSD(bidEntry.BidAmountNanos, 2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ) : null}
              {activeTab === EthNftPostComponent.OWNERS ? (
                <div className="nft-post-mobile-padding">
                  {!loading ? (
                    <div>
                      {/* <!-- desktop --> */}
                      {!isMobile() ? (
                        <div className="eth-provenance-container">
                          {/* <!-- owner --> */}
                          <div className="eth-provenance-row-container">
                            <p className="eth-provenance-row-header">Sold to</p>
                            {ethNFTOwnerDesoProfile ? (
                              <div className="eth-provenance-deso-profile-container">
                                <div className="profile-img">
                                  <Link
                                    href={
                                      "/" +
                                      RouteNames.USER_PREFIX +
                                      "/" +
                                      ethNFTOwnerDesoUsername
                                    }
                                  >
                                    <Avatar
                                      avatar={ethNFTOwnerDesoPublicKey}
                                    ></Avatar>
                                  </Link>
                                </div>
                                <Link
                                  href={
                                    "/" +
                                    RouteNames.USER_PREFIX +
                                    "/" +
                                    ethNFTOwnerDesoUsername
                                  }
                                >
                                  <a className="username-nft-card font-weight-bold">
                                    {ethNFTOwnerDesoUsername}
                                    {ethNFTOwnerDesoIsVerified ? (
                                      <i className="fas fa-check-circle pl-5px fa-md text-primary"></i>
                                    ) : null}
                                  </a>
                                </Link>
                              </div>
                            ) : (
                              <div className="eth-provenance-deso-profile-container">
                                <p className="eth-provenance-row-text">
                                  {ethNFTOwnerWalletAddress}
                                </p>
                              </div>
                            )}

                            <p className="eth-provenance-row-price">
                              {ethNFTOwnerPrice}
                            </p>
                            <p className="eth-provenance-row-timestamp">
                              {ethNFTOwnerTimestamp}
                            </p>
                          </div>
                          {/* <!-- seller --> */}
                          <div className="eth-provenance-row-container">
                            <p className="eth-provenance-row-header">
                              Listed by
                            </p>
                            {ethNFTSellerDesoProfile ? (
                              <div className="eth-provenance-deso-profile-container">
                                <div className="profile-img">
                                  <Link
                                    href={
                                      "/" +
                                      RouteNames.USER_PREFIX +
                                      "/" +
                                      ethNFTSellerDesoUsername
                                    }
                                  >
                                    <Avatar
                                      avatar={ethNFTSellerDesoPublicKey}
                                      classN=""
                                    ></Avatar>
                                  </Link>
                                </div>
                                <Link
                                  href={
                                    "/" +
                                    globalVars.RouteNames.USER_PREFIX +
                                    "/" +
                                    ethNFTSellerDesoUsername
                                  }
                                >
                                  <a className="username-nft-card font-weight-bold">
                                    {this.ethNFTSellerDesoUsername}
                                    {ethNFTSellerDesoIsVerified ? (
                                      <i className="fas fa-check-circle pl-5px fa-md text-primary"></i>
                                    ) : null}
                                  </a>
                                </Link>
                              </div>
                            ) : null}

                            {!ethNFTSellerDesoProfile ? (
                              <div className="eth-provenance-deso-profile-container">
                                <p className="eth-provenance-row-text">
                                  {this.ethNFTSellerWalletAddress}
                                </p>
                              </div>
                            ) : null}

                            <p className="eth-provenance-row-price">
                              {this.ethNFTSellerPrice}
                            </p>
                            <p className="eth-provenance-row-timestamp">
                              {this.ethNFTSellerTimestamp}
                            </p>
                          </div>
                          {/* <!-- creator --> */}
                          <div className="eth-provenance-row-container">
                            <p className="eth-provenance-row-header">
                              Minted by
                            </p>
                            {ethNFTCreatorDesoProfile ? (
                              <div className="eth-provenance-deso-profile-container">
                                <div className="profile-img">
                                  <Link
                                    href={
                                      "/" +
                                      RouteNames.USER_PREFIX +
                                      "/" +
                                      ethNFTCreatorDesoUsername
                                    }
                                  >
                                    <Avatar
                                      avatar={ethNFTCreatorDesoPublicKey}
                                      classN=""
                                    ></Avatar>
                                  </Link>
                                </div>

                                <Link
                                  href={
                                    "/" +
                                    RouteNames.USER_PREFIX +
                                    "/" +
                                    ethNFTCreatorDesoUsername
                                  }
                                >
                                  <a className="username-nft-card font-weight-bold">
                                    {ethNFTCreatorDesoUsername}
                                    {ethNFTCreatorDesoIsVerified ? (
                                      <i className="fas fa-check-circle pl-5px fa-md text-primary"></i>
                                    ) : null}
                                  </a>
                                </Link>
                              </div>
                            ) : null}

                            {!ethNFTCreatorDesoProfile ? (
                              <div className="eth-provenance-deso-profile-container">
                                <p className="eth-provenance-row-text">
                                  {ethNFTCreatorWalletAddress}
                                </p>
                              </div>
                            ) : null}
                            <p className="eth-provenance-row-price">-</p>
                            <p className="eth-provenance-row-timestamp">
                              {ethNFTCreatorTimestamp}
                            </p>
                          </div>
                        </div>
                      ) : null}

                      {/* <!-- mobile --> */}
                      {isMobile() ? (
                        <div className="eth-provenance-container-mobile">
                          {/* <!-- owner --> */}
                          <div className="eth-provenance-row-container">
                            <p className="eth-provenance-row-header-mobile">
                              Sold to
                            </p>
                            {ethNFTOwnerDesoProfile ? (
                              <div className="eth-provenance-deso-profile-container">
                                <div className="profile-img-mobile">
                                  <Link
                                    href={
                                      "/" +
                                      RouteNames.USER_PREFIX +
                                      "/" +
                                      ethNFTOwnerDesoUsername
                                    }
                                  >
                                    <Avatar
                                      classN=""
                                      avatar={ethNFTOwnerDesoPublicKey}
                                    ></Avatar>
                                  </Link>
                                </div>

                                <Link
                                  href={
                                    "/" +
                                    RouteNames.USER_PREFIX +
                                    "/" +
                                    ethNFTOwnerDesoUsername
                                  }
                                >
                                  <a className="username-nft-card-mobile font-weight-bold">
                                    {ethNFTOwnerDesoUsername}
                                    {ethNFTOwnerDesoIsVerified ? (
                                      <i className="fas fa-check-circle pl-5px fa-md text-primary"></i>
                                    ) : null}
                                  </a>
                                </Link>
                              </div>
                            ) : (
                              <div className="eth-provenance-deso-profile-container">
                                <p className="eth-provenance-row-text-mobile">
                                  {this.ethNFTOwnerWalletAddress}
                                </p>
                              </div>
                            )}

                            <p className="eth-provenance-row-price-mobile">
                              {ethNFTOwnerPrice}
                            </p>
                            <p className="eth-provenance-row-timestamp-mobile">
                              {ethNFTOwnerTimestamp}
                            </p>
                          </div>
                          {/* <!-- seller --> */}
                          <div className="eth-provenance-row-container">
                            <p className="eth-provenance-row-header-mobile">
                              Listed by
                            </p>
                            {ethNFTSellerDesoProfile ? (
                              <div className="eth-provenance-deso-profile-container">
                                <div className="profile-img-mobile">
                                  <Link
                                    href={
                                      "/" +
                                      RouteNames.USER_PREFIX +
                                      "/" +
                                      ethNFTSellerDesoUsername
                                    }
                                  >
                                    <Avatar
                                      avatar={ethNFTSellerDesoPublicKey}
                                    ></Avatar>
                                  </Link>
                                </div>
                                <Link
                                  href={
                                    "/" +
                                    RouteNames.USER_PREFIX +
                                    "/" +
                                    ethNFTSellerDesoUsername
                                  }
                                >
                                  <a className="username-nft-card-mobile font-weight-bold">
                                    {ethNFTSellerDesoUsername}
                                    {ethNFTSellerDesoIsVerified ? (
                                      <i className="fas fa-check-circle pl-5px fa-md text-primary"></i>
                                    ) : null}
                                  </a>
                                </Link>
                              </div>
                            ) : (
                              <div className="eth-provenance-deso-profile-container">
                                <p className="eth-provenance-row-text-mobile">
                                  {ethNFTSellerWalletAddress}
                                </p>
                              </div>
                            )}

                            <p className="eth-provenance-row-price-mobile">
                              {ethNFTSellerPrice}
                            </p>
                            <p className="eth-provenance-row-timestamp-mobile">
                              {ethNFTSellerTimestamp}
                            </p>
                          </div>
                          {/* <!-- creator --> */}
                          <div className="eth-provenance-row-container">
                            <p className="eth-provenance-row-header-mobile">
                              Minted by
                            </p>
                            {ethNFTCreatorDesoProfile ? (
                              <div className="eth-provenance-deso-profile-container">
                                <div className="profile-img-mobile">
                                  <Link
                                    href={
                                      "/" +
                                      RouteNames.USER_PREFIX +
                                      "/" +
                                      ethNFTCreatorDesoUsername
                                    }
                                  >
                                    <Avatar
                                      avatar={ethNFTCreatorDesoPublicKey}
                                      classN=""
                                    ></Avatar>
                                  </Link>
                                </div>
                                <Link
                                  href={
                                    "/" +
                                    RouteNames.USER_PREFIX +
                                    "/" +
                                    ethNFTCreatorDesoUsername
                                  }
                                >
                                  <a className="username-nft-card-mobile font-weight-bold">
                                    {ethNFTCreatorDesoUsername}
                                    {ethNFTCreatorDesoIsVerified ? (
                                      <i className="fas fa-check-circle pl-5px fa-md text-primary"></i>
                                    ) : null}
                                  </a>
                                </Link>
                              </div>
                            ) : (
                              <div className="eth-provenance-deso-profile-container">
                                <p className="eth-provenance-row-text-mobile">
                                  {this.ethNFTCreatorWalletAddress}
                                </p>
                              </div>
                            )}

                            <p className="eth-provenance-row-price-mobile">-</p>
                            <p className="eth-provenance-row-timestamp-mobile">
                              {ethNFTCreatorTimestamp}
                            </p>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ) : null}

              {activeTab === COMMENTS ? (
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
                              avatar={loggedInUser.PublicKeyBase58Check}
                            ></Avatar>
                          </div>
                          {/*  #autosize="cdkTextareaAutosize" */}
                          <textarea
                            value={commentText}
                            onKeyDown={(e) => _messageTextChanged(e)}
                            cdkTextareaAutosize
                            cdkAutosizeMinRows="1"
                            cdkAutosizeMaxRows="5"
                            placeholder="Make a comment!"
                            className="py-5px fs-15px messages-thread__border-radius flex-grow-1 form-control messages-textarea disable-scrollbars"
                            style="height: 50px"
                          ></textarea>
                          {!this.submittingPost ? (
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
                        className="post_thread_likes_wrapper"
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
                  <label className="mt-30px nft-detail-label">BLOCKCHAIN</label>
                  {/* <!-- DESO --> */}
                  <div className="nft-profile-blockchain-deso">
                    <span>
                      <img
                        className="deso-logo"
                        src="/assets/icons/nft_eth_icon.svg"
                        alt="deso"
                      />
                      <label className="mb-0px">Ethereum</label>
                    </span>
                    <a href="{{ ethTxUrl }}" target="_blank">
                      View on block explorer
                      <img
                        src="/assets/icons/deso_page_link.svg"
                        alt="go to icon"
                      />
                    </a>
                  </div>
                  {/* <!-- Content storage --> */}
                  <label className="mt-30px nft-detail-label">
                    CONTENT STORAGE
                  </label>
                  {/* <!-- ARWEAVE --> */}
                  {contentStorage ? (
                    <div className="nft-profile-content-storage-arweave">
                      <img
                        className="arweave-logo"
                        src="/assets/icons/arweave_icon.svg"
                        alt="deso"
                      />
                      <a href="{{ ethImgUrl }}" target="_blank">
                        View content
                        <img
                          src="/assets/icons/deso_page_link.svg"
                          alt="go to icon"
                        />
                      </a>
                    </div>
                  ) : (
                    <div className="nft-profile-content-storage-arweave">
                      <div className="warning-centralized-server">
                        <img
                          src="/assets/icons/warning_circle_icon.svg"
                          alt="warning icon"
                        />
                        Centralized Server
                      </div>
                      <a>
                        View asset
                        <img
                          src="/assets/icons/deso_page_link.svg"
                          alt="go to icon"
                        />
                      </a>
                    </div>
                  )}
                </div>
              ) : null}

              {!loading &&
              activeTab === EthNftPostComponent.THREAD &&
              !reloadingThread ? (
                <div className="nft-post-mobile-padding">
                  {!loading && !bids?.length ? (
                    <div className="fs-15px pb-0 d-flex justify-content-center nft-no-bids font-weight-semibold">
                      There are no bids yet.
                    </div>
                  ) : null}

                  {!loading && bids?.length ? (
                    <div>
                      <div className="container d-flex align-items-center fs-14px py-15px border-bottom border-color-grey link--unstyled">
                        <div
                          onClick={() =>
                            handleColumnHeaderClick(
                              EthNftPostComponent.SORT_BY_USERNAME
                            )
                          }
                          className="col-5 p-0 text-align-center cursor-pointer"
                        >
                          Bidder
                          <i
                            className={[
                              "fas fs-14px",
                              sortByField !==
                              EthNftPostComponent.SORT_BY_USERNAME
                                ? "fa-arrows-alt-v"
                                : "",
                              sortByField ===
                                EthNftPostComponent.SORT_BY_USERNAME &&
                              sortDescending
                                ? "fa-sort-alpha-up-alt"
                                : "",
                              sortByField ===
                                EthNftPostComponent.SORT_BY_USERNAME &&
                              !sortDescending
                                ? "fa-sort-alpha-down"
                                : "",
                            ].join(" ")}
                          ></i>
                        </div>
                        {nftPost.NumNFTCopies > 1 ? (
                          <div
                            onClick={() =>
                              handleColumnHeaderClick(
                                EthNftPostComponent.SORT_BY_EDITION
                              )
                            }
                            className="col-2 p-0 text-align-center cursor-pointer"
                          >
                            Edition
                            <i
                              className={[
                                "fas fs-14px",
                                sortByField !==
                                EthNftPostComponent.SORT_BY_EDITION
                                  ? "fa-arrows-alt-v"
                                  : "",
                                sortByField ===
                                  EthNftPostComponent.SORT_BY_EDITION &&
                                !sortDescending
                                  ? "fa-sort-amount-up-alt"
                                  : "",
                                sortByField ===
                                  EthNftPostComponent.SORT_BY_EDITION &&
                                sortDescending
                                  ? "fa-sort-amount-down"
                                  : "",
                              ].join(" ")}
                            ></i>
                          </div>
                        ) : null}

                        <div
                          onClick={() =>
                            handleColumnHeaderClick(
                              EthNftPostComponent.SORT_BY_PRICE
                            )
                          }
                          className={[
                            "p-0 text-align-center cursor-pointer",
                            nftPost.NumNFTCopies > 1 ? "col-5" : "",
                            nftPost.NumNFTCopies == 1 ? "col-7" : "",
                          ].join(" ")}
                        >
                          Bid Amount
                          <i
                            className={[
                              "fas fs-14px",
                              sortByField !== SORT_BY_PRICE
                                ? "fa-arrows-alt-v"
                                : "",
                              sortByField === SORT_BY_PRICE && !sortDescending
                                ? "fa-sort-amount-up-alt"
                                : "",
                              sortByField === SORT_BY_PRICE && sortDescending
                                ? "fa-sort-amount-down"
                                : "",
                            ].join(" ")}
                          ></i>
                        </div>
                      </div>
                      {/* <simple-center-loader *ngIf="refreshingBids"></simple-center-loader> */}
                      {!refreshingBids ? (
                        <div>
                          {bids?.map((bidEntry, index) => (
                            <div
                              key={index}
                              className="container d-flex align-items-center fs-14px p-15px border-color-grey link--unstyled"
                            >
                              <div className="row no-gutters w-100">
                                <div className="col-8 d-flex align-items-center mb-0 p-0">
                                  {activeTab ===
                                    EthNftPostComponent.MY_AUCTIONS &&
                                  nftPost.NumNFTCopies > 1 &&
                                  userOwnsSerialNumber(
                                    bidEntry.SerialNumber
                                  ) ? (
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
                                    [value]="bidEntry" ?? 
                                    [(ngModel)]="selectedBid" ??  */}
                                  {activeTab ===
                                    EthNftPostComponent.MY_AUCTIONS &&
                                  nftPost.NumNFTCopies === 1 &&
                                  userOwnsSerialNumber(
                                    bidEntry.SerialNumber
                                  ) ? (
                                    <input
                                      value={selectedBid}
                                      onChange={() => selectBidEntry(bidEntry)}
                                      className="pr-10px cursor-pointer"
                                      type="radio"
                                      style="width: 35px"
                                    />
                                  ) : null}

                                  {activeTab === EthNftPostComponent.MY_BIDS ? (
                                    <i
                                      onClick={() => cancelBid(bidEntry)}
                                      className="fas fa-trash pr-10px text-danger cursor-pointer fs-18px"
                                    ></i>
                                  ) : null}

                                  <div className="simple-profile-card__avatar-container">
                                    <Avatar
                                      classN="simple-profile-card__avatar br-12px"
                                      avatar={bidEntry.PublicKeyBase58Check}
                                    ></Avatar>
                                  </div>
                                  <div className="text-truncate holdings__name fs-14px">
                                    <div className="d-flex">
                                      {/*
                                        [style.pointer-events]="!!bidEntry.ProfileEntryResponse?.Username ? 'auto' : 'none'" */}
                                      <Link
                                        href={
                                          "/" +
                                          RouteNames.USER_PREFIX +
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
                                      {/* [matTooltip]="'This account is verified'"
                                        #tooltip="matTooltip" */}{" "}
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
                                {nftPost.NumNFTCopies > 1 ? (
                                  <div
                                    className={
                                      "d-flex align-items-center mb-0 justify-content-around p-0 col-4"
                                    }
                                  >
                                    <span>
                                      {nanosToDeSo(bidEntry.BidAmountNanos, 5)}{" "}
                                      $DESO
                                    </span>
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
      ) : null}
    </>
  );
};
export default ETHNFTPostPage;
