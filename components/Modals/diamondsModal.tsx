import styles from "../../styles/Modals/diamondsModal.module.scss";

const DiamondsModal = () => {
  return (
    <div className="diamonds-modal-container">
      <div className="w-100 d-flex justify-content-end border-bottom border-color-grey cursor-pointer text-grey5">
        {/* (click)="bsModalRef.hide()" */}
        <div className="p-15px fs-25px font-weight-bold">&times;</div>
      </div>

      <div className="flex-grow-1">
        {/* #uiScroll *uiScroll="let diamond of datasource" */}
        <div>
          {/* <simple-profile-card
            [profile]="diamond.DiamondSenderProfile"
            [diamondLevel]="diamond.DiamondLevel"
            [containerModalRef]="bsModalRef"
        ></simple-profile-card> */}
        </div>
      </div>

      {/* <simple-center-loader *ngIf="loading"></simple-center-loader> */}
    </div>
  );
};
export default DiamondsModal;
