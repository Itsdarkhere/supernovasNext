import styles from "../../../styles/Mint/stepFourDeso.module.scss";

const StepFourDeso = () => {
  // <!--  STEP 5: Success  -->
  return (
    <div className={["mint-page-text-container", mobile ? 'w-100' : 'w-50'].join(" ")}>
      <div
        className={[
          "h-95 padding-40px d-flex flex-column overflow-scroll disable-scrollbars max-width-480 flex-center",
          mobile ? "w-90" : "w-80",
        ].join(" ")}
      >
        <img
          className="success-gradient"
          src="/assets/img/success-gradient.png"
          alt="success-icon"
        />
        <h2 className="mb-20px font-weight-semiboldn w-100 text-align-center ml-5px mt-20px">
          Congratulations! 🎉
        </h2>
        <label className="color-light text-align-center fs-18px ml-5px mt-20px">
          Your NFT is minted and live on the Supernovas marketplace. Well done!
        </label>
        <label className="color-light fs-18px ml-5px mt-20px">
          Start marketing your NFT below.
        </label>
        <button onClick={(e) => openModal(e)} className="w-100 mt-40px font-weight-semiboldn mint-page-step-2-continue-normal">
          Quote Repost on Supernovas
        </button>
        <button onClick={() => seeNFT()} className="w-100 mt-20px font-weight-semiboldn mint-page-step-4-continue mb-10px">
          See your NFT
        </button>
      </div>
    </div>
  );
};
export default StepFourDeso;
