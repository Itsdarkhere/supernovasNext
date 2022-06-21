import styles from "../../styles/Activity/bidsAccordion.module.scss";
import Image from "next/image";
import { nanosToDeSo, nanosToUSD } from "../../utils/global-context";
import Avatar from "../Reusables/avatar";
import videoTypeIcon from "../../public/icons/video-type.svg";
import chevronDownIcon from "../../public/icons/chevron-down.svg";
import { NFTBidEntryResponse } from "../../utils/backendapi-context";
import { useState } from "react";

const BidsAccordion = ({ nftEntry }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  // Functions
  const mapImageURLs = (imgURL: string): string => {
    if (imgURL.startsWith("https://i.imgur.com")) {
      return imgURL.replace(
        "https://i.imgur.com",
        "https://images.bitclout.com/i.imgur.com"
      );
    }
    return imgURL;
  };

  const checkSelectedBidEntries = (bidEntry: NFTBidEntryResponse): void => {
    bidEntry.selected = true;
    nftEntry.BidEntryResponses.forEach((bidEntryResponse) => {
      if (
        bidEntryResponse.SerialNumber === bidEntry.SerialNumber &&
        bidEntry !== bidEntryResponse &&
        bidEntryResponse.selected
      ) {
        bidEntryResponse.selected = false;
      }
    });
    sellNFT();
  };

  const sellNFT = (): void => {
    // put back
    // const sellNFTModalDetails = modalService.show(SellNftModalComponent, {
    //   class: "modal-dialog-center",
    //   initialState: {
    //     post: nftEntry.PostEntryResponse,
    //     nftEntries: nftEntry.NFTEntryResponses,
    //     selectedBidEntries: nftEntry.BidEntryResponses.filter(
    //       (bidEntry) => bidEntry.selected
    //     ),
    //   },
    // });
    // const onHiddenEvent = sellNFTModalDetails.onHidden.pipe(take(1));
    // onHiddenEvent.subscribe((response) => {
    //   if (response === "nft sold") {
    //     // This is different from basic implementation
    //     window.location.reload();
    //   } else if (response === "unlockable content opened") {
    //     const unlockableModalDetails = modalService.show(
    //       AddUnlockableModalComponent,
    //       {
    //         class: "modal-dialog-centered",
    //         initialState: {
    //           post: this.nftEntry.PostEntryResponse,
    //           selectedBidEntries: this.nftEntry.BidEntryResponses.filter(
    //             (bidEntry) => bidEntry.selected
    //           ),
    //         },
    //       }
    //     );
    //     const onHiddenEvent = unlockableModalDetails.onHidden.pipe(take(1));
    //     onHiddenEvent.subscribe((response) => {
    //       if (response === "nft sold") {
    //         // This is different from basic implementation
    //         window.location.reload();
    //       }
    //     });
    //   }
    // });
  };

  return (
    <div className="bids-accordion-container br-13px mt-10px">
      <button
        onClick={() => toggleAccordion()}
        className="w-100 activity-box-bids"
      >
        {/* <!-- IMAGE --> */}
        <div className="activity-frame-container-bids">
          {nftEntry.PostEntryResponse?.ImageURLs &&
          nftEntry.PostEntryResponse?.ImageURLs[0] &&
          !nftEntry.PostEntryResponse?.ParentStakeID ? (
            <div className="image-size-active-bids-accordion">
              <Image
                data-toggle="modal"
                className="h-100"
                alt="nft image"
                src={mapImageURLs(nftEntry.PostEntryResponse.ImageURLs[0])}
              />
            </div>
          ) : null}

          {/* <!-- VIDEO --> */}
          {nftEntry.PostEntryResponse?.VideoURLs &&
          nftEntry.PostEntryResponse?.VideoURLs[0] ? (
            <div
              className={[
                "image-size-active-bids-accordion w-100 d-flex flex-center position-relative",
              ].join(" ")}
            >
              <Image src={videoTypeIcon} alt="creator icon" />
            </div>
          ) : null}
        </div>
        <div className="active-bids-bid-info-accordion">
          <div className="h-80 w-100 bids-highest-bid position-relative">
            <label className="fs-14px color-light font-weight-semiboldn mb-0px p-a-top">
              HIGHEST BID
            </label>
            <div className="fs-26px font-weight-bold mt-5px text-overflow-ellipsis">
              <span>
                {nanosToUSD(
                  nftEntry.NFTEntryResponses[0].HighestBidAmountNanos,
                  2
                )}
              </span>
            </div>
            <div className="fs-14px p-a-bottom text-overflow-ellipsis">
              <span>
                {nanosToDeSo(
                  nftEntry.NFTEntryResponses[0].HighestBidAmountNanos,
                  5
                )}{" "}
                $DESO
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex flex-center-start h-100 grid-area-c">
          <div className="d-flex flex-column flex-start-center h-80 position-relative">
            <label className="font-weight-semiboldn color-light mb-0px fs-14px font-weight-semiboldn mb-0px p-a-top">
              MADE BY
            </label>
            <div className="d-flex flex-row flex-center mt-10px">
              <div>
                <Avatar
                  classN="received-bids-avatar br-30px"
                  avatar={nftEntry.BidEntryResponses[0]?.PublicKeyBase58Check}
                ></Avatar>
              </div>
              <div className="d-flex">
                {/* [ngClass]="{ 'cursor-pointer': !!nftEntry.BidEntryResponses[0]?.ProfileEntryResponse?.Username }"
              [style.pointer-events]="!!nftEntry.BidEntryResponses[0]?.ProfileEntryResponse?.Username ? 'auto' : 'none'"
              [routerLink]="
                nftEntry.BidEntryResponses[0]?.ProfileEntryResponse?.Username
                  ? [
                      '/' + globalVars.RouteNames.USER_PREFIX,
                      nftEntry.BidEntryResponses[0]?.ProfileEntryResponse.Username
                    ]
                  : []
              " */}
                <div
                  className="fc-default ml-10px font-weight-bold text-overflow-ellipsis text-truncate fs-18px"
                  style={{ maxWidth: "120px" }}
                >
                  {nftEntry.BidEntryResponses[0]?.ProfileEntryResponse
                    ?.Username ||
                    nftEntry.BidEntryResponses[0]?.PublicKeyBase58Check}
                </div>
                {/*
              (click)="tooltip.toggle()" */}
                {/* [matTooltip]="'This account is verified'"
              #tooltip="matTooltip" */}
                {nftEntry.BidEntryResponses[0]?.ProfileEntryResponse
                  ?.IsVerified ? (
                  <span
                    className="ml-1 mb-1 cursor-pointer text-primary"
                    matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
                  >
                    <i className="fas fa-check-circle fa-md align-middle"></i>
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="bids-dropdown-icon-container h-100 grid-area-d">
          <img
            src={chevronDownIcon}
            className={["bids-dropdown-icon", accordionOpen ? "open" : ""].join(
              " "
            )}
            alt="arrow down"
          />
        </div>
      </button>
      <div
        className={[
          "bids-received-accordion disable-scrollbars",
          accordionOpen ? "open" : "",
        ].join(" ")}
      >
        {nftEntry.BidEntryResponses.map((bidEntry, index) => (
          <div key={index}>
            <button className="bids-received-bid">
              <div className="grid-area-a d-flex flex-column flex-start-center h-100">
                <div className="h-90 position-relative d-flex flex-center-start">
                  <label className="font-weight-semiboldn color-light mb-0px fs-14px font-weight-semiboldn mb-0px p-a-top-0">
                    BID on{" "}
                    {bidEntry.SerialNumber > 0 &&
                      "#" + bidEntry.SerialNumber.toString()}
                  </label>
                  <div className="mt-15px">
                    <span className="fs-28px font-weight-semiboldn text-overflow-ellipsis">
                      {nanosToUSD(bidEntry.BidAmountNanos, 2)}
                    </span>
                    <span className="fs-20px ml-10px color-light text-overflow-ellipsis">
                      {nanosToDeSo(bidEntry.BidAmountNanos, 5)} $DESO
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid-area-b h-100 d-flex flex-center-start">
                <div className="d-flex flex-column flex-start-center h-90 position-relative pr-10px">
                  <label className="font-weight-semiboldn color-light mb-0px fs-14px font-weight-semiboldn mb-0px p-a-top-0">
                    MADE BY
                  </label>
                  <div className="d-flex flex-row flex-center mt-15px">
                    <div>
                      <Avatar
                        classN="received-bids-avatar br-30px"
                        avatar={bidEntry.PublicKeyBase58Check}
                      ></Avatar>
                    </div>
                    <div className="d-flex">
                      {/* [ngClass]="{ 'cursor-pointer': !!bidEntry.ProfileEntryResponse?.Username }"
                    [style.pointer-events]="!!bidEntry.ProfileEntryResponse?.Username ? 'auto' : 'none'"
                    [routerLink]="
                      bidEntry.ProfileEntryResponse?.Username
                        ? ['/' + globalVars.RouteNames.USER_PREFIX, bidEntry.ProfileEntryResponse.Username]
                        : []
                    " */}
                      <div
                        className="fc-default ml-10px text-overflow-ellipsis font-weight-bold text-truncate fs-18px"
                        style={{ maxWidth: "120px" }}
                      >
                        {bidEntry.ProfileEntryResponse?.Username ||
                          bidEntry.PublicKeyBase58Check}
                      </div>
                      {/*
                    (click)="tooltip.toggle()" */}
                      {/* [matTooltip]="'This account is verified'"
                    #tooltip="matTooltip" */}
                      {bidEntry.ProfileEntryResponse?.IsVerified ? (
                        <span
                          className="ml-1 mb-1 cursor-pointer text-primary"
                          matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
                        >
                          <i className="fas fa-check-circle fa-md align-middle"></i>
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid-area-c h-100 d-flex flex-center">
                <button
                  onClick={() => checkSelectedBidEntries(bidEntry)}
                  className="black-rounded-button font-weight-bold h-40px w-100 max-width-225px"
                >
                  Accept bid
                </button>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BidsAccordion;
