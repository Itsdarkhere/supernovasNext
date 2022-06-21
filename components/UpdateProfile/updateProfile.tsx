import styles from "../../styles/UpdateProfile/updateProfile.module.scss";
import UpdateProfileGetDeso from "./updateProfileGetDeso";
import infoIcon from "../../public/icons/info-icon.svg";
import uploadIcon from "../../public/icons/upload_grey.svg";
import defaultBanner from "../../public/img/default-banner.png";
import chevronDown from "../../public/icons/chevron-down.svg";
import twitterIcon from "../../public/icons/profile-twitter-icon.svg";
import instagramIcon from "../../public/icons/profile-instagram-icon.svg";
import discordIcon from "../../public/icons/profile-discord-icon.svg";
import worldIcon from "../../public/icons/profile-world-icon.svg";
import lockIcon from "../../public/icons/lock.svg";
import Image from "next/image";
import {
  createProfileFeeInDeSo,
  createProfileFeeInUsd,
  getTargetComponentSelector,
  isMobile,
  launchGetFreeDESOFlow,
  _alertError,
} from "../../utils/global-context";
import { SwalHelper } from "../../utils/helpers/swal-helper";
import {
  InsertOrUpdateProfileDetails,
  parseProfileError,
  RouteNames,
  UpdateProfile,
  UpdateUserGlobalMetadata,
} from "../../utils/backendapi-context";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../utils/Redux/hooks";
import { setProfileUpdateTimestamp } from "../../utils/Redux/Slices/loggedInSlice";
import { peoplesetemail } from "../../utils/mixpanel";
// Firebase

export type ProfileUpdates = {
  usernameUpdate: string;
  descriptionUpdate: string;
  profilePicUpdate: string;
};

export type ProfileUpdateErrors = {
  usernameError: boolean;
  descriptionError: boolean;
  profilePicError: boolean;
  founderRewardError: boolean;
};

