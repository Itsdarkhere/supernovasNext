import styles from "../../styles/Modals/transferModal.module.scss";
import ModalHeader from "./modalHeader";

const TransferModal = () => {
  // [ngClass]="acceptModal ? 'overwrite-min-height2' : 'overwrite-min-height'"
  return (
    <div
      app-theme
      className="nft-modal-container p-15px align-items-center flex-center"
    >
      {/* *ngIf="step === 1" */}
      <div className="w-100 flex-center flex-column">
        {/* *ngIf="transferModal" */}
        <ModalHeader
          header="'Transfer your NFT'"
          bsModalRef="bsModalRef"
        ></ModalHeader>
        {/* *ngIf="acceptModal" */}
        <ModalHeader
          header="'Accept transfer'"
          bsModalRef="bsModalRef"
        ></ModalHeader>
        {/* *ngIf="burnModal" */}
        <ModalHeader header="'Burn NFT'" bsModalRef="bsModalRef"></ModalHeader>

        <div className="font-weight-bold w-90 d-flex align-items-center fs-15px pt-15px select-p-container flex-column">
          {/* *ngIf="transferModal" */}
          <label className="text-start w-100 transfer-label mb--12px ml-15px">
            Select the recipient
          </label>
          {/* *ngIf="burnModal" */}
          <label className="pb-15px burn-text text-center w-100">
            Burning destroys the NFT forever, which means you or anyone else
            cannot access it once it’s done.
          </label>
          {/* <!-- Search Bar --> */}
          {/* *ngIf="transferModal" */}
          <div className="search-bar-cover w-100">
            {/* <search-bar
          [showCloutavista]="false"
          [startingSearchText]="startingSearchText"
          [isSearchForUsersToSendDESO]="true"
          (creatorToMessage)="_handleCreatorSelectedInSearch($event)"
        ></search-bar> */}
          </div>
          {/* *ngIf="showDangerText || showDangerTextSendingToSelf" */}
          <label className="text-danger">
            {showDangerText
              ? "You must choose a user to send the NFT to"
              : "You cant send to yourself"}
          </label>
          {/* *ngIf="transferToCreator" */}
          <div className="pb-15px w-100 align-items-start">
            {/* <simple-profile-card
          [profile]="transferToCreator"
          [singleColumn]="true"
          [hideFollowLink]="true"
          *ngIf="transferToCreator"
        ></simple-profile-card> */}
          </div>
          {/* [ngClass]="burnModal ? 'w-90' : 'w-100'" */}
          <div>
            {/* *ngIf="transferModal && serialNumbers.length > 1" */}
            <label className="transfer-label text-start w-100 ml-10px">
              Select the edition you want to transfer
            </label>
            {/* *ngIf="burnModal" */}
            <label className="transfer-label text-start w-100 ml-10px">
              Pick the edition you wish to burn
            </label>
            {/* *ngIf="acceptModal" */}
            <label className="transfer-label text-start w-100 ml-10px">
              I would like to accept ownership of this NFT and add to my NFT
              gallery
            </label>
            {/* *ngIf="serialNumbers.length > 1"
         #selectElem
          (change)="setSer(selectElem.value)"*/}
            <select className="select-transfer-modal mb-10px pl-10px pr-10px w-100">
              {/* *ngFor="let ser of serialNumbers" [value]="ser.SerialNumber" */}
              <option>Serialnumber #{ser.SerialNumber}</option>
            </select>
          </div>
          {/* *ngIf="showInput" */}
          <div className="w-100 mt-10px">
            <p className="transfer-label text-start w-100">
              Add unlockable content ( required )
            </p>
            {/* [(ngModel)]="unlockableText" */}
            <textarea
              type="text"
              className="w-100 mt-5px textarea-transfer"
            ></textarea>
          </div>
        </div>
        <div className="flex-center w-90 fs-15px pt-15px mt-15px">
          {/* (click)="runCheck()" *ngIf="transferModal" */}
          <button className="transfer-modal-button transfer-button">
            Transfer NFT
          </button>
          {/* (click)="acceptNFTTransfer()" *ngIf="acceptModal" */}
          <button className="transfer-modal-button accept-button">
            Confirm
          </button>
          {/* (click)="stepTwo()" *ngIf="burnModal" */}
          <button className="transfer-modal-button burn-button">Burn</button>
        </div>
      </div>
      {/* <!-- STEP 2 --> */}
      {/* *ngIf="step === 2" */}
      <div className="w-100 flex-center flex-column">
        <img src="/assets/img/help_circle_outline.png" className="mt-15px" />
        {/* *ngIf="transferModal" */}
        <h2 className="text-center p-10px font-weight-bold">
          Are you sure you want to transfer this NFT?
        </h2>
        {/* *ngIf="burnModal" */}
        <h2 className="text-center p-10px font-weight-bold">
          Are you sure you want to burn this NFT?
        </h2>
        {/* *ngIf="transferModal"  */}
        <label className="text-center p-10px mt-20px mb-20px">
          Once the transfer is complete, the new owner will control this NFT.
        </label>
        {/* *ngIf="burnModal" */}
        <label className="text-center p-10px mt-20px mb-20px">
          Once the burn is completed the NFT is lost forever
        </label>
        {/* (click)="runCheck()" *ngIf="transferModal" */}
        <button className="transfer-modal-button transfer-button mb-15px">
          Confirm transfer
        </button>
        {/* (click)="burnNFT()"
         *ngIf="burnModal" */}
        {/* [ngClass]="step === 2 ? 'burn-button2' : 'burn-button'" */}
        <button className="transfer-modal-button mb-15px">
          🔥 Confirm burning🔥
        </button>
      </div>
      {/* <!-- STEP 3 --> */}
      {/* *ngIf="step === 3" */}
      <div className="w-100 h-100 accept-container">
        <img src="/assets/img/success.png" className="mt-15px success-img" />
        {/* *ngIf="transferModal" */}
        <h2 className="text-center p-10px pt-15px font-weight-bold">
          Success!
        </h2>
        {/* *ngIf="acceptModal" */}
        <h2 className="text-center p-10px pt-15px font-weight-bold">
          NFT received!
        </h2>
        {/* *ngIf="burnModal" */}
        <h2 className="text-center p-10px pt-15px font-weight-bold">
          NFT has been burned!
        </h2>
        {/* *ngIf="transferModal" */}
        <label className="text-center p-10px mt-20px mb-20px">
          Your NFT is now transferred! The new owner can accept the transfer by
          navigating to “Transfers” menu on their profile.
        </label>
        {/* *ngIf="acceptModal" */}
        <label className="text-center p-10px mt-20px mb-20px">
          The NFT has now been added to your profile and can be found in the
          gallery.
        </label>
        {/* *ngIf="burnModal" */}
        <label className="text-center p-10px mt-20px mb-20px">
          Your NFT is now gone forever. Good bye 👋
        </label>
        {/* (click)="hideAndRefresh()" */}
        <button className="transfer-modal-button close-window-button mb-15px">
          Close this window
        </button>
      </div>
    </div>
  );
};
export default TransferModal;
