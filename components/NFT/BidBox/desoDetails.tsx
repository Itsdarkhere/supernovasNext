import styles from "../../../styles/NFT/bidBox.module.scss";
import buyNowIcon from "../../../public/icons/buy-now-lightning.svg";
import circleErrorIcon from "../../../public/icons/circle-error.svg";
import unlockIcon from "../../../public/icons/unlock.svg";
import moneyIcon from "../../../public/icons/u_money-bill.svg";
import { nanosToDeSo, nanosToUSD } from "../../../utils/global-context";
import Image from "next/image";
import { useState } from "react";
import Avatar from "../../Reusables/avatar";
import Link from "next/link";
import { RouteNames } from "../../../utils/backendapi-context";

// This component displays all deso nft states in the nft profile
// Texts such as:
// Unlockable content, Highest bid, No bids yet etc...
// Buttons such as:
// Buy now, place a bid, cancel bid etc
// there's quite the bunch of them so beware
const DesoDetails = ({
  nftEntryResponse,
  buyNowPriceNanos,
  highBid,
  highestBidOwner,
  nftMinBidAmountNanos,
  editionForSale,
  ownsEdition,
  editionHasUnlockable,
  editionHasBeenSold,
  editionHasBids,
  editionIsBuyNow,
  buyNowEqualMinBid,
  editionHasBidByUser,
}) => {
  // State
  const [loadingEditionDetails, setLoadingEditionDetails] = useState(true);
  // State end
  return (
    <div>
      <div className="fs-15px w-100 nft_place_bid_sec overflow-hidden">
        {/* <loading-shimmer [tabType]="'NFT_DETAIL'" *ngIf="loadingEditionDetails"></loading-shimmer> 
                PUT BACK ,,, THIS WAS WHERE THE EMPTY DIV IS 
        */}
        {loadingEditionDetails ? (
          <div></div>
        ) : (
          <>
            <div className="d-flex nft_current_bid_tpwrapper">
              {!editionForSale && ownsEdition && editionHasUnlockable ? (
                <div className="w-100 d-flex flex-center">
                  <div className="auction_detl border_n_pd">
                    <span className="hq">UNLOCKABLE CONTENT</span>
                    <div className="val">Unlocked!</div>
                    <div className="val_st">
                      You are the only one who can view the unlockable content
                      of this NFT.
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {editionIsBuyNow ? (
                    editionForSale ? (
                      <div className="nft_current_bid_both">
                        <div className="buy_now_text_container">
                          <span className="hq">BUY NOW PRICE</span>
                          <div className="val">
                            {nanosToDeSo(buyNowPriceNanos, 5)}
                            DESO
                          </div>
                          <div className="val_st">
                            {nanosToUSD(buyNowPriceNanos, 2)}
                          </div>
                        </div>
                      </div>
                    ) : null
                  ) : (
                    <>
                      {editionForSale ? (
                        <>
                          <div className="nft_current_bid">
                            <div>
                              {!editionHasBids ? (
                                <span className="hq">MINIMUM BID</span>
                              ) : (
                                <span className="hq">HIGHEST BID</span>
                              )}

                              {/* <!-- FOR MIN AND HIGH BID--> */}
                              <div className="val">
                                {highBid === 0
                                  ? nanosToUSD(nftMinBidAmountNanos, 2)
                                  : nanosToUSD(highBid, 2)}
                              </div>
                              <div className="val_st">
                                {highBid === 0
                                  ? nanosToDeSo(nftMinBidAmountNanos, 5)
                                  : nanosToDeSo(highBid, 5)}
                                DESO
                              </div>
                            </div>
                          </div>
                          {editionHasBids ? (
                            <div className="nft_done_by">
                              <span className="hq">Made By</span>
                              <div className="d-flex">
                                <Avatar
                                  avatar={
                                    hightestBidOwner?.ProfileEntryResponse
                                      ?.PublicKeyBase58Check
                                  }
                                  classN="bid_by_avtar"
                                ></Avatar>
                                <div className="name">
                                  <Link
                                    href={
                                      "/" +
                                      RouteNames.USER_PREFIX +
                                      "/" +
                                      hightestBidOwner?.ProfileEntryResponse
                                        ?.Username
                                    }
                                  >
                                    <a className="fc-default font-weight-bold">
                                      {
                                        highestBidOwner?.ProfileEntryResponse
                                          ?.Username
                                      }
                                    </a>
                                  </Link>

                                  {hightestBidOwner?.ProfileEntryResponse
                                    ?.IsVerified ? (
                                    <span className="ml-1 text-primary">
                                      <i className="fas fa-check-circle fa-md align-middle"></i>
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </>
                      ) : null}
                      {editionHasBeenSold ? (
                        <div className="nft_current_bid">
                          <span className="hq">LAST SOLD FOR</span>
                          {/* <!-- FOR LAST SOLD FOR--> */}
                          <div className="val">
                            {nanosToUSD(
                              nftEntryResponse.LastAcceptedBidAmountNanos,
                              2
                            )}
                          </div>
                          <div className="val_st">
                            {nanosToDeSo(
                              nftEntryResponse.LastAcceptedBidAmountNanos,
                              5
                            )}
                            DESO
                          </div>
                        </div>
                      ) : null}
                    </>
                  )}

                  {editionForSale ? (
                    !editionIsBuyNow && !editionHasBids ? (
                      <div className="auction_detl">
                        <span className="hq">AUCTION</span>
                        <div className="val">Not started yet</div>
                        <div className="val_st">
                          The 1st bid starts the auction.
                        </div>
                      </div>
                    ) : null
                  ) : (
                    <>
                      {!(ownsEdition && editionHasUnlockable) ? (
                        <div className="auction_detl">
                          <span className="hq">Owner</span>
                          <div className="d-flex">
                            <Avatar
                              avatar={
                                nftEntryResponse?.OwnerPublicKeyBase58Check
                              }
                              classN="bid_by_avtar"
                            ></Avatar>
                          </div>
                        </div>
                      ) : null}

                      {!editionHasBeenSold ? (
                        <div className="auction_detl_status">
                          <span className="hq">Status</span>
                          <div className="val">Not For Sale</div>
                          <div className="val_st">
                            The NFT is currently Off the market.
                          </div>
                        </div>
                      ) : null}
                    </>
                  )}
                </>
              )}
            </div>

            {/* <!-- BUTTONS FOR NFT PROFILE BOX --> */}
            <div>
              {ownsEdition ? (
                <div className="d-flex flex-wrap justify-content-between">
                  {editionForSale ? (
                    editionHasBids ? (
                      <div className="feed_post_btn_grp d-flex flex-wrap w-100 justify-content-between">
                        <button
                          onClick={() => sellYourBid()}
                          className="btn blk_fill_btn with_ico small"
                        >
                          <i>
                            <Image src={moneyIcon} alt="" />
                          </i>
                          Sell your NFT
                        </button>
                        <button
                          onClick={() => closeYourAuction()}
                          className="btn blk_line_btn with_ico small"
                        >
                          <i>
                            <Image src={circleErrorIcon} alt="" />
                          </i>
                          Close the auction
                        </button>
                      </div>
                    ) : (
                      <button className="btn blk_line_btn with_ico big">
                        <i>
                          <Image src={circleErrorIcon} alt="" />
                        </i>
                        Close the auction
                      </button>
                    )
                  ) : editionHasUnlockable ? (
                    <>
                      <button
                        onClick={(e) => ViewUnlockableContent(e)}
                        className="btn nft_place_bid_btn nft_sale_btn"
                      >
                        <i>
                          <Image src={unlockIcon} alt="lock icon" />
                        </i>
                        View unlockable content
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={(e) => openCreateNFTAuctionModal(e)}
                        className="btn nft_place_bid_btn"
                      >
                        Put NFT for sale
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="d-flex flex-wrap justify-content-between">
                  {editionForSale ? (
                    <>
                      {editionHasBidByUser ? (
                        <div className="w-100 d-flex flex-row flex-center">
                          <button
                            onClick={(e) => openPlaceBidModal(e)}
                            className="btn blk_line_btn with_ico buy_now_btn mw-250"
                          >
                            Place new bid
                          </button>
                          <button
                            onClick={(e) => onBidCancel(e)}
                            className="btn blk_line_btn place_bid_btn_both mw-250"
                          >
                            Cancel your bid
                          </button>
                        </div>
                      ) : editionIsBuyNow ? (
                        buyNowEqualMinBid ? (
                          <div className="w-100 d-flex flex-center">
                            <button
                              onClick={(e) => openBuyNowModal(e)}
                              className="btn blk_line_btn with_ico big buy_now_btn"
                            >
                              <i>
                                <Image
                                  src={buyNowIcon}
                                  alt="Lightning icon"
                                  className="buy_now_img"
                                />
                              </i>
                              Buy Now
                            </button>
                          </div>
                        ) : (
                          <div className="w-100 d-flex flex-row flex-center">
                            <button
                              onClick={(e) => openBuyNowModal(e)}
                              className="btn blk_line_btn with_ico buy_now_btn mw-250"
                            >
                              <i>
                                <Image
                                  src={buyNowIcon}
                                  alt="Lightning icon"
                                  className="buy_now_img"
                                />
                              </i>
                              Buy Now
                            </button>
                            <button
                              onClick={(e) => openPlaceBidModal(e)}
                              className={[
                                "btn blk_line_btn place_bid_btn_both mw-250",
                                isQuotedContent ? "mt-15px" : "",
                              ].join(" ")}
                            >
                              Place a bid
                            </button>
                          </div>
                        )
                      ) : (
                        <>
                          <button onClick={(e) => openPlaceBidModal(e)} className="btn nft_place_bid_btn">
                            Place your Bid
                          </button>
                        </>
                      )}
                    </>
                  ) : null}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default DesoDetails;
