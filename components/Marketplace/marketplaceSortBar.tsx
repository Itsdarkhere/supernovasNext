import styles from "../../styles/Marketplace/marketplaceSortBar.module.scss";
import { useAppDispatch, useAppSelector } from "../../utils/Redux/hooks";
import marketGlobeIcon from "../../public/icons/market_globe_icon.svg";
import marketImagesIcon from "../../public/icons/market_images_icon.svg";
import marketVideoIcon from "../../public/icons/market_video_icon.svg";
import marketMusicIcon from "../../public/icons/market_music_icon.svg";
import market3DIcon from "../../public/icons/market_3d_icon.svg";
import marketApplyIcon from "../../public/icons/market_apply_icon.svg";
import closeSquare from "../../public/img/close_square.svg";
import checkmarkIcon from "../../public/icons/checkmark_14px.svg";
import Image from "next/image";
import { useState } from "react";
import { setMarketplaceContentFormat, setMarketplaceHighPriceNanos, setMarketPlaceHighPriceUSD, setMarketplaceLowPriceNanos, setMarketplaceLowPriceUSD, setMarketplaceMarketType, setMarketplaceNFTCategory, setMarketplacePriceRangeSet, setMarketplaceStatus, setMarketplaceVerifiedCreators } from "../../utils/Redux/Slices/sortSlice";
import { toInteger } from "lodash";
import { usdToNanosNumber } from "../../utils/global-context";
import { setIsMarketplaceLeftBarMobileOpen } from "../../utils/Redux/Slices/openSlice";
import { setIsMarketplaceLoading } from "../../utils/Redux/Slices/marketplaceSlice";

