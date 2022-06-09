import styles from "../../styles/Navigation/mobileNavigation.module.scss";

const MobileNavigation = () => {
  return (
    <div className="mobile-navigation-container disable-scrollbars">
      <change-account-selector class="ml-5px"></change-account-selector>
      <hr className="w-100" />
      <div className="mobile-nav-grid">
        <span className="mobile-nav-item">
          {/*  (click)="closeMobileNav()"
        [routerLink]="'/' + this.globalVars.RouteNames.DISCOVERY"
        [routerLinkActive]="['active']" */}
          <button>
            <img src="/assets/icons/lb_discovery_icon.svg" />
          </button>
          <label>Discover</label>
        </span>
        <span className="mobile-nav-item">
          {/* (click)="closeMobileNav()"
        [routerLink]="'/' + this.globalVars.RouteNames.TRENDS"
        [routerLinkActive]="['active']" */}
          <button>
            <img src="/assets/icons/lb_marketplace_icon.svg" />
          </button>
          <label>Market</label>
        </span>
        <span className="mobile-nav-item">
          {/* (click)="closeMobileNav()"
        [routerLink]="'/' + this.globalVars.RouteNames.BROWSE"
        [routerLinkActive]="['active']" */}
          <button>
            <img src="/assets/icons/lb_feed_icon.svg" />
          </button>
          <label>Feed</label>
        </span>
        {/* *ngIf="this.globalVars?.loggedInUser" */}
        <span className="mobile-nav-item">
          {/* (click)="closeMobileNav()"
        [routerLink]="'/' + this.globalVars.RouteNames.ACTIVITY"
        [routerLinkActive]="['active']" */}
          <button>
            <img src="/assets/icons/lb_activity_icon.svg" />
          </button>
          <label>Activity</label>
        </span>
        {/* *ngIf="this.globalVars?.loggedInUser?.ProfileEntryResponse?.Username" */}
        <span className="mobile-nav-item">
          {/*  (click)="closeMobileNav()"
        [routerLink]="AppRoutingModule.profilePath(globalVars.loggedInUser?.ProfileEntryResponse?.Username)"
        [routerLinkActive]="['active']" */}
          <button>
            <img src="/assets/icons/lb_feed_icon.svg" />
          </button>
          <label>Profile</label>
        </span>
        {/* *ngIf="this.globalVars?.loggedInUser && !this.globalVars?.loggedInUser?.ProfileEntryResponse?.Username" */}
        <span className="mobile-nav-item">
          {/* (click)="closeMobileNav()" [routerLink]="'/update-profile'" [routerLinkActive]="['active']" */}
          <button>
            <img src="/assets/icons/lb_feed_icon.svg" />
          </button>
          <label>Profile</label>
        </span>
        {/* *ngIf="this.globalVars?.loggedInUser" */}
        <span className="mobile-nav-item">
          {/* (click)="closeMobileNav()"
        [routerLink]="'/' + this.globalVars.RouteNames.WALLET"
        [routerLinkActive]="['active']" */}
          <button>
            <img src="/assets/icons/lb_wallet_icon.svg" />
          </button>
          <label>Wallet</label>
        </span>
        {/* *ngIf="this.globalVars?.loggedInUser" */}
        <span className="mobile-nav-item">
          {/* (click)="closeMobileNav()"
        [routerLink]="'/' + this.globalVars.RouteNames.INBOX_PREFIX"
        [routerLinkActive]="['active']" */}
          <button>
            <img src="/assets/icons/lb_messages_icon.svg" />
          </button>
          <label>Messages</label>
        </span>
        {/* *ngIf="this.globalVars?.loggedInUser?.ProfileEntryResponse?.Username" */}
        <span className="mobile-nav-item">
          {/*  (click)="closeMobileNav()"
        [routerLink]="'/' + this.globalVars.RouteNames.DAO_PAGE"
        [routerLinkActive]="['active']" */}
          <button className="position-relative">
            <img src="/assets/icons/feed_sn_icon.png" />
            <label className="lb-button-label-new">LIVE</label>
          </button>
          <label>Dao</label>
        </span>
      </div>
    </div>
  );
};
export default MobileNavigation;
