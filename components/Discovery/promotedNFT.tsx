import { useEffect, useState } from "react";
import styles from "../../styles/Discovery/promotedNFT.module.scss";
import _ from "lodash";
import {
  GetNFTBidsForNFTPost,
  GetNFTEntriesForNFTPost,
  NFTBidData,
  NFTBidEntryResponse,
} from "../../utils/backendapi-context";
import {
  loggedInUser,
  localNode,
  _alertError,
} from "../../utils/global-context";
import ModelComponent from "../Media/modelComponent";
import ImageComponent from "../Media/imageComponent";
import AudioComponent from "../Media/audioComponent";
import VideoComponent from "../Media/videoComponent";

const PromotedNFT = ({ post, mobile }) => {
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

  const getNFTEntries = () => {
    return GetNFTEntriesForNFTPost(
      localNode,
      loggedInUser?.PublicKeyBase58Check,
      post.PostHashHex
    ).subscribe({
      next: (res) => setIsBuyNow(res.NFTEntryResponses[0].IsBuyNow),
    });
  };

  // Functions end
  return (
    <div className="discovery_wrapper mt-20px">
      <div className="disc_art_left">
        <div className="top_sc" id="discovery_top_sc">
          <div className="dtails_wp">
            <h3>{post?.PostExtraData?.name}</h3>
            {/* *ngIf="!post?.PostExtraData?.name" */}
            <p>{post?.Body}</p>
            {/* *ngIf="post" */}
            <div className="art_details_nv">
              By
              <div className="user_detail">
                <div className="profile-img">
                  {/* <a
                [avatar]="post.ProfileEntryResponse?.PublicKeyBase58Check"
                [routerLink]="['/' + globalVars.RouteNames.USER_PREFIX, post?.ProfileEntryResponse?.Username]"
                queryParamsHandling="merge"
              ></a> */}
                </div>
                {/* [routerLink]="['/' + globalVars.RouteNames.USER_PREFIX, post?.ProfileEntryResponse?.Username]"
              queryParamsHandling="merge" */}
                <span className="val">
                  {post?.ProfileEntryResponse?.Username}
                </span>
                {post?.ProfileEntryResponse?.IsVerified ? (
                  <i className="fas pl-5px fa-check-circle fa-md text-primary"></i>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="btm_sc">
          <div className="hgst_bid_sc w-100">
            {/* <app-nft-detail-box
          *ngIf="post"
          [postContent]="post"
          [nftBidData]="nftBidData"
          [isNFTDetail]="false"
          [hightestBidOwner]="hightestBidOwner"
        ></app-nft-detail-box> */}
          </div>
          <div className="btn_grp">
            {/*(click)="openPlaceBidModal($event)" */}
            {loggedInUser?.PublicKeyBase58Check !=
              post?.PosterPublicKeyBase58Check &&
            post?.NumNFTCopiesForSale > 0 &&
            !isBuyNow ? (
              <button
                type="button"
                className="fill_btn discovery-button-movement"
              >
                {myBidsLength > 0 ? "Bid again" : "Place a Bid"}
              </button>
            ) : (
              <button
                type="button"
                className="fill_btn discovery-button-movement"
              >
                Buy Now
              </button>
            )}
            {/* THIS CLASS BELOW, IS FOR THE BUTTON ABOVE */}
            {/*(click)="openBuyNowModal($event)" */}

            {loggedInUser?.PublicKeyBase58Check !=
              post?.PosterPublicKeyBase58Check &&
            post?.NumNFTCopiesForSale == 0 ? (
              <div className="discovery-follow-parent">
                {/* <follow-button
             [followButtonClasses]="['discovery-follow-button', 'discovery-button-movement']"
             [unfollowButtonClasses]="['discovery-follow-button', 'discovery-button-movement']"
             [followedPubKeyBase58Check]="post?.PosterPublicKeyBase58Check"
           ></follow-button> */}
              </div>
            ) : null}

            {/* (click)="viewNFT()" */}
            <button type="button" className="line_btn">
              View
            </button>
          </div>
        </div>
      </div>
      <div className="disc_art_right">
        {/*  Image Post  */}
        {post?.ImageURLs &&
        post?.ImageURLs[0] &&
        !post.ParentStakeID &&
        !post?.PostExtraData["arweaveAudioSrc"] &&
        !post?.PostExtraData["arweaveModelSrc"] ? (
          <ImageComponent imageSrc="post.ImageURLs[0]"></ImageComponent>
        ) : null}

        {/* <!-- Audio Post --> */}
        {post?.PostExtraData["arweaveAudioSrc"] ? (
          <AudioComponent
            imageSrc="post.ImageURLs[0]"
            songName="post?.PostExtraData['name']"
            creator="post.ProfileEntryResponse?.Username"
            audioSrc="post.PostExtraData['arweaveAudioSrc']"
          ></AudioComponent>
        ) : null}

        {/* <!-- Video Post --> */}
        {post?.PostExtraData["arweaveVideoSrc"] ? (
          <VideoComponent
            videoSrc={post.PostExtraData["arweaveVideoSrc"]}
          ></VideoComponent>
        ) : null}

        {/* <!-- Reqular deso video --> */}
        {/* allowfullscreen put back / check works */}
        {post?.VideoURLs &&
        post?.VideoURLs[0] &&
        !post?.ParentStakeID &&
        !post?.PostExtraData["arweaveVideoSrc"] ? (
          <div className="d-flex flex-center w-100">
            <iframe
              src="post.VideoURLs[0] | sanitizeVideoUrl"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              className="w-100 br-10px"
            ></iframe>
            {/* <!--feed-post__video--> */}
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
