import styles from "../../styles/Navigation/leftNav.module.scss";
import LeftNavButton from "./leftNavButton";
import Image from "next/image";
import marketplaceIcon from "../../public/icons/lb_marketplace_icon.svg";
import discoveryIcon from "../../public/icons/lb_discovery_icon.svg";
import feedIcon from "../../public/icons/lb_feed_icon.svg";
import activityIcon from "../../public/icons/lb_activity_icon.svg";
import profileIcon from "../../public/icons/lb_profile_icon.svg";
import messagesIcon from "../../public/icons/lb_messages_icon.svg";
import walletIcon from "../../public/icons/lb_wallet_icon.svg";
import onBoardingIcon from "../../public/icons/profile-icon.svg";
import daoIcon from "../../public/icons/feed_sn_icon.png";
import Link from "next/link";
import { RouteNames } from "../../utils/backendapi-context";
import { useAppSelector } from "../../utils/Redux/hooks";
import { showAdminTools } from "../../utils/global-context";

const LeftNav = () => {
  // Redux
  let loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  let isOnboardingComplete = useAppSelector(
    (state) => state.user.isOnboardingComplete
  );
  return (
    <div>
      <div
        className={styles.global__nav__fixed + " disable-scrollbars"}
        id="navigation"
      >
        <LeftNavButton
          hasNotifications={false}
          link="/discovery"
          imgSrc={discoveryIcon}
          label="Discovery"
        ></LeftNavButton>
        <LeftNavButton
          hasNotifications={false}
          link="/"
          imgSrc={feedIcon}
          label="Feed"
        ></LeftNavButton>
        <LeftNavButton
          hasNotifications={false}
          link="/marketplace"
          imgSrc={marketplaceIcon}
          label="Marketplace"
        ></LeftNavButton>
        {/* <LeftNavButton
                link="'/' + this.globalVars.RouteNames.ANALYTICS"
                imgSrc="'/assets/icons/lb_analytics_icon.svg'"
                label="'Analytics'"
                ></LeftNavButton> */}
        {/* *ngIf="globalVars.loggedInUser" */}
        <hr />
        {loggedInUser && isOnboardingComplete ? (
          <LeftNavButton
            hasNotifications={false}
            link="/activity"
            imgSrc={activityIcon}
            label="Activity"
          ></LeftNavButton>
        ) : null}

        {loggedInUser?.ProfileEntryResponse?.Username ? (
          <LeftNavButton
            hasNotifications={false}
            link={"/u/" + loggedInUser?.ProfileEntryResponse.Username}
            imgSrc={profileIcon}
            label="Profile"
          ></LeftNavButton>
        ) : null}

        {loggedInUser && !loggedInUser?.ProfileEntryResponse?.Username ? (
          <LeftNavButton
            hasNotifications={false}
            link="'/update-profile'"
            imgSrc={profileIcon}
            label="Profile"
          ></LeftNavButton>
        ) : null}

        {loggedInUser ? (
          <LeftNavButton
            link={"/" + RouteNames.INBOX_PREFIX}
            hasNotifications={true}
            imgSrc={messagesIcon}
            label="Messages"
          ></LeftNavButton>
        ) : null}

        {loggedInUser ? (
          <LeftNavButton
            hasNotifications={false}
            link="/wallet"
            imgSrc={walletIcon}
            label="Wallet"
          ></LeftNavButton>
        ) : null}

        {!isOnboardingComplete && loggedInUser?.PublicKeyBase58Check ? (
          <LeftNavButton
            hasNotifications={false}
            link={"/" + RouteNames.COMPLETE_PROFILE}
            imgSrc={onBoardingIcon}
            label="Onboarding"
          ></LeftNavButton>
        ) : null}

        {/*[routerLinkActive]="['active']" */}
        <Link href={"/" + RouteNames.DAO_PAGE}>
          <button className={styles.icon + " position-relative"}>
            <Image src={daoIcon} layout="fill" alt="left bar icon" />
            <label className={styles.lb_button_label}>Dao</label>
            <label className={styles.lb_button_label_new}>LIVE</label>
          </button>
        </Link>

        {showAdminTools() ? (
          <Link href={"/" + RouteNames.ADMIN}>
            <button className={styles.lb_admin}>A</button>
          </Link>
        ) : null}
      </div>
    </div>
  );
};
export default LeftNav;
