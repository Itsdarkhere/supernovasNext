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
  getTargetComponentSelector,
  hasUserBlockedCreator,
  showAdminTools,
  _alertError,
  _alertSuccess,
  _copyText,
} from "../../utils/global-context";
import { AdminGetNFTDrop, AdminUpdateNFTDrop, ReportPostEmail, RouteNames } from "../../utils/backendapi-context";
import { useAppSelector } from "../../utils/Redux/hooks";
import { take } from "rxjs";
import { SwalHelper } from "../../utils/helpers/swal-helper";

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

  const copyPostLinkToClipboard = (event) => {
    // Prevent the post from navigating.
    event.stopPropagation();

    _copyText(_getPostUrl());
  }

  const openCreateNFTAuctionModal = (event): void => {
    // Put back
    // var auctionModalDetails = modalService.show(CreateNftAuctionModalComponent, {
    //   class: "modal-dialog-centered nft_placebid_modal_bx  nft_placebid_modal_bx_right modal-lg",
    //   initialState: { post: post, nftEntryResponses: nftEntryResponses },
    // });
    // let onHiddenEvent = auctionModalDetails.onHidden.pipe(take(1));
    // onHiddenEvent.subscribe((response) => {
    //   if (response === "nft auction started") {
    //     window.location.reload();
    //   }
    // });
  }

  const _getPostUrl = () => {
    const pathArray = ["/" + RouteNames.POSTS, postContent.PostHashHex];

    // need to preserve the curent query params for our dev env to work
    return "";
    // Put back
    // const currentQueryParams = activatedRoute.snapshot.queryParams;

    // const path = router.createUrlTree(pathArray, { queryParams: currentQueryParams }).toString();
    // const origin = (platformLocation as any).location.origin;

    // return origin + path;
  }

  const openCreateETHNFTAuctionModal = (event): void => {
    // Put back
    // token_id = postContent.PostExtraData["tokenId"];
    // console.log(` ------------------- tokenId from feed-post is ${token_id}`);

    // modalService.show(CreateNftAuctionModalComponent, {
    //   class:
    //     "modal-dialog-centered nft_placebid_modal_bx  nft_placebid_modal_bx_right nft_placebid_modal_bx_right modal-lg",
    //   initialState: {
    //     post: postContent,
    //     nftEntryResponses: nftEntryResponses,
    //     isEthNFT: true,
    //     tokenId: token_id,
    //   },
    // });
  }

  const openBurnModal = (event): void => {
    // Put back
    // this.openInteractionModalBurn(event, TransferModalComponent);
  }

  const openTransferModal = (event): void => {
    // Put back
    // this.openInteractionModalTransfer(event, TransferModalComponent);
  }

  const _addPostToGlobalFeed = (event: any) => {
    toggleGlobalFeed(event);
  }

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

  const dropNFT = () => {
    // Get the latest drop so that we can update it.
    // Get the latest drop so that we can update it.
    AdminGetNFTDrop(localNode, loggedInUser.PublicKeyBase58Check, -1 /*DropNumber*/)
      .subscribe(
        (res: any) => {
          console.log("RES");
          if (res.data.DropEntry.DropTstampNanos == 0) {
            _alertError("There are no drops. Make one in the admin NFT tab.");
            return;
          }

          let currentTime = new Date();
          if (res.data.DropEntry.DropTstampNanos / 1e6 < currentTime.getTime()) {
            SwalHelper.fire({
              target: getTargetComponentSelector(),
              html:
                `The latest drop has already dropped.  Add this NFT to the active drop? ` +
                `If you would like to make a new drop, make one in the NFT admin tab first.`,
              showCancelButton: true,
              showConfirmButton: true,
              focusConfirm: true,
              customClass: {
                confirmButton: "btn btn-light",
                cancelButton: "btn btn-light no",
              },
              confirmButtonText: "Yes",
              cancelButtonText: "No",
              reverseButtons: true,
            }).then(async (alertRes: any) => {
              if (alertRes.isConfirmed) {
                addNFTToLatestDrop(res.data.DropEntry, post.PostHashHex);
              }
            });
            return;
          }

          addNFTToLatestDrop(res.DropEntry, post.PostHashHex);
        },
        (error) => {
          _alertError(error.error.error);
        }
      );
  }

  const addNFTToLatestDrop = (latestDrop: any, postHash: string) => {
    AdminUpdateNFTDrop(
        localNode,
        loggedInUser.PublicKeyBase58Check,
        latestDrop.DropNumber,
        latestDrop.DropTstampNanos,
        latestDrop.IsActive /*IsActive*/,
        postHash /*NFTHashHexToAdd*/,
        "" /*NFTHashHexToRemove*/
      )
      .subscribe(
        (res: any) => {
          _alertSuccess("Successfully added NFT to drop #" + latestDrop.DropNumber.toString());
        },
        (error) => {
          _alertError(error.error.error);
        }
      );
  }

  const hidePost = () => {
    postHidden();
  }

  const _pinPostToGlobalFeed = (event: any) => {
    togglePostPin(event);
  }

  const blockUser = () => {
    userBlocked();
  }

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
        <Dropdown.Item
          onClick={(e) => copyPostLinkToClipboard(e)}
          icon={<Image src={linkIcon} height={15} alt="link icon" />}
          className="dropdown-menu-item fs-12px font-weight-semiboldn"
        >
          Link to Post
        </Dropdown.Item>
        {/* <!-- put on sale deso --> */}
        {showCreateNFTAuction() ? (
          <Dropdown.Item
            onClick={(e) => openCreateNFTAuctionModal(e)}
            icon={
              <Image src={putForSaleIcon} height={15} alt="put for sale icon" />
            }
            className="dropdown-menu-item fs-12px font-weight-semiboldn"
          >
            Put On Sale
          </Dropdown.Item>
        ) : null}

        {/* <!-- put on sale eth --> */}
        {showCreateETHNFTAuction() ? (
          <Dropdown.Item
            onClick={(e) => openCreateETHNFTAuctionModal(e)}
            icon={
              <Image src={putForSaleIcon} height={15} alt="put for sale icon" />
            }
            className="dropdown-menu-item fs-12px font-weight-semiboldn"
          >
            Put On Sale
          </Dropdown.Item>
        ) : null}

        {showCreateNFTAuction() ? (
          <Dropdown.Item
            onClick={(e) => openTransferModal(e)}
            icon={<Image src={transferIcon} height={15} alt="transfer icon" />}
            className="dropdown-menu-item fs-12px font-weight-semiboldn"
          >
            Transfer
          </Dropdown.Item>
        ) : null}

        {showCreateNFTAuction() ? (
          <Dropdown.Item
            onClick={(e) => openBurnModal(e)}
            icon={<Image src={hideIcon} height={15} alt="burn icon" />}
            className="dropdown-menu-item fs-12px d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn"
          >
            Burn
          </Dropdown.Item>
        ) : null}

        {post.IsNFT && showAdminTools() ? (
          <Dropdown.Item
            onClick={() => dropNFT()}
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

        <Dropdown.Item
          onClick={() => reportPost()}
          icon={<Image src={reportIcon} height={15} alt="report icon" />}
          className="dropdown-menu-item border-top fs-12px font-weight-semiboldn"
        >
          Report Content
        </Dropdown.Item>

        <Dropdown.Item
          onClick={() => hidePost()}
          icon={<Image src={hideIcon} height={15} alt="hide icon" />}
          className="dropdown-menu-item fs-12px d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn feed-post__dropdown-menu-item-color-light"
        >
          Hide
        </Dropdown.Item>

        {showBlockUserDropdownItem() ? (
          <Dropdown.Item
            onClick={() => blockUser()}
            icon={<Image src={blockIcon} height={15} alt="block icon" />}
            className="dropdown-menu-item fs-12px d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn feed-post__dropdown-menu-item-color-light"
          >
            Block User
          </Dropdown.Item>
        ) : null}

        {showAddToGlobalFeedDropdownItem() ? (
          <Dropdown.Item
            onClick={(e) => _addPostToGlobalFeed(e)}
            icon={<i className="fas fa-folder-plus"></i>}
            className="dropdown-menu-item d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn fs-12px"
          >
            Add To Feed
          </Dropdown.Item>
        ) : null}

        {showRemoveFromGlobalFeedDropdownItem() ? (
          <Dropdown.Item
            onClick={(e) => _addPostToGlobalFeed(e)}
            icon={<i className="fas fa-folder-minus"></i>}
            className="dropdown-menu-item d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn fs-12px"
          >
            Remove From Feed
          </Dropdown.Item>
        ) : null}

        {showPinPostToGlobalFeedDropdownItem() ? (
          <Dropdown.Item
            onClick={(e) => _pinPostToGlobalFeed(e)}
            icon={<i className="fas fa-thumbtack"></i>}
            className="dropdown-menu-item d-block link--unstyled p-10px feed-post__dropdown-menu-item font-weight-semiboldn fs-12px"
          >
            Pin To Feed
          </Dropdown.Item>
        ) : null}

        {showUnpinPostFromGlobalFeedDropdownItem() ? (
          <Dropdown.Item
            onClick={(e) => _pinPostToGlobalFeed(e)}
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
