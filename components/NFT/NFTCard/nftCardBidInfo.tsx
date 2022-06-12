import styles from "../../../styles/NFT/NFTCard/nftCard.module.scss";
import buyNowIcon from "../../../public/icons/buy_now_card_icon.svg";
import { nanosToDeSo } from "../../../utils/global-context";
import Image from "next/image";
import Link from "next/link";
import Avatar from "../../Reusables/avatar";
import { RouteNames } from "../../../utils/backendapi-context";

// This component is used to show:
// The information about price, edition, buy now etc on the nftCard
// This is also the bottom most part of the card, if hover states are not included
const NFTCardBidInfo = ({
  showPlaceABid,
  postContent,
  pending,
  isEthereumNFTForSale,
  creatorProfile,
  loadProfile,
  isEthOwner,
  ethPublicKeyNoDesoProfile,
  ethereumNFTSalePrice,
  isBuyNow,
  isForSale,
  buyNowPriceNanos,
  nftEntryResponses,
  minBid,
  highBid,
  lastSalePrice,
}) => {
  // Functions
  const compareBit = (minBid, maxBid, showPlaceABidBool): string => {
    if (!showPlaceABidBool && !!nftEntryResponses) {
      return nftEntryResponses[0]?.IsForSale === false
        ? "Last sold for"
        : "Minimum Bid";
    } else {
      if (Number(maxBid) > 0) {
        return "Highest Bid";
      } else if (Number(maxBid) === 0) {
        return "Minimum Bid";
      }
    }
  };

  const forSale = () => {
    if (nftEntryResponses) {
      return nftEntryResponses[0]?.IsForSale;
    }
  };
  // Functions end

  // Dom manipulation
  const getSectionBasedOnChainAndSaleStatus = () => {
    // Is not eth ( so its deso )
    if (!postContent?.PostExtraData?.isEthereumNFT) {
      if (postContent?.IsNFT && !pending) {
        // Basically deso nft not pending
        return (
          <div
            className={[
              styles.bid_cover,
              "flex-wrap",
              showPlaceABid || forSale()
                ? styles.colors_not_sold
                : styles.colors_sold,
            ].join(" ")}
          >
            <div className={styles.bid_row}>
              <div className={styles.bid_inner_row}>
                {isBuyNow && isForSale ? (
                  <div className={styles.bid_col}>
                    <p className={styles.p_lighter}>Price</p>
                    <div className="d-flex flex-row overflow-hidden">
                      <p
                        className={
                          styles.overflow_ellipsis_price_50_percent +
                          " font-weight-semiboldn"
                        }
                      >
                        {nanosToDeSo(buyNowPriceNanos, 5)}
                      </p>
                      <p className="font-weight-semiboldn">DESO</p>
                    </div>
                  </div>
                ) : (
                  <div className={styles.bid_col}>
                    <p className={styles.p_lighter}>
                      {compareBit(
                        nanosToDeSo(minBid, 5),
                        nanosToDeSo(highBid, 5),
                        showPlaceABid
                      )}
                    </p>

                    {isForSale ? (
                      <div className="d-flex flex-row">
                        <p
                          className={
                            styles.overflow_ellipsis_price +
                            " font-weight-semiboldn"
                          }
                        >
                          {highBid === 0
                            ? nanosToDeSo(minBid, 5)
                            : nanosToDeSo(highBid, 5)}
                        </p>
                        <p className="font-weight-semiboldn">DESO</p>
                      </div>
                    ) : (
                      <div className="d-flex flex-row">
                        <p
                          className={
                            styles.overflow_ellipsis_price +
                            " font-weight-semiboldn"
                          }
                        >
                          {nanosToDeSo(lastSalePrice, 5)}
                        </p>
                        <p className="font-weight-semiboldn">DESO</p>
                      </div>
                    )}
                  </div>
                )}

                {isBuyNow && isForSale ? (
                  <div className={styles.bid_buy_now}>
                    <button className={styles.nft_card_buy_now_button}>
                      <Image height={15} src={buyNowIcon} alt="lightning" />
                      Buy Now
                    </button>
                  </div>
                ) : (
                  <div className={styles.bid_col}>
                    <p className={styles.p_lighter}>Edition of</p>
                    <p className="font-weight-bold">
                      {postContent.NumNFTCopies -
                        postContent.NumNFTCopiesBurned}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      } else if (postContent.IsNFT && pending) {
        // Deso nft pending...
        return (
          <div
            className={[
              styles.bid_cover,
              styles.colors_sold,
              "flex-row justify-content-space-between",
            ].join(" ")}
          >
            <>
              <div className={styles.bid_col}>
                <p className={styles.p_lighter + " fs-13px"}>Edition of</p>
                <p className="font-weight-semiboldn color-white">
                  {postContent.NumNFTCopies}
                </p>
              </div>
            </>
            <button
              onClick={(e) => openAcceptModal(e)}
              className={styles.accept_transfer}
            >
              Accept transfer
            </button>
          </div>
        );
      }
      // Is eth
    } else {
      // is for sale
      if (isEthereumNFTForSale) {
        return (
          <div
            className={
              styles.bid_cover +
              " " +
              styles.colors_not_sold +
              " " +
              styles.is_ethereum_nft
            }
          >
            <div className={styles.bid_row}>
              <div className={styles.bid_inner_row}>
                <>
                  <div className={styles.bid_col}>
                    <p
                      className={
                        styles.eth_price_text_align_left +
                        " " +
                        styles.p_lighter
                      }
                    >
                      Price
                    </p>
                    <div className="d-flex flex-row overflow-hidden">
                      <p
                        className={
                          styles.overflow_ellipsis_price_50_percent +
                          " font-weight-semiboldn"
                        }
                      >
                        {ethereumNFTSalePrice}
                      </p>
                      <p className="font-weight-semiboldn">ETH</p>
                    </div>
                  </div>
                </>
                <>
                  <div className={styles.bid_col_buy_now}>
                    <button className={styles.nft_card_buy_now_button}>
                      <Image height={"50%"} src={buyNowIcon} alt="lightning" />
                      Buy Now
                    </button>
                  </div>
                </>
              </div>
            </div>
          </div>
        );
      } else if (!isEthereumNFTForSale) {
        // Not for sale
        return (
          <div
            className={[
              styles.bid_cover,
              styles.eth_nft_not_for_sale_container,
              styles.is_ethereum_nft_not_for_sale,
            ].join(" ")}
          >
            <p className={styles.eth_nft_not_for_sale_text}>OWNER</p>

            {/* Has or has not an eth wallet */}
            {isEthOwner ? (
              <div className={styles.eth_nft_not_for_sale_owner_container}>
                <div
                  className={styles.card_header}
                  style={{ borderBottom: "0px" }}
                >
                  <div className={styles.profile_img}>
                    <Link
                      href={
                        "/" + RouteNames.USER_PREFIX + "/" + loadProfile
                          ? creatorProfile?.Username
                          : postContent.ProfileEntryResponse?.Username
                      }
                    >
                      <Avatar
                        classN=""
                        avatar={postContent.PosterPublicKeyBase58Check}
                      ></Avatar>
                    </Link>
                  </div>
                </div>
                <div className="d-flex flex-column">
                  {/* [routerLink]="[
                      '/' + globalVars.RouteNames.USER_PREFIX,
                      loadProfile ? this.creatorProfile?.Username : postContent.ProfileEntryResponse?.Username
                    ]" */}
                  <Link
                    href={
                      "/" + RouteNames.USER_PREFIX + "/" + loadProfile
                        ? creatorProfile?.Username
                        : postContent.ProfileEntryResponse?.Username
                    }
                  >
                    <div className={styles.username_nft_card}>
                      {loadProfile
                        ? creatorProfile?.Username
                        : postContent.ProfileEntryResponse?.Username}
                      {loadProfile ? (
                        creatorProfile?.IsVerified
                      ) : postContent.ProfileEntryResponse?.IsVerified ? (
                        <i className="fas fa-check-circle pl-5px fa-md text-primary"></i>
                      ) : null}
                    </div>
                  </Link>
                </div>
              </div>
            ) : (
              <div className={styles.eth_nft_not_for_sale_owner_container}>
                <div className="d-flex flex-column">
                  <p className={styles.eth_nft_not_for_sale_owner_text}>
                    {ethPublicKeyNoDesoProfile}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      }
    }
  };
  // Dom manipulation end

  // Default return
  return <div>{getSectionBasedOnChainAndSaleStatus()}</div>;
};
export default NFTCardBidInfo;
