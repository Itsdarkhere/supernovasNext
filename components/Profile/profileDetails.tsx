import { useState } from "react";
import styles from "../../styles/Profile/profileDetails.module.scss";
import {
  BlockPublicKey,
  ProfileEntryResponse,
  stringifyError,
} from "../../utils/backendapi-context";
import {
  getTargetComponentSelector,
  hasUserBlockedCreator,
  _alertError,
} from "../../utils/global-context";
import { SwalHelper } from "../../utils/helpers/swal-helper";
import { useAppSelector } from "../../utils/Redux/hooks";
import TabSelector from "../Reusables/tabSelector";
import ProfileCollected from "./profileCollected";
import ProfileCreated from "./profileCreated";
import ProfileHodlers from "./profileHodlers";
import ProfilePosts from "./profilePosts";
import ProfileTopCard from "./profileTopCard";
import postsIcon from "../../public/icons/profile_posts_icon.svg";
import createdIcon from "../../public/icons/profile_created_icon.svg";
import collectedIcon from "../../public/icons/profile_collected_icon.svg";
import ccIcon from "../../public/icons/profile_cc_icon.svg";
import { useRouter } from "next/router";

const ProfileDetails = () => {
  const [profile, setProfile] = useState<ProfileEntryResponse>(null);
  const [profileData, setProfileData] = useState<ProfileEntryResponse>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(
    (useRouter().query.page || "created").toString()
  );

  const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  const localNode = useAppSelector((state) => state.node.localNode);

  let tab_selector_tabs = ["Posts", "Created", "Collected", "Creator Coin"];
  let tab_selector_icons = [postsIcon, createdIcon, collectedIcon, ccIcon];

  // Functions
  const unblock = () => {
    SwalHelper.fire({
      target: getTargetComponentSelector(),
      title: "Unblock user",
      html: `This user will appear in your feed and on your threads again`,
      showCancelButton: true,
      customClass: {
        confirmButton: "btn btn-light",
        cancelButton: "btn btn-light no",
      },
      reverseButtons: true,
    }).then((response: any) => {
      if (response.isConfirmed) {
        delete loggedInUser.BlockedPubKeys[profile.PublicKeyBase58Check];
        BlockPublicKey(
          localNode,
          loggedInUser.PublicKeyBase58Check,
          profile.PublicKeyBase58Check,
          true /* unblock */
        ).subscribe({
          next: (res) => {},
          error: (err) => {
            const parsedError = stringifyError(err);
            _alertError(parsedError);
          },
        });
      }
    });
  };

  const blockUser = () => {
    SwalHelper.fire({
      target: getTargetComponentSelector(),
      title: "Block user?",
      html: `This will hide all comments from this user on your posts as well as hide them from your view on other threads.`,
      showCancelButton: true,
      customClass: {
        confirmButton: "btn btn-light",
        cancelButton: "btn btn-light no",
      },
      reverseButtons: true,
    }).then((response: any) => {
      if (response.isConfirmed) {
        loggedInUser.BlockedPubKeys[profile.PublicKeyBase58Check] = {};
        Promise.all([
          BlockPublicKey(
            localNode,
            loggedInUser.PublicKeyBase58Check,
            profile.PublicKeyBase58Check
          ).subscribe({
            error: (err) => {
              console.error(err);
              const parsedError = stringifyError(err);
              _alertError(parsedError);
            },
          }),
          // Unfollow this profile if we are currently following it.
          childTopCardComponent._unfollowIfBlocked(),
        ]);
      }
    });
  };

  const showProfileAsReserved = () => {
    return profile.IsReserved && profile.IsVerified;
  };

  const _handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    // Update query params to reflect current tab
    // Put back
    // const urlTree = this.router.createUrlTree([], {
    //   queryParams: { tab: CreatorProfileDetailsComponent.TABS_LOOKUP[tabName] || "posts" },
    //   queryParamsHandling: "merge",
    //   preserveFragment: true,
    // });
    // this.location.go(urlTree.toString());
  };

  return (
    <>
      {/* <simple-center-loader *ngIf="loading"></simple-center-loader>< */}

      {/* <!--Profile not found--> */}
      {/* <not-found *ngIf="!profile && !loading"></not-found> */}
      {/* *ngIf="profile && !loading" */}
      <div className="creator-profile-details-container position-relative">
        <div className="profile-content-container">
          {/* *ngIf="profile && !loading" */}
          <ProfileTopCard
            profile={profile}
            profileData={profileData}
            userUnblocked={() => unblock()}
            userBlocked={() => blockUser()}
            handleTabClick={(e) => _handleTabClick(e)}
          ></ProfileTopCard>
          <div className="px-10px-desktop">
            {/* <!-- Feed Selector --> */}
            <div className="profile-tab-selector-wrapper">
              <TabSelector
                tabs={tab_selector_tabs}
                icons={tab_selector_icons}
                activeTab={activeTab}
                tabClick={(e) => _handleTabClick(e)}
                extraTab={null}
              ></TabSelector>
            </div>

            {/* <!-- Reserved --> */}
            {/* class="p-15px" */}
            {showProfileAsReserved() && activeTab === "Posts" ? (
              <div>
                <div className="background-color-grey p-35px br-12px d-flex flex-row align-items-center">
                  <i className="far fa-clock fs-1 fc-muted"></i>
                  <div className="ml-25px fc-default">
                    <p className="roboto-mono fs-18px mb-5px font-weight-semibold">
                      This profile has been reserved by the BitClout.com team
                    </p>
                    <p className="roboto-mono fs-15px">
                      @{profile.Username} has not joined Bitclout yet.
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            {/* <!-- Posts --> */}
            {profile && activeTab == "Posts" && !loading ? (
              <div className="creator_post_wrap">
                <ProfilePosts
                  profile={profile}
                  showProfileAsReserved={showProfileAsReserved()}
                  blockUser={() => blockUser()}
                ></ProfilePosts>
                {hasUserBlockedCreator(profile.PublicKeyBase58Check) ? (
                  <div className="w-100 d-flex p-15px">
                    <span>
                      You have blocked {profile.Username}.
                      {/* (click)="unblock()" */}
                      <a>Unblock</a>
                      to see their posts.
                    </span>
                  </div>
                ) : null}
              </div>
            ) : null}

            {/* <!-- Creator Coin Info --> */}
            {activeTab == "Creator Coin" && !loading ? (
              <div className="w-100 d-flex flex-column">
                <div className="w-100 d-flex justify-content-start px-15px fs-15px">
                  <div className="container border-bottom border-color-grey font-weight-bold pl-0px py-15px">
                    Holders of ${profile.Username} coin
                  </div>
                </div>

                <div>
                  <div className="container fs-15px flex-grow-1">
                    <div className="row no-gutters border-bottom border-color-grey fc-muted">
                      <div className="col-6 d-flex py-15px mb-0">
                        Username or PubKey
                      </div>
                      <div className="col-3 py-15px mb-0">Coins Held</div>
                      <div className="col-3 py-15px mb-0">
                        Market Value
                        {/*  [matTooltip]="'This is computed as the number of coins times the current price.'"
                #tooltip="matTooltip"
                (click)="tooltip.toggle()" */}
                        <i
                          className="fas fa-info-circle text-greyC fs-15px global__tooltip-icon"
                          matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
                        ></i>
                      </div>
                    </div>
                    <ProfileHodlers profile={profile}></ProfileHodlers>
                  </div>
                </div>
                <div className="w-100 p-35px"></div>
              </div>
            ) : null}

            {/* <!-- Collected --> */}
            {activeTab == "Collected" && !loading ? (
              <div className="w-100 d-flex flex-column">
                <ProfileCollected
                  profile={profile}
                  profileData={profileData}
                  showProfileAsReserved={showProfileAsReserved()}
                  blockUser={() => blockUser()}
                ></ProfileCollected>
                <div className="w-100 p-35px"></div>
              </div>
            ) : null}

            {/* <!-- Created --> */}
            {activeTab == "Created" && !loading ? (
              <div className="w-100 d-flex flex-column">
                <ProfileCreated
                  profile={profile}
                  profileData={profileData}
                  showProfileAsReserved={showProfileAsReserved()}
                  blockUser={() => blockUser()}
                ></ProfileCreated>
                <div className="w-100 p-35px"></div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {/* <!-- SPACER FOR BOTTOM BAR ON MOBILE --> */}
      <div className="global__bottom-bar-mobile-height"></div>
    </>
  );
};

export default ProfileDetails;
