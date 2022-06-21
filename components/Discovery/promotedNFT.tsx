import { useEffect, useState } from "react";
import styles from "../../styles/Discovery/promotedNFT.module.scss";
import _ from "lodash";
import {
  GetNFTBidsForNFTPost,
  GetNFTEntriesForNFTPost,
  NFTBidData,
  NFTBidEntryResponse,
  RouteNames,
} from "../../utils/backendapi-context";
import { _alertError } from "../../utils/global-context";
import { useAppSelector } from "../../utils/Redux/hooks";
import ModelComponent from "../Media/modelComponent";
import ImageComponent from "../Media/imageComponent";
import AudioComponent from "../Media/audioComponent";
import VideoComponent from "../Media/videoComponent";
import BidBox from "../NFT/BidBox/bidBox";
import Avatar from "../Reusables/avatar";
import Link from "next/link";

const PromotedNFT = ({ post, mobile }) => {
  // Redux
  const localNode = useAppSelector((state) => state.node.localNode);
  const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  // Redux end

  // Vars
  let bids: NFTBidEntryResponse[];
  // Vars end

  // State
  const [myBidsLength, setMyBidsLength] = useState(null);
  const [nftBidData, setNftBidData] = useState(null);
  const [hightestBidOwner, setHighestBidOwner] = useState(null);
  const [isBuyNow, setIsBuyNow] = useState(false);
  // State end

  // Lifecycle methods
  useEffect(() => {
    if (post?.PostHashHex) {
      loadBidData();
      getNFTEntries();

      if (post?.ImageURLs[0]) {
        document.getElementById("discovery_top_sc").style.backgroundImage =
          "url(" + post?.ImageURLs[0] + ")";
      }
    }
  }, [post]);
  // Lifecycle methods end

  // Functions
  const loadBidData = () => {
    return GetNFTBidsForNFTPost(
      localNode,
      loggedInUser?.PublicKeyBase58Check,
      post.PostHashHex
    ).subscribe({
      next: (res) => {
        console.log("BIDDATA: ");
        console.log(res);
        setNftBidData(res);
        if (nftBidData?.BidEntryResponses?.length > 0) {
          bids = nftBidData.BidEntryResponses.filter(
            (bidEntry) => bidEntry.BidAmountNanos <= bidEntry.BidderBalanceNanos
          );
          setHighestBidOwner(_.maxBy(bids, "BidAmountNanos"));

          setMyBidsLength(
            nftBidData.BidEntryResponses.filter(
              (bidEntry) =>
                bidEntry.PublicKeyBase58Check ===
                loggedInUser?.PublicKeyBase58Check
            )?.length
          );
        }
      },
      error: (error) => _alertError(error),
    });
  };

  const openBuyNowModal = (event: any) => {
    // put back
    // if (!loggedInUser?.ProfileEntryResponse) {
    //   SharedDialogs.showCreateProfileToPerformActionDialog(router, "buy now");
    //   return;
    // }
    // event.stopPropagation();
    // const modalDetails = modalService.show(BuyNowModalComponent, {
    //   class:
    //     "modal-dialog-centered nft_placebid_modal_bx buy-modal modal-lg right-align-modal",
    //   initialState: {
    //     post: post,
    //     clickedBuyNow: true,
    //     serialNumber: null,
    //     isEthNFT: false,
    //     ethereumNFTSalePrice: "",
    //     sellOrderId: "",
    //   },
    // });

    // const onHideEvent = modalDetails.onHide;
    // onHideEvent.subscribe((response) => {
    //   if (response === "bid placed") {
    //     loadBidData();
    //     getNFTEntries();
    //   }
    // });
  };

  const openPlaceBidModal = (event: any) => {
    // put back
    // if (!loggedInUser?.ProfileEntryResponse) {
    //   SharedDialogs.showCreateProfileToPerformActionDialog(
    //     router,
    //     "place a bid"
    //   );
    //   return;
    // }
    // track15("Open Place a Bid Modal");
    // event.stopPropagation();
    // const modalDetails = modalService.show(PlaceBidModalComponent, {
    //   class:
    //     "modal-dialog-centered nft_placebid_modal_bx buy-modal modal-lg right-align-modal",
    //   initialState: {
    //     post: post,
    //     editionHasBids: true,
    //     clickedPlaceABid: true,
    //     isBuyNow: false,
    //     serialNumber: null,
    //   },
    // });

    // const onHideEvent = modalDetails.onHide;
    // onHideEvent.subscribe((response) => {
    //   if (response === "bid placed") {
    //     // Do something
    //   }
    // });
  };

  const viewNFT = () => {
    // Put back
    // this.router.navigate(["/nft/" + this.post.PostHashHex], {
    //   queryParamsHandling: "merge",
    // });
  };

  const getNFTEntries = () => {
    return GetNFTEntriesForNFTPost(
      localNode,
      loggedInUser?.PublicKeyBase58Check,
      post.PostHashHex
    ).subscribe({
      next: (res) => setIsBuyNow(res.data.NFTEntryResponses[0].IsBuyNow),
    });
  };

  // Functions end
  return (
    <div className={styles.discovery_wrapper}>
      <div className={styles.disc_art_left}>
        <div className={styles.top_sc} id="discovery_top_sc">
          <div className={styles.dtails_wp}>
            <h3>{post?.PostExtraData?.name}</h3>
            {!post?.PostExtraData?.name ? <p>{post?.Body}</p> : null}

            {post ? (
              <div className={styles.art_details_nv}>
                By
                <div className={styles.user_detail}>
                  <div className={styles.profile_img}>
                    <Link
                      href={
                        "/" + RouteNames.USER_PREFIX + "/" + 
                        post?.ProfileEntryResponse?.Username
                      }
                    >
                      <Avatar
                        classN={styles.avatar}
                        avatar={post.ProfileEntryResponse?.PublicKeyBase58Check}
                      ></Avatar>
                    </Link>
                  </div>
                  <Link
                    href={
                      "/" + RouteNames.USER_PREFIX + "/" +
                      post?.ProfileEntryResponse?.Username
                    }
                  >
                    <span className={styles.val}>
                      {post?.ProfileEntryResponse?.Username}
                    </span>
                  </Link>
                  {post?.ProfileEntryResponse?.IsVerified ? (
                    <i className="fas pl-5px fa-check-circle fa-md text-primary"></i>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.btm_sc}>
          <div className={styles.hgst_bid_sc}>
            <BidBox
              postContent={post}
              nftBidData={nftBidData}
              isNFTDetail={false}
              highestBidOwner={hightestBidOwner}
              ethNFTOwnerWalletAddress={undefined}
              ethNFTCreatorWalletAddress={undefined}
              ethNFTCreatorDesoProfile={undefined}
              ethNFTOwnerDesoPublicKey={undefined}
            ></BidBox>
          </div>
          <div className={styles.btn_grp}>
            {loggedInUser?.PublicKeyBase58Check !=
              post?.PosterPublicKeyBase58Check &&
            post?.NumNFTCopiesForSale > 0 ? (
              isBuyNow ? (
                <button
                  type="button"
                  onClick={(e) => openBuyNowModal(e)}
                  className={
                    styles.fill_btn + " " + styles.discovery_button_movement
                  }
                >
                  Buy Now
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => openPlaceBidModal(e)}
                  className={
                    styles.fill_btn + " " + styles.discovery_button_movement
                  }
                >
                  {myBidsLength > 0 ? "Bid again" : "Place a Bid"}
                </button>
              )
            ) : null}

            {loggedInUser?.PublicKeyBase58Check &&
            loggedInUser?.PublicKeyBase58Check !==
              post?.PosterPublicKeyBase58Check &&
            post?.NumNFTCopiesForSale === 0 ? (
              <div className={styles.discovery_follow_parent}>
                {/* <follow-button
                    [followButtonClasses]="['discovery-follow-button', 'discovery-button-movement']"
                    [unfollowButtonClasses]="['discovery-follow-button', 'discovery-button-movement']"
                    [followedPubKeyBase58Check]="post?.PosterPublicKeyBase58Check"
                ></follow-button> */}
              </div>
            ) : null}

            <button
              onClick={() => viewNFT()}
              type="button"
              className={styles.line_btn}
            >
              View
            </button>
          </div>
        </div>
      </div>
      <div className={styles.disc_art_right}>
        {/*  Image Post  */}
        {post?.ImageURLs &&
        post?.ImageURLs[0] &&
        !post.ParentStakeID &&
        !post?.PostExtraData["arweaveAudioSrc"] &&
        !post?.PostExtraData["arweaveModelSrc"] ? (
          <ImageComponent imageSrc={post.ImageURLs[0]}></ImageComponent>
        ) : null}

        {/* <!-- Audio Post --> */}
        {post?.PostExtraData["arweaveAudioSrc"] ? (
          <AudioComponent
            imageSrc={post.ImageURLs[0]}
            songName={post?.PostExtraData["name"]}
            creator={post.ProfileEntryResponse?.Username}
            audioSrc={post.PostExtraData["arweaveAudioSrc"]}
          ></AudioComponent>
        ) : null}

        {/* <!-- Video Post --> */}
        {post?.PostExtraData["arweaveVideoSrc"] ? (
          <VideoComponent
            videoSrc={post.PostExtraData["arweaveVideoSrc"]}
          ></VideoComponent>
        ) : null}

        {/* <!-- Reqular deso video --> */}
        {post?.VideoURLs &&
        post?.VideoURLs[0] &&
        !post?.ParentStakeID &&
        !post?.PostExtraData["arweaveVideoSrc"] ? (
          <div className={styles.iframe_container}>
            <iframe
              allowFullScreen
              src="post.VideoURLs[0] | sanitizeVideoUrl"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              className="w-100 br-10px"
            ></iframe>
          </div>
        ) : null}

        {/* <!-- 3D Model Post --> */}
        {post?.PostExtraData["arweaveModelSrc"] ? (
          <div style={{ height: "100%", width: "100%" }}>
            {post.ImageURLs && post.ImageURLs[0] && !post.ParentStakeID ? (
              <div style={{ height: "100%", width: "100%" }}>
                <ModelComponent
                  postModelArweaveSrc={post.PostExtraData["arweaveModelSrc"]}
                ></ModelComponent>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default PromotedNFT;
