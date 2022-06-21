import style from "../../styles/Marketplace/marketplaceEthSortMobile.module.scss";
import { useAppSelector } from "../../utils/Redux/hooks";
import MarketplaceEthSortBar from "./marketplaceEthSortBar";

const MarketplaceEthSortMobile = ({ flyout }) => {
    let isEthMarketplaceLeftBarMobileOpen = useAppSelector((state) => state.open.isEthMarketplaceLeftBarMobileOpen);
  // [@leftBarAnimation]
  if (!isEthMarketplaceLeftBarMobileOpen) {
    return null;
  }
  return (
    <div className="left-bar-mobile__flyout-div-marketplace overflow-hidden disable-scrollbars d-flex flex-center">
      <div className="d-flex flex-center disable-scrollbars max-width-400px">
        <MarketplaceEthSortBar flyout="true" onFilter={undefined}></MarketplaceEthSortBar>
      </div>
    </div>
  );
};

export default MarketplaceEthSortMobile;
