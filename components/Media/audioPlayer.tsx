import styles from "../../styles/Media/audioPlayer.module.scss";
// import Amplitude from "amplitudejs";
import Image from "next/image";
import { useEffect } from "react";
const AudioPlayer = ({ songName, creator, audioSrc }) => {
  // Lifecycle methods
  useEffect(() => {
    let timeout: any;
    // Amplitude.init({
    //   songs: [
    //     {
    //       name: songName,
    //       artist: creator,
    //       url: audioSrc,
    //     },
    //   ],
    //   volume: 35,
    //   debug: true,
    // });
    // Amplitude.setDebug(true);

    timeout = setTimeout(() => {
    //   setVolumeColors();
    }, 100);

    // This runs on unMount
    return () => {
      // Cleanup
    //   Amplitude.stop();
      clearTimeout(timeout);
    };
  }, []);
  // Lifecycle methods end

  // Functions
  const setVolume = ($event: Event) => {
    const playerVolume = $event.target as HTMLInputElement;
    // Amplitude.setVolume(playerVolume.value);
    console.log(playerVolume.value);
  };

  const setVolumeColors = () => {
    let volumeRange = document.getElementById(
      "volume-slider"
    ) as HTMLInputElement;
    var value = (parseFloat(volumeRange.value) / 100) * 100;
    volumeRange.style.background =
      "linear-gradient(to right, #3A3A3A 0%, #3A3A3A " +
      value +
      "%, #EEEEEE " +
      value +
      "%, #EEEEEE 100%)";
  };
  // Functions end

  return (
    <div className={styles.arweave_audio_element}>
      <div id="progress-container" className="w-100">
        <input type="range" className={styles.amplitude_song_slider} />
        <progress
          id="song-played-progress"
          className="amplitude-song-played-progress w-100 border-none"
        ></progress>
        <progress
          id="song-buffered-progress"
          className="amplitude-buffered-progress border-none"
          value="0"
        ></progress>
      </div>
      <div
        id="time-container"
        className="w-100 d-flex flex-center-end pt-5px fs-10px"
      >
        <span className="amplitude-current-time time-container"></span>
        <span>/</span>
        <span className="amplitude-duration-time time-container"></span>
      </div>
      <div className="w-100 d-flex flex-row justify-content-between fs-12px">
        <div className="d-flex flex-start-center flex-column w-30">
          <p className="font-weight-semiboldn">{songName}</p>
          <p className="font-weight-bold" style={{ color: "#808080" }}>
            @{creator}
          </p>
        </div>
        {/* Play / Pause buttons are inserted to this in css */}
        <button
          className={[
            styles.amplitude_play_pause,
            styles.audio_play_button,
            "p-0px border",
          ].join(" ")}
        ></button>
        <div className="w-30 d-flex flex-center" id="volume-container">
          <Image
            height={"100%"}
            src="/assets/icons/audio-volume-icon.svg"
            className="mr-5px"
            alt="volume icon"
          />

          <input
          onInput={() => volumeColor()}
          onChange={(e) => setVolume(e)}
            type="range"
            id="volume-slider"
            className={styles.amplitude_volume_slider + " p-0px border-none"}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
