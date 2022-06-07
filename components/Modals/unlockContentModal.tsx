import styles from "../../styles/Modals/unlockContentModal.module.scss";

const UnlockContentModal = () => {
  return (
    <div app-theme className="nft-modal-container gray_bg p-15px">
      <div className="bid-popup-wrapper">
        <h3 className="bid-title">Unlockable Content</h3>
        {/* (click)="bsModalRef.hide()" */}
        <div className="fs-25px lh-20px close_btn unlockable_pop_close cursor-pointer pr-15px">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.528606 0.528598C0.788955 0.268248 1.21107 0.268248 1.47141 0.528598L5.00001 4.05719L8.52861 0.528598C8.78895 0.268248 9.21106 0.268248 9.47141 0.528598C9.73176 0.788948 9.73176 1.21106 9.47141 1.47141L5.94282 5L9.47141 8.5286C9.73176 8.78895 9.73176 9.21106 9.47141 9.47141C9.21106 9.73176 8.78895 9.73176 8.52861 9.47141L5.00001 5.94281L1.47141 9.47141C1.21107 9.73176 0.788955 9.73176 0.528606 9.47141C0.268256 9.21106 0.268256 8.78895 0.528606 8.5286L4.0572 5L0.528606 1.47141C0.268256 1.21106 0.268256 0.788948 0.528606 0.528598Z"
              fill="#858585"
            />
          </svg>
        </div>
        <div className="unlockable_content_popwrp">
          {/* *ngFor="let nftEntry of decryptableNFTEntryResponses" */}
          <div className="d-flex link_list_sc flex-row">
            <div className="num">#{nftEntry.SerialNumber} :</div>
            {/* [innerHTML]="nftEntry.DecryptedUnlockableText | sanitizeAndAutoLink" */}
            <div className="ln_val"></div>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          {/* (click)="closeThisWindow()" */}
          <button type="button" className="btn pop_singl_btn nft_place_bid_btn">
            Close window
          </button>
        </div>
      </div>
    </div>
  );
};
export default UnlockContentModal;
