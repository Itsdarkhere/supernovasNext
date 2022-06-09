import styles from "../../styles/Navigation/bottomBarMobile.module.scss";

const BottomBarMobile = () => {
  // *ngIf="globalVars.loggedInUser"
  return (
    <>
      <div className="page-bottom-bar-mobile">
        <div className="bottom-bar-list border-color-grey">
          <bottom-bar-mobile-tab link="'/' + globalVars.RouteNames.BROWSE">
            <div className="icon-cover">
              <img src="assets/icons/feed-icon.svg" alt="" />
            </div>
          </bottom-bar-mobile-tab>

          <bottom-bar-mobile-tab link="'/' + globalVars.RouteNames.TRENDS">
            <div className="icon-cover">
              <img src="assets/icons/marketplace-icon.svg" alt="" />
            </div>
          </bottom-bar-mobile-tab>
          {/* [matMenuTriggerFor]="createMenu" */}
          <button className="btn btn-create clout">
            <span className="nb font-weight-semiboldn">
              <img className="noti-img" src="assets/icons/u_plus.png" alt="" />
            </span>
          </button>
          {/* #createMenu="matMenu" */}
          <mat-menu class="create_post_mmnenu">
            <div className="create-menu-cover">
              <button
                mat-menu-item
                routerLink="'/' + globalVars.RouteNames.CREATE_POST"
              >
                <div className="icon-cover">
                  <img src="assets/img/circle-add.svg" alt="Post" />
                </div>
                Create a Post
              </button>
              {/* (click)="checkCanMint()" */}
              <button mat-menu-item>
                <div className="icon-cover">
                  <img src="assets/img/frame_nv.svg" alt="Post" />
                </div>
                Create an NFT
              </button>
            </div>
          </mat-menu>

          <bottom-bar-mobile-tab link="'/' + globalVars.RouteNames.NOTIFICATIONS">
            <div className="icon-cover">
              <img
                className="noti-img"
                src="assets/icons/notification-icon.svg"
                alt=""
              />
            </div>
          </bottom-bar-mobile-tab>

          <button className="bottom-bar-nav bottom-bar-button cursor-pointer">
            {/* (click)="globalVars.openLeftBarMobile()" */}
            <div className="icon-cover">
              <img
                src="assets/icons/hamburger-icon.svg"
                className="clout"
                alt=""
              />
            </div>
          </button>
        </div>
      </div>
      {/* *ngIf="!globalVars.loggedInUser" */}
      <div className="page-bottom-bar-mobile">
        <div className="bottom-bar-list-padding border-color-grey">
          <bottom-bar-mobile-tab link="'/' + globalVars.RouteNames.BROWSE">
            <div className="icon-cover">
              <img src="assets/icons/feed-icon.svg" alt="" />
            </div>
          </bottom-bar-mobile-tab>

          <bottom-bar-mobile-tab link="'/' + globalVars.RouteNames.TRENDS">
            <div className="icon-cover">
              <img src="assets/icons/marketplace-icon.svg" alt="" />
            </div>
          </bottom-bar-mobile-tab>

          <div className="bottom-bar-nav cursor-pointer">
            {/* (click)="globalVars.openLeftBarMobile()" */}
            <div className="icon-cover">
              <img
                src="assets/icons/hamburger-icon.svg"
                className="clout"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BottomBarMobile;
