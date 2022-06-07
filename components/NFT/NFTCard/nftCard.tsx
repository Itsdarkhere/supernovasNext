import { useState, useEffect } from "react";
import styles from "../../../styles/NFT/NFTCard/nftCard.module.scss";
import NFTCardUnavailable from "./nftCardUnavailable";
import * as _ from "lodash";
import {
  NFTEntryResponse,
  PostEntryResponse,
  DecryptUnlockableTexts,
  AdminUpdateGlobalFeed,
  AdminPinPost,
  parsePostError,
  stringifyError,
  BlockPublicKey,
  SubmitPost,
} from "../../../utils/backendapi-context";
import {
  getTargetComponentSelector,
  hasUserBlockedCreator, _alertError,
} from "../../../utils/global-context";
import { GetNFTEntriesForNFTPost } from "../../../utils/backendapi-context";
import { ethers } from "ethers";
import NFTCardMedia from "./nftCardMedia";
import NFTCardQuoted from "./nftCardQuoted";
import NFTCardCaption from "./nftCardCaption";
import NFTCardBidInfo from "./nftCardBidInfo";
import NFTCardFooter from "./nftCardFooter";
import { useAppSelector, useAppDispatch } from "../../../utils/Redux/hooks";
import { setIMXWalletAddress } from "../../../utils/Redux/Slices/imxSlice";
import Avatar from "../../Reusables/avatar";
import FeedPostDropdown from "../../Feed/feedPostDropdown";
import { SwalHelper } from "../../../utils/helpers/swal-helper";
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
  nftPost,
  showThreadConnectionLine,
  userBlocked,
  postDeleted,
}) => {
  // Redux
  const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  const localNode = useAppSelector((state) => state.node.localNode);
  const feeRateDeSoPerKB = useAppSelector((state) => state.fees.feeRateDeSoPerKB);
  // Redux end

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
  const [pinningPost, setPinningPost] = useState(false);
  const [addingPostToGlobalFeed, setAddingPostToGlobalFeed] = useState(false);
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
    if (postEntry?.ImageURLs?.length > 0) {
      changeImageURLs(postEntry.ImageURLs[0]);
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
    const dispatch = useAppDispatch();

    let tempIMXwalletAddress = localStorage.getItem("address");
    dispatch(setIMXWalletAddress(tempIMXwalletAddress));

    if (res["user"] === tempIMXwalletAddress) {
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

  const _addPostToGlobalFeed = (event: any) => {
    // Prevent the post from navigating.
    event.stopPropagation();
    setAddingPostToGlobalFeed(true);
    const postHashHex = post.PostHashHex;
    const inGlobalFeed = post.InGlobalFeed;
    AdminUpdateGlobalFeed(
        localNode,
        loggedInUser.PublicKeyBase58Check,
        postHashHex,
        inGlobalFeed /*RemoveFromGlobalFeed*/
      )
      .subscribe(
        (res) => {
          post.InGlobalFeed = !post.InGlobalFeed;
          // this.ref.detectChanges();
        },
        (err) => {
          _alertError(JSON.stringify(err.error));
        }
      )
      .add(() => {
        setAddingPostToGlobalFeed(false);
        // this.ref.detectChanges();
      });
  }

  const _pinPostToGlobalFeed = (event: any) => {
    // Prevent the post from navigating.
    event.stopPropagation();
    setPinningPost(true);
    const postHashHex = post.PostHashHex;
    const isPostPinned = post.IsPinned;
    AdminPinPost(
        localNode,
        loggedInUser.PublicKeyBase58Check,
        postHashHex,
        isPostPinned
      )
      .subscribe(
        (res) => {
          post.IsPinned = isPostPinned;
          // this.ref.detectChanges();
        },
        (err) => {
          _alertError(JSON.stringify(err.error));
        }
      )
      .add(() => {
        setPinningPost(false);
        // this.ref.detectChanges();
      });
  }

  const hidePost = () => {
    SwalHelper.fire({
      target: getTargetComponentSelector(),
      title: "Hide post?",
      html: `This can’t be undone. The post will be removed from your profile, from search results, and from the feeds of anyone who follows you.`,
      showCancelButton: true,
      customClass: {
        confirmButton: "btn btn-light",
        cancelButton: "btn btn-light no",
      },
      reverseButtons: true,
    }).then((response: any) => {
      if (response.isConfirmed) {
        // Hide the post in the UI immediately, even before the delete goes thru, to give
        // the user some indication that his delete is happening. This is a little janky.
        // For example, on the feed, the border around the post is applied by an outer element,
        // so the border will remain (and the UI will look a bit off) until the delete goes thru,
        // we emit the delete event, and the parent removes the outer element/border from the UI.
        //
        // Note: This is a rare instance where I needed to call detectChanges(). Angular wasn't
        // picking up the changes until I called this explicitly. IDK why.
        setHidingPost(true);
        // this.ref.detectChanges();
        SubmitPost(
            localNode,
            loggedInUser.PublicKeyBase58Check,
            post.PostHashHex /*PostHashHexToModify*/,
            "" /*ParentPostHashHex*/,
            "" /*Title*/,
            { Body: post.Body, ImageURLs: post.ImageURLs } /*BodyObj*/,
            post.RepostedPostEntryResponse?.PostHashHex || "",
            {},
            "" /*Sub*/,
            true /*IsHidden*/,
            feeRateDeSoPerKB * 1e9 /*feeRateNanosPerKB*/
          )
          .subscribe(
            (response) => {
              postDeleted(response.PostEntryResponse);
            },
            (err) => {
              const parsedError = parsePostError(err);
              _alertError(parsedError);
            }
          );
      }
    });
  }

  const blockUser = () => {
    SwalHelper.fire({
      target: getTargetComponentSelector(),
      title: "Block user?",
      html: `This will hide all comments from this user on your posts as well as hide them from your view on your feed and other threads.`,
      showCancelButton: true,
      customClass: {
        confirmButton: "btn btn-light",
        cancelButton: "btn btn-light no",
      },
      reverseButtons: true,
    }).then((response: any) => {
      if (response.isConfirmed) {
        BlockPublicKey(
            localNode,
            loggedInUser.PublicKeyBase58Check,
            post.PosterPublicKeyBase58Check
          )
          .subscribe(
            () => {
              loggedInUser.BlockedPubKeys[post.PosterPublicKeyBase58Check] = {};
              userBlocked(post.PosterPublicKeyBase58Check);
            },
            (err) => {
              console.error(err);
              const parsedError = stringifyError(err);
              _alertError(parsedError);
            }
          );
      }
    });
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
  const changeImageURLs = (url: string) => {
    if (url.startsWith("https://arweave.net/") || url.includes(".arweave.net")) {
      // Build cloudflare imageString
      url =
        "https://supernovas.app/cdn-cgi/image/height=500,fit=scale-down,quality=85/" +
        url;
    }
    setImageURL(url);
  };

  const showCardOrUnavailable = () => {
    // put back
    return true;
    return (
      !basePost?.IsHidden &&
      !allCopiesBurned() &&
      !hidingPost &&
      !hasUserBlockedCreator(postContent.PosterPublicKeyBase58Check)
    );
  };

  const allCopiesBurned = () => {
    if (basePost?.NumNFTCopies === 0 && basePost?.NumNFTCopiesBurned === 0) {
      return false;
    }
    return basePost?.NumNFTCopiesBurned === basePost?.NumNFTCopies;
  };
  // Functions end

  // Lifecycle methods
  useEffect(() => {
    if (typeof post?.PostHashHex !== "undefined") {
      setPost(post);
    }
  }, [post]);
  // Lifecycle methods end

  return (
    <>
    {!postContent.IsHidden && nftPost ?
    <div className="card-header nft-post-top">
    <div className="profile-img">
      {/* [routerLink]="['/' + globalVars.RouteNames.USER_PREFIX, postContent.ProfileEntryResponse.Username]"
        queryParamsHandling="merge" */}
      <Avatar
            avatar={postContent?.ProfileEntryResponse.PublicKeyBase58Check} classN={undefined}    ></Avatar>
      {showThreadConnectionLine ?
      <div className="feed-post__parent-thread-connector"></div>
      :
      null
      }
    </div>
    {/* [routerLink]="['/' + globalVars.RouteNames.USER_PREFIX, postContent.ProfileEntryResponse.Username]"
      queryParamsHandling="merge" */}
    <h6
      className="cursor-pointer"
    >
      { postContent?.ProfileEntryResponse.Username }
      {postContent?.ProfileEntryResponse.IsVerified ?
      <i className="fas fa-check-circle fa-md text-primary"></i>
      :
      null
      }
    </h6>
    <div className="value-buy-cover"></div>
    {/*     className="ml-auto" */}
    <FeedPostDropdown
            post={post}
            postContent={postContent}
            nftEntryResponses={nftEntryResponses}
            postHidden={() => hidePost()}
            userBlocked={() => blockUser()}
            toggleGlobalFeed={(e) => _addPostToGlobalFeed(e)}
            togglePostPin={(e) => _pinPostToGlobalFeed(e)} ownsEthNFT={false}    
    ></FeedPostDropdown>
  </div>
  :
  null
    }
    <div
      className={[
        styles.single_card,
        !hoverable && !mobile ? styles.hover_icons : "",
        !hoverable && !reposterProfile && mobile
          ? styles.mobile_icons_visible
          : "",
        postContent?.IsHidden || allCopiesBurned() ? "br-0px" : "",
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
              <div className={styles.card_body}>
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
                {postContent ? 
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
                :
                null
                }

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
    </>
  );
};
export default NFTCard;
