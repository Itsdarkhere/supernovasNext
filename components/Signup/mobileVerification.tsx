import styles from "../../styles/Signup/mobileVerification.module.scss";

const MobileVerification = () => {
  return (
    <div className="h-100px mobile-verification-component">
      {/* *ngIf="
      stepNum === 4 &&
      !this.globalVars.wantToVerifyPhone &&
      !this.globalVars.phoneVerified &&
      !this.globalVars.isPhoneNumberVerificationTextServerErrorFree
    " */}
      {/* #f="ngForm"
    [formGroup]="phoneForm" */}
      <form className="form-group mt-5px">
        <div className="mobile-verification-input-button-one mt-20px">
          {/* <!-- kyle's modified code --> */}
          {/* <ngx-intl-tel-input
            style="font-size: 15px !important"
            cssClass="'form-control mobile-input sign-up__phone-input'"
            separateDialCode="true"
            enableAutoCountrySelect="true"
            enablePlaceholder="true"
            searchCountryFlag="true"
            selectFirstCountry="false"
            selectedCountryISO="CountryISO.UnitedStates"
            maxLength="15"
            phoneValidation="true"
            ngModelChange="updateWantToVerifyPhoneClicked()"
            name="phone"
            formControlName="phone"
            click="phoneInputClicked()"
            clickOutside
            clickOutside="clickOutsideEventFunction($event)"
          ></ngx-intl-tel-input> */}

          {/* <!-- deso identity code --> */}

          <div className="w-100 d-flex flex-center phone-number-text-block">
            <div className="signup-window-btn-mobile">
              {/* (click)="verifyPhoneNumberClicked()" */}
              <button
                className="black-rounded-button basic-button-size color-white fs-15px font-weight-bold"
                type="button"
                id="create-profile-button"
              >
                {/* *ngIf="!sendingPhoneNumberVerificationText; else elseBlock" */}
                <label className="mb-0px pointer-events-none">
                  Send verification code
                </label>
                {/* <ng-template #elseBlock><i class="fa fa-spinner fa-spin"></i></ng-template> */}
              </button>
              {/*  (click)="_nextStep(false)") */}
              <button
                type="button"
                className="button-solid skip-phone-verification-button"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
        <div className="fc-red fs-15px">
          {/* <!-- if this.phoneForm.value.phone && this.phoneForm.invalid --> */}
          {/* *ngIf="wantToVerifyPhoneClicked && f.form.value.phone && f.form.controls.phone.invalid" */}
          <div className="mt-10px">Please enter a valid phone number</div>
          {/* *ngIf="sendPhoneNumberVerificationTextServerErrors.phoneNumberAlreadyInUse" */}
          <div className="mt-10px">
            This phone number is being used by another account. Please use a
            different phone number or sign into your other account.
          </div>
          {/* *ngIf="sendPhoneNumberVerificationTextServerErrors.maxSendAttemptsReached" */}
          <div className="mt-10px">
            You've requested too many verification codes. Please wait 10 minutes
            and try again.
          </div>
          {/* *ngIf="sendPhoneNumberVerificationTextServerErrors.voipNumberNotAllowed" */}
          <div className="mt-10px">
            This phone number is a VOIP number, which isn't allowed (to prevent
            spam). Please try again with a different phone number.
          </div>
          {/* *ngIf="sendPhoneNumberVerificationTextServerErrors.chineseNumberNotAllowed" */}
          <div className="mt-10px">
            Currently we can't send text messages to China. If you have a
            non-Chinese number, please try that. If not, click "skip" below. You
            can still use the site by buying DESO.
          </div>
        </div>
      </form>
      {/* *ngIf="
      stepNum === 4 &&
      this.globalVars.wantToVerifyPhone &&
      !this.globalVars.phoneVerified &&
      this.globalVars.isPhoneNumberVerificationTextServerErrorFree
    "
    #f="ngForm"
    [formGroup]="verificationCodeForm" */}
      <form className="form-group mt-5px">
        <div className="mobile-verification-input-button">
          <div id="digits">
            {/* (keyup)="onKey($event)"
          (keydown)="downKey($event)" */}
            <input
              type="text"
              name="digit1"
              id="digit1"
              className="digit"
              maxLength="1"
            />
            {/* (keyup)="onKey($event)"
          (keydown)="downKey($event)" */}
            <input
              type="text"
              name="digit2"
              id="digit2"
              className="digit"
              maxLength="1"
              style="pointer-events: none"
            />
            {/* (keyup)="onKey($event)"
          (keydown)="downKey($event)" */}
            <input
              type="text"
              name="digit3"
              id="digit3"
              className="digit"
              maxLength="1"
              style="pointer-events: none"
            />
            {/* (keyup)="onKey($event)"
          (keydown)="downKey($event)" */}
            <input
              type="text"
              name="digit4"
              id="digit4"
              className="digit"
              maxLength="1"
              style="pointer-events: none"
            />
          </div>
          <div className="d-flex flex-column flex-center">
            <div className="resend-verification-text-block">
              <p className="fs-12px resend-verification-text">
                Did not get it?
              </p>
              {/* (click)="resendVerificationCode($event)" */}
              <a
                href=""
                style="color: #7c7c7c"
                className="fs-12px resend-the-code-text"
              >
                Resend the code
              </a>
              {/* *ngIf="resentVerificationCode" */}
              <i className="far fa-check-circle fc-blue"></i>
            </div>
            {/* (click)="submitVerificationCode()"
          [ngClass]="{ 'disabled verify-phone-button': !this.verificationCodeCorrectLength }" */}
            <button
              id="verify-phone-button"
              className="black-rounded-button basic-button-size color-white fs-15px font-weight-bold signup-window-btn-mobile"
              type="button"
            >
              {/* *ngIf="!submittingPhoneNumberVerificationCode; else elseBlock" */}
              <label className="mb-0px pointer-events-none">Continue</label>
              {/* <ng-template #elseBlock><i class="fa fa-spinner fa-spin"></i></ng-template> */}
            </button>
          </div>
        </div>
        <div className="fc-red fs-15px">
          {/* *ngIf="submitPhoneNumberVerificationCodeServerErrors.invalidCode" */}
          <div className="mt-10px">
            The code you entered is invalid. Please try again.
          </div>
          {/* *ngIf="submitPhoneNumberVerificationCodeServerErrors.maxCheckAttemptsReached" */}
          <div className="mt-10px">
            You've checked too many codes and hit a rate limit. Please wait 10
            minutes and try again.
          </div>
        </div>
        <div className="fs-18px">
          {/* *ngIf="sendPhoneNumberVerificationTextServerErrors.maxSendAttemptsReached" */}
          <div className="mt-5px fc-red fs-15px">
            You've requested too many verification codes. Please wait 10 minutes
            and try again.
          </div>
        </div>
      </form>
      {/* *ngIf="false" */}
      <div className="fs-10px">
        By proceeding, you agree to receive text messages from bitclout.com
        (standard rates apply)
      </div>

      {/* <!-- verification complete desktop --> */}
      {/*  *ngIf="this.globalVars.phoneVerified && !this.globalVars.isMobile()" */}
      <div className="verification-complete-container">
        <img
          src="../../assets/img/verification-complete.png"
          className="verification-complete-image"
        />
        <label className="font-weight-semiboldn mb-0px mt-20px header-font-rezising text-align-center signup-window-header-mobile">
          Phone Number Verified!
        </label>
        <div className="w-100 d-flex flex-center">
          {/* (click)="completeVerificationButtonClicked()" */}
          <button
            className="black-rounded-button basic-button-size color-white fs-15px font-weight-bold signup-window-btn-mobile"
            id="complete-verfication-button"
          >
            Continue
          </button>
        </div>
      </div>

      {/* <!-- verification complete mobile --> */}
      {/* *ngIf="this.globalVars.phoneVerified && this.globalVars.isMobile()" */}
      <div className="verification-complete-container-mobile">
        <img
          src="../../assets/img/verification-complete.png"
          className="verification-complete-image"
        />
        <label className="font-weight-semiboldn mb-0px mt-20px header-font-rezising text-align-center signup-window-header-mobile">
          Phone Number Verified!
        </label>
        <div className="w-100 d-flex flex-center">
          {/* (click)="completeVerificationButtonClicked()" */}
          <button
            className="black-rounded-button basic-button-size color-white fs-15px font-weight-bold signup-window-btn-mobile"
            id="complete-verfication-button"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
export default MobileVerification;
