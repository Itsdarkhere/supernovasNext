import styles from "../../styles/Modals/diamondsModal.module.scss";
import SimpleProfileCard from "../Reusables/simpleProfileCard";

const DiamondsModal = () => {
  return (
    <div className="diamonds-modal-container">
      <div className="w-100 d-flex justify-content-end border-bottom border-color-grey cursor-pointer text-grey5">
        <div onClick={() => bsModalRef.hide()} className="p-15px fs-25px font-weight-bold">&times;</div>
      </div>

      <div className="flex-grow-1">
        {/* #uiScroll *uiScroll="let diamond of datasource" */}
        <div>
          <SimpleProfileCard
            profile={diamond.DiamondSenderProfile}
            diamondLevel={diamond.DiamondLevel}
            containerModalRef={bsModalRef}
        ></SimpleProfileCard>
        </div>
      </div>

      {/* <simple-center-loader *ngIf="loading"></simple-center-loader> */}
    </div>
  );
};
export default DiamondsModal;
