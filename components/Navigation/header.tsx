import Image from "next/image";
import styles from "../../styles/Navigation/header.module.scss";
import notificationIcon from "../../public/icons/notification-icon.svg";
import searchIcon from "../../public/icons/search-icon-mobile.svg";
import { useState } from "react";
import { unreadNotifications } from "../../utils/global-context";
import { RouteNames } from "../../utils/backendapi-context";
import Link from "next/link";
import { useAppSelector } from "../../utils/Redux/hooks";
import ChangeAccountDropdown from "../Reusables/changeAccountDropdown";
import NotificationsList from "../Notifications/notificationsList";
import SearchBar from "../Reusables/searchBar";
const Header = () => {
  // Redux
  const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  // Redux end

  // State
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // State end

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
            <NotificationsList isNotificationBar={true}></NotificationsList>
          </div>
          <Link href="/notifications">
            <a
              className={styles.view_all_text + "text_primary"}
              title="View All Notifications"
            >
              View all
            </a>
          </Link>
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
    // FIX NAVIGATE
    // let navigate = GetNav();
    if (loggedInUser?.ProfileEntryResponse?.Username) {
      // navigate("/" + RouteNames.MINT_PAGE);
    } else {
      // navigate("/" + RouteNames.COMPLETE_PROFILE);
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
            <SearchBar
              focusSearchInput={isSearchOpen}
              headerSearchBar={true}
            ></SearchBar>
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
              {/* (clickOutside)="clickOutside()"  REWRITE IN REACT*/}
              {loggedInUser ? (
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
                      height="25px"
                      title="Notification"
                    />
                    {showNotificationAmount()}
                  </div>
                  {showOpenNotifications()}
                </li>
              ) : null}

              {getCreateButton()}
              <div className="ml-20px">
                <ChangeAccountDropdown></ChangeAccountDropdown>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
