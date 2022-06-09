import styles from "../../styles/Notifications/notificationsList.module.scss";
import FeedPost from "../Feed/feedPost";

const NotificationsList = () => {
  return (
    <div className="notificationbar_mwrapper">
      {/* <!-- Top Bar --> */}
      {/* (click)="showRecent()" */}
      <button type="button" className="recent_post_btn">
        Show recent
      </button>
      {/* *ngIf="!isNotificationBar" */}
      <div className="global__top-bar noti_tpbar d-flex align-items-center fs-18px font-weight-bold pl-15px border-bottom border-color-grey">
        Notifications
      </div>
      {/* *ngIf="!isNotificationBar" */}
      <div className="global__top-bar__height"></div>
      {/* *ngIf="loadingFirstPage" */}
      <div>
        <simple-center-loader></simple-center-loader>
      </div>
      {/* *ngIf="(!totalItems || totalItems === 0) && !loadingFirstPage" */}
      <div className="d-flex justify-content-center mt-30px">
        <span>You don't have any notifications</span>
      </div>
      {/* <ng-container *ngIf="!isNotificationBar"> */}
      {/* #uiScroll *uiScroll="let item of datasource; let index = index" */}
      <div className="border-bottom border-color-grey">
        {/* *ngIf="item.action" [routerLink]="item.link" */}
        <div className="p-10px cursor-pointer">
          <div className="d-flex flex-row align-items-center">
            {/* *ngIf="item.icon" */}
            <div className="notifications__icon">
              <i className="{{ item.icon }}"></i>
            </div>
            {/* [avatar]="item.actor.PublicKeyBase58Check"
            [routerLink]="['/' + globalVars.RouteNames.USER_PREFIX, item.actor.Username]" */}
            <div className="notifications__avatar"></div>
            {/* [innerHtml]="item.action" */}
            <div className="notifications__action"></div>
          </div>
        </div>
        {/* *ngIf="item.post" */}
        <div className="cursor-pointer">
          {/* *ngIf="item.post.ProfileEntryResponse" */}
          <FeedPost
            post={item.post}
            includePaddingOnPost={true}
            showReplyingToContent={!!item.parentPost}
            parentPost={item.parentPost}
            contentShouldLinkToThread={true}
            afterCommentCreatedCallback={afterCommentCallback.bind(this, item, index)}
          ></FeedPost>
          {/* *ngFor="let comment of item.post.Comments" */}
          <div>
            <div className="px-15px pb-15px post-thread__subcomment-container">
              <FeedPost
                includePaddingOnPost={false}
                post={comment}
                parentPost={item.post}
                contentShouldLinkToThread={true}
                showIconRow={false}
                showDropdown={false}
                showReplyToContent={false}
                isSubcomment={true}
              ></FeedPost>
            </div>
          </div>
        </div>
      </div>
      {/* </ng-container> */}

      {/* <ng-container *ngIf="isNotificationBar"> */}
      {/* *ngFor="let item of notificationArr; let index = index" */}
      <div className="border-bottom border-color-grey">
        {/* *ngIf="item.action" [routerLink]="item.link" */}
        <div className="p-10px cursor-pointer">
          <div className="d-flex flex-row align-items-center">
            {/* *ngIf="item.icon" */}
            <div className="notifications__icon">
              <i className="{{ item.icon }}"></i>
            </div>
            <Avatar
              class="notifications__avatar"
              avatar="item.actor.PublicKeyBase58Check"
              routerLink="['/' + globalVars.RouteNames.USER_PREFIX, item.actor.Username]"
            ></Avatar>
            {/* [innerHtml]="item.action" */}
            <div className="notifications__action"></div>
          </div>
        </div>
        {/* *ngIf="item.post" */}
        <div className="cursor-pointer">
          {/* *ngIf="item.post.ProfileEntryResponse" */}
          <feed-post
            post="item.post"
            includePaddingOnPost="true"
            showReplyingToContent="!!item.parentPost"
            parentPost="item.parentPost"
            contentShouldLinkToThread="true"
            afterCommentCreatedCallback="afterCommentCallback.bind(this, item, index)"
          ></feed-post>
          {/* *ngFor="let comment of item.post.Comments" */}
          <div>
            <div className="px-15px pb-15px post-thread__subcomment-container">
              <feed-post
                includePaddingOnPost="false"
                post="comment"
                parentPost="item.post"
                contentShouldLinkToThread="true"
                showIconRow="false"
                showDropdown="false"
                showReplyToContent="false"
                isSubcomment="true"
              ></feed-post>
            </div>
          </div>
        </div>
      </div>
      {/* </ng-container> */}
      {/* <simple-center-loader
     *ngIf="loadingNextPage && !loadingFirstPage && !isNotificationBar"
     [height]="200"
   ></simple-center-loader> */}
      {/* <!-- SPACER FOR BOTTOM BAR ON MOBILE --> */}
      <div className="d-lg-none global__bottom-bar-mobile-height"></div>
      <div className="global__bottom-bar-mobile-height"></div>
      <div className="global__bottom-bar-mobile-height"></div>
    </div>
  );
};
export default NotificationsList;
