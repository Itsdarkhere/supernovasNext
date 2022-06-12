import { Modal } from "react-bootstrap";
import styles from "../../styles/Modals/createNFTAuctionModal.module.scss";
import ModalHeader from "./modalHeader";

const CreateNFTAuctionModal = () => {
  return (
    <>
      {!isEthNFT ? (
        <div app-theme className="nft-modal-container puton_sell p-15px">
          {stepNum == 1 ? (
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
                <button
                  onClick={() => selectOpenAuction()}
                  className={[
                    "w-100 mt-10px mint-page-auction-selection background-white",
                    openAuction ? "electric-box-shadow" : "",
                  ].join(" ")}
                >
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
                <button
                  onClick={() => selectBuyNow()}
                  className={[
                    "w-100 mt-10px mint-page-auction-selection background-white",
                    isBuyNow ? "electric-box-shadow" : "",
                  ].join(" ")}
                >
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
              <button
                onClick={() => stepTwoDeso()}
                disabled={
                  (!isBuyNow && !openAuction) || (isBuyNow && openAuction)
                }
                className="pop_singl_btn"
              >
                Continue
              </button>
            </section>
          ) : null}

          {stepNum == 2 ? (
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
                  {mySerialNumbersNotForSale().map((nft, index) => (
                    <div key={index} className="list_inside">
                      <input
                        value={selectedSerialNumbers[nft.SerialNumber]}
                        type="checkbox"
                      />
                      <div className="ckh_bx">
                        <div className="td_lst">{nft.SerialNumber}</div>
                        <div className="td_lst">
                          {globalVars.nanosToDeSo(
                            nft.LastAcceptedBidAmountNanos
                          )}{" "}
                          DESO
                          <span className="text-grey7">
                            (~{nanosToUSD(nft.LastAcceptedBidAmountNanos, 2)})
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => stepThreeDeso()}
                disabled={createAuctionDisabled()}
                className="pop_singl_btn"
              >
                Continue
              </button>
            </section>
          ) : null}
          {stepNum == 3 ? (
            <section className="w-100 h-100 d-flex flex-column flex-center">
              {openAuction ? (
                <section className="d-flex flex-column flex-center">
                  <ModalHeader
                    header="Set the price"
                    bsModalRef={bsModalRef}
                  ></ModalHeader>

                  <div className="page-place-a-bid">
                    <label className="secondary-heading">Minimum Bid</label>
                    <div className="fs-15px nft_para text-grey5">
                      Set your minimum price in $DESO that you'd be willing to
                      sell your NFT for.
                    </div>
                    {/* <!-- Pricing --> */}
                    <div className="popup-body">
                      <div className="input-with-button bid_bg_blk_inp">
                        <div className="plc_bid_inp_wp">
                          <input
                            value={minBidAmountDESO}
                            onChange={(e) => updateMinBidAmountUSD(e)}
                            disabled={creatingAuction}
                            aria-describedby="usd-label"
                            className="form-control fs-15px text-right d-inline-block"
                            type="number"
                            min={0}
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
                  <button
                    onClick={() => createAuction()}
                    disabled={creatingAuction || createAuctionDisabled()}
                    className="pop_singl_btn"
                  >
                    {creatingAuction ? "Creating Auction" : "Create auction"}
                  </button>
                  {creatingAuction ? (
                    <div className="pl-15px pt-10px fs-15px">
                      {auctionCounter} of {auctionTotal} auctions created
                    </div>
                  ) : null}
                </section>
              ) : (
                <>
                  <ModalHeader
                    header="Set the price"
                    bsModalRef={bsModalRef}
                  ></ModalHeader>

                  <div className="page-place-a-bid">
                    <label className="secondary-heading">Buy Now Price</label>
                    <div className="fs-15px nft_para text-grey5">
                      Set a fixed price that your NFT can be immediately sold
                      at.
                    </div>
                    {/* <!-- Pricing --> */}
                    <div className="popup-body">
                      <div className="input-with-button bid_bg_blk_inp">
                        <div className="plc_bid_inp_wp">
                          <input
                            value={buyNowAmountDESO}
                            onChange={(e) => updateBuyNowAmountUSD(e)}
                            disabled={creatingAuction}
                            aria-describedby="usd-label"
                            className="form-control fs-15px text-right d-inline-block"
                            type="number"
                            min={0}
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
                      <label
                        onClick={() => handleMinBidClicked()}
                        className="switch"
                      >
                        <input type="checkbox" id="checkbox-min-bid" />
                        <span className="slider round"></span>
                      </label>
                    </div>

                    <div
                      className={[
                        "buy-now-price-accordion disable-scrollbars",
                        minBidClicked ? "big" : "",
                      ].join(" ")}
                    >
                      <div className="popup-body">
                        <div className="input-with-button bid_bg_blk_inp">
                          <div className="plc_bid_inp_wp">
                            <input
                              value={minBidAmountDESO}
                              onChange={(e) => updateMinBidAmountUSD(e)}
                              disabled={creatingAuction}
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
                      {minBidAmountDESO > buyNowAmountDESO ? (
                        <p className="text-danger ml-5px">
                          Minimum bid must be smaller than buy now price...
                        </p>
                      ) : (
                        <div className="aft_bid_val">{minBidAmountUSD} $</div>
                      )}
                    </div>
                  </div>
                  <button
                    disabled={
                      creatingAuction ||
                      createAuctionDisabled() ||
                      minBidAmountDESO > buyNowAmountDESO
                    }
                    onClick={() => createAuction()}
                    className="pop_singl_btn"
                  >
                    {creatingAuction ? "Creating Auction" : "Create auction"}
                  </button>
                  {creatingAuction ? (
                    <div className="pl-15px pt-10px fs-15px">
                      {auctionCounter} of {auctionTotal} auctions created
                    </div>
                  ) : null}
                </>
              )}
            </section>
          ) : null}
        </div>
      ) : null}

      {/*<!-- eth nft -->*/}
      {isEthNFT && !createEthNFTSuccess ? (
        <div app-theme className="nft-modal-container puton_sell p-15px">
          <ModalHeader
            header="Put for sale"
            bsModalRef={bsModalRef}
          ></ModalHeader>
          <div className="fs-15px nft_para text-center text-grey5">
            Relist the NFT for sale on Immutable X.
          </div>
          {/* <!-- Pricing --> */}

          <div className="page-place-a-bid">
            <div className="popup-body">
              <div className="input-with-button bid_bg_blk_inp">
                <div className="plc_bid_inp_wp">
                  <input
                    value={sellingPriceETH}
                    onChange={(e) => updateSellingPriceETH(e)}
                    disabled={creatingAuction}
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
            <button
              onClick={() => sellEthNFT()}
              className="pop_singl_btn sellEthNFTButton"
            >
              Sell your NFT
            </button>
          </div>
        </div>
      ) : null}

      {isEthNFT && createEthNFTSuccess ? (
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
            <button
              onClick={() => closeEthSaleSuccess()}
              className="btn blk_line_btn with_ico big buy_now_btn close_window_btn"
            >
              Close this window
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default CreateNFTAuctionModal;
