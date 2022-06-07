import PostIconRow from "../../Feed/postIconRow";
import nftBackground from "../../../public/img/nft-background.svg";
import styles from "../../../styles/NFT/NFTPost/nftCardPost.module.scss";

const NFTCardPost = ({ children }) => {
  return (
    <div className={styles.nft_post_container + " mt-10px"}>
      <div className={styles.padding_top_51px + " w-100 d-flex flex-center p-20px position-relative overflow-hidden"}>
        <object
          data={nftBackground}
          className={styles.nft_background}
          type="image/svg+xml"
        ></object>
        {children}
      </div>
      <div className={styles.card_footer_2 + " d-flex flex-center"}>
        <div className="w-80">
          {/* <!-- Like, Comment, Reclout, Share Buttons --> */}
          <PostIconRow
            post="post"
            postContent="post"
            parentPost="parentPost"
            afterCommentCreatedCallback="afterCommentCreatedCallback"
            afterRepostCreatedCallback="afterRepostCreatedCallback"
          ></PostIconRow>
        </div>
      </div>
    </div>
  );
};
export default NFTCardPost;
