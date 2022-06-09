import styles from "../../styles/UpdateProfile/updateProfileGetDeso.module.scss";

const UpdateProfileGetDeso = () => {
  return (
    <>
      {/* *ngIf="globalVars.isMobile()" */}
      <div className="fs-15px mt-15px finalize-profile-box">
        <div>
          <p className="finalize-profile-title">You're almost there!</p>
          <p className="finalize-profile-title">You just need some $DESO</p>
        </div>
        {/* *ngIf="globalVars.createProfileFeeNanos > 0"  */}
        <span className="current-cost-container">
          Creating a profile currently costs
          <b>
            {globalVars.createProfileFeeInDeSo()} DeSo (≈{" "}
            {globalVars.createProfileFeeInUsd()} USD)
          </b>
        </span>
      </div>

      {/* <!-- DESKTOP --> */}
      {/* *ngIf="!globalVars.isMobile()" */}
      <div className="fs-15px mt-15px finalize-profile-box">
        <div>
          <p className="finalize-profile-title">You're almost there!</p>
          <p className="finalize-profile-title">You just need some $DESO</p>
        </div>
        {/* *ngIf="globalVars.createProfileFeeNanos > 0" */}
        <span className="current-cost-container">
          Creating a profile currently costs
          <b>
            {globalVars.createProfileFeeInDeSo()} DeSo (≈{" "}
            {globalVars.createProfileFeeInUsd()} USD)
          </b>
        </span>
      </div>
      <div className="get-deso-container">
        <span>Get $DESO by using any of the methods below 👇</span>
      </div>

      <div className="buttons-box">
        <div className="get-deso-box">
          <a
            className="get-deso-button"
            href="https://buy.deso.org/"
            target="_blank"
            rel="noreferrer"
          >
            <img src="./assets/icons/deso.svg" alt="" className="deso-img" />
          </a>
          <p>Buy $DESO with a credit card, Bitcoin or Ethereum.</p>
        </div>

        <div className="get-deso-coinbase-box">
          <a
            className="get-deso-button coinbase-button"
            href="https://www.coinbase.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="./assets/icons/coinbase-white.png"
              alt=""
              className="coinbase-img"
            />
          </a>
          <p>Buy $DESO on Coinbase’s exchange.</p>
        </div>
      </div>
      <div className="bottom-spacer"></div>
    </>
  );
};

export default UpdateProfileGetDeso;
