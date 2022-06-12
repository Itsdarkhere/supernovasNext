import styles from "../../styles/Modals/closeNFTAuctionModal.module.scss";
import ModalHeader from "./modalHeader";

const CloseNFTAuctionModal = () => {
  return (
    <div app-theme className="nft-modal-container p-15px">
      <ModalHeader
        header="Close auction"
        bsModalRef={bsModalRef}
      ></ModalHeader>
      <div className="py-15px para_txt">
        You are going to close your auction. It will cancel all bids on your NFT
        and prevent new bids from being submitted.
      </div>
      <div className="d-flex flex-column align-items-center py-15px">
        <button
          onClick={() => closeAuction()}
          disabled={closingAuction}
          className="btn fs-15px close_acution_btn br-12px"
        >
          {closingAuction ? "Closing auctions" : "Close auctions"}
        </button>
        {closingAuction ? (
          <div className="pl-15px pt-10px fs-15px">
            {auctionCounter} of {auctionTotal} closed
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CloseNFTAuctionModal;
