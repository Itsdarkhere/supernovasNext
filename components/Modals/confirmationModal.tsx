import styles from "../../styles/Modals/confirmationModal.module.scss";
import ModalHeader from "./modalHeader";

const ConfirmationModal = () => {
  return (
    <div app-theme className="nft-modal-container p-15px">
      <ModalHeader header="title" bsModalRef="bsModalRef"></ModalHeader>
      <div className="py-15px para_txt">{text}</div>
      <div className="d-flex flex-column align-items-center py-15px">
        <button onClick={() => confirm()} disabled={closingAuction} className="btn fs-15px close_acution_btn br-12px">
          {buttonText}
        </button>
      </div>
    </div>
  );
};
export default ConfirmationModal;
