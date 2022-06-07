import styles from "../../styles/Feed/feedPost.module.scss";
import {
  abbreviateNumber,
  abbreviateRepostsNumber,
  convertTstampToDaysOrHours,
  getTargetComponentSelector,
  hasUserBlockedCreator,
  isMobile,
  nanosToUSD,
  _alertError,
} from "../../utils/global-context";
import NFTCard from "../NFT/NFTCard/nftCard";
import PostIconRow from "./postIconRow";
import Image from "next/image";
import Avatar from "../Reusables/avatar";
import NFTEditionDropdown from "../NFT/NFTProfile/nftEditionDropdown";
import FeedPostDropdown from "./feedPostDropdown";
import { useEffect, useState } from "react";
import {
    AdminPinPost,
  AdminUpdateGlobalFeed,
  BlockPublicKey,
  DecryptUnlockableTexts,
  GetNFTEntriesForNFTPost,
  NFTEntryResponse,
  parsePostError,
  PostEntryResponse,
  stringifyError,
  SubmitPost,
} from "../../utils/backendapi-context";
import {
  getEmbedURL,
  getEmbedWidth,
  isVimeoLink,
} from "../../utils/staticServices/embedURLParser";
import { useAppDispatch, useAppSelector } from "../../utils/Redux/hooks";
import {
  setNFTRoyaltyToCoinBasisPoints,
  setNFTRoyaltyToCreatorBasisPoints,
} from "../../utils/Redux/Slices/otherSlice";
import { setIsEthereumNFTForSale } from "../../utils/Redux/Slices/imxSlice";
import { ethers } from "ethers";
import { SwalHelper } from "../../utils/helpers/swal-helper";

