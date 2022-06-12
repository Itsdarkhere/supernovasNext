import styles from "../../styles/Discovery/formatSection.module.scss";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import imageTypeImg from "../../public/icons/image-type.svg";
import musicTypeImg from "../../public/icons/music-type.svg";
import videoTypeImg from "../../public/icons/video-type.svg";
import ModelTypeImg from "../../public/icons/3D-type.png";

const FormatSection = ({ routeViewAll }) => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: { perView: "auto", spacing: 0 },
  });
  return (
    <div className={styles.format_container + " keen-slider"} ref={sliderRef}>
      <div className="keen-slider__slide format-slide1 pt-10px pl-5px">
        <button
          onClick={() => routeViewAll("image")}
          className="content-type-card-discovery p-0px"
        >
          <div className="h-60 w-100 d-flex flex-center background-color-secondary">
            <Image src={imageTypeImg} alt="creator icon" />
          </div>
          <div className="h-40 w-100 mt-10px d-flex flex-column">
            <label className="fs-32px color-text font-weight-semiboldn pointer-events-none">
              Images
            </label>
          </div>
        </button>
      </div>
      <div className="keen-slider__slide format-slide1 pt-10px pl-5px">
        <button
          onClick={() => routeViewAll("video")}
          className="content-type-card-discovery p-0px"
        >
          <div className="h-60 w-100 d-flex flex-center background-color-secondary">
            <Image src={videoTypeImg} alt="creator icon" />
          </div>
          <div className="h-40 w-100 mt-10px d-flex flex-column">
            <label className="fs-32px color-text font-weight-semiboldn pointer-events-none">
              Video
            </label>
          </div>
        </button>
      </div>
      <div className="keen-slider__slide format-slide1 pt-10px pl-5px">
        <button
          onClick={() => routeViewAll("formatmusic")}
          className="content-type-card-discovery p-0px"
        >
          <div className="h-60 w-100 d-flex flex-center background-color-secondary">
            <Image src={musicTypeImg} alt="creator icon" />
          </div>
          <div className="h-40 w-100 mt-10px d-flex flex-column">
            <label className="fs-32px color-text font-weight-semiboldn pointer-events-none">
              Audio
            </label>
          </div>
        </button>
      </div>
      <div className="keen-slider__slide format-slide1 pt-10px pl-5px">
        <button
          onClick={() => routeViewAll("model")}
          className="content-type-card-discovery p-0px"
        >
          <div className="h-60 w-100 d-flex flex-center background-color-secondary">
            <Image src={ModelTypeImg} alt="creator icon" />
          </div>
          <div className="h-40 w-100 mt-10px d-flex flex-column">
            <label className="fs-32px color-text font-weight-semiboldn pointer-events-none">
              3D
            </label>
          </div>
        </button>
      </div>
    </div>
  );
};
export default FormatSection;
