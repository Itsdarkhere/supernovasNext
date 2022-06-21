import styles from "../../styles/Navigation/mobileNavigation.module.scss";
import ChangeAccountDropdown from "../Reusables/changeAccountDropdown";
import Link from "next/link";
import { profilePath } from "../../utils/routingFunctions";
import { RouteNames } from "../../utils/backendapi-context";
import { useAppSelector } from "../../utils/Redux/hooks";

const MobileNavigation = () => {
    let loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  return (
    <div className="mobile-navigation-container disable-scrollbars">
      <ChangeAccountDropdown></ChangeAccountDropdown>
      <hr className="w-100" />
      <div className="mobile-nav-grid">
        <span className="mobile-nav-item">
          {/*[routerLinkActive]="['active']" */}
          <Link href={"/" + RouteNames.DISCOVERY}>
            <button onClick={() => closeMobileNav()}>
              <img src="/assets/icons/lb_discovery_icon.svg" />
            </button>
          </Link>
          <label>Discover</label>
        </span>
        <span className="mobile-nav-item">
          {/*[routerLinkActive]="['active']" */}
          <Link href={"/" + RouteNames.TRENDS}>
            <button onClick={() => closeMobileNav()}>
              <img src="/assets/icons/lb_marketplace_icon.svg" />
            </button>
          </Link>
          <label>Market</label>
        </span>
        <span className="mobile-nav-item">
          {/*[routerLinkActive]="['active']" */}
          <Link href={"/" + RouteNames.BROWSE}>
            <button onClick={() => closeMobileNav()}>
              <img src="/assets/icons/lb_feed_icon.svg" />
            </button>
          </Link>
          <label>Feed</label>
        </span>
        {loggedInUser ? (
          <span className="mobile-nav-item">
            {/*[routerLinkActive]="['active']" */}
            <Link href={"/" + RouteNames.ACTIVITY}>
              <button onClick={() => closeMobileNav()}>
                <img src="/assets/icons/lb_activity_icon.svg" />
              </button>
            </Link>
            <label>Activity</label>
          </span>
        ) : null}
        {loggedInUser?.ProfileEntryResponse?.Username ? (
          <span className="mobile-nav-item">
            {/*[routerLinkActive]="['active']" */}
            <Link
              href={profilePath(loggedInUser?.ProfileEntryResponse?.Username)}
            >
              <button onClick={() => closeMobileNav()}>
                <img src="/assets/icons/lb_feed_icon.svg" />
              </button>
            </Link>
            <label>Profile</label>
          </span>
        ) : null}
        {loggedInUser &&
        !this.globalVars?.loggedInUser?.ProfileEntryResponse?.Username ? (
          <span className="mobile-nav-item">
            {/* [routerLinkActive]="['active']" */}
            <Link href={"/update-profile"}>
              <button onClick={() => closeMobileNav()}>
                <img src="/assets/icons/lb_feed_icon.svg" />
              </button>
            </Link>
            <label>Profile</label>
          </span>
        ) : null}

        {loggedInUser ? (
          <span className="mobile-nav-item">
            {/*[routerLinkActive]="['active']" */}
            <Link href={"/" + RouteNames.WALLET}>
              <button onClick={() => closeMobileNav()}>
                <img src="/assets/icons/lb_wallet_icon.svg" />
              </button>
            </Link>
            <label>Wallet</label>
          </span>
        ) : null}
        {loggedInUser ? (
          <span className="mobile-nav-item">
            {/*[routerLinkActive]="['active']" */}
            <Link href={"/" + RouteNames.INBOX_PREFIX}>
              <button onClick={() => closeMobileNav()}>
                <img src="/assets/icons/lb_messages_icon.svg" />
              </button>
            </Link>
            <label>Messages</label>
          </span>
        ) : null}

        {loggedInUser?.ProfileEntryResponse?.Username ? (
          <span className="mobile-nav-item">
            {/*[routerLinkActive]="['active']" */}
            <Link href={"/" + RouteNames.DAO_PAGE}>
              <button
                onClick={() => closeMobileNav()}
                className="position-relative"
              >
                <img src="/assets/icons/feed_sn_icon.png" />
                <label className="lb-button-label-new">LIVE</label>
              </button>
            </Link>
            <label>Dao</label>
          </span>
        ) : null}
      </div>
    </div>
  );
};
export default MobileNavigation;
