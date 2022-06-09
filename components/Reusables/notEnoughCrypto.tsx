import styles from "../../styles/Reusables/notEnoughCrypto.module.scss";

const NotEnoughCrypto = () => {
  return (
    <section className="not-enough-crypto">
      <div className="red-left-sec">
        <img src="/assets/icons/bubble_error_icon.svg" alt="bubble error" />
      </div>
      <div className="text-div">
        <label className="lbl-one">You don’t have enough crypto</label>
        <p className="p-one">
          Buy or transfer crypto to your wallet to continue.
        </p>
        <a
          className="lbl-two"
          href="https://www.coinbase.com/price/decentralized-social"
          target="_blank"
          rel="noreferrer"
        >
          Buy crypto
        </a>
      </div>
    </section>
  );
};
export default NotEnoughCrypto;
