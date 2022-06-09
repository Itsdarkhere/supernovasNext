import styles from "../../styles/TradeDeso/sellDeso.module.scss";

const SellDeso = () => {
  return (
    <div className="sell-deso-wrapper d-flex flex-column flex-center-start h-100">
      <div className="deso-sell-subheading mt-20px">
        SELL AND CASHOUT $DESO ON EXCHANGE
      </div>
      {/* (click)="openLink('https://www.coinbase.com/price/decentralized-social')" */}
      <button className="deso-sell-exchange-container">
        <label>Coinbase</label>
        <p>Sell $DESO on Coinbase.</p>
      </button>
      {/* (click)="openLink('https://support.supernovas.app/en/')" */}
      <div className="sell-deso-help">
        <img src="/assets/icons/chevron_right.svg" alt="arrow" />
        Need help? Contact our support.
      </div>
    </div>
  );
};
export default SellDeso;
