import styles from "../../styles/TradeDeso/transferDeso.module.scss";
import { nanosToUSD } from "../../utils/global-context";
import Avatar from "../Reusables/avatar";
import SearchBar from "../Reusables/searchBar";

const TransferDeso = () => {
  return (
    <div className="transfer-deso-wrapper d-flex flex-column flex-center-start h-100">
      <label className="trade-creator-coins-to-transfer mt-20px">
        DESO TO TRANSFER
      </label>
      <div className="position-relative trade-creator-input-container d-flex flex-row flex-start w-90 mt-5px">
        <input
          matInput
          value={amount}
          type="number"
          placeholder="0"
          className="pl-10px color-text font-weight-bold flex-center pr-10px trade-creator-input m-0px h-100 w-80"
        />
        {/* <!-- Problems with other elements than button --> */}
        <button className="trade-creator-input-button h-100 pt-5px">
          <img
            src="assets/deso/logo-cropped.png"
            className="mb-5px trade-creator-deso-logo"
          />
        </button>
      </div>
      <label className="trade-creator-coins-to-transfer mt-20px">
        TRANSFER TO
      </label>
      {/* <!-- Passing sickSearchBar makes it look like this --> */}
      {!payToCreator ? (
        <SearchBar
          startingSearchText={startingSearchText}
          isSearchForUsersToSendDESO={true}
          creatorToMessage={(e) => _handleCreatorSelectedInSearch(e)}
          sickSearchBar={true}
        ></SearchBar>
      ) : null}

      {payToCreator ? (
        <button
          onClick={() => setPayToCreator(null)}
          className="creator-selected-button position-relative w-95 mt-5px"
        >
          <span className="input-group-text search-bar__icon search_bar__icon_sick">
            <Avatar
              avatar={payToCreator?.PublicKeyBase58Check}
              classN="sick-search-avatar"
            ></Avatar>
          </span>
          <p className="creator-selected-user font-weight-semiboldn">
            {payToCreator?.Username
              ? "@" + payToCreator?.Username
              : payToCreator?.PublicKeyBase58Check}
          </p>
        </button>
      ) : null}

      <div className="trade-creator-spacer"></div>
      <div className="trade-creator-coin-info-box d-flex flex-center flex-column">
        <div className="coin-info-box-top">
          <span className="you-receive">You are transferring</span>
          {amount > 0 ? (
            <span className="amount-of-coins font-weight-semiboldn">
              {nanosToUSD(amount * 1e9, 2)} $USD
            </span>
          ) : null}
        </div>
        <div className="coin-info-box-bottom">
          <span className="network-fees">Network fees</span>
          <span className="amount-of-coins font-weight-semiboldn">
            {nanosToDeSo(networkFee * 1e9)} $DESO
          </span>
        </div>
      </div>
      <button
        onClick={() => emitSendDeso()}
        disabled={!payToCreator || !(amount > 0) || sendingDeSo}
        className="black-rounded-button bounce-button mt-20px trade-creator-button"
      >
        {sendingDeSo ? (
          <i className="fa fa-spinner fa-spin"></i>
        ) : (
          <>Transfer</>
        )}
      </button>
    </div>
  );
};
export default TransferDeso;
