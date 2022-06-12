import styles from "../../styles/Modals/repostsModal.module.scss";
import SimpleProfileCard from "../Reusables/simpleProfileCard";

const RepostsModal = () => {
  return (
    <div className="reposts-modal-container">
      <div className="w-100 d-flex justify-content-end border-bottom border-color-grey cursor-pointer text-grey5">
        <div
          onClick={() => bsModalRef.hide()}
          className="p-15px fs-25px font-weight-bold"
        >
          &times;
        </div>
      </div>

      <div className="flex-grow-1">
        {/* #uiScroll *uiScroll="let profile of datasource" */}
        <div>
          <SimpleProfileCard
            profile={profile}
            showRepostIcon={true}
            containerModalRef={bsModalRef}
          ></SimpleProfileCard>
        </div>
      </div>

      {/*<simple-center-loader *ngIf="loading"></simple-center-loader> */}
    </div>
  );
};
export default RepostsModal;
