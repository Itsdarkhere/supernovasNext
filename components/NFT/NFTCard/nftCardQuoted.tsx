import styles from "../../styles/nft/nftCard.module.scss";
import NFTCard from "./nftCard";
import nftBackground from "../../../public/img/nft-background.svg";

// This component is used when someone quote reposts a card
// Mostly it just applies a background
const NFTCardQuoted = ({
  quotedContent,
  contentShouldLinkToThread,
  showQuotedContent,
}) => {
  return (
    <div className="w-100 position-relative overflow-hidden d-flex flex-center p-20px border">
      <object
        data={nftBackground}
        className="nft-background"
        type="image/svg+xml"
      ></object>
      {quotedContent && showQuotedContent ? (
        <NFTCard
          post={quotedContent}
          pending={false}
          showIconRow={false}
          showQuotedContent={false}
          contentShouldLinkToThread={contentShouldLinkToThread}
          hoverable={false}
          insidePost={false}
          marketplaceCard={false}
          isQuotedCard={false}
          profileFeed={false}
          loadProfile={false}
          nftPost={false}
          showThreadConnectionLine={undefined}
          userBlocked={undefined}
          postDeleted={undefined}
        ></NFTCard>
      ) : null}
    </div>
  );
};
export default NFTCardQuoted;
