import styles from "../../../styles/Navigation/TopBarMobile/topBarMobileSignIn.module.scss";
import { launchSignupFlow } from "../../../utils/global-context";

const TopBarMobileSignIn = () => {
  if (!loggedInUser) {
    return null;
  }
  return (
    <div className="d-lg-none d-block">
      <a onClick={() => launchSignupFlow()} className="font-weight-bold">
        Sign Up
      </a>
    </div>
  );
};
export default TopBarMobileSignIn;
