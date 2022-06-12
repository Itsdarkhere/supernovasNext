import { useEffect, useState } from "react";
import styles from "../../styles/Wrappers/page.module.scss";
import Header from "../Navigation/header";
import LeftNav from "../Navigation/leftNav";
import { isMobile } from "../../utils/global-context";
import BottomBarMobile from "../Navigation/bottomBarMobile";
import LeftNavMobile from "../Navigation/leftNavMobile";

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
      className={[
        styles.position_relative,
        styles.page_main_wrapper,
        mobile ? "global__mobile" : "global__desktop",
        isNFTProfile ? styles.nft_profile : "",
      ].join(" ")}
    >
      <Header></Header>
      <div
        className={[
          styles.m_inner_wrapper,
          styles.end,
          noCap ? styles.noCap : null,
        ].join(" ")}
      >
        {getNav()}
        {mobile ? <LeftNavMobile></LeftNavMobile> : null}
        <div className={"w-100"}>{children}</div>
        {mobile && !noBottomBar ? (
          <BottomBarMobile showPostButton={showPostButton}></BottomBarMobile>
        ) : null}
      </div>
    </div>
  );
};
export default Page;
