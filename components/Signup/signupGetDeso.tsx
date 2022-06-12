import styles from "../../styles/Signup/signupGetDeso.module.scss";

const SignupGetDeso = () => {
  // *ngIf="screenToShow == SignUpGetStarterDeSoComponent.CREATE_PHONE_NUMBER_VERIFICATION_SCREEN"
  return (
    <>
      <div>
        {displayForSignupFlow ? (
          <div>
            <div className="mt-15px fs-15px fc-muted">STEP 3 of 4</div>
            <div className="mt-15px fs-24px font-weight-bold">
              Get Starter DeSo
            </div>

            <div className="fs-18px mt-15px mb-15px">
              DeSo is a cryptocurrency that's required to use the site.
            </div>
          </div>
        ) : null}

        <div className="fs-18px">
          Verify your phone number for free DeSo. Your phone number will never
          be shared with anyone.
        </div>
        {/* #f="ngForm" [formGroup]="phoneForm" */}
        <form className="form-group mt-15px">
          {/* <ngx-intl-tel-input
            style="font-size: 15px !important"
            cssClass="'form-control sign-up__phone-input'"
            separateDialCode="true"
            enableAutoCountrySelect="true"
            enablePlaceholder="true"
            searchCountryFlag="true"
            selectFirstCountry="false"
            selectedCountryISO="CountryISO.UnitedStates"
            maxLength="15"
            phoneValidation="true"
            ngModelChange="onPhoneNumberInputChanged()"
            name="phone"
            formControlName="phone"
          ></ngx-intl-tel-input> */}

          <div className="fc-red fs-15px">
            {/* <!-- TODO: kinda obnoxious how this displays an error as soon as I start typing--> */}
            {/* *ngIf="f.form.value.phone && f.form.controls.phone.invalid" */}
            <div className="mt-10px">Please enter a valid phone number</div>
            {/* *ngIf="sendPhoneNumberVerificationTextServerErrors.phoneNumberAlreadyInUse" */}
            <div className="mt-10px">
              This phone number is being used by another account. Please use a
              different phone number or sign into your other account.
            </div>
            {/* *ngIf="sendPhoneNumberVerificationTextServerErrors.maxSendAttemptsReached" */}
            <div className="mt-10px">
              You've requested too many verification codes. Please wait 10
              minutes and try again.
            </div>
            {/* *ngIf="sendPhoneNumberVerificationTextServerErrors.voipNumberNotAllowed" */}
            <div className="mt-10px">
              This phone number is a VOIP number, which isn't allowed (to
              prevent spam). Please try again with a different phone number.
            </div>
            {/* *ngIf="sendPhoneNumberVerificationTextServerErrors.chineseNumberNotAllowed" */}
            <div className="mt-10px">
              Currently we can't send text messages to China. If you have a
              non-Chinese number, please try that. If not, click "skip" below.
              You can still use the site by buying DeSo.
            </div>
          </div>
        </form>

        <div className="fs-10px">
          By proceeding, you agree to receive text messages from bitclout.com
          (standard rates apply)
        </div>

        <div className="d-flex mt-15px justify-content-end">
          {displayForSignupFlow ? (
            <div onClick={() => onSkipButtonClicked()}>
              <a className="btn btn-outline-primary font-weight-bold fs-15px">
                Skip
              </a>
              <a
                onClick={() => sendVerificationText()}
                className={[
                  "btn btn-primary font-weight-bold fs-15px ml-10px",
                  sendingPhoneNumberVerificationText ? "btn-loading" : "",
                  !phoneForm.valid ? "disabled" : "",
                ].join(" ")}
              >
                Next
              </a>
            </div>
          ) : null}
        </div>
      </div>
      {screenToShow ==
      SignUpGetStarterDeSoComponent.SUBMIT_PHONE_NUMBER_VERIFICATION_SCREEN ? (
        <div>
          {displayForSignupFlow ? (
            <div>
              <div className="mt-15px fs-15px fc-muted">STEP 3 of 4</div>
              <div className="mt-15px mb-15px fs-24px font-weight-bold">
                Verify your phone number
              </div>
            </div>
          ) : null}

          <div className="fs-18px">
            Enter the 6 digit code sent to
            {phoneNumber}
            <div className="mt-5px">
              <a onClick={(e) => resendVerificationCode(e)}>Resend</a>
              {resentVerificationCode ? (
                <i className="far fa-check-circle fc-blue"></i>
              ) : null}
            </div>
            {/* *ngIf="sendPhoneNumberVerificationTextServerErrors.maxSendAttemptsReached" */}
            <div className="mt-5px fc-red fs-15px">
              You've requested too many verification codes. Please wait 10
              minutes and try again.
            </div>
          </div>
          {/* #f="ngForm" [formGroup]="verificationCodeForm" */}
          <form className="form-group pt-10px">
            {/* (ngModelChange)="onVerificationCodeInputChanged()" */}
            <input
              className="form-control"
              name="verificationCode"
              formControlName="verificationCode"
            />

            <div className="fc-red fs-15px">
              {/* *ngIf="submitPhoneNumberVerificationCodeServerErrors.invalidCode" */}
              <div className="mt-10px">
                The code you entered is invalid. Please try again.
              </div>
              {/* *ngIf="submitPhoneNumberVerificationCodeServerErrors.maxCheckAttemptsReached" */}
              <div className="mt-10px">
                You've checked too many codes and hit a rate limit. Please wait
                10 minutes and try again.
              </div>
            </div>
          </form>

          <div className="d-flex mt-15px justify-content-between">
            <div>
              {/* *ngIf="displayForSignupFlow"
      (click)="backButtonClickedOnSubmitVerificationScreen()" */}
              <a className="btn btn-outline-primary font-weight-bold fs-15px">
                Back
              </a>
            </div>
            <div>
              {/* *ngIf="displayForSignupFlow"
      (click)="onSkipButtonClicked()" */}
              <a className="btn btn-outline-primary font-weight-bold fs-15px">
                Skip
              </a>
              {/* (click)="submitVerificationCode()"
      [ngClass]="{ disabled: !verificationCodeForm.valid, 'btn-loading': submittingPhoneNumberVerificationCode }" */}
              <a className="btn btn-primary font-weight-bold fs-15px ml-10px">
                Verify
              </a>
            </div>
          </div>
        </div>
      ) : null}

      {/* *ngIf="screenToShow == SignUpGetStarterDeSoComponent.COMPLETED_PHONE_NUMBER_VERIFICATION_SCREEN" */}
      <div>
        {/* *ngIf="displayForSignupFlow" */}
        <div>
          <div className="mt-15px fs-15px fc-muted">STEP 3 of 4</div>
          <div className="mt-15px mb-15px fs-24px font-weight-bold">
            Get Starter DeSo
          </div>
        </div>

        <div className="fs-15px mb-15px">
          Your phone number was verified. We sent you a small amount of DeSo,
          which is enough to post and follow people.
        </div>
        {/* *ngIf="displayForSignupFlow; else elseBlock" */}
        <div className="d-flex mt-15px justify-content-between">
          {/* (click)="backToPreviousSignupStepOnClick()" */}
          <a className="btn btn-outline-primary font-weight-bold fs-15px">
            Back
          </a>
          {/* (click)="onSkipButtonClicked()" */}
          <a className="btn btn-primary font-weight-bold fs-15px">Next</a>
        </div>
        {/* <ng-template #elseBlock> */}
        {/* [routerLink]="'/' + this.globalVars.RouteNames.BUY_DESO"
      [queryParams]="{ stepNum: null }" */}
        <a
          queryParamsHandling="merge"
          className="btn btn-primary font-weight-bold fs-15px mt-5px mb-5px mr-15px"
        >
          Buy DeSo
        </a>
        {/* [routerLink]="'/' + this.globalVars.RouteNames.UPDATE_PROFILE"
      [queryParams]="{ stepNum: null }" */}
        <a
          queryParamsHandling="merge"
          className="btn btn-outline-primary font-weight-bold fs-15px mt-5px mr-15px mb-5px"
        >
          Update your profile
        </a>
        {/* [routerLink]="'/' + this.globalVars.RouteNames.BROWSE"
      [queryParams]="{ stepNum: null }" */}
        <a
          queryParamsHandling="merge"
          className="btn btn-outline-primary font-weight-bold fs-15px mt-5px mr-15px mb-5px"
        >
          Browse
        </a>
        {/* </ng-template> */}
      </div>
    </>
  );
};
export default SignupGetDeso;
