import styles from "../../styles/Navigation/bottomBarMobileTab.module.scss";

const BottomBarMobileTab = ({children}) => {
  return (
    <button
      className="cursor-pointer"
      click="clearNavigationHistory()"
      routerLink="[link]"
      queryParams="{ stepNum: null }"
      routerLinkActive="['fc-blue']"
      queryParamsHandling="merge"
    >
      {children}
    </button>
  );
};
export default BottomBarMobileTab;
