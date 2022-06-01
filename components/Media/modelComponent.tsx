import styles from "../../styles/Media/model.module.scss";
import "@google/model-viewer";
import { useState } from "react";

const ModelComponent = ({ postModelArweaveSrc }) => {
  // State
  const [completelyLoaded, setCompletelyLoaded] = useState(false);
  // State end

  // Functions
  const loaded = (event) => {
    if (event.detail.totalProgress == 1) {
      setCompletelyLoaded(true);
    }
  };
  // Functions end

  // Dom manipulation
  const showShimmerUntilLoaded = () => {
    if (!completelyLoaded) {
      return (
        <div className="js-feed-post w-100 position-relative">
          {/*<loading-shimmer [tabType]="'POST'"></loading-shimmer>*/}
        </div>
      );
    }
  };
  // Dom manipulation end

  //   [ngClass]="{ visible: completelyLoaded }"
  return (
    <>
      {/* <model-viewer
    src="/Astronaut.glb"
    ios-src=""
    poster="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b%2Fposter-astronaut.png?v=1599079951717"
    alt="A 3D model of an astronaut"
    shadow-intensity="1"
    camera-controls
    auto-rotate
    ar
  ></model-viewer> */}
      {showShimmerUntilLoaded()}
    </>
  );
};

export default ModelComponent;
