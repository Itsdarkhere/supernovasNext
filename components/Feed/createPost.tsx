import { useState } from "react";
import Image from "next/image";
import { MAX_POST_LENGTH } from "../../utils/global-context";
import closeRoundIcon from "../../public/icons/close_round.svg";
import createPostEmbedIcon from "../../public/icons/create_post_embed.svg";
import createPostVideoIcon from "../../public/icons/create_post_video.svg";
import createPostImageicon from "../../public/icons/create_post_image.svg";
import createPostIcon from "../../public/icons/create_post_icon.svg";
import Avatar from "../Reusables/avatar";
import { useAppSelector } from "../../utils/Redux/hooks";
import { isValidTiktokEmbedURL } from "../../utils/staticServices/embedURLParser";

const CreatePost = ({ parentPost, changeCanPost }) => {
  const SHOW_POST_LENGTH_WARNING_THRESHOLD = 515; // show warning at 515 characters

  const [postImageSrc, setPostImageSrc] = useState("");
  const [postInput, setPostInput] = useState("");
  const [constructedEmbedURL, setConstructedEmbedURL] = useState(null);
  const [readyToStream, setReadyToStream] = useState(false);
  const [postVideoSrc, setPostVideoSrc] = useState(null);
  const [submittingPost, setSubmittingPost] = useState(false);
  const [showImageLink, setShowImageLink] = useState(false);
  const [videoUploadPercentage, setVideoUploadPercentage] = useState(null);
  // Redux
  let loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  let userList = useAppSelector((state) => state.loggedIn.userList);

  // Functions
  const showCharacterCountIsFine = () => {
    return postInput.length < SHOW_POST_LENGTH_WARNING_THRESHOLD;
  };

  const showCharacterCountWarning = () => {
    return (
      postInput.length >= SHOW_POST_LENGTH_WARNING_THRESHOLD &&
      postInput.length <= MAX_POST_LENGTH
    );
  };

  const characterCountExceedsMaxLength = () => {
    return postInput.length > MAX_POST_LENGTH;
  };

  const canPost = () => {
    if (
      (postInput.length <= 0 && !postImageSrc && !postVideoSrc) ||
      characterCountExceedsMaxLength()
    ) {
    //   changeCanPost(false);
      return true;
    } else {
    //   changeCanPost(true);
      return false;
    }
  };
  // Functions end
  return (
    <>
      <div className={["br-30px-top", parentPost ? "" : "formbg"].join(" ")}>
        {/* <!-- Avatar + Input --> */}
        <div className="avatar-wrap d-flex align-items-top pt-15px pr-15px pl-15px">
          <div>
            {userList &&
            (!loggedInUser || !loggedInUser.ProfileEntryResponse) ? (
              <div className="feed-create-post__avatar feed-create-post__avatar_default"></div>
            ) : null}

            {loggedInUser && loggedInUser.ProfileEntryResponse ? (
              <div>
                <div className="feed-create-post__avatar"></div>
                <Avatar
                  avatar={
                    loggedInUser.ProfileEntryResponse.PublicKeyBase58Check
                  }
                  classN={"feed-create-post__avatar"}
                ></Avatar>
              </div>
            ) : null}
          </div>
          <div className="d-flex flex-column w-100">
            <div className="flex-fill autofill-container append-video-url-thumb position-relative">
              {/* [(ngModel)]="postInput" */}
              {/* 
                rows="{{ parentPost ? 3 : numberOfRowsInTextArea }}" 
                [placeholder]="getPlaceholderText()"
                (paste)="onPaste($event)"
                (onFileDropped)="uploadFile($event)"
                #textarea
                #autosize="cdkTextareaAutosize" dropUpload cdkTextareaAutosize 
              */}
              <textarea
                className={[
                  "disable-scrollbars form-control fs-18px m-5px p-0 border-0 feed-create-post__textarea",
                  parentPost
                    ? "br-12px lh-18px feed-create-comment__textarea"
                    : "border-0 p-0 m-5px feed-create-post__textarea",
                ].join(" ")}
                id="textarea"
              ></textarea>
              {/* #menu */}
              <div id="menu" className="menu" role="listbox"></div>
              {/* <!-- Embedded Content --> */}
              {constructedEmbedURL ? (
                <div className="feed-post__embed-container">
                  {/* (click)="embedURL = ''; showEmbedURL = false; constructedEmbedURL = ''" */}
                  <i className="icon-close feed-post__image-delete"></i>
                  {/* [height]="EmbedUrlParserService.getEmbedHeight(constructedEmbedURL)" */}
                  {/* [src]="constructedEmbedURL | sanitizeEmbed" */}
                  {/* frameborder="0" allowfullscreen */}
                  <iframe
                    style={{
                      maxWidth: isValidTiktokEmbedURL(constructedEmbedURL)
                        ? "325px"
                        : "",
                    }}
                    className="feed-post__image"
                    allow="picture-in-picture; clipboard-write; encrypted-media; gyroscope; accelerometer;"
                  ></iframe>
                </div>
              ) : null}
            </div>
            {/* <!-- Post image --> */}
            {postImageSrc ? (
              <div className="feed-post__image-container">
                {/* (click)="postImageSrc = null" */}
                <i className="icon-close feed-post__image-delete"></i>
                <Image
                  className="feed-post__image"
                  src={postImageSrc}
                  alt="post image"
                />
              </div>
            ) : null}

            {/* <!-- Video is processing - please wait -->  */}
            {postVideoSrc && !readyToStream ? (
              <div className="d-flex flex-column align-items-center">
                <div>Video Processing In Progress</div>
                {/* <simple-center-loader [height]="150"></simple-center-loader> */}
              </div>
            ) : null}

            {/* <!-- Video Player --> */}
            {postVideoSrc && readyToStream ? (
              <div className="feed-post__video-container">
                {/* allowfullscreen [src]="postVideoSrc | sanitizeVideoUrl" */}
                <iframe
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                  className="feed-post__video"
                ></iframe>
              </div>
            ) : null}

            {/* <!-- Video Upload Progress bar --> */}
            {/* *ngIf="videoUploadPercentage !== null" */}
            {videoUploadPercentage !== null ? (
              <div className="d-flex flex-column align-items-center">
                <div>Uploading: {videoUploadPercentage}% Complete</div>
                {/* <mat-progress-bar [value]="videoUploadPercentage" [mode]="'determinate'"></mat-progress-bar> */}
              </div>
            ) : null}
          </div>

          {showImageLink ? (
            <div
              className={[
                "flex-fill px-15px br-10px embed_wrp",
                parentPost ? "pt-10px" : "",
              ].join(" ")}
            >
              {/* (click)="showImageLink = !showImageLink" */}
              <i className="feed-post_delete">
                <Image src={closeRoundIcon} alt="round close icon" />
              </i>
              {/* [(ngModel)]="postImageSrc" */}
              <input
                className="br-3px"
                type="url"
                placeholder="Link to Arweave image"
              />
            </div>
          ) : null}
        </div>
      </div>
      {/*// <!-- Image Upload + Post Buttons -->*/}
      <div className="modal-bottom-action d-flex justify-content-end align-items-center pr-15px pb-15px mt-10px position-relative">
        <span
          className={[
            "mr-15px roboto-regular feed-create-post__character-counter fs-15px",
            postInput.length == 0 ? "d-none" : "",
            showCharacterCountIsFine() ? "text-grey8A" : "",
            showCharacterCountWarning() ? "text-warning" : "",
            characterCountExceedsMaxLength() ? "fc-red" : "",
          ].join(" ")}
        >
          {postInput.length} / {MAX_POST_LENGTH}
        </span>
        {/* *ngIf="showEmbedURL" */}
        <div
          className={[
            "flex-fill px-15px br-10px embed_wrp",
            parentPost ? "pt-10px" : "",
          ].join(" ")}
        >
          {/* (click)="showEmbedURL = !showEmbedURL" */}
          <i className="feed-post_delete">
            <Image src={closeRoundIcon} alt="round close icon" />
          </i>
          {/* [(ngModel)]="embedURL"
            (ngModelChange)="setEmbedURL()" */}
          <input
            type="url"
            placeholder="Embed Youtube, Vimeo, TikTok, Giphy, Spotify, SoundCloud or Twitch"
          />
        </div>
        {/* (click)="showEmbedURL = !showEmbedURL" */}
        <i className="text-grey8A cursor-pointer fs-18px pr-15px">
          <Image src={createPostEmbedIcon} alt="embed icon" />
        </i>
        {/* (change)="_handleFilesInput($event.target.files)" #videoInput */}
        <input className="d-none" type="file" accept="video/*" />
        {/* (click)="videoInput.click()" */}
        <i className="text-grey8A cursor-pointer pr-15px feed-create-post__image-icon">
          <Image src={createPostVideoIcon} alt="video icon" />
        </i>
        {/* #imageInput (change)="_handleFilesInput($event.target.files)" */}
        <input className="d-none" type="file" accept="image/*" />
        {/* (click)="imageInput.click()" */}
        <i className="text-grey8A cursor-pointer feed-create-post__image-icon">
          <Image src={createPostImageicon} alt="image icon" />
        </i>
        {/*
        (click)="_createPost()" */}
        <button
          className={[
            "btn-primary post_btn ml-15px",
            canPost() || submittingPost ? "disabled" : "",
          ].join(" ")}
        >
          {!submittingPost ? (
            <>
              <Image src={createPostIcon} className="mr-5px" alt="post-icon" />
              Post
            </>
          ) : (
            <i className="fa fa-spinner fa-spin"></i>
          )}
        </button>
      </div>
    </>
  );
};

export default CreatePost;
