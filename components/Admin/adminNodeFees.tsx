import { SearchBar } from "rsuite/esm/Picker";
import styles from "../../styles/Admin/adminNodeFees.module.scss";
import { nanosToDeSo } from "../../utils/global-context";
import SimpleProfileCard from "../Reusables/simpleProfileCard";
import TabSelector from "../Reusables/tabSelector";

const AdminNodeFees = () => {
  return (
    <div>
      {/* <!-- Tabs --> */}
      <TabSelector
        tabs={tabs}
        activeTab={activeTab}
        tabClick={(e) => _handleTabClick(e)}
        icons={null}
        extraTab={null}
      ></TabSelector>
      {!loading && activeTab === AdminNodeFeesComponent.FEES ? (
        <div className="p-15px fs-15px">
          <button
            onClick={() => addNewFee("ALL")}
            disabled={removingFee}
            className="btn btn-outline-primary fs-15px"
          >
            Add Fee Recipient To All Transactions
          </button>
          {/* *ngFor="let transactionFee of transactionFeeMap | keyvalue; let ii = index" 
        //  what does the above mean ??? is that a pipe ? */}
          {transactionFeeMap.map((transactionFee, i) => (
            <div key={i} className="py-15px">
              <div className="d-flex justify-content-between">
                <span>{transactionFee.key}</span>
                <i
                  onClick={() => addNewFee(transactionFee.key)}
                  className="fas fa-plus text-success"
                ></i>
              </div>
              {transactionFee.value.map((item, i) => (
                <div key={i} className="d-flex flex-column">
                  <div className="d-flex flex-start align-items-center">
                    <i
                      onClick={() =>
                        removeFee(transactionFee.key, item.PublicKeyBase58Check)
                      }
                      className="fas fa-trash text-danger pr-5px fs-18px"
                    ></i>
                    <SimpleProfileCard
                      profile={
                        item.ProfileEntryResponse || {
                          PublicKeyBase58Check: item.PublicKeyBase58Check,
                        }
                      }
                      hideFollowLink={true}
                      singleColumn={true}
                    ></SimpleProfileCard>
                    <span>{nanosToDeSo(item.AmountNanos)} $DESO</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : null}

      {!loading && activeTab === AdminNodeFeesComponent.EXEMPT_KEYS ? (
        <div className="p-15px fs-15px">
          <SearchBar
            showCloutavista={false}
            isSearchForUsersToSendDESO={true}
            creatorToMessage={(selectedCreator = $event)}
          ></SearchBar>

          {selectedCreator ? (
            <SimpleProfileCard
              profile={selectedCreator}
              hideFollowLink={true}
              singleColumn={true}
            ></SimpleProfileCard>
          ) : null}

          <button
            disabled={addingExemptKey || !selectedCreator?.PublicKeyBase58Check}
            onClick={() => addExemptKey()}
            className="btn btn-outline-primary fs-15px"
          >
            Exempt From Fees
          </button>
          <div className="py-15px">
            <div className="py-15px">Users exempt from fees:</div>
            {/* *ngFor="let exemptKey of exemptPublicKeyMap | keyvalue" 
            Again is this a pipe ? */}
            {exemptPublicKeyMap.map((exemptKey, i) => (
              <div
                key={i}
                className="d-flex flex-start pr-5px align-items-center fs-18px"
              >
                <i
                  onClick={() => removeExemptKey(exemptKey.key)}
                  className="fas fa-trash text-danger"
                ></i>
                <SimpleProfileCard
                  profile={
                    exemptKey.value || { PublicKeyBase58Check: exemptKey.key }
                  }
                  hideFollowLink={true}
                  singleColumn={true}
                ></SimpleProfileCard>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div>
        {/* <simple-center-loader *ngIf="loading"></simple-center-loader> */}
      </div>
    </div>
  );
};
export default AdminNodeFees;
