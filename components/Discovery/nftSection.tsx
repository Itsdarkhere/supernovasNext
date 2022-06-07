import { useEffect, useRef, useState } from "react";
import styles from "../../styles/Discovery/nftSection.module.scss";
import { NFTEntryResponse } from "../../utils/backendapi-context";
import LoadingCard from "../NFT/NFTCard/loadingCard";
import NFTCard from "../NFT/NFTCard/nftCard";

const NFTSection = (props) => {
  let dataFetched = false;
  const containerRef = useRef(null);
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

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

  const fetchData = (entries) => {
    const [entry] = entries;
    if (dataFetched) {
      return;
    } else if (entry.isIntersecting) {
      dataFetched = true;
      console.log(props.fetching);
      props.function();
    }
  };

  // Functions end

  // Lifecycle methods
  useEffect(() => {
    if (props.function !== null) {
      const observer = new IntersectionObserver(fetchData, options);
      if (containerRef.current) observer.observe(containerRef.current);

      return () => {
        if (containerRef.current) observer.unobserve(containerRef.current);
      };
    }
  }, []);
  // Lifecycle methods end

  return (
    <>
      <div className={styles.nftSectionDesktop} ref={containerRef}>
        {props.loading ? (
          <div className={styles.nfts_card_list}>
            {counter().map((i) => (
              <div key={i} className={styles.nft_col_wrap}>
                <div className={styles.market_card_container}>
                  <LoadingCard></LoadingCard>
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
                  <LoadingCard></LoadingCard>
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
