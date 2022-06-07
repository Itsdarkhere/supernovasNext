import styles from "../../styles/Feed/feedPostImageModal.module.scss";
import minimizeIcon from "../../public/icons/minimize_icon.svg";
import Image from "next/image";

const FeedPostImageModal = ({ imageURL }) => {
  return (
    <div className="p-15px d-flex justify-content-center align-items-center br-3px">
      <figure className="img">
        <Image
          src={imageURL}
          alt="popup image"
          style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
      </figure>
      {/* (click)="closeThisWindow()"> */}
      <div className="img_pop_close">
        <Image src={minimizeIcon} alt="Close icon" />
        Exit
      </div>
    </div>
  );
};
export default FeedPostImageModal;
