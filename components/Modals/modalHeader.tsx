import styles from "../../styles/Modals/modalHeader.module.scss";
import lightningIcon from "../../public/img/buy-now-lightning-black.png";
import Image from "next/image";
const ModalHeader = () => {
  return (
    <div className="w-100 d-flex nft_bid_header justify-content-between py-15px">
      {/* *ngIf="!this.isBuyNow" */}
      <div className="fs-20px head_txt lh-20px d-flex align-items-center font-weight-500">
        { header }
      </div>
      {/* *ngIf="isBuyNow && clickedBuyNow" */}
      <div className="buy-now-header-container">
        <Image
          src={lightningIcon}
          className="buy-now-lightning-black-img"
          alt="lightning icon"
        />
        <p className="buy-now-modal-header">Buy Now</p>
      </div>
      {/* *ngIf="isBuyNow && clickedPlaceABid" */}
      <div className="buy-now-header-container">
        <p className="buy-now-modal-header">Place a Bid</p>
      </div>
      {/* (click)="bsModalRef.hide()" */}
      <div className="fs-25px lh-20px close_btn cursor-pointer pr-15px">
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
    </div>
  );
};
export default ModalHeader;
