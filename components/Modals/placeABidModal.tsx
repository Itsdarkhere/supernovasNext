import { ModalHeader } from "react-bootstrap";
import styles from "../../styles/Modals/placeABidModal.module.scss";
import ETHBalanceSection from "./ethBalanceSection";

const PlaceABidModal = () => {
  return (
    <div app-theme className="nft-modal-container disable-scrollbars p-15px">
      <div className="w-100 my-auto">
        <ModalHeader
          header="'Place your bid'"
          clickedPlaceABid="clickedPlaceABid"
          isBuyNow="isBuyNow"
          bsModalRef="bsModalRef"
        ></ModalHeader>

        {/* <simple-center-loader *ngIf="loading"></simple-center-loader> */}
        {/* *ngIf="!loading" */}
        <div>
          {/* *ngIf="serialNumber" [ngClass]="{ 'd-none': isSelectingSerialNumber }" */}
          <div>
            <div className="page-place-a-bid">
              <div className="popup-body">
                <section className="plb-grey-box">
                  <div className="d-flex flex-row justify-content-between px-15px py-15px w-100">
                    <div className="highb-col">
                      <label className="txt-lbl">MINIMUM BID</label>
                      <label className="var-lbl fs-24px">
                        {globalVars.nanosToDeSo(minBid, 2)} DESO
                      </label>
                    </div>
                  </div>
                  {/* <app-blue-input
                [model]="bidAmountDESO"
                (modelChange)="updateBidAmountUSD($event)"
                [disabled]="placingBids"
              ></app-blue-input> */}
                </section>

                <div className="bid_amt py-10px d-flex flex-center-start">
                  <span>{bidAmountUSD}$</span>
                </div>

                <ETHBalanceSection blockchainDeso="true"></ETHBalanceSection>

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
              </div>
              <div className="popup-footer">
                {/* (click)="placeBid()"
              [disabled]="placingBids || canIAffordNFT() || cantBid()" */}
                <button className="blk_line_btn with_ico big black-rounded-button mt-20px-important">
                  {placingBids ? "Placing Bids" : "Place Bid"}
                </button>
              </div>
              {/* <app-not-enough-crypto *ngIf="canIAffordNFT()"></app-not-enough-crypto> */}
            </div>
          </div>
          {/* *ngIf="!serialNumber" [ngClass]="{ 'd-none': !isSelectingSerialNumber }" */}
          <div>
            <div className="fs-15px nft_para text-center text-grey5">
              An NFT can have multiple editions, each with its own unique serial
              number.
            </div>
            <div className="container border-2 border-radius-10 fs-15px px-0px">
              <div
                className="row no-gutters py-15px create-nft-auction-row-border heads"
                style={{ opacity: "50%" }}
              >
                <div className="col-4 txt text-align-center">
                  <span className="pl-15px">Serial Number</span>
                </div>
                <div className="col-5 txt mb-0px text-left">Min Bid Amount</div>
                <div className="col-3 txt mb-0px text-align-left">
                  Highest Bid
                </div>
              </div>
              <div
                style="max-height: 250px; min-height: 250px; overflow-y: scroll"
                class=""
              >
                {/* #uiScroll
              *uiScroll="let nft of datasource"
              (click)="selectSerialNumber(nft.SerialNumber)" */}
                <div className="row no-gutters nft_bid_tb_details background-color-white p-10px mb-0px create-nft-auction-row-border cursor-pointer">
                  <div className="col-4 pl-15px mb-0px d-flex align-items-center">
                    <span className="lh-15px pl-15px txt bd">
                      {nft.SerialNumber}
                    </span>
                  </div>
                  <div className="col-5 mb-0px d-flex justify-content-start align-items-center">
                    <div className="d-flex justify-content-around flex-wrap text-left">
                      <div className="d-lg-inline-block txt d-block w-100">
                        {nanosToDeSo(nft.MinBidAmountNanos)} DESO
                      </div>
                      <div className="text-grey7 txt bd d-lg-inline-block d-block w-100">
                        (~{nanosToUSD(nft.MinBidAmountNanos, 2)})
                      </div>
                    </div>
                  </div>
                  <div className="col-3 mb-0px d-flex justify-content-start align-items-center">
                    <div className="d-flex justify-content-around flex-wrap align-items-center">
                      <div className="d-lg-inline-block txt d-block text-left w-100">
                        {nanosToDeSo(nft.HighestBidAmountNanos)} DESO
                      </div>
                      <div className="text-grey7 txt text-left bd d-lg-inline-block d-block w-100">
                        (~{nanosToUSD(nft.HighestBidAmountNanos, 2)})
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* *ngIf="!biddableSerialNumbers?.length" */}
          <div className="fs-15px text-center">
            <p>There are no serial numbers available for you to bid on.</p>
            <p>{this.availableSerialNumbers}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlaceABidModal;
