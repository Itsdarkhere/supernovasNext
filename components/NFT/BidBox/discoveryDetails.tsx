import styles from "../../styles/NFT/bidBox.module.scss";
import {
  nanosToDeSo,
  nanosToUSD,
} from "../../../utils/global-context";
import { useAppSelector } from "../../../utils/Redux/hooks";
// These details of the box, are used on the promoted NFT on discovery page
// There is a whole big bunch of different 'states' so beware
const DiscoveryDetails = ({
  buyNowPriceNanos,
  nftEntryResponse,
  highBid,
  nftMinBidAmountNanos,
  lastAcceptedBidAmountNanos,
  hightestBidOwner,
  showPlaceABid,
  postContent,
  nftEntryResponses,
  decryptableNFTEntryResponses,
  mySerialNumbersNotForSale,
  nftBidData,
  editionIsBuyNow,
  availableSerialNumbers,
  editionForSale,
  editionHasBeenSold,
}) => {
    // Redux
  const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  // Redux end

  // Functions
  const compareBit = (minBid, maxBid, showPlaceABid): string => {
    if (!showPlaceABid && !!nftEntryResponses) {
      if (
        nftEntryResponse?.IsForSale === false &&
        nftEntryResponse?.LastAcceptedBidAmountNanos === 0 &&
        nftEntryResponse?.OwnerPublicKeyBase58Check ===
          postContent.PosterPublicKeyBase58Check
      ) {
        return "Owner";
      }
      return nftEntryResponse?.IsForSale === false
        ? "Last Sold for"
        : "Minimum Bid";
    } else {
      if (Number(maxBid) > 0) {
        return "Highest Bid";
      } else if (Number(maxBid) === 0) {
        return "Minimum Bid";
      }
    }
    return "";
  };

  const hasNFTsOnSale = (): boolean => {
    return (
      postContent?.IsNFT &&
      !!nftEntryResponses?.filter(
        (nftEntryResponse) =>
          nftEntryResponse.IsForSale &&
          nftEntryResponse.OwnerPublicKeyBase58Check ===
            loggedInUser?.PublicKeyBase58Check
      )?.length
    );
  };
  // Functions end

  // Dom manipulation
  const showElementBasedOnBidStatus = () => {
    let status = compareBit(
      nanosToDeSo(nftMinBidAmountNanos, 5),
      nanosToDeSo(highBid, 5),
      showPlaceABid
    );
    if (
      status === "Minimum Bid" &&
      showPlaceABid &&
      !decryptableNFTEntryResponses?.length
    ) {
      return (
        <div className="auction_detl">
          <span className="lb">AUCTION</span>
          <div className="val_sm mt-5px">Not started yet</div>
          <div className="val_st color-EE mt-5px">
            The 1st bid starts the auction.
          </div>
        </div>
      );
    } else if (status == "Highest Bid") {
      return (
        <div className="w-50 nft_done_by">
          <span className="lb">Made By</span>
          <div className="d-flex flex-center-start">
            {/* [avatar]="hightestBidOwner?.ProfileEntryResponse?.PublicKeyBase58Check" */}
            <div className="bid_by_avtar"></div>
            <div className="name">
              {/* [routerLink]="
                getRouterLink(['/' + globalVars.RouteNames.USER_PREFIX, hightestBidOwner?.ProfileEntryResponse?.Username])
                "
                queryParamsHandling="merge" */}
              <a className="fc-secalt val_sm">
                {hightestBidOwner?.ProfileEntryResponse?.Username}
              </a>
            </div>
          </div>
        </div>
      );
    } else if (
      status == "Last Sold for" &&
      !decryptableNFTEntryResponses?.length
    ) {
      return (
        <div className="auction_detl">
          <span className="lb">Owner</span>
          <div className="d-flex">
            {/* [avatar]="nftEntryResponse?.OwnerPublicKeyBase58Check" */}
            <div className="bid_by_avtar"></div>
          </div>
        </div>
      );
    } else if (status == "Owner") {
      return (
        <div className="auction_detl">
          <span className="lb">Status</span>
          <div className="val">Not For Sale</div>
          <div className="val_st">The NFT is currently Off the market.</div>
        </div>
      );
    }
  };

  const showUnlockableText = () => {
    if (
      !hasNFTsOnSale() &&
      postContent?.HasUnlockable &&
      mySerialNumbersNotForSale &&
      decryptableNFTEntryResponses?.length
    ) {
      return (
        <div className="auction_detl border_n_pd w-60">
          <span className="lb">UNLOCKABLE CONTENT</span>
          <div className="val">Unlocked!</div>
          <div className="val_st">
            You are the only one who can view the unlockable content of this
            NFT.
          </div>
        </div>
      );
    }
  };

  const showMadeBy = () => {
    if (nftBidData?.BidEntryResponses?.length > 0 && !showPlaceABid) {
      return (
        <div className="discovery-hgs">
          <span className="lb">Made By</span>
          <div className="d-flex">
            {/* [avatar]="hightestBidOwner?.ProfileEntryResponse?.PublicKeyBase58Check" */}
            <div className="bid_by_avtar"></div>
            <div className="name">
              {/* [routerLink]="
                getRouterLink(['/' + globalVars.RouteNames.USER_PREFIX, hightestBidOwner?.ProfileEntryResponse?.Username])
                "
                queryParamsHandling="merge" */}
              <a className="fc-secalt font-weight-bold">
                {hightestBidOwner?.ProfileEntryResponse?.Username}
              </a>
              {nftBidData?.BidEntryResponses[0]?.ProfileEntryResponse
                ?.IsVerified ? (
                <span className="ml-1 text-primary">
                  <i className="fas fa-check-circle fa-md align-middle"></i>
                </span>
              ) : null}
            </div>
          </div>
        </div>
      );
    }
  };

  const showBuyNowContent = () => {
    if (editionIsBuyNow && editionForSale) {
      return (
        <div>
          <span className="lb">Buy Now Price</span>
          <div className="val">
            {nanosToDeSo(buyNowPriceNanos, 5)}
            DESO
          </div>
          <div className="val_sm">{nanosToUSD(buyNowPriceNanos, 2)}</div>
        </div>
      );
    } else if (editionIsBuyNow && !editionForSale && editionHasBeenSold) {
      return (
        <div>
          <span className="lb">Last Sold For</span>
          <div className="val">
            {nanosToUSD(nftEntryResponse.LastAcceptedBidAmountNanos, 2)}
          </div>
          <div className="val_sm">
            {nanosToDeSo(nftEntryResponse.LastAcceptedBidAmountNanos, 5)}
            DESO
          </div>
        </div>
      );
    }
  };
  // Dom manipulation end

  return (
    <div className="w-100 discovery-hgs">
      <div className="w-50">
        {showBuyNowContent()}

        {!editionIsBuyNow && !decryptableNFTEntryResponses?.length ? (
          availableSerialNumbers?.length > 0 ? (
            <>
              <span className="lb">
                {compareBit(
                  nanosToDeSo(nftMinBidAmountNanos, 5),
                  nanosToDeSo(highBid, 5),
                  showPlaceABid
                )}
              </span>
              <div className="val">
                {highBid === 0
                  ? nanosToDeSo(nftMinBidAmountNanos, 5)
                  : nanosToDeSo(highBid, 5)} DESO
              </div>

              <div className="val_sm">
                {highBid === 0
                  ? nanosToUSD(nftMinBidAmountNanos, 2)
                  : nanosToUSD(highBid, 2)}
              </div>
            </>
          ) : (
            <>
              <span className="lb">
                {compareBit(
                  nanosToDeSo(nftMinBidAmountNanos, 5),
                  nanosToDeSo(highBid, 5),
                  showPlaceABid
                )}
              </span>
              <div className="val">
                {nanosToUSD(lastAcceptedBidAmountNanos, 2)}
              </div>

              <div className="val_sm">
                {nanosToDeSo(lastAcceptedBidAmountNanos, 5)} DESO
              </div>
            </>
          )
        ) : null}

        {decryptableNFTEntryResponses?.length ? (
          <div className="val">
            <span className="lb">Owner</span>
            <div className="owner_lft align-items-center d-flex">
              {/* [avatar]="nftEntryResponse?.OwnerPublicKeyBase58Check" */}
              <div className="bid_by_avtar"></div>
            </div>
          </div>
        ) : null}
      </div>

      {showMadeBy()}

      {showElementBasedOnBidStatus()}

      {showUnlockableText()}
    </div>
  );
};
export default DiscoveryDetails;
