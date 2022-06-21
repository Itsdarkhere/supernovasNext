import styles from "../../styles/Activity/activity.module.scss";
import NFTCard from "../NFT/NFTCard/nftCard";
import TabSelector from "../Reusables/tabSelector";
import Image from "next/image";
import {
  getPostContentHashHex,
  getTargetComponentSelector,
  hasUserBlockedCreator,
  incrementCommentCount,
  nanosToDeSo,
  nanosToUSD,
  _alertError,
} from "../../utils/global-context";
import smallSuccessImage from "../../public/img/small-success.png";
import smallWarningImage from "../../public/img/small-warning.png";
import closeCircleImg from "../../public/img/close-circle.png";
import videoTypeIcon from "../../public/icons/video-type.svg";
import { useEffect, useState } from "react";
import {
  CreateNFTBid,
  GetNFTBidsForNFTPost,
  GetNFTBidsForUser,
  GetNFTsForUser,
  NFTBidEntryResponse,
  NFTEntryResponse,
  PostEntryResponse,
  ProfileEntryResponse,
} from "../../utils/backendapi-context";
import _ from "lodash";
import { Subscription } from "rxjs";
import { useAppSelector } from "../../utils/Redux/hooks";
import { track15, track34 } from "../../utils/mixpanel";
import { useParams, useSearchParams } from "react-router-dom";
import { useRouter } from "next/router";
import BidsAccordion from "./bidsAccordion";
import { SwalHelper } from "../../utils/helpers/swal-helper";

