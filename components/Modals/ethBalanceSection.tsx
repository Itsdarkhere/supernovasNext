import styles from "../../styles/Modals/modalBalanceSection.module.scss";
import walletIcon from "../../public/icons/wallet-icon.svg";
import desoIcon from "../../public/icons/desologo.svg";
import ethIcon from "../../public/eth/ethlogo.svg";
import Image from "next/image";
import { nanosToUSD } from "../../utils/global-context";

const ModalBalanceSection = () => {
  return (
    <section className="plb-balance-box">
      <span className="spn-one">
        <Image src={walletIcon} alt="wallet icon" className="mr-5px" />
        YOUR WALLET BALANCE
      </span>
      {blockchainDeso ? (
        <span className="spn-two">
          <Image src={desoIcon} alt="deso icon" className="mr-5px" />
          <label className="lbl-one mb-0px">
            ~{nanosToDeSo(loggedInUser.BalanceNanos, 2)} DESO
          </label>
          <label className="lbl-two mb-0px">
            {nanosToUSD(loggedInUser.BalanceNanos, 2)}
          </label>
        </span>
      ) : (
        <span className="spn-two">
          <Image src={ethIcon} alt="eth icon" className="mr-5px" />
          <label className="lbl-one mb-0px">~{globalVars.imxBalance} ETH</label>
        </span>
      )}
    </section>
  );
};
export default ModalBalanceSection;
