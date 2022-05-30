import styles from "../styles/leftNavButton.module.scss";
import Image from "next/image";
import { messageResponse } from "../utils/global-context";
const LeftNavButton = ({ hasNotifications, link, imgSrc, label }) => {
  const showNotification = () => {
    if (
      hasNotifications &&
      messageResponse &&
      messageResponse.NumberOfUnreadThreads != 0
    ) {
      return (
        <div className="notification">
          {messageResponse.NumberOfUnreadThreads > 999
            ? "999+"
            : messageResponse.NumberOfUnreadThreads}
        </div>
      );
    }
    return null;
  };
  return (
    // [routerLink]="[link]" [routerLinkActive]="['active'] rewrite in react"
    <button className={styles.icon + " position-relative"}>
      <Image src={imgSrc} layout="fixed" alt="left bar icon" />
      {showNotification()}
      <label className={styles.lb_button_label}>{label}</label>
    </button>
  );
};
export default LeftNavButton;
