import styles from "../../styles/TradeETH/depositEth.module.scss";

const DepositEth = () => {
  return (
    <div className="deposit-eth-wrapper d-flex flex-column flex-center-start h-100">
      <div className="deposit-eth-icon-container">
        <img
          className="eth-logo-deposit-icon d-flex flex-row flex-center"
          src="/assets/eth/ethlogo.svg"
          alt="eth-logo"
          name="eth-logo-deposit-icon"
        />
        <img
          className="imx-logo-deposit-icon d-flex flex-row flex-center"
          src="/assets/eth/imxlogo.svg"
          alt="imx-logo"
          name="imx-logo-deposit-icon"
        />
      </div>
      <p className="deposit-eth-description">
        Deposit Ethereum to Immutable X to mint and trade NFT's.
      </p>
      <div className="deposit-eth-container">
        <label htmlFor="ethDepositAmount" className="deposit-eth-label">
          ETH TO DEPOSIT TO IMMUTABLE X
        </label>
        <div className="position-relative d-flex flex-row flex-start deposit-eth-min-price mt-10px">
          <input
            matInput
            type="number"
            placeholder="0"
            className="pl-10px color-text font-weight-bold flex-center pr-10px deposit-eth-min-price-input m-0px h-100"
            id="ethDepositAmount"
          />
          <button className="deposit-eth-min-price-label h-100 w-40 fs-23-responsive pt-5px">
            <img
              className="eth-logo-deposit-button d-flex flex-row flex-center"
              src="/assets/eth/ethlogo-white.svg"
              alt="eth-logo"
              name="eth-logo-white"
            />
            <label className="mb-0px eth-deposit-text">ETH</label>
          </button>
        </div>
      </div>
      {/* (click)="depositButtonClicked()" */}
      <button className="imx-deposit-button">
        <div className="deposit-eth-text">Deposit ETH to Immutable X</div>
      </button>
      <a className="support-container">
        <img
          src="/assets/eth/support-arrow.svg"
          alt="support-arrow"
          className="support-arrow"
        />
        <p className="support-text">Need help? Contact our support</p>
      </a>
    </div>
  );
};
export default DepositEth;
