import { useEffect, useState } from "react";
import styles from "../../styles/Wrappers/page.module.scss";
import Header from "../Navigation/header";
import LeftNav from "../Navigation/leftNav";
import { isMobile } from "../../utils/global-context";

const Page = ({ children, isNFTProfile, noCap }) => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const setMobileBasedOnViewport = () => {
      setMobile(isMobile());
    };

    setMobileBasedOnViewport();

    window.addEventListener("resize", setMobileBasedOnViewport, false);
  }, []);

  const getNav = () => {
    if (!mobile) {
      return <LeftNav></LeftNav>;
    }
    return null;
  };

  return (
    <div
      className={
        styles.position_relative +
        " " +
        styles.page_main_wrapper +
        `${mobile ? " global__mobile" : " global__desktop"}` +
        `${isNFTProfile ? " nft_profile" : ""}`
      }
    >
      <Header></Header>
      <div
        className={
          styles.m_inner_wrapper + " " + styles.end + `${noCap ? " noCap" : ""}`
        }
      >
        {getNav()}
        {/* *ngIf="mobile" */}
        {/* <left-bar-mobile></left-bar-mobile> */}
        <div className={"w-100"}>{children}</div>
        {/* *ngIf="mobile && !noBottomBar" */}
        {/* <bottom-bar-mobile
            class="global__bottom-bar-mobile scrolled"
            [showPostButton]="showPostButton"
            ></bottom-bar-mobile> */}
      </div>
    </div>
  );
};
export default Page;
