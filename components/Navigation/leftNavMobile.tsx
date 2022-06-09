import styles from "../../styles/Navigation/leftNavMobile.module.scss";

const LeftNavMobile = () => {
  // [@leftBarAnimation] *ngIf="globalVars.isLeftBarMobileOpen"
  return (
    <div className="left-bar-mobile__flyout-div">
      {/* (closeMobile)="_closeMenu()" */}
      <app-mobile-navigation class="w-100 h-100 d-flex flex-center"></app-mobile-navigation>
      {/* (click)="_closeMenu()" */}
      <div className="nav_close">
        <img src="/assets/icons/cas_x_icon.svg" alt="" />
      </div>
    </div>
  );
};
export default LeftNavMobile;
