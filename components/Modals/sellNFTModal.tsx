import styles from "../../styles/Modals/sellNFTModal.module.scss";
import Avatar from "../Reusables/avatar";
import ModalHeader from "./modalHeader";

const SellNFTModal = () => {
  return (
    <div app-theme className="nft-modal-container p-15px">
      {sellNFTStep === 1 ? (
        <div className="d-flex flex-column flex-center">
          <ModalHeader
            header="'Select the winning bid'"
            bsModalRef="bsModalRef"
          ></ModalHeader>
          <div className="nft_selling_avatar_del color-light">
            Select the bid you want to accept.
          </div>
          <div className="select-winning-bid-box mb-20px">
            <div className="table-head w-100 d-flex flex-center-start flex-row border-bottom">
              <p className="fs-14px font-weight-semiboldn color-light text-align-left pl-20px">
                COLLECTOR
              </p>
              <p className="fs-14px font-weight-semiboldn color-light text-align-left pl-20px">
                SERIALNUMBER
              </p>
              <p className="fs-14px font-weight-semiboldn color-light text-align-left pl-20px">
                BID
              </p>
            </div>
            <div className="modal-bids-container d-flex flex-start">
              {selectedBidEntries.map((bid, index) => (
                <button
                  key={index}
                  onClick={() => selectBidEntry(bid)}
                  className={[
                    "p-0px hover-background-secalt",
                    bid.selected ? "selected" : "",
                  ].join(" ")}
                >
                  <span className="d-flex flex-row align-items-center pl-20px">
                    <div className="bid__avatar__avatar-container">
                      <Avatar
                        avatar={bid.PublicKeyBase58Check}
                        classN="bid__avatar br-30px"
                      ></Avatar>
                    </div>
                    <div className="text-truncate holdings__name pl-10px fs-14px">
                      <div className="d-flex">
                        {/*
                [style.pointer-events]="!!bid.ProfileEntryResponse?.Username ? 'auto' : 'none'" */}
                        <div
                          className={[
                            "fc-default font-weight-bold text-truncate fs-14px",
                            !!bid.ProfileEntryResponse?.Username
                              ? "cursor-pointer"
                              : "",
                          ].join(" ")}
                          style={{ maxWidth: "120px" }}
                        >
                          @{bid.ProfileEntryResponse?.Username}
                        </div>
                        {/*[matTooltip]="'This account is verified'"
                #tooltip="matTooltip" */}
                        {bid.ProfileEntryResponse?.IsVerified ? (
                          <span
                            onClick={() => tooltip.toggle()}
                            className="ml-1 mb-1 cursor-pointer text-primary"
                            matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
                          >
                            <i className="fas fa-check-circle fa-md align-middle"></i>
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </span>
                  <span className="text-align-start fs-14px pl-20px font-weight-bold">
                    {bid.SerialNumber}
                  </span>
                  <span className="text-align-start fs-14px pl-20px font-weight-bold">
                    {nanosToDeSo(bid.BidAmountNanos, 5)} $DESO
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="d-flex align-items-center mb-15px">
            <button
              onClick={() => nextStep()}
              disabled={!bidSelected}
              className="btn pop_singl_btn"
            >
              Continue
            </button>
          </div>
        </div>
      ) : null}

      {sellNFTStep === 2 ? (
        <div>
          <ModalHeader
            header="Sell your NFT"
            bsModalRef={bsModalRef}
          ></ModalHeader>
          <div className="bid_pop_details_ls sell_nft_bx">
            <div className="sl_prc">
              <span className="lb">Sales price</span>
              <div className="val">
                {abbreviateNumber(sellingPrice, 3)} $DESO
                <div className="text-grey7 d-lg-inline-block fs-18px d-block">
                  (~{nanosToUSD(sellingPrice * 1e9, 2)})
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <div className="lst">
              <span className="lb">Creator Royalty</span>
              <span className="val">
                {post.NFTRoyaltyToCreatorBasisPoints / 100} %
              </span>
            </div>
            <div className="lst">
              <span className="lb">Coin Holder Royalty</span>
              <span className="val">
                {post.NFTRoyaltyToCoinBasisPoints / 100} %
              </span>
            </div>
            <div className="lst">
              <span className="lb">Blockchain fee</span>
              <span className="val">0.001 $DESO</span>
            </div>
            <div className="lst">
              <span className="lb">Supernovas service fee</span>
              <span className="val">0.00 $DESO</span>
            </div>
            <div className="divider"></div>
            <div className="rcv_pric">
              <span className="lb">You’ll receive</span>
              <div className="val">
                {abbreviateNumber(earnings, 3)} $DESO
                <div className="text-grey7 d-lg-inline-block d-block">
                  (~{nanosToUSD(earnings * 1e9, 2)})
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center mb-15px">
            <button
              onClick={() => sellNFT()}
              disabled={sellNFTDisabled || !selectedBidEntries?.length}
              className="btn pop_singl_btn"
            >
              {sellingNFT ? "Selling NFTs" : "Sell"}
            </button>
            {sellingNFT ? (
              <div className="pl-15px fs-15px">
                {sellNFTCounter} of {sellNFTTotal} sold
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {!selectedBidEntries?.length ? (
        <div>You must select at least one bid in order to sell this NFT.</div>
      ) : null}
    </div>
  );
};

export default SellNFTModal;
