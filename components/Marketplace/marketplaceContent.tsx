import { useState } from "react";
import styles from "../../styles/Marketplace/marketplaceContent.module.scss";
import { useAppSelector } from "../../utils/Redux/hooks";
import LoadingCard from "../NFT/NFTCard/loadingCard";
import NFTCard from "../NFT/NFTCard/nftCard";
import SmallNFTCard from "../NFT/SmallNFTCard/smallNFTCard";
import MarketplaceEthSortBar from "./marketplaceEthSortBar";
import MarketplaceSortBar from "./marketplaceSortBar";

const MarketplaceContent = ({
  marketplaceNFTsData,
  isMarketplaceLoading,
  isMarketplaceLoadingMore,
}) => {
  const [mobile, setMobile] = useState(false);
  const [loadingArr, setLoadingArr] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  ]);
  let marketplaceViewTypeCard = useAppSelector(
    (state) => state.sort.marketplaceViewTypeCard
  );
  let desoMarketplace = useAppSelector((state) => state.sort.desoMarketplace);

  // Functions
  const counter = (i: number) => {
    return new Array(i);
  };
  // Functions end

  return (
    <div className="w-100 d-flex flex-row" id="market">
      {/* *ngIf="!mobile && this.globalVars.desoMarketplace" */}
      <div>
        <MarketplaceSortBar flyout={false}></MarketplaceSortBar>
        {/* *ngIf="!mobile && !this.globalVars.desoMarketplace" */}
        {/* <MarketplaceEthSortBar
            flyout="false"
            ></MarketplaceEthSortBar> */}
      </div>
      <div
        className={
          mobile
            ? "global__content__width"
            : "global__center__width__marketplace"
        }
      >
        {isMarketplaceLoading ? (
          <div className={styles.nfts_card_list}>
            {loadingArr.map((i) => (
              <div key={i} className={styles.nft_col_wrap}>
                <div className={styles.market_card_container}>
                  <LoadingCard></LoadingCard>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-100 d-flex flex-row flex-start-end">
            {/* infiniteScroll
                    [infiniteScrollDistance]="4"
                    [infiniteScrollThrottle]="150"
                    (scrolled)="onScrollNFTs()"*/}

            <div className="w-100">
              <div
                className={[
                  styles.nfts_card_list,
                  marketplaceViewTypeCard ? "" : styles.smallCards,
                ].join(" ")}
              >
                {marketplaceNFTsData.map((PostEntryResponse, index) => (
                  <div
                    key={index}
                    className={
                      marketplaceViewTypeCard
                        ? styles.nft_col_wrap
                        : styles.small_nft_col_wrap
                    }
                  >
                    {marketplaceViewTypeCard ? (
                      <div className={styles.market_card_container}>
                        <NFTCard
                          marketplaceCard={true}
                          pending={false}
                          post={PostEntryResponse}
                          contentShouldLinkToThread="true"
                          hoverable={true}
                          insidePost={false}
                          isQuotedCard={false}
                          profileFeed={false}
                          showIconRow={true}
                          showQuotedContent={false}
                          loadProfile={false}
                        ></NFTCard>
                      </div>
                    ) : (
                      <div>
                        {/* <SmallNFTCard post="PostEntryResponse"></SmallNFTCard> */}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {isMarketplaceLoadingMore ? (
              <button className={styles.marketplace_loading_indicator}>
                <i className="fa fa-spinner fa-spin"></i>
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceContent;
