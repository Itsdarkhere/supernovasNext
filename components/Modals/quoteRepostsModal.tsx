import { ModalHeader } from "react-bootstrap";
import styles from "../../styles/Modals/quoteRepostsModal.module.scss";
import BlueInputComponent from "../Reusables/blueInputComponent";
import NotEnoughCrypto from "../Reusables/notEnoughCrypto";
import ETHBalanceSection from "./ethBalanceSection";

const QuoteRepostsModal = () => {
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
        {!loading ? (
          <div>
            {serialNumber ? (
              <div>
                <div
                  className={[
                    "page-place-a-bid",
                    isSelectingSerialNumber ? "d-none" : "",
                  ].join(" ")}
                >
                  <div className="popup-body">
                    <section className="plb-grey-box">
                      <div className="d-flex flex-row justify-content-between px-15px py-15px w-100">
                        <div className="highb-col">
                          <label className="txt-lbl">MINIMUM BID</label>
                          <label className="var-lbl fs-24px">
                            {nanosToDeSo(minBid, 2)} DESO
                          </label>
                        </div>
                      </div>
                      <BlueInputComponent
                        model={bidAmountDESO}
                        modelChange={(e) => updateBidAmountUSD(e)}
                        disabled={placingBids}
                      ></BlueInputComponent>
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
                    <button
                      onClick={() => placeBid()}
                      disabled={placingBids || canIAffordNFT() || cantBid()}
                      className="blk_line_btn with_ico big black-rounded-button mt-20px-important"
                    >
                      {placingBids ? "Placing Bids" : "Place Bid"}
                    </button>
                  </div>
                  {canIAffordNFT() ? <NotEnoughCrypto></NotEnoughCrypto> : null}
                </div>
              </div>
            ) : null}

            {!serialNumber ? (
              <div>
                <div
                  className={[
                    "fs-15px nft_para text-center text-grey5",
                    !isSelectingSerialNumber ? "d-none" : "",
                  ].join(" ")}
                >
                  An NFT can have multiple editions, each with its own unique
                  serial number.
                </div>
                <div className="container border-2 border-radius-10 fs-15px px-0px">
                  <div
                    className="row no-gutters py-15px create-nft-auction-row-border heads"
                    style={{ opacity: "50%" }}
                  >
                    <div className="col-4 txt text-align-center">
                      <span className="pl-15px">Serial Number</span>
                    </div>
                    <div className="col-5 txt mb-0px text-left">
                      Min Bid Amount
                    </div>
                    <div className="col-3 txt mb-0px text-align-left">
                      Highest Bid
                    </div>
                  </div>
                  <div
                    style="max-height: 250px; min-height: 250px; overflow-y: scroll"
                    className=""
                  >
                    {/* #uiScroll
                     *uiScroll="let nft of datasource" */}
                    <div
                      onClick={() => selectSerialNumber(nft.SerialNumber)}
                      className="row no-gutters nft_bid_tb_details background-color-white p-10px mb-0px create-nft-auction-row-border cursor-pointer"
                    >
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
            ) : null}

            {!biddableSerialNumbers?.length ? (
              <div className="fs-15px text-center">
                <p>There are no serial numbers available for you to bid on.</p>
                <p>{availableSerialNumbers}</p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default QuoteRepostsModal;
