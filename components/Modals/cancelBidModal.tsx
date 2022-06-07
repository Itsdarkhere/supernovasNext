import styles from "../../styles/Modals/cancelBidModal.module.scss";
import ModalHeader from "./modalHeader";

const CancelBidModal = () => {
  return (
    <div app-theme className="nft-modal-container p-15px">
      <ModalHeader
        header="'Cancel a bid'"
        bsModalRef="bsModalRef"
      ></ModalHeader>
      {/* *ngIf="bidEntryResponses?.length" */}
      <div>
        <div className="fs-15px nft_para text-center text-grey5">
          This is a list of your previously selected bids. Please choose
          carefully the bid you want to cancel.
        </div>
        <div className="container border-2 border-radius-10 fs-15px px-0px">
          <div
            className="row no-gutters py-15px create-nft-auction-row-border heads"
            style="opacity: 50%"
          >
            <div className="col-6 txt">
              <span className="pl-15px">Serial Number</span>
            </div>
            <div className="col-6 txt">Placed Bids</div>
          </div>
          <div
            className="bid_cell"
            style="max-height: 250px; min-height: 250px"
          >
            {/* [ngClass]="{ selected_bid: bid?.selected }"
          *ngFor="let bid of bidEntryResponses" 
          (click)="selectSerialNumber(bid)"*/}
            <div className="row no-gutters nft_bid_tb_details background-color-white p-10px mb-0px create-nft-auction-row-border cursor-pointer">
              <div className="col-6 pl-15px mb-0px d-flex align-items-center">
                <span className="lh-15px pl-15px txt bd">
                  {bid?.SerialNumber}
                </span>
              </div>
              <div className="col-6 mb-0px d-flex justify-content-start align-items-center">
                <div className="d-flex justify-content-around flex-wrap align-items-center">
                  <div className="d-lg-inline-block txt d-block text-left w-100">
                    {globalVars.nanosToDeSo(bid?.BidAmountNanos)} DESO
                  </div>
                  <div className="text-grey7 txt text-left bd d-lg-inline-block d-block w-100">
                    (~{globalVars.nanosToUSD(bid?.BidAmountNanos, 2)})
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* (click)="cancelBid()" *ngIf="checkIfBidWasSelected()" */}
      <button className="btn nft_cancel">Cancel your bid</button>
    </div>
  );
};
export default CancelBidModal;
