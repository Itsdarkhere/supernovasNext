import Link from "next/link";
import styles from "../../styles/Notifications/notificationsList.module.scss";
import { RouteNames } from "../../utils/backendapi-context";
import { SanitizeAndAutoLink } from "../../utils/sanitizeAndAutoLink";
import FeedPost from "../Feed/feedPost";
import Avatar from "../Reusables/avatar";

const NotificationsList = () => {
  return (
    <div className="notificationbar_mwrapper">
      {/* <!-- Top Bar --> */}
      <button
        onClick={() => showRecent()}
        type="button"
        className="recent_post_btn"
      >
        Show recent
      </button>
      {!isNotificationBar ? (
        <div className="global__top-bar noti_tpbar d-flex align-items-center fs-18px font-weight-bold pl-15px border-bottom border-color-grey">
          Notifications
        </div>
      ) : (
        <div className="global__top-bar__height"></div>
      )}

      {loadingFirstPage ? (
        <div>{/* <simple-center-loader></simple-center-loader> */}</div>
      ) : null}

      {(!totalItems || totalItems === 0) && !loadingFirstPage ? (
        <div className="d-flex justify-content-center mt-30px">
          <span>You don't have any notifications</span>
        </div>
      ) : null}

      {!isNotificationBar ? (
        <>
          {/* #uiScroll *uiScroll="let item of datasource; let index = index" */}
          <div className="border-bottom border-color-grey">
            {/* [routerLink]="item.link" */}
            {item.action ? (
              <div className="p-10px cursor-pointer">
                <div className="d-flex flex-row align-items-center">
                  {item.icon ? (
                    <div className="notifications__icon">
                      <i className={item.icon}></i>
                    </div>
                  ) : null}

                  <Link
                    href={
                      "/" + RouteNames.USER_PREFIX + "/" + item.actor.Username
                    }
                  >
                    <Avatar
                      avatar={item.actor.PublicKeyBase58Check}
                      classN="notifications__avatar"
                    ></Avatar>
                  </Link>

                  <div
                    className="notifications__action"
                    dangerouslySetInnerHTML={{
                      __html: SanitizeAndAutoLink(item.action),
                    }}
                  ></div>
                </div>
              </div>
            ) : null}

            {item.post ? (
              <div className="cursor-pointer">
                {item.post.ProfileEntryResponse ? (
                  <FeedPost
                    post={item.post}
                    includePaddingOnPost={true}
                    showReplyingToContent={!!item.parentPost}
                    parentPost={item.parentPost}
                    contentShouldLinkToThread={true}
                    afterCommentCreatedCallback={afterCommentCallback.bind(
                      this,
                      item,
                      index
                    )}
                    hoverable={undefined}
                    showInteractionDetails={undefined}
                    postThread={undefined}
                    showPostsShadow={undefined}
                    postThreadComment={undefined}
                    cardStyle={undefined}
                    showName={undefined}
                    afterRepostCreatedCallback={undefined}
                    changeEdition={undefined}
                    profilePublicKeyBase58Check={undefined}
                    isForSaleOnly={undefined}
                    diamondSent={undefined}
                    userBlocked={undefined}
                    postDeleted={undefined}
                    containerModalRef={undefined}
                  ></FeedPost>
                ) : null}

                {item.post.Comments.map((comment, index) => (
                  <div key={index}>
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
                ))}
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <>
          {notificationArr.map((item, index) => (
            <div key={index} className="border-bottom border-color-grey">
              {/*[routerLink]="item.link" */}
              {item.action ? (
                <div className="p-10px cursor-pointer">
                  <div className="d-flex flex-row align-items-center">
                    {item.icon ? (
                      <div className="notifications__icon">
                        <i className="{{ item.icon }}"></i>
                      </div>
                    ) : null}

                    <Avatar
                      classN="notifications__avatar"
                      avatar="item.actor.PublicKeyBase58Check"
                    ></Avatar>
                    <div
                      className="notifications__action"
                      dangerouslySetInnerHTML={{
                        __html: SanitizeAndAutoLink(item.action),
                      }}
                    ></div>
                  </div>
                </div>
              ) : null}

              {item.post ? (
                <div className="cursor-pointer">
                  {item.post.ProfileEntryResponse ? (
                    <FeedPost
                      post={item.post}
                      includePaddingOnPost={true}
                      showReplyingToContent={!!item.parentPost}
                      parentPost={item.parentPost}
                      contentShouldLinkToThread={true}
                      afterCommentCreatedCallback={afterCommentCallback.bind(
                        this,
                        item,
                        index
                      )}
                      hoverable={undefined}
                      showInteractionDetails={undefined}
                      postThread={undefined}
                      showPostsShadow={undefined}
                      postThreadComment={undefined}
                      cardStyle={undefined}
                      showName={undefined}
                      afterRepostCreatedCallback={undefined}
                      changeEdition={undefined}
                      profilePublicKeyBase58Check={undefined}
                      isForSaleOnly={undefined}
                      diamondSent={undefined}
                      userBlocked={undefined}
                      postDeleted={undefined}
                      containerModalRef={undefined}
                    ></FeedPost>
                  ) : null}
                  {item.post.Comments.map((comment, index) => (
                    <div key={index}>
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
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </>
      )}
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
