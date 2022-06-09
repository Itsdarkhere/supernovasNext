import styles from "../../styles/Feed/feedPostDropdown.module.scss";
import linkIcon from "../../public/icons/link-icon.svg";
import putForSaleIcon from "../../public/icons/put_for_sale.svg";
import transferIcon from "../../public/icons/transfer-icon.svg";
import hideIcon from "../../public/icons/hide-icon.svg";
import reportIcon from "../../public/icons/report-icon.svg";
import blockIcon from "../../public/icons/block-icon.svg";
import { Dropdown } from "rsuite";
import { IconButton } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

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

  const renderDropdownButton = (props, ref) => {
    return (
      <IconButton
        {...props}
        className={styles.dropdown_button}
        ref={ref}
        circle
        color="white"
        icon={<FontAwesomeIcon icon={faEllipsis} className="cursor-pointer" />}
      />
    );
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
  return (
    <div className="ml-auto d-flex flex-row flex-center">
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
      <Dropdown
        placement="bottomEnd"
        renderToggle={renderDropdownButton}
        className={styles.dropdown}
      >
        {/* (click)="copyPostLinkToClipboard($event)" */}
        <Dropdown.Item
          icon={<Image src={linkIcon} height={15} alt="link icon" />}
          className="dropdown-menu-item fs-12px font-weight-semiboldn"
        >
          Link to Post
        </Dropdown.Item>
        {/* <!-- put on sale deso --> */}
        {/* (click)="openCreateNFTAuctionModal($event)" */}
        {showCreateNFTAuction() ? (
          <Dropdown.Item
            icon={
              <Image src={putForSaleIcon} height={15} alt="put for sale icon" />
            }
            className="dropdown-menu-item fs-12px font-weight-semiboldn"
          >
            Put On Sale
          </Dropdown.Item>
        ) : null}

        {/* <!-- put on sale eth --> */}
        {/* (click)="openCreateETHNFTAuctionModal($event)" */}
        {showCreateETHNFTAuction() ? (
          <Dropdown.Item
            icon={
              <Image src={putForSaleIcon} height={15} alt="put for sale icon" />
            }
            className="dropdown-menu-item fs-12px font-weight-semiboldn"
          >
            Put On Sale
          </Dropdown.Item>
        ) : null}

        {/* (click)="openTransferModal($event)" */}
        {showCreateNFTAuction() ? (
          <Dropdown.Item
            icon={<Image src={transferIcon} height={15} alt="transfer icon" />}
            className="dropdown-menu-item fs-12px font-weight-semiboldn"
          >
            Transfer
          </Dropdown.Item>
        ) : null}

        {/* (click)="openBurnModal($event)" */}
        {showCreateNFTAuction() ? (
          <Dropdown.Item
            icon={<Image src={hideIcon} height={15} alt="burn icon" />}
            className="dropdown-menu-item fs-12px d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn"
          >
            Burn
          </Dropdown.Item>
        ) : null}

        {/* (click)="dropNFT()" */}
        {post.IsNFT && showAdminTools() ? (
          <Dropdown.Item
            icon={<i className="fas fa-tint"></i>}
            className="dropdown-menu-item fs-12px d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn"
          >
            Add NFT to drop
          </Dropdown.Item>
        ) : null}

        {post.InMempool ? (
          <Dropdown.Item
            icon={<i className="fas fa-spinner"></i>}
            className="dropdown-menu-item fs-12px d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn"
            style={{ cursor: "default" }}
          >
            Status: Mining...
          </Dropdown.Item>
        ) : null}

        {/* (click)="reportPost()" */}
        <Dropdown.Item
          icon={<Image src={reportIcon} height={15} alt="report icon" />}
          className="dropdown-menu-item border-top fs-12px font-weight-semiboldn"
        >
          Report Content
        </Dropdown.Item>

        {/*(click)="hidePost()" */}
        <Dropdown.Item
          icon={<Image src={hideIcon} height={15} alt="hide icon" />}
          className="dropdown-menu-item fs-12px d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn feed-post__dropdown-menu-item-color-light"
        >
          Hide
        </Dropdown.Item>

        {/* (click)="blockUser()" */}
        {showBlockUserDropdownItem() ? (
          <Dropdown.Item
            icon={<Image src={blockIcon} height={15} alt="block icon" />}
            className="dropdown-menu-item fs-12px d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn feed-post__dropdown-menu-item-color-light"
          >
            Block User
          </Dropdown.Item>
        ) : null}

        {/*(click)="_addPostToGlobalFeed($event)" */}
        {showAddToGlobalFeedDropdownItem() ? (
          <Dropdown.Item
            icon={<i className="fas fa-folder-plus"></i>}
            className="dropdown-menu-item d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn fs-12px"
          >
            Add To Feed
          </Dropdown.Item>
        ) : null}

        {/*
      (click)="_addPostToGlobalFeed($event)" */}
        {showRemoveFromGlobalFeedDropdownItem() ? (
          <Dropdown.Item
            icon={<i className="fas fa-folder-minus"></i>}
            className="dropdown-menu-item d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn fs-12px"
          >
            Remove From Feed
          </Dropdown.Item>
        ) : null}

        {/* (click)="_pinPostToGlobalFeed($event)" */}
        {showPinPostToGlobalFeedDropdownItem() ? (
          <Dropdown.Item
            icon={<i className="fas fa-thumbtack"></i>}
            className="dropdown-menu-item d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn fs-12px"
          >
            Pin To Feed
          </Dropdown.Item>
        ) : null}

        {/*(click)="_pinPostToGlobalFeed($event)" */}
        {showUnpinPostFromGlobalFeedDropdownItem() ? (
          <Dropdown.Item
            icon={<i className="fas fa-undo"></i>}
            className="dropdown-menu-item d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn fs-12px"
          >
            Unpin From Feed
          </Dropdown.Item>
        ) : null}
      </Dropdown>
    </div>
  );
};

export default FeedPostDropdown;
