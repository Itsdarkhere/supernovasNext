import styles from "../../styles/Discovery/nftSection.module.scss";
import { NFTEntryResponse } from "../../utils/backendapi-context";
import NFTCard from "../NFT/NFTCard/nftCard";

const NFTSection = (props) => {
  // Functions
  // Calculates how many cards fit per row
  const getCardsPerRow = () => {
    let windowWidth = 1000;
    if (typeof window !== "undefined") {
      windowWidth = window.innerWidth;
    }
    if (windowWidth <= 992 || windowWidth >= 1400) {
      return 8;
    } else if (windowWidth > 1060) {
      return 6;
    } else {
      return 4;
    }
  };

  const counter = () => {
    return new Array(getCardsPerRow());
  };
  // Functions end

  return (
    <>
      <div className={styles.nftSectionDesktop}>
        {props.loading ? (
          <div className={styles.nfts_card_list}>
            {counter().map((i) => (
              <div key={i} className={styles.nft_col_wrap}>
                <div className={styles.market_card_container}>
                  {/* <loading-shimmer [tabType]="'MARKETPLACE'"></loading-shimmer> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.nfts_card_list}>
            {props.nftData?.map((nftEntry, index) => (
              <div key={index} className={styles.nft_col_wrap}>
                <div className={styles.market_card_container}>
                  <NFTCard
                    contentShouldLinkToThread={true}
                    post={nftEntry}
                    hoverable={true}
                    insidePost={false}
                    marketplaceCard={true}
                    isQuotedCard={false}
                    profileFeed={false}
                    pending={false}
                    showIconRow={true}
                    showQuotedContent={false}
                    loadProfile={false}
                  ></NFTCard>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.nftSectionMobile + " disable-scrollbars"}>
        {props.loading ? (
          <>
            {counter().map((i) => (
              <div key={i} style={{ paddingTop: "10px", paddingLeft: "5px" }}>
                <div className={styles.card}>
                  {/* <loading-shimmer [tabType]="'MARKETPLACE'"></loading-shimmer> */}
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {props.nftData?.map((nftEntry, index) => (
              <div
                key={index}
                style={{ paddingTop: "10px", paddingLeft: "5px" }}
              >
                <NFTCard
                  contentShouldLinkToThread={true}
                  post={nftEntry}
                  hoverable={true}
                  insidePost={false}
                  marketplaceCard={false}
                  isQuotedCard={false}
                  profileFeed={false}
                  pending={false}
                  showIconRow={true}
                  showQuotedContent={false}
                  loadProfile={false}
                ></NFTCard>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};
export default NFTSection;
