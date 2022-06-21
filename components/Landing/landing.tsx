import styles from "../../styles/Landing/landing.module.scss";
import { AnimationItem } from "lottie-web"
import { useRouter } from "next/router";
import { track38, track39, track67 } from "../../utils/mixpanel";
import snLogo from "../../public/img/logo400.png";
import ellipse from "../../public/img/ellipse_5.png";
import iphone from "../../public/img/iphone.png";
import browser from "../../public/img/browser.png";
import sphere from "../../public/img/sphere.png";
import cone from "../../public/img/cone.png";
import square from "../../public/img/square.png";
import dan from "../../public/img/dan.png";
import jason from "../../public/img/jason.png";
import sumor from "../../public/img/sumor.png";
import nathan from "../../public/img/nathan.png";
import derisha from "../../public/img/derisha.png";
import jody from "../../public/img/jody.png";
import Image from "next/image";


const Landing = () => {
    const router = useRouter();
    // Functions
    const routeToSignUp = () =>  {
        track39("Signup clicked on Landing page");
        router.push("/signup");
      }
      const routeToSNFeed = () => {
        track67("'Browse Supernovas' clicked on Landing pg");
        router.push("");
      }
      const launchLogin = () => {
        router.push("/signup");
        track38("Landing page - login clicked");
      }
      const launchSignUp = () => {
        router.push("/signup");
        track39("Landing page - Signup clicked");
      }
      const animationCreated = (animationItem: AnimationItem): void => {
        console.log(animationItem);
      }
      const scrollTo = (id: string) => {
        document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" });
      }
  return (
    <div className={styles.main_container} id="main-container">
      <div className={styles.topnav}>
        <div className={styles.topnav_left}>
          <a className={styles.supernovas_logo} href="https://supernovas.app/">
            supernovas
          </a>
          <a
            className={styles.supernovas_logo_2}
            href="https://investors.supernovas.app/investor-memorandum"
            target="_blank"
            rel="noreferrer"
          >
            Memorandum
          </a>
          <a className={styles.supernovas_logo_3} href="https://supernovas.app/dao">
            DAO
          </a>
        </div>
        <div className={styles.topnav_right}>
          {/* (click)="routeToSignUp()" */}
          <a className={[styles.button_27, styles.button_height_cp, styles.button_create].join(" ")}>
            <div className={styles.button_create_text}>Create profile</div>
          </a>
        </div>
      </div>

      {/* <!--            NAVBAR            --> */}
      <section className={styles.intro_section} id="section-1">
        <div className={styles.title_section}>
          <div>
            <div className={styles.maintitle}>
              The next generation of creation starts here
            </div>
            <p className={styles.mainp}>
              Supernovas is the first community-owned, decentralized social
              network and multi-chain NFT marketplace. Sign up and earn rewards
              with every transaction.
            </p>
          </div>

          <div className={styles.buttons_container}>
            <a
              onClick={() => routeToSignUp()}
              className={[styles.button_27, styles.button_height_cp, styles.button_create].join(" ")}
            >
              <div className={styles.button_create_text}>Create profile</div>
            </a>
            <a
              onClick={() => routeToSNFeed()}
              className={styles.browse_supernovas_cta}
            >
              Browse Supernovas
              <i className="arrow-main" title="arrow icon"></i>
            </a>
          </div>
        </div>
        <div className={styles.card_section}>
          <div className={styles.artist_card}>
            <div className={styles.visual_container}>
              <div className={styles.ellipse_main}>
                <Image
                  src={ellipse}
                  className={styles.ellipse_img}
                  alt="light"
                />
              </div>
              <div>
                <div className={styles.artist_visual}>
                  <Image src={iphone} className={styles.main_mobile} />
                  <Image src={browser} className={styles.main_browser} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.container} id="creators-section">
        <div className={styles.creators_title_wrapper}>
          <h3 className={styles.creators_title}>
            <div className={styles.creators_title_2}>for creators</div>
          </h3>
        </div>

        <div className={styles.space_holder}>
          <div className={styles.sticky}>
            <div className={styles.horizontal}>
              <section role="feed" className={styles.cards} id="section-3">
                <li className={styles.card}>
                  <h4 className={styles.card_title}>Gas-free minting</h4>
                  <p className={styles.card_p}>
                    Enjoy one-click, gas-free NFT minting and instant
                    transactions on Ethereum, Solana, and DeSo.
                  </p>
                </li>

                <li className={styles.card}>
                  <h4 className={styles.card_title}>Earn with every transaction</h4>
                  <p className={styles.card_p}>
                    All NFT transactions on Supernovas reward creators with
                    Supernovas DAO tokens, meaning that all active creators own
                    an ever-increasing, ever more valuable stake of Supernovas.
                  </p>
                </li>

                <li className={styles.card}>
                  <h4 className={styles.card_title}>Get discovered</h4>
                  <p className={styles.card_p}>
                    Creators are amplified directly to collectors through
                    advanced analytics, social features, our Discovery page, and
                    our Marketplace
                  </p>
                </li>

                <li className={styles.card}>
                  <h4 className={styles.card_title}>Your own Creator Coin</h4>
                  <p className={styles.card_p}>
                    You get your own token that anyone can buy or sell. Earn a
                    percentage of each investment into your creator coin.
                  </p>
                </li>

                <li className={styles.card}>
                  <h4 className={styles.card_title}>
                    Decentralized social media network
                  </h4>
                  <p className={styles.card_p}>
                    Supernovas is like Twitter but it’s not one person owning
                    and controlling your social graph, assets, data and identity
                    – it’s you. No one can ever take your profile, content, or
                    community away from you.
                  </p>
                </li>

                <li className={styles.card}>
                  <h4 className={styles.card_title}>Social tipping</h4>
                  <p className={styles.card_p}>
                    Receive “diamonds” on any of your posts and earn anywhere
                    from $0.01 - $200 as a tip – as you deserve.
                  </p>
                </li>

                <li className={styles.card}>
                  <h4 className={styles.card_title}>...And more!</h4>
                  <p className={styles.card_p}>
                    One-click collection minting, create your own DAO, DAO
                    coins, multi-chain NFT royalties for creator coins, and
                    creator referral program coming soon!
                  </p>
                  <a
                    onClick={() => routeToSignUp()}
                    className={[styles.button_27, styles.button_height_cp, styles.button_create].join(" ")}
                  >
                    <div className={styles.button_create_text}>Create profile</div>
                  </a>
                </li>
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.container} id="collectors-section">
        <div className={styles.collectors_title_wrapper}>
          <h3 className={styles.collectors_title}>for collectors</h3>
        </div>
        <div className={styles.space_holder__collectors}>
          <div className={styles.sticky__collectors + " disable-scrollbars"}>
            <div className={styles.horizontal__collectors}>
              <section role="feed" className={styles.cards} id="black-cards">
                <li className={[styles.card, styles.card__black].join(" ")}>
                  <h4 className={[styles.card_title, styles.card_title__black].join(" ")}>Gas free</h4>
                  <p className={[styles.card_p, styles.card_p__black].join(" ")}>
                    Start collecting Ethereum, Solana, and DeSo NFT’s without
                    shelling out large amounts of money for high gas fees.
                  </p>
                  <Image className={styles.sphere_1} src={sphere} />
                </li>

                <li className={[styles.card, styles.card__black].join(" ")}>
                  <h4 className={[styles.card_title, styles.card_title__black].join(" ")}>
                    Earn with every transaction
                  </h4>
                  <p className={[styles.card_p, styles.card_p__black].join(" ")}>
                    Collectors are awarded Supernovas DAO tokens with each NFT
                    purchase. The more you collect, the more tokens you have,
                    and the more valuable those tokens will be.
                  </p>
                  <Image className={styles.square_1} src={square} />
                </li>

                <li className={[styles.card, styles.card__black].join(" ")}>
                  <h4 className={[styles.card_title, styles.card_title__black].join(" ")}>
                    Smart investing
                  </h4>
                  <p className={[styles.card_p, styles.card_p__black].join(" ")}>
                    Through advanced analytics, creator verification, and
                    discovery tools, your risk of rug-pull is significantly
                    decreased.
                  </p>
                  <Image className={styles.cone_1} src={cone} />
                </li>

                <li className={[styles.card, styles.card__black].join(" ")}>
                  <h4 className={[styles.card_title, styles.card_title__black].join(" ")}>
                    Creator Coins
                  </h4>
                  <p className={[styles.card_p, styles.card_p__black].join(" ")}>
                    Earn rewards every time someone invests into your Creator
                    Coin. Invest in your favorite NFT artists to earn coinholder
                    rewards.
                  </p>
                  <Image className={styles.square_2} src={square} />
                </li>

                <li className={[styles.card, styles.card__black].join(" ")}>
                  <h4 className={[styles.card_title, styles.card_title__black].join(" ")}>
                    Decentralized social network
                  </h4>
                  <p className={[styles.card_p, styles.card_p__black].join(" ")}>
                    Maximize your monetization opportunities by bringing your
                    community and your NFT’s under one platform.
                  </p>
                  <Image className="cone-2" src={cone} />
                </li>

                <li className={[styles.card, styles.card__black].join(" ")}>
                  <h4 className={[styles.card_title, styles.card_title__black].join(" ")}>
                    Social tipping
                  </h4>
                  <p className={[styles.card_p, styles.card_p__black].join(" ")}>
                    Receive “diamonds” on any of your posts and earn anywhere
                    from $0.01 - $200 as a tip – as you deserve.
                  </p>
                </li>

                <li className={[styles.card, styles.card__black].join(" ")}>
                  <h4 className={[styles.card_title, styles.card_title__black].join(" ")}>...And more!</h4>
                  <p className={[styles.card_p, styles.card_p__black].join(" ")}>
                    Create your own DAO, DAO coins, multi-chain NFT royalties
                    for creator coins, and collector referral program coming
                    soon!
                  </p>
                  <Image className={styles.sphere_3} src={sphere} />

                  <a
                    onClick={() => routeToSignUp()}
                    className={[styles.button_27, styles.button_height_cp, styles.button_create].join(" ")}
                  >
                    <div className={styles.button_create_text}>Create profile</div>
                  </a>
                </li>

                <i className="gg-arrow-bottom-right"></i>
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className={[styles.dao_section, styles.dao_section__black].join(" ")} id="dao-section">
        <div className={[styles.dao_card, styles.dao_card__black].join(" ")}>
          <div className={styles.dao_info}>
            <div className={[styles.dao_main_text, styles.dao_main_text__black].join(" ")}>
              Supernovas DAO
            </div>
            <div className={[styles.dao_p, styles.dao_p__black].join(" ")}>
              The Supernovas community is the heart and soul of Supernovas, and
              the only way forward is in creating Supernovas DAO, ensuring that
              those creating value for the Supernovas platform are able to
              capture that value by owning and governing Supernovas. All NFT
              transactions on Supernovas reward users with Supernovas DAO
              tokens. Supernovas public DAO token sale will be in May 2022.
            </div>
            <div className={styles.dao_button}>
              <a
                href="https://investors.supernovas.app/investor-memorandum/"
                className={[styles.button_27, styles.dao_button_blue].join(" ")}
              >
                Read the Investor Memorandum
              </a>
            </div>
            <div className={styles.lottie_animation_dao}></div>
          </div>
        </div>
        <div className={styles.lottie_animation_shapes}></div>
      </section>

      <section className={styles.testimonial_section} id="section-7">
        <div className={styles.testimonial_title_wrapper}>
          <h3 className={styles.testimonials_title}>What our community has to say</h3>
        </div>

        <div className={styles.testimonial_card_container}>
          <div className={styles.testimonial_card}>
            <div className={styles.testimonial_left}>
              <Image src={dan} className={styles.testimonial_image} />
              <div className={styles.testimonial_separator}></div>
            </div>
            <div className={styles.testimonial_right}>
              <div className={styles.testimonial_user_info}>
                <div className={styles.testimonial_name}>Van Maverick</div>
                <div className={styles.testimonial_username}>@van_maverick</div>
              </div>
              <div className={styles.testimonial_p}>
                I like the vision, and the long term focus too. The @supernovas
                team is clearly highly organised and motivated motivated - very
                easy to recommend :)
              </div>
            </div>
          </div>
          <div className={styles.testimonial_card}>
            <div className={styles.testimonial_left}>
              <Image src={jason} className={styles.testimonial_image} />
              <div className={styles.testimonial_separator}></div>
            </div>
            <div className={styles.testimonial_right}>
              <div className={styles.testimonial_user_info}>
                <div className={styles.testimonial_name}>Jason Devlin</div>
                <div className={styles.testimonial_username}>@jasondevlin</div>
              </div>
              <div className={styles.testimonial_p}>
                I'm officially only referring people to @supernovas from now on,
                until another app changes my mind. Such a thoughtful UX, the
                best first impression out there I think.
              </div>
            </div>
          </div>
          <div className={styles.testimonial_card}>
            <div className={styles.testimonial_left}>
              <Image src={sumor} className={styles.testimonial_image} />
              <div className={styles.testimonial_separator}></div>
            </div>
            <div className={styles.testimonial_right}>
              <div className={styles.testimonial_user_info}>
                <div className={styles.testimonial_name}>Sumor</div>
                <div className={styles.testimonial_username}>@sumor</div>
              </div>
              <div className={styles.testimonial_p}>
                I want to thank the guys @supernovas, they are doing something
                incredible and convenient for artists, this is becoming my new
                home, I started minting all my nfts there 💜 Please don't stop
              </div>
            </div>
          </div>
          <div className={styles.testimonial_card}>
            <div className={styles.testimonial_left}>
              <Image src={nathan} className={styles.testimonial_image} />
              <div className={styles.testimonial_separator}></div>
            </div>
            <div className={styles.testimonial_right}>
              <div className={styles.testimonial_user_info}>
                <div className={styles.testimonial_name}>Nathan Wells</div>
                <div className={styles.testimonial_username}>@nathanwells</div>
              </div>
              <div className={styles.testimonial_p}>
                Seriously, if you all haven't checked out supernovas.app you
                need to now. Super clean interface and a way for smaller
                creators to become verified.
              </div>
            </div>
          </div>
          <div className={styles.testimonial_card}>
            <div className={styles.testimonial_left}>
              <Image
                src={derisha}
                className={styles.testimonial_image}
              />
              <div className={styles.testimonial_separator}></div>
            </div>
            <div className={styles.testimonial_right}>
              <div className={styles.testimonial_user_info}>
                <div className={styles.testimonial_name}>Derisha Aryawan</div>
                <div className={styles.testimonial_username}>@DerishaViar</div>
              </div>
              <div className={styles.testimonial_p}>
                The UI on @supernovas is sweeeet AF. I'm loving it, probably the
                best UI so far... Very clean and modern look, I will def use it
                more and recommend it to my friends!
              </div>
            </div>
          </div>
          <div className={styles.testimonial_card}>
            <div className={styles.testimonial_left}>
              <Image src={jody} className={styles.testimonial_image} />
              <div className={styles.testimonial_separator}></div>
            </div>
            <div className={styles.testimonial_right}>
              <div className={styles.testimonial_user_info}>
                <div className={styles.testimonial_name}>Jody Bossert</div>
                <div className={styles.testimonial_username}>@jodybossert</div>
              </div>
              <div className={styles.testimonial_p}>
                Wow. Surfing around on @supernovas for the first time in a while
                and it is REALLY looking good. Might just have to make this my
                new home!
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="statement-section" className={styles.statement_section}>
        <div className={styles.statement_section_container}>
          <div className={styles.statement_title}>
            <div className={styles.statement_title_singup}>
              Sign up and start earning today
            </div>
            <div className={styles.statement_buttons}>
              <a
                onClick={() => routeToSignUp()}
                className={[styles.button_27, styles.button_height_cp_2, styles.button_create].join(" ")}
              >
                <div className={styles.button_create_text}>Create profile</div>
              </a>

              <a
                onClick={() => routeToSNFeed()}
                className={[styles.browse_supernovas_cta_2 + " fs-24px"].join(" ")}
              >
                Browse Supernovas
                <i className="arrow-main" title="arrow icon"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* <!--            FOOTER            --> */}

      <footer className={styles.footer}>
        <div className={styles.footer_logo_container}>
          <Image src={snLogo} className={styles.footer_logo_img} />
        </div>
        <div className={styles.footer_separator}></div>
        <div className={styles.footer_separator}></div>
        <div className={styles.footer_social_links}>
          <a className={styles.footer_title}>SOCIAL</a>
          <a href="https://discord.gg/JHbhaFbPvN">Discord</a>
          <a href="https://twitter.com/supernovasdao">Twitter</a>
          <a href="https://instagram.com/supernovasdao">Instagram</a>
        </div>
        <div className={styles.footer_social_links}>
          <a className={styles.footer_title}>RESOURCES</a>
          <a href="https://www.blog.supernovas.app/">Blog</a>
          <a href="https://support.supernovas.app/en/">Support</a>
          <a href="https://investors.supernovas.app/investor-memorandum/">
            DAO
          </a>
          <a href="https://careers.supernovas.app/">Careers</a>
        </div>
        <div className={styles.footer_social_links}>
          <a className={styles.footer_title}>LEGAL</a>
          <a href="https://support.supernovas.app/en/">Terms of Service</a>
          <a href="https://support.supernovas.app/en/">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};
export default Landing;
