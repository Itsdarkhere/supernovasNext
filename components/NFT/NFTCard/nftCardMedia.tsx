import styles from "../../../styles/NFT/NFTCard/nftCard.module.scss";
import Image from "next/image";
import videoIcon from "../../../public/icons/video-type-white.svg";
import smallAudioIcon from "../../../public/icons/audio-play-small.svg";
import musicIcon from "../../../public/icons/music-type-white.svg";
import { transformVideoURL } from "../../../utils/sanitizeVideoURL";

// This component holds all the media of an nftCard
// Image, video, iframe ...
const NFTCardMedia = ({
  postContent,
  constructedEmbedURL,
  isQuotedCard,
  showAudioTypeIcon,
  imageURL,
}) => {
  // Dom manipulation
  const showAudioIcon = () => {
    if (showAudioTypeIcon) {
      return (
        <Image
          width={"100%"}
          height={"100%"}
          className={styles.card_audio_icon}
          src={musicIcon}
          alt="icon"
        />
      );
    } else {
      return (
        <div className={styles.audio_icon_hover_state}>
          <Image
            width={"100%"}
            height={"100%"}
            className="mr-5px"
            src={smallAudioIcon}
            alt="audio icon small"
          />
          <p>PLAY AUDIO</p>
        </div>
      );
    }
  };
  // Dom manipulation end

  return (
    <>
      <div
        className={[
          styles.img_cover,
          isQuotedCard ? styles.change_height_img_cover : "",
        ].join(" ")}
      >
        {/* <!-- Audio Media -->*/}
        {postContent?.PostExtraData?.arweaveAudioSrc ? (
          <div
            className={
              styles.card_audio_icon_container + " pointer-events-none"
            }
          >
            {showAudioIcon()}
          </div>
        ) : null}

        {/*  was post.ParentStakeID */}
        {!postContent?.ParentStakeID && imageURL ? (
          <Image
            layout="fill"
            objectFit="cover"
            alt="nft image"
            className={styles.card_img}
            id="nft-card-image"
            onMouseEnter={() => activateOnHoverAudio(false)}
            onMouseLeave={() => activateOnHoverAudio(true)}
            onError={() => useNormalImage()}
            data-toggle="modal"
            src={imageURL}
          />
        ) : null}

        {/*  Video starts here  */}
        {/*  was post.ParentStakeID */}
        {!postContent?.ImageURLs &&
        postContent?.PostExtraData?.arweaveVideoSrc &&
        !postContent.ParentStakeID ? (
          <div className={styles.video_nft_container + " overflow-hidden"}>
            <div
              className={[
                styles.card_video_icon_container,
                !showVideoTypeIcon ? styles.opacity_0 : "",
              ].join(" ")}
            >
              <Image
                width={"50%"}
                className={styles.card_video_icon}
                src={videoIcon}
                alt="icon"
              />
            </div>
            <video
              id="video-nft-1"
              onMouseEnter={(e) => activateOnHover(e, true)}
              onMouseLeave={(e) => activateOnHover(e, false)}
              loop
              //muted="'muted'"
              muted
              className={styles.video_tag_arweave}
              preload="metadata"
              src={postContent.PostExtraData.arweaveVideoSrc + "#t=0.001"}
            ></video>
          </div>
        ) : null}

        {/* Video from google */}
        {postContent?.VideoURLs &&
        postContent?.VideoURLs[0] &&
        !postContent?.ParentStakeID &&
        !postContent?.PostExtraData?.arweaveVideoSrc ? (
          <iframe
            allowFullScreen
            src={
              transformVideoURL(postContent.VideoURLs[0])
                ? postContent.VideoURLs[0]
                : ""
            }
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            className={styles.video_tag}
          ></iframe>
        ) : null}

        {/* Embeds, twitch, youtube etc */}
        {/* frameborder="0"*/}
        {/* Check works ,,, used to have 'max-width': getEmbedWidth(constructedEmbedURL)
        but that class does not exist */}
        {/* put back ,,, src used to have | sanitizeVideoUrl */}
        {constructedEmbedURL ? (
          <iframe
            allowFullScreen
            id="embed-iframe"
            height="getEmbedHeight()"
            className={styles.video_tag}
            src={constructedEmbedURL}
            allow="picture-in-picture; clipboard-write; encrypted-media; gyroscope; accelerometer; encrypted-media;"
          ></iframe>
        ) : null}

        {/* Text NFT */}
        {!constructedEmbedURL &&
        !postContent?.VideoURLs &&
        (!postContent?.ImageURLs || postContent?.ImageURLs == "") &&
        !postContent?.PostExtraData?.arweaveVideoSrc ? (
          <div className={styles.text_nft_container + " p-20px"}>
            <div className="disable-scrollbars">{postContent?.Body}</div>
          </div>
        ) : null}
      </div>
    </>
  );
};
export default NFTCardMedia;
