import styles from "../../styles/Modals/cancelETHAuctionModal.module.scss";
import buyNowSuccessIcon from "../../public/img/buy-now-success.png";
import Image from "next/image";
const CancelETHAuctionModal = () => {
  // *ngIf="!cancelEthNFTSuccess"
  return (
    <>
      <div app-theme className="nft-modal-container puton_sell p-15px">
        <ModalHeader
          header="'Cancel your sale'"
          bsModalRef="bsModalRef"
        ></ModalHeader>
        <div className="fs-15px nft_para text-center text-grey5">
          Cancel your sale on Immutable X.
        </div>

        <div className="d-flex flex-column align-items-center">
          {/* (click)="cancelEthNFT()" */}
          <button className="pop_singl_btn cancelEthNFTButton">
            Cancel your sale
          </button>
        </div>

        {/* <simple-center-loader *ngIf="loading"></simple-center-loader> */}
      </div>

      {/* *ngIf="cancelEthNFTSuccess" */}
      <div app-theme className="nft-modal-container puton_sell p-15px">
        <div className="flex-container-column">
          <Image
            src={buyNowSuccessIcon}
            alt="buy now success icon"
            className="cancel-success-img"
          />
          <p className="cancel-success-header">Congratulations!</p>
          <p className="cancel-success-text">
            You cancelled the sale of your NFT on Immutable X.
          </p>
          {/* (click)="cancelEthSaleSuccess()" */}
          <button className="btn blk_line_btn with_ico big buy_now_btn close_window_btn">
            Close this window
          </button>
        </div>
      </div>
    </>
  );
};
export default CancelETHAuctionModal;
