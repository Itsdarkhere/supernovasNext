import { useState } from "react";
import styles from "../styles/nftCard.module.scss";
import NFTCardUnavailable from "./nftCardUnavailable";
import * as _ from "lodash";
import {
  NFTEntryResponse,
  PostEntryResponse,
  DecryptUnlockableTexts,
} from "../../utils/backendapi-context";
import {
  hasUserBlockedCreator,
  setImxWalletAddress,
  localNode,
  loggedInUser,
} from "../../utils/global-context";
import { GetNFTEntriesForNFTPost } from "../../utils/backendapi-context";
import { ethers } from "ethers";
import NFTCardMedia from "./nftCardMedia";
import NFTCardQuoted from "./nftCardQuoted";
import NFTCardCaption from "./nftCardCaption";
import NFTCardBidInfo from "./nftCardBidInfo";
import NFTCardFooter from "./nftCardFooter";
// Missing top bar from the angular version
const NFTCard = ({
  hoverable,
  insidePost,
  marketplaceCard,
  post,
  contentShouldLinkToThread,
  isQuotedCard,
  profileFeed,
  pending,
  showIconRow,
  showQuotedContent,
  loadProfile,
}) => {
  // Vars
  let nftEntryResponses: NFTEntryResponse[];
  let decryptableNFTEntryResponses: NFTEntryResponse[];
  let availableSerialNumbers: NFTEntryResponse[];
  let myAvailableSerialNumbers: NFTEntryResponse[];
  // Vars end
  // State
  const [mobile, setMobile] = useState(false);
  const [reposterProfile, setReposterProfile] = useState(null);
  const [quotedContent, setQuotedContent] = useState(null);
  const [postContent, setPostContent] = useState(null);
  const [basePost, setBasePost] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [hidingPost, setHidingPost] = useState(false);
  const [constructedEmbedURL, setConstructedEmbedURL] = useState("");
  const [showAudioTypeIcon, setShowAudioTypeIcon] = useState(true);
  const [creatorProfile, setCreatorProfile] = useState(null);
  const [showPlaceABid, setShowPlaceABid] = useState(false);
  const [isBuyNow, setIsBuyNow] = useState(false);
  const [buyNowPriceNanos, setBuyNowPriceNanos] = useState(null);
  const [isForSale, setIsForSale] = useState(false);
  // Price info
  const [highBid, setHighBid] = useState(null);
  const [lowBid, setLowBid] = useState(null);
  const [minBid, setMinBid] = useState(null);
  const [lastSalePrice, setLastSalePrice] = useState(null);
  // Eth state
  const [isEthOwner, setIsEthOwner] = useState(false);
  const [isEthereumNFTForSale, setIsEthereumNFTForSale] = useState(false);
  const [ethPublicKeyNoDesoProfile, setEthPublicKeyNoDesoProfile] =
    useState("");
  const [ethereumNFTSalePrice, setEthereumNFTSalePrice] = useState(null);
  // State end

  // Lifecycle methods
  useState(() => {
    setPost(post);
  }, []);

  // Lifecycle methods end

  // Functions
  const setPost = (postEntry: PostEntryResponse) => {
    setBasePost(postEntry);
    if (isRepost(postEntry)) {
      setPostContent(postEntry.RepostedPostEntryResponse);
      setReposterProfile(postEntry.ProfileEntryResponse);
      if (isQuotedClout(postEntry.RepostedPostEntryResponse)) {
        setQuotedContent(postContent.RepostedPostEntryResponse);
      }
    } else if (isQuotedClout(postEntry)) {
      setPostContent(postEntry);
      setQuotedContent(postEntry.RepostedPostEntryResponse);
    } else {
      setPostContent(postEntry);
    }
    // put back
    // this.setEmbedURLForPostContent();
    if (postContent?.ImageURLs?.length > 0) {
      changeImageURLs(postContent.ImageURLs[0]);
    }
  };

  const getNFTEntries = () => {
    GetNFTEntriesForNFTPost(
      localNode,
      loggedInUser?.PublicKeyBase58Check,
      postContent.PostHashHex
    ).subscribe((res) => {
      nftEntryResponses = res.NFTEntryResponses;
      if (nftEntryResponses[0]) {
        setIsBuyNow(nftEntryResponses[0]?.IsBuyNow);
        setBuyNowPriceNanos(nftEntryResponses[0].BuyNowPriceNanos);
      }
      nftEntryResponses.sort((a, b) => a.SerialNumber - b.SerialNumber);
      decryptableNFTEntryResponses = nftEntryResponses.filter(
        (sn) =>
          sn.OwnerPublicKeyBase58Check === loggedInUser?.PublicKeyBase58Check &&
          sn.EncryptedUnlockableText &&
          sn.LastOwnerPublicKeyBase58Check
      );
      if (decryptableNFTEntryResponses.length) {
        DecryptUnlockableTexts(
          loggedInUser?.PublicKeyBase58Check,
          decryptableNFTEntryResponses
        ).subscribe((res) => (decryptableNFTEntryResponses = res));
      }
      availableSerialNumbers = nftEntryResponses.filter(
        (nftEntryResponse) => nftEntryResponse.IsForSale
      );
      myAvailableSerialNumbers = availableSerialNumbers.filter(
        (nftEntryResponse) =>
          nftEntryResponse.OwnerPublicKeyBase58Check ===
          loggedInUser?.PublicKeyBase58Check
      );
      setShowPlaceABid(
        !!(availableSerialNumbers.length - myAvailableSerialNumbers.length)
      );
      setIsForSale(availableSerialNumbers.length > 0);
      setHighBid(
        _.maxBy(availableSerialNumbers, "HighestBidAmountNanos")
          ?.HighestBidAmountNanos || 0
      );
      setLowBid(
        _.minBy(availableSerialNumbers, "HighestBidAmountNanos")
          ?.HighestBidAmountNanos || 0
      );
      setMinBid(
        _.maxBy(availableSerialNumbers, "MinBidAmountNanos")
          ?.MinBidAmountNanos || 0
      );
      if (!showPlaceABid) {
        if (nftEntryResponses[0]?.LastAcceptedBidAmountNanos >= 0) {
          setLastSalePrice(nftEntryResponses[0]?.LastAcceptedBidAmountNanos);
        } else {
          setLastSalePrice(0);
        }
      }
    });
  };

  async function checkEthNFTOwner() {
    const options = { method: "GET", headers: { Accept: "application/json" } };

    let res = await fetch(
      `${process.env.NEXT_PUBLIC_MAINNET_ENV_URL}/assets/${process.env.NEXT_PUBLIC_TOKEN_ADDRESS}/${this.postContent.PostExtraData.tokenId}`,
      options
    );

    res = await res.json();

    setEthPublicKeyNoDesoProfile(res["user"]);
    setEthPublicKeyNoDesoProfile(
      this.ethPublicKeyNoDesoProfile.slice(0, 15) + "..."
    );
    setImxWalletAddress(localStorage.getItem("address"));

    if (res["user"] === this.globalVars.imxWalletAddress) {
      setIsEthOwner(true);
    } else {
      setIsEthOwner(false);
    }
  }

  async function updateEthNFTForSaleStatus() {
    const options = { method: "GET", headers: { Accept: "*/*" } };

    let res = await fetch(
      `${process.env.NEXT_PUBLIC_MAINNET_ENV_URL}/orders?status=active&sell_token_address=${process.env.NEXT_PUBLIC_TOKEN_ADDRESS}`,
      options
    );

    res = await res.json();

    for (var i = 0; i < res["result"].length; i++) {
      if (
        this.postContent.PostExtraData.tokenId ==
        res["result"][i]["sell"]["data"]["token_id"]
      ) {
        this.isEthereumNFTForSale = true;
        // Check works
        setEthereumNFTSalePrice(res["result"][i]["buy"]["data"]["quantity"]);
        setEthereumNFTSalePrice(
          ethers.utils.formatEther(this.ethereumNFTSalePrice)
        );
      }
    }

    console.log("upadated ETH NFT for Sale Status");

    // determine if you own it, if not then say which eth wallet owns it
  }

  const isRepost = (post: any): boolean => {
    return (
      post.Body === "" &&
      (!post.ImageURLs || post.ImageURLs?.length === 0) &&
      post.RepostedPostEntryResponse
    );
  };

  // Check if its a quote repost
  const isQuotedClout = (post: any): boolean => {
    return (
      (post.Body !== "" || post.ImageURLs?.length > 0) &&
      post.RepostedPostEntryResponse
    );
  };

  // Change image url, either to use bitclout stuff or cloudflare img cdn...
  const changeImageURLs = (url: string): string => {
    if (url.startsWith("https://i.imgur.com")) {
      return url.replace(
        "https://i.imgur.com",
        "https://images.bitclout.com/i.imgur.com"
      );
    } else if (url.startsWith("https://arweave.net/")) {
      // Build cloudflare imageString
      url =
        "https://supernovas.app/cdn-cgi/image/height=500,fit=scale-down,quality=85/" +
        url;
    }
    setImageURL(url);
  };

  const showCardOrUnavailable = () => {
    // put back
    return (
      !basePost.IsHidden &&
      !allCopiesBurned() &&
      !hidingPost &&
      !hasUserBlockedCreator(postContent.PosterPublicKeyBase58Check)
    );
  };

  const allCopiesBurned = () => {
    if (basePost.NumNFTCopies === 0 && basePost.NumNFTCopiesBurned === 0) {
      return false;
    }
    return basePost.NumNFTCopiesBurned === basePost.NumNFTCopies;
  };
  // Functions end

  return (
    <div
      className={[
        styles.single_card,
        !hoverable && !mobile ? styles.hover_icons : "",
        !hoverable && !reposterProfile && mobile
          ? styles.mobile_icons_visible
          : "",
        postContent.IsHidden || allCopiesBurned() ? "br-0px" : "",
        insidePost ? styles.card_diff_width : "",
        marketplaceCard ? styles.marketplaceCard : "",
      ].join(" ")}
    >
      <div className="w-100">
        {/* If Unavailable show one of the unavailable options, otherwise the card */}
        {showCardOrUnavailable() ? (
          <div className="d-flex flex-column js-feed-post position-relative">
            {/* (click)="onPostClicked($event)" */}
            <a
              className={[
                "link--unstyled",
                contentShouldLinkToThread ? "cursor-inherit" : "",
              ].join(" ")}
            >
              <div className="card_body">
                {/* All the media of the card */}
                <NFTCardMedia
                  postContent={postContent}
                  constructedEmbedURL={constructedEmbedURL}
                  isQuotedCard={isQuotedCard}
                  showAudioTypeIcon={showAudioTypeIcon}
                  imageURL={imageURL}
                ></NFTCardMedia>

                {/* If card quotes something... */}
                {quotedContent?.IsNFT && profileFeed ? (
                  <NFTCardQuoted
                    quotedContent={quotedContent}
                    hoverable={hoverable}
                    contentShouldLinkToThread={contentShouldLinkToThread}
                    showQuotedContent={showQuotedContent}
                  ></NFTCardQuoted>
                ) : null}

                {/* QUOTING CARD WAS HERE ,,, Needs feed post */}

                {/* Card caption, so NFT name, creator name etc */}
                {!(quotedContent?.IsNFT && profileFeed) ? (
                  <NFTCardCaption
                    postContent={postContent}
                    loadProfile={loadProfile}
                    creatorProfile={creatorProfile}
                  ></NFTCardCaption>
                ) : null}

                {/* Bidding related info, also the bottom most part of the card. (Hover excluded & mobile excluded) */}
                <NFTCardBidInfo
                  showPlaceABid={showPlaceABid}
                  postContent={postContent}
                  pending={pending}
                  creatorProfile={creatorProfile}
                  loadProfile={loadProfile}
                  isEthOwner={isEthOwner}
                  isEthereumNFTForSale={isEthereumNFTForSale}
                  ethPublicKeyNoDesoProfile={ethPublicKeyNoDesoProfile}
                  ethereumNFTSalePrice={ethereumNFTSalePrice}
                  isBuyNow={isBuyNow}
                  isForSale={isForSale}
                  buyNowPriceNanos={buyNowPriceNanos}
                  nftEntryResponses={nftEntryResponses}
                  minBid={minBid}
                  highBid={highBid}
                  lastSalePrice={lastSalePrice}
                ></NFTCardBidInfo>

                {/* Card footer, contains the engagement metrics */}
                <NFTCardFooter
                  postContent={postContent}
                  showIconRow={showIconRow}
                ></NFTCardFooter>
              </div>
            </a>
          </div>
        ) : (
          <NFTCardUnavailable></NFTCardUnavailable>
        )}
      </div>
    </div>
  );
};
export default NFTCard;
