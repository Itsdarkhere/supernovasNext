import styles from "../../styles/Modals/actionResponseModal.module.scss";

const ActionResponseModal = () => {
  return (
    <div className="nft-modal-container position-relative d-flex flex-center justify-content-between">
      <div>
        <h2>{headingText}</h2>
        <label className="mb-0px">{mainText}</label>
      </div>
      <div className="action-response-buttons-container d-flex flex-column w-90">
        <button onClick={() => dissmissReasonOne()} className="black-rounded-button action-response-black-button w-100">
          { buttonOneText }
        </button>
        <button onClick={() => dissmissReasonTwo()} className="white-rounded-button action-response-white-button w-100">
          Close this window
        </button>
      </div>
    </div>
  );
};
export default ActionResponseModal;
