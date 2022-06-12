import styles from "../../styles/Modals/generalSuccessModal.module.scss";
import Image from "next/image";
import connectedSuccessIcon from "../../public/eth/walletConnectedSuccess.svg";
import ethIcon from "../../public/eth/eth-white.svg";
import noProfileIcon from "../../public/icons/no_profile_icon.svg";

const GeneralSuccessModal = () => {
  return (
    <>
      {/* <!-- profile route or general --> */}
      {this.buttonClickedAction === "profileRoute" ||
      this.buttonClickedAction === "general" ? (
        <div className="general-success-modal-container">
          <p className="general-success-modal-header">{header}</p>
          <p className="general-success-modal-text">{text}</p>
          <button
            onClick={() => generalSuccessModalButtonClicked()}
            className="general-success-modal-button"
          >
            {buttonText}
          </button>
        </div>
      ) : null}

      {/* <!-- noProfile --> */}
      {buttonClickedAction === "noProfile" ? (
        <div className="general-success-modal-container">
          <Image
            src={noProfileIcon}
            alt="No Profile Icon"
            className="no-profile-icon"
          />
          <p className="general-success-modal-header">{header}</p>
          <p className="no-profile-text">{text}</p>
          <button
            onClick={() => createProfileButtonClicked()}
            className="no-profile-button-1"
          >
            Create Profile
          </button>
          <button
            onClick={() => logInButtonClicked()}
            className="no-profile-button-2"
          >
            Log In
          </button>
        </div>
      ) : null}

      {/* <!-- connectWalletMobileError --> */}
      {buttonClickedAction === "connectWalletMobileError" ? (
        <div className="general-success-modal-container">
          <p className="general-success-modal-header">{header}</p>
          <p className="general-success-modal-text-wallet-mobile-error">
            {text}
          </p>
          <button
            onClick={() => generalSuccessModalButtonClicked()}
            className="general-success-modal-button"
          >
            {buttonText}
          </button>
        </div>
      ) : null}

      {/* <!-- connectWalletMobileErrorPageReload || ethMintingError --> */}
      {buttonClickedAction === "connectWalletMobileErrorPageReload" ||
      buttonClickedAction === "ethMintingError" ||
      buttonClickedAction === "ethMarketplaceError" ? (
        <div className="general-success-modal-container">
          <p className="general-success-modal-header">{header}</p>
          <p className="general-success-modal-text-wallet-mobile-error">
            {text}
          </p>
          <button
            onClick={() => generalSuccessModalButtonClicked()}
            className="general-success-modal-button"
          >
            {buttonText}
          </button>
        </div>
      ) : null}

      {/* <!-- want to connect wallet, but haven't connected yet --> */}
      {buttonClickedAction === "connectWallet" &&
      !globalVars.imxWalletConnected &&
      !depositButtonClickedStatus &&
      !buyEthButtonClickedStatus ? (
        <div className="general-success-modal-container-connectedWallet">
          <div className="w-100 d-flex nft_bid_header justify-content-between py-15px">
            <div className="general-success-modal-header-connectedWallet">
              {header}
            </div>
            <div
              onClick={() => bsModalRef.hide()}
              className="close-modal-container"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.528606 0.528598C0.788955 0.268248 1.21107 0.268248 1.47141 0.528598L5.00001 4.05719L8.52861 0.528598C8.78895 0.268248 9.21106 0.268248 9.47141 0.528598C9.73176 0.788948 9.73176 1.21106 9.47141 1.47141L5.94282 5L9.47141 8.5286C9.73176 8.78895 9.73176 9.21106 9.47141 9.47141C9.21106 9.73176 8.78895 9.73176 8.52861 9.47141L5.00001 5.94281L1.47141 9.47141C1.21107 9.73176 0.788955 9.73176 0.528606 9.47141C0.268256 9.21106 0.268256 8.78895 0.528606 8.5286L4.0572 5L0.528606 1.47141C0.268256 1.21106 0.268256 0.788948 0.528606 0.528598Z"
                  fill="#858585"
                />
              </svg>
            </div>
          </div>
          <p className="general-success-modal-text-connectedWallet">
            {{ text }}
          </p>
          <button
            onClick={() => generalSuccessModalButtonClicked()}
            className="general-success-modal-button-logo imx-connect-button"
          >
            <Image
              className="eth-logo h-100 d-flex flex-row flex-center ethlogo-white"
              src={ethIcon}
              alt="eth-logo"
            />
            <div className="general-success-modal-button-text">
              {buttonText}
            </div>
          </button>
        </div>
      ) : null}

      {/* <!-- want to connect wallet and have connected wallet -->
  (clickOutside)="clickOutside()"*/}
      {buttonClickedAction === "connectWallet" &&
      globalVars.imxWalletConnected &&
      !depositButtonClickedStatus &&
      !buyEthButtonClickedStatus ? (
        <div className="general-success-modal-container-connectedWallet-success">
          <Image
            className="walletConnectedSuccessImg"
            src={connectedSuccessIcon}
            alt="eth-logo"
          />
          <div className="general-success-modal-header-connectedWallet-success">
            Wallet Connected!
          </div>
          <p className="general-success-modal-text-connectedWallet-success">
            You can either deposit your Ethereum to Immutable X or buy Ethereum
            directly to your connected wallet.
          </p>

          <button
            onClick={() => wantToDepositButtonClicked()}
            className="general-success-modal-button-logo want-to-deposit-button"
          >
            <div className="general-success-modal-button-text-connected">
              Deposit ETH to Immutable X
            </div>
          </button>

          <button
            onClick={() => wantToBuyEthButtonClicked()}
            className="general-success-modal-button-logo want-to-buy-button"
          >
            <div className="general-success-modal-button-text-connected">
              Buy ETH
            </div>
          </button>
        </div>
      ) : null}
    </>
  );
};
export default GeneralSuccessModal;
