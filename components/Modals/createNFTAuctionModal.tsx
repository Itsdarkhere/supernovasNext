import { Modal } from "react-bootstrap";
import styles from "../../styles/Modals/createNFTAuctionModal.module.scss";
import ModalHeader from "./modalHeader";

const CreateNFTAuctionModal = () => {
  // *ngIf="!isEthNFT"
  return (
    <>
      <div app-theme className="nft-modal-container puton_sell p-15px">
        {/* *ngIf="stepNum == 1" */}
        <section
          className="d-flex flex-column flex-center"
          style="min-height: 490px"
        >
          <ModalHeader
            header="'Select auction type'"
            bsModalRef="bsModalRef"
          ></ModalHeader>
          <div className="fs-15px nft_para text-center text-grey5">
            This is the format in which your NFT will be sold.
          </div>
          <div className="w-100 mt-20px">
            {/* (click)="selectOpenAuction()"
        [ngClass]="{ 'electric-box-shadow': openAuction }" */}
            <button className="w-100 mt-10px mint-page-auction-selection background-white">
              <div className="background-secondary w-30 h-100 flex-center text-align-center">
                <label className="mb-0px p-5px text-color-1 font-weight-semiboldn fs-14px">
                  OPEN AUCTION
                </label>
              </div>
              <div className="w-70 text-color-1 text-align-start mb-0px pl-10px pr-10px fs-10-responsive">
                An auction without an ending time in which you select the
                winning bid.
              </div>
            </button>
            {/* (click)="selectBuyNow()"
        [ngClass]="{ 'electric-box-shadow': isBuyNow }" */}
            <button className="w-100 mt-10px mint-page-auction-selection background-white">
              <div className="background-secondary w-30 h-100 flex-center text-align-center">
                <label className="mb-0px p-5px text-color-1 font-weight-semiboldn fs-14px">
                  BUY NOW
                </label>
              </div>
              <div className="w-70 text-color-1 text-align-start mb-0px pl-10px pr-10px fs-10-responsive">
                Set a fixed price that your NFT can be immediately sold at.
              </div>
            </button>
          </div>
          {/* (click)="stepTwoDeso()"
      [disabled]="(!isBuyNow && !openAuction) || (isBuyNow && openAuction)" */}
          <button className="pop_singl_btn">Continue</button>
        </section>
        {/* *ngIf="stepNum == 2" */}
        <section
          className="w-100 h-100 d-flex flex-column flex-center"
          style={{ minHeight: "490px" }}
        >
          <ModalHeader
            header="'Choose editions to sell'"
            bsModalRef="bsModalRef"
          ></ModalHeader>
          <div className="last_price_list">
            <div className="head">
              <span className="th">SERIAL NUMBER</span>
              <span className="th">LAST PRICE</span>
            </div>
            <div
              className="list_section disable-scrollbars"
              style={{ maxHeight: "160px" }}
            >
              {/* *ngFor="let nft of mySerialNumbersNotForSale()" */}
              <div className="list_inside">
                {/* [(ngModel)]="selectedSerialNumbers[nft.SerialNumber]" */}
                <input type="checkbox" />
                <div className="ckh_bx">
                  <div className="td_lst">{nft.SerialNumber}</div>
                  <div className="td_lst">
                    {globalVars.nanosToDeSo(nft.LastAcceptedBidAmountNanos)}{" "}
                    DESO
                    <span className="text-grey7">
                      (~{nanosToUSD(nft.LastAcceptedBidAmountNanos, 2)})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* (click)="stepThreeDeso()" [disabled]="createAuctionDisabled()" */}
          <button className="pop_singl_btn">Continue</button>
        </section>
        {/* *ngIf="stepNum == 3" */}
        <section className="w-100 h-100 d-flex flex-column flex-center">
          {/* *ngIf="openAuction; else buyNowElse" */}
          <section className="d-flex flex-column flex-center">
            <ModalHeader
              header="'Set the price'"
              bsModalRef="bsModalRef"
            ></ModalHeader>

            <div className="page-place-a-bid">
              <label className="secondary-heading">Minimum Bid</label>
              <div className="fs-15px nft_para text-grey5">
                Set your minimum price in $DESO that you'd be willing to sell
                your NFT for.
              </div>
              {/* <!-- Pricing --> */}
              <div className="popup-body">
                <div className="input-with-button bid_bg_blk_inp">
                  <div className="plc_bid_inp_wp">
                    {/* [(ngModel)]="minBidAmountDESO"
                (ngModelChange)="updateMinBidAmountUSD($event)"
                [disabled]="creatingAuction" */}
                    <input
                      aria-describedby="usd-label"
                      className="form-control fs-15px text-right d-inline-block"
                      type="number"
                      min="0"
                      placeholder="0.00"
                    />
                    <button className="btn btn-black bid_deso_btn">
                      <i>
                        <img src="assets/icons/dl_lg.svg" alt="" />
                      </i>
                      $DESO
                    </button>
                  </div>
                </div>
              </div>
              <div className="aft_bid_val">{minBidAmountUSD} $</div>
            </div>
            {/* (click)="createAuction()" [disabled]="creatingAuction || createAuctionDisabled()" */}
            <button className="pop_singl_btn">
              {creatingAuction ? "Creating Auction" : "Create auction"}
            </button>
            {/* *ngIf="creatingAuction" */}
            <div className="pl-15px pt-10px fs-15px">
              {auctionCounter} of {auctionTotal} auctions created
            </div>
          </section>
          {/* <ng-template #buyNowElse> */}
          <ModalHeader
            header="'Set the price'"
            bsModalRef="bsModalRef"
          ></ModalHeader>

          <div className="page-place-a-bid">
            <label className="secondary-heading">Buy Now Price</label>
            <div className="fs-15px nft_para text-grey5">
              Set a fixed price that your NFT can be immediately sold at.
            </div>
            {/* <!-- Pricing --> */}
            <div className="popup-body">
              <div className="input-with-button bid_bg_blk_inp">
                <div className="plc_bid_inp_wp">
                  {/* [(ngModel)]="buyNowAmountDESO"
                (ngModelChange)="updateBuyNowAmountUSD($event)"
                [disabled]="creatingAuction" */}
                  <input
                    aria-describedby="usd-label"
                    className="form-control fs-15px text-right d-inline-block"
                    type="number"
                    min="0"
                    placeholder="0.00"
                  />
                  <button className="btn btn-black bid_deso_btn">
                    <i>
                      <img src="assets/icons/dl_lg.svg" alt="" />
                    </i>
                    $DESO
                  </button>
                </div>
              </div>
            </div>
            <div className="aft_bid_val">{buyNowAmountUSD} $</div>

            <div className="d-flex flex-row mt-5px">
              <label className="mb-0px font-weight-semiboldn fs-14-responsive text-align-start ml-5px">
                Add minimum bid
              </label>
              <div className="optional-box">
                <p className="optional-text">OPTIONAL</p>
              </div>
              {/* (click)="handleMinBidClicked()" */}
              <label className="switch">
                <input type="checkbox" id="checkbox-min-bid" />
                <span className="slider round"></span>
              </label>
            </div>

            {/* [ngClass]="{ big: minBidClicked }" */}
            <div className="buy-now-price-accordion disable-scrollbars">
              <div className="popup-body">
                <div className="input-with-button bid_bg_blk_inp">
                  <div className="plc_bid_inp_wp">
                    {/* [(ngModel)]="minBidAmountDESO"
                  (ngModelChange)="updateMinBidAmountUSD($event)"
                  [disabled]="creatingAuction" */}
                    <input
                      aria-describedby="usd-label"
                      className="form-control fs-15px text-right d-inline-block"
                      type="number"
                      min="0"
                      placeholder="0.00"
                    />
                    <button className="btn btn-black bid_deso_btn">
                      <i>
                        <img src="assets/icons/dl_lg.svg" alt="" />
                      </i>
                      $DESO
                    </button>
                  </div>
                </div>
              </div>
              {/* *ngIf="minBidAmountDESO > buyNowAmountDESO; else noErrorElse" */}
              <p className="text-danger ml-5px">
                Minimum bid must be smaller than buy now price...
              </p>
              {/* <ng-template #noErrorElse> */}
              <div className="aft_bid_val">{minBidAmountUSD} $</div>
              {/* </ng-template> */}
            </div>
          </div>
          {/* (click)="createAuction()"
        [disabled]="creatingAuction || createAuctionDisabled() || minBidAmountDESO > buyNowAmountDESO" */}
          <button className="pop_singl_btn">
            {creatingAuction ? "Creating Auction" : "Create auction"}
          </button>
          {/* *ngIf="creatingAuction" */}
          <div className="pl-15px pt-10px fs-15px">
            {auctionCounter} of {auctionTotal} auctions created
          </div>
          {/* </ng-template> */}
        </section>
      </div>

      {/*<!-- eth nft -->
       *ngIf="isEthNFT && !createEthNFTSuccess" */}
      <div app-theme className="nft-modal-container puton_sell p-15px">
        <ModalHeader
          header="'Put for sale'"
          bsModalRef="bsModalRef"
        ></ModalHeader>
        <div className="fs-15px nft_para text-center text-grey5">
          Relist the NFT for sale on Immutable X.
        </div>
        {/* <!-- Pricing --> */}

        <div className="page-place-a-bid">
          <div className="popup-body">
            <div className="input-with-button bid_bg_blk_inp">
              <div className="plc_bid_inp_wp">
                {/* [(ngModel)]="sellingPriceETH"
            (ngModelChange)="updateSellingPriceETH($event)"
            [disabled]="creatingAuction" */}
                <input
                  aria-describedby="usd-label"
                  className="form-control fs-15px text-right d-inline-block"
                  type="number"
                  min="0"
                  placeholder="0.00"
                />
                <button className="btn btn-black bid_deso_btn">
                  <i>
                    <img
                      src="assets/eth/ethlogo-white.svg"
                      className="ethlogo-white"
                      alt=""
                    />
                  </i>
                  ETH
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column align-items-center">
          {/* (click)="sellEthNFT()" */}
          <button className="pop_singl_btn sellEthNFTButton">
            Sell your NFT
          </button>
        </div>
      </div>

      {/* *ngIf="isEthNFT && createEthNFTSuccess" */}
      <div app-theme className="nft-modal-container puton_sell p-15px">
        <div className="flex-container-column">
          <img
            src="../../assets/img/buy-now-success.png"
            className="buy-now-success-img"
          />
          <p className="buy-now-success-header">Congratulations!</p>
          <p className="buy-now-success-text">
            You have put your Ethereum NFT up for sale
          </p>
          {/* (click)="closeEthSaleSuccess()" */}
          <button className="btn blk_line_btn with_ico big buy_now_btn close_window_btn">
            Close this window
          </button>
        </div>
      </div>
    </>
  );
};
export default CreateNFTAuctionModal;
