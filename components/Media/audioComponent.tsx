import styles from "../../styles/Media/audio.module.scss";
import { useState } from "react";
import Image from "next/image";
import AudioPlayer from "./audioPlayer";

const AudioComponent = ({ imageSrc, songName, creator, audioSrc }) => {
  // State
  const [completelyLoaded, setCompletelyLoaded] = useState(false);
  // State end

  // Functions
  // If image errors, use image straight from link
  const useNormalImage = (imgURL: string) => {
    let image = document.getElementById("post-image") as HTMLImageElement;
    image.src = imgURL;
  };

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

  const openImgModal = (event, imageURL) => {
    event.stopPropagation();
    // Put back
    // this.modalService.show(FeedPostImageModalComponent, {
    //   class: "modal-dialog-centered img_popups modal-lg",
    //   initialState: {
    //     imageURL,
    //   },
    //   animated: false,
    // });
  };

  const loaded = () => {
    var image = document.getElementById("audio-image") as HTMLImageElement;
    var isLoaded = image.complete && image.naturalHeight !== 0;
    if (isLoaded) {
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

  return (
    <>
      <div
        className={[
          styles.hideBeforeLoad,
          "w-100",
          completelyLoaded ? styles.visible : "",
        ].join(" ")}
      >
        <div className="w-100 d-flex flex-center">
          <Image
            onClick={(e) => openImgModal(e, imageSrc)}
            onError={() => useNormalImage(imageSrc)}
            onLoad={() => loaded()}
            height={"100%"}
            alt="Audio banner image"
            id="audio-image"
            data-toggle="modal"
            className={styles.nft_profile_audio_image}
            src={mapImageURLs(imageSrc)}
          />
        </div>
        <AudioPlayer
          songName={songName}
          creator={creator}
          audioSrc={audioSrc}
        ></AudioPlayer>
      </div>
      {showShimmerUntilLoaded()}
    </>
  );
};

export default AudioComponent;
