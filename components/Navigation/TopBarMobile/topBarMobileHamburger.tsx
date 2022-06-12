import styles from "../../../styles/Navigation/TopBarMobile/topBarMobileHamburger.module.scss";
import { openLeftBarMobile } from "../../../utils/global-context";

const TopBarMobileHamburger = () => {
  return (
    <i onClick={() => openLeftBarMobile()} className="fas fa-bars fs-24px"></i>
  );
};
export default TopBarMobileHamburger;
