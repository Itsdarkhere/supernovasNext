import styles from "../../styles/Marketplace/marketplaceEthSortBar.module.scss";

const MarketplaceEthSortBar = ({ flyout }) => {
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