const UpdateProfileC = () => {
  const router = useRouter();
  const [usernameInput, setUsernameInput] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [discord, setDiscord] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");
  const [profilePicInput, setProfilePicInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [founderRewardInput, setFounderRewardInput] = useState<number>(100);
  const [profileData, setProfileData] = useState<any>(null);
  const [updatingSettings, setUpdatingSettings] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [invalidEmailEntered, setInvalidEmailEntered] = useState(false);
  const [successMessageTimeout, setSuccessMessageTimeout] = useState<any>(null);
  const [updateProfileBeingCalled, setUpdateProfileBeingCalled] =
    useState(false);
  const [profileUpdateErrors, setProfileUpdateErrors] =
    useState<ProfileUpdateErrors>({
      usernameError: false,
      descriptionError: false,
      profilePicError: false,
      founderRewardError: false,
    });

  // Redux
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  const localNode = useAppSelector((state) => state.node.localNode);
  const updateEverything = useAppSelector(
    (state) => state.other.updateEverything
  );

  // Functions
  const _updateProfile = () => {
    // Trim the username input in case the user added a space at the end. Some mobile
    // browsers may do this.
    setUsernameInput(usernameInput.trim());

    // update socials
    updateSocials();

    // update Email
    if (!invalidEmailEntered && emailAddress != "") {
      _updateEmail();
    }

    const hasErrors = _setProfileErrors();
    if (hasErrors) {
      return;
    }

    setUpdateProfileBeingCalled(true);
    _setProfileUpdates();
    _callBackendUpdateProfile().subscribe(
      (res) => {
        dispatch(setProfileUpdateTimestamp(Date.now()));

        // This updates things like the username that shows up in the dropdown.
        updateEverything(
          res.TxnHashHex,
          _updateProfileSuccess,
          _updateProfileFailure,
          this
        );

        openGeneralSuccessModal();
      },
      (err) => {
        const parsedError = parseProfileError(err);
        const lowBalance = parsedError.indexOf("insufficient");
        setUpdateProfileBeingCalled(false);
        SwalHelper.fire({
          target: getTargetComponentSelector(),
          icon: "error",
          title: `An Error Occurred`,
          html: parsedError,
          showConfirmButton: true,
          focusConfirm: true,
          customClass: {
            confirmButton: "btn btn-light",
            cancelButton: "btn btn-light no",
          },
          confirmButtonText: lowBalance ? "Buy $DESO" : null,
          cancelButtonText: lowBalance ? "Later" : null,
          showCancelButton: !!lowBalance,
        }).then((res) => {
          if (lowBalance && res.isConfirmed) {
            router.push(RouteNames.BUY_DESO);
          }
        });
      }
    );
  };

  const _updateProfileSuccess = (comp: UpdateProfileC) => {
    // comp.globalVars.celebrate();
    comp.updateProfileBeingCalled = false;
    comp.profileUpdated = true;
    if (comp.inTutorial) {
      comp.router.navigate(
        [RouteNames.TUTORIAL, RouteNames.INVEST, RouteNames.BUY_CREATOR],
        {
          queryParamsHandling: "merge",
        }
      );
      return;
    }

    if (comp.globalVars.loggedInUser.UsersWhoHODLYouCount === 0) {
      //   old logic where swal helper was firing had to move this.openGeneralSuccessModal(); because it was firing twice here

      return;
    }
  };

  const _setProfileUpdates = () => {
    const profileEntryResponse = loggedInUser.ProfileEntryResponse;
    profileUpdates.usernameUpdate =
      profileEntryResponse?.Username !== usernameInput ? usernameInput : "";
    profileUpdates.descriptionUpdate =
      profileEntryResponse?.Description !== descriptionInput
        ? descriptionInput
        : "";
    profileUpdates.profilePicUpdate =
      profileEntryResponse?.ProfilePic !== profilePicInput
        ? profilePicInput
        : "";
  };

  const updateSocials = () => {
    if (profileData) {
      return InsertOrUpdateProfileDetails(
        localNode,
        loggedInUser.PublicKeyBase58Check,
        typeof twitter === "undefined" ? profileData.Twitter : twitter,
        typeof website === "undefined" ? profileData.Website : website,
        typeof discord === "undefined" ? profileData.Discord : discord,
        typeof instagram === "undefined" ? profileData.Instagram : instagram,
        typeof name === "undefined" ? profileData.Name : name
      ).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  };

  const _callBackendUpdateProfile = () => {
    console.log("UPDATE PROFILE");
    return UpdateProfile(
      localNode,
      loggedInUser.PublicKeyBase58Check /*UpdaterPublicKeyBase58Check*/,
      "" /*ProfilePublicKeyBase58Check*/,
      // Start params
      profileUpdates.usernameUpdate /*NewUsername*/,
      profileUpdates.descriptionUpdate /*NewDescription*/,
      profileUpdates.profilePicUpdate /*NewProfilePic*/,
      founderRewardInput * 100 /*NewCreatorBasisPoints*/,
      1.25 * 100 * 100 /*NewStakeMultipleBasisPoints*/,
      false /*IsHidden*/,
      // End params
      feeRateDeSoPerKB * 1e9 /*MinFeeRateNanosPerKB*/
    );
  };

  const openGeneralSuccessModal = () => {
    console.log(
      ` ------------------------- general success modal function hit -------------- `
    );

    // modalService.show(GeneralSuccessModalComponent, {
    //   class: "modal-dialog-centered nft_placebid_modal_bx  modal-lg",
    //   initialState: {
    //     header: "You're all set!",
    //     text: "Your profile has been updated.",
    //     buttonText: "Go to my profile",
    //     buttonClickedAction: "profileRoute",
    //   },
    // });
  };

  const _updateEmail = () => {
    if (showSuccessMessage) {
      setShowSuccessMessage(false);
      clearTimeout(successMessageTimeout);
    }

    setUpdatingSettings(true);
    UpdateUserGlobalMetadata(
      localNode,
      loggedInUser.PublicKeyBase58Check /*UpdaterPublicKeyBase58Check*/,
      emailAddress /*EmailAddress*/,
      null /*MessageReadStateUpdatesByContact*/
    )
      .subscribe(
        (res) => {},
        (err) => {
          _alertError("Error updating email...", err);
        }
      )
      .add(() => {
        setShowSuccessMessage(true);
        setUpdatingSettings(false);
        let tempSuccessMessageTimeout = setTimeout(() => {
          setShowSuccessMessage(false);
        }, 500);
        setSuccessMessageTimeout(tempSuccessMessageTimeout);
      });
    peoplesetemail({
      $email: emailAddress,
    });
  };

  const _uploadBannerImage = (files: FileList) => {
    let fileToUpload = files.item(0);
    if (!fileToUpload.type || !fileToUpload.type.startsWith("image/")) {
      _alertError("File selected does not have an image file type.");
      return;
    }
    if (fileToUpload.size > 5 * 1024 * 1024) {
      _alertError("Please upload an image that is smaller than 5MB.");
      return;
    }
    uploadingBannerImage = true;
    // Make banner image the default image
    document
      .getElementById("banner-image")
      .setAttribute("src", "./assets/img/default-banner.png");

    //this.photoLocation = (Math.random() + 1).toString(36).substring(7);

    // Here store the image itself
    ref = afStorage.ref(loggedInUser?.PublicKeyBase58Check);
    task = ref.put(fileToUpload);

    // This is for cache busting, but idk if it even works
    setTimeout(() => {
      loadBannerImage();
      uploadingBannerImage = false;
    }, 2500);
  };

  const _setProfileErrors = (): boolean => {
    let hasErrors = false;
    if (usernameInput.length == 0) {
      profileUpdateErrors.usernameError = true;
      hasErrors = true;
    } else {
      profileUpdateErrors.usernameError = false;
    }

    if (descriptionInput.length > 512) {
      profileUpdateErrors.descriptionError = true;
      hasErrors = true;
    } else {
      profileUpdateErrors.descriptionError = false;
    }

    if (
      profilePicInput == null ||
      profilePicInput.length == 0 ||
      profilePicInput.length > 5 * 1024 * 1024 //
    ) {
      profileUpdateErrors.profilePicError = true;
      hasErrors = true;
    } else {
      profileUpdateErrors.profilePicError = false;
    }

    if (
      typeof founderRewardInput != "number" ||
      founderRewardInput < 0 ||
      founderRewardInput > 100
    ) {
      profileUpdateErrors.founderRewardError = true;
      hasErrors = true;
    } else {
      profileUpdateErrors.founderRewardError = false;
    }

    return hasErrors;
  };
  return (
    <>
      <div className="w-100 d-flex flex-column flex-center">
        <div className="mt-20px"></div>
        {!loggedInUser?.ProfileEntryResponse &&
        ((!loggedInUser?.HasPhoneNumber && !loggedInUser?.JumioVerified) ||
          !isCompProfileCreation) &&
        createProfileFeeNanos > 0 &&
        loggedInUser?.CanCreateProfile ? (
          <div
            className={[
              "d-flex flex-center",
              isMobile() ? "w-100 mt-25px" : "feed-cover",
            ].join(" ")}
          >
            <div className="p-15px fs-14px font-weight-semiboldn d-flex flex-center up-cost-warning h-100 w-100">
              <Image src={infoIcon} className="mr-10px" alt="info icon" />
              Creating a profile costs {createProfileFeeInDeSo()} DeSo ≈
              {createProfileFeeInUsd()} USD. This helps prevent spam.
            </div>
          </div>
        ) : null}

        {loggedInUser?.CanCreateProfile ? (
          <div
            className={[
              "update-profile-container",
              isMobile() ? "w-100" : "feed-cover",
            ].join(" ")}
          >
            {/* <!-- Create Profile Fee Warning --> */}
            <div className="d-flex flex-column">
              <div style={{ flexGrow: "1" }}>
                {/* <simple-center-loader *ngIf="!globalVars.loggedInUser"></simple-center-loader> */}
                {/* <!-- Form Inputs --> */}
                {/* *ngIf="globalVars.loggedInUser" */}
                <div className="fs-18px disable-scrollbars">
                  {!isMobile() ? (
                    <div>
                      <h2 className="font-weight-semiboldn px-15px fs-24px mt-20px mb-20px ml-10px">
                        Settings
                      </h2>
                    </div>
                  ) : (
                    <div>
                      <h2 className="font-weight-semiboldn px-15px fs-24px mb-20px ml-10px settings-text-mobile">
                        Settings
                      </h2>
                    </div>
                  )}

                  <div className="position-relative px-15px">
                    {/* <!-- BANNER IMAGE--> */}
                    <div
                      className="mt-10px banner-image-container"
                      style={{ position: "relative" }}
                    >
                      <input
                        onChange={(e) => _uploadBannerImage(e.target.files)}
                        className="file-upload-button"
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        id="file"
                        style={{
                          position: "absolute",
                          opacity: 0,
                          cursor: "pointer",
                          width: "100%",
                          height: "100%",
                          padding: 0,
                        }}
                      />
                      <button type="file" className="banner-image-button">
                        {!uploadingBannerImage ? (
                          <div className="banner-image-text">
                            <div className="d-flex flex-row flex-center font-weight-bold color-white">
                              <Image
                                src={uploadIcon}
                                alt="upload-icon"
                                className="mr-10px"
                              />
                              Click to upload a banner image
                            </div>
                            <p className="color-white mt-10px">
                              Recommended size is 1250 x 325 pixels.
                            </p>
                          </div>
                        ) : (
                          <div className="banner-else">Uploading...</div>
                        )}

                        <Image
                          id="banner-image"
                          src={defaultBanner}
                          className="banner-image"
                        />
                      </button>
                    </div>
                    {/* <!-- PROFILE PIC--> */}
                    <div
                      onMouseEnter={() => toggleProfilePicturePrompt()}
                      onMouseLeave={() => toggleProfilePicturePrompt()}
                      className="update-profile-avatar-image"
                    >
                      <input
                        onClick={(e) => _handleFileInput(e.target.files)}
                        className="file-upload-button"
                        type="file"
                        accept="image/png, image/jpeg"
                        id="file"
                        style={{
                          position: "absolute",
                          opacity: 0,
                          cursor: "pointer",
                          width: "100%",
                          height: "100%",
                          padding: 0,
                        }}
                      />
                      {profilePicInput != null && profilePicInput.length > 0 ? (
                        <button className="profile-image-update-button">
                          {/* [style.background-image]="'url(' + profilePicInput + ')'" */}
                          <div></div>
                          <div>
                            {/*[style.background-image]="'url(' + profilePicInput + ')'" */}
                            <div
                              className={[
                                "update-profile__image",
                                profilePicturePromtOpen ? "darken" : "",
                              ].join(" ")}
                            ></div>
                          </div>
                        </button>
                      ) : null}

                      <div
                        className={[
                          "update-profile-pp-prompt font-weight-bold fs-12px d-flex flex-center",
                          profilePicturePromtOpen ? "visible" : "hidden",
                        ].join(" ")}
                      >
                        Click to update profile picture
                      </div>
                    </div>
                  </div>
                  <label className="px-15px mt-10px mb-5px fs-18px font-weight-semiboldn">
                    Username
                  </label>
                  <p className="px-15px fs-13px" style={{ color: "#9e9e9e" }}>
                    Username must only use letters, numbers, or underscores
                  </p>
                  <div className="px-15px mt-10px">
                    <input
                      value={usernameInput}
                      className="update-profile-input update-profile-input-oneliner-height fs-15px lh-18px p-10px"
                      placeholder="Enter username"
                    />
                  </div>
                  <label className="px-15px mt-30px mb-5px fs-18px font-weight-semiboldn">
                    Display name
                  </label>
                  <p className="px-15px fs-13px" style={{ color: "#9e9e9e" }}>
                    This name will show your profile.
                  </p>
                  <div className="mt-10px px-15px">
                    <input
                      maxLength={30}
                      value={name}
                      placeholder="Your full name or artist name."
                      value={profileData?.Name ? profileData?.Name : ""}
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
                    {/* #textarea
              #autosize="cdkTextareaAutosize" */}
                    <textarea
                      value={descriptionInput}
                      className="update-profile-input w-100 resize-none fs-15px p-10px"
                      rows={4}
                      maxLength={512}
                      cdkTextareaAutosize
                    ></textarea>
                    {profileUpdateErrors.descriptionError ? (
                      <div
                        className={[
                          "fs-13px font-italic",
                          profileUpdateErrors.descriptionError ? "fc-red" : "",
                        ].join(" ")}
                      >
                        Description can only be 512 characters
                      </div>
                    ) : null}
                  </div>
                  <div className="px-15px">
                    <div className="mt-30px mb-5px fs-18px font-weight-semiboldn">
                      Founder Reward
                    </div>
                    <p className="fs-13px" style={{ color: "#9e9e9e" }}>
                      The reward you will receive every time someone buys your
                      Creator Coin.
                    </p>
                    <div className="mt-10px">
                      <div className="d-flex w-m-180px flex-row mint-page-royalty-element position-relative">
                        <input
                          value={founderRewardInput}
                          disabled={loggedInUser.UsersWhoHODLYouCount === 0}
                          min={0}
                          max={100}
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
                      {loggedInUser.UsersWhoHODLYouCount === 0 ? (
                        <div className="fc-muted font-italic fs-13px pt-5px">
                          * You must purchase your own coin before lowering your
                          founder reward.
                        </div>
                      ) : null}

                      {profileUpdateErrors.founderRewardError ? (
                        <div
                          className={[
                            "fs-13px font-italic pt-5px",
                            profileUpdateErrors.founderRewardError
                              ? "fc-red"
                              : "",
                          ].join(" ")}
                        >
                          Please set a founder reward between 0-100.
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <button
                    onClick={() => setContactsOpen(!contactsOpen)}
                    className={[
                      "px-15px update-profile-dropdown update-profile-border-top mt-20px d-flex flex-row justify-content-between",
                      contactsOpen ? "background-color-secondary" : "",
                    ].join(" ")}
                  >
                    <div className="d-flex h-100 flex-start-center flex-column">
                      <label className="font-weight-semiboldn color-text mb-5px fs-18px">
                        Contact details
                      </label>
                      <p style={{ color: "#9e9e9e" }} className="fs-13px">
                        Email
                      </p>
                    </div>
                    <div className="h-100 d-flex flex-center">
                      {/* src="/assets/icons/chevron-down.svg" */}
                      <Image
                        src={chevronDown}
                        className={[
                          "update-profile-dropdown-icon up-rotate-icon",
                          contactsOpen ? "open" : "",
                        ].join(" ")}
                      />
                    </div>
                  </button>
                  <div
                    className={[
                      "px-15px contactsAccordion d-flex flex-column flex-start-center disable-scrollbars",
                      contactsOpen ? "expanded" : "",
                    ].join(" ")}
                  >
                    <label className="mt-10px mb-0px fs-18px font-weight-semiboldn">
                      Email
                    </label>
                    <p style={{ color: "#9e9e9e" }} className="fs-13px">
                      Your email address. No spam, ever.
                    </p>
                    <div className="form-group mt-10px w-100">
                      <input
                        value={emailAddress}
                        onChange={(e) => _validateEmail(e)}
                        type="email"
                        className="update-profile-input update-profile-input-oneliner-height fs-15px"
                        placeholder="Enter an email address."
                      />
                      {invalidEmailEntered ? (
                        <div className="fc-red fs-15px">
                          Please enter a valid email address.
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <button
                    onClick={() => setSocialsOpen(!socialsOpen)}
                    className={[
                      "px-15px update-profile-dropdown update-profile-border-top d-flex flex-row justify-content-between",
                      socialsOpen ? "background-color-secondary" : "",
                    ].join(" ")}
                  >
                    <div className="d-flex h-100 flex-start-center flex-column">
                      <label className="font-weight-semiboldn color-text mb-5px fs-18px">
                        Social links
                      </label>
                      <p style={{ color: "#9e9e9e" }} className="fs-13px">
                        Add links to your social profiles.
                      </p>
                    </div>
                    <div className="h-100 d-flex flex-center">
                      {/* src="/assets/icons/chevron-down.svg" */}
                      <Image
                        src={chevronDown}
                        className={[
                          "update-profile-dropdown-icon up-rotate-icon",
                          socialsOpen ? "open" : "",
                        ].join(" ")}
                      />
                    </div>
                  </button>
                  <div
                    className={[
                      "px-15px socialsAccordion disable-scrollbars",
                      socialsOpen ? "expanded" : "",
                    ].join(" ")}
                  >
                    <div className="social-input">
                      <label className="social-label">
                        <Image src={twitterIcon} className="pr-5px" />
                        twitter.com/
                      </label>
                      <input
                        value={twitter}
                        maxLength={30}
                        className="social-input-inner"
                        type="text"
                        placeholder="Your Twitter username without the '@'' sign"
                        value={profileData?.Twitter ? profileData?.Twitter : ""}
                      />
                    </div>
                    <div className="social-input">
                      <label className="social-label">
                        <Image src={instagramIcon} className="pr-5px" />
                        instagram.com/
                      </label>
                      <input
                        value={instagram}
                        maxLength={30}
                        className="social-input-inner"
                        type="text"
                        placeholder="Your instagram username without the '@'' sign"
                        value={
                          profileData?.Instagram ? profileData?.Instagram : ""
                        }
                      />
                    </div>
                    <div className="social-input">
                      <label className="social-label">
                        <Image src={discordIcon} className="pr-5px" />
                        discord.gg/
                      </label>
                      <input
                        value={discord}
                        maxLength={30}
                        className="social-input-inner"
                        type="text"
                        placeholder="The ID in your Discord server invite link"
                        value={
                          this.profileData?.Discord
                            ? this.profileData?.Discord
                            : ""
                        }
                      />
                    </div>
                    <div className="social-input">
                      <label className="social-label">
                        <Image
                          src={worldIcon}
                          className="pr-5px minus-margin"
                        />
                        Website
                      </label>
                      <input
                        value={website}
                        maxLength={30}
                        className="social-input-inner"
                        type="text"
                        placeholder="Your website URL"
                        value={profileData?.Website ? profileData.Website : ""}
                      />
                    </div>
                  </div>
                  {!loggedInUser.JumioFinishedTime ? (
                    <button
                      onClick={() => setVerificationOpen(!verificationOpen)}
                      className={[
                        "px-15px update-profile-dropdown update-profile-border-top d-flex flex-row justify-content-between",
                        verificationOpen ? "background-color-secondary" : "",
                      ].join(" ")}
                    >
                      <div className="d-flex h-100 flex-start-center flex-column">
                        <label className="font-weight-semiboldn color-text mb-5px fs-18px">
                          Verification
                        </label>
                        <p
                          style={{ color: "#9e9e9e" }}
                          className="fs-13px text-align-start"
                        >
                          Verify your identity with Jumio and you will receive
                          0.1 $DESO for free.
                        </p>
                      </div>
                      <div className="h-100 d-flex flex-center">
                        {/* src="/assets/icons/chevron-down.svg" */}
                        <Image
                          src={chevronDown}
                          className={[
                            "update-profile-dropdown-icon up-rotate-icon",
                            verificationOpen ? "open" : "",
                          ].join(" ")}
                        />
                      </div>
                    </button>
                  ) : null}
                  <div
                    className={[
                      "verifiedAccordion disable-scrollbars update-profile-border-bottom px-15px d-flex flex-column flex-start-center",
                      verificationOpen ? "expanded" : "",
                    ].join(" ")}
                  >
                    <label
                      style={{ color: "#222222" }}
                      className="max-width-update-profile mt-10px font-weight-semibold mb-5px fs-16px"
                    >
                      By verifying your identity with our partner Jumio, you
                      will receive 0.1 $DESO reward.
                    </label>
                    <br />
                    <label
                      style={{ color: "#222222" }}
                      className="max-width-update-profile font-weight-semibold mb-5px fs-16px"
                    >
                      Supernovas will never see any of your personal details.
                    </label>
                    <button
                      onClick={() => launchGetFreeDESOFlow()}
                      className="white-rounded-button fs-14px up-jumio-button mt-20px d-flex flex-center pl-10px pr-10px pt-5px pb-5px font-weight-bold"
                    >
                      <Image
                        className="mr-5px color-text fs-13px"
                        src={lockIcon}
                      />
                      Verify your ID with Jumio
                    </button>
                  </div>
                  <div className="mt-5px">
                    <div className="mt-10px" style={{ position: "relative" }}>
                      <div>
                        <div className="w-100 my-30px d-flex flex-column flex-center">
                          <a
                            onClick={() => _updateProfile()}
                            className={[
                              "black-rounded-button d-flex flex-center update-profile-button font-weight-bold fs-15px mt-5px",
                              updateProfileBeingCalled ? "btn-loading" : "",
                            ].join(" ")}
                          >
                            {inTutorial ? "Next" : "Update Profile"}
                          </a>
                          {profileUpdated ? (
                            <i className="mt-10px far fa-check-circle fa-lg fc-blue ml-10px"></i>
                          ) : null}

                          {profilePicInput == null ||
                          profilePicInput.length == 0 ? (
                            <div
                              className={[
                                "fs-13px text-grey5 mt-10px",
                                profileUpdateErrors.profilePicError
                                  ? "fc-red"
                                  : "",
                              ].join(" ")}
                            >
                              Add a profile picture
                            </div>
                          ) : null}

                          {profileUpdateErrors.usernameError ? (
                            <div
                              className={[
                                "fs-13px mt-10px font-italic mt-5px",
                                profileUpdateErrors.usernameError
                                  ? "fc-red"
                                  : "",
                              ].join(" ")}
                            >
                              Please set a username
                            </div>
                          ) : null}

                          {inTutorial &&
                          (!loggedInUser?.MustCompleteTutorial ||
                            loggedInUser?.IsAdmin) ? (
                            <div
                              onClick={() => skipTutorial()}
                              className="px-15px"
                            >
                              <a className="btn btn-outline-primary btn-lg fs-15px text-left mt-5px">
                                Exit
                              </a>
                            </div>
                          ) : null}
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
        ) : null}
      </div>
      <>
        {!isMobile() && !loggedInUser?.CanCreateProfile ? (
          <div className="px-15px mt-30px">
            <UpdateProfileGetDeso></UpdateProfileGetDeso>
          </div>
        ) : (
          <div className="px-15px update-profile-get-starter-deso-container">
            <UpdateProfileGetDeso></UpdateProfileGetDeso>
          </div>
        )}
      </>
    </>
  );
};

export default UpdateProfileC;
