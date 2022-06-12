import Link from "next/link";
import styles from "../../../styles/NFT/NFTCard/nftCard.module.scss";
import { RouteNames } from "../../../utils/backendapi-context";
import Avatar from "../../Reusables/avatar";

// This component is responsible for display the creator name, nft name etc
// Could be called the middle section of the basic nft card
const NFTCardCaption = ({ postContent, loadProfile, creatorProfile }) => {
  // Dom manipulation
  const showNameOrDescription = () => {
    if (postContent?.PostExtraData?.name) {
      return (
        <p className={styles.fs_20px_im}>{postContent.PostExtraData?.name}</p>
      );
    } else {
      return <p className="pt-10px">{postContent?.Body}</p>;
    }
  };
  // Dom manipulation end
  return (
    <div className={styles.caption_cover}>
      {showNameOrDescription()}
      <div className="d-flex flex-row">
        <div className={styles.card_header} style={{ borderBottom: "0px" }}>
          <div className={styles.profile_img}>
            <Link
              href={
                "/" + RouteNames.USER_PREFIX + "/" + loadProfile
                  ? creatorProfile?.Username
                  : postContent.ProfileEntryResponse?.Username
              }
            >
              <Avatar
                classN={styles.avatar}
                avatar={postContent?.PosterPublicKeyBase58Check}
              ></Avatar>
            </Link>
          </div>
        </div>
        <div className="d-flex flex-column">
          <p className={styles.creator_text_nft_card}>CREATOR</p>
          <Link
            href={
              "/" + RouteNames.USER_PREFIX + "/" + loadProfile
                ? creatorProfile?.Username
                : postContent.ProfileEntryResponse?.Username
            }
          >
            <div className={styles.username_nft_card}>
              {loadProfile
                ? creatorProfile?.Username
                : postContent?.ProfileEntryResponse?.Username}
              {/*  check works... it should if loadprofile check one of the verified, then choose element or null */}
              {loadProfile ? (
                creatorProfile?.IsVerified
              ) : postContent?.ProfileEntryResponse?.IsVerified ? (
                <i className="fas fa-check-circle pl-5px fa-md text-primary"></i>
              ) : null}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NFTCardCaption;
