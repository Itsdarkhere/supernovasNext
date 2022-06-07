import styles from "../../styles/Modals/buyNowModal.module.scss";
import ModalBalanceSection from "./ethBalanceSection";
import ModalHeader from "./modalHeader";

const BuyNowModal = () => {
  // *ngIf="!isEthNFT"
  return (
    <>
      <div app-theme className="nft-modal-container disable-scrollbars p-15px">
        <div className="w-100 my-auto">
          {/* *ngIf="!serialNumber && !loading" */}
          <div>
            <ModalHeader
              bsModalRef="bsModalRef"
              header="'Select an edition'"
            ></ModalHeader>
            <div className="fs-15px nft_para text-center text-grey5">
              An NFT can have multiple editions, each with its own unique serial
              number.
            </div>
            <div className="container border-2 overflow-hidden border-radius-10 fs-15px px-0px">
              <div
                className="row no-gutters py-15px create-nft-auction-row-border heads justify-content-between"
                style={{ opacity: "50%" }}
              >
                <div className="col-4 txt text-align-center">
                  <span className="pl-15px">Serial Number</span>
                </div>
                <div className="col-5 txt mb-0px text-left">Buy Now Price</div>
              </div>
              {/* style="max-height: 325px; min-height: 325px; overflow-y: scroll" */}
              <div className="">
                {/* #uiScroll
            *uiScroll="let nft of datasource"
            (click)="selectSerialNumber(nft.SerialNumber)" */}
                <div className="row no-gutters justify-content-between nft_bid_tb_details background-color-white p-10px mb-0px create-nft-auction-row-border cursor-pointer">
                  <div className="col-4 pl-15px mb-0px d-flex align-items-center">
                    <span className="lh-15px pl-15px txt bd">
                      {nft.SerialNumber}
                    </span>
                  </div>
                  <div className="col-5 mb-0px d-flex justify-content-start align-items-center">
                    <div className="d-flex justify-content-around flex-wrap text-left">
                      <div className="d-lg-inline-block txt d-block w-100">
                        {nanosToDeSo(nft.BuyNowPriceNanos)} DESO
                      </div>
                      <div className="text-grey7 txt bd d-lg-inline-block d-block w-100">
                        (~{nanosToUSD(nft.BuyNowPriceNanos, 2)})
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* *ngIf="!biddableSerialNumbers?.length" */}
            <div className="fs-15px text-center">
              <p>There are no serial numbers available for you to bid on.</p>
              <p>{availableSerialNumbers}</p>
            </div>
          </div>
          {/* *ngIf="serialNumber && !this.buyNowNftSuccess" */}
          <div>
            <ModalHeader
              bsModalRef="bsModalRef"
              clickedBuyNow="clickedBuyNow"
              isBuyNow="true"
            ></ModalHeader>
            <div className="flex-container-column">
              <div className="purchase-price-container">
                <label>
                  <img
                    src="/assets/icons/lb_activity_icon.svg"
                    alt="lightning icon"
                  />
                  BUY NOW PRICE
                </label>
                {/* <app-blue-price-set [priceNanos]="buyNowPriceNanos"></app-blue-price-set> */}
              </div>
              {/* <!-- Balance check --> */}
              <ModalBalanceSection
                blockchainDeso="true"
                class="mt-20px"
              ></ModalBalanceSection>

              <div className="bid_pop_details_ls">
                <div className="lst">
                  <span className="lb">Coin Holder Royalty</span>
                  <span className="val">
                    {post.NFTRoyaltyToCoinBasisPoints / 100}%
                  </span>
                </div>
                <div className="lst">
                  <span className="lb">Creator Royalty</span>
                  <span className="val">
                    {post.NFTRoyaltyToCreatorBasisPoints / 100}%
                  </span>
                </div>
                <div className="divider"></div>
                <div className="lst">
                  <span className="lb">Blockchain fee</span>
                  <span className="val">0.001 $DESO</span>
                </div>
                <div className="lst">
                  <span className="lb">Supernovas fee</span>
                  <span className="val">0.00 $DESO</span>
                </div>
              </div>
              {/* [disabled]="this.globalVars.loggedInUser.BalanceNanos < buyNowPriceNanos"
          (click)="buyNowNft()" */}
              <button className="blk_line_btn with_ico big black-rounded-button mt-20px-important">
                Buy Now
              </button>
              {/* <app-not-enough-crypto *ngIf="canIAffordNFT()"></app-not-enough-crypto> */}
            </div>
          </div>
          {/* *ngIf="serialNumber && this.buyNowNftSuccess" */}
          <div>
            <div className="flex-container-column">
              <img
                src="../../assets/img/buy-now-success.png"
                className="buy-now-success-img"
              />
              <p className="buy-now-success-header">Congratulations!</p>
              <p className="buy-now-success-text">
                You are the new owner of this NFT. Thank you for supporting the
                artists of Supernovas - you are the hero the world needs.
              </p>
              {/* (click)="quoteRepost($event)" */}
              <button className="btn blk_line_btn with_ico big buy_now_btn quote_repost_btn">
                Quote repost your NFT
              </button>
              {/* (click)="this.bsModalRef.hide()" */}
              <button className="btn blk_line_btn with_ico big buy_now_btn close_window_btn">
                Close this window
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* *ngIf="isEthNFT" */}
      <div app-theme className="nft-modal-container disable-scrollbars p-15px">
        <div className="w-100 my-auto">
          {/* *ngIf="!buyNowNftSuccess" */}
          <div>
            {/* <nft-modal-header [bsModalRef]="bsModalRef" [clickedBuyNow]="clickedBuyNow" [isBuyNow]="true"></nft-modal-header> */}
            <div className="flex-container-column">
              <div className="purchase-price-container">
                <label>
                  <img
                    src="/assets/icons/lb_activity_icon.svg"
                    alt="lightning icon"
                  />
                  BUY NOW PRICE
                </label>
                {/* <app-grey-price-set [price]="ethereumNFTSalePrice"></app-grey-price-set> */}
              </div>
              {/*!-- Balance check -->  */}
              <ModalBalanceSection
                blockchainDeso="false"
                class="mt-20px"
              ></ModalBalanceSection>

              <div className="bid_pop_details_ls">
                <div className="lst">
                  <span className="lb">Blockchain fee</span>
                  <span className="val">0.00 ETH</span>
                </div>
                <div className="lst">
                  <span className="lb">Supernovas fee</span>
                  <span className="val">0.00 ETH</span>
                </div>
              </div>
              {/* [disabled]="this.globalVars.imxBalance < ethereumNFTSalePrice"
          (click)="buyNowETHNft()" */}
              <button className="blk_line_btn with_ico big black-rounded-button mt-20px-important">
                Buy Now
              </button>
              {/* <app-not-enough-crypto *ngIf="canIAffordETHNFT()"></app-not-enough-crypto> */}
            </div>
          </div>
          {/* *ngIf="buyNowNftSuccess" */}
          <div>
            <div className="flex-container-column">
              <img
                src="../../assets/img/buy-now-success.png"
                className="buy-now-success-img"
              />
              <p className="buy-now-success-header">Congratulations!</p>
              <p className="buy-now-success-text">
                You are the new owner of this NFT. Thank you for supporting the
                artists of Supernovas - you are the hero the world needs.
              </p>
              {/* (click)="quoteRepost($event)" */}
              <button className="btn blk_line_btn with_ico big buy_now_btn quote_repost_btn">
                Quote repost your NFT
              </button>
              {/* (click)="closeBuyEthSuccess()" */}
              <button className="btn blk_line_btn with_ico big buy_now_btn close_window_btn">
                Close this window
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BuyNowModal;
