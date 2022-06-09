import styles from "../../styles/Reusables/bluePriceSetComponent.module.scss";

const BluePriceSetComponent = () => {
  return (
    <div className="blue-price-set">
      <span>
        <p className="p-one">{globalVars.nanosToDeSo(priceNanos, 3)}</p>
        <p className="p-two">{globalVars.nanosToUSD(priceNanos, 3)}</p>
      </span>
      <label>
        <img src="/assets/deso/desologo_white.png" alt="deso logo white" />
        DeSo
      </label>
    </div>
  );
};
export default BluePriceSetComponent;
