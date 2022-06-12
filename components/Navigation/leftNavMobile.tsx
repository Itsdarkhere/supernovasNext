import styles from "../../styles/Navigation/leftNavMobile.module.scss";
import MobileNavigation from "./mobileNavigation";

const LeftNavMobile = () => {
  // [@leftBarAnimation]
  if (!isLeftBarMobileOpen) {
    return null;
  }
  return (
    <div className="left-bar-mobile__flyout-div">
      <MobileNavigation closeMobile={() => _closeMenu()}></MobileNavigation>
      <div onClick={() => _closeMenu()} className="nav_close">
        <img src="/assets/icons/cas_x_icon.svg" alt="" />
      </div>
    </div>
  );
};
export default LeftNavMobile;
