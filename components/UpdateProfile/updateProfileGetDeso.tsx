import styles from "../../styles/UpdateProfile/updateProfileGetDeso.module.scss";
import {
  createProfileFeeInDeSo,
  createProfileFeeInUsd,
  isMobile,
} from "../../utils/global-context";
import { useAppSelector } from "../../utils/Redux/hooks";
import Image from "next/image";
// ./assets/icons/coinbase-white.png
// ./assets/icons/deso.svg
import coinbaseIcon from "../../public/icons/coinbase-white.png";
import desoIcon from "../../public/icons/deso.svg";

const UpdateProfileGetDeso = () => {
  // Redux
  const createProfileFeeNanos = useAppSelector(
    (state) => state.exhange.createProfileFeeNanos
  );
  return (
    <>
      {!isMobile() ? (
        <div className="fs-15px mt-15px finalize-profile-box">
          <div>
            <p className="finalize-profile-title">You're almost there!</p>
            <p className="finalize-profile-title">You just need some $DESO</p>
          </div>
          {createProfileFeeNanos > 0 ? (
            <span className="current-cost-container">
              Creating a profile currently costs
              <b>
                {createProfileFeeInDeSo()} DeSo (≈ {createProfileFeeInUsd()}{" "}
                USD)
              </b>
            </span>
          ) : (
            <div className="fs-15px mt-15px finalize-profile-box">
              <div>
                <p className="finalize-profile-title">You're almost there!</p>
                <p className="finalize-profile-title">
                  You just need some $DESO
                </p>
              </div>
              {createProfileFeeNanos > 0 ? (
                <span className="current-cost-container">
                  Creating a profile currently costs
                  <b>
                    {createProfileFeeInDeSo()} DeSo (≈ {createProfileFeeInUsd()}{" "}
                    USD)
                  </b>
                </span>
              ) : null}
            </div>
          )}
        </div>
      ) : null}

      <div className="get-deso-container">
        <span>Get $DESO by using any of the methods below 👇</span>
      </div>

      <div className="buttons-box">
        <div className="get-deso-box">
          <a
            className="get-deso-button"
            href="https://buy.deso.org/"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={desoIcon} alt="" className="deso-img" />
          </a>
          <p>Buy $DESO with a credit card, Bitcoin or Ethereum.</p>
        </div>

        <div className="get-deso-coinbase-box">
          <a
            className="get-deso-button coinbase-button"
            href="https://www.coinbase.com/"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={coinbaseIcon} alt="" className="coinbase-img" />
          </a>
          <p>Buy $DESO on Coinbase’s exchange.</p>
        </div>
      </div>
      <div className="bottom-spacer"></div>
    </>
  );
};

export default UpdateProfileGetDeso;
