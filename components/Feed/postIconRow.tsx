import styles from "../../styles/Feed/postIconRow.module.scss";
import {
  abbreviateRepostsNumber,
  getUSDForDiamond,
} from "../../utils/global-context";
import { useState } from "react";
import { useAppSelector } from "../../utils/Redux/hooks";

const PostIconRow = ({ postContent, hideNumbers }) => {
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

  // Functions
  const getCurrentDiamondLevel = (): number => {
    return postContent.PostEntryReaderState?.DiamondLevelBestowed || 0;
  };

  const userHasReposted = (): boolean => {
    return (
      postContent.PostEntryReaderState &&
      postContent.PostEntryReaderState.RepostedByReader
    );
  };

  // Functions end

  if (!postContent?.RepostCount) {
    return null;
  }
  return (
    <div className="mt-5px js-feed-post-icon-row__container fs-14px text-grey5 d-flex justify-content-between unselectable">
      {/* (click)="openModal($event)" */}
      <div
        className="cursor-pointer d-flex align-items-center feed-post-icon-hv"
        data-toggle="modal"
        data-target=".js-feed-post-icon-row__comment-modal"
      >
        <i className="icon-reply-2 feed-post-icon-row__icon background-hover-blue"></i>

        {!hideNumbers ? <span>{postContent.CommentCount}</span> : null}
      </div>

      {/*#dropdown="bs-dropdown"
            (click)="$event.stopPropagation()"
            dropdown
        */}
      <div
        className={[
          "btn-group cursor-pointer d-flex align-items-center feed-post-icon-hv",
          !!postContent.PostEntryReaderState?.RepostedByReader
            ? "fc-green"
            : "",
        ].join(" ")}
      >
        {/* dropdownToggle */}
        <div
          className="link--unstyled"
          id="repostActionsButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="icon-repost-2 feed-post-icon-row__icon background-hover-green"></i>
        </div>

        {!hideNumbers ? (
          <span>
            {abbreviateRepostsNumber(
              postContent.RepostCount,
              postContent.QuoteRepostCount
            )}
          </span>
        ) : null}

        {/**dropdownMenu*/}
        <div
          className="dropdown-menu p-0 fs-12px border background-color-light-grey"
          style={{ minWidth: "6rem" }}
          aria-labelledby="repostActionsButton"
        >
          {/* *ngIf="sendingRepostRequest; else repostOptions" */}
          {sendingRepostRequest ? (
            <div className="dropdown-menu-item d-block p-5px feed-post__dropdown-menu-item">
              <div className="fc-muted">Loading...</div>
            </div>
          ) : (
            <>
              {userHasReposted() ? (
                <a className="dropdown-menu-item d-block link--unstyled p-5px feed-post__dropdown-menu-item">
                  {/* (click)="_undoRepost($event)" THIS WAS ABOVE */}
                  <i className="icon-repost fs-12px"></i>
                  Hide
                </a>
              ) : (
                <>
                  {/* (click)="_repost($event)" */}
                  <a className="dropdown-menu-item d-block link--unstyled p-5px feed-post__dropdown-menu-item">
                    <i className="icon-repost fs-12px"></i>
                    Repost
                  </a>
                </>
              )}
              {/*(click)="openModal($event, true)"*/}
              <a className="dropdown-menu-item d-block link--unstyled p-5px feed-post__dropdown-menu-item">
                <i
                  className="fas fa-pencil-alt pl-5px"
                  style={{ fontSize: "10px" }}
                ></i>
                Quote
              </a>
            </>
          )}
        </div>
      </div>

      {/*(click)="toggleLike($event)"
            " */}
      <div
        className={[
          "cursor-pointer d-flex align-items-center",
          animateLike ? "is_animating" : "",
        ].join(" ")}
      >
        {/*(click)="animateLike = !animateLike" */}
        <i
          className={[
            "feed-post-icon-row__icon background-hover-red",
            postContent.PostEntryReaderState
              ? !postContent.PostEntryReaderState.LikedByReader
              : true
              ? "icon-heart-2"
              : "",
            postContent.PostEntryReaderState
              ? postContent.PostEntryReaderState.LikedByReader
              : false
              ? "icon-heart-fill"
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
        {/* (click)="sendOneDiamond($event, false)"
            (mouseover)="addDiamondSelection($event)"
            (mouseleave)="removeDiamondSelection()" */}
        <div className="feed-reaction cursor-pointer d-flex align-items-center">
          <i
            className={[
              "feed-post-icon-row__icon",
              !sendingDiamonds ? "icon-diamond" : "fas fa-spinner fa-spin",
              postContent.PostEntryReaderState?.DiamondLevelBestowed > 0
                ? "icon-diamond-fill"
                : "",
            ].join(" ")}
            style={{ visibility: diamondDragging ? "hidden" : "visible" }}
          ></i>

          <div
            className={[
              "diamond-btn icon-diamond fs-22px",
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

              {/* (click)="onDiamondSelected($event, diamondIndex)"
                    (mouseover)="diamondHovered = diamondIndex"
                (mouseleave)="diamondHovered = -1" */}
              {diamondIndexes.map((diamondIndex, index) => (
                <div
                  key={index}
                  className={[
                    "reaction-icon transformable",
                    diamondsVisible[diamondIndex] ? "show" : "",
                    diamondIdxDraggedTo === diamondIndex ? "dragged-icon" : "",
                  ].join(" ")}
                >
                  <label>{getUSDForDiamond(diamondIndex + 1)}</label>
                  <i
                    className={"icon-diamond diamond-reaction"}
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

              {/* (click)="toggleExplainer($event)"
                    (mouseover)="collapseDiamondInfo = false"
                    (mouseleave)="collapseDiamondInfo = true" */}
              <div className="reaction-icon show">
                <i className="fas fa-info-circle diamond-reaction diamond-help"></i>
              </div>
            </div>
          </div>
          {/* <!--Draggable element for mobile drag-selection--> */}
          {/* (touchstart)="startDrag()"
                (touchend)="dragClick($event)"
                (cdkDragEnded)="endDrag($event)"
                (cdkDragMoved)="duringDrag($event)"
                cdkDrag
                */}
          <div
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
        {/* *ngIf="!hideNumbers" */}
        <span>{postContent.DiamondCount}</span>
      </div>
    </div>
  );
};
export default PostIconRow;
