import styles from "../../../styles/NFT/NFTPostPage/NFTPostPage.module.scss";
import PostIconRow from "../../Feed/postIconRow";
import BidBox from "../BidBox/bidBox";

const NFTPostPage = () => {
  return (
    <>
      {/* <!-- Top Bar -->
<!-- FIXME: TODO: post threads: loading skeletons --> */}
      {/* *ngIf="nftPost" */}
      <div className="d-flex flex-column">
        {/* <!-- New Page design --> */}
        <div className="nft_details_main_wrapper">
          {/* <!-- Main Post Area --> */}
          <div className="nft-details-top">
            <div className="nft_bx nft_feed_post_design gray">
              {/* *ngIf="nftPost && nftBidData" */}
              <div
                className="d-flex flex-center"
                style="height: 100%; width: 100%"
              >
                {/* <!--  afterCommentCreatedCallback explanation: Here, the "post" is a top-level post. A new comment on a -->
          <!--  top-level post should be prepended to the post's list of comments --> */}

                {/* <!-- Image Post --> */}
                {/* *ngIf="
              nftPost.ImageURLs &&
              nftPost.ImageURLs[0] &&
              !nftPost.ParentStakeID &&
              !nftPost.PostExtraData?.arweaveAudioSrc &&
              !nftPost.PostExtraData?.arweaveModelSrc
            " */}
                <app-image
                  class="w-100 h-100 d-flex flex-center"
                  ngClass="{ 'mb-10px': quotedContent && showQuotedContent }"
                  imageSrc="nftPost.ImageURLs[0]"
                ></app-image>

                {/* <!-- Audio Post --> */}
                {/* *ngIf="nftPost.PostExtraData?.arweaveAudioSrc" */}
                <app-audio
                  class="w-100 h-100 d-flex flex-center"
                  imageSrc="nftPost.ImageURLs[0]"
                  songName="nftPost.PostExtraData?.name"
                  creator="nftPost.ProfileEntryResponse?.Username"
                  audioSrc="nftPost.PostExtraData.arweaveAudioSrc"
                ></app-audio>

                {/* <!-- Video Post --> */}
                {/* *ngIf="nftPost.PostExtraData?.arweaveVideoSrc" */}
                <app-video
                  class="w-100 h-100 d-flex flex-center"
                  videoSrc="nftPost.PostExtraData.arweaveVideoSrc"
                ></app-video>

                {/* <!-- Reqular deso video --> */}
                {/* *ngIf="
              nftPost.VideoURLs &&
              nftPost.VideoURLs[0] &&
              !nftPost.ParentStakeID &&
              !nftPost.PostExtraData.arweaveVideoSrc
            " */}
                <div
                  className="d-flex flex-center w-100"
                  ngClass="{ 'mb-10px': quotedContent && showQuotedContent }"
                >
                  {/* allowfullscreen */}
                  <iframe
                    src="nftPost.VideoURLs[0] | sanitizeVideoUrl"
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                    className="w-100 br-10px"
                  ></iframe>
                  {/* <!--feed-post__video--> */}
                </div>
                {/* <!-- Embedded content --> */}
                {/* *ngIf="constructedEmbedURL" */}
                <div className="d-flex flex-center w-100">
                  {/* [height]="getEmbedHeight()" */}
                  <iframe
                    id="embed-iframe"
                    src="constructedEmbedURL | sanitizeEmbed"
                    frameBorder="0"
                    allow="picture-in-picture; clipboard-write; encrypted-media; gyroscope; accelerometer; encrypted-media;"
                    allowFullScreen
                    className="w-100 br-10px"
                  ></iframe>
                </div>

                {/* <!-- 3D Model Post --> */}
                {/* *ngIf="nftPost.PostExtraData.arweaveModelSrc" */}
                <div style="height: 100%; width: 100%">
                  {/* *ngIf="nftPost.ImageURLs && nftPost.ImageURLs[0] && !nftPost.ParentStakeID" */}
                  {/* [ngClass]="{ 'mb-10px': quotedContent && showQuotedContent }" */}
                  <div style="height: 100%; width: 100%">
                    <app-model
                      style="height: 100%; width: 100%"
                      class="d-flex flex-center"
                      postModelArweaveSrc="nftPost.PostExtraData.arweaveModelSrc"
                    ></app-model>
                  </div>
                </div>
              </div>

              {/* <!-- Full Screen Post Options --> */}
              {/* <!-- nftPost.PostExtraData.arweaveModelSrc; then showFullScreenModel; else showFullScreenImage --> */}
              {/* <ng-container *ngIf="nftPost.PostExtraData.arweaveModelSrc; else showFullScreenImage"></ng-container> */}

              {/* <!-- Fullscreen button for 3D posts -->
        <!-- THIS CURRENTLY IS NOT USED, BUT CAN BE TWEAKED TO WORK --> */}
              {/* <ng-template #showFullScreenModel> */}
              {/*  (click)="openModelModal($event, nftPost.PostExtraData.arweaveModelSrc)" */}
              <button type="button" className="inlrg" data-toggle="modal">
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
              {/* </ng-template> */}

              {/* <!-- Fullscreen button for image posts --> */}
              {/* <ng-template #showFullScreenImage> */}
              {/* <!-- Unfortunately there is currently no way to target image NFTs specifically --> */}
              {/* *ngIf="!nftPost.PostExtraData.arweaveAudioSrc && !nftPost.PostExtraData.arweaveVideoSrc" */}
              {/* (click)="openImgModal($event, nftPost.ImageURLs[0])" */}
              <button type="button" className="inlrg" data-toggle="modal">
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
              {/* </ng-template> */}
            </div>

            <div className="nft_bx nft_feed_post_wt_design post">
              {/*  *ngIf="nftPost && nftBidData" */}
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
                  afterCommentCreatedCallback={incrementCommentCounter.bind(this)}
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
                    multipleBidsCancellation={(e) => onMultipleBidsCancellation(e)}
                  ></BidBox>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- DESKTOP COMMENTS --> */}
          {/* *ngIf="isMobile" */}
          <div className="nft_profile_mobile_engagement_wrapper">
            {/* *ngIf="showIconRow" */}
            <PostIconRow
              class="w-100"
              isNFTProfile={true}
              post={post}
              postContent={postContent}
              parentPost={parentPost}
              afterCommentCreatedCallback={prependPostToFeed.bind(this)}
            ></PostIconRow>
          </div>
          {/* *ngIf="!isMobile" */}
          <div className="nft_bx linebx">
            <div className="comments_likes_list">
              <div className="nft-post-icon-row-wrapper h-50 d-flex flex-center">
                {/* *ngIf="showIconRow" */}
                <feed-post-icon-row
                  class="w-100"
                  isNFTProfile="true"
                  post="post"
                  postContent="postContent"
                  parentPost="parentPost"
                  afterCommentCreatedCallback="prependPostToFeed.bind(this)"
                ></feed-post-icon-row>
              </div>
              <div className="nft-profile-engagement-string">
                <div className="d-flex flex-center">
                  <span className="engagement-string-item">
                    <b>{globalVars.abbreviateNumber(nftPost.CommentCount)}</b>
                    Comments
                  </span>
                  <span className="engagement-string-item">
                    <b>
                      {globalVars.abbreviateRepostsNumber(
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
                    <b>{globalVars.abbreviateNumber(nftPost.DiamondCount)}</b>
                    Diamonds
                  </span>
                </div>
              </div>
            </div>
            {/* <!-- feed-post End -->
      <!-- <h3 class="hdb">Comments</h3> -->
      <!-- <simple-center-loader *ngIf="refreshingBids"></simple-center-loader> --> */}
            {/* *ngIf="!nftPost.CommentCount && !nftPost.ParentStakeID" */}
            <div className="p-15px d-flex flex-column flex-center nft-no-comments font-weight-semiboldn">
              No comments yet
              {/* (click)="openRepostsModal($event)" */}
              <button className="font-weight-semiboldn mt-20px">
                <img src="/assets/icons/comment.svg" alt="plus-icon" />
                Comment
              </button>
            </div>
            {/* *ngIf="nftPost.CommentCount || nftPost.ParentStakeID" */}
            <div className="nft-profile-comment-section">
              {/* *ngIf="globalVars.loggedInUser?.PublicKeyBase58Check" */}
              <div className="send-message-thread-container">
                <div className="fake-textarea-container">
                  <div className="avatar-box-send-message">
                    <Avatar
                      class="messages-thread__avatar_send_message"
                      avatar={loggedInUser?.PublicKeyBase58Check}
                    ></Avatar>
                  </div>
                  {/* (keypress)="_messageTextChanged($event)"
              [(ngModel)]="commentText" 
               #autosize="cdkTextareaAutosize"
               */}
                  <textarea
                    cdkTextareaAutosize
                    cdkAutosizeMinRows="1"
                    cdkAutosizeMaxRows="5"
                    placeholder="Make a comment!"
                    className="py-5px fs-15px messages-thread__border-radius flex-grow-1 form-control messages-textarea disable-scrollbars"
                    style="height: 50px"
                  ></textarea>
                  {/* *ngIf="!this.submittingPost"
              (click)="submitPost()" */}
                  <button className="btn btn-send-message fs-15px ml-15px messages-thread__border-radius">
                    <img src="/assets/icons/white-send.svg" />
                  </button>
                  {/* *ngIf="this.submittingPost" */}
                  <button className="btn btn-send-message fs-15px ml-15px messages-thread__border-radius">
                    <i className="fa fa-spinner fa-spin"></i>
                  </button>
                </div>
              </div>
              {/* #postThread */}
              <post-thread
                class="post_thread_likes_wrapper"
                isNFTProfile="true"
                hideHeader="true"
                fromNFTDetail="true"
                hideCurrentPost="!nftPost.ParentStakeID"
              ></post-thread>
            </div>
            {/* (click)="openRepostsModal($event)"
             *ngIf="!(nftPost.CommentCount || nftPost.ParentStakeID || canReplaceExistingIcons)" */}
            <button type="button" className="add_comment_btn">
              <i>+</i>
              Comment
            </button>
          </div>
          <div className="nft_bx bids_new_sc">
            {/* *ngIf="!loading" */}
            <div className="borderbg feed-post__blue-border">
              <TabSelector
                icons="icons"
                tabs="tabs"
                activeTab="activeTab"
                tabClick="_handleTabClick($event)"
              ></TabSelector>
            </div>
            {/* *ngIf="showBidsView" */}
            <div className="nft-post-mobile-padding">
              {/* *ngIf="!loading && !bids?.length" */}
              <div className="fs-15px p-15px pb-0 d-flex justify-content-center nft-no-bids">
                There are no bids yet.
              </div>
              {/* *ngIf="!loading && bids?.length" */}
              <div>
                <div className="container d-flex align-items-center fs-14px py-15px link--unstyled">
                  {/* [ngClass]="{ 'col-6': nftPost.NumNFTCopies == 1, 'col-5': nftPost.NumNFTCopies > 1 }"
              (click)="handleColumnHeaderClick(NftPostComponent.SORT_BY_USERNAME)" */}
                  <div className="col-5 nft-detail-div">BIDDER</div>
                  {/* [ngClass]="{ 'col-6': nftPost.NumNFTCopies == 1, 'col-5': nftPost.NumNFTCopies > 1 }"
              (click)="handleColumnHeaderClick(NftPostComponent.SORT_BY_PRICE)" */}
                  <div className="p-0 nft-detail-div">BID AMOUNT</div>
                  {/* *ngIf="nftPost.NumNFTCopies > 1"
              (click)="handleColumnHeaderClick(NftPostComponent.SORT_BY_EDITION)" */}
                  <div className="col-2 p-0 nft-detail-div">EDITION</div>
                </div>
                {/* <simple-center-loader *ngIf="refreshingBids"></simple-center-loader> */}
                {/* *ngIf="!refreshingBids" */}
                <div>
                  {/* *ngFor="let bidEntry of bids; let i = index" */}
                  <div className="container d-flex align-items-center fs-14px p-15px link--unstyled">
                    <div className="row no-gutters w-100">
                      <div className="col-5 d-flex align-items-center mb-0 p-0">
                        {/* <!-- checkbox or radio button --> */}
                        {/* *ngIf="
                      activeTab === NftPostComponent.MY_AUCTIONS &&
                      nftPost.NumNFTCopies > 1 &&
                      userOwnsSerialNumber(bidEntry.SerialNumber)
                    "
                    [(ngModel)]="bidEntry.selected"
                    (ngModelChange)="checkSelectedBidEntries(bidEntry)" */}
                        <input
                          className="pr-10px cursor-pointer"
                          type="checkbox"
                          style="width: 35px"
                        />
                        {/* *ngIf="
                      activeTab === NftPostComponent.MY_AUCTIONS &&
                      nftPost.NumNFTCopies === 1 &&
                      userOwnsSerialNumber(bidEntry.SerialNumber)
                    "
                    [value]="bidEntry"
                    [(ngModel)]="selectedBid"
                    (ngModelChange)="selectBidEntry(bidEntry)" */}
                        <input
                          className="pr-10px cursor-pointer"
                          type="radio"
                          style="width: 35px"
                        />
                        {/*                     *ngIf="activeTab === NftPostComponent.MY_BIDS"
                    (click)="cancelBid(bidEntry)" */}
                        <i className="fas fa-trash pr-10px text-danger cursor-pointer fs-18px"></i>
                        {/* <!-- Avatar --> */}
                        <Avatar
                          class="nft-profile-tabs-avatar mr-10px"
                          avatar="bidEntry.PublicKeyBase58Check"
                        ></Avatar>
                        <div className="text-truncate holdings__name fs-14px">
                          <div className="d-flex">
                            {/* [ngClass]="{ 'cursor-pointer': !!bidEntry.ProfileEntryResponse?.Username }"
                        [style.pointer-events]="!!bidEntry.ProfileEntryResponse?.Username ? 'auto' : 'none'"
                        [routerLink]="
                          bidEntry.ProfileEntryResponse?.Username
                            ? ['/' + globalVars.RouteNames.USER_PREFIX, bidEntry.ProfileEntryResponse.Username]
                            : []
                        " */}
                            <div
                              className="fc-default font-weight-bold text-truncate fs-14px"
                              style="max-width: 120px"
                            >
                              {bidEntry.ProfileEntryResponse?.Username ||
                                bidEntry.PublicKeyBase58Check}
                            </div>
                            {/* *ngIf="bidEntry.ProfileEntryResponse?.IsVerified"
                        (click)="tooltip.toggle()" */}
                            {/* [matTooltip]="'This account is verified'"
                        #tooltip="matTooltip" */}
                            <span
                              className="ml-1 mb-1 cursor-pointer text-primary"
                              matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
                            >
                              <i className="fas fa-check-circle fa-md align-middle"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* [ngClass]="{ 'col-7': nftPost.NumNFTCopies == 1, 'col-5': nftPost.NumNFTCopies > 1 }" */}
                      <div className="d-flex align-items-center mb-0 p-0">
                        <span className="mr-5px last-price-deso">
                          {globalVars.nanosToDeSo(bidEntry.BidAmountNanos, 5)}{" "}
                          DESO
                        </span>
                        <span className="last-price-usd">
                          ~{globalVars.nanosToUSD(bidEntry.BidAmountNanos, 2)}
                        </span>
                      </div>
                      {/* *ngIf="nftPost.NumNFTCopies > 1" */}
                      <div className="col-2 d-flex align-items-center mb-0 p-0">
                        {bidEntry.SerialNumber > 0 &&
                          "#" + bidEntry.SerialNumber.toString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* *ngIf="activeTab === NftPostComponent.OWNERS" */}
            <div className="nft-post-mobile-padding">
              {/* *ngIf="!loading" */}
              <div>
                <div className="container d-flex align-items-center fs-14px py-15px link--unstyled">
                  {/*  [ngClass]="{ 'col-6': nftPost.NumNFTCopies == 1, 'col-5': nftPost.NumNFTCopies > 1 }"
              (click)="handleColumnHeaderClick(NftPostComponent.SORT_BY_USERNAME)" */}
                  <div className="nft-detail-div pl-0px">OWNER</div>
                  {/* [ngClass]="{ 'col-6': nftPost.NumNFTCopies == 1, 'col-5': nftPost.NumNFTCopies > 1 }"
              (click)="handleColumnHeaderClick(NftPostComponent.SORT_BY_PRICE)" */}
                  <div className="nft-detail-div pl-0px">LAST PRICE</div>
                  {/* *ngIf="nftPost.NumNFTCopies > 1"
              (click)="handleColumnHeaderClick(NftPostComponent.SORT_BY_EDITION)" */}
                  <div className="nft-detail-div col-2 pl-0px">EDITION</div>
                </div>
                <div>
                  {/* *ngFor="let owner of owners; let i = index" */}
                  <div className="container d-flex align-items-center fs-14px p-15px link--unstyled">
                    <div className="row no-gutters w-100 py-5px">
                      {/* [ngClass]="{ 'col-6': nftPost.NumNFTCopies == 1, 'col-5': nftPost.NumNFTCopies > 1 }" */}
                      <div className="d-flex align-items-center mb-0 p-0">
                        {/* <!-- Avatar --> */}
                        <Avatar
                          class="nft-profile-tabs-avatar mr-10px"
                          avatar="owner.OwnerPublicKeyBase58Check"
                        ></Avatar>
                        <div className="d-flex flex-center">
                          {/* [ngClass]="{ 'cursor-pointer': !!owner.ProfileEntryResponse?.Username }"
                      [style.pointer-events]="!!owner.ProfileEntryResponse?.Username ? 'auto' : 'none'"
                      [routerLink]="
                        owner.ProfileEntryResponse?.Username
                          ? ['/' + globalVars.RouteNames.USER_PREFIX, owner.ProfileEntryResponse.Username]
                          : []
                      " */}
                          <p className="fc-default font-weight-bold text-truncate holdings__name fs-14px">
                            {owner.ProfileEntryResponse?.Username ||
                              owner.OwnerPublicKeyBase58Check}
                          </p>
                          {/* *ngIf="owner.ProfileEntryResponse?.IsVerified"
                      (click)="tooltip.toggle()" */}
                          {/* [matTooltip]="'This account is verified'"
                      #tooltip="matTooltip" */}
                          <span
                            className="ml-1 cursor-pointer text-primary"
                            matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
                          >
                            <i className="fas fa-check-circle fa-md align-middle"></i>
                          </span>
                        </div>
                      </div>
                      {/* [ngClass]="{ 'col-6': nftPost.NumNFTCopies == 1, 'col-5': nftPost.NumNFTCopies > 1 }" */}
                      <div className="d-flex align-items-center mb-0 p-0">
                        <span className="mr-5px last-price-deso">
                          {globalVars.nanosToDeSo(
                            owner.LastAcceptedBidAmountNanos,
                            5
                          )}{" "}
                          DESO
                        </span>
                        <span className="last-price-usd">
                          {globalVars.nanosToUSD(
                            owner.LastAcceptedBidAmountNanos,
                            2
                          )}
                        </span>
                      </div>
                      {/* *ngIf="nftPost.NumNFTCopies > 1" */}
                      <div className="col-2 d-flex align-items-center mb-0 p-0">
                        {owner.SerialNumber > 0 &&
                          "#" + owner.SerialNumber.toString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* *ngIf="activeTab === NftPostComponent.COMMENTS" */}
            <div className="nft-post-mobile-padding">
              {/* <!-- feed-post End -->
        <!-- <h3 class="hdb">Comments</h3> -->
        <!-- <simple-center-loader *ngIf="refreshingBids"></simple-center-loader> --> */}
              {/* *ngIf="!nftPost.CommentCount && !nftPost.ParentStakeID" */}
              <div className="p-15px d-flex flex-column flex-center nft-no-comments font-weight-semiboldn">
                No comments yet
                {/* (click)="openRepostsModal($event)" */}
                <button className="font-weight-semiboldn mt-20px">
                  <img src="/assets/icons/comment.svg" alt="plus-icon" />
                  Comment
                </button>
              </div>
              {/* *ngIf="nftPost.CommentCount || nftPost.ParentStakeID" */}
              <div className="nft-profile-comment-section">
                <div className="send-message-thread-container">
                  <div className="fake-textarea-container">
                    <div className="avatar-box-send-message">
                      <Avatar
                        class="messages-thread__avatar_send_message"
                        avatar="this.globalVars.loggedInUser.PublicKeyBase58Check"
                      ></Avatar>
                    </div>
                    {/* (keypress)="_messageTextChanged($event)"
                [(ngModel)]="commentText" 
                #autosize="cdkTextareaAutosize"
                */}
                    <textarea
                      cdkTextareaAutosize
                      cdkAutosizeMinRows="1"
                      cdkAutosizeMaxRows="5"
                      placeholder="Make a comment!"
                      className="py-5px fs-15px messages-thread__border-radius flex-grow-1 form-control messages-textarea disable-scrollbars"
                      style="height: 50px"
                    ></textarea>
                    {/* *ngIf="!this.submittingPost"
                (click)="submitPost()" */}
                    <button className="btn btn-send-message fs-15px ml-15px messages-thread__border-radius">
                      <img src="/assets/icons/white-send.svg" />
                    </button>
                    {/* *ngIf="this.submittingPost" */}
                    <button className="btn btn-send-message fs-15px ml-15px messages-thread__border-radius">
                      <i className="fa fa-spinner fa-spin"></i>
                    </button>
                  </div>
                </div>
                {/* #postThread */}
                <PostThread
                  class="post_thread_likes_wrapper"
                  isNFTProfile="true"
                  hideHeader="true"
                  fromNFTDetail="true"
                  hideCurrentPost="!nftPost.ParentStakeID"
                ></PostThread>
              </div>
              {/* (click)="openRepostsModal($event)"
               *ngIf="!(nftPost.CommentCount || nftPost.ParentStakeID || canReplaceExistingIcons)" */}
              <button type="button" className="add_comment_btn">
                <i>+</i>
                Comment
              </button>
            </div>
            {/* <!-- DETAILS --> */}
            {/* *ngIf="activeTab === NftPostComponent.DETAILS" */}
            <div className="nft-post-mobile-padding">
              {/* *ngIf="propertiesBool" */}
              <label className="mt-15px nft-detail-label">PROPERTIES</label>
              <div className="nft-post-property-container">
                {/* *ngFor="let property of properties" */}
                <div className="d-flex flex-column flex-center nft-post-property-box mt-10px">
                  <label className="mb-0px fs-14px pl-10px pr-10px">
                    {property[0].toUpperCase()}
                  </label>
                  <label className="mb-0px font-weight-bold fs-16px pl-10px pr-10px">
                    {property[1]}
                  </label>
                </div>
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
                {/* (click)="viewBlock()" */}
                <a>
                  View on block explorer
                  <img
                    src="/assets/icons/deso_page_link.svg"
                    alt="go to icon"
                  />
                </a>
              </div>
              {/* <!-- Content storage --> */}
              {/* *ngIf="!textNFT" */}
              <label className="mt-30px nft-detail-label">
                CONTENT STORAGE
              </label>
              {/* <!-- ARWEAVE --> */}
              {/* *ngIf="contentStorage && !textNFT" */}
              <div className="nft-profile-content-storage-arweave">
                <img
                  className="arweave-logo"
                  src="/assets/icons/arweave_icon.svg"
                  alt="deso"
                />
                {/* (click)="viewAssetArweave()" */}
                <a>
                  View content
                  <img
                    src="/assets/icons/deso_page_link.svg"
                    alt="go to icon"
                  />
                </a>
              </div>
              {/* <!-- CENTRALIZED --> */}
              {/*  *ngIf="!contentStorage && !textNFT" */}
              <div className="nft-profile-content-storage-arweave">
                <div className="warning-centralized-server">
                  <img
                    src="/assets/icons/warning_circle_icon.svg"
                    alt="warning icon"
                  />
                  Centralized Server
                </div>
                {/*  (click)="viewAssetCentralized()" */}
                <a>
                  View asset
                  <img
                    src="/assets/icons/deso_page_link.svg"
                    alt="go to icon"
                  />
                </a>
              </div>
            </div>
            {/* *ngIf="!loading && activeTab === NftPostComponent.THREAD && !reloadingThread" */}
            <div className="nft-post-mobile-padding">
              {/* *ngIf="!loading && !bids?.length" */}
              <div className="fs-15px pb-0 d-flex justify-content-center nft-no-bids font-weight-semibold">
                There are no bids yet.
              </div>
              {/* *ngIf="!loading && bids?.length" */}
              <div>
                <div className="container d-flex align-items-center fs-14px py-15px link--unstyled">
                  {/*  [ngClass]="{ 'col-6': nftPost.NumNFTCopies == 1, 'col-5': nftPost.NumNFTCopies > 1 }"
              (click)="handleColumnHeaderClick(NftPostComponent.SORT_BY_USERNAME)" */}
                  <div className="nft-detail-div pl-0px">BIDDER</div>
                  {/* [ngClass]="{ 'col-6': nftPost.NumNFTCopies == 1, 'col-5': nftPost.NumNFTCopies > 1 }"
              (click)="handleColumnHeaderClick(NftPostComponent.SORT_BY_PRICE)" */}
                  <div className="p-0 nft-detail-div pl-0px">BID AMOUNT</div>
                  {/* *ngIf="nftPost.NumNFTCopies > 1"
              (click)="handleColumnHeaderClick(NftPostComponent.SORT_BY_EDITION)" */}
                  <div className="col-2 nft-detail-div pl-0px">EDITION</div>
                </div>
                {/* <simple-center-loader *ngIf="refreshingBids"></simple-center-loader> */}
                {/* *ngIf="!refreshingBids" */}
                <div>
                  {/*  *ngFor="let bidEntry of bids; let i = index" */}
                  <div className="container d-flex align-items-center fs-14px p-15px border-color-grey link--unstyled">
                    <div className="row no-gutters w-100">
                      <div className="col-5 d-flex align-items-center mb-0 p-0">
                        {/* *ngIf="
                      activeTab === NftPostComponent.MY_AUCTIONS &&
                      nftPost.NumNFTCopies > 1 &&
                      userOwnsSerialNumber(bidEntry.SerialNumber)
                    "
                    [(ngModel)]="bidEntry.selected"
                    (ngModelChange)="checkSelectedBidEntries(bidEntry)" */}
                        <input
                          className="pr-10px cursor-pointer"
                          type="checkbox"
                          style="width: 35px"
                        />
                        {/* *ngIf="
                      activeTab === NftPostComponent.MY_AUCTIONS &&
                      nftPost.NumNFTCopies === 1 &&
                      userOwnsSerialNumber(bidEntry.SerialNumber)
                    "
                    [value]="bidEntry"
                    [(ngModel)]="selectedBid"
                    (ngModelChange)="selectBidEntry(bidEntry)" */}
                        <input
                          className="pr-10px cursor-pointer"
                          type="radio"
                          style="width: 35px"
                        />
                        {/* *ngIf="activeTab === NftPostComponent.MY_BIDS"
                    (click)="cancelBid(bidEntry)" */}
                        <i className="fas fa-trash pr-10px text-danger cursor-pointer fs-18px"></i>
                        <Avatar
                          class="nft-profile-tabs-avatar mr-10px"
                          avatar={bidEntry.PublicKeyBase58Check}
                        ></Avatar>
                        <div className="text-truncate holdings__name fs-14px">
                          <div className="d-flex">
                            {/* [ngClass]="{ 'cursor-pointer': !!bidEntry.ProfileEntryResponse?.Username }"
                        [style.pointer-events]="!!bidEntry.ProfileEntryResponse?.Username ? 'auto' : 'none'"
                        [routerLink]="
                          bidEntry.ProfileEntryResponse?.Username
                            ? ['/' + globalVars.RouteNames.USER_PREFIX, bidEntry.ProfileEntryResponse.Username]
                            : []
                        " */}
                            <div
                              className="fc-default font-weight-bold text-truncate fs-14px"
                              style="max-width: 120px"
                            >
                              {bidEntry.ProfileEntryResponse?.Username ||
                                bidEntry.PublicKeyBase58Check}
                            </div>
                            {/* *ngIf="bidEntry.ProfileEntryResponse?.IsVerified"
                        (click)="tooltip.toggle()" 
                        [matTooltip]="'This account is verified'"
                        #tooltip="matTooltip"
                        */}
                            <span
                              className="ml-1 mb-1 cursor-pointer text-primary"
                              matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
                            >
                              <i className="fas fa-check-circle fa-md align-middle"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* [ngClass]="{ 'col-6': nftPost.NumNFTCopies == 1, 'col-5': nftPost.NumNFTCopies > 1 }" */}
                      <div className="d-flex align-items-center mb-0 p-0">
                        <span className="mr-5px last-price-deso">
                          {globalVars.nanosToDeSo(bidEntry.BidAmountNanos, 5)}{" "}
                          DESO
                        </span>
                        <span className="last-price-usd">
                          {globalVars.nanosToUSD(bidEntry.BidAmountNanos, 2)}
                        </span>
                      </div>
                      {/* *ngIf="nftPost.NumNFTCopies > 1" */}
                      <div className="col-2 d-flex align-items-center mb-0 p-0">
                        {bidEntry.SerialNumber > 0 &&
                          "#" + bidEntry.SerialNumber.toString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="global__bottom-bar-mobile-height"></div>
        </div>
      </div>
    </>
  );
};
export default NFTPostPage;
