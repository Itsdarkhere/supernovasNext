import styles from "../styles/tabSelector.module.scss";
import Image from "next/image";

const TabSelector = ({ tabClick, tabs, icons, extraTab, activeTab }) => {
  const getIcon = (index: number) => {
    if (icons !== null) {
      return <Image src={icons[index]} className="mr-5px" alt="tab icon" />;
    }
    return null;
  };

  return (
    <div className={styles.tab_selector_wrapper + " disable-scrollbars"}>
      <div className={styles.tab_round_box + " cursor-pointer"}>
        {/* Check works ,,, not sure is tabClick works */}
        {tabs.map((tab: string, i: number) => (
          <div
            key={i}
            className={styles.tabs_column_list_inner}
            onClick={() => tabClick(tab)}
          >
            <div
              className={[
                styles.tab_selector_button,
                tab === activeTab
                  ? "fc-default " + styles.tab_selector_box_active
                  : styles.tab_selector_box_inactive,
              ].join(" ")}
            >
              {/* *ngIf="icons" */}
              {getIcon(i)}
              {tab}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TabSelector;
