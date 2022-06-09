import styles from "../../styles/ManageFollows/manageFollows.module.scss";
import TabSelector from "../Reusables/tabSelector";

const ManageFollows = () => {
  return (
    <div className="flex-grow-1">
      {/* <!--Header Mobile--> */}
      <div className="d-lg-none d-block w-100">
        <div className="global__top-bar__height d-flex align-items-center justify-content-between w-100 px-15px fs-18px font-weight-bold fc-default border-bottom border-color-grey">
          <div className="d-flex align-items-center">
            {/* <top-bar-mobile-navigation-control class="mr-15px d-lg-none d-inline-block"></top-bar-mobile-navigation-control> */}
            {/* [routerLink]="['/' + appData.RouteNames.USER_PREFIX, targetUsername]" */}
            <a className="link--unstyled">{targetUsername}</a>
          </div>

          {/* <top-bar-mobile-log-in-or-sign-up></top-bar-mobile-log-in-or-sign-up> */}
        </div>

        {/* <!-- Tabs --> */}
        <TabSelector
          tabs="[ManageFollowsComponent.FOLLOWERS, ManageFollowsComponent.FOLLOWING]"
          activeTab="activeTab"
          tabClick="_handleTabClick($event)"
        ></TabSelector>
      </div>

      {/* <!--Header Desktop--> */}
      <div className="d-lg-block d-none">
        <div className="d-flex w-100 px-15px global__top-bar__height align-items-center justify-content-between fs-18px font-weight-bold fc-default border-bottom border-color-grey">
          {/* [routerLink]="['/' + appData.RouteNames.USER_PREFIX, targetUsername]" */}
          <a className="link--unstyled">{targetUsername}</a>
          {/* <top-bar-mobile-log-in-or-sign-up></top-bar-mobile-log-in-or-sign-up> */}
        </div>

        {/* <!-- Tabs --> */}
        <TabSelector
          tabs="[ManageFollowsComponent.FOLLOWERS, ManageFollowsComponent.FOLLOWING]"
          activeTab="activeTab"
          tabClick="_handleTabClick($event)"
        ></TabSelector>
      </div>

      {/* <simple-center-loader *ngIf="loadingFirstPage"></simple-center-loader> */}
      {/* *ngIf="totalFollowerCount == 0 && !datasource.adapter.isLoading" */}
      <div className="fs-15px d-flex justify-content-left w-100 p-15px">
        Nobody yet
      </div>
      {/* #uiScroll
       *uiScroll="let profileEntry of datasource" */}
      <div
        className="row no-gutters px-15px border-bottom fs-15px"
        style="height: 100%"
      >
        {/* (click)="onRowClicked($event, profileEntry.Username)" */}
        <a className="fs-15px d-flex justify-content-left w-100 link--unstyled border-color-grey border-bottom p-15px">
          {/* <!-- Avatar --> */}
          <div className="manage-follows__avatar-container">
            {/* [routerLink]="['/' + globalVars.RouteNames.USER_PREFIX, profileEntry.Username]" */}
            <Avatar
              class="manage-follows__avatar br-12px"
              avatar={profileEntry.PublicKeyBase58Check}
              queryParamsHandling="merge"
            ></Avatar>
          </div>

          {/* <!-- Main Content --> */}
          <div className="w-100">
            <div className="d-flex align-items-center">
              {/* <!-- Username--> */}
              {/* [routerLink]="['/' + globalVars.RouteNames.USER_PREFIX, profileEntry.Username]" */}
              <a
                className="fc-default font-weight-bold"
                queryParamsHandling="merge"
              >
                {profileEntry.Username}
              </a>
              {/* *ngIf="profileEntry?.IsVerified" */}
              <span className="ml-1 d-inline-block align-center text-primary">
                <i className="fas fa-check-circle fa-md align-middle"></i>
              </span>
              {/* <!-- Coin price-->
          <!-- Hidden on mobile, UI gets too crowded otherwise --> */}
              {/* [routerLink]="AppRoutingModule.buyCreatorPath(profileEntry.Username)" */}
              <a
                style="padding: 3px"
                className="ml-2 fs-13px font-weight-bold px-2 feed-post__coin-price-holder d-lg-block d-none br-12px"
                queryParamsHandling="merge"
              >
                <span className="fc-default">
                  ~{globalVars.nanosToUSD(profileEntry.CoinPriceDeSoNanos, 2)}
                </span>
                {/* <!-- Buy link --> */}
                Buy
              </a>

              {/* <!-- Follow button --> */}
              {/* *ngIf="canLoggedInUserFollowTargetPublicKey(profileEntry.PublicKeyBase58Check)" */}
              <div className="ml-auto">
                <follow-button
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
                ></follow-button>
              </div>
            </div>

            {/* <!-- Content --> */}
            {/* [innerHTML]="profileEntry.Description | sanitizeAndAutoLink" */}
            <div
              className="roboto-regular mt-1"
              style="overflow-wrap: anywhere; -ms-word-break: break-all; word-break: break-all; word-break: break-word"
            ></div>
          </div>
        </a>
      </div>
      {/* <simple-center-loader *ngIf="loadingNextPage && !loadingFirstPage" [height]="100"></simple-center-loader> */}
      {/* <!-- Num anonymous followers--> */}
      {/* *ngIf="anonymousFollowerCount > 0" */}
      <div className="fs-15px d-flex justify-content-left w-100 p-15px">
        {/* <!--TODO: pluralize--> */}
        ... Plus {anonymousFollowerCount} anonymous{" "}
        {this.activeTab.toLowerCase()}
      </div>
      <div className="d-lg-none global__bottom-bar-mobile-height"></div>
      <div className="d-lg-none global__bottom-bar-mobile-height"></div>
      <div className="global__bottom-bar-mobile-height"></div>
      <div className="global__bottom-bar-mobile-height"></div>
    </div>
  );
};
export default ManageFollows;
