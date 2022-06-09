import { useEffect, useState } from "react";
import Image from "next/image";
import { MAX_POST_LENGTH, _alertError } from "../../utils/global-context";
import closeRoundIcon from "../../public/icons/close_round.svg";
import createPostEmbedIcon from "../../public/icons/create_post_embed.svg";
import createPostVideoIcon from "../../public/icons/create_post_video.svg";
import createPostImageicon from "../../public/icons/create_post_image.svg";
import createPostIcon from "../../public/icons/create_post_icon.svg";
import Avatar from "../Reusables/avatar";
import { useAppSelector } from "../../utils/Redux/hooks";
import { isValidTiktokEmbedURL } from "../../utils/staticServices/embedURLParser";
import {
  BackendRoutes,
  UploadImage,
  _makeRequestURL,
} from "../../utils/backendapi-context";
import * as tus from "tus-js-client";
import { checkVideoStatusByURL } from "../../utils/cloudflareStreamFunctions";
import Timer = NodeJS.Timer;

const CreatePost = ({
  parentPost,
  changeCanPost,
  isQuote,
  numberOfRowsInTextArea,
}) => {
  const SHOW_POST_LENGTH_WARNING_THRESHOLD = 515; // show warning at 515 characters
  let videoStreamInterval: Timer = null;

  const [postImageSrc, setPostImageSrc] = useState("");
  const [postInput, setPostInput] = useState("");
  const [showEmbedURL, setShowEmbedURL] = useState(false);
  const [constructedEmbedURL, setConstructedEmbedURL] = useState(null);
  const [readyToStream, setReadyToStream] = useState(false);
  const [postVideoSrc, setPostVideoSrc] = useState(null);
  const [submittingPost, setSubmittingPost] = useState(false);
  const [showImageLink, setShowImageLink] = useState(false);
  const [videoUploadPercentage, setVideoUploadPercentage] = useState(null);
  const [randomMovieQuote, setRandomMovieQuote] = useState("");
  // Redux
  let loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  let userList = useAppSelector((state) => state.loggedIn.userList);

  const randomMovieQuotes = [
    "I love it when a plan comes together.",
    "Hang on everybody, let's try something!",
    "We code because we say we code!",
    "Of course we have a plan. To the Moon!",
    "Grab a Captain Bellybuster cap!",
    "Are we decentralized enough?",
    "Making plans? Reality check incoming!",
    "I want frickin' sharks with laser beams!",
    "Run! They are after my lucky charms!",
    "Don't repeat yourself. Move on!",
    "Keep it as simple as possible.",
    "If it ain't broke, don't fix it!",
    "Don't fear missing out. You create it!",
    "Adapt, try again, and keep adapting.",
    "Working hard? Don't miss out on life.",
    "If you ship it, they will come.",
    "Do you all have the BitClout song playing?",
    "A good deed is best served cold.",
    "Wow, this looks exactly like CoD right?",
    "Be one step ahead, don't run away!",
    "Make in a week what others make in a year.",
    "We believe in you, even if you don't.",
    "When will the chaos start to work for you?",
    "Focus on the happy path & don't look back.",
    "Make sure that time is on your side.",
    "Waiting to start? Please step aside.",
    "Teamwork is what makes the team work!",
    "Closed source is like a closed heart. Lonely.",
    "Lead, follow, or stay on board of the rocket.",
    "Who's making all the stars shine so bright?",
    "Turn the light on! I'm entering the stage!",
    "Turn the lights off, I'm starting to code!",
    "Wake up, you are the chosen one...",
    "Open your eyes and follow the white rabbit.",
    "Can we have a world of our own? No nonsense?",
    "Who in the world are you? Who am I?",
    "How long is forever? Is it longer then now?",
    "Nothing's impassible! Let's 🚀",
    "What once was, still is - doesn't have to be.",
    "Its the direction that matters, not the goal!",
    "It is such a magical place, the land of joy.",
    "One loves the sunrise when everybody is happy.",
    "Lets get these electrons jomping and romping!",
    "Is this an atomic and nuclear misticism?",
    "We don't do drugs. We are the drug.",
    "Don't fear perfect. It's never so. Just do!",
    "Everything alters me, but I keep growing.",
    "Its either easy or impossible. Do both.",
    "Online time is too short to remain unnoticed.",
    "God made a human, and human made the DeSo.",
    "Everything that is contradictory creates hype.",
    "Start gazing. Start thinking. Start doing.",
    "Am I so brief, or have I already finished?",
    "Liking money is nothing less than mysticism.",
    "So little of what will happen does happen.",
    "Say, are we a groovy, happenin' bunch?",
    "Fly by night, laugh, and shout: BitCloooout!",
    "Let's build the catatonic choo-choo!",
    "Fasten your seatbelts! GodSpeed!",
    "Ain't nothing wrong with being practical.",
  ];

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

  const getPlaceholderText = () => {
    // Creating vanilla post
    if (!parentPost) {
      return randomMovieQuote;
    }
    // Creating comment or quote repost;
    return isQuote ? "Add a quote" : "Post your reply";
  };

  const onPaste = (event: any): void => {
    const items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;
    let blob = null;

    for (const item of items) {
      if (item.type.indexOf("image") === 0) {
        blob = item.getAsFile();
      }
    }

    if (blob) {
      _handleFileInput(blob);
    }
  };

  const _setRandomMovieQuote = () => {
    const randomInt = Math.floor(Math.random() * randomMovieQuotes.length);
    setRandomMovieQuote(randomMovieQuotes[randomInt]);
  };

  const _handleFileInput = (file: File): void => {
    if (!file) {
      return;
    }

    if (
      !file.type ||
      (!file.type.startsWith("image/") && !file.type.startsWith("video/"))
    ) {
      _alertError("File selected does not have an image or video file type.");
    } else if (file.type.startsWith("video/")) {
      uploadVideo(file);
    } else if (file.type.startsWith("image/")) {
      uploadImage(file);
    }
  };

  const uploadImage = (file: File) => {
    if (file.size > 15 * (1024 * 1024)) {
      _alertError("File is too large. Please choose a file less than 15MB");
      return;
    }
    return UploadImage(
      process.env.NEXT_PUBLIC_uploadImageHostname,
      loggedInUser.PublicKeyBase58Check,
      file
    ).subscribe({
      next: (res) => {
        setPostImageSrc(res.ImageURL);
        setPostVideoSrc(null);
      },
      error: (err) => {
        _alertError(JSON.stringify(err.error.error));
      },
    });
  };

  const uploadVideo = (file: File): void => {
    console.log("videoUpload");
    if (file.size > 4 * (1024 * 1024 * 1024)) {
      _alertError("File is too large. Please choose a file less than 4GB");
      return;
    }
    let upload: tus.Upload;
    let mediaId = "";
    const options = {
      endpoint: _makeRequestURL(
        process.env.NEXT_PUBLIC_uploadVideoHostname,
        BackendRoutes.RoutePathUploadVideo
      ),
      chunkSize: 50 * 1024 * 1024, // Required a minimum chunk size of 5MB, here we use 50MB.
      uploadSize: file.size,
      onError: function (error) {
        _alertError(error.message);
        upload.abort(true).then(() => {
          throw error;
        });
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        setVideoUploadPercentage(
          ((bytesUploaded / bytesTotal) * 100).toFixed(2)
        );
      },
      onSuccess: function () {
        // Construct the url for the video based on the videoId and use the iframe url.
        setPostVideoSrc(`https://iframe.videodelivery.net/${mediaId}`);
        setPostImageSrc(null);
        setVideoUploadPercentage(null);
        pollForReadyToStream();
      },
      onAfterResponse: function (req, res) {
        return new Promise((resolve) => {
          // The stream-media-id header is the video Id in Cloudflare's system that we'll need to locate the video for streaming.
          let mediaIdHeader = res.getHeader("stream-media-id");
          if (mediaIdHeader) {
            mediaId = mediaIdHeader;
          }
          resolve(res);
        });
      },
    };
    // Clear the interval used for polling cloudflare to check if a video is ready to stream.
    if (videoStreamInterval != null) {
      clearInterval(videoStreamInterval);
    }
    // Reset the postVideoSrc and readyToStream values.
    setPostVideoSrc(null);
    setReadyToStream(false);
    // Create and start the upload.
    upload = new tus.Upload(file, options);
    upload.start();
    return;
  };

  const pollForReadyToStream = (): void => {
    let attempts = 0;
    let numTries = 1200;
    let timeoutMillis = 500;
    videoStreamInterval = setInterval(() => {
      if (attempts >= numTries) {
        clearInterval(videoStreamInterval);
        return;
      }
      checkVideoStatusByURL(postVideoSrc)
        .subscribe(([readyToStream, exitPolling]) => {
          if (readyToStream) {
            readyToStream = true;
            clearInterval(videoStreamInterval);
            return;
          }
          if (exitPolling) {
            clearInterval(videoStreamInterval);
            return;
          }
        })
        .add(() => attempts++);
    }, timeoutMillis);
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

  // Lifecycle methods begin
  useEffect(() => {
    _setRandomMovieQuote();
  }, []);
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
              {/* 
                (onFileDropped)="uploadFile($event)"
                #textarea
                #autosize="cdkTextareaAutosize" dropUpload cdkTextareaAutosize 
              */}
              <textarea
                rows={parentPost ? 3 : numberOfRowsInTextArea}
                onPaste={(e) => onPaste(e)}
                onChange={(e) => setPostInput(e.target.value)}
                value={postInput}
                placeholder={getPlaceholderText()}
                style={{ resize: "none" }}
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
        {showEmbedURL ? (
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
        ) : null}

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