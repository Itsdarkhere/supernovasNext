import styles from "../../styles/Modals/repostsModal.module.scss";

const RepostsModal = () => {
  return (
    <div className="reposts-modal-container">
      <div className="w-100 d-flex justify-content-end border-bottom border-color-grey cursor-pointer text-grey5">
        {/* (click)="bsModalRef.hide()" */}
        <div className="p-15px fs-25px font-weight-bold">&times;</div>
      </div>

      <div className="flex-grow-1">
        {/* #uiScroll *uiScroll="let profile of datasource" */}
        <div>
          {/* <simple-profile-card
         [profile]="profile"
         [showRepostIcon]="true"
         [containerModalRef]="bsModalRef"
       ></simple-profile-card> */}
        </div>
      </div>

      {/*<simple-center-loader *ngIf="loading"></simple-center-loader> */}
    </div>
  );
};
export default RepostsModal;
