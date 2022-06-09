import styles from "../../../styles/Navigation/TopBarMobile/topBarMobileSignIn.module.scss";

const TopBarMobileSignIn = () => {
  // *ngIf="!globalVars.loggedInUser"
  return (
    <div className="d-lg-none d-block">
      {/* (click)="globalVars.launchSignupFlow()" */}
      <a className="font-weight-bold">Sign Up</a>
    </div>
  );
};
export default TopBarMobileSignIn;
