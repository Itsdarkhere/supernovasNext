import styles from "../../styles/Reusables/simpleProfileCard.module.scss";

const SimpleProfileCard = () => {
  //     [ngClass]="{ 'border-bottom': !singleColumn }"
  //   [ngStyle]="{ cursor: !profile.Username ? 'default' : '' }"
  //   (click)="onClick()"
  return (
    <a className="container d-flex align-items-center fs-15px p-10px border-color-grey link--unstyled">
      <div className="row no-gutters w-100">
        <div className="d-flex flex-grow-1 align-items-center mb-0">
          {/* <!-- Avatar --> */}
          <div className="simple-profile-card__avatar-container">
            <Avatar
              class="simple-profile-card__avatar br-30px"
              avatar={profile.PublicKeyBase58Check}
            ></Avatar>
          </div>
          <div className="d-flex">
            <div className="text-truncate holdings__name fs-15px">
              <div className="d-flex">
                <div className="fc-default font-weight-bold text-truncate holdings__name link--unstyled">
                  {profile.Username || profile.PublicKeyBase58Check}
                </div>
                {/* *ngIf="profile.IsVerified"
              (click)="tooltip.toggle()" 
              [matTooltip]="'This account is verified'"
              #tooltip="matTooltip"*/}
                <span
                  className="ml-1 mb-1 cursor-pointer text-primary"
                  matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
                >
                  <i className="fas fa-check-circle fa-md align-middle"></i>
                </span>
              </div>
              {/* *ngIf="profile.CoinPriceDeSoNanos" */}
              <div className="text-grey9">
                {globalVars.nanosToUSD(profile.CoinPriceDeSoNanos, 2)}
              </div>
            </div>
            <div className="d-flex">
              {/* [displayAsLink]="true"
            [followLinkClass]="'link--unstyled'"
            [followedPubKeyBase58Check]="profile.PublicKeyBase58Check" 
            *ngIf="!hideFollowLink"*/}
              <follow-button class="ml-10px fs-12px text-grey5"></follow-button>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-center mb-0">
          {/* *ngIf="diamondLevel > 0" class="d-flex" */}
          <div>
            {/* *ngFor="let diamond of counter(diamondLevel)" */}
            <i className="icon-diamond fs-20px d-block"></i>
          </div>
          {/* *ngIf="showHeartIcon" */}
          <div>
            <i className="icon-heart-fill fs-32px d-block fc-red"></i>
          </div>
          {/* *ngIf="showRepostIcon" */}
          <div>
            <i className="icon-repost fs-32px d-block fc-green"></i>
          </div>
          {/* *ngIf="showTutorialBuy" (click)="onBuyClicked()" */}
          <div>
            <a className="btn btn-primary fs-18px text-left">Buy</a>
          </div>
        </div>
      </div>
    </a>
  );
};
export default SimpleProfileCard;
