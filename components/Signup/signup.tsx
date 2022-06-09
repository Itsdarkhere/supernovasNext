import styles from "../../styles/Signup/signup.module.scss";

const Signup = () => {
  return (
    <>
      {/* <!--Header--> */}
      {/* *ngIf="stepNum != 4" */}
      <div
        className="d-flex align-items-center justify-content-between w-100 px-15px fs-18px fc-default border-bottom border-color-grey"
        style="min-height: 80px"
      >
        <div className="d-flex align-items-center">
          {/* <top-bar-mobile-navigation-control class="mr-15px d-lg-none d-inline-block"></top-bar-mobile-navigation-control> */}

          <span className="font-weight-bold">Sign up&nbsp;</span>
          {/* *ngIf="stepNum == 1" */}
          <div>
            &middot;
            {/* (click)="globalVars.launchLoginFlow()" */}
            <a className="font-weight-bold">Log in</a>
          </div>
        </div>
      </div>

      <div className="w-100 pl-15px pr-15px">
        {/* <!-- Step 3 --> */}
        {/* *ngIf="stepNum == 3" */}
        <div>
          {/* <!-- Get starter DeSo --> */}
          <sign-up-get-starter-deso
            displayForSignupFlow="true"
            backToPreviousSignupStepClicked="backToPreviousSignupStepClicked()"
            skipButtonClicked="skipButtonClickedOnStarterDeSoStep()"
            phoneNumberVerified="phoneNumberVerified()"
          ></sign-up-get-starter-deso>
        </div>

        {/* <!-- Step 4 --> */}
        {/* *ngIf="stepNum == 4" */}
        <div className="step-4">
          <h3 className="signup-header">Add your contact details</h3>
          <label className="signup-label">Email address*</label>
          <p className="signup-description">
            We will send you transaction updates through this email.
          </p>
          <div className="signup-input-email">
            {/* [(ngModel)]="emailAddress" */}
            <input
              type="email"
              className="form-control fs-15px signup-emailfield"
              placeholder="Enter an email address."
            />
            {/* *ngIf="invalidEmailEntered" */}
            <div className="fc-red fs-15px mt-10px">
              Please enter a valid email address.
            </div>
          </div>
          {/* *ngIf="showPhoneNumberVerifiedContent" */}
          <div>
            <p>
              Your phone number is verified! You will receive 0.01 $DESO’s on
              your account.
            </p>
          </div>
          {/* *ngIf="!storingEmailAndPhone" (click)="notificationsStepNext()" */}
          <button className="supernovas-continue-button">Continue</button>
          <div className="signup-skip-button">
            {/* [routerLink]="'/' + this.globalVars.RouteNames.UPDATE_PROFILE" */}
            <a className="signup-skip-link">
              <img className="chevron" src="'assets/icons/chevron_right.svg'" />
              Skip
            </a>
          </div>
        </div>

        {/* <!-- Finished --> */}
        {/*  *ngIf="stepNum == 5" */}
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
            {/* (click)="buyDeSoSkipped()" */}
            <button className="btn btn-outline-primary font-weight-bold fs-15px">
              Skip
            </button>
            {/* (click)="buyDeSoClicked()" */}
            <button className="btn btn-primary font-weight-bold fs-15px ml-10px">
              Buy $DESO
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
