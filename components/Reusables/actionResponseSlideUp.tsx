import styles from "../../styles/Reusables/actionResponseSlideUp.module.scss";

const ActionResponseSlideUp = () => {
  return (
    <div>
      {/* [@leftBarAnimation]  */}
      {/* *ngIf="isOpen" */}
      <div className="action-response-slideup">
        <div>
          <h2>{headingText}</h2>
          <label className="mb-0px">{mainText}</label>
        </div>
        <div className="action-response-buttons-container d-flex flex-column w-90">
          {/* (click)="dissmissReasonOne()" */}
          <button className="black-rounded-button action-response-black-button br-37px w-100">
            {buttonOneText}
          </button>
          {/* (click)="dissmissReasonTwo()" */}
          <button className="white-rounded-button action-response-white-button br-37px w-100">
            Close this window
          </button>
        </div>
      </div>
      {/* *ngIf="isOpen"
    [@translucentBackgroundAnimation]
    (click)="dissmissReasonTwo()" */}
      <div className="left-bar-mobile__translucent-background"></div>
    </div>
  );
};
export default ActionResponseSlideUp;
