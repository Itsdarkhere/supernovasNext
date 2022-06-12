import styles from "../../styles/Landing/landing.module.scss";

const Landing = () => {
  return (
    <div className="main-container" id="main-container">
      <div className="topnav">
        <div className="topnav-left">
          <a className="supernovas-logo" href="https://supernovas.app/">
            supernovas
          </a>
          <a
            className="supernovas-logo-2"
            href="https://investors.supernovas.app/investor-memorandum"
            target="_blank"
            rel="noreferrer"
          >
            Memorandum
          </a>
          <a className="supernovas-logo-3" href="https://supernovas.app/dao">
            DAO
          </a>
        </div>
        <div className="topnav-right">
          {/* (click)="routeToSignUp()" */}
          <a className="button-27 button-height-cp button-create">
            <div className="button-create-text">Create profile</div>
          </a>
        </div>
      </div>

      {/* <!--            NAVBAR            --> */}
      <section className="intro-section" id="section-1">
        <div className="title-section">
          <div>
            <div className="maintitle">
              The next generation of creation starts here
            </div>
            <p className="mainp">
              Supernovas is the first community-owned, decentralized social
              network and multi-chain NFT marketplace. Sign up and earn rewards
              with every transaction.
            </p>
          </div>

          <div className="buttons-container">
            <a
              onClick={() => routeToSignUp()}
              className="button-27 button-height-cp button-create"
            >
              <div className="button-create-text">Create profile</div>
            </a>
            <a
              onClick={() => routeToSNFeed()}
              className="browse-supernovas-cta"
            >
              Browse Supernovas
              <i className="arrow-main" title="arrow icon"></i>
            </a>
          </div>
        </div>
        <div className="card-section">
          <div className="artist-card">
            <div className="visual-container">
              <div className="ellipse-main">
                <img
                  src="assets/img/ellipse_5.png"
                  className="ellipse-img"
                  alt="light"
                />
              </div>
              <div>
                <div className="artist-visual">
                  <img src="assets/img/iphone.png" className="main-mobile" />
                  <img src="assets/img/browser.png" className="main-browser" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container" id="creators-section">
        <div className="creators-title-wrapper">
          <h3 className="creators-title">
            <div className="creators-title-2">for creators</div>
          </h3>
        </div>

        <div className="space-holder">
          <div className="sticky">
            <div className="horizontal">
              <section role="feed" className="cards" id="section-3">
                <li className="card">
                  <h4 className="card-title">Gas-free minting</h4>
                  <p className="card-p">
                    Enjoy one-click, gas-free NFT minting and instant
                    transactions on Ethereum, Solana, and DeSo.
                  </p>
                </li>

                <li className="card">
                  <h4 className="card-title">Earn with every transaction</h4>
                  <p className="card-p">
                    All NFT transactions on Supernovas reward creators with
                    Supernovas DAO tokens, meaning that all active creators own
                    an ever-increasing, ever more valuable stake of Supernovas.
                  </p>
                </li>

                <li className="card">
                  <h4 className="card-title">Get discovered</h4>
                  <p className="card-p">
                    Creators are amplified directly to collectors through
                    advanced analytics, social features, our Discovery page, and
                    our Marketplace
                  </p>
                </li>

                <li className="card">
                  <h4 className="card-title">Your own Creator Coin</h4>
                  <p className="card-p">
                    You get your own token that anyone can buy or sell. Earn a
                    percentage of each investment into your creator coin.
                  </p>
                </li>

                <li className="card">
                  <h4 className="card-title">
                    Decentralized social media network
                  </h4>
                  <p className="card-p">
                    Supernovas is like Twitter but it’s not one person owning
                    and controlling your social graph, assets, data and identity
                    – it’s you. No one can ever take your profile, content, or
                    community away from you.
                  </p>
                </li>

                <li className="card">
                  <h4 className="card-title">Social tipping</h4>
                  <p className="card-p">
                    Receive “diamonds” on any of your posts and earn anywhere
                    from $0.01 - $200 as a tip – as you deserve.
                  </p>
                </li>

                <li className="card">
                  <h4 className="card-title">...And more!</h4>
                  <p className="card-p">
                    One-click collection minting, create your own DAO, DAO
                    coins, multi-chain NFT royalties for creator coins, and
                    creator referral program coming soon!
                  </p>
                  <a
                    onClick={() => routeToSignUp()}
                    className="button-27 button-height-cp button-create"
                  >
                    <div className="button-create-text">Create profile</div>
                  </a>
                </li>
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className="container" id="collectors-section">
        <div className="collectors-title-wrapper">
          <h3 className="collectors-title">for collectors</h3>
        </div>
        <div className="space-holder__collectors">
          <div className="sticky__collectors disable-scrollbars">
            <div className="horizontal__collectors">
              <section role="feed" className="cards" id="black-cards">
                <li className="card card__black">
                  <h4 className="card-title card-title__black">Gas free</h4>
                  <p className="card-p card-p__black">
                    Start collecting Ethereum, Solana, and DeSo NFT’s without
                    shelling out large amounts of money for high gas fees.
                  </p>
                  <img className="sphere-1" src="assets/img/sphere.png" />
                </li>

                <li className="card card__black">
                  <h4 className="card-title card-title__black">
                    Earn with every transaction
                  </h4>
                  <p className="card-p card-p__black">
                    Collectors are awarded Supernovas DAO tokens with each NFT
                    purchase. The more you collect, the more tokens you have,
                    and the more valuable those tokens will be.
                  </p>
                  <img className="square-1" src="assets/img/square.png" />
                </li>

                <li className="card card__black">
                  <h4 className="card-title card-title__black">
                    Smart investing
                  </h4>
                  <p className="card-p card-p__black">
                    Through advanced analytics, creator verification, and
                    discovery tools, your risk of rug-pull is significantly
                    decreased.
                  </p>
                  <img className="cone-1" src="assets/img/cone.png" />
                </li>

                <li className="card card__black">
                  <h4 className="card-title card-title__black">
                    Creator Coins
                  </h4>
                  <p className="card-p card-p__black">
                    Earn rewards every time someone invests into your Creator
                    Coin. Invest in your favorite NFT artists to earn coinholder
                    rewards.
                  </p>
                  <img className="square-2" src="assets/img/square.png" />
                </li>

                <li className="card card__black">
                  <h4 className="card-title card-title__black">
                    Decentralized social network
                  </h4>
                  <p className="card-p card-p__black">
                    Maximize your monetization opportunities by bringing your
                    community and your NFT’s under one platform.
                  </p>
                  <img className="cone-2" src="assets/img/cone.png" />
                </li>

                <li className="card card__black">
                  <h4 className="card-title card-title__black">
                    Social tipping
                  </h4>
                  <p className="card-p card-p__black">
                    Receive “diamonds” on any of your posts and earn anywhere
                    from $0.01 - $200 as a tip – as you deserve.
                  </p>
                </li>

                <li className="card card__black">
                  <h4 className="card-title card-title__black">...And more!</h4>
                  <p className="card-p card-p__black">
                    Create your own DAO, DAO coins, multi-chain NFT royalties
                    for creator coins, and collector referral program coming
                    soon!
                  </p>
                  <img className="sphere-3" src="assets/img/sphere.png" />

                  <a
                    onClick={() => routeToSignUp()}
                    className="button-27 button-height-cp button-create"
                  >
                    <div className="button-create-text">Create profile</div>
                  </a>
                </li>

                <i className="gg-arrow-bottom-right"></i>
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className="dao-section dao-section__black" id="dao-section">
        <div className="dao-card dao-card__black">
          <div className="dao-info">
            <div className="dao-main-text dao-main-text__black">
              Supernovas DAO
            </div>
            <div className="dao-p dao-p__black">
              The Supernovas community is the heart and soul of Supernovas, and
              the only way forward is in creating Supernovas DAO, ensuring that
              those creating value for the Supernovas platform are able to
              capture that value by owning and governing Supernovas. All NFT
              transactions on Supernovas reward users with Supernovas DAO
              tokens. Supernovas public DAO token sale will be in May 2022.
            </div>
            <div className="dao-button">
              <a
                href="https://investors.supernovas.app/investor-memorandum/"
                className="button-27 dao-button-blue"
              >
                Read the Investor Memorandum
              </a>
            </div>
            <div className="lottie-animation-dao"></div>
          </div>
        </div>
        <div className="lottie-animation-shapes"></div>
      </section>

      <section className="testimonial-section" id="section-7">
        <div className="testimonial-title-wrapper">
          <h3 className="testimonials-title">What our community has to say</h3>
        </div>

        <div className="testimonial-card-container">
          <div className="testimonial-card">
            <div className="testimonial-left">
              <img src="/assets/img/dan.png" className="testimonial-image" />
              <div className="testimonial-separator"></div>
            </div>
            <div className="testimonial-right">
              <div className="testimonial-user-info">
                <div className="testimonial-name">Van Maverick</div>
                <div className="testimonial-username">@van_maverick</div>
              </div>
              <div className="testimonial-p">
                I like the vision, and the long term focus too. The @supernovas
                team is clearly highly organised and motivated motivated - very
                easy to recommend :)
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-left">
              <img src="/assets/img/jason.png" className="testimonial-image" />
              <div className="testimonial-separator"></div>
            </div>
            <div className="testimonial-right">
              <div className="testimonial-user-info">
                <div className="testimonial-name">Jason Devlin</div>
                <div className="testimonial-username">@jasondevlin</div>
              </div>
              <div className="testimonial-p">
                I'm officially only referring people to @supernovas from now on,
                until another app changes my mind. Such a thoughtful UX, the
                best first impression out there I think.
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-left">
              <img src="/assets/img/sumor.png" className="testimonial-image" />
              <div className="testimonial-separator"></div>
            </div>
            <div className="testimonial-right">
              <div className="testimonial-user-info">
                <div className="testimonial-name">Sumor</div>
                <div className="testimonial-username">@sumor</div>
              </div>
              <div className="testimonial-p">
                I want to thank the guys @supernovas, they are doing something
                incredible and convenient for artists, this is becoming my new
                home, I started minting all my nfts there 💜 Please don't stop
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-left">
              <img src="/assets/img/nathan.png" className="testimonial-image" />
              <div className="testimonial-separator"></div>
            </div>
            <div className="testimonial-right">
              <div className="testimonial-user-info">
                <div className="testimonial-name">Nathan Wells</div>
                <div className="testimonial-username">@nathanwells</div>
              </div>
              <div className="testimonial-p">
                Seriously, if you all haven't checked out supernovas.app you
                need to now. Super clean interface and a way for smaller
                creators to become verified.
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-left">
              <img
                src="/assets/img/derisha.png"
                className="testimonial-image"
              />
              <div className="testimonial-separator"></div>
            </div>
            <div className="testimonial-right">
              <div className="testimonial-user-info">
                <div className="testimonial-name">Derisha Aryawan</div>
                <div className="testimonial-username">@DerishaViar</div>
              </div>
              <div className="testimonial-p">
                The UI on @supernovas is sweeeet AF. I'm loving it, probably the
                best UI so far... Very clean and modern look, I will def use it
                more and recommend it to my friends!
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-left">
              <img src="/assets/img/jody.png" className="testimonial-image" />
              <div className="testimonial-separator"></div>
            </div>
            <div className="testimonial-right">
              <div className="testimonial-user-info">
                <div className="testimonial-name">Jody Bossert</div>
                <div className="testimonial-username">@jodybossert</div>
              </div>
              <div className="testimonial-p">
                Wow. Surfing around on @supernovas for the first time in a while
                and it is REALLY looking good. Might just have to make this my
                new home!
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="statement-section" className="statement-section">
        <div className="statement-section-container">
          <div className="statement-title">
            <div className="statement-title-singup">
              Sign up and start earning today
            </div>
            <div className="statement-buttons">
              <a
                onClick={() => routeToSignUp()}
                className="button-27 button-height-cp-2 button-create"
              >
                <div className="button-create-text">Create profile</div>
              </a>

              <a
                onClick={() => routeToSNFeed()}
                className="browse-supernovas-cta-2 fs-24px"
              >
                Browse Supernovas
                <i className="arrow-main" title="arrow icon"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* <!--            FOOTER            --> */}

      <footer>
        <div className="footer-logo-container">
          <img src="/assets/img/logo400.png" className="footer-logo-img" />
        </div>
        <div className="footer-separator"></div>
        <div className="footer-separator"></div>
        <div className="footer-social-links">
          <a className="footer-title">SOCIAL</a>
          <a href="https://discord.gg/JHbhaFbPvN">Discord</a>
          <a href="https://twitter.com/supernovasdao">Twitter</a>
          <a href="https://instagram.com/supernovasdao">Instagram</a>
        </div>
        <div className="footer-social-links">
          <a className="footer-title">RESOURCES</a>
          <a href="https://www.blog.supernovas.app/">Blog</a>
          <a href="https://support.supernovas.app/en/">Support</a>
          <a href="https://investors.supernovas.app/investor-memorandum/">
            DAO
          </a>
          <a href="https://careers.supernovas.app/">Careers</a>
        </div>
        <div className="footer-social-links">
          <a className="footer-title">LEGAL</a>
          <a href="https://support.supernovas.app/en/">Terms of Service</a>
          <a href="https://support.supernovas.app/en/">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};
export default Landing;
