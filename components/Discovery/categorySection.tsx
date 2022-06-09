import styles from "../../styles/Discovery/categorySection.module.scss";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import chevronRightIcon from "../../public/icons/chevron_right.svg";
import categorySevenImage from "../../public/img/category_photography.png";
import categorySixImage from "../../public/img/category_pp.png";
import categoryFiveImage from "../../public/img/category_music.png";
import categoryFourImage from "../../public/img/category_metaverse.png";
import categoryThreeImage from "../../public/img/category_generative.png";
import categoryTwoImage from "../../public/img/category_collectibles.png";
import categoryOneImage from "../../public/img/category_art.png";
import Image from "next/image";

const CategorySection = ({ viewAll }) => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: { perView: "auto", spacing: 20 },
  });
  return (
    <div className={styles.slider_container}>
      <div ref={sliderRef} className="keen-slider">
        <div
          onClick={() => viewAll("art")}
          className={
            styles.category_slide1 +
            " keen-slider__slide pt-10px cursor-pointer"
          }
        >
          <Image
            layout="fill"
            objectFit="cover"
            loading="lazy"
            src={categoryOneImage}
            alt="category art"
          />
        </div>
        <div
          onClick={() => viewAll("collectibles")}
          className={
            styles.category_slide1 +
            " keen-slider__slide pt-10px cursor-pointer"
          }
        >
          <Image
            layout="fill"
            objectFit="cover"
            loading="lazy"
            src={categoryTwoImage}
            alt="category collectibles"
          />
        </div>
        <div
          onClick={() => viewAll("generative")}
          className={
            styles.category_slide1 +
            " keen-slider__slide pt-10px cursor-pointer"
          }
        >
          <Image
            layout="fill"
            objectFit="cover"
            loading="lazy"
            src={categoryThreeImage}
            alt="category generative art"
          />
        </div>
        <div
          onClick={() => viewAll("metaverse")}
          className={
            styles.category_slide1 +
            " keen-slider__slide pt-10px cursor-pointer"
          }
        >
          <Image
            layout="fill"
            objectFit="cover"
            loading="lazy"
            src={categoryFourImage}
            alt="category metaverse & gaming"
          />
        </div>
        <div
          onClick={() => viewAll("categorymusic")}
          className={
            styles.category_slide1 +
            " keen-slider__slide pt-10px cursor-pointer"
          }
        >
          <Image
            layout="fill"
            objectFit="cover"
            loading="lazy"
            src={categoryFiveImage}
            alt="category music"
          />
        </div>
        <div
          onClick={() => viewAll("profilepic")}
          className={
            styles.category_slide1 +
            " keen-slider__slide pt-10px cursor-pointer"
          }
        >
          <Image
            layout="fill"
            objectFit="cover"
            loading="lazy"
            src={categorySixImage}
            alt="category profile picture collection"
          />
        </div>
        <div
          onClick={() => viewAll("photography")}
          className={
            styles.category_slide1 +
            " keen-slider__slide pt-10px cursor-pointer"
          }
        >
          <Image
            layout="fill"
            objectFit="cover"
            loading="lazy"
            src={categorySevenImage}
            alt="category photography"
          />
        </div>
      </div>
      {/* (click)="slider2.next() PUT BACK, Also fix all css to use stylesheet as intended"
       *ngIf="!mobile" */}
      <button
        className={styles.discovery_arrow_box}
        onClick={(e) => {
          e.stopPropagation();
          instanceRef.current?.next();
        }}
      >
        <Image
          height={40}
          width={40}
          alt="arrow right"
          className={styles.discovery_arrow}
          src={chevronRightIcon}
        />
      </button>
    </div>
  );
};
export default CategorySection;
