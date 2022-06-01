import WalletComponent from "../components/walletComponent";
import Page from "../components/page";
import TabSelector from "../components/tabSelector";
import { useState } from "react";
import ReferralsComponent from "../components/referralsComponent";
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
