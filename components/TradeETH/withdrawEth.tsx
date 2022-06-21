import styles from "../../styles/TradeETH/withdrawEth.module.scss";
import Image from "next/image";
import ethIcon from "../../public/eth/ethlogo.svg";
import imxIcon from "../../public/eth/imxlogo.svg";
import whiteEthIcon from "../../public/eth/ethlogo-white.svg";
import supportArrowIcon from "../../public/eth/support-arrow.svg";
import { useState } from "react";

const WithdrawEth = () => {
  const [pendingWithdrawalsResponse, setPendingWithdrawalsResponse] =
    useState(true);
  const [pendingWithdrawals, setPendingWithdrawals] = useState(false);
  const [readyWithdrawalsResponse, ]
  return (
    <>
      {/* <!-- no pending withdrawals --> */}
      {!pendingWithdrawals &&
      !readyWithdrawals &&
      !completeWithdrawalSuccess ? (
        <div className="withdraw-eth-wrapper d-flex flex-column flex-center-start h-100">
          <div className="withdraw-eth-icon-container">
            <Image
              className="eth-logo-withdraw-icon d-flex flex-row flex-center"
              src={ethIcon}
              alt="eth-logo"
            />
            <Image
              className="imx-logo-withdraw-icon d-flex flex-row flex-center"
              src="/assets/eth/imxlogo.svg"
              alt="imx-logo"
            />
          </div>
          <p className="withdraw-eth-description">
            You need to first prepare your ETH for withdrawal from Immutable X.
            This process can take up to 24 hours.
          </p>
          <div className="withdraw-eth-container">
            <label htmlFor="ethwithdrawAmount" className="withdraw-eth-label">
              PREPARE ETH TO WITHDRAW
            </label>
            <div className="position-relative d-flex flex-row flex-start withdraw-eth-min-price mt-10px">
              <input
                matInput
                type="number"
                placeholder="0"
                className="pl-10px color-text font-weight-bold flex-center pr-10px withdraw-eth-min-price-input m-0px h-100"
                id="ethWithdrawAmount"
              />
              <button className="withdraw-eth-min-price-label h-100 w-40 fs-23-responsive pt-5px">
                <Image
                  className="eth-logo-withdraw-button d-flex flex-row flex-center"
                  src={whiteEthIcon}
                  alt="eth-logo"
                />
                <label className="mb-0px eth-withdraw-text">ETH</label>
              </button>
            </div>
          </div>
          <button
            onClick={() => prepareWithdrawButtonClicked()}
            className="imx-withdraw-button"
          >
            <div className="withdraw-eth-text">Prepare ETH Withdrawal</div>
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
      ) : null}

      {/* <!-- pending withdrawals --> */}
      {pendingWithdrawals && !readyWithdrawals && !completeWithdrawalSuccess ? (
        <div className="withdraw-eth-wrapper d-flex flex-column flex-center-start h-100">
          <div className="withdraw-eth-icon-container">
            <Image
              className="eth-logo-withdraw-icon d-flex flex-row flex-center"
              src={ethIcon}
              alt="eth-logo"
            />
            <Image
              className="imx-logo-withdraw-icon d-flex flex-row flex-center"
              src={imxIcon}
              alt="imx-logo"
            />
          </div>
          <p className="withdraw-eth-description">
            Success! Your ETH withdrawal is being prepared. This process can
            take up to 24 hours.
          </p>
          <label className="eth-being-prepared-label">ETH BEING PREPARED</label>
          <p className="eth-being-prepared-withdraw-amount">
            {withdrawAmount} ETH
          </p>
        </div>
      ) : null}

      {/* <!-- ready withdrawals --> */}
      {!pendingWithdrawals && readyWithdrawals && !completeWithdrawalSuccess ? (
        <div className="withdraw-eth-wrapper d-flex flex-column flex-center-start h-100">
          <div className="withdraw-eth-icon-container">
            <Image
              className="eth-logo-withdraw-icon d-flex flex-row flex-center"
              src={ethIcon}
              alt="eth-logo"
            />
            <Image
              className="imx-logo-withdraw-icon d-flex flex-row flex-center"
              src={imxIcon}
              alt="imx-logo"
            />
          </div>
          <p className="withdraw-eth-description">
            Your ETH is ready to be withdrawn!
          </p>
          <p className="eth-ready-withdraw-amount">{withdrawAmount} ETH</p>
          <button
            onClick={() => completeWithdrawal()}
            className="imx-complete-withdraw-button"
          >
            <div className="withdraw-eth-text">Withdraw from Immutable X</div>
          </button>
        </div>
      ) : null}

      {/* <!-- completed withdrawals --> */}
      {completeWithdrawalSuccess ? (
        <div className="withdraw-eth-wrapper d-flex flex-column flex-center-start h-100">
          <div className="withdraw-eth-icon-container">
            <Image
              className="eth-logo-withdraw-icon d-flex flex-row flex-center"
              src={ethIcon}
              alt="eth-logo"
            />
            <Image
              className="imx-logo-withdraw-icon d-flex flex-row flex-center"
              src={imxIcon}
              alt="imx-logo"
            />
          </div>
          <p className="withdraw-eth-description">
            Withdrawal Completed Successfully
          </p>
          <p className="eth-ready-withdraw-amount">{withdrawAmount} ETH</p>
          <button
            onClick={() => withdrawAgain()}
            className="imx-complete-withdraw-button"
          >
            <div className="withdraw-eth-text">Withdraw Again</div>
          </button>
        </div>
      ) : null}
    </>
  );
};
export default WithdrawEth;
