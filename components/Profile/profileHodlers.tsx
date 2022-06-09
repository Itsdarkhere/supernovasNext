import styles from "../../styles/Profile/profileHodlers.module.scss";
import Avatar from "../Reusables/avatar";

const ProfileHodlers = () => {
  return (
    <>
      {!datasource.adapter.isLoading && datasource.adapter.itemsCount === 0 ? (
        <div className="row no-gutters pt-10px">
          <div className="d-flex align-items-center" style="margin-bottom: 0">
            No one owns ${profile.Username} coin yet.&nbsp;
            {/* [routerLink]="['/' + globalVars.RouteNames.USER_PREFIX, profile.Username, 'buy']" */}
            <a>Be the first!</a>
          </div>
        </div>
      ) : null}

      {/* <simple-center-loader *ngIf="datasource.adapter.isLoading && loadingFirstPage"></simple-center-loader> */}
      {/*  #uiScroll *uiScroll="let row of datasource" */}
      <div>
        {!row.totalRow ? (
          <div className="row no-gutters p-10px border-bottom mb-0">
            <div className="col-6 d-flex align-items-center mb-0">
              {!row.ProfileEntryResponse ? (
                <div className="d-flex align-items-center">
                  <div
                    className="creator-profile-details__hodler-avatar mr-10px"
                    style="background-image: url('/assets/img/default_profile_pic.png')"
                  ></div>
                  <div className="d-flex flex-column">
                    {/* [ngStyle]="usernameStyle()" */}
                    <span className="text-truncate">
                      {row.HODLerPublicKeyBase58Check}
                    </span>
                    {/* (click)="stopEvent($event); tooltip.toggle()" */}
                    {/* [matTooltip]="getTooltipForRow(row)"
        #tooltip="matTooltip" */}
                    <div
                      style={{ fontSize: "10px" }}
                      className="ml-1 mb-1 text-grey9 cursor-pointer fs-20px text-primary"
                      matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
                    >
                      {!row.HasPurchased ? (
                        <div
                          className="text-grey9"
                          style={{ fontSize: "10px" }}
                        >
                          <i className="fas fa-exchange-alt pr-5px"></i>
                          Received
                        </div>
                      ) : (
                        <div
                          className="text-grey9"
                          style={{ fontSize: "10px" }}
                        >
                          {row.HODLerPublicKeyBase58Check ===
                            profile.PublicKeyBase58Check &&
                          row.ProfileEntryResponse.IsReserved &&
                          !row.ProfileEntryResponse.IsVerified ? (
                            <div>
                              <i className="far fa-clock fa-md pr-5px font-weight-bold"></i>
                              Reserved
                            </div>
                          ) : (
                            <div>
                              <i className="fas fa-check-square pr-5px"></i>
                              Purchased
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : null}

              {/*[routerLink]="['/' + globalVars.RouteNames.USER_PREFIX, row.ProfileEntryResponse.Username]" */}
              {row.ProfileEntryResponse ? (
                <a className="d-flex align-items-center link--unstyled">
                  <Avatar
                    classN="creator-profile-details__hodler-avatar mr-10px"
                    avatar={row.ProfileEntryResponse.PublicKeyBase58Check}
                  ></Avatar>
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center">
                      {/*  [ngStyle]="usernameStyle()" */}
                      <span className="text-truncate">
                        {row.ProfileEntryResponse.Username}
                      </span>
                      {/* [matTooltip]="'This profile is reserved. Click to learn how to claim it.'" */}
                      {row.ProfileEntryResponse.IsReserved &&
                      !row.ProfileEntryResponse.IsVerified ? (
                        <span
                          className="d-inline-block ml-1 cursor-pointer lh-12px fc-muted align-middle"
                          matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
                        >
                          <i className="far fa-clock fa-md"></i>
                        </span>
                      ) : null}

                      {/*(click)="tooltip.toggle()" */}
                      {/* [matTooltip]="'This account is verified'"
            #tooltip="matTooltip" */}
                      {row.ProfileEntryResponse.IsVerified ? (
                        <span
                          className="ml-1 cursor-pointer text-primary align-middle"
                          matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
                        >
                          <i className="fas fa-check-circle fa-md"></i>
                        </span>
                      ) : null}
                    </div>
                    {/* [matTooltip]="getTooltipForRow(row)"
          #tooltip="matTooltip" */}
                    {/* (click)="stopEvent($event); tooltip.toggle()" */}
                    <div
                      style={{ fontSize: "10px" }}
                      className="ml-1 mb-1 cursor-pointer fs-20px text-grey9 text-primary"
                      matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
                    >
                      {!row.HasPurchased ? (
                        <div
                          className="text-grey9"
                          style={{ fontSize: "10px" }}
                        >
                          <i className="fas fa-exchange-alt pr-5px"></i>
                          Received
                        </div>
                      ) : (
                        <div
                          className="text-grey9"
                          style={{ fontSize: "10px" }}
                        >
                          {row.HODLerPublicKeyBase58Check ===
                            profile.PublicKeyBase58Check &&
                          row.ProfileEntryResponse.IsReserved &&
                          !row.ProfileEntryResponse.IsVerified ? (
                            <div>
                              <i className="far fa-clock fa-md pr-5px font-weight-bold"></i>
                              Reserved
                            </div>
                          ) : (
                            <div>
                              <i className="fas fa-check-square pr-5px"></i>
                              Purchased
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              ) : null}
            </div>
            <div className="col-3 d-flex align-items-center mb-0">
              {(row.BalanceNanos / 1e9).toFixed(4)}
            </div>
            <div className="col-3 d-flex align-items-center mb-0">
              ≈{" "}
              {globalVars.creatorCoinNanosToUSDNaive(
                row.BalanceNanos,
                profile.CoinPriceDeSoNanos,
                true
              )}
            </div>
          </div>
        ) : null}

        {row.totalRow ? (
          <div className="row no-gutters font-weight-bold">
            <div className="col-6 py-15px mb-0">Total</div>
            <div className="col-3 py-15px mb-0">
              {(profile.CoinEntry.CoinsInCirculationNanos / 1e9).toFixed(4)}
            </div>
            <div className="col-3 py-15px mb-0">
              ≈
              {creatorCoinNanosToUSDNaive(
                profile.CoinEntry.CoinsInCirculationNanos,
                profile.CoinPriceDeSoNanos,
                true
              )}
            </div>
          </div>
        ) : null}
      </div>
      {/* <simple-center-loader *ngIf="!loadingFirstPage && loadingNextPage" [height]="200"></simple-center-loader> */}
    </>
  );
};

export default ProfileHodlers;
