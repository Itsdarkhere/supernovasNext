import styles from "../../styles/TradeCreator/tradeCreatorSell.module.scss";
import Avatar from "../Reusables/avatar";

const TradeCreatorSell = () => {

    return (
        <div className="trade-creator-buy-wrapper position-relative d-flex flex-column flex-center-start w-100 h-100">
        <div className="trade-creator-spacer"></div>
        <div className="position-relative trade-creator-input-container d-flex flex-row flex-start w-90 mt-10px">
            {/* [formControl]="creatorCoinTrade.amount" */}
            {creatorCoinTrade.amount ?
            <input
            matInput
            type="number"
            placeholder="0"
            name="creatorCoinTrade.amount"
            id="trade-creator-sell-input"
            class="pl-10px color-text font-weight-bold flex-center pr-10px trade-creator-input m-0px h-100 w-80"
            />
            :
            null  
            }
          
          {/* <!-- Problems with other elements than button --> */}
          <button className="trade-creator-input-label h-100 pt-5px">
            <Avatar avatar={creatorProfile.PublicKeyBase58Check} classN="trade-creator-transfer-avatar"></Avatar>
          </button>
        </div>
        {/* <!-- ERRORS --> */}
        {creatorCoinTrade.amount.invalid && (creatorCoinTrade.amount.dirty || creatorCoinTrade.amount.touched) ?
        <div
        className="text-danger text-center fs-14px mt-2 w-90"
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
          {_maxAmount() && this._maxAmount() > 0 ?
          <div>
          Amount must be less than
          { this._maxAmount() | number: "0.0-9" }
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
        <div className="trade-creator-spacer-two"></div>
        <div className="trade-creator-coin-sell-info d-flex flex-row flex-center">
          <div className="sell-info-image-container d-flex flex-center">
            <img alt="waller" src="/assets/icons/wallet-icon.svg" />
          </div>
          <div className="sell-info-text-container pl-10px d-flex flex-column flex-start-center w-70">
            <span className="you-own">You own</span>
            <span className="you-own-amount font-weight-semiboldn">
              { creatorCoinTrade.assetToSellBalance() } ${ creatorProfile.Username }
            </span>
          </div>
          <button onClick={() => emitSellMax()} className="trade-creator-see-all-button w-20">SELL ALL</button>
        </div>
        <div className="trade-creator-spacer"></div>
        <div className="trade-creator-coin-info-box d-flex flex-center flex-column">
          <div className="coin-info-box-top">
            <span className="you-receive">You are selling</span>
            <span className="amount-of-coins font-weight-semiboldn">{ creatorCoinTrade.amount.value } ${ creatorProfile.Username } coins</span>
          </div>
          <div className="coin-info-box-bottom">
            <span className="network-fees">Your receive</span>
            <span className="amount-of-coins font-weight-semiboldn">
              { creatorCoinTrade.assetReturnedAmount() | number } $DeSo
            </span>
          </div>
        </div>
        <button
        onClick={() => clickSell()}
        disabled={creatorCoinTrade.amount.invalid || sellingCoin}
          className="black-rounded-button bounce-button mt-20px trade-creator-button"
        >
            {sellingCoin ?
            <i className="fa fa-spinner fa-spin"></i>
            :
            <>
            Sell
            </>  
        }
        </button>
      </div>
      
    )
}

export default TradeCreatorSell;