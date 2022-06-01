import styles from "../styles/nftCard.module.scss";

// This component holds all unavailable states of the nft card
// Such as all copies burned, post is hidden etc...
const NFTCardUnavailable = () => {
  return (
    <>
      {/* *ngIf="post.IsHidden" */}
      <div className="p-10px br-30px background-color-grey d-flex align-items-center justify-content-center fs-15px">
        {/* [routerLink]="['/' + globalVars.RouteNames.POSTS, post.PostHashHex]" 
        (click)="onPostClicked($event)"
        queryParamsHandling="merge"*/}
        <a className="link--unstyled">This post was removed by the author.</a>
      </div>

      {/* <!-- Posts are burned --> */}
      {/* *ngIf="allCopiesBurned()" */}
      <div className="p-15px background-color-grey d-flex align-items-center justify-content-center fs-15px">
        {/* [routerLink]="['/' + globalVars.RouteNames.USER_PREFIX, post.ProfileEntryResponse?.Username]" 
          queryParamsHandling="merge"*/}
        <a className="link--unstyled" style={{ textAlign: "center" }}>
          All copies of the NFT have been burned...
        </a>
      </div>
      {/* *ngIf="globalVars.hasUserBlockedCreator(post.PosterPublicKeyBase58Check)" */}
      <div className="p-15px background-color-grey d-flex align-items-center justify-content-center fs-15px">
        {/* [routerLink]="[
          '/' + globalVars.RouteNames.USER_PREFIX,
          loadProfile ? this.creatorProfile?.Username : postContent.ProfileEntryResponse?.Username
          ]" 
          queryParamsHandling="merge"
          */}
        <a className="link--unstyled" style={{ textAlign: "center" }}>
          This is a post from
          {/* {{ loadProfile ? this.creatorProfile?.Username : postContent.ProfileEntryResponse?.Username }} who you have
            blocked. Click here to visit their profile to unblock them. */}
        </a>
      </div>
    </>
  );
};
export default NFTCardUnavailable;
