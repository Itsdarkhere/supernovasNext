import styles from "../../styles/Discovery/sectionTitle.module.scss";
import chevronRightIcon from "../../public/icons/chevron_right.svg";
import Image from "next/image";

const SectionTitle = ({ title, viewAll, whatAllToShow, routeViewAll }) => {
  // Dom manipulation
  const showViewAll = () => {
    if (viewAll) {
      return (
        <button
          className={styles.discovery_link}
          onClick={() => routeViewAll(whatAllToShow)}
        >
          View all
          <Image height={"50px"} alt="arrow right" src={chevronRightIcon} />
        </button>
      );
    }
  };
  // Dom manipulation end
  return (
    <div className={styles.section_title_wrapper}>
      <div className={styles.discovery_header_box}>
        <h2 id={title}>{title}</h2>
      </div>
      {showViewAll()}
    </div>
  );
};
export default SectionTitle;
