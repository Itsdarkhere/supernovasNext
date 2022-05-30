import Image from "next/image";
import styles from "../styles/header.module.scss";
import notificationIcon from "../public/icons/notification-icon.svg";
import searchIcon from "../public/icons/search-icon-mobile.svg";
import { useState } from "react";
import { unreadNotifications } from "../utils/global-context";
import { loggedInUser, GetNav } from "../utils/global-context";
import { RouteNames } from "../utils/backendapi-context";
import Link from "next/link";
const Header = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const showNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const showSearchBar = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeDropdown = () => {
    setIsNotificationOpen(false);
  };

  const getCloseIcon = () => {
    if (!isSearchOpen) {
      return (
        <Image
          onClick={() => closeDropdown()}
          src={searchIcon}
          className={styles.clout}
          layout="fill"
          alt=""
        />
      );
    }
    return null;
  };

  const getCloseSearchIcon = () => {
    if (isSearchOpen) {
      return (
        <i
          className={styles.icon_close}
          onClick={() => showSearchBar()}
          title="Close search"
        ></i>
      );
    }
    return null;
  };

  const showNotificationAmount = () => {
    if (unreadNotifications > 0) {
      return (
        <label
          className={
            styles.notification_amount +
            "mb-0px fs-10px ml-5px pointer-events-none"
          }
        >
          {unreadNotifications > 99 ? "99+" : unreadNotifications}
        </label>
      );
    }
    return null;
  };

  const showOpenNotifications = () => {
    if (isNotificationOpen) {
      return (
        <div className={styles.notification_list_cover}>
          <div className={styles.header_notification_list_inner}>
            {/* <app-notifications-list [isNotificationBar]="true"></app-notifications-list> Rewrite in react */}
          </div>
          {/* [routerLink]="'/' + globalVars.RouteNames.NOTIFICATIONS" rewrite in react */}
          <a
            className={styles.view_all_text + "text_primary"}
            title="View All Notifications"
          >
            View all
          </a>
        </div>
      );
    }
    return null;
  };

  const getCreateButton = () => {
    if (loggedInUser) {
      return (
        <li
          className={
            styles.single_option + " d-flex flex-center position-relative"
          }
        >
          <button
            onClick={() => checkCanMint()}
            className={
              styles.header_create_button_gradient + " p-0px " + styles.grow
            }
          >
            <p className={"color-white fs-14px"}>Create</p>
          </button>
        </li>
      );
    }
    return null;
  };

  const checkCanMint = () => {
    let navigate = GetNav();
    if (loggedInUser?.ProfileEntryResponse?.Username) {
      navigate("/" + RouteNames.MINT_PAGE);
    } else {
      navigate("/" + RouteNames.COMPLETE_PROFILE);
    }
  };

  return (
    <header
      className={
        styles.header + `${isNotificationOpen ? " bg_notification" : ""}`
      }
    >
      <div className={styles.header_golal_wrapper}>
        <div className={styles.header_search_right_container}>
          <Link
            className={styles.logo_cover + " " + styles.global__tooltip_icon}
            href={"/browse"}
          >
            <h1 className={styles.header_logo}>supernovas</h1>
          </Link>
          {/* [class.active-mobile]="isSearchOpen" */}
          <div className={styles.search_bar_cover}>
            {/* <search-bar [focusSearchInput]="isSearchOpen" [headerSearchBar]="true"></search-bar> */}
          </div>
          <div className={styles.right_portion}>
            <ul className={styles.right_side_options + " " + styles.for_mobile}>
              <li className={styles.single_option}>
                {getCloseIcon()}
                {getCloseSearchIcon()}
              </li>
            </ul>
            <ul
              className={
                styles.right_side_options + " " + styles.menu_options_list
              }
            >
              {/* (clickOutside)="clickOutside()" *ngIf="globalVars.loggedInUser"  REWRITE IN REACT*/}
              <li
                className={
                  styles.notification_icon_cover +
                  " " +
                  styles.single_option +
                  " " +
                  "h-100 d-flex flex-center flex-column"
                }
              >
                <div className={styles.noti_hv}>
                  <Image
                    onClick={() => showNotification()}
                    alt="notification bell"
                    src={notificationIcon}
                    layout="fill"
                    title="Notification"
                  />
                  {showNotificationAmount()}
                </div>
                {showOpenNotifications()}
              </li>
              {getCreateButton()}
              {/* <change-account-selector class="ml-20px"></change-account-selector> */}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
