import styles from "../../styles/Marketplace/marketplaceSortMobile.module.scss";
import { useAppSelector } from "../../utils/Redux/hooks";
import MarketplaceSortBar from "./marketplaceSortBar";

const MarketplaceSortMobile = () => {
  const isMarketplaceLeftBarMobileOpen = useAppSelector((state) => state.open.isMarketplaceLeftBarMobileOpen);
  // [@leftBarAnimation]
  if (isMarketplaceLeftBarMobileOpen) {
    return null;
  }
  return (
    <div
      className={
        styles.left_bar_mobile__flyout_div_marketplace + " disable-scrollbars"
      }
    >
      <div
        className={
          styles.max_width_400px + " d-flex flex-center disable-scrollbars"
        }
      >
        <MarketplaceSortBar flyout={true} onFilter={undefined}></MarketplaceSortBar>
      </div>
    </div>
  );
};

export default MarketplaceSortMobile;
