import styles from "../../styles/Modals/nftSoldModal.module.scss";

const NFTSoldModal = () => {
  return (
    <div
      app-theme
      className="nft-modal-container nft_sold_modal overwrite-min-height-450 p-15px"
    >
      <ModalHeader
        header="'Your NFT is sold!'"
        bsModalRef="bsModalRef"
      ></ModalHeader>

      <div className="pb-15px fs-15px text-align-center mt-20px">
        Congratulations for selling your NFT! You have succeeded in illuminating
        someones world with the beauty you have created. 🌈
      </div>
      <br />
      <p className="text-align-center font-weight-bold mt-10px">
        Share your success with others by quote reposting the NFT you just sold!
      </p>
      {/* (click)="quoteRepost($event, true)" */}
      <button className="btn cta-button-gradient">Quote Repost the NFT</button>
    </div>
  );
};
export default NFTSoldModal;
