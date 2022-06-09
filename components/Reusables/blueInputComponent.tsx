import styles from "../../styles/Reusables/blueInputComponent.module.scss";

const BlueInputComponent = () => {
  return (
    <div className="blue-input">
      {/* [(ngModel)]="model"
    [disabled]="disabled"
    (ngModelChange)="onModelChange($event)" */}
      <input
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
