import styles from "../../../styles/NFT/bidBox.module.scss";
import buyNowIcon from "../../../public/icons/buy-now-lightning.svg";
import circleErrorIcon from "../../../public/icons/circle-error.svg";
import Image from "next/image";
import { useState } from "react";
import { useAppSelector } from "../../../utils/Redux/hooks";

const ETHDetails = ({
  ethNFTOwnerWalletAddress,
  ethNFTCreatorWalletAddress,
  ethNFTCreatorDesoProfile,
  ethNFTOwnerDesoPublicKey,
}) => {
  // Redux
  const isEthereumNFTForSale = useAppSelector((state) => state.imx.isEthereumNFTForSale);
  // Redux end

  // State
  const [ethereumNFTSalePrice, setEthereumNFTSalePrice] = useState(null);
  const [ownsEthNFT, setOwnsEthNFT] = useState(false);
  const [loadingEthNFTDetails, setLoadingEthNFTDetails] = useState(true);
  // State end
  return (
    <div className="fs-15px w-100 nft_place_bid_sec overflow-hidden">
      {/* <loading-shimmer [tabType]="'NFT_DETAIL'" *ngIf="loadingEthNFTDetails"></loading-shimmer>  
                THIS WAS WHERE THE EMPTY DIV IS 
                PUT BACK
      */}
      {loadingEthNFTDetails ? (
        <div></div>
      ) : (
        <>
          {isEthereumNFTForSale ? (
            <div>
              {/* <!-- if the wallet owns the nft and the sale is active --> */}
              {ownsEthNFT ? (
                <div className="d-flex flex-wrap justify-content-between">
                  <div className={styles.nft_current_bid_both}>
                    <div className="buy_now_text_container">
                      <span className="hq">BUY NOW PRICE</span>
                      <div className="val">
                        {ethereumNFTSalePrice}
                        ETH
                      </div>
                    </div>
                  </div>
                  {/* (click)="closeYourETHAuction()" */}
                  <button className="btn blk_line_btn with_ico big">
                    <i>
                      <Image src={circleErrorIcon} alt="circle error icon" />
                    </i>
                    Close the auction
                  </button>
                </div>
              ) : (
                <div className="d-flex flex-wrap justify-content-between">
                  <div className="nft_current_bid_both">
                    <div className="buy_now_text_container">
                      <span className="hq">BUY NOW PRICE</span>
                      <div className="val">
                        {ethereumNFTSalePrice}
                        ETH
                      </div>
                    </div>
                  </div>

                  <div className="w-100 d-flex flex-center">
                    {/* (click)="openBuyNowModal($event)" */}
                    <button className="btn blk_line_btn with_ico big buy_now_btn">
                      <i>
                        <Image
                          src={buyNowIcon}
                          alt="lightning icon"
                          className="buy_now_img"
                        />
                      </i>
                      Buy Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="d-flex nft_current_bid_tpwrapper">
              <div className="auction_detl_status">
                <span className="hq">Status</span>
                <div className="val">Not For Sale</div>
                <div className="val_st">
                  The NFT is currently Off the market.
                </div>
              </div>

              <div className="auction_detl">
                <span className="hq">Owner</span>
                {ethNFTOwnerWalletAddress === "-" ? (
                  <div className="d-flex">
                    {/* [avatar]="this.ethNFTCreatorDesoPublicKey" */}
                    {ethNFTCreatorDesoProfile ? (
                      <div className="bid_by_avtar"></div>
                    ) : (
                      <p className="eth-provenance-row-text-mobile">
                        {ethNFTCreatorWalletAddress}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="d-flex">
                    {/*[avatar]="this.ethNFTOwnerDesoPublicKey"*/}
                    {ethNFTOwnerDesoPublicKey ? (
                      <div className="bid_by_avtar"></div>
                    ) : (
                      <p className="eth-provenance-row-text-mobile">
                        {ethNFTOwnerWalletAddress}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* <!-- own NFT, but it is not for sale, give them the option to list it --> */}
          {/* check works ,,, */}
          {!isEthereumNFTForSale && ownsEthNFT ? (
            <div className="d-flex nft_current_bid_tpwrapper put-nft-for-sale-container">
              <div className="d-flex flex-wrap justify-content-between">
                {/*(click)="openCreateETHNFTAuctionModal($event)"*/}
                <button className="btn nft_place_bid_btn">
                  Put NFT for sale
                </button>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};
export default ETHDetails;
