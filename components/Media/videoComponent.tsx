import styles from "../../styles/Media/video.module.scss";
import { useState } from "react";

const VideoComponent = ({ videoSrc }) => {
  // State
  const [completelyLoaded, setCompletelyLoaded] = useState(false);
  // State end

  // Functions
  const onVideoLoaded = () => {
    setCompletelyLoaded(true);
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
  return (
    <>
      <video
        src={videoSrc}
        onLoadedData={() => onVideoLoaded()}
        controls
        className={[
          styles.hideBeforeLoad,
          "w-100 br-5px cursor-pointer",
          loaded ? styles.visible : "",
        ].join(" ")}
      ></video>
      {showShimmerUntilLoaded()}
    </>
  );
};

export default VideoComponent;
