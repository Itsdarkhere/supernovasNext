import styles from "../../styles/Navigation/bottomBarMobile.module.scss";
import { openLeftBarMobile } from "../../utils/global-context";
import BottomBarMobileTab from "./bottomBarMobileTab";

const BottomBarMobile = () => {
  return (
    <>
      {loggedInUser ? (
        <div className="page-bottom-bar-mobile">
          <div className="bottom-bar-list border-color-grey">
            <BottomBarMobileTab link="'/' + globalVars.RouteNames.BROWSE">
              <div className="icon-cover">
                <img src="assets/icons/feed-icon.svg" alt="" />
              </div>
            </BottomBarMobileTab>

            <BottomBarMobileTab link="'/' + globalVars.RouteNames.TRENDS">
              <div className="icon-cover">
                <img src="assets/icons/marketplace-icon.svg" alt="" />
              </div>
            </BottomBarMobileTab>
            {/* [matMenuTriggerFor]="createMenu" */}
            <button className="btn btn-create clout">
              <span className="nb font-weight-semiboldn">
                <img
                  className="noti-img"
                  src="assets/icons/u_plus.png"
                  alt=""
                />
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
                <button onClick={() => checkCanMint()} mat-menu-item>
                  <div className="icon-cover">
                    <img src="assets/img/frame_nv.svg" alt="Post" />
                  </div>
                  Create an NFT
                </button>
              </div>
            </mat-menu>

            <BottomBarMobileTab link="'/' + globalVars.RouteNames.NOTIFICATIONS">
              <div className="icon-cover">
                <img
                  className="noti-img"
                  src="assets/icons/notification-icon.svg"
                  alt=""
                />
              </div>
            </BottomBarMobileTab>

            <button className="bottom-bar-nav bottom-bar-button cursor-pointer">
              <div onClick={() => openLeftBarMobile()} className="icon-cover">
                <img
                  src="assets/icons/hamburger-icon.svg"
                  className="clout"
                  alt=""
                />
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div className="page-bottom-bar-mobile">
          <div className="bottom-bar-list-padding border-color-grey">
            <BottomBarMobileTab link="'/' + globalVars.RouteNames.BROWSE">
              <div className="icon-cover">
                <img src="assets/icons/feed-icon.svg" alt="" />
              </div>
            </BottomBarMobileTab>

            <BottomBarMobileTab link="'/' + globalVars.RouteNames.TRENDS">
              <div className="icon-cover">
                <img src="assets/icons/marketplace-icon.svg" alt="" />
              </div>
            </BottomBarMobileTab>

            <div className="bottom-bar-nav cursor-pointer">
              <div onClick={() => openLeftBarMobile()} className="icon-cover">
                <img
                  src="assets/icons/hamburger-icon.svg"
                  className="clout"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default BottomBarMobile;
