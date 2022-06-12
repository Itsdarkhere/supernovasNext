import styles from "../../styles/Signup/signup.module.scss";
import TopBarMobileNavigation from "../Navigation/TopBarMobile/topBarMobileNavigation";
import SignupGetDeso from "./signupGetDeso";

const Signup = () => {
  return (
    <>
      {/* <!--Header--> */}
      {stepNum != 4 ? (
        <div
          className="d-flex align-items-center justify-content-between w-100 px-15px fs-18px fc-default border-bottom border-color-grey"
          style={{ minHeight: "80px" }}
        >
          <div className="d-flex align-items-center">
            <TopBarMobileNavigation></TopBarMobileNavigation>

            <span className="font-weight-bold">Sign up&nbsp;</span>
            {stepNum == 1 ? (
              <div>
                &middot;
                <a
                  onClick={() => globalVars.launchLoginFlow()}
                  className="font-weight-bold"
                >
                  Log in
                </a>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="w-100 pl-15px pr-15px">
        {/* <!-- Step 3 --> */}
        {stepNum == 3 ? (
          <div>
            {/* <!-- Get starter DeSo --> */}
            <SignupGetDeso
              displayForSignupFlow={true}
              backToPreviousSignupStepClicked={backToPreviousSignupStepClicked()}
              skipButtonClicked={skipButtonClickedOnStarterDeSoStep()}
              phoneNumberVerified={phoneNumberVerified()}
            ></SignupGetDeso>
          </div>
        ) : null}

        {/* <!-- Step 4 --> */}
        {stepNum == 4 ? (
          <div className="step-4">
            <h3 className="signup-header">Add your contact details</h3>
            <label className="signup-label">Email address*</label>
            <p className="signup-description">
              We will send you transaction updates through this email.
            </p>
            <div className="signup-input-email">
              <input
                value={emailAddress}
                type="email"
                className="form-control fs-15px signup-emailfield"
                placeholder="Enter an email address."
              />
              {invalidEmailEntered ? (
                <div className="fc-red fs-15px mt-10px">
                  Please enter a valid email address.
                </div>
              ) : null}
            </div>
            {showPhoneNumberVerifiedContent ? (
              <div>
                <p>
                  Your phone number is verified! You will receive 0.01 $DESO’s
                  on your account.
                </p>
              </div>
            ) : null}

            {!storingEmailAndPhone ? (
              <button
                onClick={() => notificationsStepNext()}
                className="supernovas-continue-button"
              >
                Continue
              </button>
            ) : null}

            <div className="signup-skip-button">
              {/* [routerLink]="'/' + this.globalVars.RouteNames.UPDATE_PROFILE" */}
              <a className="signup-skip-link">
                <img
                  className="chevron"
                  src="'assets/icons/chevron_right.svg'"
                />
                Skip
              </a>
            </div>
          </div>
        ) : null}

        {/* <!-- Finished --> */}
        {stepNum == 5 ? (
          <div>
            <div className="fs-24px font-weight-bold pt-15px">
              <i className=""></i>
              Buy $DESO
            </div>
            <div className="fs-18px pt-15px">
              <span>
                $DESO is a<b>cryptocurrency</b>
                like Bitcoin, only it powers the first
                <b>decentralized social network</b>.
              </span>
            </div>
            <div className="fs-18px pt-30px mb-10px">
              You can use $DESO to trade creator coins, give Diamonds, buy NFTs,
              and much more.
            </div>

            <div className="d-flex justify-content-end mt-15px pt-10px">
              <button onClick={() => buyDeSoSkipped()} className="btn btn-outline-primary font-weight-bold fs-15px">
                Skip
              </button>
              <button onClick={() => buyDeSoClicked()} className="btn btn-primary font-weight-bold fs-15px ml-10px">
                Buy $DESO
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
export default Signup;
