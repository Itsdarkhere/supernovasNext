import { propTypes } from "react-bootstrap/esm/Image";
import styles from "../../styles/Discovery/creatorSection.module.scss";
import CreatorCard from "../Reusables/creatorCard";

const CreatorSection = ({ loading, userData, localNode, dataToShowExtra }) => {
  // Functions
  // Calculates how many cards fit per row
  const getCardsPerRow = () => {
    let windowWidth = 1000;
    if (typeof window !== "undefined") {
      windowWidth = window.innerWidth;
    }
    if (windowWidth <= 992 || windowWidth >= 1400) {
      return 8;
    } else if (windowWidth > 1060) {
      return 6;
    } else {
      return 4;
    }
  };

  const counter = () => {
    return new Array(getCardsPerRow());
  };
  // Functions end
  return (
    <>
      <div className={styles.creatorSectionDesktop}>
        {loading ? (
          <div className={styles.nfts_card_list}>
            {counter().map((i) => (
              <div key={i} className={styles.nft_col_wrap}>
                <div className={styles.market_card_container}>
                  {/* <loading-shimmer [tabType]="'MARKETPLACE'"></loading-shimmer> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className={styles.creator_card_list_discovery}>
              {userData?.map((user, i) => (
                <div key={i} className={styles.nft_col_wrap}>
                  <CreatorCard
                    localNode={localNode}
                    username={user}
                    extraUserNames={dataToShowExtra}
                  ></CreatorCard>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className={styles.creatorSectionMobile + " disable-scrollbars"}>
        {loading ? (
          <>
            {counter().map((i) => (
              <div key={i} style={{ paddingTop: "10px", paddingLeft: "5px" }}>
                <div className="card">
                  {/* <loading-shimmer [tabType]="'MARKETPLACE'"></loading-shimmer> */}
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {userData?.map((user, i) => (
              <div key={i} style={{ paddingTop: "10px", paddingLeft: "5px" }}>
                <CreatorCard
                    extraUserNames={dataToShowExtra}
                    localNode={localNode}
                    username={user}
                ></CreatorCard>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default CreatorSection;
