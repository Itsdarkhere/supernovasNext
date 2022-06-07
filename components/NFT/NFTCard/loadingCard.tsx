import styles from "../../../styles/NFT/NFTCard/loadingCard.module.scss";

const LoadingCard = () => {
  return (
    <div className={styles.card_body}>
      <div className={styles.card_shimmer}></div>
      <div className={styles.card_bottom_one}>Loading...</div>
      <div className={styles.card_bottom_two}></div>
    </div>
  );
};

export default LoadingCard;
