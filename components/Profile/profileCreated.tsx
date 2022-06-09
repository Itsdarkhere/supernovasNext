import { useEffect, useState } from "react";
import styles from "../../styles/Profile/profileCreated.module.scss";
import {
  GetPostsForPublicKey,
  PostEntryResponse,
  SortETHMarketplace,
} from "../../utils/backendapi-context";
import {
  getPostContentHashHex,
  hasUserBlockedCreator,
  incrementCommentCount,
} from "../../utils/global-context";
import { useAppDispatch, useAppSelector } from "../../utils/Redux/hooks";
import { setIMXClient } from "../../utils/Redux/Slices/imxSlice";
import {
  concatToCreatedNFTsToShow,
  setCreatedNFTsToShow,
  setETHNFTsCreated,
} from "../../utils/Redux/Slices/profileSlice";
import { Link, ImmutableXClient } from "@imtbl/imx-sdk";
import _ from "lodash";
import NFTCard from "../NFT/NFTCard/nftCard";

const ProfileCreated = ({
  profile,
  showProfileAsReserved,
  afterCommentCreatedCallback,
  profileData,
}) => {
  const dispatch = useAppDispatch();
  const createdNFTsToShow = useAppSelector(
    (state) => state.profile.createdNFTsToShow
  );
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostEntryResponse[]>([]);
  let startIndex = 0;
  let endIndex = 10;

  // Redux
  let loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  let localNode = useAppSelector((state) => state.node.localNode);
  let imxWalletAddress = useAppSelector((state) => state.imx.imxWalletAddress);

  // Functions
  const profileBelongsToLoggedInUser = (): boolean => {
    return (
      loggedInUser?.ProfileEntryResponse &&
      loggedInUser.ProfileEntryResponse.PublicKeyBase58Check ===
        profile.PublicKeyBase58Check
    );
  };

  const getNFTs = () => {
    setIsLoading(true);
    return GetPostsForPublicKey(
      localNode,
      "",
      profile.Username,
      loggedInUser?.PublicKeyBase58Check,
      "",
      10000,
      false /*MediaRequired*/
    )
      .toPromise()
      .then((res) => {
        let tempPosts = res.Posts.filter(
          (post) => post.IsNFT && post.NumNFTCopiesBurned != post.NumNFTCopies
        );
        setPosts(tempPosts);
        dispatch(setCreatedNFTsToShow(tempPosts.slice(startIndex, endIndex)));

        //   get created eth NFTs
        if (profileData["ETHPublicKey"] !== "") {
          imxWalletAddress = profileData["ETHPublicKey"];
          getCreatedNFTs();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //   get created eth NFTs for logged in wallet
  async function getCreatedNFTs() {
    dispatch(setETHNFTsCreated([]));

    const publicApiUrl: string = process.env.NEXT_PUBLIC_MAINNET_ENV_URL ?? "";
    const tempIMXClient = await ImmutableXClient.build({ publicApiUrl });
    dispatch(setIMXClient(tempIMXClient));

    const options = { method: "GET", headers: { Accept: "application/json" } };

    let createdNFTs = await fetch(
      `${process.env.NEXT_PUBLIC_MAINNET_ENV_URL}/mints?user=${imxWalletAddress}&token_address=${process.env.NEXT_PUBLIC_TOKEN_ADDRESS}`,
      options
    );

    createdNFTs = await createdNFTs.json();
    console.log(createdNFTs);

    let createdNFTsLength = createdNFTs["result"].length;
    let createdNFTsArr = [];

    for (var i = 0; i < createdNFTsLength; i++) {
      createdNFTsArr.push(
        createdNFTs["result"][i]["token"]["data"]["token_id"]
      );
    }

    SortETHMarketplace(
      localNode,
      loggedInUser?.PublicKeyBase58Check,
      createdNFTsArr,
      "all",
      "most recent first",
      "all"
    ).subscribe({
      next: (res) => {
        console.log(res);
        let ethNFTsCreated = res["PostEntryResponse"];
        dispatch(setETHNFTsCreated(res["PostEntryResponse"]));
        dispatch(concatToCreatedNFTsToShow(ethNFTsCreated));
        // Put back
        // createdNFTsToShow.sort((a, b) => b.TimestampNanos - a.TimestampNanos);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  async function _prependComment(uiPostParent, index, newComment) {
    const uiPostParentHashHex = getPostContentHashHex(uiPostParent);
    await this.datasource.adapter.relax();
    await this.datasource.adapter.update({
      predicate: ({ $index, data, element }) => {
        let currentPost = data as any as PostEntryResponse;
        if ($index === index) {
          newComment.parentPost = currentPost;
          currentPost.Comments = currentPost.Comments || [];
          currentPost.Comments.unshift(_.cloneDeep(newComment));
          return [incrementCommentCount(currentPost)];
        } else if (getPostContentHashHex(currentPost) === uiPostParentHashHex) {
          // We also want to increment the comment count on any other notifications related to the same post hash hex.
          return [incrementCommentCount(currentPost)];
        }
        // Leave all other items in the datasource as is.
        return true;
      },
    });
  }

  // Lifecycle methods
  useEffect(() => {
    getNFTs();
  });

  return (
    <>
      {/* <simple-center-loader [height]="200" *ngIf="isLoading"></simple-center-loader> */}
      {/* *ngIf="!isLoading" */}
      <div className="fs-15px text-grey5 font-weight-bold d-flex flex-column pt-15px"></div>
      {!showProfileAsReserved && !posts?.length && !isLoading ? (
        <div className="pt-15px">
          <div
            className="background-color-grey p-35px br-12px d-flex flex-row align-items-center"
            style={{ textAlign: "center" }}
          >
            {profileBelongsToLoggedInUser() ? (
              <span>No NFTs created yet.</span>
            ) : (
              <span>@{profile.Username} has not created any NFTs yet.</span>
            )}
          </div>
        </div>
      ) : null}

      {!showProfileAsReserved ? (
        <div>
          {!hasUserBlockedCreator(profile.PublicKeyBase58Check) &&
          posts?.length > 0 ? (
            <div>
              {/* infiniteScroll
            infiniteScrollDistance="5"
            infiniteScrollThrottle="150"
            scrolled="onScroll()" */}
              <div className="search-results w-100">
                <div className="nfts-card-list">
                  {createdNFTsToShow.map((post, index) => (
                    <div key={index} className="nft-col-wrap">
                      <div className="market-card-container">
                        {/* *ngIf="post" */}
                        <NFTCard
                          marketplaceCard={true}
                          contentShouldLinkToThread={true}
                          loadProfile={true}
                          includePaddingOnPost={true}
                          post={post}
                          afterCommentCreatedCallback={_prependComment.bind(
                            this,
                            post,
                            index
                          )}
                          blocked={hasUserBlockedCreator(
                            profile.PublicKeyBase58Check
                          )}
                          showNFTDetails={true}
                          showExpandedNFTDetails={false}
                          setBorder={true}
                          showAvailableSerialNumbers={true}
                          cardStyle={true}
                          profilePublicKeyBase58Check={
                            profile.PublicKeyBase58Check
                          }
                          userBlocked={userBlocked()}
                        ></NFTCard>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default ProfileCreated;
