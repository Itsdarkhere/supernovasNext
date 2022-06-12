import styles from "../../styles/Modals/addUnlockableModal.module.scss";
import ModalHeader from "./modalHeader";

const AddUnlockableModal = () => {
  return (
    <div app-theme className="nft-modal-container p-15px">
      <ModalHeader
        header="Add unlockable content"
        bsModalRef="bsModalRef"
      ></ModalHeader>

      <div className="fs-15px pt-15px pb-30px text-center text-grey5">
        This NFT includes unlockable content. Enter it below.
      </div>
      {/*
    #autosize="cdkTextareaAutosize" 
    cdkAutosizeMinRows="5"
        cdkTextareaAutosize
        */}
      <textarea
        value={unlockableText}
        className="fs-15px lh-18px br-8px form-control mb-30px unlockable_content_popwrp textarea_min_ht"
        style={{ width: "100%", padding: "10px" }}
        placeholder="Enter URL, code to redeem, link, etc... "
      ></textarea>

      <div className="d-flex align-items-center mb-15px">
        <button
          onClick={() => sellNFT()}
          disabled={addDisabled}
          className="pop_singl_btn"
        >
          {sellingNFT ? "Selling NFTs" : "Add"}
        </button>
        {sellingNFT ? (
          <div className="pl-15px">
            {sellNFTCounter} of {sellNFTTotal} sold
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default AddUnlockableModal;
