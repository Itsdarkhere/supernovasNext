import WalletComponent from "../components/Wallet/walletComponent";
import Page from "../components/Wrappers/page";
import TabSelector from "../components/Reusables/tabSelector";
import { useState } from "react";
import ReferralsComponent from "../components/Wallet/referralsComponent";
const Wallet = () => {
  const [activeTab, setActiveTab] = useState("Wallet");

  const handleTabClick = (event: string) => {
    console.log(event);
    if (event != activeTab) {
      setActiveTab(event);
    }
  };

  return (
    <Page isNFTProfile={false} noCap={false}>
      {/* *ngIf="globalVars?.loggedInUser?.ProfileEntryResponse?.Username" */}
      <div className="w-100 d-flex flex-center">
        <TabSelector
          tabs={["Wallet", "Referrals"]}
          activeTab={activeTab}
          tabClick={handleTabClick}
          icons={null}
          extraTab={null}
        ></TabSelector>
      </div>
      {activeTab === "Wallet" ? (
        <WalletComponent></WalletComponent>
      ) : (
        <ReferralsComponent></ReferralsComponent>
      )}
    </Page>
  );
};
export default Wallet;
