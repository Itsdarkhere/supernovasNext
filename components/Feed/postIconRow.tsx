import styles from "../../styles/fontello.module.scss";
import styles2 from "../../styles/Feed/postIconRow.module.scss";
import {
  abbreviateRepostsNumber,
  doesLoggedInUserHaveProfile,
  getTargetComponentSelector,
  getUSDForDiamond,
  launchSignupFlow,
  _alertError,
} from "../../utils/global-context";
import { useState } from "react";
import { useAppSelector } from "../../utils/Redux/hooks";
import { Dropdown } from "rsuite";
import { CreateLike, parsePostError, parseProfileError, SendDiamonds, SubmitPost } from "../../utils/backendapi-context";
import { SwalHelper } from "../../utils/helpers/swal-helper";
import { track69 } from "../../utils/mixpanel";
import { showCreateProfileToPostDialog } from "../../utils/shared-dialogs";

const PostIconRow = ({
  postContent,
  hideNumbers,
  post,
  parentPost,
  afterCommentCreatedCallback,
  afterRepostCreatedCallback,
}) => {
  // Vars
  const diamondCount = 6;
  let loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);

  // State
  const [diamondsVisible, setDiamondsVisible] = useState<Array<boolean>>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [diamondIndexes, setDiamondIndexes] = useState<Array<number>>([
    0, 1, 2, 3, 4, 5, 6,
  ]);
  const [diamondDragMoved, setDiamondDragMoved] = useState(false);
  const [diamondDragCancel, setDiamondDragCancel] = useState(false);
  const [diamondDragging, setDiamondDragging] = useState(false);
  const [sendingDiamonds, setSendingDiamonds] = useState(false);
  const [collapseDiamondInfo, setCollapseDiamondInfo] = useState(true);
  const [diamondIdxDraggedTo, setDiamondIdxDraggedTo] = useState(-1);
  const [diamondHovered, setDiamondHovered] = useState(-1);
  const [diamondDragLeftExplainer, setDiamondDragLeftExplainer] =
    useState(false);
  const [animateLike, setAnimateLike] = useState(false);
  const [sendingRepostRequest, setSendingRepostRequest] = useState(false);
  // State end

  let feeRateDeSoPerKB = useAppSelector((state) => state.fees.feeRateDeSoPerKB);
  let localNode = useAppSelector((state) => state.node.localNode);

  // Functions

  // Initiate mobile drag, have diamonds appear
  const startDrag = () => {
    globalVars.userIsDragging = true;
    diamondDragMoved = false;
    diamondDragStarted = new Date();
    diamondDragging = true;
    addDiamondSelection({ type: "initiateDrag" });
  }

  // Calculate where the drag box has been dragged to, make updates accordingly
  const duringDrag = (event) => {
    // If this event was triggered, the user moved the drag box, and we assume it's not a click.
    diamondDragMoved = true;
    // Establish a margin to the left and right in order to improve reachability
    const pageMargin = window.innerWidth * 0.15;
    // The width of the page minus the margins
    const selectableWidth = window.innerWidth - 2 * pageMargin;
    // If the selector is in the left margin, choose the first option
    if (event.pointerPosition.x < pageMargin) {
      diamondIdxDraggedTo = 0;
      // If the selector is in the right margin, choose the last option
    } else if (event.pointerPosition.x > selectableWidth + pageMargin) {
      diamondIdxDraggedTo = diamondCount;
    } else {
      // If the selector is in the middle, calculate what % of the middle it has been dragged to, assign a diamond value
      diamondIdxDraggedTo = round(((event.pointerPosition.x - pageMargin) / selectableWidth) * diamondCount);
    }
    // If the selector has been dragged out of the right margin, enable the helper text
    // (we don't want every drag event to start with the helper text enabled)
    if (diamondIdxDraggedTo != diamondCount) {
      diamondDragLeftExplainer = true;
    }
    // If the drag box is at the alloted lower boundry or below, set confirm status to true
    diamondDragCancel = event.distance.y > 30;
  }

  // Triggered on end of a touch. If we determine this was a "click" event, send 1 diamond. Otherwise nothing
  const dragClick = (event) => {
    const now = new Date();
    // If the drag box wasn't moved and less than 200ms have transpired since the start of the tap,
    // assume this was a click and send 1 diamond
    if (!diamondDragMoved) {
      if (now.getTime() - diamondDragStarted.getTime() < 200) {
        // Prevent touch event from propagating
        event.preventDefault();
        sendOneDiamond(event, true);
      }
      // If the diamond drag box wasn't moved, we need to reset these variables.
      // If it was moved, the endDrag fn will do it.
      resetDragVariables();
    }
  }

  // End dragging procedure. Triggered when the dragged element is released
  const endDrag = (event) => {
    // Stop the drag event so that the slider isn't visible during transaction load
    diamondDragging = false;
    // If the drag box is not in the "cancel" position, and the selected diamond makes sense, send diamonds
    if (!diamondDragCancel && diamondIdxDraggedTo > -1 && diamondIdxDraggedTo < diamondCount) {
      onDiamondSelected(event, diamondIdxDraggedTo);
    }
    // Reset drag-related variables
    resetDragVariables();
    // Move the drag box back to it's original position
    event.source._dragRef.reset();
  }

  const resetDragVariables = () => {
    globalVars.userIsDragging = false;
    diamondDragCancel = false;
    diamondDragging = false;
    diamondIdxDraggedTo = -1;
    diamondDragMoved = false;
    diamondDragLeftExplainer = false;
  }

  const getCurrentDiamondLevel = (): number => {
    return postContent?.PostEntryReaderState?.DiamondLevelBestowed || 0;
  };

  const userHasReposted = (): boolean => {
    return (
      postContent?.PostEntryReaderState &&
      postContent?.PostEntryReaderState.RepostedByReader
    );
  };

  const toggleLike = (event: Event) => {
    // Prevent the post from navigating.
    event.stopPropagation();

    // If the user isn't logged in, alert them.
    if (loggedInUser == null) {
      return _preventNonLoggedInUserActions("like");
    }

    // If the reader hasn't liked a post yet, they won't have a reader state.
    if (postContent.PostEntryReaderState == null) {
      postContent.PostEntryReaderState = { LikedByReader: false };
    }

    let isUnlike;
    // Immediately toggle like and increment/decrement so that it feels instant.
    if (postContent.PostEntryReaderState.LikedByReader) {
      postContent.LikeCount--;
      postContent.PostEntryReaderState.LikedByReader = false;
      isUnlike = true;
    } else {
      postContent.LikeCount++;
      postContent.PostEntryReaderState.LikedByReader = true;
      isUnlike = false;
    }
    if (!isUnlike) showEmojiAnimation(event as PointerEvent, "❤️");
    // ref.detectChanges();
    // Fire off the transaction.
    CreateLike(
        localNode,
        loggedInUser.PublicKeyBase58Check,
        postContent.PostHashHex,
        isUnlike,
        feeRateDeSoPerKB * 1e9
      )
      .subscribe(
        (res) => {},
        (err) => {
          console.error(err);
        }
      );
  }

  const _preventNonLoggedInUserActions = (action: string) => {
    return SwalHelper.fire({
      target: getTargetComponentSelector(),
      icon: "info",
      title: `Create an account to ${action}`,
      html: `It's totally anonymous and takes under a minute`,
      showCancelButton: true,
      showConfirmButton: true,
      focusConfirm: true,
      customClass: {
        confirmButton: "btn btn-light",
        cancelButton: "btn btn-light no",
      },
      confirmButtonText: "Create an account",
      cancelButtonText: "Nevermind",
      reverseButtons: true,
    }).then((res: any) => {
      if (res.isConfirmed) {
        launchSignupFlow();
      }
    });
  }

  const showEmojiAnimation = (event: PointerEvent | TouchEvent | { source: CdkDrag; distance: {} }, emoji: string, amount = 20) => {
    const { x, y } = event?.source?._dragRef?._lastKnownPointerPosition || {};
    const touch = event.touches?.[0] || event.changedTouches?.[0];

    const { clientX, clientY } = event instanceof PointerEvent ? event : event instanceof TouchEvent ? touch : { clientX: x, clientY: y };

    for (let i = 1; i <= amount; i++) {
      createParticle({ clientX, clientY }, emoji);
    }
  }

  const createParticle = ({ clientX, clientY }, emoji: string) => {
    const particle = document.createElement("particle");
    document.body.appendChild(particle);
    const destinationX = (Math.random() - 0.5) * 200;
    const destinationY = (Math.random() - 0.5) * 200;
    const rotation = Math.random() * 520;
    particle.innerHTML = emoji;
    particle.style.left = `${clientX - 10}px`;
    particle.style.top = `${clientY - 10}px`;
    particle.style.fontSize = `${Math.random() * 24 + 10}px`;
    particle.style.width = particle.style.height = "auto";

    const animation = particle.animate(
      [
        {
          transform: `translate(${destinationX}px, ${destinationY}px) rotate(${rotation}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 1000 + Math.random() * 500,
        delay: Math.random(),
      }
    );
    animation.onfinish = () => particle.remove();
  }

  const openModal = (event, isQuote: boolean = false) => {
    // Put back
    // Prevent the post navigation click from occurring.
    // event.stopPropagation();

    // if (!this.globalVars.loggedInUser) {
    //   // Check if the user has an account.
    //   SharedDialogs.showCreateAccountToPostDialog(this.globalVars);
    // } else if (!this.globalVars.doesLoggedInUserHaveProfile()) {
    //   // Check if the user has a profile.
    //   SharedDialogs.showCreateProfileToPostDialog(this.router);
    // } else {
    //   const initialState = {
    //     // If we are quoting a post, make sure we pass the content so we don't repost a repost.
    //     parentPost: this.postContent,
    //     afterCommentCreatedCallback: isQuote ? this.afterRepostCreatedCallback : this.afterCommentCreatedCallback,
    //     isQuote,
    //   };
    //   // If the user has an account and a profile, open the modal so they can comment.
    //   this.modalService.show(CommentModalComponent, {
    //     class: this.isNFTProfile ? "modal-dialog-centered rt_popups" : "modal-dialog-centered",
    //     initialState,
    //   });
    // }
  }

  const _undoRepost = (event: any) => {
    // Prevent the post from navigating.
    event.stopPropagation();

    // If the user isn't logged in, alert them.
    if (loggedInUser == null) {
      return _preventNonLoggedInUserActions("undo repost");
    }
    setSendingRepostRequest(true);
    let postExtraData = {};
    if (process.env.NEXT_PUBLIC_node_id) {
      postExtraData["Node"] = process.env.NEXT_PUBLIC_node_id.toString();
    };

    // Put back ?
    // this._detectChanges();
    SubmitPost(
        localNode,
        loggedInUser.PublicKeyBase58Check,
        postContent.PostEntryReaderState.RepostPostHashHex || "" /*PostHashHexToModify*/,
        "" /*ParentPostHashHex*/,
        "" /*Title*/,
        {} /*BodyObj*/,
        postContent.PostHashHex,
        postExtraData,
        "" /*Sub*/,
        true /*IsHidden*/,
        // What should the fee rate be for this?
        feeRateDeSoPerKB * 1e9 /*feeRateNanosPerKB*/
      )
      .subscribe(
        (response) => {
          postContent.RepostCount--;
          postContent.PostEntryReaderState.RepostedByReader = false;
          setSendingRepostRequest(false);
          // _detectChanges();
        },
        (err) => {
          console.error(err);
          setSendingRepostRequest(false);
          const parsedError = parsePostError(err);
          _alertError(parsedError);
          // _detectChanges();
        }
      );
  }

  const toggleExplainer = (event) => {
    event.stopPropagation();
    setCollapseDiamondInfo(!collapseDiamondInfo);
  }

  const addDiamondSelection = (event) => {
    // Need to make sure hover event doesn't trigger on child elements
    if (event?.type === "initiateDrag" || event.target.id === "diamond-button") {
      for (let idx = 0; idx < diamondCount; idx++) {
        diamondTimeouts[idx] = setTimeout(() => {
          diamondsVisible[idx] = true;
        }, idx * diamondAnimationDelay);
      }
    }
  }

  const removeDiamondSelection = () => {
    for (let idx = 0; idx < diamondCount; idx++) {
      clearTimeout(diamondTimeouts[idx]);
      diamondsVisible[idx] = false;
    }
  }

  const _repost = (event: any) => {
    // Prevent the post from navigating.
    event.stopPropagation();

    // If the user isn't logged in, alert them.
    if (loggedInUser == null) {
      return _preventNonLoggedInUserActions("repost");
    } else if (!doesLoggedInUserHaveProfile()) {
      showCreateProfileToPostDialog(router);
      return;
    }
    if (!postContent.PostEntryReaderState) {
      postContent.PostEntryReaderState = {};
    }
    let postExtraData = {};
    if (process.env.NEXT_PUBLIC_node_id) {
      postExtraData["Node"] = process.env.NEXT_PUBLIC_node_id.toString();
    }

    setSendingRepostRequest(true);
    // _detectChanges();
    SubmitPost(
        localNode,
        loggedInUser.PublicKeyBase58Check,
        postContent.PostEntryReaderState.RepostPostHashHex || "" /*PostHashHexToModify*/,
        "" /*ParentPostHashHex*/,
        "" /*Title*/,
        {},
        postContent.PostHashHex,
        postExtraData,
        "" /*Sub*/,
        false /*IsHidden*/,
        // What should the fee rate be for this?
        feeRateDeSoPerKB * 1e9 /*feeRateNanosPerKB*/
        )
      .subscribe(
        (response) => {
          // Only set the RepostPostHashHex if this is the first time a user is reposting a post.
          if (!postContent.PostEntryReaderState.RepostPostHashHex) {
            postContent.PostEntryReaderState.RepostPostHashHex = response.PostHashHex;
          }
          postContent.RepostCount += 1;
          postContent.PostEntryReaderState.RepostedByReader = true;
          setSendingRepostRequest(false);
          // _detectChanges();
        },
        (err) => {
          console.error(err);
          setSendingRepostRequest(false);
          const parsedError = parsePostError(err);
          _alertError(parsedError);
          // _detectChanges();
        }
      );
      track69("Repost", {
        "Reposter": loggedInUser?.PublicKeyBase58Check,
        "Post": postContent?.Body,
        "Poster": postContent?.PosterPublicKeyBase58Check
      })
  }

  const onDiamondSelected = async (event: any, index: number): Promise<void> => {
    if (!loggedInUser?.PublicKeyBase58Check) {
      _alertError("Must be logged in to send diamonds");
      return;
    }
    // Disable diamond selection if diamonds are being sent
    if (sendingDiamonds) {
      return;
    }

    if (event?.pointerType === "touch" && includes(event?.target.classList, "reaction-icon")) {
      event.stopPropagation();
      return;
    }

    // Block user from selecting diamond level below already gifted amount
    if (index < getCurrentDiamondLevel()) {
      return;
    }

    if (index + 1 <= postContent.PostEntryReaderState.DiamondLevelBestowed) {
      _alertError("You cannot downgrade a diamond");
      return;
    }
    diamondSelected = index + 1;
    if (event && !(event.source instanceof CdkDrag)) {
      event.stopPropagation();
    }
    if (diamondSelected > DiamondWarningThreshold) {
      SwalHelper.fire({
        target: getTargetComponentSelector(),
        icon: "info",
        title: `Sending ${diamondSelected} diamonds to @${postContent.ProfileEntryResponse?.Username}`,
        html: `Clicking confirm will send ${getUSDForDiamond(diamondSelected)} to @${
          postContent.ProfileEntryResponse?.Username
        }`,
        showCancelButton: true,
        showConfirmButton: true,
        focusConfirm: true,
        customClass: {
          confirmButton: "btn btn-light",
          cancelButton: "btn btn-light no",
        },
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      }).then(async (res: any) => {
        if (res.isConfirmed) {
          await sendDiamonds(diamondSelected, event);
        }
      });
    } else {
      await sendDiamonds(diamondSelected, event);
    }
  }

  const sendDiamonds = (diamonds: number, event: PointerEvent, skipCelebration: boolean = false): Promise<void> => {
    setSendingDiamonds(true);
    // Show the animation here so the event trigger position is accurate.
    showEmojiAnimation(event, "💎");
    return SendDiamonds(
        localNode,
        loggedInUser.PublicKeyBase58Check,
        postContent.PosterPublicKeyBase58Check,
        postContent.PostHashHex,
        diamonds,
        feeRateDeSoPerKB * 1e9,
        false
      )
      .toPromise()
      .then(
        (res) => {
          setSendingDiamonds(false);
          diamondSelected = diamonds;
          postContent.DiamondCount += diamonds - this.getCurrentDiamondLevel();
          postContent.PostEntryReaderState.DiamondLevelBestowed = diamonds;
          if (!skipCelebration) {
            // Celebrate when the SendDiamonds call completes
            // this.globalVars.celebrate([ConfettiSvg.DIAMOND]);
            // this.showEmojiAnimation(event, '💎');
          }
          updateEverything(res.TxnHashHex, sendDiamondsSuccess, sendDiamondsFailure, this);
        },
        (err) => {
          if (err.status === 0) {
            return _alertError("DeSo is under heavy load. Please try again in one minute.");
          }
          setSendingDiamonds(false);
          const parsedError = parseProfileError(err);
          _alertError(parsedError);
        }
      );
  }

  async function sendOneDiamond(event: PointerEvent, fromDragEvent: boolean) {
    // Disable diamond selection if diamonds are being sent
    if (this.sendingDiamonds) {
      return;
    }

    // Block user from selecting diamond level below already gifted amount
    if (this.getCurrentDiamondLevel() > 0) {
      return;
    }

    // Don't trigger diamond purchases on tap on tablet
    if (event && event.pointerType === "touch" && !fromDragEvent) {
      event.stopPropagation();
      return;
    }

    // If triggered from mobile, stop propegation
    if (fromDragEvent) {
      event.stopPropagation();
    }

    this.onDiamondSelected(event, 0);
  }

  // Functions end

  // Dom manipulation

  const renderDropdownButton = (props, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={styles2.dropdown_button}
        id="repostActionsButton"
      >
        <i
          className={
            styles.icon_repost_2 +
            " feed-post-icon-row__icon background-hover-green"
          }
        ></i>
      </button>
    );
  };
  return (
    <div className="mt-5px js-feed-post-icon-row__container fs-14px text-grey5 d-flex justify-content-between unselectable">
      <div
        onClick={(e) => openModal(e)}
        className="cursor-pointer d-flex align-items-center feed-post-icon-hv"
        data-toggle="modal"
        data-target=".js-feed-post-icon-row__comment-modal"
      >
        <i
          className={
            styles.icon_reply_2 +
            " feed-post-icon-row__icon background-hover-blue"
          }
        ></i>

        {!hideNumbers ? <span>{postContent?.CommentCount}</span> : null}
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className={[
          "btn-group cursor-pointer d-flex align-items-center feed-post-icon-hv",
          !!postContent?.PostEntryReaderState?.RepostedByReader
            ? "fc-green"
            : "",
        ].join(" ")}
      >
        <Dropdown
          placement="bottomStart"
          renderToggle={renderDropdownButton}
          className={styles2.dropdown}
        >
          {sendingRepostRequest ? (
            <Dropdown.Item className="dropdown-menu-item d-block p-5px feed-post__dropdown-menu-item">
              <div className="fc-muted">Loading...</div>
            </Dropdown.Item>
          ) : (
            <>
              {userHasReposted() ? (
                <Dropdown.Item
                  onClick={(e) => _undoRepost(e)}
                  icon={<i className={styles.icon_repost + " icon-repost"}></i>}
                  className="dropdown-menu-item d-block fs-12px link--unstyled p-5px feed-post__dropdown-menu-item"
                >
                  Hide
                </Dropdown.Item>
              ) : (
                <>
                  <Dropdown.Item
                    onClick={(e) => _repost(e)}
                    icon={
                      <i className={styles.icon_repost + " icon-repost"}></i>
                    }
                    className="dropdown-menu-item d-block fs-12px link--unstyled p-5px feed-post__dropdown-menu-item"
                  >
                    Repost
                  </Dropdown.Item>
                </>
              )}

              <Dropdown.Item
                onClick={(e) => openModal(e, true)}
                icon={
                  <i
                    className="fas fa-pencil-alt pl-5px"
                    style={{ fontSize: "10px" }}
                  ></i>
                }
                className="dropdown-menu-item d-block fs-12px link--unstyled p-5px feed-post__dropdown-menu-item"
              >
                Quote
              </Dropdown.Item>
            </>
          )}
        </Dropdown>

        {!hideNumbers ? (
          <span>
            {abbreviateRepostsNumber(
              postContent?.RepostCount,
              postContent?.QuoteRepostCount
            )}
          </span>
        ) : null}
      </div>

      <div
        onClick={(e) => toggleLike(e)}
        className={[
          "cursor-pointer d-flex align-items-center",
          animateLike ? "is_animating" : "",
        ].join(" ")}
      >
        <i
          onClick={() => setAnimateLike(!animateLike)}
          className={[
            "feed-post-icon-row__icon background-hover-red",
            animateLike ? "is_animating" : "",
            (
              postContent?.PostEntryReaderState
                ? !postContent?.PostEntryReaderState.LikedByReader
                : true
            )
              ? styles.icon_heart_2
              : "",
            (
              postContent?.PostEntryReaderState
                ? postContent?.PostEntryReaderState.LikedByReader
                : false
            )
              ? styles.icon_heart_fill
              : "",
          ].join(" ")}
        ></i>
        {!hideNumbers ? <span>{postContent.LikeCount}</span> : null}
      </div>

      {/* <ng-template #popTemplate>
            <div id="diamond-popover" class="m-10px">
            <div *ngIf="!sendingDiamonds">
                <div class="mb-4" style="font-size: 11.25px">
                Give a diamond.
                <b>@{{ postContent.ProfileEntryResponse.Username }}</b>
                will receive the amount shown as
                <b>a tip</b>
                from you.
                </div>
            </div>
            </div>
        </ng-template> */}
      {/* #diamondButton */}
      <div className="cursor-pointer d-flex align-items-center feed-post-icon-hv">
        {/* // <!--Container to hold the bounds for the mobile drag interface--> */}
        <div
          className={[
            "diamond-mobile-drag-container unselectable",
            !loggedInUser?.PublicKeyBase58Check ||
            postContent.ProfileEntryResponse?.PublicKeyBase58Check ===
              loggedInUser?.PublicKeyBase58Check
              ? "hide-diamonds"
              : "",
          ].join(" ")}
        >
          <div
            className={[
              "diamond-mobile-drag-instructions",
              diamondDragCancel ? "bg-danger" : "",
              diamondDragging ? "show" : "",
            ].join(" ")}
          >
            <p className="d-block">
              {!diamondDragMoved
                ? "<- Slide ->"
                : diamondDragCancel
                ? "Release To Cancel"
                : "Release To Confirm - Drag Down To Cancel"}
            </p>
          </div>
        </div>
        <div
          onMouseLeave={() => removeDiamondSelection()}
          onMouseOver={(e) => addDiamondSelection(e)}
          onClick={(e) => sendOneDiamond(e, false)}
          className="feed-reaction cursor-pointer d-flex align-items-center"
        >
          <i
            className={[
              "feed-post-icon-row__icon",
              !sendingDiamonds ? styles.icon_diamond : "fas fa-spinner fa-spin",
              postContent?.PostEntryReaderState?.DiamondLevelBestowed > 0
                ? styles.icon_diamond_fill
                : "",
            ].join(" ")}
            style={{ visibility: diamondDragging ? "hidden" : "visible" }}
          ></i>

          <div
            className={[
              "diamond-btn fs-22px",
              styles.icon_diamond,
              diamondDragging ? "dragged-like" : "",
              postContent.ProfileEntryResponse?.PublicKeyBase58Check ===
                loggedInUser?.PublicKeyBase58Check || sendingDiamonds
                ? "hide-diamonds"
                : "",
            ].join(" ")}
            id="diamond-button"
          >
            <div
              className="reaction-box"
              style={{
                height:
                  !collapseDiamondInfo ||
                  (diamondIdxDraggedTo === diamondCount &&
                    diamondDragLeftExplainer)
                    ? "121px"
                    : "55px",
              }}
            >
              {!collapseDiamondInfo ||
              (diamondIdxDraggedTo === diamondCount &&
                diamondDragLeftExplainer) ? (
                <div>
                  {/* <ng-container *ngTemplateOutlet="popTemplate"></ng-container> */}
                </div>
              ) : null}

              {diamondIndexes.map((diamondIndex, index) => (
                <div
                  onClick={(e) => onDiamondSelected(e, diamondIndex)}
                  onMouseOver={() => setDiamondHovered(diamondIndex)}
                  onMouseLeave={() => setDiamondHovered(-1)}
                  key={index}
                  className={[
                    "reaction-icon transformable",
                    diamondsVisible[diamondIndex] ? "show" : "",
                    diamondIdxDraggedTo === diamondIndex ? "dragged-icon" : "",
                  ].join(" ")}
                >
                  <label>{getUSDForDiamond(diamondIndex + 1)}</label>
                  <i
                    className={styles.icon_diamond + " diamond-reaction"}
                    style={{
                      color:
                        diamondIndex < getCurrentDiamondLevel() ||
                        diamondIndex <= diamondHovered ||
                        diamondIndex <= diamondIdxDraggedTo
                          ? "var(--cblue)"
                          : "var(--grey)",
                    }}
                  ></i>
                </div>
              ))}
              <div
                onMouseLeave={() => setCollapseDiamondInfo(true)}
                onMouseOver={() => setCollapseDiamondInfo(false)}
                onClick={(e) => toggleExplainer(e)}
                className="reaction-icon show"
              >
                <i className="fas fa-info-circle diamond-reaction diamond-help"></i>
              </div>
            </div>
          </div>
          <div
            onTouchStart={() => startDrag()}
            onTouchEnd={(e) => dragClick(e)}
            onDragEnd={(e) => endDrag(e)}
            onDragCapture={(e) => duringDrag(e)}
            className={[
              "diamond-mobile-drag-grab",
              postContent.ProfileEntryResponse?.PublicKeyBase58Check ===
              loggedInUser?.PublicKeyBase58Check
                ? "hide-diamonds"
                : "",
            ].join(" ")}
            id="diamond-mobile-drag-grab"
          ></div>
        </div>
        {!hideNumbers ? <span>{postContent.DiamondCount}</span> : null}
      </div>
    </div>
  );
};
export default PostIconRow;
