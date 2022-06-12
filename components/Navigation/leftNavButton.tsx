import styles from "../../styles/Navigation/leftNavButton.module.scss";
import Image from "next/image";
import { useAppSelector } from "../../utils/Redux/hooks";
import Link from "next/link";
const LeftNavButton = ({ hasNotifications, link, imgSrc, label }) => {
  // Redux
  const messageResponse = useAppSelector(
    (state) => state.messages.messageResponse
  );
  // Redux end

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
    // [routerLinkActive]="['active'] rewrite in react"
    <Link href={link}>
      <button className={styles.icon + " position-relative"}>
        <Image src={imgSrc} layout="fixed" alt="left bar icon" />
        {showNotification()}
        <label className={styles.lb_button_label}>{label}</label>
      </button>
    </Link>
  );
};
export default LeftNavButton;
