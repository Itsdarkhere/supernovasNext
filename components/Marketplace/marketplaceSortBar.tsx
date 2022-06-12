import styles from "../../styles/Marketplace/marketplaceSortBar.module.scss";
import { useAppSelector } from "../../utils/Redux/hooks";
import marketGlobeIcon from "../../public/icons/market_globe_icon.svg";
import marketImagesIcon from "../../public/icons/market_images_icon.svg";
import marketVideoIcon from "../../public/icons/market_video_icon.svg";
import marketMusicIcon from "../../public/icons/market_music_icon.svg";
import market3DIcon from "../../public/icons/market_3d_icon.svg";
import marketApplyIcon from "../../public/icons/market_apply_icon.svg";
import closeSquare from "../../public/img/close_square.svg";
import checkmarkIcon from "../../public/icons/checkmark_14px.svg";
import Image from "next/image";

const MarketplaceSortBar = ({ flyout }) => {
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
