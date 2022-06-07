import styles from "../../../styles/SmallNFTCard/smallNFTCard.module.scss";
import NFTCardMedia from "../NFTCard/nftCardMedia";

const SmallNFTCard = () => {

    // (click)="onPostClicked($event)"
    //     [ngClass]="{ 'selected-border': selectedBorder }"
    //     *ngIf="!post?.PostExtraData.isEthereumNFT"
    return (
        <>
        <div
        className={styles.small_card_wrapper}
        >
        <NFTCardMedia
            postContent={postContent}
            constructedEmbedURL={constructedEmbedURL}
            isQuotedCard={isQuotedCard}
            showAudioTypeIcon={showAudioTypeIcon}
            imageURL={imageURL}
        ></NFTCardMedia>

                    {/* [ngClass]="isForSale ? 'colors-for-sale' : 'colors-sold'" */}
        <div className={styles.small_card_details}>
            {/* *ngIf="post.PostExtraData?.name" */}
            <p className="font-weight-semibold">
            { post.PostExtraData?.name }
            </p>
            {/* *ngIf="!post.PostExtraData?.name" */}
            <p className="">{ post.Body }</p>
            <div className="d-flex flex-row">
            <span>
                { compareBit(globalVars.nanosToDeSo(minBid, 5), globalVars.nanosToDeSo(highBid, 5), showPlaceABid) }
            </span>
            {/* *ngIf="isForSale" */}
            <span className={styles.small_card_bid_size}>
                { highBid === 0 ? globalVars.nanosToDeSo(minBid, 5) : globalVars.nanosToDeSo(highBid, 5) } DESO
            </span>
            {/* *ngIf="!isForSale" */}
            <span className={styles.small_card_bid_size}>
                { globalVars.nanosToDeSo(lastSalePrice, 5) } DESO
            </span>
            </div>
        </div>
        </div>

        {/*<!-- ETH small card -->*/}
        {/* (click)="onPostClicked($event)" *ngIf="post?.PostExtraData.isEthereumNFT" */}
        <div className={styles.small_card_wrapper}>

            <NFTCardMedia
                postContent={postContent}
                constructedEmbedURL={constructedEmbedURL}
                isQuotedCard={isQuotedCard}
                showAudioTypeIcon={showAudioTypeIcon}
                imageURL={imageURL}
            ></NFTCardMedia>
            
            </div>
            {/* [ngClass]="isEthereumNFTForSale ? 'colors-for-sale' : 'colors-sold'" */}
             <div className={styles.small_card_details}>
                {/* *ngIf="post.PostExtraData?.name" */}
                <p className="font-weight-semibold">
                { post.PostExtraData?.name }
                </p>
                {/* *ngIf="!post.PostExtraData?.name" */}
                <p className="">{ post.Body }</p>
                <div className="d-flex flex-row">
                    {/* *ngIf="!isEthereumNFTForSale" */}
                <span>Not for sale</span>
                {/* *ngIf="isEthereumNFTForSale" */}
                <span>Buy Now</span>
                {/* *ngIf="isEthereumNFTForSale" */}
                <span className={styles.small_card_bid_size}>{ ethereumNFTSalePrice } ETH</span>
            </div>
            </div>
        </div>
        </>
    )
}

export default SmallNFTCard;