import FeedPostDropdown from "../../Feed/feedPostDropdown";
import PostIconRow from "../../Feed/postIconRow";
import styles from "../../../styles/NFT/NFTPost/nftCardRepost.module.scss";
import nftBackground from "../../../public/img/nft-background.svg";

const NFTCardRepost = ({ children }) => {
  return (
    <div className={styles.nft_repost_container + " position-relative"}>
      {/* *ngIf="reposterProfile" */}
      <div className="d-flex justify-content-left w-100 pb-5px px-15px pt-10px">
        {/* queryParamsHandling="merge"
      [routerLink]="['/' + globalVars.RouteNames.USER_PREFIX, reposterProfile.Username]" */}
        <a className="fc-muted font-weight-semibold align-items-center">
          <i
            className="icon-repost fs-20px"
            style={{ verticalAlign: "middle" }}
          ></i>
          <span style={{ verticalAlign: "middle" }} className="fs-15px">
            @{reposterProfile.Username} reposted
          </span>
        </a>
        {/* class="ml-auto" */}
        <FeedPostDropdown
          post="post"
          postContent="postContent"
          nftEntryResponses="nftEntryResponses"
          postHidden="hidePost()"
          userBlocked="blockUser()"
          toggleGlobalFeed="_addPostToGlobalFeed()"
        ></FeedPostDropdown>
      </div>
      <div className="w-100 d-flex flex-center p-20px position-relative overflow-hidden">
        <object
          data={nftBackground}
          className="nft-background"
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
export default NFTCardRepost;
