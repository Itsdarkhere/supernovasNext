import styles from "../../styles/Discovery/bottomButtons.module.scss";

const BottomButtons = () => {
  return (
    <div className={styles.bb_wrapper}>
      {/* [routerLink]="'/' + this.globalVars.RouteNames.TRENDS"*/}
      <button className={styles.discovery_bottom_box}>
        <label className={styles.bb_label}>
          Explore all NFTs
        </label>
        <p className={styles.bb_p}>
          Filter and sort all DeSo NFTs on the marketplace.
        </p>
      </button>
      {/* [routerLink]="'/' + this.globalVars.RouteNames.BROWSE"*/}
      <button className={styles.discovery_bottom_box}>
        <label className={styles.bb_label}>
          Check the chatter on Feed
        </label>
        <p className={styles.bb_p}>
          Join the conversation on the Supernovas feed.
        </p>
      </button>
    </div>
  );
};
export default BottomButtons;
