import styles from "../../styles/Feed/postIconRow.module.scss";
import {
  abbreviateRepostsNumber,
} from "../../utils/global-context";
import { useState } from "react";

const PostIconRow = ({ postContent }) => {
  // Vars
  const diamondCount = 6;
  // Indexes from 0 to diamondCount (used by map)
  const diamondIndexes = Array<number>(diamondCount)
    .fill(0)
    .map((x, i) => i);
  // Vars end

  // State
  const [diamondDragMoved, setDiamondDragMoved] = useState(false);
  const [diamondDragCancel, setDiamondDragCancel] = useState(false);
  // State end

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
        {/* *ngIf="!hideNumbers" */}
        <span>{postContent.CommentCount}</span>
      </div>

      {/*#dropdown="bs-dropdown"
            [ngClass]="{
            'fc-green': !!postContent.PostEntryReaderState?.RepostedByReader
            }"
            (click)="$event.stopPropagation()"
            dropdown
        */}
      <div className="btn-group cursor-pointer d-flex align-items-center feed-post-icon-hv">
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
        {/* *ngIf="!hideNumbers" */}
        <span>
          {abbreviateRepostsNumber(
            postContent.RepostCount,
            postContent.QuoteRepostCount
          )}
        </span>
        {/**dropdownMenu*/}
        <div
          className="dropdown-menu p-0 fs-12px border background-color-light-grey"
          style={{ minWidth: "6rem" }}
          aria-labelledby="repostActionsButton"
        >
          {/* *ngIf="sendingRepostRequest; else repostOptions" */}
          <div className="dropdown-menu-item d-block p-5px feed-post__dropdown-menu-item">
            <div className="fc-muted">Loading...</div>
          </div>
          {/* <ng-template #repostOptions>
                <a
                *ngIf="userHasReposted(); else repostElseBlock"
                class="dropdown-menu-item d-block link--unstyled p-5px feed-post__dropdown-menu-item"
                (click)="_undoRepost($event)"
                >
                <i class="icon-repost fs-12px"></i>
                Hide
                </a>
                <ng-template #repostElseBlock>
                // (click)="_repost($event)"
                <a
                    class="dropdown-menu-item d-block link--unstyled p-5px feed-post__dropdown-menu-item"
                >
                    <i class="icon-repost fs-12px"></i>
                    Repost
                </a>
                </ng-template>
                // (click)="openModal($event, true)"
                <a
                class="dropdown-menu-item d-block link--unstyled p-5px feed-post__dropdown-menu-item"
                >
                <i class="fas fa-pencil-alt pl-5px" style="font-size: 10px"></i>
                Quote
                </a>
            </ng-template> */}
        </div>
      </div>

      {/*(click)="toggleLike($event)"
            [ngClass]="{
            is_animating: animateLike
            }" */}
      <div className="cursor-pointer d-flex align-items-center">
        {/* [ngClass]="{
                is_animating: animateLike,
                'icon-heart-2': postContent.PostEntryReaderState ? !postContent.PostEntryReaderState.LikedByReader : true,
                'icon-heart-fill': postContent.PostEntryReaderState ? postContent.PostEntryReaderState.LikedByReader : false
            }"
            (click)="animateLike = !animateLike" */}
        <i className="feed-post-icon-row__icon background-hover-red"></i>
        {/* *ngIf="!hideNumbers" */}
        <span>{postContent.LikeCount}</span>
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
        {/* [ngClass]="{
                'hide-diamonds':
                !globalVars.loggedInUser?.PublicKeyBase58Check ||
                postContent.ProfileEntryResponse?.PublicKeyBase58Check === globalVars.loggedInUser?.PublicKeyBase58Check
            }" */}
        <div className="diamond-mobile-drag-container unselectable">
          {/* [ngClass]="{ 'bg-danger': diamondDragCancel, show: diamondDragging }" */}
          <div className="diamond-mobile-drag-instructions">
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
          {/* [ngClass]="{
                'icon-diamond': !sendingDiamonds,
                'fas fa-spinner fa-spin': sendingDiamonds,
                'icon-diamond-fill': postContent.PostEntryReaderState?.DiamondLevelBestowed > 0
                }"
                [ngStyle]="{
                visibility: diamondDragging ? 'hidden' : 'visible'
                }" */}
          <i className="feed-post-icon-row__icon"></i>

          {/* [ngClass]="{
                'dragged-like': diamondDragging,
                'hide-diamonds':
                    postContent.ProfileEntryResponse?.PublicKeyBase58Check === globalVars.loggedInUser?.PublicKeyBase58Check ||
                    sendingDiamonds
                }" */}
          <div className="diamond-btn icon-diamond fs-22px" id="diamond-button">
            {/* [ngStyle]="{
                    height:
                    !collapseDiamondInfo || (diamondIdxDraggedTo === diamondCount && diamondDragLeftExplainer)
                        ? '121px'
                        : '55px'
                }" */}
            <div className="reaction-box">
              {/* *ngIf="!collapseDiamondInfo || (diamondIdxDraggedTo === diamondCount && diamondDragLeftExplainer)" */}
              <div>
                {/* <ng-container *ngTemplateOutlet="popTemplate"></ng-container> */}
              </div>
              {/* (click)="onDiamondSelected($event, diamondIndex)"
                    (mouseover)="diamondHovered = diamondIndex"
                    (mouseleave)="diamondHovered = -1" 
                    *ngFor="let diamondIndex of diamondIndexes"
                            [ngClass]="{ show: diamondsVisible[diamondIndex], 'dragged-icon': diamondIdxDraggedTo === diamondIndex }"
                    
                    */}
              <div className="reaction-icon transformable">
                {/* <label>{getUSDForDiamond(diamondIndex + 1)}</label> */}
                {/* [ngStyle]="{
                        color:
                        diamondIndex < getCurrentDiamondLevel() ||
                        diamondIndex <= this.diamondHovered ||
                        diamondIndex <= this.diamondIdxDraggedTo
                            ? 'var(--cblue)'
                            : 'var(--grey)'
                    }" */}
                <i className="icon-diamond diamond-reaction"></i>
              </div>
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
                [ngClass]="{
                'hide-diamonds':
                    postContent.ProfileEntryResponse?.PublicKeyBase58Check === globalVars.loggedInUser?.PublicKeyBase58Check
                }"
                cdkDrag
                */}
          <div
            className="diamond-mobile-drag-grab"
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