const FeedPost = ({
  hoverable,
  showInteractionDetails,
  post,
  contentShouldLinkToThread,
  showIconRow = true,
  showLeftSelectedBorder = false,
  showReplyingTo = null,
  isQuotedContent = false,
  postThread,
  showPostsShadow,
  postThreadComment,
  setBorder = false,
  includePaddingOnPost = false,
  isParentPostInThread = false,
  showDropdown = true,
  showNFTDetails = false,
  showThreadConnectionLine = false,
  isNFTProfile = false,
  showReplyingToContent,
  cardStyle,
  isNFTDetail = false,
  showQuotedContent = true,
  isNFTProfileComment = false,
  showNFTOwnerInfo = {},
  parentPost,
  showAdminRow = false,
  showName,
  afterRepostCreatedCallback,
  changeEdition,
  profilePublicKeyBase58Check,
  isForSaleOnly,
  afterCommentCreatedCallback,
  diamondSent,
  userBlocked,
  postDeleted,
}) => {
  const dispatch = useAppDispatch();
  const [hidingPost, setHidingPost] = useState(false);
  const [showUnlockableContent, setShowUnlockableContent] = useState(false);
  const [loadingEditionDetails, setLoadingEditionDetails] = useState(true);
  const [loadingEthNFTDetails, setLoadingEthNFTDetails] = useState(true);
  const [ethereumNFTSalePrice, setEthereumNFTSalePrice] = useState(0);
  const [ownsEthNFT, setOwnsEthNFT] = useState(false);
  const [sellOrderId, setSellOrderId] = useState<any>(null);
  const [multipleEditions, setMultipleEditions] = useState(false);
  const [editionNumber, setEditionNumber] = useState<number>(undefined);
  const [availableSerialNumbers, setAvailableSerialNumbers] = useState<
    NFTEntryResponse[]
  >([]);
  const [constructedEmbedURL, setConstructedEmbedURL] = useState(null);
  const [isLockablePopup, setIsLockablePopup] = useState(false);
  const [addingPostToGlobalFeed, setAddingPostToGlobalFeed] = useState(false);
  const [nftEntryResponses, setNFTEntryResponses] =
    useState<NFTEntryResponse[]>(null);
  const [nftEntryResponse, setNFTEntryResponse] =
    useState<NFTEntryResponse>(null);
  const [decryptableNFTEntryResponses, setDecryptableNFTEntryResponses] =
    useState<NFTEntryResponse[]>(null);
  const [_post, setPost] = useState<PostEntryResponse>(post);
  const [quotedContent, setQuotedContent] = useState<any>(null);
  const [reposterProfile, setReposterProfile] = useState<any>(null);
  const [postContent, setPostContent] = useState<PostEntryResponse>(null);
  const [pinningPost, setPinningPost] = useState(false);

  // Todo ,,, get nftentryresponses probably fails since it calculates based on nftentries

  // Redux
  let loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  let localNode = useAppSelector((state) => state.node.localNode);
  let imxWalletAddress = useAppSelector((state) => state.imx.imxWalletAddress);
  let feeRateDeSoPerKB = useAppSelector((state) => state.fees.feeRateDeSoPerKB);

  // ToolTips, show on hover states
  const unlockableTooltip = `This NFT will come with content that's encrypted and only unlockable by 
  the winning bidder. Note that if an NFT is being resold, it is not guaranteed that the new unlockable 
  will be the same original unlockable.`;
  const mOfNNFTTooltip = `Each NFT can have multiple editions, each of which has its own unique 
  serial number. This shows how many editions are currently on sale and how many there are in total. 
  Generally, editions with lower serial numbers are more valuable.`;

  // Lifecycle methods
  useEffect(() => {
    asyncStarterFunc();
  }, []);
  // LifeCycle methods end

  // Functions
  const asyncStarterFunc = async () => {
    let postEntry = await setPostFunc();
    initPost(postEntry);
  };

  const initPost = async (postEntry: PostEntryResponse) => {
    if (!post.RepostCount) {
      // Put back
      //   post.RepostCount = 0;setEmbedURLForPostContent
    }
    setEmbedURLForPostContent();
    if (showNFTDetails && postContent?.IsNFT && !nftEntryResponses?.length) {
      getNFTEntries();
    }
    dispatch(
      setNFTRoyaltyToCoinBasisPoints(
        postEntry?.NFTRoyaltyToCoinBasisPoints / 100
      )
    );
    dispatch(
      setNFTRoyaltyToCreatorBasisPoints(
        postEntry.NFTRoyaltyToCreatorBasisPoints / 100
      )
    );

    if (postEntry.PostExtraData?.isEthereumNFT) {
      await updateEthNFTForSaleStatus();
      await ownsEthNFTStatus();
    }
  };
  const setPostFunc = async () => {
    // When setting the post, we need to consider repost behavior.
    // If a post is a reposting another post (without a quote), then use the reposted post as the post content.
    // If a post is quoting another post, then we use the quoted post as the quoted content.
    if (isRepost(post)) {
      setPostContent(post.RepostedPostEntryResponse);
      setReposterProfile(post.ProfileEntryResponse);
      if (isQuotedRepost(post.RepostedPostEntryResponse)) {
        setQuotedContent(postContent.RepostedPostEntryResponse);
      }
      return post.RepostedPostEntryResponse;
    } else if (isQuotedRepost(post)) {
      setPostContent(post);
      setQuotedContent(post.RepostedPostEntryResponse);
      return post;
    } else {
      setPostContent(post);
      return post;
    }
  };

  const updateEthNFTForSaleStatus = async () => {
    const options = { method: "GET", headers: { Accept: "*/*" } };

    // console.log(environment.imx.TOKEN_ADDRESS);

    let res = await fetch(
      `${process.env.NEXT_PUBLIC_MAINNET_ENV_URL}/orders?status=active&sell_token_address=${process.env.NEXT_PUBLIC_TOKEN_ADDRESS}`,
      options
    );

    res = await res.json();

    // console.log(typeof this.nftPost.PostExtraData["tokenId"]);
    // console.log(res);

    if (res["result"]["length"] === 0) {
      console.log("There are no NFTs for sale");
      dispatch(setIsEthereumNFTForSale(false));
      setLoadingEthNFTDetails(false);
      return;
    }

    var tokenIdsForSale = [];
    var nftsForSaleArr = [];
    for (var i = 0; i < res["result"].length; i++) {
      tokenIdsForSale.push(res["result"][i]["sell"]["data"]["token_id"]);
      nftsForSaleArr.push(res["result"][i]);
    }

    // console.log(tokenIdsForSale);
    // console.log(typeof this.postContent.PostExtraData["tokenId"]);

    if (tokenIdsForSale.includes(postContent.PostExtraData["tokenId"])) {
      for (var i = 0; i < nftsForSaleArr.length; i++) {
        if (
          postContent.PostExtraData["tokenId"] ==
          nftsForSaleArr[i]["sell"]["data"]["token_id"]
        ) {
          dispatch(setIsEthereumNFTForSale(true));
          let tempEthereumNFTSalePrice =
            res["result"][i]["buy"]["data"]["quantity"];
          setEthereumNFTSalePrice(
            parseInt(ethers.utils.formatEther(tempEthereumNFTSalePrice))
          );
          setSellOrderId(res["result"][i]["order_id"]);
        }
      }
    } else {
      dispatch(setIsEthereumNFTForSale(false));
    }

    setLoadingEthNFTDetails(false);
  };

  const ownsEthNFTStatus = async () => {
    try {
      const options = {
        method: "GET",
        headers: { Accept: "application/json" },
      };

      let res = await fetch(
        `${process.env.NEXT_PUBLIC_MAINNET_ENV_URL}/assets/${process.env.NEXT_PUBLIC_TOKEN_ADDRESS}/${postContent.PostExtraData["tokenId"]}`,
        options
      );

      res = await res.json();

      let ethNftOwner = res["user"];

      if (localStorage.getItem("address")) {
        imxWalletAddress = localStorage.getItem("address");
      }

      if (ethNftOwner === imxWalletAddress) {
        setOwnsEthNFT(true);
        console.log(`The wallet owns the NFT ${ownsEthNFT}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isRepost = (post: any): boolean => {
    return (
      post.Body === "" &&
      (!post.ImageURLs || post.ImageURLs?.length === 0) &&
      post.RepostedPostEntryResponse
    );
  };

  const isQuotedRepost = (post: any): boolean => {
    return (
      (post.Body !== "" || post.ImageURLs?.length > 0) &&
      post.RepostedPostEntryResponse
    );
  };

  const setEmbedURLForPostContent = (): void => {
    getEmbedURL(localNode, postContent?.PostExtraData?.EmbedVideoURL).subscribe(
      (res) => setConstructedEmbedURL(res)
    );
  };

  const getNFTEntries = () => {
    GetNFTEntriesForNFTPost(
      localNode,
      loggedInUser?.PublicKeyBase58Check,
      postContent.PostHashHex
    ).subscribe((res) => {
      let tempNFTEntries = res.data.NFTEntryResponses;
      setNFTEntryResponses(res.data.NFTEntryResponses);
      // Set serialnumber of which to use in logic to be one that the user owns
      // or the first one if user does not own any
      if (tempNFTEntries?.length > 1) {
        setMultipleEditions(true);
      }
      setSerialNumberToUse();
      // Insert selected ser into variable
      // Insert selected ser into variable
      tempNFTEntries.forEach((item) => {
        if (item.SerialNumber == editionNumber) {
          setNFTEntryResponse(item);
        }
      });

      nftEntryResponses.sort((a, b) => a.SerialNumber - b.SerialNumber);
      setDecryptableNFTEntryResponses(
        tempNFTEntries.filter(
          (sn) =>
            sn.OwnerPublicKeyBase58Check ===
              loggedInUser?.PublicKeyBase58Check &&
            sn.EncryptedUnlockableText &&
            sn.LastOwnerPublicKeyBase58Check
        )
      );

      if (decryptableNFTEntryResponses.length) {
        DecryptUnlockableTexts(
          loggedInUser?.PublicKeyBase58Check,
          decryptableNFTEntryResponses
        ).subscribe((res) => setDecryptableNFTEntryResponses(res.data));
      }

      setAvailableSerialNumbers(
        nftEntryResponses.filter(
          (nftEntryResponse) => nftEntryResponse.IsForSale
        )
      );

      const profileSerialNumbers = nftEntryResponses.filter(
        (serialNumber) =>
          serialNumber.OwnerPublicKeyBase58Check ===
            profilePublicKeyBase58Check &&
          (!isForSaleOnly || serialNumber.IsForSale)
      );
    });
  };

  const setSerialNumberToUse = () => {
    const loggedInPubKey = loggedInUser?.PublicKeyBase58Check;
    if (!nftEntryResponses) {
      return false;
    }
    let serialList = nftEntryResponses.filter(
      (NFTEntryResponse) =>
        NFTEntryResponse.OwnerPublicKeyBase58Check === loggedInPubKey
    );
    if (serialList.length > 0) {
      setEditionNumber(serialList[0].SerialNumber);
    } else {
      setEditionNumber(1);
    }
  };

  const mapImageURLs = (imgURL: string): string => {
    if (imgURL.startsWith("https://i.imgur.com")) {
      return imgURL.replace(
        "https://i.imgur.com",
        "https://images.bitclout.com/i.imgur.com"
      );
    }
    return imgURL;
  };
  const _tabSerialNumberClicked = (id: number) => {
    setLoadingEditionDetails(true);
    setEditionNumber(id);
    // Pass to parent the wish to change edition
    // Parent then should call sibling nft-detai-box
    changeEdition(id);
  };

  const setNegativeMargins = (link: string) => {
    return isMobile() && isVimeoLink(link);
  };

  const fetchEmbedWidth = (): string => {
    return getEmbedWidth(postContent?.PostExtraData?.EmbedVideoURL);
  };

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
            _post.PostHashHex /*PostHashHexToModify*/,
            "" /*ParentPostHashHex*/,
            "" /*Title*/,
            { Body: _post.Body, ImageURLs: _post.ImageURLs, VideoURLs: _post.VideoURLs } /*BodyObj*/,
            _post.RepostedPostEntryResponse?.PostHashHex || "",
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
              console.error(err);
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
        //   this.ref.detectChanges();
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
    const postHashHex = _post.PostHashHex;
    const isPostPinned = _post.IsPinned;
    AdminPinPost(
        localNode,
        loggedInUser.PublicKeyBase58Check,
        postHashHex,
        isPostPinned
      )
      .subscribe(
        (res) => {
          _post.IsPinned = isPostPinned;
        //   this.ref.detectChanges();
        },
        (err) => {
          _alertError(JSON.stringify(err.error));
        }
      )
      .add(() => {
        setPinningPost(false);
        // ref.detectChanges();
      });
  }

  // Functions end

  // Dom manipulation
  const getPostHiddenText = () => {
    if (post.IsHidden) {
      return (
        <div className="p-10px br-30px background-color-grey d-flex align-items-center justify-content-center fs-15px">
          {/* (click)="onPostClicked($event)"
                [routerLink]="getRouterLink(['/' + globalVars.RouteNames.POSTS, post.PostHashHex])" 
                queryParamsHandling="merge"*/}
          <a className="link--unstyled">This post was removed by the author.</a>
        </div>
      );
    }
    return;
  };

  return (
    <div
      className={[
        "d-flex m-w-100px flex-column",
        hoverable ? "js-feed-post-hover" : "",
        hoverable && isQuotedContent ? "feed-post__quoted-content" : "",
        !postThread ? "mobile_feed_post" : "",
        showPostsShadow ? styles.feed_posts_shadow : "",
        !postThreadComment ? styles.feed_post_shadow_mobile : "",
      ].join(" ")}
    >
      <div
        className={[
          "w-100",
          showPostsShadow ? styles.feed_posts_shadow : "",
          !postThreadComment ? styles.feed_post_shadow_mobile : "",
        ].join(" ")}
      >
        {getPostHiddenText()}

        {hasUserBlockedCreator(post.PosterPublicKeyBase58Check) ? (
          <div className="p-15px background-color-grey d-flex align-items-center justify-content-center fs-15px">
            {/* [routerLink]="getRouterLink(['/' + globalVars.RouteNames.USER_PREFIX, post.ProfileEntryResponse.Username])" 
                    queryParamsHandling="merge"*/}
            <a className="link--unstyled" style={{ textAlign: "center" }}>
              This is a post from {post.ProfileEntryResponse.Username} who you
              have blocked. Click here to visit their profile to unblock them.
            </a>
          </div>
        ) : null}

        {post.IsHidden ||
        hidingPost ||
        hasUserBlockedCreator(post.PosterPublicKeyBase58Check) ||
        !postContent ? null : (
          <div
            className="d-flex flex-column js-feed-post"
            style={{ borderRadius: setBorder ? "12px 12px 0 0" : "" }}
          >
            {/* (click)="onPostClicked($event)"*/}
            <a
              className={[
                "link--unstyled",
                !contentShouldLinkToThread ? "cursor-inherit" : "",
              ].join(" ")}
            >
              {showReplyingTo && post.ParentStakeID != "" ? (
                <div
                  className="pl-15px pt-5px align-items-center"
                  style={{ marginBottom: "-5px" }}
                >
                  {/* [routerLink]="
                        getRouterLink([
                            '/' + globalVars.RouteNames.USER_PREFIX,
                            post.ParentPosts[0].ProfileEntryResponse.Username
                        ])
                        " 
                        queryParamsHandling="merge"
                        */}

                  <a className="fc-muted font-weight-semibold fs-15px">
                    replying to{" "}
                    {post.ParentPosts[0].ProfileEntryResponse.Username}
                  </a>
                </div>
              ) : null}

              {reposterProfile ? (
                <div
                  className={[
                    "feed-post__container d-flex justify-content-left w-100 pb-5px",
                    includePaddingOnPost ? "px-15px pt-10px" : "",
                    isParentPostInThread
                      ? "feed-post__parent-post-font-size"
                      : "",
                    showLeftSelectedBorder ? "feed-post__blue-border" : "",
                  ].join(" ")}
                >
                  {/* [routerLink]="getRouterLink(['/' + globalVars.RouteNames.USER_PREFIX, reposterProfile.Username])" 
                        queryParamsHandling="merge"*/}
                  <a className="fc-muted font-weight-semibold align-items-center">
                    <i
                      className="icon-repost fs-20px"
                      style={{ verticalAlign: "middle" }}
                    ></i>
                    <span
                      style={{ verticalAlign: "middle" }}
                      className="fs-15px"
                    >
                      @{reposterProfile.Username} reposted
                    </span>
                  </a>

                  {/* class="ml-auto" */}
                  {showDropdown ? (
                    <FeedPostDropdown
                      post={post}
                      postContent={postContent}
                      decryptableNFTEntryResponses={decryptableNFTEntryResponses}
                      nftEntryResponses={nftEntryResponses}
                      ownsEthNFT={ownsEthNFT}
                      postHidden={() => hidePost()}
                      userBlocked={() => blockUser()}
                      toggleGlobalFeed={(e) => _addPostToGlobalFeed(e)}
                    ></FeedPostDropdown>
                  ) : null}
                </div>
              ) : null}

              {post.IsHidden ? (
                <div
                  className={[
                    "p-10px background-color-grey d-flex align-items-center justify-content-center fs-15px",
                    includePaddingOnPost ? "px-15px pb-15px" : "",
                    includePaddingOnPost && !reposterProfile ? "pt-15px" : "",
                    showLeftSelectedBorder ? "feed-post__blue-border" : "",
                    isParentPostInThread
                      ? "feed-post__parent-post-font-size"
                      : "",
                  ].join("")}
                >
                  {/* (click)="onPostClicked($event)" 
                            [routerLink]="getRouterLink(['/' + globalVars.RouteNames.POSTS, postContent.PostHashHex])"
                            queryParamsHandling="merge"
                            */}
                  <a className="link--unstyled">
                    The original post was removed by its author.
                  </a>
                </div>
              ) : null}

              {post.IsHidden ? null : (
                <div
                  className={[
                    "feed-post__container d-flex justify-content-left w-100",
                    includePaddingOnPost ? "px-15px pb-15px" : "",
                    includePaddingOnPost && !reposterProfile ? "pt-15px" : "",
                    showLeftSelectedBorder ? "feed-post__blue-border" : "",
                    isParentPostInThread
                      ? "feed-post__parent-post-font-size"
                      : "",
                  ].join(" ")}
                  style={{
                    borderRadius:
                      showLeftSelectedBorder && cardStyle
                        ? postContent.IsNFT && showNFTDetails
                          ? "12px 0"
                          : "12px"
                        : "",
                  }}
                >
                  {/* <!-- Avatar --> */}
                  <div className="feed-post__avatar-container">
                    {/*
                        [routerLink]="
                            getRouterLink(['/' + globalVars.RouteNames.USER_PREFIX, postContent.ProfileEntryResponse?.Username])
                        "
                        queryParamsHandling="merge" */}
                    <Avatar
                      classN="feed-post__avatar br-12px"
                      avatar={
                        postContent?.ProfileEntryResponse?.PublicKeyBase58Check
                      }
                    ></Avatar>

                    {showThreadConnectionLine ? (
                      <div className="feed-post__parent-thread-connector"></div>
                    ) : null}
                  </div>

                  {/* <!-- Main Content --> */}
                  <div className="w-100 nft_feed_post_bx">
                    <div className="d-flex align-items-center">
                      <div className="d-flex justify-content-between">
                        <div className="post_del_list">
                          {isNFTProfile ? (
                            <span className="nb">CREATOR</span>
                          ) : null}

                          {/* <!-- Username--> */}
                          <div className="mr-20px d-flex flex-center flex-row">
                            {/* [routerLink]="
                                    getRouterLink([
                                    '/' + globalVars.RouteNames.USER_PREFIX,
                                    postContent.ProfileEntryResponse?.Username
                                    ])
                                " queryParamsHandling="merge"*/}
                            <a
                              className={[
                                "fc-default font-weight-semiboldn",
                                isNFTDetail ? styles.nft_detail_username : "",
                              ].join(" ")}
                            >
                              {postContent?.ProfileEntryResponse?.Username}
                            </a>

                            {postContent?.ProfileEntryResponse?.IsVerified ? (
                              <span className="ml-1 text-primary">
                                {/* [ngClass]="{ 'fs-14px': isNFTDetail }" */}
                                <i className="fas fa-check-circle fa-md align-middle"></i>
                              </span>
                            ) : null}
                          </div>
                          {isNFTProfile && multipleEditions ? (
                            <NFTEditionDropdown
                              nftEntryResponses={nftEntryResponses}
                              editionNumber={editionNumber}
                              editionSelected={(e) =>
                                _tabSerialNumberClicked(e)
                              }
                            ></NFTEditionDropdown>
                          ) : null}
                        </div>
                      </div>

                      {isNFTDetail ? (
                        <div className="nft-detail-lock-info-wrap ml-auto">
                          {showNFTDetails && postContent.IsNFT ? (
                            <>
                              {/* (clickOutside)="clickOutside()"
                                    (mouseenter)="$event.stopImmediatePropagation()"
                                    (mouseleave)="$event.stopImmediatePropagation()"
                                    (click)="toggleLockablePopup()" */}
                              {postContent.HasUnlockable ? (
                                <span className="cursor-pointer d-lg-inline-block d-block mt-5px">
                                  <i
                                    className={[
                                      "fas",
                                      !decryptableNFTEntryResponses?.length ||
                                      showUnlockableContent
                                        ? "fa-lock"
                                        : "",
                                      decryptableNFTEntryResponses?.length &&
                                      !showUnlockableContent
                                        ? "fa-unlock-alt"
                                        : "",
                                    ].join(" ")}
                                  ></i>
                                </span>
                              ) : null}

                              <div
                                className={[
                                  "post-locable-content-wrap",
                                  !isLockablePopup ? "hidden" : "",
                                ].join(" ")}
                              >
                                <div className="post-locable-content-inner">
                                  {showUnlockableContent ? (
                                    <div>
                                      {decryptableNFTEntryResponses.map(
                                        (nftEntry, i) => (
                                          <div
                                            key={i}
                                            className="d-flex flex-row"
                                          >
                                            <div>
                                              #{nftEntry.SerialNumber}:&nbsp;
                                            </div>
                                            {/* [innerHTML]="nftEntry.DecryptedUnlockableText | sanitizeAndAutoLink" */}
                                            <div></div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  ) : (
                                    <div>{unlockableTooltip}</div>
                                  )}
                                </div>
                              </div>
                            </>
                          ) : null}
                        </div>
                      ) : null}

                      {showDropdown && !reposterProfile ? (
                        <>
                          {/* class.ml-auto="!isNFTDetail" */}
                          <FeedPostDropdown
                            post={post}
                            decryptableNFTEntryResponses={decryptableNFTEntryResponses}
                            postContent={postContent}
                            nftEntryResponses={nftEntryResponses}
                            ownsEthNFT={ownsEthNFT}
                            postHidden={() => hidePost()}
                            userBlocked={() => blockUser()}
                            toggleGlobalFeed={(e) => _addPostToGlobalFeed(e)}
                            togglePostPin={(e) => _pinPostToGlobalFeed(e)}
                          ></FeedPostDropdown>
                        </>
                      ) : null}
                    </div>
                    {/* <!-- Mobile follow button--> */}
                    <div className="mt-5px d-lg-none text-grey5"></div>

                    {showReplyingToContent ? (
                      <div className="fs-13px text-muted pt-1 pb-2">
                        replying to
                        {/* [routerLink]="
                                getRouterLink([
                                '/' + this.globalVars.RouteNames.USER_PREFIX,
                                parentPost.ProfileEntryResponse.Username
                                ])
                                "
                                queryParamsHandling="merge" */}
                        <a>@{parentPost.ProfileEntryResponse.Username}</a>
                      </div>
                    ) : null}

                    {/* <!-- Content --> */}
                    {/* [innerHTML]="postContent.PostExtraData?.name | sanitizeAndAutoLink" */}
                    {showName ? (
                      <div className="feed-post-PED-name"></div>
                    ) : null}

                    {/* 
                        [innerHTML]="postContent.Body | sanitizeAndAutoLink" 
                        queryParamsHandling="merge"
                        */}
                    <div
                      className={[
                        "poppins-regular disable-scrollbars mt-1 feed-text-wrap overflow-wrap: anywhere; word-break: break-word; outline: none",
                        quotedContent && showQuotedContent ? "pb-10px" : "",
                        isNFTDetail ? "nft_para" : "",
                        isNFTProfile ? styles.nft_prof_text : "",
                      ].join(" ")}
                    ></div>

                    {postContent?.ImageURLs && postContent.ImageURLs[0] ? (
                      <div
                        className={[
                          "feed-post__image-container",
                          quotedContent && showQuotedContent ? "mb-10px" : "",
                        ].join(" ")}
                      >
                        {/* (click)="openImgModal($event, postContent.ImageURLs[0])" */}
                        <Image
                          height={200}
                          width={200}
                          data-toggle="modal"
                          className="feed-post__image"
                          src={mapImageURLs(postContent?.ImageURLs[0])}
                          alt="post image"
                        />
                      </div>
                    ) : null}

                    {/* <!-- Video --> */}
                    {postContent.VideoURLs &&
                    showNFTOwnerInfo &&
                    postContent.VideoURLs[0] &&
                    !isNFTProfile ? (
                      <div
                        className={[
                          "feed-post__video-container",
                          quotedContent && showQuotedContent ? "mb-10px" : "",
                        ].join(" ")}
                      >
                        {/*| sanitizeVideoUrl" allowfullscreen
                         */}
                        <iframe
                          src={postContent.VideoURLs[0]}
                          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                          className="feed-post__video"
                        ></iframe>
                      </div>
                    ) : null}

                    {/* <!-- Embedded Content --> */}
                    {constructedEmbedURL && !isNFTProfile ? (
                      <div
                        className={[
                          "feed-post__embed-container",
                          quotedContent && showQuotedContent ? "mb-10px" : "",
                        ].join(" ")}
                      >
                        {/* [height]="getEmbedHeight()" 
                            | sanitizeEmbed" 
                            frameborder="0"
                            allowfullscreen*/}
                        <iframe
                          src={constructedEmbedURL}
                          style={{
                            marginTop: setNegativeMargins(constructedEmbedURL)
                              ? "-65px"
                              : "",
                            marginBottom: setNegativeMargins(
                              constructedEmbedURL
                            )
                              ? "-65px"
                              : "",
                            maxWidth: fetchEmbedWidth(),
                          }}
                          id="embed-iframe"
                          className="feed-post__image"
                          allow="picture-in-picture; clipboard-write; encrypted-media; gyroscope; accelerometer; encrypted-media;"
                        ></iframe>
                      </div>
                    ) : null}

                    {/* <!-- quote repost deso nft --> */}
                    {quotedContent?.IsNFT &&
                    !quotedContent?.PostExtraData?.isEthereumNFT ? (
                      <>
                        <div
                          className={[
                            "w-100 d-flex flex-center br-10px position-relative overflow-hidden",
                            quotedContent && showQuotedContent
                              ? "p-20px-under-450px"
                              : "",
                          ].join(" ")}
                        >
                          <object
                            data="/assets/img/nft-background.svg"
                            className="nft-background"
                            type="image/svg+xml"
                          ></object>
                          {/* className="w-100 d-flex flex-center" */}
                          {quotedContent && showQuotedContent ? (
                            <NFTCard
                              insidePost={true}
                              post={quotedContent}
                              pending={false}
                              showIconRow={false}
                              showQuotedContent={false}
                              contentShouldLinkToThread={contentShouldLinkToThread}
                              hoverable={hoverable}
                              isQuotedCard={true}
                              marketplaceCard={undefined}
                              profileFeed={undefined}
                              loadProfile={undefined}
                            ></NFTCard>
                          ) : null}
                        </div>
                      </>
                    ) : null}

                    {/* <!-- quote repost eth nft --> */}
                    {!quotedContent?.IsNFT &&
                    quotedContent?.PostExtraData?.isEthereumNFT ? (
                      <>
                        <div
                          className={[
                            "w-100 d-flex flex-center br-10px position-relative overflow-hidden",
                            quotedContent && showQuotedContent
                              ? "p-20px-under-450px"
                              : "",
                          ].join(" ")}
                        >
                          <object
                            data="/assets/img/nft-background.svg"
                            className="nft-background"
                            type="image/svg+xml"
                          ></object>
                          {/* className="w-100 d-flex flex-center" */}
                          {quotedContent && showQuotedContent ? (
                            <NFTCard
                              insidePost={true}
                              post={quotedContent}
                              pending={false}
                              showIconRow={false}
                              showQuotedContent={false}
                              contentShouldLinkToThread={contentShouldLinkToThread}
                              hoverable={hoverable}
                              isQuotedCard={true}
                              marketplaceCard={false}
                              profileFeed={false}
                              loadProfile={false}
                            ></NFTCard>
                          ) : null}
                        </div>
                      </>
                    ) : null}

                    {/* <!-- quote repost is not an NFT or ethereum nft --> */}
                    {!quotedContent?.IsNFT &&
                    !quotedContent?.PostExtraData?.isEthereumNFT ? (
                      <>
                        {quotedContent && showQuotedContent ? (
                          <FeedPost
                                                              post={quotedContent}
                                                              isQuotedContent={true}
                                                              includePaddingOnPost={true}
                                                              showIconRow={false}
                                                              showDropdown={false}
                                                              showQuotedContent={false}
                                                              contentShouldLinkToThread={contentShouldLinkToThread}
                                                              hoverable={hoverable}
                                                              showNFTDetails={true}
                                                              cardStyle={true} showInteractionDetails={undefined} postThread={undefined} showPostsShadow={undefined} postThreadComment={undefined} showReplyingToContent={undefined} parentPost={undefined} showName={undefined} afterRepostCreatedCallback={undefined} changeEdition={undefined} profilePublicKeyBase58Check={undefined} isForSaleOnly={undefined} afterCommentCreatedCallback={undefined} diamondSent={undefined} userBlocked={undefined} postDeleted={undefined}                          ></FeedPost>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                </div>
              )}

              {/* <!-- Bottom Buttons --> */}
              {!showInteractionDetails ? (
                <div className="feed-post__icon-row-holder pt-10px">
                  {/* <!-- Like, Comment, Repost, Share Buttons --> */}
                  <div className="icons-hodlr">
                    {showIconRow ? (
                      <PostIconRow
                        isNFTProfile={isNFTProfileComment}
                        post={post}
                        postContent={postContent}
                        parentPost={parentPost}
                        afterCommentCreatedCallback={
                          afterCommentCreatedCallback
                        }
                        afterRepostCreatedCallback={afterRepostCreatedCallback}
                        inTutorial={false}
                        diamondSent={() => diamondSent()}
                      ></PostIconRow>
                    ) : null}
                  </div>

                  {/* <!-- Admin Buttons --> */}
                  {showAdminRow ? (
                    <div className="pt-10px fs-15px d-flex align-items-center">
                      {/* (click)="_addPostToGlobalFeed($event)" */}
                      {!postContent.InGlobalFeed && !addingPostToGlobalFeed ? (
                        <div className="py-5px px-10px admin__add-to-feed-button">
                          <i className="fas fa-folder-plus"></i>
                          Add to global feed
                        </div>
                      ) : null}

                      {!postContent.InGlobalFeed && addingPostToGlobalFeed ? (
                        <div className="py-5px px-10px admin__add-to-feed-button">
                          <i className="fas fa-folder-plus"></i>
                          Adding...
                        </div>
                      ) : null}

                      {/* (click)="_addPostToGlobalFeed($event)" */}
                      {postContent.InGlobalFeed && !addingPostToGlobalFeed ? (
                        <div className="py-5px px-10px admin__remove-from-feed-button">
                          <i className="fas fa-check"></i>
                          On global feed
                        </div>
                      ) : null}

                      {postContent.InGlobalFeed && addingPostToGlobalFeed ? (
                        <div className="py-5px px-10px admin__remove-from-feed-button">
                          <i className="fas fa-check"></i>
                          Removing...
                        </div>
                      ) : null}

                      <div>
                        &nbsp;&middot;
                        {/* [routerLink]="getRouterLink(['/' + globalVars.RouteNames.POSTS, postContent.PostHashHex])" 
                    queryParamsHandling="merge" */}
                        <a>View</a>
                      </div>

                      <div className="text-grey8A">
                        &nbsp;&middot;&nbsp;
                        {convertTstampToDaysOrHours(postContent.TimestampNanos)}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </a>
            {/* <!--This HTML is used on the main post in a thread in order to show detailed info
                    about the interactions with that thread.  TODO: We should probably break the
                    "main" post in a thread into it's own file so it can have more custom styling
                    with less code complexity.--> */}
            {showInteractionDetails ? (
              <div className="feed-post__blue-border nft_details_relout pb-5px">
                <div className={styles.container + " p-0px"}>
                  {/* <!-- DESKTOP --> */}
                  <div className={styles.post_engagement_border + " row no-gutters d-none d-lg-block py-10px fs-15px cursor-pointer"}>
                    <div className={styles.interaction_details_container + " d-flex"}>
                      {/* (click)="openRepostsModal($event)" */}
                      <span className={[styles.post_thread_engagement_detail, styles.interaction_detail, styles.interaction_detail_item].join(" ")}>
                        <b>{abbreviateNumber(post.CommentCount)}</b>
                        Comments&nbsp;
                      </span>
                      {/* (click)="openQuoteRepostsModal($event)" */}
                      <span className={[styles.post_thread_engagement_detail, styles.interaction_detail, styles.interaction_detail_item].join(" ")}>
                        <b>
                          {abbreviateRepostsNumber(
                            post.RepostCount,
                            post.QuoteRepostCount
                          )}
                        </b>
                        Reposts&nbsp;
                      </span>
                      {/* (click)="openLikesModal($event)" */}
                      <span className={[styles.post_thread_engagement_detail, styles.interaction_detail, styles.interaction_detail_item].join(" ")}>
                        <b>{abbreviateNumber(post.LikeCount)}</b>
                        Likes
                      </span>
                      {/* (click)="openDiamondsModal($event)" */}
                      <span className={[styles.post_thread_engagement_detail, styles.interaction_detail, styles.interaction_detail_item].join(" ")}>
                        <b>{abbreviateNumber(post.DiamondCount)}</b>
                        Diamonds
                      </span>
                    </div>
                  </div>
                  {/* <!-- MOBILE --> */}
                  <div className="d-flex flex-row justify-content-between d-lg-none py-10px px-5px fs-15px border-top border-bottom border-color-light-grey cursor-pointer">
                    {/* (click)="openRepostsModal($event)" */}
                    <div className={styles.mobile_post_interaction_detail + " mb-0 interaction-detail pl-5px fs-12px"}>
                      <b>{abbreviateNumber(post.CommentCount)}</b>
                      Comments
                    </div>
                    {/* (click)="openQuoteRepostsModal($event)" */}
                    <div className={styles.mobile_post_interaction_detail + " mb-0 interaction-detail px-5px fs-12px"}>
                      <b>
                        {abbreviateRepostsNumber(
                          post.RepostCount,
                          post.QuoteRepostCount
                        )}
                      </b>
                      Reposts
                    </div>
                    {/* (click)="openLikesModal($event)" */}
                    <div className={styles.mobile_post_interaction_detail + " mb-0 interaction-detail px-5px fs-12px"}>
                      <b>{abbreviateNumber(postContent.LikeCount)}</b>
                      Likes
                    </div>
                    {/* (click)="openDiamondsModal($event)" */}
                    <div className={styles.mobile_post_interaction_detail + " mb-0 interaction-detail px-5px fs-12px"}>
                      <b>{abbreviateNumber(postContent.DiamondCount)}</b>
                      Diamonds
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {showInteractionDetails ? (
              <div
                className={[
                  "feed-post__container nft_details_comment d-flex flex-center justify-content-left w-100",
                  includePaddingOnPost ? "px-15px pb-15px" : "",
                  showLeftSelectedBorder ? "feed-post__blue-border" : "",
                  isParentPostInThread
                    ? "feed-post__parent-post-font-size"
                    : "",
                ].join(" ")}
              >
                <div
                  className="w-80"
                  style={{ marginLeft: "-5px", marginTop: "2px" }}
                >
                  {showIconRow ? (
                    <PostIconRow
                      post={post}
                      postContent={postContent}
                      parentPost={parentPost}
                      hideNumbers={true}
                      afterCommentCreatedCallback={afterCommentCreatedCallback}
                      afterRepostCreatedCallback={afterRepostCreatedCallback}
                      diamondSent={() => diamondSent()}
                    ></PostIconRow>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPost;
