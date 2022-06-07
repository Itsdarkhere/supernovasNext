import FeedPostDropdown from "../../Feed/feedPostDropdown";
import PostIconRow from "../../Feed/postIconRow";
import styles from "../../../styles/NFT/NFTPost/nftCardRepost.module.scss";
import nftBackground from "../../../public/img/nft-background.svg";
import { useState } from "react";
import { setPostsToShow } from "../../../utils/Redux/Slices/feedSlice";
import {
  PostEntryResponse,
  ProfileEntryResponse,
} from "../../../utils/backendapi-context";
import Image from "next/image";

const NFTCardRepost = ({
  children,
  afterCommentCreatedCallback,
  afterRepostCreatedCallback,
  post,
  parentPost,
}) => {
  const [reposterProfile, setReposterProfile] =
    useState<ProfileEntryResponse>(null);
  const [postContent, setPostContent] = useState<PostEntryResponse>(null);
  const [quotedContent, setQuotedContent] = useState(null);

  /// Functions
  const setPost = () => {
    if (isRepost(post)) {
      setPostContent(post.RepostedPostEntryResponse);
      setReposterProfile(post.ProfileEntryResponse);
      if (isQuotedClout(post.RepostedPostEntryResponse)) {
        setQuotedContent(postContent.RepostedPostEntryResponse);
      }
    } else if (isQuotedClout(post)) {
      setPostContent(post);
      setQuotedContent(post.RepostedPostEntryResponse);
    } else {
      setPostContent(post);
    }
  };

  const isRepost = (post: any): boolean => {
    return (
      post.Body === "" &&
      (!post.ImageURLs || post.ImageURLs?.length === 0) &&
      post.RepostedPostEntryResponse
    );
  };
  const isQuotedClout = (post: any): boolean => {
    return (
      (post.Body !== "" || post.ImageURLs?.length > 0) &&
      post.RepostedPostEntryResponse
    );
  };

  return (
    <div className={styles.nft_repost_container + " position-relative"}>
      {reposterProfile ? (
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
            post={post}
            postContent={postContent}
            nftEntryResponses={null}
            // Check how these works ,, check works
            postHidden={undefined}
            userBlocked={undefined}
            toggleGlobalFeed={undefined}
            ownsEthNFT={undefined}
            togglePostPin={undefined}
          ></FeedPostDropdown>
        </div>
      ) : null}

      <div className="w-100 d-flex flex-center p-20px position-relative overflow-hidden">
        <Image
          src={nftBackground}
          alt="nft background"
          layout="fill"
          objectFit="cover"
          className={styles.nft_background}
        />
        {children}
      </div>
      <div className={styles.card_footer_2 + " d-flex flex-center"}>
        <div className="w-80">
          {/* <!-- Like, Comment, Reclout, Share Buttons --> */}
          <PostIconRow
            post={post}
            postContent={post}
            parentPost={parentPost}
            afterCommentCreatedCallback={afterCommentCreatedCallback}
            afterRepostCreatedCallback={afterRepostCreatedCallback}
          ></PostIconRow>
        </div>
      </div>
    </div>
  );
};
export default NFTCardRepost;
