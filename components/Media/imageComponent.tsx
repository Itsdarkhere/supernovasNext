import styles from "../../styles/Media/image.module.scss";
import Image from "next/image";
import { useState } from "react";

const ImageComponent = ({ imageSrc }) => {
  // State
  const [completelyLoaded, setCompletelyLoaded] = useState(false);
  // State end

  // Functions
  const mapImageURLs = (imgURL: string): string => {
    if (imgURL.startsWith("https://i.imgur.com")) {
      return imgURL.replace(
        "https://i.imgur.com",
        "https://images.bitclout.com/i.imgur.com"
      );
    } else if (imgURL.startsWith("https://arweave.net/")) {
      // Build cloudflare imageString
      imgURL =
        "https://supernovas.app/cdn-cgi/image/width=800,height=800,fit=scale-down,quality=90/" +
        imgURL;
    }
    return imgURL;
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
      {/* (click)="openImgModal($event, imageSrc)"
  [ngClass]="{ visible: completelyLoaded }"
  (error)="useNormalImage(imageSrc)"
  (load)="loaded()" 
  id="post-image"*/}
      <Image
        data-toggle="modal"
        className={styles.hideBeforeLoad}
        src={mapImageURLs(imageSrc)}
        alt="nft post image"
      />
      {showShimmerUntilLoaded()}
    </>
  );
};

export default ImageComponent;
