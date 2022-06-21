import styles from "../../styles/Discovery/bottomButtons.module.scss";
import Link from "next/link";
import { RouteNames } from "../../utils/backendapi-context";

const BottomButtons = () => {
  return (
    <div className={styles.bb_wrapper}>
      <Link href={"/" + RouteNames.TRENDS}>
        <button className={styles.discovery_bottom_box}>
          <label className={styles.bb_label}>Explore all NFTs</label>
          <p className={styles.bb_p}>
            Filter and sort all DeSo NFTs on the marketplace.
          </p>
        </button>
      </Link>
      <Link href={"/" + RouteNames.BROWSE}>
        <button className={styles.discovery_bottom_box}>
          <label className={styles.bb_label}>Check the chatter on Feed</label>
          <p className={styles.bb_p}>
            Join the conversation on the Supernovas feed.
          </p>
        </button>
      </Link>
    </div>
  );
};
export default BottomButtons;
