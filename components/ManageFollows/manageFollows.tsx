import styles from "../../styles/ManageFollows/manageFollows.module.scss";
import TabSelector from "../Reusables/tabSelector";
import Link from "next/link";
import { RouteNames } from "../../utils/backendapi-context";
import TopBarMobileNavigation from "../Navigation/TopBarMobile/topBarMobileNavigation";
import TopBarMobileSignIn from "../Navigation/TopBarMobile/topBarMobileSignIn";
import { hexlify } from "ethers/lib/utils";
import Avatar from "../Reusables/avatar";
import { nanosToUSD } from "../../utils/global-context";
import { SanitizeAndAutoLink } from "../../utils/sanitizeAndAutoLink";

const ManageFollows = () => {
  return (
    <div className="flex-grow-1">
      {/* <!--Header Mobile--> */}
      <div className="d-lg-none d-block w-100">
        <div className="global__top-bar__height d-flex align-items-center justify-content-between w-100 px-15px fs-18px font-weight-bold fc-default border-bottom border-color-grey">
          <div className="d-flex align-items-center">
            <TopBarMobileNavigation></TopBarMobileNavigation>
            <Link href={"/" + RouteNames.USER_PREFIX + "/" + targetUsername}>
              <a className="link--unstyled">{targetUsername}</a>
            </Link>
          </div>

          <TopBarMobileSignIn></TopBarMobileSignIn>
        </div>

        {/* <!-- Tabs --> */}
        <TabSelector
          tabs="[ManageFollowsComponent.FOLLOWERS, ManageFollowsComponent.FOLLOWING]"
          activeTab="activeTab"
          tabClick="_handleTabClick($event)"
          icons={null}
          extraTab={null}
        ></TabSelector>
      </div>

      {/* <!--Header Desktop--> */}
      <div className="d-lg-block d-none">
        <div className="d-flex w-100 px-15px global__top-bar__height align-items-center justify-content-between fs-18px font-weight-bold fc-default border-bottom border-color-grey">
          {/* [routerLink]="['/' + appData.RouteNames.USER_PREFIX, targetUsername]" */}
          <Link
            href={"/" + appData.RouteNames.USER_PREFIX + "/" + targetUsername}
          >
            <a className="link--unstyled">{targetUsername}</a>
          </Link>
          <TopBarMobileSignIn></TopBarMobileSignIn>
        </div>

        {/* <!-- Tabs --> */}
        <TabSelector
          tabs="[ManageFollowsComponent.FOLLOWERS, ManageFollowsComponent.FOLLOWING]"
          activeTab="activeTab"
          tabClick="_handleTabClick($event)"
          icons={null}
          extraTab={null}
        ></TabSelector>
      </div>

      {/* <simple-center-loader *ngIf="loadingFirstPage"></simple-center-loader> */}
      {totalFollowerCount == 0 && !datasource.adapter.isLoading ? (
        <div className="fs-15px d-flex justify-content-left w-100 p-15px">
          Nobody yet
        </div>
      ) : null}

      {/* #uiScroll
       *uiScroll="let profileEntry of datasource" */}
      <div
        className="row no-gutters px-15px border-bottom fs-15px"
        style={{ height: "100%" }}
      >
        <a
          onClick={(e) => onRowClicked(e, profileEntry.Username)}
          className="fs-15px d-flex justify-content-left w-100 link--unstyled border-color-grey border-bottom p-15px"
        >
          {/* <!-- Avatar --> */}
          <div className="manage-follows__avatar-container">
            <Link
              href={"/" + RouteNames.USER_PREFIX + "/" + profileEntry.Username}
            >
              <Avatar
                classN="manage-follows__avatar br-12px"
                avatar={profileEntry.PublicKeyBase58Check}
              ></Avatar>
            </Link>
          </div>

          {/* <!-- Main Content --> */}
          <div className="w-100">
            <div className="d-flex align-items-center">
              {/* <!-- Username--> */}
              <Link
                href={
                  "/" + RouteNames.USER_PREFIX + "/" + profileEntry.Username
                }
              >
                <a className="fc-default font-weight-bold">
                  {profileEntry.Username}
                </a>
              </Link>

              {profileEntry?.IsVerified ? (
                <span className="ml-1 d-inline-block align-center text-primary">
                  <i className="fas fa-check-circle fa-md align-middle"></i>
                </span>
              ) : null}

              {/* <!-- Coin price-->
          <!-- Hidden on mobile, UI gets too crowded otherwise --> */}
              {/* [routerLink]="AppRoutingModule.buyCreatorPath(profileEntry.Username)" */}
              <Link
                href={[
                  "",
                  RouteNames.USER_PREFIX,
                  profileEntry.Username,
                  RouteNames.BUY_CREATOR,
                ].join("/")}
              >
                <a
                  style={{ padding: "3px" }}
                  className="ml-2 fs-13px font-weight-bold px-2 feed-post__coin-price-holder d-lg-block d-none br-12px"
                >
                  <span className="fc-default">
                    ~{nanosToUSD(profileEntry.CoinPriceDeSoNanos, 2)}
                  </span>
                  {/* <!-- Buy link --> */}
                  Buy
                </a>
              </Link>

              {/* <!-- Follow button --> */}
              {canLoggedInUserFollowTargetPublicKey(
                profileEntry.PublicKeyBase58Check
              ) ? (
                <div className="ml-auto">
                  {/* <follow-button
                followButtonClasses="[
              'js-manage-follows__follow-button',
              'btn',
              'btn-sm',
              'follow-black',
              'btn-outline-primary'
            ]"
                unfollowButtonClasses="[
              'js-manage-follows__follow-button',
              'unfollow-black',
              'btn',
              'btn-sm',
              'btn-primary'
            ]"
                followedPubKeyBase58Check="profileEntry.PublicKeyBase58Check"
              ></follow-button> */}
                </div>
              ) : null}
            </div>

            {/* <!-- Content --> */}
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeAndAutoLink(profileEntry.Description),
              }}
              className="roboto-regular mt-1"
              style={{ overflowWrap: "anywhere", wordBreak: "break-all" }}
            ></div>
          </div>
        </a>
      </div>
      {/* <simple-center-loader *ngIf="loadingNextPage && !loadingFirstPage" [height]="100"></simple-center-loader> */}
      {/* <!-- Num anonymous followers--> */}
      {anonymousFollowerCount > 0 ? (
        <div className="fs-15px d-flex justify-content-left w-100 p-15px">
          {/* <!--TODO: pluralize--> */}
          ... Plus {anonymousFollowerCount} anonymous{" "}
          {this.activeTab.toLowerCase()}
        </div>
      ) : null}

      <div className="d-lg-none global__bottom-bar-mobile-height"></div>
      <div className="d-lg-none global__bottom-bar-mobile-height"></div>
      <div className="global__bottom-bar-mobile-height"></div>
      <div className="global__bottom-bar-mobile-height"></div>
    </div>
  );
};
export default ManageFollows;
