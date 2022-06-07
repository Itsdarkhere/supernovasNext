import styles from "../../../styles/Mint/rightOneTwoEth.module.scss";

const RightOneTwoEth = () => {
  // <!--  LEFT SIDE DESKTOP STEPS 1 - 2-->
  return (
    <div className="mint-page-image-container d-flex flex-column flex-center">
      {/* <!-- ALLOW IF ARWEAVE PROBLEMS --> */}
      {/* *ngIf="false" */}
      <div className="mint-warning-box">
        <label className="mb-0px font-weight-semiboldn">
          Arweave network is experiencing issues, content might take a few
          minutes until its visible
        </label>
      </div>
      {/* *ngIf="!postImageArweaveSrc" */}
      <label className="mb-0px illuminate-color pr-20px pl-20px text-align-center">
        Illuminate the digital universe with your imagination.
        <br />
        And never stop.
      </label>
      {/* *ngIf="postImageArweaveSrc" */}
      <div className="mint-page__image-container m-w-80">
        {/* (click)="postImageArweaveSrc = null" */}
        <i className="icon-close feed-post__image-delete"></i>
        <img
          className="feed-post__image br-0px"
          src="{ postImageArweaveSrc }"
        />
      </div>
    </div>
  );
};
export default RightOneTwoEth;
