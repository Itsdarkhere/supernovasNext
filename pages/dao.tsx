import Page from "../components/Wrappers/page";
import styles from "../styles/Dao/dao.module.scss";
import Image from "next/image";
import emailIcon from "/public/icons/email_icon.svg";
import InvestBox from "../components/Dao/investBox";
const dao = () => {
  return (
    <Page isNFTProfile={false} noCap={false}>
      <div className="w-100 d-flex flex-center flex-column pb-20px">
        {/* <div className="dao-banner-container">
      <h4>FOR INVESTORS</h4>
      <h2>Supernovas DAO Token Sale</h2>
    </div> */}
        <div className="w-100">
          <InvestBox></InvestBox>
        </div>
        <div className={styles.dao_explanation}>
          <h3>Supernovas DAO</h3>
          <h4>
            Supernovas is a social network & NFT marketplace where you can
            browse and trade all Deso NFTs as well as Ethereum NFTs minted on
            Supernovas.
            <br />
            <br />
            We are hosting our token launch on (DAO,DAO) so we can start
            rewarding creators and collectors with Supernovas DAO token
            ownership, which allows members to vote on the future direction of
            the platform.
            <br />
            <br />
            Much more on the way! Check our roadmap here:
            <a
              href="https://investors.supernovas.app/investor-memorandum"
              target="_blank"
              rel="noreferrer"
            >
              investors.supernovas.app/investor-memorandum
            </a>
            <br />
            <br />
            For general information, read more here:
            <a
              href="https://blog.supernovas.app/"
              target="_blank"
              rel="noreferrer"
            >
              Supernovas blog
            </a>
            and
            <a
              href="https://supernovas.app/home"
              target="_blank"
              rel="noreferrer"
            >
              Supernovas home
            </a>
          </h4>
        </div>
        <div className={styles.dao_explanation}>
          <h3>Why DAO</h3>
          <h4>
            Supernovas is turning into a Decentralized Autonomous Organization
            to be able to effectively organize and incentivize the community to
            the shared purpose and vision: creating the best possible
            decentralized social and marketplace experience.
            <br />
            <br />
            The DAO will enable the mechanisms and processes required to engage
            the community in a much more significant and meaningful manner,
            while allowing the creation and alignment of financial incentives to
            guide and reward community actions towards the shared goals. Lastly,
            we believe creating a DAO will be an effective way to grow the
            community and enhance the network effects of a common organization
            for all participants.
          </h4>
        </div>
        <div className={styles.dao_what_you_get}>
          <h3>Token launch</h3>
          <div className={styles.dao_wyg_wrap}>
            <section>
              <label className="mb-0px">How, when, where</label>
              <p>
                Our Early Bird token auction begins on Wednesday, May 25th on
                (DAO,DAO). The Early Bird auction will first open to an
                exclusive group of investors. In the following days, access to
                our Early Bird auction will expand slowly into the larger
                Supernovas community. To stay in the loop with the latest
                Supernovas DAO token auction updates, subscribe to our email
                updates down below.
              </p>
            </section>
            <section>
              <label className="mb-0px">Mechanism</label>
              <p>
                The first auction will last until our target of $100k is
                reached. After the first round is completed, the second round
                will start immediately. The second round raise target is $500k.
                After the second round is completed, the third auction round
                will start, and will last until the full target amount is
                achieved.
                <br />
                <br />
                Tokens can be purchased in DeSo, ETH, and USDC. All purchased
                tokens will be immediately tradable on (DAO,DAO)’s DAOSwap.
              </p>
            </section>
            <section>
              <label className="mb-0px">Valuation and price curve</label>
              <p>
                Hard-capped supply of 100M tokens, with valuation starting at
                0.0059 DESO per token.
                <br />
                <br />
                Price increases 0.25% per every $10k invested, or ~2.27% per
                every $100k invested until target raise has been reached.
              </p>
            </section>
          </div>
        </div>
        <div className={styles.dao_what_you_get}>
          <h3>Tokenomics</h3>
          <div className={styles.dao_wyg_wrap}>
            <section>
              <label className="mb-0px">Utility</label>
              <p>
                Supernovas DAO tokens will be used for rewarding activity on the
                platform, while the activity fees will be distributed to token
                holders through deflationary supply. In addition, the token will
                be used for the DAO’s governance.
              </p>
            </section>
            <section>
              <label className="mb-0px">Rewards</label>
              <p>
                20% of the initial token supply is dedicated to incentivize
                creation of new NFTs and their transactions with the goal of
                improving the marketplace experience and NFT liquidity by
                rewarding both sellers and buyers of NFTs.
              </p>
            </section>
            <section>
              <label className="mb-0px">Supply</label>
              <p>
                Supernovas DAO token supply is hard-capped at 100,000,000
                tokens, and will be mechanically deflationary with transaction
                fees being burned to create value for all token holders.
              </p>
            </section>
          </div>
        </div>
        <div className={styles.referrals_faq}>
          <h2>FAQ</h2>
          <span>
            <h4>What currency is used for the auction?</h4>
            <p>
              Currently plan is to enable purchases in DESO, ETH, and USDC for
              the auction.
            </p>
          </span>
          <span>
            <h4>When can the purchased tokens be traded?</h4>
            <p>
              The tokens will be available for trading on (DAO, DAO)'s on-chain
              order-book exchange right after the auction.
            </p>
          </span>
          <span>
            <h4>Will there be an airdrop?</h4>
            <p>
              All primary sales on NFT’s that were minted on Supernovas are
              eligible for the rewards.
            </p>
          </span>
          <span>
            <h4>I own a pre-sale NFT, what do I do now?</h4>
            <p>
              Yes. There will be two types of airdrops. First will be for the
              Supernovas Creator Coin holders to whom we will automatically drop
              the tokens - no actions required from your side.
              <br />
              Second airdrop will be to existing NFT creators and collectors on
              other marketplaces. Further information on qualifying and claiming
              process to come.
            </p>
          </span>
          <span>
            <p>
              <br />
              Further information about the tokenomics can be found in the
              Supernovas Investor Memorandum. Further information on (DAO, DAO)
              can be found at DeSo Blog.
            </p>
          </span>
        </div>
        <div className={styles.dao_subscribe + " position-relative"}>
          <h3>Subscribe for investor updates</h3>
          <p>
            All you need to know about Supernovas as an investor to your inbox.
          </p>
          <div className={styles.dao_input}>
            {/* [(ngModel)]="userEmail" */}
            <input type="email" placeholder="Your email" />
            {/* (click)="checkEmailAndStore()" */}
            <button className={styles.button_gradient_background}>
              <label className="mb-0px">
                <Image
                  alt="email logo"
                  className="mr-5px"
                  height="15px"
                  src={emailIcon}
                />
                Subscribe
              </label>
            </button>
          </div>
          {/* *ngIf="showGratitude && !invalidEmailEntered" */}
          <label className={styles.dao_after_sub + " mb-0px"}>
            <i className="far fa-check-circle"></i>
            Thanks for subscribing!
          </label>
          {/* *ngIf="invalidEmailEntered" */}
          {/* <label
            className={styles.dao_after_sub + " mb-0px " + styles.color_red}
          >
            Incorrect Email...
          </label> */}
        </div>
      </div>
    </Page>
  );
};
export default dao;
