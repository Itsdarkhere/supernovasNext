import FeedPost from "../../Feed/feedPost";
import styles from "../../styles/NFT/nftCard.module.scss";

// Cant remember currently what this is used for, ill come back to this when I do
const NFTCardQuoting = () => {
  return (
    <>
      {!quotedContent?.IsNFT && profileFeed && quotedContent && showQuotedContent ? (
        <FeedPost
          post={quotedContent}
          isQuotedContent={true}
          includePaddingOnPost={true}
          showIconRow={false}
          showDropdown={false}
          showQuotedContent={false}
          contentShouldLinkToThread={contentShouldLinkToThread}
          hoverable={hoverable}
          showNFTDetails={true}
          cardStyle={true}
        ></FeedPost>
      ) : null}
    </>
  );
};
export default NFTCardQuoting;
