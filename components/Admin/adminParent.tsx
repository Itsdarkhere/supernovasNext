import styles from "../../styles/Admin/adminParent.module.scss";
import {
  abbreviateNumber,
  convertTstampToDateOrTime,
  showAdminTools,
  showSuperAdminTools,
} from "../../utils/global-context";
import FeedPost from "../Feed/feedPost";
import TopBarMobileNavigation from "../Navigation/TopBarMobile/topBarMobileNavigation";
import TabSelector from "../Reusables/tabSelector";
import AdminJumio from "./adminJumio";
import AdminNodeAddFeed from "./adminNodeAddFee";
import AdminNodeFees from "./adminNodeFees";
import AdminTutorial from "./adminTutorial";
import AdminWyre from "./adminWyre";
import NetworkInfo from "./networkInfo";
import NFTDropMGR from "./nftDropMGR";
import ReferralProgramMGR from "./referralProgramMGR";

const AdminParent = () => {
  return (
    <>
      {/* *ngIf="globalVars.nodeInfo != null" */}
      <div>
        {/* <!-- Top Bar --> */}
        {!isMobile ? (
          <div className="global__top-bar__height d-flex align-items-center w-100 px-15px fs-18px font-weight-bold fc-default justify-content-between border-bottom border-color-grey">
            <div className="d-flex align-items-center">
              <TopBarMobileNavigation className="mr-15px d-lg-none d-inline-block"></TopBarMobileNavigation>
              Admin
            </div>
          </div>
        ) : null}

        {/* <!-- Selector --> */}
        <div className="fs-15px border-bottom border-color-grey">
          <div className="m-15px">
            {/* #rightBarSelect */}
            {/* */}
            <select
              onChange={(e) => _tabClicked(e)}
              value={activeTab}
              id="right-bar-chart-select"
              className="form-control w-100 fs-15px text-grey5 font-weight-bold cursor-pointer"
            >
              {adminTabs.map((option) => (
                <option
                  value={option}
                  className="fs-15px text-grey5 font-weight-bold"
                >
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* <!-- Post Whitelist Selector --> */}

        {activeTab == "Posts" && adminPosts.length != 0 && !loadingPosts ? (
          <div style={{ overflowY: "scroll" }} className="disable-scrollbars">
            <div className="w-100 d-flex justify-content-start py-10px pl-15px fs-15px fc-muted border-bottom border-color-grey light-grey-divider">
              Select posts below to show them in the featured feed.
            </div>
            <TabSelector
              tabs={adminPostTabs}
              activeTab={activePostTab}
              tabClick={(e) => _postTabClicked(e)}
              icons={null}
              extraTab={null}
            ></TabSelector>
            {activePostTab == POSTS_BY_DESO_TAB ? (
              <div
                className="w-100 px-15px py-5px fs-15px border-bottom border-color-grey d-flex"
                style={{ justifyContent: "flex-start", alignItems: "center" }}
              >
                <div>
                  {/* <mat-form-field appearance="fill" class="pb-0">
              <mat-label for="time-window" class="pr-10px mb-0" style="height: auto; vertical-align: middle">
              Time Window:
              </mat-label>
              {/* [(value)]="selectedTimeWindow" */}
                  {/* <mat-select id="time-window" style="height: auto; vertical-align: middle">
              {/* *ngFor="let timeWindow of timeWindowOptions | keyvalue" [value]="timeWindow.value" */}
                  {/* <mat-option>
                  { timeWindow.key }
              </mat-option>
              </mat-select>
              </mat-form-field> */}
                </div>
                <div className="p-15px">
                  <a
                    onClick={() => _searchPostsByDeSo()}
                    className="btn btn-primary"
                    style={{
                      verticalAlign: "middle",
                      float: "right",
                      textAlign: "center",
                    }}
                  >
                    Search
                  </a>
                </div>
              </div>
            ) : null}

            {searchingForPostsByDESO ? (
              <>{/* <simple-center-loader></simple-center-loader> */}</>
            ) : (
              <>
                {activePosts.map((post, ii) => (
                  <div key={ii}>
                    {post.ProfileEntryResponse ? (
                      <div className="border-bottom border-color-grey">
                        {/* <!--
                        The post.parentPost stuff is a hack to make it so that a new comment shows up
                        in the feed with the "replying to @[parentPost.Username]" content diplayed.
                        post.parentPost is set in appendCommentAfterParentPost
                        --> */}
                        <FeedPost
                          includePaddingOnPost={true}
                          post={post}
                          showIconRow={true}
                          showAdminRow={true}
                          showReplyingToContent={!!post.parentPost}
                          parentPost={post.parentPost}
                          contentShouldLinkToThread={false}
                          addToGlobalFeed={() => addToGlobalFeed(ii)}
                        ></FeedPost>
                      </div>
                    ) : null}
                  </div>
                ))}
              </>
            )}

            {!loadingPosts && activePostTab == "Posts" ? (
              <div
                onClick={() => _loadPosts()}
                className="w-100 py-15px d-flex align-items-center justify-content-center cursor-pointer creator-leaderboard__load-more"
              >
                {!loadingMore ? (
                  <div className="fs-15px">Load More</div>
                ) : (
                  <div className="fs-15px">Loading...</div>
                )}
              </div>
            ) : null}
          </div>
        ) : null}

        {activeTab == "Posts" && adminPosts.length == 0 && !loadingPosts ? (
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ height: "400px" }}
          >
            <div className="fc-muted fs-15px">No posts found.</div>
          </div>
        ) : null}

        {/* <simple-center-loader *ngIf="activeTab == 'Posts' && loadingPosts"></simple-center-loader> */}

        {/* <!-- Hot Feed --> */}
        {activeTab == "Hot Feed" ? (
          <div style={{ overflowY: "scroll" }} className="disable-scrollbars">
            {globalVars.showSuperAdminTools() ? (
              <div className="w-100 d-flex justify-content-start py-10px pl-15px fs-15px fc-muted border-bottom border-color-grey light-grey-divider">
                Update the hot feed algorithm by updating the values below.
              </div>
            ) : null}

            {/* <!-- Update HotFeed Interaction Cap (Super Admin Only) --> */}
            <div className="fs-15px font-weight-bold mt-15px mb-5px px-15px">
              Update Interaction Cap (max $DESO locked)
              <div className="d-flex align-items-center justify-content-between font-weight-normal mt-5px">
                <input
                  value={hotFeedInteractionCap}
                  type="number"
                  min={0}
                  className="form-control fs-15px lh-15px w-100"
                  placeholder="Enter new hot feed interaction cap."
                />
                {!updatingHotFeedInteractionCap ? (
                  <button
                    onClick={() => updateHotFeedInteractionCap()}
                    className="btn btn-outline-primary fs-15px ml-5px"
                    style={{ width: "fit-content" }}
                  >
                    Update
                  </button>
                ) : null}

                {updatingHotFeedInteractionCap ? (
                  <button
                    className="btn btn-dark fs-15px ml-5px"
                    style={{ width: "fit-content" }}
                    disabled
                  >
                    Updating...
                  </button>
                ) : null}
              </div>
            </div>

            {/* <!-- Update HotFeed Time Decay Blocks (Super Admin Only) --> */}
            <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
              Update Time Decay Blocks
              <div className="d-flex align-items-center justify-content-between font-weight-normal mt-5px">
                <input
                  value={hotFeedTimeDecayBlocks}
                  type="number"
                  min="0"
                  className="form-control fs-15px lh-15px w-100"
                  placeholder="Enter new hot feed time decay blocks."
                />

                {!updatingHotFeedTimeDecayBlocks ? (
                  <button
                    onClick={() => updateHotFeedTimeDecayBlocks()}
                    className="btn btn-outline-primary fs-15px ml-5px"
                    style={{ width: "fit-content" }}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="btn btn-dark fs-15px ml-5px"
                    style={{ width: "fit-content" }}
                    disabled
                  >
                    Updating...
                  </button>
                )}
              </div>
            </div>

            {/* <!-- Update HotFeed User Posts Multiplier (Super Admin Only) --> */}
            <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
              Update User Posts Multiplier
              <span className="font-weight-normal">
                (boost all of a user's posts)
              </span>
              <div className="d-flex align-items-center justify-content-between font-weight-normal mt-5px">
                <input
                  value={hotFeedUserForPostsMultiplier}
                  className="form-control fs-15px lh-15px w-100"
                  placeholder="Username"
                />
                <input
                  value={hotFeedUserPostsMultiplier}
                  type="number"
                  className="form-control fs-15px lh-15px w-100 ml-5px"
                  placeholder="Posts Multiplier"
                />

                {!updatingHotFeedUserPostsMultiplier ? (
                  <button
                    onClick={() => updateHotFeedUserPostsMultiplier()}
                    className="btn btn-outline-primary fs-15px ml-5px"
                    style={{ width: "fit-content" }}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="btn btn-dark fs-15px ml-5px"
                    style={{ width: "fit-content" }}
                    disabled
                  >
                    Updating...
                  </button>
                )}
              </div>
            </div>

            {/* <!-- Update HotFeed User Interaction Multiplier (Super Admin Only) --> */}
            <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
              Update User Interaction Multiplier
              <span className="font-weight-normal">
                (boost all of a user's interactions)
              </span>
              <div className="d-flex align-items-center justify-content-between font-weight-normal mt-5px">
                <input
                  value={hotFeedUserForInteractionMultiplier}
                  className="form-control fs-15px lh-15px w-100"
                  placeholder="Username"
                />

                <input
                  value={hotFeedUserInteractionMultiplier}
                  type="number"
                  className="form-control fs-15px lh-15px w-100 ml-5px"
                  placeholder="Interaction Multiplier"
                />
                {!updatingHotFeedUserInteractionMultiplier ? (
                  <button
                    onClick={() => updateHotFeedUserInteractionMultiplier()}
                    className="btn btn-outline-primary fs-15px ml-5px"
                    style={{ width: "fit-content" }}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="btn btn-dark fs-15px ml-5px"
                    style={{ width: "fit-content" }}
                    disabled
                  >
                    Updating...
                  </button>
                )}
              </div>
            </div>

            {/* <!-- Look Up HotFeed User Multipliers (Super Admin Only) --> */}
            <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
              <i className="fa fa-search"></i>
              &nbsp; Look Up User Interaction Multipliers
              <div className="d-flex align-items-center justify-content-between font-weight-normal mt-5px">
                <input
                  value={hotFeedUserForSearch}
                  className="form-control fs-15px lh-15px w-100"
                  placeholder="Username"
                />

                {!searchingHotFeedUserMultipliers ? (
                  <button
                    onClick={() => searchForHotFeedUserMultipliers()}
                    className="btn btn-outline-primary fs-15px ml-5px"
                    style={{ width: "fit-content" }}
                  >
                    Search
                  </button>
                ) : (
                  <button
                    className="btn btn-dark fs-15px ml-5px"
                    style={{ width: "fit-content" }}
                    disabled
                  >
                    Searching...
                  </button>
                )}
              </div>
            </div>
            {hotFeedUserSearchResults ? (
              <div className="px-15px pb-15px" style={{ whiteSpace: "pre" }}>
                {hotFeedUserSearchResults}
              </div>
            ) : null}

            <div className="w-100 d-flex justify-content-start py-10px pl-15px fs-15px fc-muted border-bottom border-color-grey light-grey-divider mb-5px">
              Select posts below to whitelist.
            </div>

            {loadingHotFeed && hotFeedPosts.length == 0 ? (
              <>
                {/* <simple-center-loader *ngIf="loadingHotFeed && hotFeedPosts.length == 0; else showHotFeed"></simple-center-loader> */}
              </>
            ) : (
              <>
                {hotFeedPosts.map((post, ii) => (
                  <div key={ii}>
                    {post.ProfileEntryResponse ? (
                      <div className="border-bottom border-color-grey">
                        {/* <!--
                      The post.parentPost stuff is a hack to make it so that a new comment shows up
                      in the feed with the "replying to @[parentPost.Username]" content diplayed.
                      post.parentPost is set in appendCommentAfterParentPost
                  --> */}
                        <FeedPost
                          includePaddingOnPost={true}
                          post={post}
                          showIconRow={true}
                          showAdminRow={true}
                          showReplyingToContent={!!post.parentPost}
                          parentPost={post.parentPost}
                          contentShouldLinkToThread={false}
                          addToGlobalFeed={addToGlobalFeed(ii)}
                        ></FeedPost>
                      </div>
                    ) : null}
                  </div>
                ))}
              </>
            )}

            {hotFeedPosts.length > 0 ? (
              <div
                onClick={() => _loadHotFeed()}
                className="w-100 py-15px d-flex align-items-center justify-content-center cursor-pointer creator-leaderboard__load-more"
              >
                {!loadingMoreHotFeed ? (
                  <div className="fs-15px">Load More</div>
                ) : (
                  <div className="fs-15px">Loading...</div>
                )}
              </div>
            ) : null}
          </div>
        ) : null}

        {/* <!-- Profile Banlisting --> */}
        {activeTab == "Profiles" ? (
          <div className="w-100 d-flex flex-column">
            <div className="w-100 d-flex justify-content-start py-10px pl-15px fs-15px fc-muted border-bottom border-color-grey light-grey-divider">
              ☠️ Use the controls below to remove profiles from the UI. Profiles
              that are "Banlisted" will be removed everywhere. Profiles that are
              "Restricted" will be selectively removed.
            </div>

            {/* <!-- BANLIST --> */}
            <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
              Remove everywhere:
              <div className="d-flex">
                <input
                  value={banlistPubKeyOrUsername}
                  className="form-control w-100 fs-15px lh-15px"
                  placeholder="Enter a username or public key."
                />
                {!submittingBanlistUpdate ? (
                  <button
                    onClick={() => updateProfileModerationLevel("banlist")}
                    className="btn btn-dark fs-15px ml-5px"
                    style={{ width: "150px" }}
                  >
                    Banlist
                  </button>
                ) : (
                  <button className="btn btn-dark fs-15px ml-5px" disabled>
                    Working...
                  </button>
                )}
              </div>
              {updateProfileSuccessType === "banlist" ? (
                <div
                  className="font-weight-normal fs-12px"
                  style={{ color: "green" }}
                >
                  <i className="far fa-check-circle"></i>
                  Successfully added user to banlist.
                </div>
              ) : null}
            </div>

            {/* <!-- RESTRICTED LIST --> */}
            <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
              Remove from leaderboards:
              <div className="d-flex">
                <input
                  value={restrictPubKeyOrUsername}
                  className="form-control w-100 fs-15px lh-15px"
                  placeholder="Enter a username or public key."
                />
                {!submittingRestrictUpdate ? (
                  <button
                    onClick={() => updateProfileModerationLevel("restrict")}
                    className="btn btn-secondary fs-15px ml-5px"
                    style="width: 150px; background-color: #606060 !important"
                  >
                    Restrict&nbsp;
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary fs-15px ml-5px"
                    style={{ backgroundColor: "#606060 !important" }}
                    disabled
                  >
                    Working...
                  </button>
                )}
              </div>
              {updateProfileSuccessType === "restrict" ? (
                <div
                  className="font-weight-normal fs-12px"
                  style={{ color: "green" }}
                >
                  <i className="far fa-check-circle"></i>
                  Successfully added user to restricted list.
                </div>
              ) : null}
            </div>

            {/* <!-- REMOVE RESTRICTIONS --> */}
            <div className="fs-15px font-weight-bold mt-15px px-15px pb-30px border-bottom border-color-grey">
              Remove from banlist and restricted list:
              <div className="d-flex">
                <input
                  value={unrestrictPubKeyOrUsername}
                  className="form-control w-100 fs-15px lh-15px"
                  placeholder="Enter a username or public key."
                />
                {!submittingUnrestrictUpdate ? (
                  <button
                    onClick={() => updateProfileModerationLevel("unrestrict")}
                    className="btn btn-danger fs-15px ml-5px border border-color-grey"
                    style={{ width: "150px" }}
                  >
                    Unrestrict
                  </button>
                ) : (
                  <button
                    className="btn btn-danger fs-15px ml-5px border border-color-grey"
                    disabled
                  >
                    Working...
                  </button>
                )}
              </div>
              {updateProfileSuccessType === "unrestrict" ? (
                <div
                  className="font-weight-normal fs-12px"
                  style={{ color: "green" }}
                >
                  <i className="far fa-check-circle"></i>
                  Successfully removed user from banlist and restricted list.
                </div>
              ) : null}
            </div>

            <div className="w-100 d-flex justify-content-start py-10px pl-15px fs-15px fc-muted border-bottom border-color-grey light-grey-divider">
              ⭐ Use the controls below to Grantlist profiles. Profiles that are
              Grantlisted will automatically have up to five of their posts
              added to the global feed per day.
            </div>

            {/* <!-- GRANTLIST --> */}
            <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
              Grantlist user:
              <div className="d-flex">
                <input
                  value={grantlistPubKeyOrUsername}
                  className="form-control w-100 fs-15px lh-15px"
                  placeholder="Enter a username or public key."
                />
                {/* *ngIf="!submittingGrantlistUpdate"
        (click)="grantlistClicked()" */}
                {!submittingGrantlistUpdate ? (
                  <button
                    onClick={() => grantlistClicked()}
                    className="btn-default btn-light fs-15px ml-5px border border-color-grey"
                    style={{ width: "150px" }}
                  >
                    Grantlist
                  </button>
                ) : (
                  <button
                    className="btn-default btn-light fs-15px ml-5px border border-color-grey"
                    disabled
                  >
                    Working...
                  </button>
                )}
              </div>
              {grantlistUpdateSuccess ? (
                <div
                  className="font-weight-normal fs-12px"
                  style={{ color: "green" }}
                >
                  <i className="far fa-check-circle"></i>
                  Successfully added user to grantlist.
                </div>
              ) : null}
            </div>

            {/* <!-- REMOVE FROM GRANTLIST --> */}
            <div className="fs-15px font-weight-bold mt-15px px-15px pb-30px border-bottom border-color-grey">
              Remove user from grantlist:
              <div className="d-flex">
                <input
                  value={ungrantlistPubKeyOrUsername}
                  className="form-control w-100 fs-15px lh-15px"
                  placeholder="Enter a username or public key."
                />
                {!submittingUngrantlistUpdate ? (
                  <button
                    onClick={() => ungrantlistClicked()}
                    className="btn-default btn-light fs-15px ml-5px border border-color-grey"
                    style={{ width: "150px" }}
                  >
                    <i className="far fa-times-circle"></i>
                    Remove
                  </button>
                ) : (
                  <button
                    className="btn-default btn-light fs-15px ml-5px border border-color-grey"
                    disabled
                  >
                    Working...
                  </button>
                )}
              </div>
              {ungrantlistUpdateSuccess ? (
                <div
                  className="font-weight-normal fs-12px"
                  style={{ color: "green" }}
                >
                  <i className="far fa-check-circle"></i>
                  Successfully removed user from grantlist.
                </div>
              ) : null}
            </div>

            <div className="w-100 d-flex justify-content-start py-10px pl-15px fs-15px fc-muted border-bottom border-color-grey light-grey-divider">
              📞 Enter a username or public key below to wipe their phone
              registration.
            </div>

            {/* <!-- Allow phone number re-registration --> */}
            <div className="fs-15px font-weight-bold mt-15px pb-30px px-15px border-bottom border-color-grey">
              Allow phone number re-registration:
              <div className="d-flex">
                <input
                  value={removePhonePubKeyorUsername}
                  className="form-control w-100 fs-15px lh-15px"
                  placeholder="Enter a username or public key."
                />
                {!submittingRemovePhone ? (
                  <button
                    onClick={() => submitRemovePhoneNumber()}
                    className="btn-default btn-light fs-15px ml-5px border border-color-grey"
                  >
                    Allow
                  </button>
                ) : (
                  <button
                    className="btn-default btn-light fs-15px ml-5px border border-color-grey"
                    disabled
                  >
                    Working...
                  </button>
                )}
              </div>
              {updateProfileSuccessType === "phone" ? (
                <div
                  className="font-weight-normal fs-12px"
                  style={{ color: "green" }}
                >
                  <i className="far fa-check-circle"></i>
                  Success.
                </div>
              ) : null}
            </div>

            <div className="w-100 d-flex justify-content-start py-10px pl-15px fs-15px fc-muted border-bottom border-color-grey light-grey-divider">
              🖥️ Dump banlist / grant list data.
            </div>

            {/* <!-- PUBLIC KEYS IN THE DB --> */}
            <div
              onClick={() => _toggleDbDetails()}
              className="fs-15px px-15px py-15px cursor-pointer"
            >
              {!dbDetailsOpen ? (
                <i className="fas fa-caret-right"></i>
              ) : (
                <i className="fas fa-caret-down"></i>
              )}

              <span className="ml-15px">
                {!dbDetailsLoading ? (
                  <span>See what's in global state</span>
                ) : (
                  <span>Loading...</span>
                )}
              </span>
              {dbDetailsOpen && !dbDetailsLoading ? (
                <div>
                  <div className="mt-15px mb-15px">
                    --- Returned
                    <span className="fc-blue">{userMetadataMapLength}</span>
                    UserMetadata entries ---
                  </div>
                  {/* *ngFor="let item of userMetadataMap | keyvalue: descOrder" ?? */}
                  {userMetadataMap.map((item, index) => (
                    <div key={index}>
                      <ul className="mb-5px">
                        <li>
                          {usernameMap[item.key] ? (
                            <span className="font-weight-bold fc-blue">
                              {usernameMap[item.key]}:
                            </span>
                          ) : null}

                          {item.key}
                          {item.username}
                          <ul>
                            <li>
                              RemoveEverywhere:
                              <span className="fc-blue">
                                {item.value.RemoveEverywhere}
                              </span>
                            </li>
                            <li>
                              RemoveFromLeaderboard:
                              <span className="fc-blue">
                                {item.value.RemoveFromLeaderboard}
                              </span>
                            </li>
                            <li>
                              GrantlistPosts:
                              <span className="fc-blue">
                                {item.value.WhitelistPosts}
                              </span>
                            </li>
                            <li>
                              JumioVerified:
                              <span className="fc-blue">
                                {item.value.JumioVerified}
                              </span>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="w-100 d-flex justify-content-start py-10px pl-15px fs-15px fc-muted border-bottom border-color-grey light-grey-divider">
              🚀 Get User Admin Data.
            </div>

            {/* <!-- Get User Admin Data --> */}
            <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
              Check Admin Data for Public Key:
              <div className="d-flex">
                <input
                  value={getUserAdminDataPublicKey}
                  className="form-control w-100 fs-15px lh-15px"
                  placeholder="Enter a public key."
                />
                {!submittingGetUserAdminData ? (
                  <button
                    onClick={() => getUserAdminDataClicked()}
                    className="btn-default btn-light fs-15px ml-5px border border-color-grey"
                    style={{ width: "150px" }}
                  >
                    Search
                  </button>
                ) : (
                  <button
                    className="btn-default btn-light fs-15px ml-5px border border-color-grey"
                    disabled
                  >
                    Working...
                  </button>
                )}
              </div>
              {getUserAdminDataResponse ? (
                <div className="font-weight-normal fs-12px">
                  <div className="admin__get-user-admin-data-line pt-15px">
                    <span>Username:</span>
                    {getUserAdminDataResponse.Username}
                  </div>
                  <div className="admin__get-user-admin-data-line pt-5px">
                    <span>Currently Verified:</span>
                    {getUserAdminDataResponse.IsVerified}
                  </div>
                  <div className="admin__get-user-admin-data-line pt-5px">
                    <span>Last Verifier:</span>
                    {getUserAdminDataResponse.LastVerifierPublicKey}
                  </div>
                  <div className="admin__get-user-admin-data-line pt-5px">
                    <span>Last Verify Remover:</span>
                    {getUserAdminDataResponse.LastVerifyRemoverPublicKey}
                  </div>
                  <div className="admin__get-user-admin-data-line pt-15px">
                    <span>Currently Grantlisted:</span>
                    {getUserAdminDataResponse.IsWhitelisted}
                  </div>
                  <div className="admin__get-user-admin-data-line pt-5px">
                    <span>Last Grantlister:</span>
                    {getUserAdminDataResponse.LastWhitelisterPublicKey}
                  </div>
                  <div className="admin__get-user-admin-data-line pt-5px">
                    <span>Last Grantlist Remover:</span>
                    {getUserAdminDataResponse.LastWhitelistRemoverPublicKey}
                  </div>
                  <div className="admin__get-user-admin-data-line pt-15px">
                    <span>Currently Restricted:</span>
                    {getUserAdminDataResponse.IsGraylisted}
                  </div>
                  <div className="admin__get-user-admin-data-line pt-5px">
                    <span>Last Restriction lister:</span>
                    {getUserAdminDataResponse.LastGraylisterPublicKey}
                  </div>
                  <div className="admin__get-user-admin-data-line pt-5px">
                    <span>Last Graylist Remover:</span>
                    {getUserAdminDataResponse.LastGraylistRemoverPublicKey}
                  </div>
                  <div className="admin__get-user-admin-data-line pt-15px">
                    <span>Currently Banlisted:</span>
                    {getUserAdminDataResponse.IsBlacklisted}
                  </div>
                  <div className="admin__get-user-admin-data-line pt-5px">
                    <span>Last Banlister:</span>
                    {getUserAdminDataResponse.LastBlacklisterPublicKey}
                  </div>
                  <div className="admin__get-user-admin-data-line pt-5px">
                    <span>Last Banlist Remover:</span>
                    {getUserAdminDataResponse.LastBlacklistRemoverPublicKey}
                  </div>
                  <div className="admin__get-user-admin-data-line pt-15px">
                    <span>PhoneNumber:</span>
                    {getUserAdminDataResponse.PhoneNumber}
                  </div>
                  <div className="admin__get-user-admin-data-line pt-5px">
                    <span>Email:</span>
                    {getUserAdminDataResponse.Email}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {/* <!-- Network Info --> */}
        {activeTab == "Network" ? (
          <div>
            <div className="w-100 d-flex justify-content-start py-10px pl-15px fs-15px fc-muted border-bottom border-color-grey light-grey-divider">
              See the state of your deso node below.
            </div>
            <NetworkInfo className="w-100"></NetworkInfo>
          </div>
        ) : null}

        {/* <!-- Mempool Info --> */}
        {activeTab == "Mempool" ? (
          <div
            className="w-100 d-flex flex-column disable-scrollbars"
            style={{ overflowY: "scroll" }}
          >
            className="w-100 d-flex justify-content-start py-10px pl-15px
            fs-15px fc-muted border-bottom border-color-grey light-grey-divider"
            See the state of your node's mempool below.
          </div>
        ) : null}

        <div className="px-15px py-30px border-bottom border-color-grey">
          <div className="container fs-15px">
            <div className="row no-gutters font-weight-bold border-bottom border-color-grey">
              <div className="col">Txn Type</div>
              <div className="col">Txn Count</div>
              <div className="col">Total Bytes</div>
            </div>
            {/* *ngFor="let row of mempoolSummaryStats | keyvalue" */}
            {mempoolSummaryStats.map((row, index) => (
              <div key={index} className="row no-gutters pt-5px">
                <div className="col">{row.key}</div>
                <div className="col">{row.value.Count}</div>
                <div className="col">{row.value.TotalBytes}</div>
              </div>
            ))}

            {mempoolTxnCount === 0 ? (
              <div className="d-flex py-15px font-italic fc-muted">
                Couldn't find any mempool transactions right now.
              </div>
            ) : null}

            <div className="row no-gutters font-weight-bold border-top border-color-grey mt-5px">
              <div className="col">Total</div>
              <div className="col">{mempoolTxnCount}</div>
              <div className="col">{mempoolTotalBytes}</div>
            </div>
          </div>
        </div>

        {!loadingNextBlockStats && nextBlockStats ? (
          <div className="w-100 p-30px fs-15px">
            <div className="font-weight-bold border-bottom border-color-grey">
              Next block template
            </div>
            <div className="pt-5px">
              {nextBlockStats.TxnCount} transaction
              {nextBlockStats.TxnCount > 1 ? <span>s</span> : null}
              expected to mine in the next block.
            </div>

            <div className="pt-15px font-weight-bold border-bottom border-color-grey">
              Next failing txn
              {nextBlockStats.FailingTxnMinutesSinceAdded ? (
                <span className="font-weight-normal">
                  (first seen{" "}
                  {abbreviateNumber(
                    nextBlockStats.FailingTxnMinutesSinceAdded,
                    2
                  )}{" "}
                  minutes ago)
                </span>
              ) : null}
            </div>
            <div
              className="mt-5px p-5px br-3px background-color-grey"
              style={{ overflowWrap: "anywhere" }}
            >
              {nextBlockStats.FailingTxnHash}
            </div>

            <div className="pt-15px font-weight-bold border-bottom border-color-grey">
              Next failing txn error
            </div>
            <div
              className="mt-5px p-5px br-3px background-color-grey"
              style="overflow-wrap: anywhere"
            >
              "{nextBlockStats.FailingTxnError}"
            </div>
          </div>
        ) : null}

        {!loadingNextBlockStats && !nextBlockStats ? (
          <div>Next block stats not available. Try refreshing.</div>
        ) : null}
        {loadingNextBlockStats ? <div>Loading...</div> : null}
      </div>

      {/* <!-- Tutorial --> */}
      {activeTab == "Tutorial" ? (
        <div
          className="w-100 d-flex flex-column disable-scrollbars"
          style={{ overflowY: "scroll" }}
        >
          <AdminTutorial></AdminTutorial>
        </div>
      ) : null}

      {/* <!-- NFTs --> */}
      {activeTab == "NFTs" ? (
        <div
          className="w-100 d-flex flex-column disable-scrollbars"
          style={{ overflowY: "scroll" }}
        >
          <NFTDropMGR></NFTDropMGR>
        </div>
      ) : null}

      {/* <!-- Referral Program --> */}
      {activeTab == "Referral Program" ? (
        <div
          className="w-100 h-100 d-flex flex-column disable-scrollbars"
          style={{ overflowY: "scroll", minHeight: "400px" }}
        >
          <ReferralProgramMGR></ReferralProgramMGR>
        </div>
      ) : null}

      {/* <!-- Super Info --> */}
      {activeTab == "Super" && globalVars.showSuperAdminTools() ? (
        <div
          className="w-100 d-flex flex-column disable-scrollbars"
          style={{ overflowY: "scroll" }}
        >
          <div className="w-100 d-flex justify-content-start py-10px pl-15px fs-15px fc-muted border-bottom border-color-grey light-grey-divider">
            Are you a super user? Welcome.
          </div>

          {/* <!-- Swap Identities--> */}
          <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
            Swap Identity (BE CAREFUL):
            <div className="d-flex mt-5px">
              <input
                value={swapIdentityFromUsernameOrPublicKey}
                className="form-control w-100 fs-15px lh-15px"
                placeholder="Enter a username or public key to transfer *FROM*"
              />
            </div>
            <div className="d-flex mt-5px">
              <input
                value={swapIdentityToUsernameOrPublicKey}
                className="form-control w-100 fs-15px lh-15px"
                placeholder="Enter a username or public key to transfer *TO*"
              />
            </div>
            <div className="d-flex mt-5px">
              {!submittingSwapIdentity ? (
                <button
                  onClick={() => swapIdentity()}
                  className="btn btn-outline-primary fs-15px"
                >
                  Swap Identities
                </button>
              ) : (
                <button className="btn btn-primary fs-15px" disabled>
                  Working...
                </button>
              )}
            </div>
          </div>
          {/* <!-- Change Username --> */}
          <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
            Change Username (BE CAREFUL):
            <div className="d-flex mt-5px">
              <input
                value={changeUsernamePublicKey}
                onChange={
                  ((searchedForPubKey = false),
                  (userMetadataToUpdate = null),
                  (userProfileEntryResponseToUpdate = null))
                }
                className="form-control w-100 fs-15px lh-15px"
                placeholder="Enter a public key"
              />
              <button
                onClick={() => getUserMetadata()}
                className="btn btn-outline-primary fs-15px ml-5px"
              >
                Get User
              </button>
            </div>
            {userMetadataToUpdate ? (
              <div className="d-flex mt-5px fs-12px fc-muted">
                <span>User Global Metadata</span>
                <ul>
                  {/* *ngFor="let item of userMetadataToUpdate | keyvalue" */}
                  {userMetadataToUpdate.map((item, index) => (
                    <li key={index}>
                      {item.key}: {item.value}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {userProfileEntryResponseToUpdate ? (
              <div className="d-flex mt-5px fs-12px fc-muted">
                <span>User Profile Entry</span>
                <ul>
                  {/* *ngFor="let item of userProfileEntryResponseToUpdate | keyvalue" */}
                  {userProfileEntryResponseToUpdate.map((item, index) => (
                    <li key={index}>
                      {item.key}: {item.value}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="d-flex mt-5px">
              <input
                value={usernameTarget}
                className="form-control w-100 fs-15px lh-15px"
                placeholder="Enter the username to which you want to assign the username of this public key"
              />
            </div>
            <div className="d-flex mt-5px">
              {!submittingUpdateUsername ? (
                <button
                  onClick={() => updateUsername()}
                  className="btn btn-outline-primary fs-15px"
                >
                  Update Username
                </button>
              ) : (
                <button className="btn btn-primary fs-15px" disabled>
                  Working...
                </button>
              )}
            </div>
          </div>
          {/* <!-- Reprocess Bitcoin Block --> */}
          <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
            Reprocess Bitcoin Block:
            <div className="d-flex mt-5px">
              <input
                value={bitcoinBlockHashOrHeight}
                className="form-control w-100 fs-15px lh-15px"
                placeholder="Enter a Bitcoin block hash or block height."
              />
              {!submittingReprocessRequest ? (
                <button
                  onClick={() => reprocessBitcoinBlock()}
                  className="btn btn-outline-primary fs-15px ml-5px"
                >
                  Reprocess Block
                </button>
              ) : (
                <button className="btn btn-primary fs-15px ml-5px" disabled>
                  Working...
                </button>
              )}
            </div>
          </div>
          {/* <!-- Reprocess Bitcoin Block --> */}
          <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
            Evict unmined Bitcoin txns:
            <div className="d-flex mt-5px">
              <input
                value={evictBitcoinTxnHashes}
                className="form-control w-100 fs-15px lh-15px"
                placeholder="Enter comma-separated Bitcoin txn hashes"
              />
              {!submittingEvictUnminedBitcoinTxns ? (
                <>
                  <button
                    onClick={() => evictBitcoinExchangeTxns(true)}
                    className="btn btn-outline-primary fs-15px ml-5px"
                  >
                    Test
                  </button>
                  <button
                    onClick={() => evictBitcoinExchangeTxns(false)}
                    className="btn btn-outline-primary fs-15px ml-5px"
                  >
                    Execute
                  </button>
                </>
              ) : (
                <button className="btn btn-primary fs-15px ml-5px" disabled>
                  Working...
                </button>
              )}
            </div>
          </div>

          {/* <!-- Update Global Params --> */}
          <div className="fs-15px font-weight-bold mt-15px mb-5px px-15px">
            Update Bitcoin to USD Price
            <div className="d-flex align-items-center justify-content-between font-weight-normal mt-5px">
              <input
                value={updateGlobalParamsValues.USDPerBitcoin}
                type="number"
                min="0"
                className="form-control fs-15px lh-15px w-100"
                placeholder="Enter current BTC price in USD."
              />
              {/*[ngStyle]="{ disabled: updatingGlobalParams }"*/}
              {!updatingUSDToBitcoin ? (
                <button
                  onClick={() => updateGlobalParamUSDPerBitcoin()}
                  className="btn btn-outline-primary fs-15px ml-5px"
                  style={{ width: "fit-content" }}
                >
                  Update
                </button>
              ) : (
                <button
                  className="btn btn-dark fs-15px ml-5px"
                  style={{ width: "fit-content" }}
                  disabled
                >
                  Updating...
                </button>
              )}
            </div>
          </div>

          <div className="fs-15px font-weight-bold mt-15px mb-5px px-15px">
            Create Profile Fee In DeSo
            <div className="d-flex align-items-center justify-content-between font-weight-normal mt-5px">
              <input
                value={updateGlobalParamsValues.CreateProfileFeeNanos}
                type="number"
                className="form-control fs-15px lh-15px w-100"
                style={{ width: "250px" }}
                min="0"
                placeholder="Set fee to create a profile"
              />
              {/*[ngStyle]="{ disabled: updatingGlobalParams }"*/}
              {!updatingCreateProfileFee ? (
                <button
                  onClick={() => updateGlobalParamCreateProfileFee()}
                  className="btn btn-outline-primary fs-15px ml-5px"
                  style={{ width: "fit-content" }}
                >
                  Update
                </button>
              ) : (
                <button
                  className="btn btn-dark fs-15px ml-5px"
                  style={{ width: "fit-content" }}
                  disabled
                >
                  Updating...
                </button>
              )}
            </div>
          </div>

          <div className="fs-15px font-weight-bold mt-15px mb-5px px-15px">
            Min. Network Fee Rate (nanos / kb)
            <div className="d-flex align-items-center justify-content-between font-weight-normal mt-5px">
              <input
                value={updateGlobalParamsValues.MinimumNetworkFeeNanosPerKB}
                type="number"
                min="0"
                className="form-control fs-15px lh-15px w-100"
                style={{ width: "250px" }}
                placeholder="Set minimum network fee per kb"
              />
              {/*[ngStyle]="{ disabled: updatingGlobalParams }*/}
              {!updatingMinimumNetworkFee ? (
                <button
                  onClick={() => updateGlobalParamMinimumNetworkFee()}
                  className="btn btn-outline-primary fs-15px ml-5px"
                  style={{ width: "fit-content" }}
                >
                  Update
                </button>
              ) : (
                <button
                  className="btn btn-dark fs-15px ml-5px"
                  style={{ width: "fit-content" }}
                  disabled
                >
                  Updating...
                </button>
              )}
            </div>
          </div>

          <div className="fs-15px font-weight-bold mt-15px mb-5px px-15px">
            Max Copies per NFT
            <div className="d-flex align-items-center justify-content-between font-weight-normal mt-5px">
              <input
                value={updateGlobalParamsValues.MaxCopiesPerNFT}
                type="number"
                min="0"
                className="form-control fs-15px lh-15px w-100"
                style={{ width: "250px" }}
                placeholder="Set max copies per NFT"
              />
              {/*[ngStyle]="{ disabled: updatingGlobalParams }"*/}
              {!updatingMaxCopiesPerNFT ? (
                <button
                  onClick={() => updateGlobalParamMaxCopiesPerNFT()}
                  className="btn btn-outline-primary fs-15px ml-5px"
                  style={{ width: "fit-content" }}
                >
                  Update
                </button>
              ) : (
                <button
                  className="btn btn-dark fs-15px ml-5px"
                  style={{ width: "fit-content" }}
                  disabled
                >
                  Updating...
                </button>
              )}
            </div>
          </div>

          <div className="fs-15px font-weight-bold mt-15px mb-5px px-15px">
            Create NFT Fee in DeSo
            <div className="d-flex align-items-center justify-content-between font-weight-normal mt-5px">
              <input
                value={updateGlobalParamsValues.CreateNFTFeeNanos}
                type="number"
                min="0"
                className="form-control fs-15px lh-15px w-100"
                style={{ width: "250px" }}
                placeholder="Set fee per copy of an NFT"
              />
              {/*[ngStyle]="{ disabled: updatingGlobalParams }"*/}
              {!updatingCreateNFTFeeNanos ? (
                <button
                  onClick={() => updateGlobalParamCreateNFTFeeNanos()}
                  className="btn btn-outline-primary fs-15px ml-5px"
                  style={{ width: "250px" }}
                >
                  Update
                </button>
              ) : (
                <button
                  className="btn btn-dark fs-15px ml-5px"
                  style={{ width: "fit-content" }}
                  disabled
                >
                  Updating...
                </button>
              )}
            </div>
          </div>

          {/* <!-- Verify User --> */}
          <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
            Grant Verification Badge:
            <div className="d-flex mt-5px">
              <input
                value={usernameToVerify}
                className="form-control w-100 fs-15px lh-15px"
                placeholder="Enter a username to verify."
              />
              {!submittingVerifyRequest ? (
                <button
                  onClick={() => grantVerificationBadge()}
                  className="btn btn-outline-primary fs-15px ml-5px"
                >
                  Verify
                </button>
              ) : (
                <button className="btn btn-primary fs-15px ml-5px" disabled>
                  Working...
                </button>
              )}
            </div>
          </div>

          {/* <!-- Remove Verification Badge --> */}
          <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
            Remove Verification Badge:
            <div className="d-flex mt-5px">
              <input
                value={usernameForWhomToRemoveVerification}
                className="form-control w-100 fs-15px lh-15px"
                placeholder="Enter a username from whom to remove verification."
              />
              {!submittingRemovalRequest ? (
                <button
                  onClick={() => RemoveVerification()}
                  className="btn btn-outline-primary fs-15px ml-5px"
                >
                  Remove
                </button>
              ) : (
                <button className="btn btn-primary fs-15px ml-5px" disabled>
                  Working...
                </button>
              )}
            </div>
          </div>

          <div className="fs-15px mt-15px mb-15px px-15px">
            {!loadingVerifiedUsers ? (
              <button
                onClick={() => _loadVerifiedUsers()}
                className="btn btn-outline-dark fs-15px"
              >
                (Load Verified Users)
              </button>
            ) : (
              <button className="btn btn-dark fs-15px" disabled>
                Loading...
              </button>
            )}
          </div>
          <div
            className="fs-15px mb-15px px-15px"
            style={{ overflowWrap: "break-word" }}
          >
            {verifiedUsers}
          </div>
          {/* <!-- Username Verification Audit Logs --> */}
          <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
            Get Username Verification Logs:
            <div className="d-flex mt-5px">
              <input
                value={usernameToFetchVerificationAuditLogs}
                className="form-control w-100 fs-15px lh-15px"
                placeholder="Enter a username."
              />
              {!loadingVerifiedUsersAuditLog ? (
                <button
                  onClick={() => _loadVerifiedUsersAuditLog()}
                  className="btn btn-outline-primary fs-15px ml-5px"
                >
                  Fetch
                </button>
              ) : (
                <button className="btn btn-primary fs-15px ml-5px" disabled>
                  Working...
                </button>
              )}
            </div>
          </div>

          {usernameVerificationAuditLogs.map((auditLog, index) => (
            <ul key={index}>
              <li className="fs-12px">
                Time: {convertTstampToDateOrTime(auditLog.TimestampNanos)}
              </li>
              <ul>
                <li className="fs-12px">
                  VerifierPubKey: {auditLog.VerifierPublicKeyBase58Check}
                </li>
                <li className="fs-12px">
                  VerifierUsername: {auditLog.VerifierUsername}
                </li>
                <li className="fs-12px">
                  VerificationRemoved: {auditLog.IsRemoval}
                </li>
              </ul>
            </ul>
          ))}

          {/* <!-- USD Cents Per DeSo Reserve Price  --> */}
          <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
            Update USD to DeSo Reserve Price ($)
            <div className="d-flex mt-5px">
              <input
                value={usdToDeSoReserveExchangeRate}
                className="form-control w-100 fs-15px lh-15px"
                placeholder="Enter the new USD to DeSo Reserve Exchange Rate"
                type="number"
              />
              {!submittingUSDToDeSoReserveExchangeRateUpdate ? (
                <button
                  onClick={() => updateUSDToDeSoReserveExchangeRate()}
                  className="btn btn-outline-primary fs-15px ml-5px"
                >
                  Update
                </button>
              ) : (
                <button className="btn btn-primary fs-15px ml-5px" disabled>
                  Working...
                </button>
              )}
            </div>
          </div>

          {/* <!-- Buy DeSo Fee Rate--> */}
          <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
            Update Buy DeSo Fee Rate (%)
            <div className="d-flex mt-5px">
              <input
                value={buyDeSoFeeRate}
                className="form-control w-100 fs-15px lh-15px"
                placeholder="Enter Buy DeSo Fee Rate"
                type="number"
              />
              {!submittingBuyDeSoFeeRate ? (
                <button
                  onClick={() => updateBuyDeSoFeeRate()}
                  className="btn btn-outline-primary fs-15px ml-5px"
                >
                  Update
                </button>
              ) : (
                <button className="btn btn-primary fs-15px ml-5px" disabled>
                  Working...
                </button>
              )}
            </div>
          </div>

          <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
            Remove nil posts from global feed:
            <div className="d-flex mt-5px">
              {!removingNilPosts ? (
                <button
                  onClick={() => _removeNilPosts()}
                  className="btn btn-outline-primary fs-15px ml-5px"
                >
                  Clean up!
                </button>
              ) : (
                <button className="btn btn-primary fs-15px ml-5px" disabled>
                  Working...
                </button>
              )}
            </div>
          </div>

          {/* <!-- Block user in discovery + marketplace, stops spam --> */}
          <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
            REMOVE USER FROM MARKETPLACE + DISCOVERY
            <div className="d-flex mt-5px">
              <input
                value={usernameToRemove}
                className="form-control w-100 fs-15px lh-15px"
                placeholder="Enter a username to verify."
              />
              {!submittingRemoveRequest ? (
                <button
                  onClick={() => removeUserFromMarketAndDiscovery()}
                  className="btn btn-outline-primary fs-15px ml-5px"
                >
                  Verify
                </button>
              ) : (
                <button className="btn btn-primary fs-15px ml-5px" disabled>
                  Working...
                </button>
              )}
            </div>
          </div>

          {/* <!-- Send message to a list of users --> */}
          <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
            <h1 className="fs-26px pl-10px">
              Send message to a list of public keys
            </h1>
            <div className="d-flex flex-column mt-20px">
              <label className="pl-10px">
                Public keys...
                <br />
                <br />
                BC1YLj2eX..., C1YLj2eX...
              </label>
              <textarea
                value={massMessagePks}
                className="massmessage-textarea"
              ></textarea>
              <label className="pl-10px mt-20px">Message...</label>
              <textarea
                value={massMessageContent}
                className="massmessage-textarea"
              ></textarea>
              <div className="d-flex flex-row flex-center-start">
                {!submittingRemoveRequest ? (
                  <button
                    onClick={() => sendMassMessage()}
                    className="btn black-rounded-button py-15px px-15px btn-outline-primary mt-20px fs-15px ml-5px"
                  >
                    Send messages...
                  </button>
                ) : (
                  <button className="btn btn-primary fs-15px ml-5px" disabled>
                    Sending message: {numberOfMessageBeingSent}...
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* <!-- Wyre Info --> */}
          {activeTab == "Wyre" ? (
            <div
              style={{ overflowY: "scroll" }}
              className="w-100 d-flex flex-column disable-scrollbars"
            >
              <AdminWyre></AdminWyre>
            </div>
          ) : null}

          {/* <!-- Jumio Info --> */}
          {activeTab == "Jumio" ? (
            <div
              className="w-100 d-flex flex-column"
              style={{ overflowY: "scroll" }}
            >
              <AdminJumio></AdminJumio>
            </div>
          ) : null}

          {/* <!-- Node Fees --> */}
          {activeTab == "Node Fees" ? (
            <div
              className="w-100 d-flex flex-column"
              style={{ overflowY: "scroll" }}
            >
              <AdminNodeFees></AdminNodeFees>
            </div>
          ) : null}
        </div>
      ) : null}
      {!showAdminTools() ||
      (activeTab == "Super" && !showSuperAdminTools()) ? (
        <div
          className="d-flex flex-column align-items-center justify-content-center p-15px font-italic"
          style={{ height: "600px" }}
        >
          Access denied.
        </div>
      ) : null}

      <div className="global__bottom-bar-mobile-height"></div>
      <div className="global__bottom-bar-mobile-height"></div>
    </>
  );
};
export default AdminParent;
