import styles from "../../styles/Admin/adminNodeAddFeed.module.scss";
import SearchBar from "../Reusables/searchBar";
import SimpleProfileCard from "../Reusables/simpleProfileCard";

const AdminNodeAddFeed = () => {
  return (
    <div className="p-15px">
      <div>Add a new fee recipient for {txnType} transactions</div>
      <div>
        <SearchBar
          showCloutavista={false}
          isSearchForUsersToSendDESO={true}
          creatorToMessage={(selectedCreator = $event)}
        ></SearchBar>
      </div>
      {selectedCreator ? (
        <div className="px-5px">
          Fee Recipient:
          <SimpleProfileCard
            profile={selectedCreator}
            singleColumn={true}
            hideFollowLink={true}
          ></SimpleProfileCard>
        </div>
      ) : null}

      <div className="input-group py-15px">
        <div className="input-group-prepend">
          <span className="input-group-text">
            Fee Amount Received (in $DESO)
          </span>
        </div>
        <input
          value={feeAmount}
          className="form-control"
          type="number"
          matInput
        />
      </div>
      <button
        className="btn btn-primary"
        disabled={
          feeAmount <= 0 ||
          !selectedCreator?.PublicKeyBase58Check ||
          updatingTransactionFees
        }
        onClick={() => setTransactionFees()}
        className="btn btn-outline-primary fs-15px"
      >
        Add Fee
      </button>
      {transactionFeeMap[txnType]?.length ? (
        <div className="py-15px">
          <div>Existing Fee Recipients for {txnType} Transactions</div>
          {transactionFeeMap[txnType].map((transactionFee, i) => (
            <div key={i} className="d-flex flex-start align-items-center">
              <SimpleProfileCard
                hideFollowLink={true}
                singleColumn={true}
                profile={
                  transactionFee.ProfileEntryResponse || {
                    PublicKeyBase58Check: transactionFee.PublicKeyBase58Check,
                  }
                }
              ></SimpleProfileCard>
              <span>{nanosToDeSo(transactionFee.AmountNanos)} $DESO</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default AdminNodeAddFeed;
