import styles from "../../styles/Modals/commentsModal.module.scss";
import CreatePost from "../Feed/createPost";
import FeedPost from "../Feed/feedPost";

const CommentsModal = () => {
  return (
    <div className="comment_modal">
      <div className="comment-header">
        {/* (click)="bsModalRef.hide()" */}
        <button type="button" className="close feed-create-comment-form__close">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.528606 0.528598C0.788955 0.268248 1.21107 0.268248 1.47141 0.528598L5.00001 4.05719L8.52861 0.528598C8.78895 0.268248 9.21106 0.268248 9.47141 0.528598C9.73176 0.788948 9.73176 1.21106 9.47141 1.47141L5.94282 5L9.47141 8.5286C9.73176 8.78895 9.73176 9.21106 9.47141 9.47141C9.21106 9.73176 8.78895 9.73176 8.52861 9.47141L5.00001 5.94281L1.47141 9.47141C1.21107 9.73176 0.788955 9.73176 0.528606 9.47141C0.268256 9.21106 0.268256 8.78895 0.528606 8.5286L4.0572 5L0.528606 1.47141C0.268256 1.21106 0.268256 0.788948 0.528606 0.528598Z"
              fill="#858585"
            />
          </svg>
        </button>
      </div>
      <div className="comment-section">
        <FeedPost
          post={parentPost}
          includePaddingOnPost={false}
          contentShouldLinkToThread={false}
          showIconRow={false}
          showDropdown={false}
          showReplyingToContent={false}
          hoverable={false}
        ></FeedPost>
      </div>

      <div className="fs-12px text-muted feed-create-comment-form__reply-container">
        {isQuote ? "Quoting " : "Replying to "} @
        {parentPost.ProfileEntryResponse.Username}
      </div>

      <CreatePost
        parentPost="parentPost"
        isQuote="isQuote"
        postRefreshFunc="afterCommentCreatedCallback"
        postCreated="bsModalRef.hide()"
      ></CreatePost>
    </div>
  );
};
export default CommentsModal;
