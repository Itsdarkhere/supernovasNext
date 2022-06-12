import { SearchBar } from "rsuite/esm/Picker";
import styles from "../../styles/TradeCreator/tradeCreatorTransfer.module.scss";
import Avatar from "../Reusables/avatar";

const TradeCreatorTransfer = () => {
    /*
    We need to take this Angular code and make it work in react,
    we can ignore imports but need to make the syntax work.
    */

    return (
        <div className="trade-creator-buy-wrapper position-relative d-flex flex-column flex-center-start w-100 h-100">
  <div className="trade-creator-spacer"></div>
  <label className="trade-creator-coins-to-transfer">COINS TO TRANSFER</label>
  <div className="position-relative trade-creator-input-container d-flex flex-row flex-start w-90 mt-10px">
    {/* [formControl]="creatorCoinTrade.amount" */}
    {/* matInput */}
    <input
      type="number"
      placeholder="0"
      name={creatorCoinTrade.amount}
      className="pl-10px color-text font-weight-bold flex-center pr-10px trade-creator-input m-0px h-100 w-80"
    />
    {/* <!-- Problems with other elements than button --> */}
    <button className="trade-creator-input-label h-100 pt-5px">
      <Avatar avatar={loggedInUser?.PublicKeyBase58Check} classN="trade-creator-transfer-avatar"></Avatar>
    </button>
  </div>
  {/* <!-- Errors--> */}
  {creatorCoinTrade.amount.invalid && (creatorCoinTrade.amount.dirty || creatorCoinTrade.amount.touched) ?
  <div
  className="text-danger text-center w-90 fs-14px mt-2"
>
  {creatorCoinTrade.amount.errors.required ?
  <div className="mt-10px">Amount is required</div>
  :
  null
}
  
      {creatorCoinTrade.amount.errors.exclusiveMin ?
        <div className="mt-10px">
        Amount must be greater than { _minAmount() | number: "0.0-9" }
        (to cover fees)
      </div>
      :
      null    
    }
  
      {creatorCoinTrade.amount.errors.dynamicMax ?
        <div className="mt-10px">
        {_maxAmount() && _maxAmount() > 0 ?
        <div>
        Amount must be less than
        { _maxAmount() | number: "0.0-9" }
        (your balance net of fees)
      </div>
      :
      <>
        Amount must be less than your balance plus fees
      </>  
    }
    </div>
    :
    null 
    }
      {creatorCoinTrade.amount.errors.pattern ?
    <div className="mt-10px">Amount must be numbers and decimals only</div>
    :
    null    
    }
  
</div>
:
null
}
  
  {/* <!-- ERRORS END --> */}
  <label className="trade-creator-coins-to-transfer mt-20px">TRANSFER TO</label>
  {/* <!-- Passing sickSearchBar makes it look like this _handleCreatorSelectedInSearch($event) --> */}
  {!selectedCreator ?
  <SearchBar
  showCloutavista={false}
  creatorToMessage={(e) => _handleCreatorSelectedInSearch(e)}
  isSearchForUsersToSendDESO={true}
  sickSearchBar={true}
></SearchBar>
:
<button
    onClick={() => setSelectedCreator(null)}
    className="creator-selected-button position-relative w-90 mt-10px"
  >
    <span className="input-group-text search-bar__icon search_bar__icon_sick">
      <Avatar avatar={selectedCreator?.PublicKeyBase58Check} classN="sick-search-avatar"></Avatar>
    </span>
    <p className="creator-selected-user font-weight-semiboldn">
      { selectedCreator?.Username ? "@" + selectedCreator?.Username : selectedCreator?.PublicKeyBase58Check }
    </p>
  </button>
}
  
  
  <div className="trade-creator-spacer"></div>
  <div className="trade-creator-coin-info-box d-flex flex-center flex-column">
    <div className="coin-info-box-top">
      <span className="you-receive">You are transferring</span>
      <span className="amount-of-coins font-weight-semiboldn">
        { creatorCoinTrade.amount.value } ${ creatorProfile.Username } coins
      </span>
    </div>
    <div className="coin-info-box-bottom">
      <span className="network-fees">Network fees</span>
      <span className="amount-of-coins font-weight-semiboldn">0.00 $DESO</span>
    </div>
  </div>
  <button
    onClick={() => transferEmit()}
    disabled={creatorCoinTrade.amount.invalid || !selectedCreator || transferingCoin}
    className="black-rounded-button bounce-button mt-20px trade-creator-button"
  >
    {transferingCoin ?
    <i className="fa fa-spinner fa-spin"></i>
    :
    <>
     Transfer
    </>
}
  </button>
</div>

    )
}

export default TradeCreatorTransfer;