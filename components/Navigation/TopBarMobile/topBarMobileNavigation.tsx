import styles from "../../../styles/Navigation/TopBarMobile/topBarMobileNavigation.module.scss";
import TopBarMobileHamburger from "./topBarMobileHamburger";

const TopBarMobileNavigation = () => {
  return (
    <div
      className={[
        "fs-24px",
        isLightColor
          ? "top-bar-mobile-navigation-control__light-color "
          : "top-bar-mobile-navigation-control__dark-color",
      ].join(" ")}
      style={{ marginRight: "-1px" }}
    >
      <div>
        <TopBarMobileHamburger className="fs-24px"></TopBarMobileHamburger>
      </div>
    </div>
  );
};
export default TopBarMobileNavigation;
