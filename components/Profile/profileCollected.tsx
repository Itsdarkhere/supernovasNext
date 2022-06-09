import { useState } from "react";
import { Subscription } from "rxjs";
import styles from "../../styles/Profile/profileCollected.module.scss";
import {
  GetNFTsForUser,
  NFTEntryResponse,
  PostEntryResponse,
} from "../../utils/backendapi-context";
import {
  getPostContentHashHex,
  hasUserBlockedCreator,
  incrementCommentCount,
} from "../../utils/global-context";
import { useAppDispatch, useAppSelector } from "../../utils/Redux/hooks";
import NFTCard from "../NFT/NFTCard/nftCard";
import Avatar from "../Reusables/avatar";

const ProfileCollected = ({ showProfileAsReserved, profile }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [collectedNFTsToShow, setCollectedNFTsToShow] = useState([]);
  const [nftResponse, setNftResponse] = useState<
    {
      NFTEntryResponses: NFTEntryResponse[];
      PostEntryResponse: PostEntryResponse;
    }[]
  >([]);
  const [dataToShow, setDataToShow] = useState<
    {
      NFTEntryResponses: NFTEntryResponse[];
      PostEntryResponse: PostEntryResponse;
    }[]
  >([]);
  const PAGE_SIZE = 10;
  let lastPage = null;
  let startIndex = 0;
  let endIndex = 10;

  // Redux
  const dispatch = useAppDispatch();
  let loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  let localNode = useAppSelector((state) => state.node.localNode);

  const profileBelongsToLoggedInUser = (): boolean => {
    return (
      loggedInUser?.ProfileEntryResponse &&
      loggedInUser.ProfileEntryResponse.PublicKeyBase58Check ===
        profile.PublicKeyBase58Check
    );
  };

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

  const getNFTs = (isForSale: boolean | null = null): Subscription => {
    setIsLoading(true);
    return GetNFTsForUser(
      localNode,
      profile.PublicKeyBase58Check,
      loggedInUser?.PublicKeyBase58Check,
      isForSale
    ).subscribe(
      (res: {
        NFTsMap: {
          [k: string]: {
            PostEntryResponse: PostEntryResponse;
            NFTEntryResponses: NFTEntryResponse[];
          };
        };
      }) => {
        let tempNFTResponse = [];
        for (const k in res.NFTsMap) {
          const responseElement = res.NFTsMap[k];
          if (
            res.NFTsMap[k].PostEntryResponse.PosterPublicKeyBase58Check !=
              profile.PublicKeyBase58Check &&
            !responseElement.NFTEntryResponses[0].IsPending
          ) {
            tempNFTResponse.push(responseElement);
          }
        }
        let dataToShow = tempNFTResponse.slice(startIndex, endIndex);
        setNftResponse(tempNFTResponse);
        lastPage = Math.floor(nftResponse.length / PAGE_SIZE);

        dataToShow.forEach((nftEntry) => {
          if (nftEntry) {
            collectedNFTsToShow.push(nftEntry);
          }
        });

        setIsLoading(false);
        return nftResponse;
      }
    );
  };

  return (
    <>
      {/* <!-- Posts --> */}
      {/* <simple-center-loader [height]="200" *ngIf="isLoading"></simple-center-loader> */}
      {!isLoading ? (
        <div className="fs-15px text-grey5 font-weight-bold d-flex flex-column pt-15px"></div>
      ) : null}
      {!showProfileAsReserved && !nftResponse?.length && !isLoading ? (
        <div className="pt-15px">
          <div
            className="background-color-grey p-35px br-12px d-flex flex-row align-items-center"
            style={{ textAlign: "center" }}
          >
            {profileBelongsToLoggedInUser() ? (
              <span>No NFTs collected yet.</span>
            ) : (
              <span>@{profile.Username} has not acquired any NFTs yet.</span>
            )}
          </div>
        </div>
      ) : null}

      {!showProfileAsReserved ? (
        <div>
          {!hasUserBlockedCreator(profile.PublicKeyBase58Check) &&
          nftResponse?.length > 0 ? (
            <div>
              {/* infiniteScroll
            infiniteScrollDistance="5"
            infiniteScrollThrottle="150"
            scrolled="onScroll()" */}
              <div className="search-results w-100">
                <div className="nfts-card-list">
                  {collectedNFTsToShow.map((post, index) => (
                    <div key={index} className="nft-col-wrap">
                      <div className="market-card-container">
                        {post.PostEntryResponse ? (
                          <NFTCard
                            marketplaceCard={true}
                            contentShouldLinkToThread={true}
                            includePaddingOnPost={true}
                            post={post.PostEntryResponse}
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
                        ) : null}
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

export default ProfileCollected;
