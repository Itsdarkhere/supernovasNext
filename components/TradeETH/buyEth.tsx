import styles from "../../styles/TradeETH/buyEth.module.scss";
import Image from "next/image";
import moonpayIcon from "../../public/icons/moonpay-logo.svg";
import moonpayTextIcon from "../../public/icons/moonpay-text.svg";
import supportArrowIcon from "../../public/icons/support-arrow.svg";
import { track55 } from "../../utils/mixpanel";
import { _alertSuccess } from "../../utils/global-context";
import { Link } from "@imtbl/imx-sdk";

const BuyEth = () => {
  const link = new Link(process.env.NEXT_PUBLIC_MAINNET_LINK_URL);

  const buyEthButtonClicked = async () => {
    await link.fiatToCrypto({});
    _alertSuccess(
      "Successfully purchased ETH on Imx with Moonpay. Please give a couple of hours for your Imx balance to update."
    );
    track55("Buy ETH clicked");
  };

  return (
    <div className="buy-eth-wrapper d-flex flex-column flex-center-start h-100">
      <p className="buy-eth-description">BUY WITH MOONPAY</p>
      <div className="moonpay-container">
        <div className="moonpay-container-header">
          <Image
            src={moonpayIcon}
            alt="moonpay-text"
            className="moonpay-logo"
          />
          <Image
            src={moonpayTextIcon}
            alt="moonpay-text"
            className="moonpay-text"
          />
        </div>
        <p className="moonpay-text">
          Buy ETH directly to your Immutable X wallet with FIAT currencies by
          using Moonpay.
        </p>
      </div>
      <button onClick={() => buyEthButtonClicked()} className="imx-buy-button">
        <div className="general-success-modal-button-text-connected">
          Buy ETH with Moonpay
        </div>
      </button>
      <a className="support-container">
        <Image
          src={supportArrowIcon}
          alt="support-arrow"
          className="support-arrow"
        />
        <p className="support-text">Need help? Contact our support</p>
      </a>
    </div>
  );
};
export default BuyEth;
