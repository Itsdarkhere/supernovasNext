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

const LeftNav = () => {
  return (
    <div>
      <div
        className={styles.global__nav__fixed + " disable-scrollbars"}
        id="navigation"
      >
        <LeftNavButton
          hasNotifications="false"
          link="/discovery"
          imgSrc={discoveryIcon}
          label="Discovery"
        ></LeftNavButton>
        <LeftNavButton
          hasNotifications="false"
          link="/browser"
          imgSrc={feedIcon}
          label="Feed"
        ></LeftNavButton>
        <LeftNavButton
          hasNotifications="false"
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
        {/* *ngIf="globalVars.loggedInUser && this.globalVars.isOnboardingComplete" */}
        <LeftNavButton
          hasNotifications="false"
          link="/activity"
          imgSrc={activityIcon}
          label="Activity"
        ></LeftNavButton>
        {/* *ngIf="this.globalVars?.loggedInUser?.ProfileEntryResponse?.Username" */}
        <LeftNavButton
          hasNotifications="false"
          link="'/u/' + this.globalVars?.loggedInUser?.ProfileEntryResponse.Username"
          imgSrc={profileIcon}
          label="Profile"
        ></LeftNavButton>
        {/* *ngIf="this.globalVars?.loggedInUser && !this.globalVars?.loggedInUser?.ProfileEntryResponse?.Username" */}
        <LeftNavButton
          hasNotifications="false"
          link="'/update-profile'"
          imgSrc={profileIcon}
          label="Profile"
        ></LeftNavButton>
        {/* *ngIf="globalVars.loggedInUser" */}
        <LeftNavButton
          link="'/' + this.globalVars.RouteNames.INBOX_PREFIX"
          hasNotifications="true"
          imgSrc={messagesIcon}
          label="Messages"
        ></LeftNavButton>
        {/* *ngIf="globalVars.loggedInUser" */}
        <LeftNavButton
          hasNotifications="false"
          link="/wallet"
          imgSrc={walletIcon}
          label="Wallet"
        ></LeftNavButton>
        {/* *ngIf="!this.globalVars.isOnboardingComplete && this.globalVars?.loggedInUser?.PublicKeyBase58Check" */}
        <LeftNavButton
          hasNotifications="false"
          link="'/' + this.globalVars.RouteNames.COMPLETE_PROFILE"
          imgSrc={onBoardingIcon}
          label="Onboarding"
        ></LeftNavButton>
        {/* [routerLink]="'/' + this.globalVars.RouteNames.DAO_PAGE"
                [routerLinkActive]="['active']" */}
        <Link href="/dao">
          <button className={styles.icon + " position-relative"}>
            <Image src={daoIcon} layout="fill" alt="left bar icon" />
            <label className={styles.lb_button_label}>Dao</label>
            <label className={styles.lb_button_label_new}>LIVE</label>
          </button>
        </Link>
        {/*  *ngIf="globalVars.showAdminTools()" [routerLink]="'/' + globalVars.RouteNames.ADMIN" */}
        <button className={styles.lb_admin}>A</button>
      </div>
    </div>
  );
};
export default LeftNav;
