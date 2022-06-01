import styles from "../styles/nftCard.module.scss";
import PostIconRow from "../Feed/postIconRow";

// This component shows the engagement metrics on the card
// visible on hover on desktop and always on mobile
const NFTCardFooter = ({ showIconRow, postContent }) => {
  return (
    <>
      <div className={styles.card_footer}>
        {/* Like, Comment, Reclout, Share Buttons */}
      </div>

      <div className={styles.footer_icons_container + "w-80"}>
        {showIconRow ? (
          <PostIconRow postContent={postContent}></PostIconRow>
        ) : null}
      </div>
    </>
  );
};
export default NFTCardFooter;
