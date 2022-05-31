import WalletComponent from "../components/walletComponent";
import Page from "../components/page";
import TabSelector from "../components/tabSelector";
const Wallet = () => {
  return (
    <Page isNFTProfile={false} noCap={false}>
      {/* *ngIf="globalVars?.loggedInUser?.ProfileEntryResponse?.Username" */}
      <div className="w-100 d-flex flex-center">
        <TabSelector
          tabs={["Wallet", "Referrals"]}
          activeTab="activeTab"
          tabClick="_handleTabClick($event)"
          icons={null}
          extraTab={null}
        ></TabSelector>
      </div>
      <WalletComponent></WalletComponent>
    </Page>
  );
};
export default Wallet;
