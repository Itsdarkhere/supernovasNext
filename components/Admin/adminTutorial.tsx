import styles from "../../styles/Admin/adminTutorial.module.scss";
import Avatar from "../Reusables/avatar";
import TabSelector from "../Reusables/tabSelector";

const AdminTutorial = () => {
  return (
    <>
      <div
        className="w-100 light-grey-divider border-bottom border-color-grey"
        style={{ height: "10px" }}
      ></div>
      <TabSelector
        tabs={adminTutorialTabs}
        activeTab={activeTutorialTab}
        tabClick={(e) => _tutorialTabClicked(e)}
        icons={null}
        extraTab={null}
      ></TabSelector>
      {/* <simple-center-loader *ngIf="loading"></simple-center-loader> */}
      {activeTutorialTab !== RESET_TAB ? (
        <div>
          {filteredProfileEntryResponses.map((profileEntryResponse, index) => (
            <div key={index} className="m-15px js-feed-post-hover border">
              <div className="link--unstyled d-flex align-items-center text-grey5 fs-15px m-2">
                <div>
                  <i
                    onClick={(e) =>
                      removeCreatorFeaturedTutorialList(
                        profileEntryResponse.PublicKeyBase58Check,
                        e
                      )
                    }
                    className="p-10px far fa-trash-alt fc-red cursor-pointer"
                  ></i>
                </div>
                {/* [routerLink]="['/' + globalVars.RouteNames.USER_PREFIX, profileEntryResponse.Username]" */}
                <a
                  queryParamsHandling="merge"
                  className="link--unstyled d-flex align-items-center text-grey5 fs-15px"
                >
                  <Avatar
                    classN="right-bar-creators-leaderboard__creator-avatar ml-2"
                    avatar={profileEntryResponse.PublicKeyBase58Check}
                  ></Avatar>

                  <div style={{ flexFlow: 1 }} className="ml-2">
                    <span>{profileEntryResponse.Username}</span>
                    {/* [matTooltip]="'This profile is reserved. Click to learn how to claim it.'" */}
                    {profileEntryResponse.IsReserved &&
                    !profileEntryResponse.IsVerified ? (
                      <span
                        className="d-inline-block ml-1 cursor-pointer lh-12px fc-muted"
                        matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
                      >
                        <i className="far fa-clock fa-md"></i>
                      </span>
                    ) : null}

                    {/*  [matTooltip]="'This account is verified'"
                    #tooltip="matTooltip" */}
                    {profileEntryResponse.IsVerified ? (
                      <span
                        onClick={() => tooltip.toggle()}
                        className="ml-1 cursor-pointer text-primary"
                        matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
                      >
                        <i className="fas fa-check-circle fa-md"></i>
                      </span>
                    ) : null}
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {activeTutorialTab === RESET_TAB ? (
        <div>
          <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
            Reset Tutorial for Public Key:
            <div className="d-flex mt-5px">
              <input
                value={publicKeyToReset}
                className="form-control w-100 fs-15px lh-15px"
                placeholder="Enter a public key."
              />
              {!resettingTutorial ? (
                <button
                  onClick={() => _resetTutorial()}
                  className="btn btn-outline-primary fs-15px ml-5px"
                >
                  Reset
                </button>
              ) : (
                <button className="btn btn-primary fs-15px ml-5px" disabled>
                  Working...
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default AdminTutorial;
