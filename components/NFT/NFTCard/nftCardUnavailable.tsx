import Link from "next/link";
import { RouteNames } from "../../../utils/backendapi-context";
import styles from "../../styles/NFT/nftCard.module.scss";

// This component holds all unavailable states of the nft card
// Such as all copies burned, post is hidden etc...
const NFTCardUnavailable = () => {
  return (
    <>
      {post.IsHidden ? (
        <div className="p-10px br-30px background-color-grey d-flex align-items-center justify-content-center fs-15px">
          <div onClick={(e) => onPostClicked(e)} className="link--unstyled">
            This post was removed by the author.
          </div>
        </div>
      ) : null}

      {/* <!-- Posts are burned --> */}
      {allCopiesBurned() ? (
        <div className="p-15px background-color-grey d-flex align-items-center justify-content-center fs-15px">
          <Link
            href={
              "/" +
              RouteNames.USER_PREFIX +
              "/" +
              post.ProfileEntryResponse?.Username
            }
          >
            <div className="link--unstyled" style={{ textAlign: "center" }}>
              All copies of the NFT have been burned...
            </div>
          </Link>
        </div>
      ) : null}

      {hasUserBlockedCreator(post.PosterPublicKeyBase58Check) ? (
        <div className="p-15px background-color-grey d-flex align-items-center justify-content-center fs-15px">
          {/* [routerLink]="[
        '/' + globalVars.RouteNames.USER_PREFIX,
        loadProfile ? this.creatorProfile?.Username : postContent.ProfileEntryResponse?.Username
        ]" 
        queryParamsHandling="merge"
        */}
          <div className="link--unstyled" style={{ textAlign: "center" }}>
            This is a post from
            {loadProfile
              ? creatorProfile?.Username
              : postContent.ProfileEntryResponse?.Username}{" "}
            who you have blocked. Click here to visit their profile to unblock
            them.
          </div>
        </div>
      ) : null}
    </>
  );
};
export default NFTCardUnavailable;
