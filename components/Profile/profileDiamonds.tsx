import { counter } from "@fortawesome/fontawesome-svg-core";
import styles from "../../styles/Profile/profileDiamonds.module.scss";
import Avatar from "../Reusables/avatar";

const ProfileDiamonds = () => {
  return (
    <div className="w-100 d-flex flex-column justify-content-start px-15px fs-15px">
      <div className="d-flex container border-bottom border-color-grey font-weight-bold pl-0px py-15px justify-content-between">
        <div>
          Diamonds&nbsp;
          {/* [ngModel]="activeTab"
        (ngModelChange)="onChange($event)" */}
          <select
            style="border: none; background: none; outline: none; border-bottom: solid 1px"
            className="font-weight-bold ddropdown"
          >
            <option className="font-weight-bold" value={RECEIVED}>received</option>
            <option className="font-weight-bold" value={GIVEN}>given</option>
          </select>
          by&nbsp;@{profile.Username}
        </div>
        <div>
          {totalDiamonds}
          <span className="text-muted">
            ≈ {globalVars.abbreviateNumber(valueOfAllDiamonds(), 2, true)}
            &nbsp;USD
          </span>
        </div>
      </div>
      <div>
        <div className="fs-15px flex-grow-1">
          {!isLoading && diamondSummaryList.length > 0 ? (
            <div className="row no-gutters border-bottom border-color-grey fc-muted">
              <div className="col-5 d-flex align-items-center py-15px mb-0">
                Username
              </div>
              <div className="col-4 text-left d-flex align-items-center py-15px mb-0">
                Most Diamonds
              </div>
              <div className="col-3 text-center d-flex align-items-center py-15px mb-0">
                Total Diamonds
              </div>
            </div>
          ) : null}

          {!isLoading && diamondSummaryList.length == 0 ? (
            <div className="row no-gutters pt-10px">
              <div
                className="d-flex align-items-center"
                style="margin-bottom: 0"
              >
                <span>
                  @{profile.Username} has not {activeTab.toLowerCase()} any
                  diamonds yet.
                  {/* [routerLink]="['/' + globalVars.RouteNames.USER_PREFIX, profile.Username]" *ngIf="!showDiamondsGiven" */}
                  <a>&nbsp;Be the first!</a>
                </span>
              </div>
            </div>
          ) : null}

          {/* <simple-center-loader *ngIf="isLoading"></simple-center-loader> */}
          {!isLoading || loadingNewSelection ? (
            <div>
              {/* #uiScroll *uiScroll="let row of datasource" */}
              <div>
                {!row.totalRow && row.ProfileEntryResponse ? (
                  <div>
                    {/* [routerLink]="[
                  '/' + globalVars.RouteNames.USER_PREFIX,
                  showDiamondsGiven ? row.ProfileEntryResponse.Username : profile.Username,
                  globalVars.RouteNames.DIAMONDS,
                  showDiamondsGiven ? profile.Username : row.ProfileEntryResponse.Username
                  ]" */}
                    <div className="link--unstyled cursor-pointer">
                      <div className="row no-gutters py-10px border-bottom mb-0">
                        <div className="col-5 d-flex align-items-left mb-0">
                          {/* [routerLink]="['/' + globalVars.RouteNames.USER_PREFIX, row.ProfileEntryResponse.Username]" */}
                          <div className="d-flex align-items-center link--unstyled">
                            <Avatar
                              classN="creator-profile-details__hodler-avatar mr-10px"
                              avatar={
                                row.ProfileEntryResponse.PublicKeyBase58Check
                              }
                            ></Avatar>
                            {/* [ngStyle]="{ 'max-width': globalVars.isMobile() ? '100px' : '200px' }" */}
                            <div
                              className="text-truncate"
                              style="font-size: 14px"
                            >
                              <span>{row.ProfileEntryResponse.Username}</span>
                              {/*
                                (click)="tooltip.toggle()" 
                                [matTooltip]="'This account is verified'"
                                #tooltip="matTooltip"
                                */}
                              {row.ProfileEntryResponse.IsVerified ? (
                                <span
                                  className="ml-1 mb-1 cursor-pointer text-primary"
                                  matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
                                >
                                  <i className="fas fa-check-circle fa-md align-middle"></i>
                                </span>
                              ) : null}

                              <div className="text-grey9 fs-12px">
                                {nanosToUSD(
                                  row.ProfileEntryResponse.CoinPriceDeSoNanos,
                                  2
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-4 mb-0 d-flex align-items-center justify-flex-start">
                          {/* check works */}
                          {counter(row.HighestDiamondLevel).map((_, index) => (
                            <i
                              key={index}
                              className="icon-diamond fs-20px d-block"
                              style={{ marginRight: "-71px" }}
                            ></i>
                          ))}
                        </div>
                        <div className="col-3 mb-0 d-flex align-items-center justify-content-center">
                          {row.TotalDiamonds}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {row.anonDiamondsRow ? (
                  <div>
                    <div className="link--unstyled">
                      <div className="row no-gutters py-10px border-bottom mb-0">
                        <div className="col-5 d-flex align-items-left mb-0">
                          <div className="d-flex align-items-center link--unstyled">
                            <div
                              className="creator-profile-details__hodler-avatar mr-10px"
                              style="background-image: url('/assets/img/default_profile_pic.png')"
                            ></div>
                            {/* [ngStyle]="{ 'max-width': globalVars.isMobile() ? '100px' : '200px' }" */}
                            <div
                              className="text-truncate"
                              style={{ fontSize: "14px" }}
                            >
                              <span>Anonymous</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-4 mb-0 d-flex align-items-center justify-flex-start">
                          {counter(highestAnonDiamondLevel).map((_, index) => (
                            <i
                              key={index}
                              className="icon-diamond fs-20px d-block"
                              style={{ marginRight: "-7px" }}
                            ></i>
                          ))}
                        </div>
                        <div className="col-3 mb-0 d-flex align-items-center justify-content-center">
                          {totalAnonDiamonds}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {row.totalRow ? (
                  <div className="row no-gutters font-weight-bold">
                    <div className="col-4 py-15px mb-0">Total</div>
                    <div className="col-4 py-15px mb-0">
                      {/* <!--Blank--> */}
                    </div>
                    <div className="col-4 text-center py-15px mb-0">
                      {totalDiamonds} ≈{" "}
                      {globalVars.abbreviateNumber(
                        valueOfAllDiamonds(),
                        2,
                        true
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProfileDiamonds;
