import { useEffect, useState } from "react";
import MarketplaceContent from "../components/Marketplace/marketplaceContent";
import MarketplaceSortBar from "../components/Marketplace/marketplaceSortBar";
import MarketplaceTopBar from "../components/Marketplace/marketplaceTopBar";
import Page from "../components/Wrappers/page";
import styles from "../styles/Marketplace/marketplace.module.scss";
import { SortMarketplace } from "../utils/backendapi-context";
import { useAppSelector, useAppDispatch } from "../utils/Redux/hooks";
import { setNFTsData } from "../utils/Redux/Slices/marketplaceSlice";

const Marketplace = () => {
  const dispact = useAppDispatch();
  let numberNFTsToFetch: number;
  const [isMarketplaceLoading, setIsMarketplaceLoading] = useState(false);
  const [isMarketplaceLoadingMore, setIsMarketplaceLoadingMore] =
    useState(false);
  let localNode = useAppSelector((state) => state.node.localNode);
  let loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  let marketplaceViewTypeCard = useAppSelector(
    (state) => state.sort.marketplaceViewTypeCard
  );
  let desoMarketplace = useAppSelector((state) => state.sort.desoMarketplace);
  let nftsData = useAppSelector((state) => state.marketplace.nftsData);
  let ethMarketplaceNFTsData = useAppSelector(
    (state) => state.marketplace.ethMarketplaceNFTsData
  );
  let marketplaceHighPriceNanos = useAppSelector(
    (state) => state.sort.marketplaceHighPriceNanos
  );
  let marketplaceLowPriceNanos = useAppSelector(
    (state) => state.sort.marketplaceLowPriceNanos
  );
  let marketplaceStatus = useAppSelector(
    (state) => state.sort.marketplaceStatus
  );
  let marketplaceMarketType = useAppSelector(
    (state) => state.sort.marketplaceMarketType
  );
  let marketplaceNFTCategory = useAppSelector(
    (state) => state.sort.marketplaceNFTCategory
  );
  let marketplaceSortType = useAppSelector(
    (state) => state.sort.marketplaceSortType
  );
  let marketplaceContentFormat = useAppSelector(
    (state) => state.sort.marketplaceContentFormat
  );
  let marketplaceVerifiedCreators = useAppSelector(
    (state) => state.sort.marketplaceVerifiedCreators
  );

  // Functions
  const sortMarketplace = (offset: number, showMore: boolean) => {
    if (!showMore) {
      setIsMarketplaceLoading(true);
    } else {
      setIsMarketplaceLoadingMore(true);
    }
    let cardWidth: number;
    let cardHeight: number;

    // different calculations for big and small card
    if (marketplaceViewTypeCard) {
      cardWidth = 300;
      cardHeight = 463;
    } else {
      cardWidth = 195;
      cardHeight = 210;
    }

    // Divide height - topbar - nav / big card height
    let h = Math.ceil((window.innerHeight - 160) / cardHeight);
    // Calculate padding
    let padding = window.innerWidth * 0.07;
    if (padding < 90) {
      padding = 90;
    }
    padding = padding * 2;
    // Calculate width - mlb width - padding / with big card width
    let w = Math.floor((window.innerWidth - 210 - padding) / cardWidth);
    // Combine the two
    numberNFTsToFetch = h * w;
    // Get atleast 10 nfts
    if (numberNFTsToFetch < 10) {
      numberNFTsToFetch = 10;
    }

    SortMarketplace(
      localNode,
      loggedInUser?.PublicKeyBase58Check,
      offset,
      marketplaceLowPriceNanos,
      marketplaceHighPriceNanos,
      marketplaceStatus,
      marketplaceMarketType,
      marketplaceNFTCategory,
      marketplaceSortType,
      marketplaceContentFormat,
      marketplaceVerifiedCreators,
      numberNFTsToFetch
    ).subscribe({
      next: (res) => {
        if (showMore) {
          dispact(setNFTsData(nftsData.concat(res.data.PostEntryResponse)));
        } else {
          dispact(setNFTsData(res.data.PostEntryResponse));
        }
        setIsMarketplaceLoading(false);
        setIsMarketplaceLoadingMore(false);
      },
      error: (err) => {
        console.log(err.error);
        setIsMarketplaceLoadingMore(false);
      },
    });
  };
  // Functions end

  // Lifecycle methods
  useEffect(() => {
    if (desoMarketplace) {
      if (nftsData.length === 0) {
        console.log(
          "Marketplace: nftsData is null, fetching data from backend"
        );
        sortMarketplace(0, false);
      }
    } else {
      if (!ethMarketplaceNFTsData) {
        // updateEthMarketplaceStatus();
      }
    }
  }, []);
  // Lifecycle methods end
  return (
    <Page isNFTProfile={false} noCap={true}>
      <MarketplaceTopBar></MarketplaceTopBar>
      <MarketplaceContent
        marketplaceNFTsData={nftsData}
        isMarketplaceLoading={isMarketplaceLoading}
        isMarketplaceLoadingMore={isMarketplaceLoadingMore}
      ></MarketplaceContent>
    </Page>
  );
};

export default Marketplace;
