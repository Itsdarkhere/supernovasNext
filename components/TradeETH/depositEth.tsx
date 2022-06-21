import styles from "../../styles/TradeETH/depositEth.module.scss";
import Image from "next/image";
import ethIcon from "../../public/eth/ethlogo.svg";
import imxIcon from "../../public/eth/imxlogo.svg";
import whiteEthIcon from "../../public/eth/ethlogo-white.svg";
import supportArrowIcon from "../../public/eth/support-arrow.svg";
import { _alertError } from "../../utils/global-context";
import { Link, ETHTokenType } from "@imtbl/imx-sdk";
import { track53 } from "../../utils/mixpanel";

const DepositEth = () => {
  const link = new Link(process.env.NEXT_PUBLIC_MAINNET_LINK_URL);
  let depositAmount: any;

  const depositButtonClicked = async () => {
    depositAmount = document.getElementById("ethDepositAmount").value;
    if (
      depositAmount === "" ||
      !depositAmount ||
      depositAmount === undefined ||
      depositAmount === "0"
    ) {
      _alertError("Please enter an amount greater then 0.");
      return;
    }
    await link.deposit({
      type: ETHTokenType.ETH,
      amount: depositAmount,
    });
    track53("ETH deposited", {
      Amount: depositAmount,
    });
    // put back
    // modalService.show(GeneralSuccessModalComponent, {
    //   class: "modal-dialog-centered nft_placebid_modal_bx  modal-lg",
    //   initialState: {
    //     header: "Success!",
    //     text: "Successfully deposited ETH to IMX. Please give a couple of hours for your IMX balance to update.",
    //     buttonText: "Ok",
    //     buttonClickedAction: "general",
    //   },
    // });
  };

  return (
    <div className="deposit-eth-wrapper d-flex flex-column flex-center-start h-100">
      <div className="deposit-eth-icon-container">
        <Image
          className="eth-logo-deposit-icon d-flex flex-row flex-center"
          src={ethIcon}
          alt="eth-logo"
        />
        <Image
          className="imx-logo-deposit-icon d-flex flex-row flex-center"
          src={imxIcon}
          alt="imx-logo"
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
            <Image
              className="eth-logo-deposit-button d-flex flex-row flex-center"
              src={whiteEthIcon}
              alt="eth-logo"
            />
            <label className="mb-0px eth-deposit-text">ETH</label>
          </button>
        </div>
      </div>
      <button
        onClick={() => depositButtonClicked()}
        className="imx-deposit-button"
      >
        <div className="deposit-eth-text">Deposit ETH to Immutable X</div>
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
export default DepositEth;
