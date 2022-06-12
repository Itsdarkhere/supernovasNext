import styles from "../../styles/Reusables/blueInputComponent.module.scss";

const BlueInputComponent = () => {
  return (
    <div className="blue-input">
      <input
        value={model}
        disabled={disabled}
        onChange={(e) => onModelChange(e)}
        matInput
        type="number"
        min="0"
        aria-describedby="clout-label"
        placeholder="0.00"
      />
      <label>
        <img src="/assets/deso/desologo_white.png" alt="deso logo white" />
        Deso
      </label>
    </div>
  );
};
export default BlueInputComponent;
