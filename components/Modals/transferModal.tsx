import { useRef } from "react";
import styles from "../../styles/Modals/transferModal.module.scss";
import SearchBar from "../Reusables/searchBar";
import SimpleProfileCard from "../Reusables/simpleProfileCard";
import ModalHeader from "./modalHeader";

const TransferModal = () => {
  const selectRef = useRef();
  return (
    <div
      app-theme
      className={[
        "nft-modal-container p-15px align-items-center flex-center",
        acceptModal ? "overwrite-min-height2" : "overwrite-min-height",
      ].join(" ")}
    >
      {step === 1 ? (
        <div className="w-100 flex-center flex-column">
          {transferModal ? (
            <ModalHeader
              header="Transfer your NFT"
              bsModalRef={bsModalRef}
            ></ModalHeader>
          ) : null}

          {acceptModal ? (
            <ModalHeader
              header="Accept transfer"
              bsModalRef={bsModalRef}
            ></ModalHeader>
          ) : null}

          {burnModal ? (
            <ModalHeader
              header="Burn NFT"
              bsModalRef={bsModalRef}
            ></ModalHeader>
          ) : null}

          <div className="font-weight-bold w-90 d-flex align-items-center fs-15px pt-15px select-p-container flex-column">
            {transferModal ? (
              <label className="text-start w-100 transfer-label mb--12px ml-15px">
                Select the recipient
              </label>
            ) : null}

            {burnModal ? (
              <label className="pb-15px burn-text text-center w-100">
                Burning destroys the NFT forever, which means you or anyone else
                cannot access it once it’s done.
              </label>
            ) : null}

            {/* <!-- Search Bar --> */}
            {transferModal ? (
              <div className="search-bar-cover w-100">
                <SearchBar
                  showCloutavista={false}
                  startingSearchText={startingSearchText}
                  isSearchForUsersToSendDESO={true}
                  creatorToMessage={(e) => _handleCreatorSelectedInSearch(e)}
                ></SearchBar>
              </div>
            ) : null}

            {showDangerText || showDangerTextSendingToSelf ? (
              <label className="text-danger">
                {showDangerText
                  ? "You must choose a user to send the NFT to"
                  : "You cant send to yourself"}
              </label>
            ) : null}

            {transferToCreator ? (
              <div className="pb-15px w-100 align-items-start">
                <SimpleProfileCard
                  profile={transferToCreator}
                  singleColumn={true}
                  hideFollowLink={true}
                ></SimpleProfileCard>
              </div>
            ) : null}

            <div className={burnModal ? "w-90" : "w-100"}>
              {transferModal && serialNumbers.length > 1 ? (
                <label className="transfer-label text-start w-100 ml-10px">
                  Select the edition you want to transfer
                </label>
              ) : null}

              {burnModal ? (
                <label className="transfer-label text-start w-100 ml-10px">
                  Pick the edition you wish to burn
                </label>
              ) : null}

              {acceptModal ? (
                <label className="transfer-label text-start w-100 ml-10px">
                  I would like to accept ownership of this NFT and add to my NFT
                  gallery
                </label>
              ) : null}

              {serialNumbers.length > 1 ? (
                <select
                  ref={selectRef}
                  onChange={() => setSer(selectRef.current.value)}
                  className="select-transfer-modal mb-10px pl-10px pr-10px w-100"
                >
                  {serialNumbers.map((ser, index) => (
                    <option key={index} value={ser.SerialNumber}>
                      Serialnumber #{ser.SerialNumber}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>
            {showInput ? (
              <div className="w-100 mt-10px">
                <p className="transfer-label text-start w-100">
                  Add unlockable content ( required )
                </p>
                <textarea
                  value={unlockableText}
                  type="text"
                  className="w-100 mt-5px textarea-transfer"
                ></textarea>
              </div>
            ) : null}
          </div>
          <div className="flex-center w-90 fs-15px pt-15px mt-15px">
            {transferModal ? (
              <button
                onClick={() => runCheck()}
                className="transfer-modal-button transfer-button"
              >
                Transfer NFT
              </button>
            ) : null}

            {acceptModal ? (
              <button
                onClick={() => acceptNFTTransfer()}
                className="transfer-modal-button accept-button"
              >
                Confirm
              </button>
            ) : null}

            {burnModal ? (
              <button
                onClick={() => stepTwo()}
                className="transfer-modal-button burn-button"
              >
                Burn
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* <!-- STEP 2 --> */}
      {step === 2 ? (
        <div className="w-100 flex-center flex-column">
          <img src="/assets/img/help_circle_outline.png" className="mt-15px" />
          {transferModal ? (
            <h2 className="text-center p-10px font-weight-bold">
              Are you sure you want to transfer this NFT?
            </h2>
          ) : null}

          {burnModal ? (
            <h2 className="text-center p-10px font-weight-bold">
              Are you sure you want to burn this NFT?
            </h2>
          ) : null}

          {transferModal ? (
            <label className="text-center p-10px mt-20px mb-20px">
              Once the transfer is complete, the new owner will control this
              NFT.
            </label>
          ) : null}

          {burnModal ? (
            <label className="text-center p-10px mt-20px mb-20px">
              Once the burn is completed the NFT is lost forever
            </label>
          ) : null}

          {transferModal ? (
            <button
              onClick={() => runCheck()}
              className="transfer-modal-button transfer-button mb-15px"
            >
              Confirm transfer
            </button>
          ) : null}

          {burnModal ? (
            <button
              onClick={() => burnNFT()}
              className={[
                "transfer-modal-button mb-15px",
                step === 2 ? "burn-button2" : "burn-button",
              ].join(" ")}
            >
              🔥 Confirm burning🔥
            </button>
          ) : null}
        </div>
      ) : null}

      {/* <!-- STEP 3 --> */}
      {step === 3 ? (
        <div className="w-100 h-100 accept-container">
          <img src="/assets/img/success.png" className="mt-15px success-img" />
          {transferModal ? (
            <h2 className="text-center p-10px pt-15px font-weight-bold">
              Success!
            </h2>
          ) : null}

          {acceptModal ? (
            <h2 className="text-center p-10px pt-15px font-weight-bold">
              NFT received!
            </h2>
          ) : null}

          {burnModal ? (
            <h2 className="text-center p-10px pt-15px font-weight-bold">
              NFT has been burned!
            </h2>
          ) : null}

          {transferModal ? (
            <label className="text-center p-10px mt-20px mb-20px">
              Your NFT is now transferred! The new owner can accept the transfer
              by navigating to “Transfers” menu on their profile.
            </label>
          ) : null}

          {acceptModal ? (
            <label className="text-center p-10px mt-20px mb-20px">
              The NFT has now been added to your profile and can be found in the
              gallery.
            </label>
          ) : null}

          {burnModal ? (
            <label className="text-center p-10px mt-20px mb-20px">
              Your NFT is now gone forever. Good bye 👋
            </label>
          ) : null}

          <button
            onClick={() => hideAndRefresh()}
            className="transfer-modal-button close-window-button mb-15px"
          >
            Close this window
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default TransferModal;
