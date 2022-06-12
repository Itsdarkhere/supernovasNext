const GreyPriceSet = () => {
  return (
    <div className="grey-price-set">
      <span>
        <p className="p-one">{{ price }}</p>
      </span>
      <label>
        <img src="/assets/icons/ethlogo_grey.svg" alt="Ethereum logo" />
        Ethereum
      </label>
    </div>
  );
};
export default GreyPriceSet;
