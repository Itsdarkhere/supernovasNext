import styles from "../../styles/TradeDeso/buyDeso.module.scss";

const BuyDeso = () => {
  return (
    <div className="buy-deso-wrapper d-flex flex-column flex-center-start h-100">
      <div className="deso-buy-subheading mt-20px">BUY FROM EXCHANGE</div>
      {/* (click)="openLink('https://www.coinbase.com/price/decentralized-social')" */}
      <button className="deso-buy-exchange-container">
        <label>Coinbase</label>
        <p>Buy $DESO from Coinbase</p>
      </button>
      <div className="buy-deso-spacer"></div>
      <div className="deso-buy-subheading">BUY FROM DESO.ORG</div>
      <div className="deso-buy-deso-org-container">
        {/* (click)="openLink('https://buy.deso.org/')" */}
        <button>
          <div className="buy-deso-type-icon-container">
            <img
              src="assets/icons/deso_page_bitcoin.svg"
              className="buy-deso-type-icon"
            />
          </div>
          <label>Buy with Bitcoin</label>
          <div className="buy-deso-link-icon-container">
            <img
              src="/assets/icons/deso_page_link.svg"
              className="buy-deso-link-icon"
              alt="link icon"
            />
          </div>
        </button>
        {/* (click)="openLink('https://buy.deso.org/')" */}
        <button className="custom-border-top-bottom">
          <div className="buy-deso-type-icon-container">
            <img
              src="assets/icons/deso_page_eth.svg"
              className="buy-deso-type-icon"
            />
          </div>
          <label>Buy with Ethereum</label>
          <div className="buy-deso-link-icon-container">
            <img
              src="/assets/icons/deso_page_link.svg"
              className="buy-deso-link-icon"
              alt="link icon"
            />
          </div>
        </button>
        {/* (click)="openLink('https://buy.deso.org/')" */}
        <button>
          <div className="buy-deso-type-icon-container">
            <img
              src="assets/icons/deso_page_visa.svg"
              className="buy-deso-type-icon"
            />
          </div>
          <label>Buy with Credit Card</label>
          <div className="buy-deso-link-icon-container">
            <img
              src="/assets/icons/deso_page_link.svg"
              className="buy-deso-link-icon"
              alt="link icon"
            />
          </div>
        </button>
      </div>
      {/* (click)="openLink('https://support.supernovas.app/en/')" */}
      <div className="buy-deso-help">
        <img src="/assets/icons/chevron_right.svg" alt="arrow" />
        Need help? Contact our support.
      </div>
    </div>
  );
};
export default BuyDeso;
