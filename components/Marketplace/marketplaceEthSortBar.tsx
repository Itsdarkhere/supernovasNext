import { useState } from "react";
import styles from "../../styles/Marketplace/marketplaceEthSortBar.module.scss";
import { getEthNFTsByFilter } from "../../utils/global-context";
import { useAppDispatch, useAppSelector } from "../../utils/Redux/hooks";
import { setIsMarketplaceLoading } from "../../utils/Redux/Slices/marketplaceSlice";
import { setIsEthMarketplaceLeftBarMobileOpen } from "../../utils/Redux/Slices/openSlice";
import { setETHMarketplaceNFTCategory, setETHMarketplaceStatus, setMarketplaceVerifiedCreators } from "../../utils/Redux/Slices/sortSlice";

const MarketplaceEthSortBar = ({ flyout, onFilter }) => {
  const dispatch = useAppDispatch();
  const ethMarketplaceNFTCategory = useAppSelector((state) => state.sort.ethMarketplaceNFTCategory)
  // Status
  const [statusAll, setStatusAll] = useState(false);
  const [statusForSale, setStatusForSale] = useState(false);
  const [statusHasBids, setStatusHasBids] = useState(false);
  const [statusSold, setStatusSold] = useState(false);
  // Market
  const [marketPrimary, setMarketPrimary] = useState(false);
  const [marketSecondary, setMarketSecondary] = useState(false);
  // Format
  const [formatAll, setFormatAll] = useState(false);
  const [formatImages, setFormatImages] = useState(false);
  const [formatVideo, setFormatVideo] = useState(false);
  const [formatMusic, setFormatMusic] = useState(false);
  const [format3D, setFormat3D] = useState(false);
  // Category
  const [NFTCategory, setNFTCategory] = useState("");
  // CreatorType
  const [creatorTypeVerified, setCreatorTypeVerified] = useState(false);
  // If Apply button is disabled or allowed
  const [canUserSort, setCanUserSort] = useState(false);
  // Last sort values, keep last sort values in memory to compare them to current values
  // This is to enable / disable the apply button accordingly
  let lastSortLowPrice = 0;
  let lastSortHighPrice = 0;
  let lastSortContentFormatAll = true;
  let lastSortContentFormatVideo = false;
  let lastSortContentFormatMusic = false;
  let lastSortContentFormatImages = false;
  let lastSortCreatorTypeVerified = true;
  let lastSortMarketPrimary = true;
  let lastSortMarketSecondary = true;
  let lastSortStatusAll = true;
  let lastSortStatusForSale = false;
  let lastSortStatusHasBids = false;
  let lastSortStatusSold = false;
  let lastSortCategory = "all"; 

  // Functions
  const statusClick = (button: string) => {
    switch (button) {
      case "all":
        if (!statusAll) {
          setStatusAll(true)
          setStatusForSale(false)
          setStatusHasBids(false);
          setStatusSold(false);
        }
        break;
      case "for sale":
        if (statusForSale) {
          setStatusAll(true)
          setStatusForSale(false)
        } else {
          setStatusAll(false)
          setStatusForSale(true)
          setStatusHasBids(false);
          setStatusSold(false);
        }
        break;
        default:
          break;
    }
    // Check if user can sort
    canSort();
  };

  const categorySelectChange = (event) => {
    if (NFTCategory != event) {
      setNFTCategory(event);
      // Check if user can sort
      canSort();
    }
  }

  const creatorsClick = (creatorType: string) => {
    switch (creatorType) {
      case "verified":
        setCreatorTypeVerified(true);
        break;
      case "all":
        setCreatorTypeVerified(false);
        // this.categoryAndFormatToBaseState();
        break;
      default:
        break;
    }
    // Check if user can sort
    canSort();
  }

  const canSort = () => {
    //   if category is different from last then sort
    if (NFTCategory != lastSortCategory) {
      setCanUserSort(true);
      // If content format is different from last sort
    } else if (lastSortStatusAll != statusAll || lastSortStatusForSale != statusForSale) {
      setCanUserSort(true);
      // If creator type is different from last time
    } else if (lastSortCreatorTypeVerified != creatorTypeVerified) {
      setCanUserSort(true);
      // If nothing has changed user cannot sort
    } else {
      setCanUserSort(false);
    }
  }

  const closeMenu = () => {
    functionPass.filter("ethClose");
    onFilter("ethClose");
    setTimeout(() => {
      dispatch(setIsEthMarketplaceLeftBarMobileOpen(false));
    }, 200);
  }

  const apply = () => {
    dispatch(setIsMarketplaceLoading(true));

    setCategory();
    setStatus();
    setCreatorType();
    setCanUserSort(false);

    onFilter("ethSort");
    functionPass.filter("ethSort");

    getEthNFTsByFilter();

    setTimeout(() => {
      dispatch(setIsEthMarketplaceLeftBarMobileOpen(false));
    }, 200);
  }

  const setCategory = () => {
    if (ethMarketplaceNFTCategory != NFTCategory) {
      dispatch(setETHMarketplaceNFTCategory(NFTCategory))
      // Store to use in canSort
      lastSortCategory = NFTCategory;
      // Check if user can sort
      canSort();
    }
  }

  const setStatus = () => {
    if (statusAll) {
      dispatch(setETHMarketplaceStatus("all"));
      // Store to use in canSort()
      lastSortStatusAll = true;
      lastSortStatusForSale = false;
      lastSortStatusHasBids = false;
      lastSortStatusSold = false;
    } else if (statusForSale) {
      dispatch(setETHMarketplaceStatus("for sale"));
      // Store to use in canSort()
      lastSortStatusForSale = true;
      lastSortStatusSold = false;
      lastSortStatusAll = false;
      lastSortStatusHasBids = false;
    }
    // Check if user can sort
    canSort();
  }

  const setCreatorType = () => {
    if (creatorTypeVerified) {
      dispatch(setMarketplaceVerifiedCreators("verified"));
      // Store to use in canSort
      lastSortCreatorTypeVerified = true;
    } else {
      dispatch(setMarketplaceVerifiedCreators("verified"));
      // Store to use in canSort
      lastSortCreatorTypeVerified = false;
    }
  }

  // *ngIf="!flyout"
  return (
    <>
      <div className="global__nav__sticky__marketplace mt-10px">
        <div className="global__nav__inner__marketplace-eth disable-scrollbars position-relative">
          <label className="w-100 pl-10px marketplace-label">Status</label>
          <div className="mlb-status-grid">
            <button
              onClick={() => statusClick("all")}
              className={[
                "font-weight-semibold fs-14px",
                statusAll ? "selected" : "",
              ].join(" ")}
            >
              All
            </button>
            <button
              onClick={() => statusClick("for sale")}
              className={[
                "font-weight-semibold fs-14px",
                statusForSale ? "selected" : "",
              ].join(" ")}
            >
              For Sale
            </button>
          </div>
          <label className="w-100 mt-20px pl-10px marketplace-label">
            Creators
          </label>
          <div className="mrk_lb_selector px-5px">
            <button
              onClick={() => creatorsClick("verified")}
              className={[
                "fs-12px d-flex flex-row flex-center",
                creatorTypeVerified ? "selected" : "",
              ].join(" ")}
            >
              <img
                src="/assets/icons/checkmark_14px.svg"
                className="mr-5px"
                alt="image-icon"
              />
              Verified
            </button>
            <button
              onClick={() => creatorsClick("all")}
              className={[
                "fs-12px d-flex flex-row flex-center",
                !creatorTypeVerified ? "selected" : "",
              ].join(" ")}
            >
              <img
                src="/assets/icons/market_globe_icon.svg"
                className="mr-5px"
                alt="image-icon"
              />
              All
            </button>
          </div>

          <div>
            <label className="w-100 mt-20px pl-10px marketplace-label">
              Category
            </label>
            <select
              value={NFTCategory}
              onChange={(e) => categorySelectChange(e)}
              className="w-100 p-5px mrk_select mrk_select_height font-weight-semibold fs-14px"
            >
              <option value="all">All</option>
              <option value="art">Art</option>
              <option value="collectibles">Collectibles</option>
              <option value="generative art">Generative Art</option>
              <option value="metaverse & gaming">Metaverse & Gaming</option>
              <option value="music">Music</option>
              <option value="profile Picture">
                Profile Picture Collection
              </option>
              <option value="photography">Photography</option>
            </select>
          </div>
        </div>
        <div className="mlb-apply-button-container">
          <button
            disabled={!canUserSort}
            onClick={() => apply()}
            className="marketplace-apply-button fs-12px font-weight-bold"
          >
            <img
              src="/assets/icons/market_apply_icon.svg"
              className="mr-5px"
              alt="image-icon"
            />
            Apply
          </button>
        </div>
      </div>

      {/*<!-- Style way aspect ration differently for mobile -->*/}
      {flyout ? (
        <div className="flyout__nav__inner__marketplace w-100 position-relative pointer-events-all">
          <div className="nav_close_marketplace position-relative">
            <img
              onClick={() => closeMenu()}
              src="assets/img/close_square.svg"
              className="cursor-pointer"
              alt=""
            />
          </div>
          <label className="w-100 pl-10px marketplace-flyout-label">
            Status
          </label>
          <div className="mlb-flyout-status-grid-eth">
            <button
              onClick={() => statusClick("all")}
              className={[
                "font-weight-semibold",
                statusAll ? "selected" : "",
              ].join("")}
            >
              <p className="center-absolute">All</p>
            </button>
            <button
              onClick={() => statusClick("for sale")}
              className={[
                "font-weight-semibold",
                statusForSale ? "selected" : "",
              ].join(" ")}
            >
              <p className="center-absolute">For Sale</p>
            </button>
          </div>
          <label className="w-100 mt-20px pl-10px marketplace-flyout-label">
            Creators
          </label>
          <div className="mrk_flyout_lb_selector w-100 px-5px">
            <button
              onClick={() => creatorsClick("verified")}
              className={[
                "d-flex flex-row flex-center",
                creatorTypeVerified ? "selected" : "",
              ].join(" ")}
            >
              <span className="center-absolute">
                <img
                  src="/assets/icons/checkmark_14px.svg"
                  className="mr-5px"
                  alt="image-icon"
                />
                Verified
              </span>
            </button>
            <button
              onClick={() => creatorsClick("all")}
              className={[
                "d-flex flex-row flex-center",
                !creatorTypeVerified ? "selected" : "",
              ].join(" ")}
            >
              <span className="center-absolute">
                <img
                  src="/assets/icons/market_globe_icon.svg"
                  className="mr-5px"
                  alt="image-icon"
                />
                All
              </span>
            </button>
          </div>
          <div
            className={[
              "verifiedFlyoutAccordion",
              creatorTypeVerified ? "expanded" : "",
            ].join(" ")}
          >
            <label className="w-100 mt-20px pl-10px marketplace-flyout-label">
              Category
            </label>
            <select
              value={NFTCategory}
              onChange={(e) => categorySelectChange(e)}
              className="w-100 p-5px mrk_select_flyout font-weight-semibold"
            >
              <option value="all" className="target">
                All
              </option>
              <option value="photography">Photography</option>
              <option value="art">Art</option>
              <option value="collectibles">Collectibles</option>
              <option value="generative art">Generative Art</option>
              <option value="metaverse">Metaverse & Gaming</option>
              <option value="music">Music</option>
              <option value="profile picture">
                Profile Picture Collection
              </option>
            </select>
          </div>
        </div>
      ) : null}
      {flyout ? (
        <div className="mlb-flyout-apply-button-container">
          <button
            disabled={!canUserSort}
            onClick={() => apply()}
            className="marketplace-flyout-apply-button font-weight-bold"
          >
            <span className="center-absolute">
              <img
                src="/assets/icons/market_apply_icon.svg"
                className="mr-5px"
                alt="image-icon"
              />
              Apply
            </span>
          </button>
        </div>
      ) : null}
    </>
  );
};
export default MarketplaceEthSortBar;
