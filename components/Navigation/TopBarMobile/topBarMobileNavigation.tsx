import styles from "../../../styles/Navigation/TopBarMobile/topBarMobileNavigation.module.scss";

const TopBarMobileNavigation = () => {
  //     [ngClass]="
  //     isLightColor ? 'top-bar-mobile-navigation-control__light-color ' : 'top-bar-mobile-navigation-control__dark-color'
  //   "
  return (
    <div className="fs-24px" style="margin-top: -1px">
      <div>
        <top-bar-mobile-hamburger-menu class="fs-24px"></top-bar-mobile-hamburger-menu>
      </div>
    </div>
  );
};
export default TopBarMobileNavigation;
