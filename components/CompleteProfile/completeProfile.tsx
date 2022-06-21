import styles from "../../styles/CompleteProfile/completeProfile.module.scss";
import {
  createProfileFeeInDeSo,
  createProfileFeeInUsd,
  isMobile,
  _alertError,
} from "../../utils/global-context";
import desoIcon from "../../public/icons/deso.svg";
import coinbaseWhiteIcon from "../../public/icons/coinbase-white.svg";
import Image from "next/image";
import { useAppSelector } from "../../utils/Redux/hooks";
import { RouteNames } from "../../utils/backendapi-context";
import { track28, track29, track30, track31, track32 } from "../../utils/mixpanel";
import { useRouter } from "next/router";

const CompleteProfile = () => {
  const router = useRouter();
  const isCreator = useAppSelector((state) => state.user.isCreator);
  const isCollector = useAppSelector((state) => state.user.isCollector);
  const isNullUsername = useAppSelector((state) => state.user.isNullUsername);

  const createProfile = () => {
    track29("Onboarding - Profile created clicked");
    router.push(RouteNames.UPDATE_PROFILE);
  };

  const verifyProfile = () => {
    track28("Onboarding - Verify profile clicked");
    window.open("https://form.typeform.com/to/sv1kaUT2", "_blank");
  }

  const contactSupport = () => {
    track31("Onboarding - Contact Support");
    window.open("https://support.supernovas.app/en/", "_blank");
  }

  const buyDESO = () => {
    track32("Onboarding - Buy DeSo");
    window.open("https://buy.deso.org/", "_blank");
  }

  const buyCreatorCoin = () => {
    track30("Onboarding - Buy Creator Coin");
    if (isNullUsername === true) {
      _alertError("You must create a username for your profile in order to buy your creator coin.");
      //   alert("You must create a username for your profile in order to buy your creator coin.");
    } else {
      window.open(`https://supernovas.app/u/${this.username}/buy`, "_blank");
    }
  }

  return (
    <>
    {!isMobile() && isCreator && isNullUsername ?
        <div
    className="onboarding-card-shadow"
  >
    <div className="onboarding-card">
      <p className="onboarding-card-header-1">Welcome to Supernovas!</p>
      <p className="onboarding-card-subheader">Complete the last steps to finalize your onboarding 🌈</p>
      <img src="../../../assets/complete-onboarding/color-gradient.png" alt="color gradient" className="color-gradient" />
      {/* <!-- step 1 --> */}
      <img src="../../../assets/complete-onboarding/checkmark.png" alt="checkmark" className="checkmark-1" />
      <p className="step-1-header">Invest in $DESO</p>
      <p className="step-1-text">
        You need $DESO cryptocurrency to use Supernovas. Buy $DESO on Coinbase or from deso.org with credit card,
        Bitcoin or Ethereum
      </p>
      <button onClick={() => buyDESO()} className="onboarding-card-button onboarding-card-button-1">Buy $DESO</button>
      {/* <!-- step 2 --> */}
      <img src="../../../assets/complete-onboarding/checkmark.png" alt="checkmark" className="checkmark-2" />
      <p className="step-2-header">Create your Supernovas Profile</p>
      <p className="step-2-text">
        After investing to Deso, you are able to create your profile and start using Supernovas.
      </p>
      <button onClick={() => createProfile()} className="onboarding-card-button onboarding-card-button-2">Create Profile</button>
      {/* <!-- step 3 --> */}
      <img src="../../../assets/complete-onboarding/checkmark.png" alt="checkmark" className="checkmark-3" />
      <p className="step-3-header">Invest in your own Creator Coin</p>
      <p className="step-3-text">
        Everyone on Supernovas has their own Creator Coin, which others can invest into. Invest your coin first when the
        price is low. After that, lower your Founder Reward from 100% and earn money every time someone invests to your
        coin.
      </p>
      <button onClick={() => buyCreatorCoin()} className="onboarding-card-button onboarding-card-button-3">Buy your Coin</button>
      {/* <!-- step 4 --> */}
      <img src="../../../assets/complete-onboarding/checkmark.png" alt="checkmark" className="checkmark-4" />
      <p className="step-4-header">Verify your creator profile (Optional)</p>
      <p className="step-4-text">
        You can get your Supernovas Creator profile verified to ensure the authenticity of your work. We'll complete the
        verification in 24 hours.
      </p>
      <button onClick={() => verifyProfile()} className="onboarding-card-button onboarding-card-button-4">Verify Profile</button>
      {/* <!-- done --> */}
      <img src="../../../assets/complete-onboarding/done.png" alt="done" className="done" />
      {/* <!-- line break --> */}
      <div className="line-break"></div>
      {/* <!-- support --> */}
      <p className="support-header">Need Help? We got you.</p>
      <p className="support-text">Browse the support articles or reach out to us and we'll get you started!</p>
      <button onClick={() => contactSupport()} className="onboarding-card-button onboarding-support-button">
        Supernovas Support
      </button>
    </div>
  </div>
  :
  null
    }
{/* //   <!-- is collector and no profile --> */}
{!isMobile() && isCollector && isNullUsername ?
    <div
    className="onboarding-card-shadow-collector"
  >
    <div className="onboarding-card-collector">
      <p className="onboarding-card-header-1">Welcome to Supernovas!</p>
      <p className="onboarding-card-subheader">Complete the last steps to finalize your onboarding 🌈</p>
      <img
        src="../../../assets/complete-onboarding/color-gradient.png"
        alt="color gradient"
        className="color-gradient-collector"
      />
      {/* <!-- step 1 --> */}
      <img src="../../../assets/complete-onboarding/checkmark.png" alt="checkmark" className="checkmark-1" />
      <p className="step-1-header">Invest in $DESO</p>
      <p className="step-1-text">
        You need $DESO cryptocurrency to use Supernovas. Buy $DESO on Coinbase or from deso.org with credit card,
        Bitcoin or Ethereum
      </p>
      <button onClick={() => buyDESO()} className="onboarding-card-button onboarding-card-button-1">Buy $DESO</button>
      {/* <!-- step 2 --> */}
      <img src="../../../assets/complete-onboarding/checkmark.png" alt="checkmark" className="checkmark-2" />
      <p className="step-2-header">Create your Supernovas Profile</p>
      <p className="step-2-text">
        After investing to Deso, you are able to create your profile and start using Supernovas.
      </p>
      <button onClick={() => createProfile()} className="onboarding-card-button onboarding-card-button-2">Create Profile</button>
      {/* <!-- step 3 --> */}
      <img src="../../../assets/complete-onboarding/checkmark.png" alt="checkmark" className="checkmark-3" />
      <p className="step-3-header">Invest in your own Creator Coin</p>
      <p className="step-3-text">
        Everyone on Supernovas has their own Creator Coin, which others can invest into. Invest your coin first when the
        price is low. After that, lower your Founder Reward from 100% and earn money every time someone invests to your
        coin.
      </p>
      <button onClick={() => buyCreatorCoin()} className="onboarding-card-button onboarding-card-button-3">Buy your Coin</button>
      {/* <!-- done --> */}
      <img src="../../../assets/complete-onboarding/done.png" alt="done" className="done-collector" />
      {/* <!-- line break --> */}
      <div className="line-break-collector"></div>
      {/* <!-- support --> */}
      <p className="support-header-collector">Need Help? We got you.</p>
      <p className="support-text-collector">Browse the support articles or reach out to us and we'll get you started!</p>
      <button onClick={() => contactSupport()} className="onboarding-card-button onboarding-support-button-collector">
        Supernovas Support
      </button>
    </div>
  </div>
  :
  null
}

{/* //   <!-- -------------------------------------- if isMobile is true render mobile -------------------------------------- -->
//   <!-- creator, no profile and not verified --> */}
{isMobile() && isCreator && isNullUsername ?
    <div>
    <div className="onboarding-card-mobile disable-scrollbars">
      <p className="onboarding-card-header-1-mobile">Welcome to Supernovas!</p>
      <p className="onboarding-card-subheader-mobile">Complete the last steps to finalize your onboarding 🌈</p>
      <img
        src="../../../assets/complete-onboarding/color-gradient.png"
        alt="color gradient"
        className="color-gradient-mobile"
      />
      {/* <!-- step 1 --> */}
      <img src="../../../assets/complete-onboarding/checkmark.png" alt="checkmark" className="checkmark-1-mobile" />
      <p className="step-1-header-mobile">Invest in $DESO</p>
      <p className="step-1-text-mobile">
        You need $DESO cryptocurrency to use Supernovas. Buy $DESO on Coinbase or from deso.org with credit card,
        Bitcoin or Ethereum
      </p>
      <button onClick={() => buyDESO()} className="onboarding-card-button-mobile onboarding-card-button-1-mobile">
        Buy $DESO
      </button>
      {/* <!-- step 2 --> */}
      <img src="../../../assets/complete-onboarding/checkmark.png" alt="checkmark" className="checkmark-2-mobile" />
      <p className="step-2-header-mobile">Create your Supernovas Profile</p>
      <p className="step-2-text-mobile">
        After investing to Deso, you are able to create your profile and start using Supernovas.
      </p>
      <button onClick={() => createProfile()} className="onboarding-card-button-mobile onboarding-card-button-2-mobile">
        Create Profile
      </button>
      {/* <!-- step 3 --> */}
      <img src="../../../assets/complete-onboarding/checkmark.png" alt="checkmark" className="checkmark-3-mobile" />
      <p className="step-3-header-mobile">Invest in your own Creator Coin</p>
      <p className="step-3-text-mobile">
        Everyone on Supernovas has their own Creator Coin, which others can invest into. Invest your coin first when the
        price is low. After that, lower your Founder Reward from 100% and earn money every time someone invests to your
        coin.
      </p>
      <button onClick={() => buyCreatorCoin()} className="onboarding-card-button-mobile onboarding-card-button-3-mobile">
        Buy your Coin
      </button>
      {/* <!-- step 4 --> */}
      <img src="../../../assets/complete-onboarding/checkmark.png" alt="checkmark" className="checkmark-4-mobile" />
      <p className="step-4-header-mobile">Verify your creator profile (Optional)</p>
      <p className="step-4-text-mobile">
        You can get your Supernovas Creator profile verified to ensure the authenticity of your work. We'll complete the
        verification in 24 hours.
      </p>
      <button onClick={() => verifyProfile()} className="onboarding-card-button-mobile onboarding-card-button-4-mobile">
        Verify Profile
      </button>
      {/* <!-- done --> */}
      <img src="../../../assets/complete-onboarding/done.png" alt="done" className="done-mobile" />
      {/* <!-- line break --> */}
      <div className="line-break-mobile"></div>
      {/* <!-- support --> */}
      <p className="support-header-mobile">Need Help? We got you.</p>
      <p className="support-text-mobile">Browse the support articles or reach out to us and we'll get you started!</p>
      <button onClick={() => contactSupport()} className="onboarding-card-button-mobile onboarding-support-button-mobile">
        Supernovas Support
      </button>
    </div>
  </div>
  :
  null
}
  

{/* //   <!-- is collector and no profile --> */}
    {isMobile() && isCollector && isNullUsername ?
    <div>
    <div className="onboarding-card-collector-mobile">
      <p className="onboarding-card-header-1-mobile">Welcome to Supernovas!</p>
      <p className="onboarding-card-subheader-mobile">Complete the last steps to finalize your onboarding 🌈</p>
      <img
        src="../../../assets/complete-onboarding/color-gradient.png"
        alt="color gradient"
        className="color-gradient-collector-mobile"
      />
      {/* <!-- step 1 --> */}
      <img src="../../../assets/complete-onboarding/checkmark.png" alt="checkmark" className="checkmark-1-mobile" />
      <p className="step-1-header-mobile">Invest in $DESO</p>
      <p className="step-1-text-mobile">
        You need $DESO cryptocurrency to use Supernovas. Buy $DESO on Coinbase or from deso.org with credit card,
        Bitcoin or Ethereum
      </p>
      <button onClick={() => buyDESO()} className="onboarding-card-button-mobile onboarding-card-button-1-mobile">
        Buy $DESO
      </button>
      {/* <!-- step 2 --> */}
      <img src="../../../assets/complete-onboarding/checkmark.png" alt="checkmark" className="checkmark-2-mobile" />
      <p className="step-2-header-mobile">Create your Supernovas Profile</p>
      <p className="step-2-text-mobile">
        After investing to Deso, you are able to create your profile and start using Supernovas.
      </p>
      <button onClick={() => createProfile()} className="onboarding-card-button-mobile onboarding-card-button-2-mobile">
        Create Profile
      </button>
      {/* <!-- step 3 --> */}
      <img src="../../../assets/complete-onboarding/checkmark.png" alt="checkmark" className="checkmark-3-mobile" />
      <p className="step-3-header-mobile">Welcome to Supernovas!</p>
      <p className="step-3-text-mobile">
        Everyone on Supernovas has their own Creator Coin, which others can invest into. Invest your coin first when the
        price is low. After that, lower your Founder Reward from 100% and earn money every time someone invests to your
        coin.
      </p>
      <button onClick={() => buyCreatorCoin()} className="onboarding-card-button-mobile onboarding-card-button-3-mobile">
        Buy your Coin
      </button>
      {/* <!-- done --> */}
      <img src="../../../assets/complete-onboarding/done.png" alt="done" className="done-collector-mobile" />
      {/* <!-- line break --> */}
      <div className="line-break-collector-mobile"></div>
      {/* <!-- support --> */}
      <p className="support-header-collector-mobile">Need Help? We got you.</p>
      <p className="support-text-collector-mobile">
        Browse the support articles or reach out to us and we'll get you started!
      </p>
      <button
        onClick={() => contactSupport()}
        className="onboarding-card-button-mobile onboarding-support-button-collector-mobile"
      >
        Supernovas Support
      </button>
    </div>
  </div>
  :
  null   
}
  </>
  );
};

export default CompleteProfile;
