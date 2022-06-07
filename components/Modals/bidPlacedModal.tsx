import styles from "../../styles/Modals/bidPlacedModal.module.scss";
import verificationGradientIcon from "../../public/icons/Verification_Gradient.svg";
import Image from "next/image";

const BidPlacedModal = () => {
  return (
    <div app-theme className="nft-modal-container p-15px">
      <div className="bid-popup-wrapper">
        <figure>
          <Image
            src={verificationGradientIcon}
            alt="verification gradient Icon"
          />
        </figure>
        <h3 className="bid-title">Your bid is placed!</h3>
        <p className="bid-description">
          The auction will end when
          <br />
          the creator sells this NFT.
        </p>
        <div className="btn-group">
          {/* (click)="viewBids()" */}
          <button type="button" className="view-your-bid">
            View your bids
          </button>
          {/* (click)="hideAndRefresh()" */}
          <button type="button" className="close-popup">
            Close this window
          </button>
        </div>
      </div>
    </div>
  );
};
export default BidPlacedModal;
