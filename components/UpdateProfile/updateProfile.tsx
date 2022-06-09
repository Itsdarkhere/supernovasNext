import styles from "../../styles/UpdateProfile/updateProfile.module.scss";

const UpdateProfile = () => {
  return (
    <>
      {/* <!-- Top Bar --> */}
      <div className="w-100 d-flex flex-column flex-center">
        {/* <!-- <div class="global__top-bar__height" *ngIf="!this.globalVars.loggedInUser?.CanCreateProfile"></div> --> */}
        {/* </>*ngIf="inTutorial" */}
        <div className="d-flex align-items-center justify-content-start w-100 p-3 fs-18px font-weight-bold border-bottom border-color-grey secalt-bg">
          {/* <top-bar-mobile-hamburger-menu class="mr-15px d-lg-none d-inline-block"></top-bar-mobile-hamburger-menu> */}
          <div>
            <h3 className="mb-1 fs-24px font-weight-semibold">
              Update Profile
            </h3>
            <h5 className="fs-15px fc-muted">Step 3 of 6</h5>
          </div>
        </div>

        {/* *ngIf="inTutorial" */}
        <div className="p-3" style="margin-bottom: -20px">
          <div className="d-flex flex-column justify-flex-start">
            <h5 className="fs-15px">
              Everyone needs a profile. Let's update yours!
            </h5>
          </div>
        </div>
        <div className="mt-20px"></div>
        {/* *ngIf="
        !globalVars.loggedInUser?.ProfileEntryResponse &&
        ((!globalVars.loggedInUser?.HasPhoneNumber && !globalVars.loggedInUser?.JumioVerified) ||
          !globalVars.isCompProfileCreation) &&
        globalVars.createProfileFeeNanos > 0 &&
        this.globalVars.loggedInUser?.CanCreateProfile
      " */}
        {/*  [ngClass]="globalVars.isMobile() ? 'w-100 mt-25px' : 'feed-cover'" */}
        <div className="d-flex flex-center">
          <div className="p-15px fs-14px font-weight-semiboldn d-flex flex-center up-cost-warning h-100 w-100">
            <img
              src="../assets/icons/info-icon.svg"
              className="mr-10px"
              alt="info icon"
            />
            Creating a profile costs {globalVars.createProfileFeeInDeSo()} DeSo
            ≈{globalVars.createProfileFeeInUsd()} USD. This helps prevent spam.
          </div>
        </div>
        {/* *ngIf="this.globalVars.loggedInUser?.CanCreateProfile; else elseBlock" */}
        {/* [ngClass]="globalVars.isMobile() ? 'w-100' : 'feed-cover'" */}
        <div className="update-profile-container">
          {/* <!-- Create Profile Fee Warning --> */}
          <div className="d-flex flex-column">
            <div style="flex-grow: 1">
              {/* <simple-center-loader *ngIf="!globalVars.loggedInUser"></simple-center-loader> */}
              {/* <!-- Form Inputs --> */}
              {/* *ngIf="globalVars.loggedInUser" */}
              <div className="fs-18px disable-scrollbars">
                {/* *ngIf="!this.globalVars.isMobile()" */}
                <div>
                  <h2 className="font-weight-semiboldn px-15px fs-24px mt-20px mb-20px ml-10px">
                    Settings
                  </h2>
                </div>
                {/* *ngIf="this.globalVars.isMobile()" */}
                <div>
                  <h2 className="font-weight-semiboldn px-15px fs-24px mb-20px ml-10px settings-text-mobile">
                    Settings
                  </h2>
                </div>
                <div className="position-relative px-15px">
                  {/* <!-- BANNER IMAGE--> */}
                  <div
                    className="mt-10px banner-image-container"
                    style="position: relative"
                  >
                    {/* (change)="_uploadBannerImage($event.target.files)" */}
                    <input
                      className="file-upload-button"
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      id="file"
                      style="position: absolute; opacity: 0; cursor: pointer; width: 100%; height: 100%; padding: 0"
                    />
                    <button type="file" className="banner-image-button">
                      {/* *ngIf="!uploadingBannerImage; else bannerElse" */}
                      <div className="banner-image-text">
                        <div className="d-flex flex-row flex-center font-weight-bold color-white">
                          <img
                            src="/assets/icons/upload_grey.svg"
                            alt="upload-icon"
                            className="mr-10px"
                          />
                          Click to upload a banner image
                        </div>
                        <p className="color-white mt-10px">
                          Recommended size is 1250 x 325 pixels.
                        </p>
                      </div>
                      {/* <ng-template #bannerElse> */}
                      <div className="banner-else">Uploading...</div>
                      {/* </ng-template> */}

                      <img
                        id="banner-image"
                        src="./assets/img/default-banner.png"
                        className="banner-image"
                      />
                    </button>
                  </div>
                  {/* <!-- PROFILE PIC--> */}
                  {/* (mouseenter)="toggleProfilePicturePrompt()"
                (mouseleave)="toggleProfilePicturePrompt()" */}
                  <div className="update-profile-avatar-image">
                    {/* (change)="_handleFileInput($event.target.files)" */}
                    <input
                      className="file-upload-button"
                      type="file"
                      accept="image/png, image/jpeg"
                      id="file"
                      style="
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    opacity: 0;
                    cursor: pointer;
                    width: 100%;
                    height: 100%;
                    padding: 0;
                  "
                    />
                    {/* <!--*ngIf="profilePicInput != null && profilePicInput.length > 0"--> */}
                    <button type="file" className="profile-image-update-button">
                      {/* [style.background-image]="'url(' + profilePicInput + ')'" */}
                      <div></div>
                      <div>
                        {/* [ngClass]="profilePicturePromtOpen ? 'darken' : ''"
                      [style.background-image]="'url(' + profilePicInput + ')'" */}
                        <div className="update-profile__image"></div>
                      </div>
                    </button>
                    {/* [ngClass]="profilePicturePromtOpen ? 'visible' : 'hidden'" */}
                    <div className="update-profile-pp-prompt font-weight-bold fs-12px d-flex flex-center">
                      Click to update profile picture
                    </div>
                  </div>
                </div>
                <label className="px-15px mt-10px mb-5px fs-18px font-weight-semiboldn">
                  Username
                </label>
                <p className="px-15px fs-13px" style="color: #9e9e9e">
                  Username must only use letters, numbers, or underscores
                </p>
                <div className="px-15px mt-10px">
                  {/* [(ngModel)]="usernameInput" */}
                  <input
                    className="update-profile-input update-profile-input-oneliner-height fs-15px lh-18px p-10px"
                    placeholder="Enter username"
                  />
                </div>
                <label className="px-15px mt-30px mb-5px fs-18px font-weight-semiboldn">
                  Display name
                </label>
                <p className="px-15px fs-13px" style="color: #9e9e9e">
                  This name will show your profile.
                </p>
                <div className="mt-10px px-15px">
                  {/* [(ngModel)]="this.name" */}
                  <input
                    maxLength="30"
                    placeholder="Your full name or artist name."
                    value="{{ this.profileData?.Name ? this.profileData?.Name : '' }}"
                    className="update-profile-input update-profile-input-oneliner-height fs-15px lh-18px p-10px"
                  />
                </div>

                <label className="px-15px mt-30px mb-5px fs-18px font-weight-semiboldn">
                  Bio
                </label>
                <p className="px-15px fs-13px" style="color: #9e9e9e">
                  Max 512 characters.
                </p>

                <div className="px-15px mt-10px">
                  {/* [(ngModel)]="descriptionInput" */}
                  {/* #textarea
                #autosize="cdkTextareaAutosize" */}
                  <textarea
                    className="update-profile-input w-100 resize-none fs-15px p-10px"
                    rows="4"
                    maxLength="512"
                    cdkTextareaAutosize
                  ></textarea>
                  {/* *ngIf="profileUpdateErrors.descriptionError"
                [ngClass]="{ 'fc-red': profileUpdateErrors.descriptionError }" */}
                  <div className="fs-13px font-italic">
                    Description can only be 512 characters
                  </div>
                </div>
                {/* *ngIf="!inTutorial" */}
                <div className="px-15px">
                  <div className="mt-30px mb-5px fs-18px font-weight-semiboldn">
                    Founder Reward
                  </div>
                  <p className="fs-13px" style="color: #9e9e9e">
                    The reward you will receive every time someone buys your
                    Creator Coin.
                  </p>
                  <div className="mt-10px">
                    <div className="d-flex w-m-180px flex-row mint-page-royalty-element position-relative">
                      {/* [(ngModel)]="founderRewardInput" */}
                      {/* [disabled]="globalVars.loggedInUser.UsersWhoHODLYouCount === 0" */}
                      <input
                        min="0"
                        max="100"
                        type="number"
                        className="update-profile-reward-input w-50 update-profile-input-oneliner-height text-align-center font-weight-bold"
                      />
                      {/* [matTooltip]="founderRewardTooltip()"
                    #tooltip="matTooltip" (click)="tooltip.toggle()" */}
                      <label
                        className="update-profile-reward-label w-50 update-profile-input-oneliner-height mb-0px flex-center font-weight-bold"
                        matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
                      >
                        %
                      </label>
                    </div>
                    {/* *ngIf="this.globalVars.loggedInUser.UsersWhoHODLYouCount === 0" */}
                    <div className="fc-muted font-italic fs-13px pt-5px">
                      * You must purchase your own coin before lowering your
                      founder reward.
                    </div>
                    {/* *ngIf="profileUpdateErrors.founderRewardError"
                  [ngClass]="{ 'fc-red': profileUpdateErrors.founderRewardError }" */}
                    <div className="fs-13px font-italic pt-5px">
                      Please set a founder reward between 0-100.
                    </div>
                  </div>
                </div>
                {/* [ngClass]="contactsOpen ? 'background-color-secondary' : ''"
              (click)="contactsOpen = !contactsOpen" */}
                <button className="px-15px update-profile-dropdown update-profile-border-top mt-20px d-flex flex-row justify-content-between">
                  <div className="d-flex h-100 flex-start-center flex-column">
                    <label className="font-weight-semiboldn color-text mb-5px fs-18px">
                      Contact details
                    </label>
                    <p style="color: #9e9e9e" className="fs-13px">
                      Email
                    </p>
                  </div>
                  <div className="h-100 d-flex flex-center">
                    {/* [ngClass]="contactsOpen ? 'open' : ''"
                  src="/assets/icons/chevron-down.svg" */}
                    <img className="update-profile-dropdown-icon up-rotate-icon" />
                  </div>
                </button>
                {/* [ngClass]="{ expanded: contactsOpen }" */}
                <div className="px-15px contactsAccordion d-flex flex-column flex-start-center disable-scrollbars">
                  <label className="mt-10px mb-0px fs-18px font-weight-semiboldn">
                    Email
                  </label>
                  <p style="color: #9e9e9e" className="fs-13px">
                    Your email address. No spam, ever.
                  </p>
                  <div className="form-group mt-10px w-100">
                    {/* [(ngModel)]="emailAddress"
                  (ngModelChange)="_validateEmail($event)" */}
                    <input
                      type="email"
                      className="update-profile-input update-profile-input-oneliner-height fs-15px"
                      placeholder="Enter an email address."
                    />
                    {/* *ngIf="invalidEmailEntered" */}
                    <div className="fc-red fs-15px">
                      Please enter a valid email address.
                    </div>
                  </div>
                </div>
                {/* [ngClass]="socialsOpen ? 'background-color-secondary' : ''"
              (click)="socialsOpen = !socialsOpen" */}
                <button className="px-15px update-profile-dropdown update-profile-border-top d-flex flex-row justify-content-between">
                  <div className="d-flex h-100 flex-start-center flex-column">
                    <label className="font-weight-semiboldn color-text mb-5px fs-18px">
                      Social links
                    </label>
                    <p style="color: #9e9e9e" className="fs-13px">
                      Add links to your social profiles.
                    </p>
                  </div>
                  <div className="h-100 d-flex flex-center">
                    {/* [ngClass]="socialsOpen ? 'open' : ''"
                  src="/assets/icons/chevron-down.svg" */}
                    <img className="update-profile-dropdown-icon up-rotate-icon" />
                  </div>
                </button>
                {/* [ngClass]="socialsOpen ? 'expanded' : ''" */}
                <div className="px-15px socialsAccordion disable-scrollbars">
                  <div className="social-input">
                    <label className="social-label">
                      <img
                        src="assets/icons/profile-twitter-icon.svg"
                        className="pr-5px"
                      />
                      twitter.com/
                    </label>
                    {/* [(ngModel)]="this.twitter" */}
                    <input
                      maxLength="30"
                      className="social-input-inner"
                      type="text"
                      placeholder="Your Twitter username without the '@'' sign"
                      value="{{ this.profileData?.Twitter ? this.profileData?.Twitter : '' }}"
                    />
                  </div>
                  <div className="social-input">
                    <label className="social-label">
                      <img
                        src="assets/icons/profile-instagram-icon.svg"
                        className="pr-5px"
                      />
                      instagram.com/
                    </label>
                    {/* [(ngModel)]="this.instagram" */}
                    <input
                      maxLength="30"
                      className="social-input-inner"
                      type="text"
                      placeholder="Your instagram username without the '@'' sign"
                      value="{{ this.profileData?.Instagram ? this.profileData?.Instagram : '' }}"
                    />
                  </div>
                  <div className="social-input">
                    <label className="social-label">
                      <img
                        src="assets/icons/profile-discord-icon.svg"
                        className="pr-5px"
                      />
                      discord.gg/
                    </label>
                    {/* [(ngModel)]="this.discord" */}
                    <input
                      maxLength="30"
                      className="social-input-inner"
                      type="text"
                      placeholder="The ID in your Discord server invite link"
                      value="{{ this.profileData?.Discord ? this.profileData?.Discord : '' }}"
                    />
                  </div>
                  <div className="social-input">
                    <label className="social-label">
                      <img
                        src="assets/icons/profile-world-icon.svg"
                        className="pr-5px minus-margin"
                      />
                      Website
                    </label>
                    {/* [(ngModel)]="this.website" */}
                    <input
                      maxLength="30"
                      className="social-input-inner"
                      type="text"
                      placeholder="Your website URL"
                      value="{{ this.profileData?.Website ? this.profileData.Website : '' }}"
                    />
                  </div>
                </div>
                {/* [ngClass]="verificationOpen ? 'background-color-secondary' : ''"
              (click)="verificationOpen = !verificationOpen" 
              *ngIf="!globalVars.loggedInUser.JumioFinishedTime"*/}
                <button className="px-15px update-profile-dropdown update-profile-border-top d-flex flex-row justify-content-between">
                  <div className="d-flex h-100 flex-start-center flex-column">
                    <label className="font-weight-semiboldn color-text mb-5px fs-18px">
                      Verification
                    </label>
                    <p
                      style="color: #9e9e9e"
                      className="fs-13px text-align-start"
                    >
                      Verify your identity with Jumio and you will receive 0.1
                      $DESO for free.
                    </p>
                  </div>
                  <div className="h-100 d-flex flex-center">
                    {/* [ngClass]="verificationOpen ? 'open' : ''"
                  src="/assets/icons/chevron-down.svg" */}
                    <img className="update-profile-dropdown-icon up-rotate-icon" />
                  </div>
                </button>
                {/* [ngClass]="verificationOpen ? 'expanded' : ''" */}
                <div className="verifiedAccordion disable-scrollbars update-profile-border-bottom px-15px d-flex flex-column flex-start-center">
                  <label
                    style="color: #222222"
                    className="max-width-update-profile mt-10px font-weight-semibold mb-5px fs-16px"
                  >
                    By verifying your identity with our partner Jumio, you will
                    receive 0.1 $DESO reward.
                  </label>
                  <br />
                  <label
                    style="color: #222222"
                    className="max-width-update-profile font-weight-semibold mb-5px fs-16px"
                  >
                    Supernovas will never see any of your personal details.
                  </label>
                  {/* (click)="globalVars.launchGetFreeDESOFlow()" */}
                  <button className="white-rounded-button fs-14px up-jumio-button mt-20px d-flex flex-center pl-10px pr-10px pt-5px pb-5px font-weight-bold">
                    <img
                      className="mr-5px color-text fs-13px"
                      src="../assets/icons/lock.svg"
                    />
                    Verify your ID with Jumio
                  </button>
                </div>
                <div className="mt-5px">
                  <div className="mt-10px" style="position: relative">
                    <div>
                      <div className="w-100 my-30px d-flex flex-column flex-center">
                        {/* (click)="_updateProfile()"
                      [ngClass]="{ 'btn-loading': updateProfileBeingCalled }" */}
                        <a className="black-rounded-button d-flex flex-center update-profile-button font-weight-bold fs-15px mt-5px">
                          {inTutorial ? "Next" : "Update Profile"}
                        </a>
                        {/* *ngIf="profileUpdated" */}
                        <i className="mt-10px far fa-check-circle fa-lg fc-blue ml-10px"></i>
                        {/* *ngIf="profilePicInput == null || profilePicInput.length == 0"
                      [ngClass]="{ 'fc-red': profileUpdateErrors.profilePicError }" */}
                        <div className="fs-13px text-grey5 mt-10px">
                          Add a profile picture
                        </div>
                        {/* *ngIf="profileUpdateErrors.usernameError"
                      [ngClass]="{ 'fc-red': profileUpdateErrors.usernameError }" */}
                        <div className="fs-13px mt-10px font-italic mt-5px">
                          Please set a username
                        </div>
                        {/* *ngIf="
                        inTutorial &&
                        (!globalVars.loggedInUser?.MustCompleteTutorial || globalVars.loggedInUser?.IsAdmin)
                      "
                      (click)="globalVars.skipTutorial()" */}
                        <div className="px-15px">
                          <a className="btn btn-outline-primary btn-lg fs-15px text-left mt-5px">
                            Exit
                          </a>
                        </div>
                      </div>

                      {/* <!-- SPACER FOR BOTTOM BAR ON MOBILE --> */}
                      <div className="global__bottom-bar-mobile-height"></div>
                      <div className="global__bottom-bar-mobile-height"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*}   <ng-template #elseBlock>
       *ngIf="!this.globalVars.isMobile()*/}
      <div className="px-15px mt-30px">
        <update-profile-get-starter-deso></update-profile-get-starter-deso>
      </div>
      {/* *ngIf="this.globalVars.isMobile()" */}
      <div className="px-15px update-profile-get-starter-deso-container">
        <update-profile-get-starter-deso></update-profile-get-starter-deso>
      </div>
      {/*}   </ng-template> */}
    </>
  );
};

export default UpdateProfile;
