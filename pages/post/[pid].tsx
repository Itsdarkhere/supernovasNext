import FeedPost from "../../components/Feed/feedPost";
import Page from "../../components/Wrappers/page";
import styles from "../styles/Post/post.module.scss";
import backIcon from "../../public/icons/cas_back_icon.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Post = ({ isNFTProfile, hideHeader, hideCurrentPost, fromNFTDetail }) => {
  const { pid } = useParams();
  // State
  const [currentPost, setCurrentPost] = useState(null);
  const [currentPostHashHex, setCurrentPostHashHex] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const commentLimit = 20;

  // lifecycle methods
  useEffect(() => {
    console.log("HEX........----:" + pid);
  }, [])
  return (
    <Page isNFTProfile={false} noCap={false}>
      <div className="post-thread-wrapper">
        {/* [@threadSwipeAnimation] */}
        {currentPost && showAnimation ? (
          <div className="d-flex flex-column">
            {!hideHeader ? (
              <div className="global__top-bar post_thread_top_bar d-flex align-items-center justify-content-between fs-18px font-weight-semiboldn px-15px">
                <div className="d-flex align-items-center">
                  {/* (click)="goBack()" */}
                  <button className="post-thread-back-button cursor-pointer font-weight-semiboldn d-flex flex-center-start">
                    <Image
                      src={backIcon}
                      style={{ marginRight: "20px !important" }}
                      alt="left arrow icon"
                      id="post-thread-back-arrow-icon"
                    />
                    Thread with @{currentPost.ProfileEntryResponse.Username}
                  </button>
                </div>
              </div>
            ) : null}

            {!hideHeader ? (
              <div className="global__top-bar__height"></div>
            ) : null}

            {currentPost.ParentPosts.map((parentPost, i) => (
              <div key={i} className="post-thread-parent-post-container">
                {/* <!--  afterCommentCreatedCallback explanation: Here, the "post" is a top-level post. A new comment on a -->
              <!--  top-level post should be prepended to the post's list of comments --> */}
                <FeedPost
                  post={parentPost}
                  includePaddingOnPost={true}
                  postThreadComment={true}
                  contentShouldLinkToThread={true}
                  showPostsShadow={true}
                  afterCommentCreatedCallback={updateCommentCountAndShowToast.bind(this, parentPost)}
                  isParentPostInThread={true}
                  showThreadConnectionLine={true}
                  blocked={isPostBlocked(parentPost)}
                  postDeleted={onPostHidden(currentPost, null, null)}
                  userBlocked={(e) => afterUserBlocked(e)}
                ></FeedPost>
              </div>
            ))}

            {!hideCurrentPost ? (
              <div className="post-thread-post-container mt-10px">
                {/* <!--  afterCommentCreatedCallback explanation: Here, the "post" is a top-level post. A new comment on a -->
          <!--  top-level post should be prepended to the post's list of comments --> */}
                <FeedPost
                  post={currentPost}
                  postThread={true}
                  includePaddingOnPost={true}
                  showPostsShadow={true}
                  contentShouldLinkToThread={true}
                  afterCommentCreatedCallback={prependToCommentList.bind(this, currentPost)}
                  isParentPostInThread={true}
                  showLeftSelectedBorder={true}
                  showInteractionDetails={true}
                  blocked={isPostBlocked(currentPost)}
                  postDeleted={onPostHidden(currentPost, null, null)}
                  userBlocked={(e) => afterUserBlocked(e)}
                ></FeedPost>
              </div>
            ) : null}

            <div
              className={[
                "post-thread__comment-container post-thread-cc",
                hideHeader ? "no-margin-padding-top" : "",
              ].join(" ")}
            >
              {/* #uiScroll *uiScroll="let item of datasource" */}
              <div>
                <div className="post-thread_comment">
                  {/* <!--  afterCommentCreatedCallback explanation: Here, the "post" is a comment. A new comment on a -->
        <!--  comment ("original comment") should be prepended to the original comment's list of comments (i.e. subcomments).--> */}
                  {item.ProfileEntryResponse != null ? (
                    <FeedPost
                      includePaddingOnPost={true}
                      post={item}
                      postThreadComment={true}
                      isNFTProfileComment={isNFTProfile}
                      showPostsShadow={true}
                      parentPost={currentPost}
                      contentShouldLinkToThread={true}
                      showIconRow={true}
                      showReplyingToContent={true}
                      afterCommentCreatedCallback={prependToSubcommentList.bind(this, item, currentPost)}
                      blocked={isPostBlocked(item)}
                      postDeleted={onPostHidden(item, currentPost, null)}
                      userBlocked={(e) => afterUserBlocked(e)}
                    ></FeedPost>
                  ) : null}

                  {item.Comments.map((subcommentPost, i) => (
                    <div key={i}>
                      {!isPostBlocked(item) ? (
                        <div className="px-15px pb-15px post-thread__subcomment-container">
                          {/* <!--  afterCommentCreatedCallback explanation: Here, the "post" is a subcomment. A new comment on a -->
                      <!--  subcomment should be appended to the parent (commentPost)'s list of subComments.--> */}
                          {subcommentPost.ProfileEntryResponse != null ? (
                            <FeedPost
                              class="p-15px"
                              includePaddingOnPost={true}
                              post={subcommentPost}
                              postThreadComment={true}
                              parentPost={item}
                              showPostsShadow={true}
                              contentShouldLinkToThread={true}
                              showIconRow={false}
                              showDropdown={false}
                              showReplyingToContent={false}
                              isSubcomment={true}
                              afterCommentCreatedCallback={appendToSubcommentList.bind(this, item, currentPost)}
                              blocked={isPostBlocked(subcommentPost)}
                              postDeleted={onPostHidden(subcommentPost, item, currentPost)}
                              userBlocked={(e) => afterUserBlocked(e)}
                            ></FeedPost>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </Page>
  );
};
export default Post;
