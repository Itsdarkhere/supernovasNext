import styles from "../../styles/Signup.module.scss";

const SignupPage = () => {
  return (
    <div className="position-relative w-100 signup-container">
      {/* <!-- if isMobile is false render desktop --> */}
      {/* *ngIf="!this.globalVars.isMobile()" */}
      <div>
        <header className="signup-header global__top-bar__height d-flex flex-center-start">
          {/* [routerLink]="'/' + this.globalVars.RouteNames.BROWSE" */}
          <a>
            {/* *ngIf="!this.globalVars.isMobile()" */}
            <img
              src="/assets/img/supernovas-grey.png"
              className="ml-30px"
              alt="grey supernovas logo"
            />
          </a>
        </header>
        <div className="global__top-bar__height"></div>
      </div>
      {/* *ngIf="!this.globalVars.isMobile()" */}
      <div className="signup-body-container d-flex flex-center">
        {/* *ngIf="stepNum === 1 || !globalVars.loggedInUser?.PublicKeyBase58Check" */}
        <div className="signup-center disable-scrollbars signup-center-height justify-content-center">
          <label className="font-weight-semiboldn text-align-center header-font-rezising">
            Connect with Deso Identity
          </label>
          <label
            style="color: #666666"
            className="subheading-font-resizing max-width-445px text-align-center signup-step-1-subheader"
          >
            You’ll be able to use your Deso Identity to interact with
            Supernovas.
          </label>
          {/* (click)="signUp()" */}
          <button className="signup-main-button d-flex flex-center flex-row subheading-font-resizing font-weight-semibold signup-step-1-button">
            <img
              className="logo-height-main-button mr-20px pointer-events-none"
              src="assets/deso/logo-cropped.png"
              alt="deso logo"
            />
            <p className="color-white pointer-events-none">Connect with Deso</p>
          </button>
        </div>
        {/* *ngIf="stepNum === 2 && globalVars.loggedInUser?.PublicKeyBase58Check" */}
        <div className="signup-center disable-scrollbars signup-center-height">
          <label className="font-weight-semiboldn mb-0px fs-32px text-align-center signup-window-header">
            Pick your profile type
          </label>
          <label
            style="color: #666666"
            className="fs-20px mt-20px mb-20px text-align-center"
          >
            Choose between creator and collector profile.
          </label>
          <div className="signup-card-box">
            {/* (click)="creatorSelected()"
          [ngClass]="{ 'electric-border': creator }" */}
            <button className="profile-type-card mt-20px p-0px left-btn">
              <div className="h-60 w-100 d-flex flex-center background-color-secondary">
                <img src="/assets/icons/creator.svg" alt="creator icon" />
              </div>
              <div className="h-40 w-100 mt-10px text-align-center">
                <label className="signup-step-2-card-header font-weight-bold pointer-events-none">
                  CREATOR
                </label>
                <label className="signup-step-2-card-text pointer-events-none">
                  I want to create NFT’s.
                </label>
              </div>
            </button>
            {/* (click)="collectorSelected()"
          [ngClass]="{ 'electric-border': collector }" */}
            <button className="profile-type-card mt-20px p-0px right-btn">
              <div className="h-60 w-100 d-flex flex-center background-color-secondary">
                <img src="/assets/icons/collector.svg" alt="colletor icon" />
              </div>
              <div className="h-40 w-100 mt-10px text-align-center">
                <label className="signup-step-2-card-header font-weight-bold pointer-events-none">
                  COLLECTOR
                </label>
                <label className="signup-step-2-card-text pointer-events-none">
                  I want to buy and sell NFT’s.
                </label>
              </div>
            </button>
          </div>
          {/* (click)="nextStep()"
        [disabled]="!creator && !collector" */}
          <button className="black-rounded-button basic-button-size color-white fs-15px font-weight-bold signup-window-btn">
            Continue
          </button>
        </div>
        {/* *ngIf="stepNum === 3 && globalVars.loggedInUser?.PublicKeyBase58Check" */}
        <div className="signup-center signup-center-height disable-scrollbars">
          <label className="font-weight-semiboldn mb-0px mt-20px header-font-rezising text-align-center signup-window-header">
            Email for notifications
          </label>
          <div className="h-120px mt-20px signup-window-body">
            <label className="fs-18px mb-0px font-weight-semiboldn">
              Email
            </label>
            <p
              style="color: #969696"
              className="signup-step-3-text font-weight-semibold"
            >
              You'll get notified when something important happens.
            </p>
            {/* [(ngModel)]="emailAddress" */}
            <input
              type="text"
              className="signup-input mt-20px"
              placeholder="Email Address"
              id="step3EmailAddress"
            />
            {/* *ngIf="invalidEmailEntered && startedEnteringEmail" */}
            <div className="fc-red mt-5px signup-step-3-text">
              Please enter a valid email address.
            </div>
          </div>

          <div className="w-100 d-flex flex-center">
            {/* (click)="verifyEmailClicked()" */}
            <button className="black-rounded-button basic-button-size color-white fs-15px font-weight-bold signup-window-btn">
              Continue
            </button>
          </div>
        </div>
        {/* *ngIf="stepNum === 4 && globalVars.loggedInUser?.PublicKeyBase58Check" */}
        <div className="signup-center signup-center-height disable-scrollbars">
          {/*  *ngIf="!this.globalVars.wantToVerifyPhone && !this.globalVars.phoneVerified" */}
          <label className="font-weight-semiboldn mb-0px mt-20px header-font-rezising text-align-center signup-window-header">
            Verify your phone number
          </label>
          {/*  *ngIf="this.globalVars.wantToVerifyPhone && !this.globalVars.phoneVerified" */}
          <label className="font-weight-semiboldn mb-0px mt-20px header-font-rezising text-align-center signup-window-header-mobile">
            Enter verification code
          </label>
          <div className="h-120px mt-20px signup-window-body">
            {/* *ngIf="!this.globalVars.wantToVerifyPhone && !this.globalVars.phoneVerified" */}
            <div>
              <label className="fs-18px mb-0px font-weight-semiboldn">
                Phone number
              </label>
              <p
                style="color: #969696"
                className="signup-step-4-text font-weight-semibold"
              >
                By verifying your phone number we know you are a real person!
              </p>
            </div>
            <div>
              <app-mobile-verification
                stepNum="stepNum"
                nextStep="nextStep()"
              ></app-mobile-verification>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- if isMobile is true render mobile --> */}
      {/* *ngIf="this.globalVars.isMobile()" */}
      <div>
        <header className="signup-header-mobile d-flex flex-center-start">
          {/* [routerLink]="'/' + this.globalVars.RouteNames.BROWSE" */}
          <a>
            {/* *ngIf="this.globalVars.isMobile()" */}
            <img
              src="../../assets/icons/supernovas-grey-mobile.svg"
              className="supernovas-grey-logo-mobile"
              alt="grey supernovas logo"
            />
          </a>
        </header>
      </div>
      {/* *ngIf="this.globalVars.isMobile()" */}
      <div
        className="signup-body-container flex-center-mobile"
        id="signup-body-container-scroll-lock"
      >
        {/* *ngIf="stepNum === 1 || !globalVars.loggedInUser?.PublicKeyBase58Check" */}
        <div className="signup-center-mobile d-flex flex-column flex-center">
          <label className="step-1-header-mobile font-weight-semiboldn">
            Connect with Deso Identity
          </label>
          <label
            style="color: #666666"
            className="step-1-text-mobile text-align-center font-weight-semibold"
          >
            You’ll be able to use your Deso Identity to interact with
            Supernovas.
          </label>
          {/* (click)="signUp()" */}
          <button className="signup-main-button-mobile d-flex flex-center flex-row subheading-font-resizing font-weight-semibold">
            <img
              className="logo-height-main-button mr-20px pointer-events-none"
              src="assets/deso/logo-cropped.png"
              alt="deso logo"
            />
            <p className="color-white pointer-events-none connect-with-deso-text-mobile">
              Connect with Deso
            </p>
          </button>
        </div>
        {/* *ngIf="stepNum === 2 && globalVars.loggedInUser?.PublicKeyBase58Check" */}
        <div className="signup-center-mobile disable-scrollbars">
          <label className="font-weight-semiboldn mb-0px mt-20px fs-32px text-align-center signup-window-header-mobile">
            Pick your profile type
          </label>
          <label
            style="color: #666666"
            className="fs-20px text-align-center signup-window-text-mobile"
          >
            Choose between creator and collector profile.
          </label>
          <div className="signup-card-box-mobile">
            {/* (click)="creatorSelected()"
          [ngClass]="{ 'electric-border': creator }" */}
            <button className="profile-type-card-mobile p-0px">
              <div className="h-60 w-100 d-flex flex-center background-color-secondary">
                <img src="/assets/icons/creator.svg" alt="creator icon" />
              </div>
              <div className="h-40 w-100 mt-10px text-align-center">
                <label className="signup-step-2-card-header-mobile font-weight-bold pointer-events-none signup-card-box-mobile-text">
                  CREATOR
                </label>
                <label className="signup-step-2-card-text-mobile pointer-events-none">
                  I want to create NFT’s.
                </label>
              </div>
            </button>
            {/* (click)="collectorSelected()"
          [ngClass]="{ 'electric-border': collector }" */}
            <button className="profile-type-card-mobile p-0px">
              <div className="h-60 w-100 d-flex flex-center background-color-secondary">
                <img src="/assets/icons/collector.svg" alt="colletor icon" />
              </div>
              <div className="h-40 w-100 mt-10px text-align-center">
                <label className="signup-step-2-card-header-mobile font-weight-bold pointer-events-none signup-card-box-mobile-text">
                  COLLECTOR
                </label>
                <label className="signup-step-2-card-text-mobile pointer-events-none">
                  I want to buy and sell NFT’s.
                </label>
              </div>
            </button>
          </div>
          {/* (click)="nextStep()"
        [disabled]="!creator && !collector" */}
          <button className="creator-colletor-button black-rounded-button basic-button-size color-white fs-15px font-weight-bold signup-window-btn-mobile">
            Continue
          </button>
        </div>
        {/* *ngIf="stepNum === 3 && globalVars.loggedInUser?.PublicKeyBase58Check" */}
        <div className="signup-center-mobile signup-center-height-mobile disable-scrollbars">
          <label className="font-weight-semiboldn mb-0px mt-20px header-font-rezising text-align-center signup-window-header-mobile">
            Email for notifications
          </label>
          <div className="h-120px mt-20px signup-window-body-mobile">
            <label className="fs-18px mb-0px font-weight-semiboldn">
              Email
            </label>
            <p
              style="color: #969696"
              className="signup-step-3-text-mobile font-weight-semibold"
            >
              You'll get notified when something important happens.
            </p>
            {/* [(ngModel)]="emailAddress" */}
            <input
              type="text"
              className="signup-input mt-20px"
              placeholder="Email Address"
              id="step3EmailAddress"
            />
            {/* *ngIf="invalidEmailEntered && startedEnteringEmail" */}
            <div className="fc-red mt-5px signup-step-3-text-mobile">
              Please enter a valid email address.
            </div>
          </div>

          <div className="w-100 d-flex flex-center">
            {/* (click)="verifyEmailClicked()" */}
            <button className="black-rounded-button basic-button-size color-white fs-15px font-weight-bold signup-window-btn">
              Continue
            </button>
          </div>
        </div>
        {/* *ngIf="stepNum === 4 && globalVars.loggedInUser?.PublicKeyBase58Check" */}
        <div className="signup-center-mobile signup-center-height-mobile disable-scrollbars">
          <div className="signup-window">
            {/* *ngIf="!this.globalVars.wantToVerifyPhone && !this.globalVars.phoneVerified" */}
            <label className="font-weight-semiboldn mb-0px mt-20px header-font-rezising text-align-center signup-window-header-mobile">
              Verify your phone number
            </label>
            {/* *ngIf="this.globalVars.wantToVerifyPhone && !this.globalVars.phoneVerified" */}
            <label className="font-weight-semiboldn mb-0px mt-20px header-font-rezising text-align-center signup-window-header-mobile">
              Enter verification code
            </label>
            <div className="h-120px mt-20px signup-window-body-mobile">
              {/* *ngIf="!this.globalVars.wantToVerifyPhone && !this.globalVars.phoneVerified" */}
              <div>
                <label className="fs-18px mb-0px font-weight-semiboldn">
                  Phone number
                </label>
                <p
                  style="color: #969696"
                  className="signup-step-4-text-mobile font-weight-semibold"
                >
                  By verifying your phone number we know you are a real person!
                </p>
              </div>
              <div>
                <app-mobile-verification
                  stepNum="stepNum"
                  nextStep="nextStep()"
                ></app-mobile-verification>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
