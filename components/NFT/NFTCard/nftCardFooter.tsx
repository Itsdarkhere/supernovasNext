import styles from "../../../styles/NFT/NFTCard/nftCard.module.scss";
import PostIconRow from "../../Feed/postIconRow";

// This component shows the engagement metrics on the card
// visible on hover on desktop and always on mobile
const NFTCardFooter = ({ showIconRow, postContent }) => {
  return (
    <>
      <div className={styles.card_footer}>
        {/* Like, Comment, Reclout, Share Buttons */}
      </div>

      <div className={styles.footer_icons_container + " w-80"}>
        {showIconRow && postContent ? (
          <PostIconRow
            postContent={postContent}
            hideNumbers={undefined}
            post={postContent}
            parentPost={undefined}
            afterCommentCreatedCallback={undefined}
            afterRepostCreatedCallback={undefined}
          ></PostIconRow>
        ) : null}
      </div>
    </>
  );
};
export default NFTCardFooter;
