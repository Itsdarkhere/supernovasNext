import styles from "../../styles/Admin/referralProgramMGR.module.scss";
import {
  convertTstampToDaysOrHours,
  getLinkForReferralHash,
  nanosToUSD,
} from "../../utils/global-context";
import SearchBar from "../Reusables/searchBar";
import SimpleProfileCard from "../Reusables/simpleProfileCard";
import TabSelector from "../Reusables/tabSelector";

const ReferralProgramMGR = () => {
  return (
    <>
      <TabSelector
        tabs={tabs}
        activeTab={activeTab}
        tabClick={(e) => _tabClicked(e)}
        icons={undefined}
        extraTab={undefined}
      ></TabSelector>
      {activeTab === "Single User" ? (
        <div className="fs-15px">
          <div className="w-100 d-flex justify-content-start py-10px pl-15px fs-15px fc-muted border-bottom border-color-grey light-grey-divider">
            Enter a user in order to modify its referral links.
          </div>

          <div className="fs-15px mt-15px px-15px">
            <div
              style={{ marginBottom: "-8px" }}
              className="font-weight-semibold"
            >
              Public key or username:
            </div>
            {/* <!-- Search Bar --> */}
            <SearchBar
              showCloutavista={false}
              isSearchForUsersToSendDESO={true}
              creatorToMessage={(e) => _handleCreatorSelectedInSearch(e)}
            ></SearchBar>
          </div>

          <div className="px-5px">
            {selectedCreator ? (
              <SimpleProfileCard
                profile={selectedCreator}
                singleColumn={true}
                hideFollowLink={true}
                isBold={false}
              ></SimpleProfileCard>
            ) : null}
          </div>
          {selectedCreator ? (
            <div className="pt-5px px-15px font-weight-semibold">
              <div>Create a new referral link:</div>
              <div className="mt-5px px-10px pb-10px br-3px border border-color-grey">
                {/* <!-- Referrer Amount --> */}
                <div className="d-flex flex-wrap justify-content-between align-items-center fs-15px pt-10px">
                  <div className="font-weight-normal">Referrer Amount</div>
                  <div className="d-flex flex-grow flex-wrap">
                    <div className="input-group py-5px">
                      <div className="input-group-prepend" id="usd-label">
                        <span className="input-group-text fs-15px">
                          &nbsp;USD&nbsp;
                        </span>
                      </div>
                      <input
                        value={referrerAmountUSD}
                        aria-describedby="usd-label"
                        className="form-control fs-15px text-right d-inline-block"
                        type="number"
                        min="0"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                {/* <!-- Referee Amount --> */}
                <div className="d-flex flex-wrap justify-content-between align-items-center fs-15px">
                  <div className="font-weight-normal">Referee Amount</div>
                  <div className="d-flex flex-grow flex-wrap">
                    <div className="input-group py-5px">
                      <div className="input-group-prepend" id="usd-label">
                        <span className="input-group-text fs-15px">
                          &nbsp;USD&nbsp;
                        </span>
                      </div>
                      <input
                        value={refereeAmountUSD}
                        aria-describedby="usd-label"
                        className="form-control fs-15px text-right d-inline-block"
                        type="number"
                        min="0"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                {/* <!-- Max Referrals --> */}
                <div className="d-flex flex-wrap justify-content-between align-items-center fs-15px">
                  <div className="font-weight-normal">Max Referrals</div>
                  <div className="d-flex flex-grow flex-wrap">
                    <input
                      value={maxReferrals}
                      className="form-control fs-15px text-right d-inline-block"
                      type="number"
                      min="0"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* <!-- Requires Jumio --> */}
                <div className="d-flex justify-content-between align-items-center fs-15px">
                  <div className="font-weight-normal">Requires Jumio</div>
                  <div className="custom-control custom-switch custom-switch-lg">
                    <input
                      value={requiresJumio}
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitch1"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customSwitch1"
                    ></label>
                  </div>
                </div>
                {!creatingNewLink ? (
                  <button
                    onClick={() => _createNewLink()}
                    className="btn btn-primary btn-sm font-weight-bold fs-15px mt-5px"
                  >
                    Create New Link
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-sm font-weight-bold fs-15px mt-5px"
                    disabled
                  >
                    Creating...
                  </button>
                )}
              </div>
            </div>
          ) : null}

          {selectedCreator ? (
            <div className="px-15px py-15px font-weight-semibold">
              Existing referral links:
              {/* <simple-center-loader *ngIf="fetchingExistingLinks" [titleLoadingText]="''" [height]="200"></simple-center-loader> */}
              {existingLinks.length == 0 && !fetchingExistingLinks ? (
                <div className="font-weight-normal font-italic">
                  No existing links found.
                </div>
              ) : null}
              {existingLinks.length > 0 && !fetchingExistingLinks ? (
                <div className="font-weight-normal">
                  {/* *ngFor="let linkInfo of existingLinks; let ii = index" */}
                  {existingLinks.map((linkInfo, ii) => (
                    <div key={ii}>
                      <div className="mt-5px px-10px pb-10px br-5px border border-color-grey">
                        <div className="w-100 pt-10px d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <div
                              onClick={() => _copyLink(ii)}
                              className="btn btn-outline-secondary d-flex fs-15px p-5px"
                              style="width: fit-content"
                            >
                              <i className="far fa-copy fa-xs"></i>
                            </div>
                            <div className="px-5px">
                              <a
                                href={getLinkForReferralHash(
                                  linkInfo.Info.ReferralHashBase58
                                )}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {getLinkForReferralHash(
                                  linkInfo.Info.ReferralHashBase58
                                )}
                              </a>
                            </div>
                            {linkCopied[ii] ? (
                              <div className="fs-15px px-5px py-0px">
                                <i className="far fa-check-circle fa-xs fc-blue"></i>
                              </div>
                            ) : null}
                          </div>
                          <div>
                            {convertTstampToDaysOrHours(
                              linkInfo.Info.DateCreatedTStampNanos
                            )}
                          </div>
                        </div>

                        {/* <!-- Referrer Amount --> */}
                        <div className="d-flex flex-wrap justify-content-between align-items-center fs-15px pt-10px">
                          <div className="font-weight-normal">
                            Referrer Amount
                          </div>
                          <div className="d-flex flex-grow flex-wrap">
                            <div className="input-group py-5px">
                              <div
                                className="input-group-prepend"
                                id="usd-label"
                              >
                                <span className="input-group-text fs-15px">
                                  &nbsp;USD&nbsp;
                                </span>
                              </div>
                              <input
                                value={linkInfo.Info.referrerAmountUSD}
                                aria-describedby="usd-label"
                                className="form-control fs-15px text-right d-inline-block"
                                type="number"
                                min="0"
                                placeholder="0"
                              />
                            </div>
                          </div>
                        </div>

                        {/* <!-- Referee Amount --> */}
                        <div className="d-flex flex-wrap justify-content-between align-items-center fs-15px">
                          <div className="font-weight-normal">
                            Referee Amount
                          </div>
                          <div className="d-flex flex-grow flex-wrap">
                            <div className="input-group py-5px">
                              <div
                                className="input-group-prepend"
                                id="usd-label"
                              >
                                <span className="input-group-text fs-15px">
                                  &nbsp;USD&nbsp;
                                </span>
                              </div>
                              <input
                                value={linkInfo.Info.refereeAmountUSD}
                                aria-describedby="usd-label"
                                className="form-control fs-15px text-right d-inline-block"
                                type="number"
                                min="0"
                                placeholder="0"
                              />
                            </div>
                          </div>
                        </div>

                        {/* <!-- Max Referrals --> */}
                        <div className="d-flex flex-wrap justify-content-between align-items-center fs-15px">
                          <div className="font-weight-normal">
                            Max Referrals
                          </div>
                          <div className="d-flex flex-grow flex-wrap">
                            <input
                              value={linkInfo.Info.MaxReferrals}
                              className="form-control fs-15px text-right d-inline-block"
                              type="number"
                              min="0"
                              placeholder="0"
                            />
                          </div>
                        </div>

                        {/* <!-- Requires Jumio --> */}
                        <div className="d-flex justify-content-between align-items-center fs-15px">
                          <div className="font-weight-normal">
                            Requires Jumio
                          </div>
                          <div className="custom-control custom-switch custom-switch-lg">
                            <input
                              value={linkInfo.Info.RequiresJumio}
                              id={"requiresJumio" + ii}
                              type="checkbox"
                              className="custom-control-input"
                            />
                            {/* [for]="'requiresJumio' + ii" */}
                            <label className="custom-control-label"></label>
                          </div>
                        </div>

                        {/* <!-- Is Active --> */}
                        <div className="d-flex justify-content-between align-items-center fs-15px">
                          <div className="font-weight-normal">Is Active</div>
                          <div className="custom-control custom-switch custom-switch-lg">
                            <input
                              value={linkInfo.IsActive}
                              id={"isActive" + ii}
                              type="checkbox"
                              className="custom-control-input"
                            />
                            {/* [for]="'isActive' + ii" */}
                            <label className="custom-control-label"></label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-10px">
                          {!updatingLink[ii] ? (
                            <button
                              onClick={() => _updateExistingLink(ii)}
                              className="btn btn-warning btn-sm fs-15px"
                            >
                              Update Link
                            </button>
                          ) : (
                            <button
                              className="btn btn-warning btn-sm fs-15px"
                              disabled
                            >
                              Updating...
                            </button>
                          )}

                          <div className="pl-15px">
                            <span className="font-weight-bold">Stats:</span>
                            {linkInfo.Info.TotalReferrals} referral
                            {linkInfo.Info.TotalReferrals == 1 ? "" : "s"},
                            {nanosToUSD(
                              linkInfo.Info.TotalReferrerDeSoNanos,
                              2
                            )}{" "}
                            paid to referrals,
                            {nanosToUSD(
                              linkInfo.Info.TotalReferrerDeSoNanos,
                              2
                            )}{" "}
                            paid to referee
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}

      {activeTab === "Bulk CSV Upload" ? (
        <div className="fs-15px">
          <div className="w-100 d-flex justify-content-start py-10px pl-15px fs-15px fc-muted border-bottom border-color-grey light-grey-divider">
            Here you can download detailed CSV reports for the referral program
            and modify referral links en masse.
          </div>

          {/* <!-- Download --> */}
          <div className="p-15px font-weight-semibold">
            <div>Download a CSV with all referral links:</div>
            {!downloadingReferralCSV ? (
              <button
                onClick={() => _downloadReferralCSV()}
                className="btn btn-primary btn-sm font-weight-bold fs-15px mt-5px"
              >
                <i className="fas fa-download"></i>
                &nbsp;Download CSV
              </button>
            ) : (
              <button
                className="btn btn-primary btn-sm font-weight-bold fs-15px mt-5px"
                disabled
              >
                Downloading...
              </button>
            )}
          </div>

          {/* <!-- Upload --> */}
          <div
            className="p-15px font-weight-semibold"
            style={{ position: "relative" }}
          >
            <div>Upload a CSV of links to update or create:</div>
            <input
              onChange={(e) => _handleCSVInput(e.target.files)}
              className="file-upload-button"
              type="file"
              accept="text/csv"
              id="file"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                opacity: 0,
                cursor: "pointer",
                width: "130px",
                padding: 0,
              }}
            />
            {!uploadingReferralCSV ? (
              <button
                type="file"
                className="btn btn-warning fs-15px lh-15px p-10px mt-5px"
              >
                <i className="fas fa-upload"></i>
                &nbsp;Upload CSV
              </button>
            ) : (
              <button
                type="file"
                className="btn btn-warning fs-15px lh-15px p-10px mt-5px"
                disabled
              >
                Uploading...
              </button>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default ReferralProgramMGR;
