import styles from "../styles/nftCard.module.scss";

// This component is used to show the topBar of a nftPost on any feed
const NFTPostTopBar = () => {
  {
    /**ngIf="!postContent.IsHidden && nftPost"*/
  }
  return (
    <div className="card-header nft-post-top">
      <div className="profile-img">
        {/* [avatar]="postContent.ProfileEntryResponse.PublicKeyBase58Check"
      [routerLink]="['/' + globalVars.RouteNames.USER_PREFIX, postContent.ProfileEntryResponse.Username]" */}
        <a
        // queryParamsHandling="merge"
        ></a>
        {/* *ngIf="showThreadConnectionLine" */}
        <div className="feed-post__parent-thread-connector"></div>
      </div>
      {/* [routerLink]="['/' + globalVars.RouteNames.USER_PREFIX, postContent.ProfileEntryResponse.Username]" */}
      <h6
        className="cursor-pointer"
        //queryParamsHandling="merge"
      >
        {/* {{ postContent.ProfileEntryResponse.Username }} */}
        {/* *ngIf="postContent.ProfileEntryResponse.IsVerified" */}
        <i className="fas fa-check-circle fa-md text-primary"></i>
      </h6>
      <div className="value-buy-cover"></div>
      {/* <feed-post-dropdown
    class="ml-auto"
    post="post"
    postContent="postContent"
    nftEntryResponses="nftEntryResponses"
    postHidden="hidePost()"
    userBlocked="blockUser()"
    toggleGlobalFeed="_addPostToGlobalFeed($event)"
    togglePostPin="_pinPostToGlobalFeed($event)"
  ></feed-post-dropdown> */}
    </div>
  );
};
export default NFTPostTopBar;
