import styles from "../../../styles/SmallNFTCard/smallNFTCard.module.scss";
import NFTCardMedia from "../NFTCard/nftCardMedia";

const SmallNFTCard = () => {
  return (
    <>
      {!post?.PostExtraData.isEthereumNFT ? (
        <div
          onClick={(e) => onPostClicked(e)}
          className={[
            styles.small_card_wrapper,
            selectedBorder ? "selected-border" : "",
          ].join(" ")}
        >
          <NFTCardMedia
            postContent={postContent}
            constructedEmbedURL={constructedEmbedURL}
            isQuotedCard={isQuotedCard}
            showAudioTypeIcon={showAudioTypeIcon}
            imageURL={imageURL}
          ></NFTCardMedia>
          <div
            className={[
              styles.small_card_details,
              isForSale ? "colors-for-sale" : "colors-sold",
            ].join(" ")}
          >
            {post.PostExtraData?.name ? (
              <p className="font-weight-semibold">{post.PostExtraData?.name}</p>
            ) : (
              <p className="">{post.Body}</p>
            )}
            <div className="d-flex flex-row">
              <span>
                {compareBit(
                  nanosToDeSo(minBid, 5),
                  nanosToDeSo(highBid, 5),
                  showPlaceABid
                )}
              </span>
              {isForSale ? (
                <span className={styles.small_card_bid_size}>
                  {highBid === 0
                    ? nanosToDeSo(minBid, 5)
                    : nanosToDeSo(highBid, 5)}{" "}
                  DESO
                </span>
              ) : (
                <span className={styles.small_card_bid_size}>
                  {nanosToDeSo(lastSalePrice, 5)} DESO
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={(e) => onPostClicked(e)}
          className={styles.small_card_wrapper}
        >
          <NFTCardMedia
            postContent={postContent}
            constructedEmbedURL={constructedEmbedURL}
            isQuotedCard={isQuotedCard}
            showAudioTypeIcon={showAudioTypeIcon}
            imageURL={imageURL}
          ></NFTCardMedia>

          <div
            className={[
              styles.small_card_details,
              isEthereumNFTForSale ? "colors-for-sale" : "colors-sold",
            ].join(" ")}
          >
            {post.PostExtraData?.name ? (
              <p className="font-weight-semibold">{post.PostExtraData?.name}</p>
            ) : (
              <p className="">{post.Body}</p>
            )}

            <div className="d-flex flex-row">
              {!isEthereumNFTForSale ? (
                <span>Not for sale</span>
              ) : (
                <span>Buy Now</span>
              )}
            </div>
            {isEthereumNFTForSale ? (
              <span className={styles.small_card_bid_size}>
                {ethereumNFTSalePrice} ETH
              </span>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default SmallNFTCard;
