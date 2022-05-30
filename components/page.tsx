import { useEffect, useState } from "react";
import styles from "../styles/page.module.scss";
import Header from "./header";
import LeftNav from "./leftNav";
import { isMobile } from "../utils/global-context";

const Page = ({ children, isNFTProfile, noCap }) => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobileBasedOnViewport();

    window.addEventListener("resize", setMobileBasedOnViewport, false);
  }, []);

  const setMobileBasedOnViewport = () => {
    setMobile(isMobile());
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
        {/* *ngIf="!mobile" */}
        <LeftNav></LeftNav>
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
