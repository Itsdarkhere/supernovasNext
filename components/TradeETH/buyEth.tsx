import styles from "../../styles/TradeETH/buyEth.module.scss";

const BuyEth = () => {
  return (
    <div className="buy-eth-wrapper d-flex flex-column flex-center-start h-100">
      <p className="buy-eth-description">BUY WITH MOONPAY</p>
      <div className="moonpay-container">
        <div className="moonpay-container-header">
          <img
            src="/assets/eth/moonpay-logo.svg"
            alt="moonpay-text"
            className="moonpay-logo"
          />
          <img
            src="/assets/eth/moonpay-text.svg"
            alt="moonpay-text"
            className="moonpay-text"
          />
        </div>
        <p className="moonpay-text">
          Buy ETH directly to your Immutable X wallet with FIAT currencies by
          using Moonpay.
        </p>
      </div>
      {/* (click)="buyEthButtonClicked()" */}
      <button className="imx-buy-button">
        <div className="general-success-modal-button-text-connected">
          Buy ETH with Moonpay
        </div>
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
export default BuyEth;
