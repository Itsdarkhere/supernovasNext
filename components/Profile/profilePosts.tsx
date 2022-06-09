import styles from "../../styles/Profile/profilePosts.module.scss";
import { hasUserBlockedCreator } from "../../utils/global-context";
import FeedPost from "../Feed/feedPost";
import NFTCard from "../NFT/NFTCard/nftCard";
import NFTCardPost from "../NFT/NFTPost/NFTCardPost";
import NFTCardRepost from "../NFT/NFTPost/NFTCardRepost";

const ProfilePosts = () => {
  return (
    <>
      {/* <!-- Posts --> */}
      {/* <simple-center-loader [height]="200" *ngIf="loadingFirstPage && datasource.adapter.isLoading"></simple-center-loader> */}
      {!showProfileAsReserved &&
      !loadingFirstPage &&
      !datasource.adapter.isLoading &&
      datasource.adapter.itemsCount === 0 ? (
        <div className="p-15px">
          <div
            className="background-color-grey p-35px br-12px d-flex flex-row align-items-center"
            style={{ textAlign: "center" }}
          >
            {profileBelongsToLoggedInUser() ? (
              <span>Create your first post.</span>
            ) : (
              <span>
                @{profile.Username} is on the platform but hasn't posted yet.
              </span>
            )}
          </div>
        </div>
      ) : null}

      {!showProfileAsReserved &&
      !hasUserBlockedCreator(profile.PublicKeyBase58Check) ? (
        <div>
          {/* #uiScroll *uiScroll="let post of datasource; let index = index" */}
          <div>
            {post?.IsNFT || post?.PostExtraData?.isEthereumNFT ? (
              <div className="mobile_feed_post">
                <NFTCardPost
                  post={post}
                  afterCommentCreatedCallback={_prependComment.bind(
                    this,
                    post,
                    index
                  )}
                >
                  <NFTCard
                    contentShouldLinkToThread={true}
                    pending={false}
                    includePaddingOnPost={true}
                    nftPost={true}
                    post={post}
                    afterCommentCreatedCallback={_prependComment.bind(
                      this,
                      post,
                      index
                    )}
                    blocked={globalVars.hasUserBlockedCreator(
                      profile.PublicKeyBase58Check
                    )}
                    cardStyle={true}
                    fromFeed={true}
                    showNFTDetails={true}
                    profileFeed={true}
                    userBlocked={userBlocked()}
                    hoverable={true}
                  ></NFTCard>
                </NFTCardPost>
              </div>
            ) : null}

            {isRepost(post) &&
            !post.RepostedPostEntryResponse.IsNFT &&
            post.RepostedPostEntryResponse.PostExtraData?.isEthereumNFT ? (
              <div className="mobile_feed_post">
                <NFTCardRepost
                  post={post}
                  afterCommentCreatedCallback={_prependComment.bind(
                    this,
                    post,
                    index
                  )}
                >
                  {/* *ngIf="post.ProfileEntryResponse" */}
                  <NFTCard
                    contentShouldLinkToThread={true}
                    pending={false}
                    includePaddingOnPost={true}
                    post={post}
                    afterCommentCreatedCallback={_prependComment.bind(
                      this,
                      post,
                      index
                    )}
                    blocked={globalVars.hasUserBlockedCreator(
                      profile.PublicKeyBase58Check
                    )}
                    cardStyle={true}
                    fromFeed={true}
                    showNFTDetails={true}
                    profileFeed={true}
                    userBlocked={userBlocked()}
                    hoverable={true}
                  ></NFTCard>
                </NFTCardRepost>
              </div>
            ) : null}

            {isRepost(post) &&
            post.RepostedPostEntryResponse.IsNFT &&
            !post.RepostedPostEntryResponse.PostExtraData?.isEthereumNFT && post.ProfileEntryResponse ? (
              <div className="mobile_feed_post">
                <NFTCardRepost
                  post={post}
                  afterCommentCreatedCallback={_prependComment.bind(
                    this,
                    post,
                    index
                  )}
                >
                  <NFTCard
                    contentShouldLinkToThread={true}
                    pending={false}
                    includePaddingOnPost={true}
                    post={post}
                    afterCommentCreatedCallback={_prependComment.bind(
                      this,
                      post,
                      index
                    )}
                    blocked={hasUserBlockedCreator(
                      profile.PublicKeyBase58Check
                    )}
                    cardStyle={true}
                    fromFeed={true}
                    showNFTDetails={true}
                    profileFeed={true}
                    userBlocked={userBlocked()}
                    hoverable={true}
                  ></NFTCard>
                </NFTCardRepost>
              </div>
            ) : null}

            {!isRepost(post) &&
            (post?.RepostedPostEntryResponse?.IsNFT ||
              post?.RepostedPostEntryResponse?.PostExtraData?.isEthereumNFT) &&
            post.ProfileEntryResponse ? (
              <FeedPost
                contentShouldLinkToThread={true}
                includePaddingOnPost={true}
                post={post}
                afterCommentCreatedCallback={_prependComment.bind(
                  this,
                  post,
                  index
                )}
                blocked={hasUserBlockedCreator(profile.PublicKeyBase58Check)}
                cardStyle={true}
                showNFTDetails={true}
                profileFeed={true}
                userBlocked={userBlocked()}
                showPostsShadow={true}
              ></FeedPost>
            ) : null}

            {!(post?.IsNFT || post?.RepostedPostEntryResponse?.IsNFT) &&
            !(
              post?.PostExtraData?.isEthereumNFT ||
              post?.RepostedPostEntryResponse?.PostExtraData?.isEthereumNFT
            ) &&
            post.ProfileEntryResponse ? (
              <FeedPost
                contentShouldLinkToThread={true}
                includePaddingOnPost={true}
                post={post}
                afterCommentCreatedCallback={_prependComment.bind(
                  this,
                  post,
                  index
                )}
                blocked={hasUserBlockedCreator(profile.PublicKeyBase58Check)}
                cardStyle={true}
                showNFTDetails={true}
                profileFeed={true}
                userBlocked={userBlocked()}
                showPostsShadow={true}
              ></FeedPost>
            ) : null}

            {post.Comments.map((comment, commentIndex) => (
              <div key={commentIndex}>
                <div className="pl-15px pb-15px post-thread__subcomment-container">
                  <FeedPost
                    includePaddingOnPost={true}
                    post={comment}
                    parentPost={post}
                    contentShouldLinkToThread={true}
                    showIconRow={false}
                    showDropdown={false}
                    showReplyToContent={false}
                    isSubcomment={true}
                    cardStyle={true}
                  ></FeedPost>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProfilePosts;
