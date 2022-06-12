import styles from "../../styles/Reusables/actionResponseSlideUp.module.scss";

const ActionResponseSlideUp = () => {
  return (
    <div>
      {/* [@leftBarAnimation]  */}
      {isOpen ? (
        <div className="action-response-slideup">
          <div>
            <h2>{headingText}</h2>
            <label className="mb-0px">{mainText}</label>
          </div>
          <div className="action-response-buttons-container d-flex flex-column w-90">
            <button
              onClick={() => dissmissReasonOne()}
              className="black-rounded-button action-response-black-button br-37px w-100"
            >
              {buttonOneText}
            </button>
            <button
              onClick={() => dissmissReasonTwo()}
              className="white-rounded-button action-response-white-button br-37px w-100"
            >
              Close this window
            </button>
          </div>
        </div>
      ) : null}
      {/*[@translucentBackgroundAnimation]*/}
      {isOpen ? (
        <div
          onClick={() => dissmissReasonTwo()}
          className="left-bar-mobile__translucent-background"
        ></div>
      ) : null}
    </div>
  );
};
export default ActionResponseSlideUp;
