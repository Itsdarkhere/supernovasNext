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
  // <!--<div class="marketplace-nav-width position-relative"> Commented out to make position sticky work-->
  return (
    <>
      {/* *ngIf="!flyout" */}
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
              {/*  (click)="statusClick('all')"
                [ngClass]="{ selected: this.statusAll }" */}
              <button className="font-weight-semibold fs-14px">All</button>
              {/* (click)="statusClick('for sale')"
                [ngClass]="{ selected: this.statusForSale }" */}
              <button className="font-weight-semibold fs-14px">For Sale</button>
              {/* (click)="statusClick('has bids')"
                [ngClass]="{ selected: this.statusHasBids }" */}
              <button className="font-weight-semibold fs-14px">Has Bids</button>
              {/* (click)="statusClick('sold')"
                [ngClass]="{ selected: this.statusSold }" */}
              <button className="font-weight-semibold fs-14px">Sold</button>
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
                {/* (click)="resetPriceRange()" */}
                <button></button>
              </div>
            ) : (
              <div>
                <div className={styles.mlb_price_inputs_container}>
                  {/* [ngClass]="{ incorrect: priceRangeIncorrect }" [(ngModel)]="lowPrice" */}
                  <input type="number" placeholder="Min" />
                  {/* [ngClass]="{ incorrect: priceRangeIncorrect }" [(ngModel)]="highPrice" */}
                  <input type="number" placeholder="Max" />
                </div>
                {/* (click)="checkPriceRange()" */}
                <button
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
            {/* [ngClass]="marketPrimary ? 'market-button-checked' : ''"
            (click)="marketClick('primary')" */}
            <button className={styles.marketplace_filter_button}>
              {/* [checked]="marketPrimary" */}
              <input
                type="checkbox"
                className={styles.marketplace_button_checkbox}
              />
              <label className={styles.marketplace_checkbox_label}>
                Primary
              </label>
            </button>
            {/* [ngClass]="marketSecondary ? 'market-button-checked' : ''"
            (click)="marketClick('secondary')" */}
            <button className={styles.marketplace_filter_button + " mt-10px"}>
              {/* [checked]="marketSecondary" */}
              <input
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
              {/* (click)="creatorsClick('verified')"
                [ngClass]="{ selected: creatorTypeVerified }" */}
              <button className="fs-12px d-flex flex-row flex-center">
                <Image
                  src={checkmarkIcon}
                  className="mr-5px"
                  alt="image-icon"
                />
                Verified
              </button>
              {/* (click)="creatorsClick('all')"
                [ngClass]="{ selected: !creatorTypeVerified }" */}
              <button className="fs-12px d-flex flex-row flex-center">
                <Image
                  src={marketGlobeIcon}
                  className="mr-5px"
                  alt="image-icon"
                />
                All
              </button>
            </div>
            {/* [ngClass]="{ expanded: this.creatorTypeVerified }" */}
            <div className={styles.verifiedAccordion + " disable-scrollbars"}>
              <label
                className={styles.marketplace_label}
                style={{ marginTop: "20px", paddingLeft: "10px" }}
              >
                Category
              </label>
              {/* (ngModelChange)="categorySelectChange($event)"
                [ngModel]="NFTCategory" */}
              <select
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
              {/* [ngClass]="{ selected: formatAll }"
                (click)="formatClick('all')" */}
              <button className={styles.mlb_content_format_button}>
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
                {/* (click)="formatClick('images')" [ngClass]="{ selected: formatImages }" */}
                <button>
                  <Image
                    src={marketImagesIcon}
                    className="mb-5px"
                    alt="image-icon"
                  />
                  Images
                </button>
                {/* (click)="formatClick('video')" [ngClass]="{ selected: formatVideo }" */}
                <button>
                  <Image
                    src={marketVideoIcon}
                    className="mb-5px"
                    alt="image-icon"
                  />
                  Video
                </button>
                {/* (click)="formatClick('music')" [ngClass]="{ selected: formatMusic }" */}
                <button>
                  <Image
                    src={marketMusicIcon}
                    className="mb-5px"
                    alt="image-icon"
                  />
                  Music
                </button>
                {/* (click)="formatClick('3d')" [ngClass]="{ selected: format3D }" */}
                <button>
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
            {/* [disabled]="!canUserSort || priceRangeIncorrect" (click)="apply()" */}
            <button className={styles.marketplace_apply_button}>
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
          {/**ngIf="flyout"*/}
          <div className={styles.flyout__nav__inner__marketplace}>
            <div className={styles.nav_close_marketplace}>
              {/* (click)="closeMenu()" */}
              <Image src={closeSquare} className="cursor-pointer" alt="" />
            </div>
            <label className={styles.marketplace_flyout_label}>Status</label>
            <div className={styles.mlb_flyout_status_grid}>
              {/* (click)="statusClick('all')" [ngClass]="{ selected: this.statusAll }" */}
              <button className="font-weight-semibold">
                <p className={styles.center_absolute}>All</p>
              </button>
              {/* (click)="statusClick('for sale')" [ngClass]="{ selected: this.statusForSale }" */}
              <button className="font-weight-semibold">
                <p className={styles.center_absolute}>For Sale</p>
              </button>
              {/* (click)="statusClick('has bids')" [ngClass]="{ selected: this.statusHasBids }" */}
              <button className="font-weight-semibold">
                <p className={styles.center_absolute}>Has bids</p>
              </button>
              {/* (click)="statusClick('sold')" [ngClass]="{ selected: this.statusSold }" */}
              <button className="font-weight-semibold">
                <p className={styles.center_absolute}>Sold</p>
              </button>
            </div>
            <label className={styles.marketplace_flyout_label}>
              Price range
            </label>
            {marketplacePriceRangeSet ? (
              <div>
                <div className={styles.mlb_flyout_price_inputs_container}>
                  {/* [ngClass]="{ incorrect: priceRangeIncorrect }" [(ngModel)]="lowPrice" */}
                  <input type="number" placeholder="Min" />
                  {/* [ngClass]="{ incorrect: priceRangeIncorrect }" [(ngModel)]="highPrice" */}
                  <input type="number" placeholder="Max" />
                </div>
                {/* (click)="checkPriceRange()" */}
                <button
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
                {/* (click)="resetPriceRange()" */}
                <button></button>
              </div>
            )}

            <label className={styles.marketplace_flyout_label}>Market</label>
            {/* [ngClass]="marketPrimary ? 'market-button-checked' : ''"
        (click)="marketClick('primary')" */}
            <button className={styles.marketplace_flyout_filter_button}>
              {/* [checked]="marketPrimary" */}
              <input
                type="checkbox"
                className={styles.marketplace_button_checkbox}
              />
              <label className={styles.marketplace_flyout_checkbox_label}>
                Primary
              </label>
            </button>
            {/* [ngClass]="marketSecondary ? 'market-button-checked' : ''"
        (click)="marketClick('secondary')" */}
            <button
              className={styles.marketplace_flyout_filter_button}
              style={{ marginTop: "10px" }}
            >
              {/* [checked]="marketSecondary" */}
              <input
                type="checkbox"
                className={styles.marketplace_button_checkbox}
              />
              <label className={styles.marketplace_flyout_checkbox_label}>
                Secondary
              </label>
            </button>
            <label className={styles.marketplace_flyout_label}>Creators</label>
            <div className={styles.mrk_flyout_lb_selector}>
              {/* (click)="creatorsClick('verified')"
        [ngClass]="{ selected: creatorTypeVerified }" */}
              <button className="d-flex flex-row flex-center">
                <span className={styles.center_absolute}>
                  <Image
                    src={checkmarkIcon}
                    className="mr-5px"
                    alt="image-icon"
                  />
                  Verified
                </span>
              </button>
              {/* (click)="creatorsClick('all')"
        [ngClass]="{ selected: !creatorTypeVerified }" */}
              <button className="d-flex flex-row flex-center">
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
            {/* <!-- disable-scrollbars --> */}
            {/* [ngClass]="{ expanded: this.creatorTypeVerified }" */}
            <div className={styles.verifiedFlyoutAccordion}>
              <label className={styles.marketplace_flyout_label}>
                Category
              </label>
              {/* (ngModelChange)="categorySelectChange($event)"
        [ngModel]="NFTCategory" */}
              <select className={styles.mrk_select_flyout}>
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
              {/* [ngClass]="{ selected: formatAll }"
        (click)="formatClick('All')" */}
              <button className={styles.mlb_flyout_content_format_button}>
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
                {/* (click)="formatClick('images')" [ngClass]="{ selected: formatImages }" */}
                <button>
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
                {/* (click)="formatClick('video')" [ngClass]="{ selected: formatVideo }" */}
                <button>
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
                {/* (click)="formatClick('music')" [ngClass]="{ selected: formatMusic }" */}
                <button>
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
                {/* (click)="formatClick('3d')" [ngClass]="{ selected: format3D }" */}
                <button>
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
          {/* *ngIf="flyout" */}
          <div className="mlb-flyout-apply-button-container">
            {/* [disabled]="!canUserSort || priceRangeIncorrect"
        (click)="apply()" */}
            <button className="marketplace-flyout-apply-button font-weight-bold">
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
        </>
      )}
    </>
  );
};

export default MarketplaceSortBar;
