import styles from "../../styles/Feed/feedPostDropdown.module.scss";
import linkIcon from "../../public/icons/link-icon.svg";
import putForSaleIcon from "../../public/icons/put_for_sale.svg";
import transferIcon from "../../public/icons/transfer-icon.svg";
import hideIcon from "../../public/icons/hide-icon.svg";
import reportIcon from "../../public/icons/report-icon.svg";
import blockIcon from "../../public/icons/block-icon.svg";

import Image from "next/image";
import {
  convertTstampToDaysOrHours,
  hasUserBlockedCreator,
  showAdminTools,
  _alertError,
  _alertSuccess,
} from "../../utils/global-context";
import { ReportPostEmail } from "../../utils/backendapi-context";
import { useAppSelector } from "../../utils/Redux/hooks";

const FeedPostDropdown = ({
  post,
  nftEntryResponses,
  postContent,
  ownsEthNFT,
  postHidden,
  togglePostPin,
  userBlocked,
  toggleGlobalFeed,
}) => {
  // Redux
  let isEthereumNFTForSale = useAppSelector(
    (state) => state.imx.isEthereumNFTForSale
  );
  let localNode = useAppSelector((state) => state.node.localNode);
  let loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  // Functions
  const globalFeedEligible = (): boolean => {
    return showAdminTools();
  };

  const showAddToGlobalFeedDropdownItem = (): boolean => {
    return globalFeedEligible() && !post.InGlobalFeed;
  };

  const showRemoveFromGlobalFeedDropdownItem = (): boolean => {
    return globalFeedEligible() && post.InGlobalFeed;
  };

  const showPinPostToGlobalFeedDropdownItem = (): boolean => {
    return globalFeedEligible() && !post.IsPinned;
  };

  const showUnpinPostFromGlobalFeedDropdownItem = (): boolean => {
    return globalFeedEligible() && post.IsPinned;
  };

  const showCreateNFTAuction = (): boolean => {
    return (
      post.IsNFT &&
      !!nftEntryResponses?.filter(
        (nftEntryResponse) =>
          !nftEntryResponse.IsForSale &&
          nftEntryResponse.OwnerPublicKeyBase58Check ===
            loggedInUser?.PublicKeyBase58Check
      )?.length
    );
  };

  const showCreateETHNFTAuction = (): boolean => {
    if (
      postContent?.PostExtraData?.isEthereumNFT === "true" &&
      !isEthereumNFTForSale &&
      ownsEthNFT
    ) {
      return true;
    } else {
      return false;
    }
  };

  const reportPost = (): void => {
    let link = "";
    if (post.IsNFT) {
      link =
        "<a href='" +
        "https://supernovas.app/nft/" +
        post.PostHashHex +
        "'>View reported content</a>";
    } else {
      link =
        "<a href='" +
        "https://supernovas.app/posts/" +
        post.PostHashHex +
        "'>View reported content</a>";
    }
    ReportPostEmail(localNode, link).subscribe({
      next: (res) => {
        _alertSuccess("Content reported, we are looking into it!");
      },
      error: (err) => {
        _alertError("Error reporting content: " + err);
      },
    });
  };

  const showBlockUserDropdownItem = () => {
    if (!loggedInUser) {
      return false;
    }

    // User shouldn't be able to block themselves
    return (
      loggedInUser?.PublicKeyBase58Check !== post.PosterPublicKeyBase58Check &&
      !hasUserBlockedCreator(post.PosterPublicKeyBase58Check)
    );
  };
  // Functions end
  // dropdown (click)="$event.stopPropagation()" container="body"
  return (
    <div className="d-flex" style={{ alignItems: "center" }}>
      <div className="d-flex fs-12px fc-muted" style={{ paddingRight: "6px" }}>
        {/*  #tooltip="matTooltip"
      [matTooltip]="globalVars.convertTstampToDateTime(postContent.TimestampNanos)" 
      matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"*/}
        <span
          className="d-inline-block ml-1 cursor-pointer lh-12px fc-muted align-middle"
          mat-raised-button
        >
          {convertTstampToDaysOrHours(postContent?.TimestampNanos)}
        </span>
      </div>
      {/* dropdownToggle */}
      <a
        className="js-feed-post__dropdown-toggle link--unstyled text-grey9"
        role="button"
      >
        <i className="fas fa-ellipsis-h"></i>
      </a>
      {/* *dropdownMenu */}
      <div className="dropdown-menu dropdown-menu-right p-0">
        {/* (click)="copyPostLinkToClipboard($event)" */}
        <a className="dropdown-menu-item fs-12px d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn">
          <Image src={linkIcon} height={15} alt="link icon" />
          Link to Post
        </a>
        {/* <!-- put on sale deso --> */}
        {/* (click)="openCreateNFTAuctionModal($event)" */}
        {showCreateNFTAuction() ? (
          <a className="dropdown-menu-item fs-12px d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn">
            <Image src={putForSaleIcon} height={15} alt="put for sale icon" />
            Put On Sale
          </a>
        ) : null}

        {/* <!-- put on sale eth --> */}
        {/* (click)="openCreateETHNFTAuctionModal($event)" */}
        {showCreateETHNFTAuction() ? (
          <a className="dropdown-menu-item fs-12px d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn">
            <Image src={putForSaleIcon} height={15} alt="put for sale icon" />
            Put On Sale
          </a>
        ) : null}

        {/* (click)="openTransferModal($event)" */}
        {showCreateNFTAuction() ? (
          <a className="dropdown-menu-item fs-12px d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn">
            <Image src={transferIcon} height={15} alt="transfer icon" />
            Transfer
          </a>
        ) : null}

        {/* (click)="openBurnModal($event)" */}
        {showCreateNFTAuction() ? (
          <a className="dropdown-menu-item fs-12px d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn">
            <Image src={hideIcon} height={15} alt="burn icon" />
            Burn
          </a>
        ) : null}

        {/* (click)="dropNFT()" */}
        {post.IsNFT && showAdminTools() ? (
          <a className="dropdown-menu-item fs-12px d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn">
            <i className="fas fa-tint"></i>
            Add NFT to drop
          </a>
        ) : null}

        {post.InMempool ? (
          <a
            className="dropdown-menu-item fs-12px d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn"
            style={{ cursor: "default" }}
          >
            <i className="fas fa-spinner"></i>
            Status: Mining...
          </a>
        ) : null}

        {/* (click)="reportPost()" */}
        <a className="dropdown-menu-item border-top fs-12px d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn feed-post__dropdown-menu-item-color-light">
          <Image src={reportIcon} height={15} alt="report icon" />
          Report Content
        </a>

        {/*(click)="hidePost()" */}
        <a className="dropdown-menu-item fs-12px d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn feed-post__dropdown-menu-item-color-light">
          <Image src={hideIcon} height={15} alt="hide icon" />
          Hide
        </a>

        {/* (click)="blockUser()" */}
        {showBlockUserDropdownItem() ? (
          <a className="dropdown-menu-item fs-12px d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn feed-post__dropdown-menu-item-color-light">
            <Image src={blockIcon} height={15} alt="block icon" />
            Block User
          </a>
        ) : null}

        {/*(click)="_addPostToGlobalFeed($event)" */}
        {showAddToGlobalFeedDropdownItem() ? (
          <a className="dropdown-menu-item d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn fs-12px">
            <i className="fas fa-folder-plus"></i>
            Add To Feed
          </a>
        ) : null}

        {/*
      (click)="_addPostToGlobalFeed($event)" */}
        {showRemoveFromGlobalFeedDropdownItem() ? (
          <a className="dropdown-menu-item d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn fs-12px">
            <i className="fas fa-folder-minus"></i>
            Remove From Feed
          </a>
        ) : null}

        {/* (click)="_pinPostToGlobalFeed($event)" */}
        {showPinPostToGlobalFeedDropdownItem() ? (
          <a className="dropdown-menu-item d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn fs-12px">
            <i className="fas fa-thumbtack"></i>
            Pin To Feed
          </a>
        ) : null}

        {/*(click)="_pinPostToGlobalFeed($event)" */}
        {showUnpinPostFromGlobalFeedDropdownItem() ? (
          <a className="dropdown-menu-item d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn fs-12px">
            <i className="fas fa-undo"></i>
            Unpin From Feed
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default FeedPostDropdown;