const ActivityContent = () => {
  const BIDS_MADE = "Bids Made";
  const TRANSFERS = "Transfers";
  const BIDS_RECEIVED = "Bids Received";
  const PAGE_SIZE = 20;
  const [activeTab, setActiveTab] = useState(
    (useRouter().query.page || "Bids Made").toString()
  );
  const tabs = [BIDS_MADE, BIDS_RECEIVED, TRANSFERS];
  const [isLoading, setIsLoading] = useState(true);
  const [lastPage, setLastPage] = useState(null);
  const [nftResponse, setNftResponse] = useState<
    {
      NFTEntryResponses: NFTEntryResponse[];
      PostEntryResponse: PostEntryResponse;
    }[]
  >([]);
  const [receivedNFTResponse, setReceivedNFTResponse] = useState([]);
  const [myBids, setMyBids] = useState<NFTBidEntryResponse[]>([]);
  const [mobile, setMobile] = useState(false);
  const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  const localNode = useAppSelector((state) => state.node.localNode);
  const defaultFeeRateNanosPerKB = useAppSelector(
    (state) => state.fees.defaultFeeRateNanosPerKB
  );

  // Functions
  const _handleTabClick = (tabName: string) => {
    setActiveTab(tabName);

    // put back
    // Update query params to reflect current tab
    // const urlTree = this.router.createUrlTree([], {
    //   queryParams: { tab: ActivityComponent.TABS_LOOKUP[tabName] || "bids_made" },
    //   queryParamsHandling: "merge",
    //   preserveFragment: true,
    // });
    // this.location.go(urlTree.toString());
  };

  const getNFTBids = (): Subscription => {
    setIsLoading(true);
    return GetNFTBidsForUser(
      localNode,
      loggedInUser?.PublicKeyBase58Check,
      loggedInUser?.PublicKeyBase58Check
    ).subscribe(
      (res: {
        PublicKeyBase58CheckToProfileEntryResponse: {
          [k: string]: ProfileEntryResponse;
        };
        PostHashHexToPostEntryResponse: { [k: string]: PostEntryResponse };
        NFTBidEntries: NFTBidEntryResponse[];
      }) => {
        _.forIn(res.PostHashHexToPostEntryResponse, (value, key) => {
          value.ProfileEntryResponse =
            res.PublicKeyBase58CheckToProfileEntryResponse[
              value.PosterPublicKeyBase58Check
            ];
          res.PostHashHexToPostEntryResponse[key] = value;
        });
        let TempMyBids = res.NFTBidEntries.map((bidEntry) => {
          bidEntry.PostEntryResponse =
            res.PostHashHexToPostEntryResponse[bidEntry.PostHashHex];
          return bidEntry;
        });
        TempMyBids = TempMyBids.sort(
          (a, b) =>
            a.PostEntryResponse.TimestampNanos -
            b.PostEntryResponse.TimestampNanos
        );
        setLastPage(Math.floor(TempMyBids.length / PAGE_SIZE));
        setMyBids(TempMyBids);
        setIsLoading(false);
        return TempMyBids;
      }
    );
  };

  const getNFTs = (isForSale: boolean | null = null): Subscription => {
    setIsLoading(true);
    return GetNFTsForUser(
      localNode,
      loggedInUser?.PublicKeyBase58Check,
      loggedInUser?.PublicKeyBase58Check,
      isForSale
    ).subscribe(
      (res: {
        NFTsMap: {
          [k: string]: {
            PostEntryResponse: PostEntryResponse;
            NFTEntryResponses: NFTEntryResponse[];
          };
        };
      }) => {
        let tempNFTResponse = [];
        for (const k in res.NFTsMap) {
          const responseElement = res.NFTsMap[k];
          if (activeTab === TRANSFERS) {
            if (responseElement.NFTEntryResponses[0].IsPending) {
              tempNFTResponse.push(responseElement);
            }
          }
        }
        setNftResponse(tempNFTResponse);
        setLastPage(Math.floor(nftResponse.length / PAGE_SIZE));
        setIsLoading(false);
        return nftResponse;
      }
    );
  };

  const getOwnedNFTS = (): Subscription => {
    setIsLoading(true);
    return GetNFTsForUser(
      localNode,
      loggedInUser.PublicKeyBase58Check,
      loggedInUser.PublicKeyBase58Check,
      true
    ).subscribe({
      next: (res: {
        NFTsMap: {
          [k: string]: {
            PostEntryResponse: PostEntryResponse;
            NFTEntryResponses: NFTEntryResponse[];
          };
        };
      }) => {
        let tempReceivedNFTResponse = [];
        for (const k in res.NFTsMap) {
          GetNFTBidsForNFTPost(
            localNode,
            loggedInUser?.PublicKeyBase58Check,
            k
          ).subscribe((res) => {
            tempReceivedNFTResponse.push(res);
          });
        }
        setReceivedNFTResponse(tempReceivedNFTResponse);
        setIsLoading(false);
      },
      error: (err) => {
        setIsLoading(false);
        _alertError("Problem fetching received bids...");
      },
    });
  };

  const getIsForSaleValue = (): boolean | null => {
    if (activeTab === TRANSFERS) {
      return false;
    } else if (activeTab === BIDS_MADE) {
      return null;
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

  const checkNFTbidsReceived = () => {
    for (let x of receivedNFTResponse) {
      if (x.BidEntryResponses) {
        return true;
      }
    }
    return false;
  };

  async function _prependComment(uiPostParent, index, newComment) {
    const uiPostParentHashHex = getPostContentHashHex(uiPostParent);
    // await this.datasource.adapter.relax();
    // await this.datasource.adapter.update({
    //   predicate: ({ $index, data, element }) => {
    //     let currentPost = data as any as PostEntryResponse;
    //     if ($index === index) {
    //       newComment.parentPost = currentPost;
    //       currentPost.Comments = currentPost.Comments || [];
    //       currentPost.Comments.unshift(_.cloneDeep(newComment));
    //       return [incrementCommentCount(currentPost)];
    //     } else if (getPostContentHashHex(currentPost) === uiPostParentHashHex) {
    //       // We also want to increment the comment count on any other notifications related to the same post hash hex.
    //       return [incrementCommentCount(currentPost)];
    //     }
    //     // Leave all other items in the datasource as is.
    //     return true;
    //   },
    // });
  }

  const openPlaceBidModal = (event: any, postEntryResponse) => {
    if (!loggedInUser?.ProfileEntryResponse) {
      _alertError("Create profile to perform this action...");
      return;
    }
    event.stopPropagation();
    track15("Open Place a Bid Modal");
    // Put back
    // const modalDetails = modalService.show(PlaceBidModalComponent, {
    //   class: "modal-dialog-centered nft_placebid_modal_bx buy-modal modal-lg right-align-modal",
    //   initialState: {
    //     post: postEntryResponse,
    //     editionHasBids: true,
    //     clickedPlaceABid: true,
    //     isBuyNow: false,
    //     serialNumber: null,
    //   },
    // });
    // // post: this.postContent
    // const onHideEvent = modalDetails.onHide;
    // onHideEvent.subscribe((response) => {
    //   if (response === "bid placed") {
    //     getNFTBids();
    //   }
    // });
  };

  const openImgModal = (event, imageURL) => {
    event.stopPropagation();
    // put back
    // modalService.show(FeedPostImageModalComponent, {
    //   class: "modal-dialog-centered img_popups modal-lg",
    //   initialState: {
    //     imageURL,
    //   },
    // });
  };

  const cancelBid = (bidEntry: NFTBidEntryResponse): void => {
    SwalHelper.fire({
      target: getTargetComponentSelector(),
      title: "Cancel Bid",
      html: `Are you sure you'd like to cancel this bid?`,
      showCancelButton: true,
      customClass: {
        confirmButton: "btn btn-light",
        cancelButton: "btn btn-light no",
      },
      reverseButtons: true,
    }).then((res) => {
      if (res.isConfirmed) {
        CreateNFTBid(
          localNode,
          loggedInUser.PublicKeyBase58Check,
          bidEntry.PostEntryResponse.PostHashHex,
          bidEntry.SerialNumber,
          0,
          defaultFeeRateNanosPerKB
        ).subscribe(
          () => {
            window.location.reload();
            // Put back
            // return this.datasource.adapter.remove({
            //   predicate: ({ data }) => {
            //     const currBidEntry = data as any as NFTBidEntryResponse;
            //     return (
            //       currBidEntry.SerialNumber === bidEntry.SerialNumber &&
            //       currBidEntry.BidAmountNanos === currBidEntry.BidAmountNanos &&
            //       currBidEntry.PostEntryResponse.PostHashHex ===
            //         bidEntry.PostEntryResponse.PostHashHex
            //     );
            //   },
            // });
          },
          (err) => {
            console.error(err);
          }
        );
      }
    });
  };

  // Lifecycle methods
  useEffect(() => {
    // put back
    // this.setMobileBasedOnViewport();
    if (activeTab === "transfers") {
      getNFTs(getIsForSaleValue());
    } else if (activeTab === "bids_made") {
      // Get BIDS
      getNFTBids();
    } else {
      getOwnedNFTS();
      setIsLoading(false);
    }

    track34("Activity page viewed");
  }, [activeTab]);

  return (
    <div className="w-100 d-flex flex-center">
      <div className={styles.mw_activity + " w-100"}>
        <div className={styles.activity_tab_selector_wrapper}>
          <TabSelector
            tabs={["Bids Made", "Bids Received", "Transfers"]}
            activeTab={activeTab}
            tabClick={(e) => _handleTabClick(e)}
            icons={null}
            extraTab={null}
          ></TabSelector>
        </div>
        {/* <simple-center-loader [height]="200" *ngIf="isLoading"></simple-center-loader> */}
        <div
          className={["pt-0px max-width-100", mobile ? "p-10px" : ""].join(" ")}
        >
          {!nftResponse?.length && activeTab === "Transfers" && !isLoading ? (
            <div className="pt-15px">
              <div
                className="background-color-grey p-35px br-12px d-flex flex-row align-items-center"
                style={{ textAlign: "center" }}
              >
                <span>There is no pending transfers</span>
              </div>
            </div>
          ) : null}

          {!myBids?.length && activeTab === "Bids Made" && !isLoading ? (
            <div className="pt-15px">
              <div
                className="background-color-grey p-35px br-12px d-flex flex-row align-items-center"
                style={{ textAlign: "center" }}
              >
                <span>No bids yet.</span>
              </div>
            </div>
          ) : null}

          {!checkNFTbidsReceived() &&
          activeTab === "Bids Received" &&
          !isLoading ? (
            <div className="pt-15px">
              <div
                className="background-color-grey p-35px br-12px d-flex flex-row align-items-center"
                style={{ textAlign: "center" }}
              >
                <span>No NFTs for sale with bids on them...</span>
              </div>
            </div>
          ) : null}

          {activeTab === "Bids Made" && !isLoading ? (
            <div className="row">
              {myBids?.map((nftEntry, index) => (
                <div key={index} className="col-12">
                  <div className={styles.activity_box + " w-100 mt-20px"}>
                    {/* <!-- IMAGE --> */}
                    <div className={styles.activity_frame_container}>
                      {nftEntry.PostEntryResponse.ImageURLs &&
                      nftEntry.PostEntryResponse.ImageURLs[0] &&
                      !nftEntry.PostEntryResponse.ParentStakeID ? (
                        <div className={styles.image_size_active_bids}>
                          <Image
                            onClick={(e) =>
                              openImgModal(
                                e,
                                nftEntry.PostEntryResponse.ImageURLs[0]
                              )
                            }
                            data-toggle="modal"
                            className="h-100"
                            src={mapImageURLs(
                              nftEntry.PostEntryResponse.ImageURLs[0]
                            )}
                            alt="nft image"
                          />
                        </div>
                      ) : null}

                      {/* <!-- VIDEO --> */}
                      {nftEntry.PostEntryResponse?.VideoURLs &&
                      nftEntry.PostEntryResponse?.VideoURLs[0] ? (
                        <div
                          className={[
                            styles.image_size_active_bids,
                            "d-flex flex-center",
                          ].join(" ")}
                        >
                          <Image src={videoTypeIcon} alt="creator icon" />
                        </div>
                      ) : null}
                    </div>
                    <div className={styles.active_bids_bid_info}>
                      {nftEntry.HighestBidAmountNanos ==
                      nftEntry.BidAmountNanos ? (
                        <label className="fs-12px font-weight-bold mb-0px">
                          YOUR BID
                        </label>
                      ) : null}

                      {nftEntry.HighestBidAmountNanos >
                      nftEntry.BidAmountNanos ? (
                        <label className="fs-12px font-weight-bold mb-0px">
                          HIGHEST BID
                        </label>
                      ) : null}

                      <div className="fs-26px font-weight-bold mt-5px">
                        {nftEntry.HighestBidAmountNanos ==
                        nftEntry.BidAmountNanos ? (
                          <span>{nanosToUSD(nftEntry.BidAmountNanos, 2)}</span>
                        ) : null}

                        {nftEntry.HighestBidAmountNanos >
                        nftEntry.BidAmountNanos ? (
                          <span>
                            {nanosToUSD(nftEntry.HighestBidAmountNanos, 2)}
                          </span>
                        ) : null}
                      </div>
                      <div className="fs-14px">
                        {nftEntry.HighestBidAmountNanos ==
                        nftEntry.BidAmountNanos ? (
                          <span>
                            {nanosToDeSo(nftEntry.BidAmountNanos, 5)} $DESO
                          </span>
                        ) : null}

                        {nftEntry.HighestBidAmountNanos >
                        nftEntry.BidAmountNanos ? (
                          <span>
                            {nanosToDeSo(nftEntry.HighestBidAmountNanos, 5)}{" "}
                            $DESO
                          </span>
                        ) : null}
                      </div>
                      <div className="fs-12px">
                        Serial #{nftEntry.SerialNumber}
                      </div>
                    </div>
                    <div className={styles.active_bids_bid_status}>
                      {nftEntry.HighestBidAmountNanos >
                      nftEntry.BidAmountNanos ? (
                        <div className={styles.status_outbid}>
                          <Image
                            src={smallWarningImage}
                            className="pr-5px mt-5px"
                            alt="warning icon"
                          />
                          Outbid
                        </div>
                      ) : null}

                      {/* class="status-outbid-text" */}
                      {nftEntry.HighestBidAmountNanos >
                      nftEntry.BidAmountNanos ? (
                        <div>Make a higher bid to stay in the race!</div>
                      ) : null}

                      {nftEntry.HighestBidAmountNanos ===
                        nftEntry.BidAmountNanos &&
                      nftEntry.BidderBalanceNanos >= nftEntry.BidAmountNanos ? (
                        <div className={styles.status_lead}>
                          <Image
                            src={smallSuccessImage}
                            alt="success icon"
                            className="pr-5px"
                          />
                          You are in the lead!
                        </div>
                      ) : null}

                      {nftEntry.HighestBidAmountNanos ===
                        nftEntry.BidAmountNanos &&
                      nftEntry.BidderBalanceNanos >= nftEntry.BidAmountNanos ? (
                        <div className={styles.status_lead_text}>
                          Your bid is the highest one for this serial number.
                        </div>
                      ) : null}
                    </div>
                    <div className={styles.active_bids_buttons}>
                      {nftEntry.HighestBidAmountNanos >
                      nftEntry.BidAmountNanos ? (
                        <button
                          onClick={(e) =>
                            openPlaceBidModal(e, nftEntry.PostEntryResponse)
                          }
                          className={
                            styles.active_bids_button_pab + " hover-scale"
                          }
                        >
                          Place a Bid
                        </button>
                      ) : null}

                      {/* [routerLink]="['/' + globalVars.RouteNames.POSTS, nftEntry.PostEntryResponse.PostHashHex]" 
                  [ngClass]="nftEntry.HighestBidAmountNanos > nftEntry.BidAmountNanos ? 'mt-10px' : ''"
                  queryParamsHandling="merge"
                  */}
                      <a
                        className={[
                          styles.active_bids_button_vnft,
                          "hover-scale",
                          nftEntry.HighestBidAmountNanos >
                          nftEntry.BidAmountNanos
                            ? "mt-10px"
                            : "",
                        ].join(" ")}
                      >
                        View NFT
                      </a>
                      <button
                        onClick={() => cancelBid(nftEntry)}
                        className={
                          styles.active_bids_button_cb + " mt-10px hover-scale"
                        }
                      >
                        <Image src={closeCircleImg} alt="close indicator" />
                        Cancel your Bid
                      </button>
                    </div>
                  </div>
                  <div className="fs-12px pt-0px">
                    {nftEntry.BidderBalanceNanos < nftEntry.BidAmountNanos ? (
                      <div
                        className={[
                          "fs-12px fc-red",
                          nftEntry.HighestBidAmountNanos >
                          nftEntry.BidAmountNanos
                            ? "pt-5px"
                            : "",
                        ].join(" ")}
                      >
                        You do not have enough DESO for this bid. Place a lower
                        bid or
                        {/* [routerLink]="'/' + globalVars.RouteNames.BUY_DESO" */}
                        <a
                          className="link--unstyled"
                          style={{ textDecoration: "underline" }}
                        >
                          buy DESO
                        </a>
                        .
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {activeTab === "Transfers" && !isLoading ? (
            <div className="nfts-card-list nft_creator_list">
              {nftResponse.map((nftEntry, index) => (
                <div key={index} className="nft-col-wrap">
                  <div className="max-width-300-plus">
                    {nftEntry.PostEntryResponse.ProfileEntryResponse ? (
                      <NFTCard
                        contentShouldLinkToThread={true}
                        includePaddingOnPost={true}
                        pending={true}
                        owns={true}
                        post={nftEntry.PostEntryResponse}
                        afterCommentCreatedCallback={_prependComment.bind(
                          this,
                          nftEntry.PostEntryResponse,
                          index
                        )}
                        blocked={hasUserBlockedCreator(
                          loggedInUser?.PublicKeyBase58Check
                        )}
                        showNFTDetails={true}
                        showExpandedNFTDetails={false}
                        setBorder={true}
                        showAvailableSerialNumbers={true}
                        cardStyle={true}
                        profilePublicKeyBase58Check={
                          loggedInUser?.PublicKeyBase58Check
                        }
                        isForSaleOnly={false}
                        userBlocked={hasUserBlockedCreator(
                          loggedInUser?.PublicKeyBase58Check
                        )}
                      ></NFTCard>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {activeTab === "Bids Received" && !isLoading ? (
            <div className="nfts-card-list nft_creator_list">
              {receivedNFTResponse.map((nftEntry, index) => (
                <div key={index} className="w-100">
                  {nftEntry.BidEntryResponses ? (
                    <BidsAccordion nftEntry={nftEntry}></BidsAccordion>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="global__bottom-bar-mobile-height"></div>
      </div>
    </div>
  );
};
export default ActivityContent;