const MarketplaceSortBar = ({ flyout, onFilter }) => {
  // Redux
  const dispatch = useAppDispatch();
  const marketplaceLowPriceNanos = useAppSelector((state) => state.sort.marketplaceLowPriceNanos);
  const marketplaceHighPriceNanos = useAppSelector((state) => state.sort.marketplaceHighPriceNanos);
  const marketplaceNFTCategory = useAppSelector((state) => state.sort.marketplaceNFTCategory);
  const desoMarketplace = useAppSelector((state) => state.sort.desoMarketplace);
  // Content format
  const [formatAll, setFormatAll] = useState(true);
  const [formatImages, setFormatImages] = useState(false);
  const [formatVideo, setFormatVideo] = useState(false);
  const [formatMusic, setFormatMusic] = useState(false);
  const [format3D, setFormat3D] = useState(false);
  // Status
  const [statusAll, setStatusAll] = useState(true);
  const [statusForSale, setStatusForSale] = useState(false);
  const [statusHasBids, setStatusHasBids] = useState(false);
  const [statusSold, setStatusSold] = useState(false);
  // Market
  const [marketPrimary, setMarketPrimary] = useState(true);
  const [marketSecondary, setMarketSecondary] = useState(true);
  // Creator type
  const [creatorTypeVerified, setCreatorTypeVerified] = useState(true);
  // Category
  const [NFTCategory, setNFTCategory] = useState("");
  // Prices
  const [lowPrice, setLowPrice] = useState(null);
  const [highPrice, setHighPrice] = useState(null);
  const [priceRangeIncorrect, setPriceRangeIncorrect] = useState(false);
  // If the user can sort
  const [canUserSort, setCanUserSort] = useState(false);

  // Last sort values, keep last sort values in memory to compare them to current values
  // This is to enable / disable the apply button accordingly
  let lastSortLowPrice = 0;
  let lastSortHighPrice = 0;
  let lastSortContentFormatAll = true;
  let lastSortContentFormatVideo = false;
  let lastSortContentFormatMusic = false;
  let lastSortContentFormatImages = false;
  let lastSortContentFormat3D = false;
  let lastSortCreatorTypeVerified = true;
  let lastSortMarketPrimary = true;
  let lastSortMarketSecondary = true;
  let lastSortStatusAll = true;
  let lastSortStatusForSale = false;
  let lastSortStatusHasBids = false;
  let lastSortStatusSold = false;
  let lastSortCategory = "all";

  let marketplacePriceRangeSet = useAppSelector(
    (state) => state.sort.marketplacePriceRangeSet
  );
  let marketplaceLowPriceUSD = useAppSelector(
    (state) => state.sort.marketplaceLowPriceUSD
  );
  let marketplaceHighPriceUSD = useAppSelector(
    (state) => state.sort.marketplaceHighPriceUSD
  );
  // Functions
  const showPriceRange = () => {
    if (!marketplaceLowPriceUSD && !marketplaceHighPriceUSD) {
      return "0$ to ";
    } else {
      return marketplaceLowPriceUSD + "$ to " + marketplaceHighPriceUSD + "$";
    }
  };
  // Status button clicks, does not stay in memory
  const statusClick = (button: string) => {
    switch (button) {
      case "all":
        if (!statusAll) {
          setStatusAll(true);
          setStatusForSale(false);
          setStatusHasBids(false);
          setStatusSold(false);
        }
        break;
      case "for sale":
        if (statusForSale) {
          setStatusAll(true);
          setStatusForSale(false);
        } else {
          setStatusAll(false);
          setStatusForSale(true);
          setStatusHasBids(false);
          setStatusSold(false);
        }
        break;
      case "has bids":
        if (statusHasBids) {
          setStatusAll(true);
          setStatusHasBids(false);
        } else {
          setStatusAll(false);
          setStatusForSale(false);
          setStatusHasBids(true);
          setStatusSold(false);
        }
        break;
      case "sold":
        if (statusSold) {
          setStatusAll(true);
          setStatusSold(false);
        } else {
          setStatusAll(false);
          setStatusForSale(false);
          setStatusHasBids(false);
          setStatusSold(true);
        }
        break;
      default:
        break;
    }
    // Check if user can sort
    canSort();
  }

  const resetPriceRange = () => {
    setLowPrice(null);
    setHighPrice(null)
    setPriceRangeIncorrect(false);
    dispatch(setMarketplacePriceRangeSet(false));
    dispatch(setMarketplaceLowPriceUSD(0));
    dispatch(setMarketplaceLowPriceNanos(0));
    dispatch(setMarketplaceHighPriceNanos(0));
    dispatch(setMarketplaceHighPriceNanos(0));
    canSort();
  }

  const checkPriceRange = () => {
    if (lowPrice > highPrice || highPrice == undefined || lowPrice == undefined) {
      setPriceRangeIncorrect(true);
      return;
    } else if (lowPrice < 0 || highPrice < 0) {
      setPriceRangeIncorrect(true);
      return;
    } else {
      setPriceRangeIncorrect(false);
      setPriceRangeInNanos();
    }
  }

  const marketClick = (market: string) => {
    switch (market) {
      case "primary":
        if (!marketPrimary) {
          setMarketPrimary(true);
        } else if (marketSecondary && marketPrimary) {
          setMarketPrimary(false);
        }
        break;
      case "secondary":
        if (!marketSecondary) {
          setMarketSecondary(true);
        } else if (marketSecondary && marketPrimary) {
          setMarketSecondary(false);
        }
        break;
      case "all":
        setMarketPrimary(true);
        setMarketSecondary(true);
      default:
      // Do nothing
    }
    // Check if user can sort
    canSort();
  }

  const creatorsClick = (creatorType: string) => {
    switch (creatorType) {
      case "verified":
        setCreatorTypeVerified(true);
        break;
      case "all":
        setCreatorTypeVerified(false);
        categoryAndFormatToBaseState();
        break;
      default:
        break;
    }
    // Check if user can sort
    canSort();
  }

  const categoryAndFormatToBaseState = () => {
    dispatch(setMarketplaceNFTCategory("all"));
    dispatch(setMarketplaceContentFormat("all"));
    setFormat3D(false);
    setFormatImages(false);
    setFormatMusic(false);
    setFormatVideo(false);
    setFormatAll(true);
  }

  const setPriceRangeInNanos = () => {
    dispatch(setMarketplacePriceRangeSet(true));
    // These are displayed in the ui once price is set
    dispatch(setMarketPlaceHighPriceUSD(highPrice))
    dispatch(setMarketplaceLowPriceUSD(lowPrice));
    // These are sent to the backend
    // Unfortunately need to cast to int to remove numbers after ( . )
    // This does make the query slightly less accurate
    dispatch(setMarketplaceLowPriceNanos(usdToNanosNumber(lowPrice)))
    dispatch(setMarketplaceHighPriceNanos(usdToNanosNumber(highPrice)))
    // Check if
    canSort();
  }

  // Format button clicks
  const formatClick = (button: string) => {
    switch (button) {
      case "all":
        if (!formatAll) {
          setFormatAll(true);
          setFormat3D(false);
          setFormatImages(false);
          setFormatMusic(false);
          setFormatVideo(false);
        }
        break;
      case "images":
        if (formatImages) {
          setFormatImages(false);
          // Applies all if all other formats are closed
          formatAllIfNoOtherFormats();
        } else {
          setFormat3D(false);
          setFormatImages(true);
          setFormatMusic(false);
          setFormatVideo(false);
          if (formatAll) {
            setFormatAll(false);
          }
        }
        break;
      case "video":
        if (formatVideo) {
          setFormatVideo(false);
          // Applies all if all other formats are closed
          formatAllIfNoOtherFormats();
        } else {
          setFormat3D(false);
          setFormatImages(false);
          setFormatMusic(false);
          setFormatVideo(true);
          if (formatAll) {
            setFormatAll(false);
          }
        }
        break;
      case "music":
        if (formatMusic) {
          setFormatMusic(false);
          // Applies all if all other formats are closed
          formatAllIfNoOtherFormats();
        } else {
          setFormat3D(false);
          setFormatImages(false);
          setFormatMusic(true);
          setFormatVideo(false);
          if (formatAll) {
            setFormatAll(false);
          }
        }
        break;
      case "3d":
        if (format3D) {
          setFormat3D(false);
          // Applies all if all other formats are closed
          formatAllIfNoOtherFormats();
        } else {
          setFormat3D(false);
          setFormatImages(false);
          setFormatMusic(false);
          setFormatVideo(true);
          if (formatAll) {
            setFormatAll(false);
          }
        }
        break;
      default:
        break;
    }
    // Check if user can sort
    canSort();
  }

  const formatAllIfNoOtherFormats = () => {
    if (!format3D && !formatImages && !formatVideo && !formatMusic) {
      setFormatAll(true);
      dispatch(setMarketplaceContentFormat("all"));
    }
  }

  const canSort = () => {
    // If price is different from last sort
    if (
      lastSortLowPrice != marketplaceLowPriceNanos ||
      lastSortHighPrice != marketplaceHighPriceNanos
    ) {
      setCanUserSort(true);
      // If market is different from last sort
    } else if (
      lastSortMarketPrimary != marketPrimary ||
      lastSortMarketSecondary != marketSecondary
    ) {
      setCanUserSort(true);
      // If category is different from last sort
    } else if (NFTCategory != lastSortCategory) {
      setCanUserSort(true);
      // If content format is different from last sort
    } else if (
      lastSortContentFormatAll != formatAll ||
      lastSortContentFormatImages != formatImages ||
      lastSortContentFormatVideo != formatVideo ||
      lastSortContentFormatMusic != formatMusic ||
      lastSortContentFormat3D != format3D
    ) {
      setCanUserSort(true);
      // If status is different from last time
    } else if (
      lastSortStatusAll != statusAll ||
      lastSortStatusForSale != statusForSale ||
      lastSortStatusHasBids != statusHasBids ||
      lastSortStatusSold != statusSold
    ) {
      setCanUserSort(true);
      // If creator type is different from last time
    } else if (lastSortCreatorTypeVerified != creatorTypeVerified) {
      setCanUserSort(true);
      // If nothing has changed user cannot sort
    } else {
      setCanUserSort(false);
    }
  }

  const categorySelectChange = (event) => {
    if (NFTCategory != event) {
      setNFTCategory(event);
      // Check if user can sort
      canSort();
    }
  }

  const closeMenu = () => {
    // Put back
    // functionPass.filter("close");
    onFilter("close");
    setTimeout(() => {
      dispatch(setIsMarketplaceLeftBarMobileOpen(false));
    }, 200);
  }

  const apply = () => {
    if (desoMarketplace) {
      // These are used in the canSort()
      lastSortLowPrice = marketplaceLowPriceNanos;
      lastSortHighPrice = marketplaceHighPriceNanos;

      dispatch(setIsMarketplaceLoading(true));
      setMarketType();
      setCategory();
      setContentFormat();
      setStatus();
      setCreatorType();
      onFilter("sort");
      // Put back
      // functionPass.filter("sort");
      setCanUserSort(false);
      setTimeout(() => {
        dispatch(setIsMarketplaceLeftBarMobileOpen(false));
      }, 200);
    } else {
      dispatch(setIsMarketplaceLoading(true));
      setCategory();
      setStatus();
      setCanUserSort(false);

      setTimeout(() => {
        dispatch(setIsMarketplaceLeftBarMobileOpen(false));
      }, 200);
    }
  }

  // Set the status, stays in memory
  const setStatus = () => {
    if (statusAll) {
      dispatch(setMarketplaceStatus("all"));
      // Store to use in canSort()
      lastSortStatusAll = true;
      lastSortStatusForSale = false;
      lastSortStatusHasBids = false;
      lastSortStatusSold = false;
    } else if (statusForSale) {
      dispatch(setMarketplaceStatus("for sale"));
      // Store to use in canSort()
      lastSortStatusForSale = true;
      lastSortStatusSold = false;
      lastSortStatusAll = false;
      lastSortStatusHasBids = false;
    } else if (statusHasBids) {
      dispatch(setMarketplaceStatus("has bids"));
      // Store to use in canSort()
      lastSortStatusHasBids = true;
      lastSortStatusAll = false;
      lastSortStatusForSale = false;
      lastSortStatusSold = false;
    } else if (statusSold) {
      dispatch(setMarketplaceStatus("sold"));
      // Store to use in canSort()
      lastSortStatusSold = true;
      lastSortStatusHasBids = false;
      lastSortStatusAll = false;
      lastSortStatusForSale = false;
    }
  }

  // Set to global memory
  const setCategory = () => {
    if (marketplaceNFTCategory != NFTCategory) {
      dispatch(setMarketplaceNFTCategory(NFTCategory))
      // Store to use in canSort
      lastSortCategory = NFTCategory;
      // Check if user can sort
      canSort();
    }
  }

  // Set to stay in memory
  const setContentFormat = () => {
    if (formatAll) {
      dispatch(setMarketplaceContentFormat("all"));
      // Store to use in canSort
      lastSortContentFormatAll = true;
      lastSortContentFormatImages = false;
      lastSortContentFormatVideo = false;
      lastSortContentFormatMusic = false;
      lastSortContentFormat3D = false;
    } else if (formatImages) {
      dispatch(setMarketplaceContentFormat("images"));
      // Store to use in canSort
      lastSortContentFormatAll = false;
      lastSortContentFormatImages = true;
      lastSortContentFormatVideo = false;
      lastSortContentFormatMusic = false;
      lastSortContentFormat3D = false;
    } else if (formatVideo) {
      dispatch(setMarketplaceContentFormat("video"));
      // Store to use in canSort
      lastSortContentFormatAll = false;
      lastSortContentFormatMusic = false;
      lastSortContentFormatImages = false;
      lastSortContentFormatVideo = true;
      lastSortContentFormat3D = false;
    } else if (formatMusic) {
      dispatch(setMarketplaceContentFormat("music"));
      // Store to use in canSort
      lastSortContentFormatAll = false;
      lastSortContentFormatVideo = false;
      lastSortContentFormatMusic = true;
      lastSortContentFormatImages = false;
      lastSortContentFormat3D = false;
    } else if (format3D) {
      dispatch(setMarketplaceContentFormat("3d"));
      // Store to use in canSort
      lastSortContentFormatAll = false;
      lastSortContentFormatImages = false;
      lastSortContentFormatVideo = false;
      lastSortContentFormatMusic = false;
      lastSortContentFormat3D = true;
    }
  }

  // Set marketType TO global memory
  const setMarketType = () => {
    if (marketPrimary && marketSecondary) {
      dispatch(setMarketplaceMarketType("all"));
      // Store to compare in canSort()
      lastSortMarketPrimary = true;
      lastSortMarketSecondary = true;
    } else if (!marketPrimary && marketSecondary) {
      dispatch(setMarketplaceMarketType("secondary"));

      // Store to compare in canSort()
      lastSortMarketPrimary = false;
      lastSortMarketSecondary = true;
    } else if (marketPrimary && !marketSecondary) {
      dispatch(setMarketplaceMarketType("primary"));
      // Store to compare in canSort()
      lastSortMarketPrimary = true;
      lastSortMarketSecondary = false;
    }
  }

  // Set to memory
  const setCreatorType = () => {
    if (creatorTypeVerified) {
      dispatch(setMarketplaceVerifiedCreators("verified"));
      // Store to use in canSort
      lastSortCreatorTypeVerified = true;
    } else {
      dispatch(setMarketplaceVerifiedCreators("all"));
      // Store to use in canSort
      lastSortCreatorTypeVerified = false;
    }
  }

  // Functions
  return (
    <>
      {!flyout ? (
        <div className={styles.global__nav__sticky__marketplace}>
          <div
            className={
              styles.global__nav__inner__marketplace + " disable-scrollbars"
            }
          >
            <label
              className={styles.marketplace_label}
              style={{ paddingLeft: "10px" }}
            >
              Status
            </label>
            <div className={styles.mlb_status_grid}>
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

              <button
                onClick={() => statusClick("has bids")}
                className={[
                  "font-weight-semibold fs-14px",
                  statusHasBids ? "selected" : "",
                ].join(" ")}
              >
                Has Bids
              </button>

              <button
                onClick={() => statusClick("sold")}
                className={[
                  "font-weight-semibold fs-14px",
                  statusSold ? "selected" : "",
                ].join(" ")}
              >
                Sold
              </button>
            </div>
            <label
              className={styles.marketplace_label}
              style={{ marginTop: "20px", paddingLeft: "10px" }}
            >
              Price range
            </label>

            {marketplacePriceRangeSet ? (
              <div className={styles.mlb_price_set_box}>
                <span>{showPriceRange()}</span>
                <button onClick={() => resetPriceRange()}></button>
              </div>
            ) : (
              <div>
                <div className={styles.mlb_price_inputs_container}>
                  <input
                    value={lowPrice}
                    type="number"
                    placeholder="Min"
                    className={priceRangeIncorrect ? "incorrect" : ""}
                  />

                  <input
                    value={highPrice}
                    type="number"
                    placeholder="Max"
                    className={priceRangeIncorrect ? "incorrect" : ""}
                  />
                </div>

                <button
                  onClick={() => checkPriceRange()}
                  className="w-100 mt-5px white-rounded-button font-weight-semibold fs-14px py-5px"
                  style={{ color: "#2c2c2c" }}
                >
                  Set Price
                </button>
              </div>
            )}

            <label
              className={styles.marketplace_label}
              style={{ marginTop: "20px", paddingLeft: "10px" }}
            >
              Market
            </label>

            <button
              onClick={() => marketClick("primary")}
              className={[
                styles.marketplace_filter_button,
                marketPrimary ? "market-button-checked" : "",
              ].join(" ")}
            >
              <input
                checked={marketPrimary}
                type="checkbox"
                className={styles.marketplace_button_checkbox}
              />
              <label className={styles.marketplace_checkbox_label}>
                Primary
              </label>
            </button>
            <button
              onClick={() => marketClick("secondary")}
              className={[
                styles.marketplace_filter_button,
                "mt-10px",
                marketSecondary ? "market-button-checked" : "",
              ].join(" ")}
            >
              <input
                checked={marketSecondary}
                type="checkbox"
                className={styles.marketplace_button_checkbox}
              />
              <label className={styles.marketplace_checkbox_label}>
                Secondary
              </label>
            </button>
            <label
              className={styles.marketplace_label}
              style={{ marginTop: "20px", paddingLeft: "10px" }}
            >
              Creators
            </label>
            <div className={styles.mrk_lb_selector}>
              <button
                onClick={() => creatorsClick("verified")}
                className={[
                  "fs-12px d-flex flex-row flex-center",
                  creatorTypeVerified ? "selected" : "",
                ].join(" ")}
              >
                <Image
                  src={checkmarkIcon}
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
                <Image
                  src={marketGlobeIcon}
                  className="mr-5px"
                  alt="image-icon"
                />
                All
              </button>
            </div>
            <div
              className={[
                styles.verifiedAccordion,
                "disable-scrollbars",
                creatorTypeVerified ? "expanded" : "",
              ].join(" ")}
            >
              <label
                className={styles.marketplace_label}
                style={{ marginTop: "20px", paddingLeft: "10px" }}
              >
                Category
              </label>
              <select
                value={NFTCategory}
                onChange={(e) => categorySelectChange(e)}
                className={styles.mrk_select + " " + styles.mrk_select_height}
              >
                <option value="all">All</option>
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
              <label
                className={styles.marketplace_label}
                style={{ marginTop: "20px", paddingLeft: "10px" }}
              >
                Content format
              </label>
              <button
                onClick={() => formatClick("all")}
                className={[
                  styles.mlb_content_format_button,
                  formatAll ? "selected" : "",
                ].join(" ")}
              >
                <Image
                  src={marketGlobeIcon}
                  className="mr-5px"
                  alt="image-icon"
                />
                All
              </button>
              <div
                className={styles.mlb_status_grid}
                style={{ paddingTop: "10px" }}
              >
                <button
                  onClick={() => formatClick("images")}
                  className={formatImages ? "selected" : ""}
                >
                  <Image
                    src={marketImagesIcon}
                    className="mb-5px"
                    alt="image-icon"
                  />
                  Images
                </button>

                <button
                  onClick={() => formatClick("video")}
                  className={formatVideo ? "selected" : ""}
                >
                  <Image
                    src={marketVideoIcon}
                    className="mb-5px"
                    alt="image-icon"
                  />
                  Video
                </button>

                <button
                  onClick={() => formatClick("music")}
                  className={formatMusic ? "selected" : ""}
                >
                  <Image
                    src={marketMusicIcon}
                    className="mb-5px"
                    alt="image-icon"
                  />
                  Music
                </button>
                <button
                  onClick={() => formatClick("3d")}
                  className={format3D ? "selected" : ""}
                >
                  <Image
                    src={market3DIcon}
                    className="mb-5px"
                    alt="image-icon"
                  />
                  3D
                </button>
              </div>
            </div>
          </div>
          <div className={styles.mlb_apply_button_container}>
            <button
              disabled={!canUserSort || priceRangeIncorrect}
              onClick={() => apply()}
              className={styles.marketplace_apply_button}
            >
              <Image
                src={marketApplyIcon}
                className="mr-5px"
                alt="image-icon"
              />
              Apply
            </button>
          </div>
        </div>
      ) : (
        <>
          {/*<!-- Style way aspect ration differently for mobile -->
        <!-- disable-scrollbars -->*/}
          {flyout ? (
            <div className={styles.flyout__nav__inner__marketplace}>
              <div className={styles.nav_close_marketplace}>
                <Image
                  onClick={() => closeMenu()}
                  src={closeSquare}
                  className="cursor-pointer"
                  alt=""
                />
              </div>
              <label className={styles.marketplace_flyout_label}>Status</label>
              <div className={styles.mlb_flyout_status_grid}>
                <button
                  onClick={() => statusClick("all")}
                  className={[
                    "font-weight-semibold",
                    statusAll ? "selected" : "",
                  ].join(" ")}
                >
                  <p className={styles.center_absolute}>All</p>
                </button>

                <button
                  onClick={() => statusClick("for sale")}
                  className={[
                    "font-weight-semibold",
                    statusForSale ? "selected" : "",
                  ].join(" ")}
                >
                  <p className={styles.center_absolute}>For Sale</p>
                </button>

                <button
                  onClick={() => statusClick("has bids")}
                  className={[
                    "font-weight-semibold",
                    statusHasBids ? "selected" : "",
                  ].join(" ")}
                >
                  <p className={styles.center_absolute}>Has bids</p>
                </button>
                <button
                  onClick={() => statusClick("sold")}
                  className={[
                    "font-weight-semibold",
                    statusSold ? "selected" : "",
                  ].join(" ")}
                >
                  <p className={styles.center_absolute}>Sold</p>
                </button>
              </div>
              <label className={styles.marketplace_flyout_label}>
                Price range
              </label>
              {marketplacePriceRangeSet ? (
                <div>
                  <div className={styles.mlb_flyout_price_inputs_container}>
                    <input
                      value={lowPrice}
                      className={priceRangeIncorrect ? "incorrect" : ""}
                      type="number"
                      placeholder="Min"
                    />

                    <input
                      value={highPrice}
                      className={priceRangeIncorrect ? "incorrect" : ""}
                      type="number"
                      placeholder="Max"
                    />
                  </div>

                  <button
                    onClick={() => checkPriceRange()}
                    className={
                      styles.flyout_set_price_button + " white-rounded-button"
                    }
                  >
                    Set Price
                  </button>
                </div>
              ) : (
                <div className={styles.mlb_flyout_price_set_box}>
                  <span>{showPriceRange()}</span>
                  <button onClick={() => resetPriceRange()}></button>
                </div>
              )}

              <label className={styles.marketplace_flyout_label}>Market</label>

              <button
                onClick={() => marketClick("primary")}
                className={[
                  styles.marketplace_flyout_filter_button,
                  marketPrimary ? "market-button-checked" : "",
                ].join(" ")}
              >
                <input
                  checked={marketPrimary}
                  type="checkbox"
                  className={styles.marketplace_button_checkbox}
                />
                <label className={styles.marketplace_flyout_checkbox_label}>
                  Primary
                </label>
              </button>

              <button
                onClick={() => marketClick("secondary")}
                className={[
                  styles.marketplace_flyout_filter_button,
                  marketSecondary ? "market-button-checked" : "",
                ].join(" ")}
                style={{ marginTop: "10px" }}
              >
                <input
                  checked={marketSecondary}
                  type="checkbox"
                  className={styles.marketplace_button_checkbox}
                />
                <label className={styles.marketplace_flyout_checkbox_label}>
                  Secondary
                </label>
              </button>
              <label className={styles.marketplace_flyout_label}>
                Creators
              </label>
              <div className={styles.mrk_flyout_lb_selector}>
                <button
                  onClick={() => creatorsClick("verified")}
                  className={[
                    "d-flex flex-row flex-center",
                    creatorTypeVerified ? "selected" : "",
                  ].join(" ")}
                >
                  <span className={styles.center_absolute}>
                    <Image
                      src={checkmarkIcon}
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
                  <span className={styles.center_absolute}>
                    <Image
                      src={marketGlobeIcon}
                      className="mr-5px"
                      alt="image-icon"
                    />
                    All
                  </span>
                </button>
              </div>

              <div
                className={[
                  styles.verifiedFlyoutAccordion,
                  creatorTypeVerified ? "expanded" : "",
                ].join(" ")}
              >
                <label className={styles.marketplace_flyout_label}>
                  Category
                </label>

                <select
                  value={NFTCategory}
                  onChange={(e) => categorySelectChange(e)}
                  className={styles.mrk_select_flyout}
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
                <label className={styles.marketplace_flyout_label}>
                  Content format
                </label>

                <button
                  onClick={() => formatClick("All")}
                  className={[
                    styles.mlb_flyout_content_format_button,
                    formatAll ? styles.selected : "",
                  ].join(" ")}
                >
                  <span className={styles.left_center_absolute}>
                    <Image
                      src={marketGlobeIcon}
                      className="mr-5px"
                      alt="image-icon"
                    />
                    All
                  </span>
                </button>
                <div
                  className={styles.mlb_flyout_status_grid}
                  style={{ paddingTop: "10px" }}
                >
                  <button
                    onClick={() => formatClick("images")}
                    className={formatImages ? styles.selected : ""}
                  >
                    <span
                      className={styles.center_absolute}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <Image
                        src={marketImagesIcon}
                        className="mb-5px"
                        alt="image-icon"
                      />
                      Images
                    </span>
                  </button>

                  <button
                    onClick={() => formatClick("video")}
                    className={formatVideo ? styles.selected : ""}
                  >
                    <span
                      className={styles.center_absolute}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <Image
                        src={marketVideoIcon}
                        className="mb-5px"
                        alt="image-icon"
                      />
                      Video
                    </span>
                  </button>

                  <button
                    onClick={() => formatClick("music")}
                    className={formatMusic ? styles.selected : ""}
                  >
                    <span
                      className={styles.center_absolute}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <Image
                        src={marketMusicIcon}
                        className="mb-5px"
                        alt="image-icon"
                      />
                      Music
                    </span>
                  </button>

                  <button
                    onClick={() => formatClick("3d")}
                    className={format3D ? styles.selected : ""}
                  >
                    <span
                      className={styles.center_absolute}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <Image
                        src={market3DIcon}
                        className="mb-5px"
                        alt="image-icon"
                      />
                      3D
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          {flyout ? (
            <div className="mlb-flyout-apply-button-container">
              <button
                onClick={() => apply()}
                disabled={!canUserSort || priceRangeIncorrect}
                className="marketplace-flyout-apply-button font-weight-bold"
              >
                <span className={styles.center_absolute}>
                  <Image
                    src={marketApplyIcon}
                    className="mr-5px"
                    alt="image-icon"
                  />
                  Apply
                </span>
              </button>
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default MarketplaceSortBar;
