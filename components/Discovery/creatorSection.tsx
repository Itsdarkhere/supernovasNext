import styles from "../../styles/Discovery/creatorSection.module.scss";

const CreatorSection = ({ loading, userData }) => {
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
      {/* *ngIf="!mobile" */}
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
                  {/*<app-creator-card
                    [username]="username"
                    [sizeSmall]="false"
                    [extraUserNames]="discoveryExtraUserArray"
                ></app-creator-card>*/}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {/* *ngIf="mobile" */}
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
                {/*<app-creator-card
              [username]="user"
              [extraUserNames]="discoveryExtraUserArray"
              [sizeSmall]="false"
            ></app-creator-card>*/}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default CreatorSection;
