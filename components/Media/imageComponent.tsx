import styles from "../../styles/Media/image.module.scss";
import Image from "next/image";
import { useState } from "react";

const ImageComponent = ({ imageSrc }) => {
  // State
  const [completelyLoaded, setCompletelyLoaded] = useState(false);
  // State end

  // Functions
  const mapImageURLs = (imgURL: string): string => {
    if (
      imgURL.startsWith("https://arweave.net/") ||
      imgURL.includes(".arweave.net")
    ) {
      // Build cloudflare imageString
      imgURL =
        "https://supernovas.app/cdn-cgi/image/width=800,height=800,fit=scale-down,quality=90/" +
        imgURL;
    }
    return imgURL;
  };

  const loaded = () => {
    var image = document.getElementById("post-image") as HTMLImageElement;
    var isLoaded = image.complete && image.naturalHeight !== 0;
    if (isLoaded) {
      setCompletelyLoaded(true);
    }
  };

  const useNormalImage = (imgURL) => {
    let image = document.getElementById("post-image") as HTMLImageElement;
    image.src = imgURL;
  };

  const openImgModal = (event, imageURL) => {
    event.stopPropagation();
    // this.modalService.show(FeedPostImageModalComponent, {
    //   class: "modal-dialog-centered img_popups modal-lg",
    //   initialState: {
    //     imageURL,
    //   },
    //   animated: false,
    // });
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
      <Image
        id="post-image"
        //onError={() => useNormalImage(imageSrc)}
        onLoad={() => loaded()}
        onClick={(e) => openImgModal(e, imageSrc)}
        width={500}
        height={500}
        data-toggle="modal"
        className={[
          styles.hideBeforeLoad,
          completelyLoaded ? styles.visible : "",
        ].join(" ")}
        src={mapImageURLs(imageSrc)}
        alt="nft post image"
      />
      {showShimmerUntilLoaded()}
    </>
  );
};

export default ImageComponent;
