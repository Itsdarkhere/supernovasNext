import Image from "next/image";
import styles from "../../styles/Dao/investBox.module.scss";
import buttonIcon from "../../public/icons/ib_button_icon.svg";
import completeIcon from "../../public/icons/ib_completed.svg";
import selectedIcon from "../../public/icons/ib_selected.svg";
const InvestBox = () => {
  // Functions
  const linkToInvest = () => {
    window.open("https://beta.daodao.io/d/supernovas", "_blank");
  };
  return (
    <div className={"w-100 position-relative " + styles.investor_box_wrapper}>
      <div className={styles.invest_box}>
        <span className={styles.top_sec}>
          <div></div>
          <h4>Early bird token sale is live</h4>
        </span>
        <span className={styles.mid_sec}>
          <p>
            Invest in Supernovas DAO token and receive an undisputable ownership
            claim of Supernovas DAO. Ownership of Supernovas DAO token enables
            holders to benefit from the growth of Supernovas DAO from financial
            incentives and DAO governance.
          </p>
          <div>
            <button
              onClick={() => linkToInvest()}
              className={styles.btn_invest_now}
            >
              <Image
                alt="button icon"
                className={styles.mr_5px}
                height="26px"
                src={buttonIcon}
              />
              Invest Now
            </button>
            <label className={"mb-0px " + styles.powered_by}>
              TOKEN SALE POWERED BY (DAO, DAO)
            </label>
            {/* Check works ,,, that noreferrer works as intended */}
            <a
              href="https://daodao.io"
              target="_blank"
              rel="noreferrer"
              className={styles.daodao}
            >
              daodao.io
            </a>
          </div>
        </span>
        <div className={styles.bottom_sec}>
          <label className={"mb-0px" + styles.bottom_sec_header}>
            Fundraising schedule
          </label>
          <div className={styles.bottom_sec_grid}>
            <section>
              <div className={styles.line}></div>
              <div className={styles.section_text_container}>
                <label className={"mb-0px " + styles.section_header}>
                  <Image height="26px" alt="icon-selected" src={completeIcon} />
                  Pre-sale
                </label>
                <div className={styles.sec_bottom}>
                  <div>
                    <label className="mb-0px">PRICE</label>
                    <p>~$0.08</p>
                  </div>
                  <div className={styles.ml_10p}>
                    <label className="mb-0px">TOKENS SOLD</label>
                    <p>0.44%</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className={styles.line + " " + styles.line_selected}></div>
              <div className={styles.section_text_container}>
                <label
                  className={
                    "mb-0px " +
                    styles.section_header +
                    " " +
                    styles.text_selected
                  }
                >
                  <Image height="20px" alt="icon-selected" src={selectedIcon} />
                  Early bird
                </label>
                <div className={styles.sec_bottom}>
                  <div>
                    <label className="mb-0px">PRICE</label>
                    <p className="text_selected">0.0059</p>
                    <p className="text_selected">DESO</p>
                  </div>
                  <div className={styles.ml_10p}>
                    <label className="mb-0px">TOKENS FOR SALE</label>
                    <p className={styles.text_selected}>1.25%</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className={styles.line}></div>
              <div className={styles.section_text_container}>
                <label className={"mb-0px " + styles.section_header}>
                  <div className={styles.ib_to_come}></div>
                  Round A
                </label>
                <div className={styles.sec_bottom}>
                  <div>
                    <label className="mb-0px">PRICE</label>
                    <p>~0.0061</p>
                    <p>DESO</p>
                  </div>
                  <div className={styles.ml_10p}>
                    <label className="mb-0px">TOKENS FOR SALE</label>
                    <p>~9%</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className={styles.line}></div>
              <div className={styles.section_text_container}>
                <label className={"mb-0px " + styles.section_header}>
                  <div className={styles.ib_to_come}></div>
                  Round B
                </label>
                <div className={styles.sec_bottom}>
                  <div>
                    <label className="mb-0px">PRICE</label>
                    <p>TBD</p>
                  </div>
                  <div className={styles.ml_10p}>
                    <label className="mb-0px">TOKENS FOR SALE</label>
                    <p>~15%</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InvestBox;
