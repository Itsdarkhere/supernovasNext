import styles from "../../styles/Navigation/bottomBarMobileTab.module.scss";
import Link from "next/link";

const BottomBarMobileTab = ({ children, link }) => {
  return (
    <Link href={link}>
      <button
        className="cursor-pointer"
        onClick={() => clearNavigationHistory()}
      >
        {children}
      </button>
    </Link>
  );
};
export default BottomBarMobileTab;
