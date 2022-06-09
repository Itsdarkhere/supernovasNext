import { useEffect, useState } from "react";
import styles from "../../styles/Feed/feed.module.scss";
import {
  GetFollows,
  GetHotFeed,
  GetPostsStateless,
  GetStorage,
  stringifyError,
} from "../../utils/backendapi-context";
import {
  hasUserBlockedCreator,
  showAdminTools,
  _alertError,
} from "../../utils/global-context";
import { track4 } from "../../utils/mixpanel";
import { useAppDispatch, useAppSelector } from "../../utils/Redux/hooks";
import {
  setFollowFeedPosts,
  setHotFeedPosts,
  setPostsToShow,
  unShiftFollowFeedPosts,
  unShiftPostsToShow,
} from "../../utils/Redux/Slices/feedSlice";
import LoadingCard from "../NFT/NFTCard/loadingCard";
import NFTCard from "../NFT/NFTCard/nftCard";
import NFTCardPost from "../NFT/NFTPost/NFTCardPost";
import NFTCardRepost from "../NFT/NFTPost/NFTCardRepost";
import TabSelector from "../Reusables/tabSelector";
import CreatePost from "./createPost";
import FeedPost from "./feedPost";
import GLOBAL_TAB_ICON from "../../public/icons/feed_sn_icon.png";
import FOLLOWING_TAB_ICON from "../../public/icons/feed_following_icon.svg";
import HOT_TAB_ICON from "../../public/icons/hot_feed_icon.svg";
const Feed = ({ isMobile }) => {
  const GLOBAL_TAB = "Supernovas Feed";
  const FOLLOWING_TAB = "Following";
  const HOT_TAB = "Hot on Deso";

  let MIN_FOLLOWING_TO_SHOW_FOLLOW_FEED_BY_DEFAULT = 10;
  const NUM_TO_FETCH = 20;
  const [feedTabs, setFeedTabs] = useState([]);
  const [iconTabs, setIconTabs] = useState([]);

  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<string>(GLOBAL_TAB);
  const [isLoadingFollowingOnPageLoad, setIsLoadingFollowingOnPageLoad] =
    useState<boolean>(false);
  const [
    loadingFirstBatchOfGlobalFeedPosts,
    setLoadingFirstBatchOfGlobalFeedPosts,
  ] = useState(false);
  const [
    loadingFirstBatchOfFollowFeedPosts,
    setLoadingFirstBatchOfFollowFeedPosts,
  ] = useState(false);
  const [loadingFirstBatchOfHotFeedPosts, setLoadingFirstBatchOfHotFeedPosts] =
    useState(false);
  const [loadingFirstBatchOfDeSoPosts, setLoadingFirstBatchOfDeSoPosts] =
    useState(false);

  const [serverHasMoreFollowFeedPosts, setServerHasMoreFollowFeedPosts] =
    useState(true);
  const [serverHasMoreGlobalFeedPosts, setServerHasMoreGlobalFeedPosts] =
    useState(true);
  const [serverHasMoreDeSoFeedPosts, setServerHasMoreDeSoFeedPosts] =
    useState(true);
  const [switchingTabs, setSwitchingTabs] = useState(false);
  const [loadingMoreFollowFeedPosts, setLoadingMoreFollowFeedPosts] =
    useState(false);
  const [loadingMoreHotFeedPosts, setLoadingMoreHotFeedPosts] = useState(false);
  const [loadingMoreGlobalFeedPosts, setLoadingMoreGlobalFeedPosts] =
    useState(false);
  const [followedPublicKeyToProfileEntry, setFollowedPublicKeyToProfileEntry] =
    useState({});
  const [hotFeedPostHashes, setHotFeedPostHashes] = useState([]);
  const [canPost, setCanPost] = useState(false);
  // Redux
  let followFeedPosts = useAppSelector((state) => state.feed.followFeedPosts);
  let hotFeedPosts = useAppSelector((state) => state.feed.hotFeedPosts);
  let postsToShow = useAppSelector((state) => state.feed.postsToShow);
  let loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  let localNode = useAppSelector((state) => state.node.localNode);

  // Lifecycle methods
  useEffect(() => {
    initializeFeeds();
    // set title to feed in HEAD
  }, []);
  // Lifecycle methods end

  // Functions

  const initializeFeeds = () => {
    if (postsToShow.length === 0) {
      // Get some posts to show the user.
      setLoadingFirstBatchOfGlobalFeedPosts(true);
      _loadPosts();
    }

    const feedPromises = [];
    // Request the hot feed (so we have it ready for display if needed)
    if (hotFeedPosts.length === 0) {
      console.log("INIT HOT IN _initializeFeeds");
      setLoadingFirstBatchOfHotFeedPosts(true);
      _loadHotFeedPosts();
    }

    // Request the follow feed (so we have it ready for display if needed)
    if (followFeedPosts.length === 0) {
      console.log("INIT FOLLOWS PROMISE IN _initializeFeeds");
      setLoadingFirstBatchOfFollowFeedPosts(true);
      _reloadFollowFeed();
    }

    // if (feedPromises.length > 0) {
    //   Promise.all(feedPromises).then(() => {
    //     if (
    //       this.globalVars.hotFeedPosts.length > 0 &&
    //       this.globalVars.hotFeedPosts[0].IsPinned &&
    //       this.backendApi.GetStorage("dismissedPinnedPostHashHex") !== this.globalVars.hotFeedPosts[0].PostHashHex &&
    //       ((this.globalVars.followFeedPosts.length > 0 && !this.globalVars.followFeedPosts[0].IsPinned) ||
    //         this.globalVars.followFeedPosts.length === 0)
    //     ) {
    //       this.globalVars.followFeedPosts.unshift(this.globalVars.hotFeedPosts[0]);
    //     }
    //   });
    // }

    // The activeTab is set after we load the following based on whether the user is
    // already following anybody
    if (loggedInUser) {
      console.log("INIT FOLLOWS IN _initializeFeeds");
      _loadFollowing();
    } else {
      // If there's no user, consider the following to be loaded (it's empty)
      afterLoadingFollowingOnPageLoad();
    }
  };

  const _reloadFollowFeed = () => {
    // Reload the follow feed from scratch
    dispatch(setFollowFeedPosts([]));
    setLoadingFirstBatchOfFollowFeedPosts(true);
    return _loadFollowFeedPosts();
  };

  const _loadFollowing = () => {
    setIsLoadingFollowingOnPageLoad(true);
    GetFollows(
      localNode,
      "" /* username */,
      loggedInUser.PublicKeyBase58Check,
      false /* getEntriesFollowingPublicKey */
    )
      .subscribe(
        (response) => {
          setFollowedPublicKeyToProfileEntry(
            response.data.PublicKeyToProfileEntry
          );
        },
        (error) => {}
      )
      .add(() => {
        afterLoadingFollowingOnPageLoad();
      });
  };

  const afterLoadingFollowingOnPageLoad = () => {
    setIsLoadingFollowingOnPageLoad(false);

    // defaultActiveTab is "Following" if the user is following anybody. Otherwise
    // the default is global.
    let defaultActiveTab;
    const numFollowing = Object.keys(followedPublicKeyToProfileEntry).length;
    if (numFollowing >= MIN_FOLLOWING_TO_SHOW_FOLLOW_FEED_BY_DEFAULT) {
      defaultActiveTab = FOLLOWING_TAB;
    } else {
      defaultActiveTab = GLOBAL_TAB;
    }
    if (loggedInUser) {
      setFeedTabs([FOLLOWING_TAB, GLOBAL_TAB, HOT_TAB]);
      setIconTabs([FOLLOWING_TAB_ICON, GLOBAL_TAB_ICON, HOT_TAB_ICON]);
    } else {
      setFeedTabs([GLOBAL_TAB, HOT_TAB]);
      setIconTabs([GLOBAL_TAB_ICON, HOT_TAB_ICON]);
    }

    if (!activeTab) {
      setActiveTab(defaultActiveTab);
    }
    _handleTabClick(activeTab, true);
  };

  const showMoreButton = () => {
    if (loadingFirstBatchOfActiveTabPosts()) {
      return false;
    }

    if (activeTab === FOLLOWING_TAB) {
      return serverHasMoreFollowFeedPosts;
    } else if (activeTab === GLOBAL_TAB) {
      return serverHasMoreGlobalFeedPosts;
    } else {
      return serverHasMoreDeSoFeedPosts;
    }
  };

  const showGlobalOrFollowingOrHotPosts = () => {
    return (
      whichPostsToShow()?.length > 0 &&
      (activeTab === GLOBAL_TAB ||
        activeTab === FOLLOWING_TAB ||
        activeTab === HOT_TAB)
    );
  };

  const _handleTabClick = (tab: string, onLoad: boolean) => {
    if (activeTab == tab) {
      if (tab == FOLLOWING_TAB) {
        _loadFollowFeedPosts(true);
      } else if (tab == HOT_TAB) {
        _loadHotFeedPosts(true);
      } else {
        _loadPosts(true);
      }
      return;
    }

    setActiveTab(tab);
    // put back
    // router.navigate([], {
    //   relativeTo: this.route,
    //   queryParams: { feedTab: this.activeTab },
    //   queryParamsHandling: "merge",
    // });
    if (!onLoad) {
      _onTabSwitch();
    }
  };

  const activeTabReadyForDisplay = () => {
    // If we don't have the following yet, we don't even know which tab to display
    if (isLoadingFollowingOnPageLoad) {
      return false;
    }

    if (activeTab === FOLLOWING_TAB) {
      // No need to delay on the Following tab. It handles the "slow switching" issue itself.
      return loadingMoreFollowFeedPosts;
    } else if (activeTab === GLOBAL_TAB) {
      return loadingMoreGlobalFeedPosts;
    } else {
      return loadingMoreHotFeedPosts;
    }
  };

  const showNoPostsFound = () => {
    // activeTab == FeedComponent.GLOBAL_TAB && globalVars.postsToShow.length == 0 && !loadingPosts
    return (
      whichPostsToShow()?.length === 0 &&
      (activeTab === GLOBAL_TAB || activeTab === FOLLOWING_TAB) &&
      !loadingFirstBatchOfActiveTabPosts()
    );
  };

  const whichPostsToShow = () => {
    if (activeTab === FOLLOWING_TAB) {
      // No need to delay on the Following tab. It handles the "slow switching" issue itself.
      return followFeedPosts;
    } else if (activeTab === GLOBAL_TAB) {
      return postsToShow;
    } else if (activeTab === HOT_TAB) {
      return hotFeedPosts;
    }
  };

  const loadingFirstBatchOfActiveTabPosts = () => {
    if (activeTab === FOLLOWING_TAB) {
      console.log("1");
      return loadingFirstBatchOfFollowFeedPosts;
    } else if (activeTab === GLOBAL_TAB) {
      console.log("2");
      return loadingFirstBatchOfGlobalFeedPosts;
    } else {
      console.log("3");
      return loadingFirstBatchOfDeSoPosts;
    }
  };

  const showLoadingSpinner = () => {
    console.log(loadingFirstBatchOfActiveTabPosts());
    console.log(switchingTabs);
    return loadingFirstBatchOfActiveTabPosts() || switchingTabs;
  };

  const isRepost = (post: any): boolean => {
    return (
      post.Body === "" &&
      (!post.ImageURLs || post.ImageURLs?.length === 0) &&
      post.RepostedPostEntryResponse
    );
  };

  const handleTabClick = (tab: string, onLoad: boolean) => {
    if (activeTab == tab) {
      if (tab == FOLLOWING_TAB) {
        _loadFollowFeedPosts(true);
      } else if (tab == HOT_TAB) {
        _loadHotFeedPosts(true);
      } else {
        _loadPosts(true);
      }
      return;
    }
    setActiveTab(tab);
    // Put back
    // router.navigate([], {
    //   relativeTo: route,
    //   queryParams: { feedTab: activeTab },
    //   queryParamsHandling: "merge",
    // });
    if (!onLoad) {
      _onTabSwitch();
    }
  };

  const _onTabSwitch = () => {
    // Delay rendering the posts for a hot second so nav is fast.
    setSwitchingTabs(true);
    setTimeout(() => {
      setSwitchingTabs(false);
    }, 0);
  };

  const _loadFollowFeedPosts = (
    reload: boolean = false,
    scrolltop: boolean = false
  ) => {
    setLoadingMoreFollowFeedPosts(true);

    // Get the reader's public key for the request.
    let readerPubKey = "";
    if (loggedInUser) {
      readerPubKey = loggedInUser.PublicKeyBase58Check;
    }
    // Get the last post hash in case this is a "load more" request.
    let lastPostHash = "";
    if (followFeedPosts.length > 0 && !reload) {
      lastPostHash = followFeedPosts[followFeedPosts.length - 1].PostHashHex;
    }
    return GetPostsStateless(
      localNode,
      lastPostHash /*PostHash*/,
      readerPubKey /*ReaderPublicKeyBase58Check*/,
      "newest" /*OrderBy*/,
      parseInt("") /*StartTstampSecs*/,
      "",
      NUM_TO_FETCH /*NumToFetch*/,
      false /*FetchSubcomments*/,
      true /*GetPostsForFollowFeed*/,
      false /*GetPostsForGlobalWhitelist*/,
      false,
      false /*MediaRequired*/,
      0,
      showAdminTools() /*AddGlobalFeedBool*/
    ).subscribe({
      next: (res) => {
        console.log(res.PostsFound);
        if (lastPostHash !== "") {
          console.log(res.PostsFound);
          dispatch(
            setFollowFeedPosts(followFeedPosts.concat(res.data.PostsFound))
          );
        } else {
          dispatch(setFollowFeedPosts(res.data.PostsFound));
        }
        if (res.data.PostsFound.length < NUM_TO_FETCH) {
          setServerHasMoreFollowFeedPosts(false);
          // Note: the server may be out of posts even if res.PostsFond == NUM_TO_FETCH.
          // This can happen if the server returns the last NUM_TO_FETCH posts exactly.
          // In that case, the user will click the load more button one more time, and then
          // the server will return 0. Obviously this isn't great behavior, but hopefully
          // we'll swap out the load more button for infinite scroll soon anyway.
        }
        setLoadingFirstBatchOfFollowFeedPosts(false);
        setLoadingMoreFollowFeedPosts(false);
        if (scrolltop) {
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
      },
      error: (err) => {
        console.error(err);
        _alertError("Error loading posts: " + stringifyError(err));
      },
      complete: () => {
        setLoadingFirstBatchOfFollowFeedPosts(false);
        setLoadingMoreFollowFeedPosts(false);
      },
    });
  };

  const findParentPostIndex = (postsToShow, postEntryResponse) => {
    return postsToShow.findIndex((post) => {
      return post.PostHashHex === postEntryResponse.ParentStakeID;
    });
  };

  const prependPostToFeed = (postsToShow, postEntryResponse) => {
    dispatch(unShiftPostsToShow(postEntryResponse));
  };

  const _loadHotFeedPosts = (reload: boolean = false) => {
    setLoadingMoreHotFeedPosts(true);

    // Get the reader's public key for the request.
    let readerPubKey = "";
    if (loggedInUser) {
      readerPubKey = loggedInUser.PublicKeyBase58Check;
    }

    return GetHotFeed(
      localNode,
      readerPubKey,
      hotFeedPostHashes,
      NUM_TO_FETCH
    ).subscribe({
      next: (res) => {
        if (res.data.HotFeedPage) {
          dispatch(setHotFeedPosts(hotFeedPosts.concat(res.data.HotFeedPage)));
        }

        // Remove pinned post if it's been dismissed by the user
        if (
          hotFeedPosts.length > 0 &&
          hotFeedPosts[0].IsPinned &&
          GetStorage("dismissedPinnedPostHashHex") ===
            hotFeedPosts[0].PostHashHex
        ) {
          hotFeedPosts.shift();
          // If the follow feed was loaded prior to the hot feed and is missing a pinned post, add it here
        } else if (
          hotFeedPosts.length > 0 &&
          hotFeedPosts[0].IsPinned &&
          GetStorage("dismissedPinnedPostHashHex") !==
            hotFeedPosts[0].PostHashHex &&
          followFeedPosts.length > 0 &&
          !followFeedPosts[0].IsPinned
        ) {
          dispatch(unShiftFollowFeedPosts(hotFeedPosts[0]));
        }
        for (let ii = 0; ii < hotFeedPosts.length; ii++) {
          // Check works,,, might not
          setHotFeedPostHashes(
            hotFeedPostHashes.concat(hotFeedPosts[ii]?.PostHashHex)
          );
        }
      },
      error: (err) => {
        console.error(err);
        _alertError("Error loading posts: " + stringifyError(err));
      },
      complete: () => {
        setLoadingFirstBatchOfHotFeedPosts(false);
        setLoadingMoreHotFeedPosts(false);
      },
    });
  };

  const appendCommentAfterParentPost = (postsToShow, postEntryResponse) => {
    const parentPostIndex = findParentPostIndex(postsToShow, postEntryResponse);
    const parentPost = postsToShow[parentPostIndex];

    // Note: we don't worry about updating the grandparent posts' commentCount in the feed
    parentPost.CommentCount += 1;

    // This is a hack to make it so that the new comment shows up in the
    // feed with the "replying to @[parentPost.Username]" content displayed.
    postEntryResponse.parentPost = parentPost;

    // Insert the new comment in the correct place in the postsToShow list.
    // TODO: This doesn't work properly for comments on subcomments (they appear in the wrong
    // place in the list), but whatever, we can try to fix this edge case later
    postsToShow.splice(parentPostIndex + 1, 0, postEntryResponse);

    // Add the post to the parent's list of comments so that the comment count gets updated
    parentPost.Comments = parentPost.Comments || [];
    parentPost.Comments.unshift(postEntryResponse);
  };

  const changeCanPost = (canPost: boolean) => {
    setCanPost(canPost);
  };

  const userBlocked = () => {
    // put back ,, / find a way to do
    // this.cdr.detectChanges();
  };

  const _loadPosts = (reload: boolean = false, scrolltop: boolean = false) => {
    setLoadingMoreGlobalFeedPosts(true);

    track4("Viewed Feed");
    // Get the reader's public key for the request.
    let readerPubKey = "";
    if (loggedInUser) {
      readerPubKey = loggedInUser.PublicKeyBase58Check;
    }
    // Get the last post hash in case this is a "load more" request.
    let lastPostHash = "";
    if (postsToShow.length > 0 && !reload) {
      lastPostHash = postsToShow[postsToShow.length - 1].PostHashHex;
    }
    return GetPostsStateless(
      localNode,
      lastPostHash /*PostHash*/,
      readerPubKey /*ReaderPublicKeyBase58Check*/,
      "", // Blank orderBy so we don't sort twice
      parseInt("") /*StartTstampSecs*/,
      "",
      NUM_TO_FETCH /*NumToFetch*/,
      false /*FetchSubcomments*/,
      false /*GetPostsForFollowFeed*/,
      true /*GetPostsForGlobalWhitelist*/,
      false,
      false /*MediaRequired*/,
      0,
      showAdminTools() /*AddGlobalFeedBool*/
    ).subscribe({
      next: (res) => {
        console.log(res.data.PostsFound);
        if (lastPostHash !== "") {
          dispatch(setPostsToShow(postsToShow.concat(res.data.PostsFound)));
        } else {
          dispatch(setPostsToShow(res.data.PostsFound));
        }
        if (res.data.PostsFound.length < NUM_TO_FETCH - 1) {
          // I'm not sure what the expected behavior is for the global feed. It may sometimes
          // return less than NUM_TO_FETCH while there are still posts available (e.g. if posts
          // are deleted. I'm not sure so just commenting out for now.
          // We'll move to infinite scroll soon, so not sure this is worth fixing rn.
          // this.serverHasMoreGlobalFeedPosts = true
        }
        if (scrolltop) {
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        setLoadingFirstBatchOfGlobalFeedPosts(false);
        setLoadingMoreGlobalFeedPosts(false);
      },
    });
  };

  // Functions end
  return (
    <div className="d-flex flex-column">
      {!isMobile ? (
        <div>
          {loggedInUser ? (
            <div
              className={[
                "formbg create_post_wrapper",
                // canPost ? "active-box-shadow" : "",
              ].join(" ")}
            >
              <CreatePost
                parentPost={undefined}
                numberOfRowsInTextArea={2}
                // changeCanPost={(e) => changeCanPost(e)}
                // Put back
                postRefreshFunc={undefined}
              ></CreatePost>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="w-100 d-flex flex-center">
        {/* className="feed_tabs" */}
        <TabSelector
          tabs={feedTabs}
          icons={iconTabs}
          activeTab={activeTab}
          tabClick={(e) => handleTabClick(e, false)}
          extraTab={undefined}
        ></TabSelector>
      </div>

      {/* (click)="showRecent()" */}
      <button type="button" className="recent_post_btn">
        Show recent
      </button>
      {/* <!-- Posts --> */}

      {/* <!-- Show shimmer Loader Until page completely Load --> */}
      {showLoadingSpinner() ? (
        <div className="feed_mobile_gap mt-2">
          <div className="single-card">
            <div className="w-100">
              <div className="d-flex flex-column js-feed-post position-relative">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="nft-col-wrap">
                    <LoadingCard></LoadingCard>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {showGlobalOrFollowingOrHotPosts() ? (
        <div className="feed_mobile_gap">
          {/* *ngFor="let post of whichPostsToShow()" */}
          {whichPostsToShow().map((post, i) => (
            <div key={i}>
              {/* Dont show anything if null */}
              {post.ProfileEntryResponse ? (
                <div>
                  {/* The post.parentPost stuff is a hack to make it so that a new comment shows up
                    in the feed with the "replying to @[parentPost.Username]" content diplayed.
                    post.parentPost is set in appendCommentAfterParentPost */}
                  {/* if deso nft or eth nft */}

                  {post?.IsNFT || post?.PostExtraData?.isEthereumNFT ? (
                    <>
                      <div className="mobile_feed_post">
                        <NFTCardPost
                          post={post}
                          afterCommentCreatedCallback={() =>
                            appendCommentAfterParentPost(
                              whichPostsToShow(),
                              post
                            )
                          }
                          afterRepostCreatedCallback={() =>
                            prependPostToFeed(whichPostsToShow(), post)
                          }
                          parentPost={undefined}
                        >
                          <NFTCard
                            contentShouldLinkToThread={true}
                            pending={false}
                            post={post}
                            profileFeed={true}
                            hoverable={false}
                            insidePost={false}
                            marketplaceCard={false}
                            isQuotedCard={false}
                            showIconRow={false}
                            showQuotedContent={false}
                            loadProfile={false}
                            nftPost={true}
                            showThreadConnectionLine={false}
                            userBlocked={userBlocked()}
                            postDeleted={undefined}
                          ></NFTCard>
                        </NFTCardPost>
                      </div>
                    </>
                  ) : null}

                  {/* <!-- if repost and deso nft or eth nft --> */}

                  {isRepost(post) &&
                  (post.RepostedPostEntryResponse.IsNFT ||
                    post.RepostedPostEntryResponse.PostExtraData
                      ?.isEthereumNFT) ? (
                    <>
                      <div className="mobile_feed_post">
                        <NFTCardRepost
                          post={post}
                          afterCommentCreatedCallback={() =>
                            appendCommentAfterParentPost(
                              whichPostsToShow(),
                              post
                            )
                          }
                          afterRepostCreatedCallback={() =>
                            prependPostToFeed(whichPostsToShow(), post)
                          }
                          parentPost={undefined}
                        >
                          <NFTCard
                            contentShouldLinkToThread={true}
                            pending={false}
                            post={post}
                            profileFeed={true}
                            hoverable={false}
                            insidePost={false}
                            marketplaceCard={false}
                            isQuotedCard={false}
                            showIconRow={false}
                            showQuotedContent={false}
                            loadProfile={false}
                            nftPost={false}
                            showThreadConnectionLine={false}
                            userBlocked={userBlocked()}
                            postDeleted={false}
                          ></NFTCard>
                        </NFTCardRepost>
                      </div>
                    </>
                  ) : null}

                  {/* <!-- if not repost and deso nft or eth nft --> */}

                  {!isRepost(post) &&
                  (post?.RepostedPostEntryResponse?.IsNFT ||
                    post?.RepostedPostEntryResponse?.PostExtraData
                      ?.isEthereumNFT) ? (
                    <>
                      <FeedPost
                        contentShouldLinkToThread={true}
                        includePaddingOnPost={true}
                        post={post}
                        afterCommentCreatedCallback={() =>
                          appendCommentAfterParentPost(whichPostsToShow(), post)
                        }
                        afterRepostCreatedCallback={() =>
                          prependPostToFeed(whichPostsToShow(), post)
                        }
                        blocked={hasUserBlockedCreator(
                          loggedInUser?.ProfileEntryResponse
                            ?.PublicKeyBase58Check
                        )}
                        cardStyle={true}
                        showNFTDetails={true}
                        profileFeed={true}
                        userBlocked={userBlocked()}
                        showPostsShadow={true}
                      ></FeedPost>
                    </>
                  ) : null}

                  {/* <!-- if not deso nft and not eth nft, do a normal post --> */}

                  {!(post?.IsNFT || post?.RepostedPostEntryResponse?.IsNFT) &&
                  !(
                    post?.PostExtraData?.isEthereumNFT ||
                    post?.RepostedPostEntryResponse?.PostExtraData
                      ?.isEthereumNFT
                  ) ? (
                    <>
                      <FeedPost
                        contentShouldLinkToThread={true}
                        includePaddingOnPost={true}
                        post={post}
                        afterCommentCreatedCallback={() =>
                          appendCommentAfterParentPost(whichPostsToShow(), post)
                        }
                        afterRepostCreatedCallback={() =>
                          prependPostToFeed(whichPostsToShow(), post)
                        }
                        blocked={hasUserBlockedCreator(
                          loggedInUser?.ProfileEntryResponse
                            ?.PublicKeyBase58Check
                        )}
                        cardStyle={true}
                        showNFTDetails={true}
                        showInteractionDetails={false}
                        profileFeed={true}
                        userBlocked={userBlocked()}
                        showPostsShadow={true}
                      ></FeedPost>
                    </>
                  ) : null}
                </div>
              ) : null}
            </div>
          ))}

          {/* (click)="loadMorePosts()" */}
          {showMoreButton() ? (
            <div className="w-100 py-15px d-flex align-items-center justify-content-center cursor-pointer creator-leaderboard__load-more">
              {/* (click)="loadMorePosts()" */}
              {!activeTabReadyForDisplay() ? (
                <div className="fs-15px">Load More</div>
              ) : (
                <div className="fs-15px">Loading...</div>
              )}
            </div>
          ) : null}
        </div>
      ) : null}

      {showNoPostsFound() ? (
        <div
          className="d-flex flex-column align-items-center justify-content-center fc-muted fs-15px p-15px text-center"
          style={{ height: "400px" }}
        >
          <div>No posts yet</div>

          <div className="mt-10px">
            {/* [routerLink]="['/' + globalVars.RouteNames.BROWSE]"
            [queryParams]="{ feedTab: FeedComponent.GLOBAL_TAB }"
            queryParamsHandling="merge" */}
            <a className="">View the Supernovas feed</a>
            to find more people to follow
          </div>
        </div>
      ) : null}

      {/* //   <!-- SPACER FOR BOTTOM BAR ON MOBILE --> */}
      <div className="global__bottom-bar-mobile-height"></div>
      <div className="global__bottom-bar-mobile-height"></div>
    </div>
  );
};
export default Feed;
