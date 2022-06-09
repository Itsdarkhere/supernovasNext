import styles from "../../styles/Profile/profileTopCard.module.scss";
import defaultBanner from "../../public/img/default-banner.png";
import Image from "next/image";
import Avatar from "../Reusables/avatar";
import { hasUserBlockedCreator } from "../../utils/global-context";
import chatPlaneIcon from "../../public/icons/chat-plane-icon-white.svg";
import walletIcon from "../../public/icons/wallet-icon-white.svg";
import shareIcon from "../../public/icons/share-white.svg";
import worldIcon from "../../public/icons/profile-world-icon.svg";
import twitterIcon from "../../public/icons/profile-twitter-icon.svg";
import instagramIcon from "../../public/icons/profile-instagram-icon.svg";
import discordIcon from "../../public/icons/profile-discord-icon.svg";

const ProfileTopCard = () => {
  return (
    <>
      <div className="w-100 d-flex flex-center position-relative">
        <Image
          width={1205}
          height={310}
          id="banner-image"
          rel="preload"
          src={defaultBanner}
          className="firebase-cover-image"
          alt="profile banner image"
        />
        <div className="between-images-container">
          <Avatar
            classN="profile-img-cover"
            avatar={profile.PublicKeyBase58Check}
          ></Avatar>
          <div className="followers-section-1">
            <div className="followers-row">
              {/* [routerLink]="AppRoutingModule.userFollowersPath(profile.Username)" */}
              {followerCount != null ? (
                <div className="cursor-pointer" queryParamsHandling="merge">
                  <h6 className="creator-profile-h6">FOLLOWERS</h6>
                  <h5>{followerCount}</h5>
                </div>
              ) : null}

              {/* [routerLink]="AppRoutingModule.userFollowingPath(profile.Username)" */}
              {followingCount != null ? (
                <div className="cursor-pointer" queryParamsHandling="merge">
                  <h6 className="creator-profile-h6">FOLLOWING</h6>
                  <h5>{followingCount}</h5>
                </div>
              ) : null}

              {/* (click)="openTabCreatorCoin()" */}
              <div>
                <h6 className="creator-profile-h6">COIN PRICE</h6>
                <h5>{globalVars.nanosToUSD(profile.CoinPriceDeSoNanos, 2)}</h5>
              </div>
            </div>
            <hr className="followers-separator" />
            <div className="btn_cover_sec followers-buy-button-container mt-10px">
              <div className="btn-cover">
                <div className="w-45">
                  {/* [routerLink]="AppRoutingModule.buyCreatorPath(profile.Username)"
      queryParamsHandling="merge" */}
                  <button className="btn btn-buy discovery-button-movement">
                    Invest
                  </button>
                </div>
                {loggedInUser ? (
                  <div className="w-45 d-inline-block fs-15px follow-container">
                    {profileBelongsToLoggedInUser() ? (
                      <div>
                        {/* [routerLink]="'/' + this.globalVars.RouteNames.UPDATE_PROFILE"
                [queryParams]="{ stepNum: null }" */}
                        <a
                          className="btn btn-follow discovery-button-movement"
                          queryParamsHandling="merge"
                        >
                          Update profile
                        </a>
                      </div>
                    ) : (
                      <>
                        {!hasUserBlockedCreator(
                          profile.PublicKeyBase58Check
                        ) ? (
                          //   <follow-button
                          //     displayAsLink="true"
                          //     followedPubKeyBase58Check="profile.PublicKeyBase58Check"
                          //   ></follow-button>
                          <div>REMOVE ME</div>
                        ) : null}
                      </>
                    )}
                  </div>
                ) : null}

                {/*(click)="unblock()" */}
                {hasUserBlockedCreator(profile.PublicKeyBase58Check) ? (
                  <a className="btn btn-danger font-weight-bold ml-15px fs-14px creator-profile-top-card__block-btn">
                    <span>Unblock</span>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="profile-actions-box">
          {/* (click)="messageUser()" */}
          {loggedInUser?.PublicKeyBase58Check !=
          profile.PublicKeyBase58Check ? (
            <button className="br-30px m-10px pt-5px pb-5px pl-5px pr-5px top-card-button hover-color top-card-button-message">
              <Image
                src={chatPlaneIcon}
                className="profile-button-icon"
                alt="chat icon"
              />
              <div className="dm-button-hover">DM</div>
            </button>
          ) : null}
          {/*  (click)="copyWalletAddress()" */}
          <button className="br-30px m-10px pt-5px pb-5px pl-5px pr-5px top-card-button hover-color top-card-button-wallet">
            {!pkCopied ? (
              <Image
                src={walletIcon}
                className="profile-button-icon"
                alt="wallet icon"
              />
            ) : (
              <i
                className="fas fa-check-circle fa-md align-middle"
                style={{ color: "white !important" }}
              ></i>
            )}

            <div className="wallet-button-hover">Copy wallet address</div>
          </button>
          {/* (click)="copyURL()" */}
          <button className="br-30px m-10px pt-5px pb-5px pl-5px pr-5px top-card-button hover-color top-card-button-share">
            {!profileUrlCopied ? (
              <Image
                src={shareIcon}
                className="profile-button-icon"
                alt="share icon"
              />
            ) : (
              <i
                className="fas fa-check-circle fa-md align-middle"
                style={{ color: "white !important" }}
              ></i>
            )}

            <div className="share-button-hover">Share</div>
          </button>
        </div>
      </div>
      <div
        className="w-100 d-flex flex-center cover-image-blurred-container"
        id="profile-blurred-container"
      >
        <div className="user-info">
          <div className="followers_inline_row flex-column">
            <div className="name-stats-profile">
              {/* [ngClass]="{ 'mt-65px': profileData?.Name }" */}
              <div>
                {profileData?.Name ? (
                  <h5 className="font-weight-semiboldn primary-name">
                    {profileData?.Name}
                  </h5>
                ) : null}

                {/* <!-- if there is no display name, make the display name the username --> */}
                {!profileData?.Name ? (
                  <h5 className="font-weight-semiboldn primary-name">
                    {profile.Username}
                  </h5>
                ) : null}

                {/* [ngClass]="profileData?.Name ? 'secondary-name' : ''" */}
                <h5 className="font-weight-semiboldn secondary-name">
                  @{profile.Username} &nbsp;
                  {/* <ng-container
      (click)="tooltip.toggle()"
      matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
      [matTooltip]="'This profile is reserved'"
      #tooltip="matTooltip"
    > */}
                  {profile.IsReserved && !profile.IsVerified ? (
                    <i className="far fa-clock"></i>
                  ) : null}
                  {/* </ng-container> */}
                  {/* <ng-container
      (click)="tooltip.toggle()"
      matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
      [matTooltip]="'This account is verified'"
      #tooltip="matTooltip"
    > */}
                  {profile.IsVerified ? (
                    <i className="fas fa-check-circle fa-md align-middle"></i>
                  ) : null}
                  {/* </ng-container> */}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="followers-section-2-holder">
        <div className="followers-section-2">
          <div className="followers-row">
            {/*[routerLink]="AppRoutingModule.userFollowersPath(profile.Username)" */}
            {followerCount != null ? (
              <div className="cursor-pointer" queryParamsHandling="merge">
                <h6 className="creator-profile-h6">FOLLOWERS</h6>
                <h5>{followerCount}</h5>
              </div>
            ) : null}

            {/*  [routerLink]="AppRoutingModule.userFollowingPath(profile.Username)" */}
            {followingCount != null ? (
              <div className="cursor-pointer" queryParamsHandling="merge">
                <h6 className="creator-profile-h6">FOLLOWING</h6>
                <h5>{followingCount}</h5>
              </div>
            ) : null}
            {/* (click)="openTabCreatorCoin()" */}
            <div>
              <h6 className="creator-profile-h6">COIN PRICE</h6>
              <h5>{globalVars.nanosToUSD(profile.CoinPriceDeSoNanos, 2)}</h5>
            </div>
          </div>
          <hr className="followers-separator" />
          <div className="btn_cover_sec followers-buy-button-container mt-10px">
            <div className="btn-cover">
              <div className="w-45">
                {/* [routerLink]="AppRoutingModule.buyCreatorPath(profile.Username)"
    queryParamsHandling="merge" */}
                <button className="btn btn-buy discovery-button-movement">
                  Invest
                </button>
              </div>
              {loggedInUser ? (
                <div className="w-45 d-inline-block fs-15px follow-container">
                  {profileBelongsToLoggedInUser() ? (
                    <div>
                      {/* [routerLink]="'/' + this.globalVars.RouteNames.UPDATE_PROFILE"
  [queryParams]="{ stepNum: null }" */}
                      <a
                        className="btn btn-follow discovery-button-movement"
                        queryParamsHandling="merge"
                      >
                        Update profile
                      </a>
                    </div>
                  ) : (
                    <>
                      {!hasUserBlockedCreator(profile.PublicKeyBase58Check) ? (
                        <follow-button
                          displayAsLink="true"
                          followedPubKeyBase58Check="profile.PublicKeyBase58Check"
                          followButtonClasses="['discovery-button-movement']"
                          unfollowButtonClasses="['discovery-button-movement']"
                        ></follow-button>
                      ) : null}
                    </>
                  )}
                </div>
              ) : null}

              {/*"(click)="unblock()" */}
              {hasUserBlockedCreator(profile.PublicKeyBase58Check) ? (
                <a className="btn btn-danger font-weight-bold ml-15px fs-14px creator-profile-top-card__block-btn">
                  <span>Unblock</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="page-creator-top-profile">
        <div className="btn_cover_sec followers-buy-button-container-mobile mt-10px">
          <div className="btn-cover">
            {/* [routerLink]="AppRoutingModule.buyCreatorPath(profile.Username)" */}
            <button className="btn btn-buy" queryParamsHandling="merge">
              Invest
            </button>
            {loggedInUser ? (
              <div className="w-100 d-inline-block mt-10px fs-15px follow-container">
                {profileBelongsToLoggedInUser() ? (
                  <div>
                    {/* [routerLink]="'/' + this.globalVars.RouteNames.UPDATE_PROFILE"
[queryParams]="{ stepNum: null }" */}
                    <a className="btn btn-follow" queryParamsHandling="merge">
                      Update profile
                    </a>
                  </div>
                ) : (
                  <>
                    {!hasUserBlockedCreator(profile.PublicKeyBase58Check) ? (
                      <follow-button
                        followButtonClasses="['w-100']"
                        unfollowButtonClasses="['w-100']"
                        displayAsLink="true"
                        followedPubKeyBase58Check="profile.PublicKeyBase58Check"
                      ></follow-button>
                    ) : null}
                  </>
                )}
              </div>
            ) : null}

            {/*(click)="unblock()" */}
            {hasUserBlockedCreator(profile.PublicKeyBase58Check) ? (
              <a className="btn btn-danger font-weight-bold ml-15px fs-14px creator-profile-top-card__block-btn">
                <span>Unblock</span>
              </a>
            ) : null}
          </div>
        </div>
        <div className="bio-cover">
          {/* [innerHTML]="profile.Description | sanitizeAndAutoLink" */}
          <p></p>
          <div className="socials-column">
            {profileData?.Website ? (
              <a
                href="https://{{ trimURL(profileData.Website) }}"
                target="_blank"
                className="social-link-div pr-2px"
                rel="noreferrer"
              >
                <Image src={worldIcon} alt="world icon" />
                <label className="mb-0px">{trimURL(profileData.Website)}</label>
              </a>
            ) : null}

            {profileData?.Twitter ? (
              <a
                href="https://www.twitter.com/{{ profileData.Twitter }}"
                target="_blank"
                className="social-link-div"
                rel="noreferrer"
              >
                <Image src={twitterIcon} alt="twitter icon" />
                <label className="mb-0px">@{profileData.Twitter}</label>
              </a>
            ) : null}

            {profileData?.Instagram ? (
              <a
                href="https://www.instagram.com/{{ profileData.Instagram }}"
                target="_blank"
                className="social-link-div"
                rel="noreferrer"
              >
                <Image src={instagramIcon} alt="instagram icon" />
                <label className="mb-0px">@{profileData.Instagram}</label>
              </a>
            ) : null}

            {profileData?.Discord ? (
              <a
                href="https://discord.gg/{{ profileData.Discord }}/"
                target="_blank"
                className="social-link-div"
                rel="noreferrer"
              >
                <Image src={discordIcon} alt="discord icon" />
                <label className="mb-0px">{profileData.Discord}</label>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTopCard;
