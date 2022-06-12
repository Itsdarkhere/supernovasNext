import styles from "../../styles/Wallet/referralsComponent.module.scss";
import Image from "next/image";
import copyIcon from "../../public/icons/copy_icon.svg";
import { useAppSelector } from "../../utils/Redux/hooks";

const ReferralsComponent = () => {
  // Redux
  const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  // Redux end
  {
    /* *ngIf="!globalVars?.loggedInUser?.ProfileEntryResponse?.Username" */
  }
  // Removed offline prompt from here
  {
    /* *ngIf="globalVars?.loggedInUser?.ProfileEntryResponse?.Username" */
  }
  return (
    <div className="d-flex flex-center w-100">
      <div className={styles.referrals_wrapper}>
        <div className={styles.referrals_top}>
          <h2>
            Invite creators,
            <br />
            earn DAO coins
          </h2>
          <h4>
            Share your referral link and earn 200% of all the transaction fees
            creators you refer bring in.
          </h4>
          <div onClick={() => _copyLink()}>
            <label className="mb-0px">
              supernovas.app/home/
              {loggedInUser?.ProfileEntryResponse?.Username.toLowerCase()}
            </label>
            <button>
              {!linkCopied ? (
                <Image
                  height={"20px"}
                  className="cursor-pointer"
                  alt="key"
                  src={copyIcon}
                />
              ) : (
                <i className="fas fa-check-circle fa-md align-middle"></i>
              )}
              Copy
            </button>
          </div>
          <label className={styles.ref_top_label}>
            Copy and share your referral link with your friends
          </label>
        </div>
        <div className={styles.referrals_explanation}>
          <h2>How it works</h2>
          <div>
            <section>
              <label className="mb-0px">1</label>
              <h4>Share your referral link</h4>
              <p>
                Share your link to your friends via DM or via social media post.
              </p>
            </section>
            <section>
              <label className="mb-0px">2</label>
              <h4>Earn for every sign-up</h4>
              <p>
                Once your friends sign up and start selling their NFT’s, you’ll
                start earning!
              </p>
            </section>
            <section>
              <label className="mb-0px">3</label>
              <h4>Get paid</h4>
              <p>
                You’ll receive the first payment after Supernovas token sale and
                weekly after that.
              </p>
            </section>
          </div>
        </div>
        <div className={styles.referrals_faq}>
          <h2>FAQ</h2>
          <h4>Can I do it and how do I share?</h4>
          <p>
            Yes, you can. Anyone is eligible for the refefrral rewards. It’s
            very simple, just share your link to whomever you wish, we’ll take
            care of the rest.
          </p>
          <h4>Who can I refer?</h4>
          <p>
            Anyone who does not have an account on Supernovas yet. However, each
            new account can only have one referrer, which will be the first
            referral link used by that account.
          </p>
          <h4>Do all transactions qualify for rewards?</h4>
          <p>
            All primary sales on NFT’s that were minted on Supernovas are
            eligible for the rewards.
          </p>
          <h4>How do I see how much I have earned?</h4>
          <p>
            We are soon adding a feature where you can see number of qualified
            referrals and your earnings, but you can already start building up
            the numbers.
          </p>
          <h4>How to collect my rewards?</h4>
          <p>
            Very simply - you don’t have to do anything. After Supernovas token
            sale, your earned rewards will be dropped to your account, with
            automatic weekly distributions after that.
          </p>
        </div>
      </div>
    </div>
  );
};
export default ReferralsComponent;
