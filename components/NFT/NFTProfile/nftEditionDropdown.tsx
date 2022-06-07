import styles from "../../../styles/NFT/NFTProfile/nftEditionDropdown.module.scss";

const NFTEditionDropdown = () => {
  // dropdown #dropdown="bs-dropdown"
  return (
    <div className="nft-edition-select position-relative">
      {/* [ngClass]="{ 'change-account-selector__shadow': selectorOpen }" */}
      <div
        className="fs-14px fc-default px-5px cursor-pointer nft-edition-selector change-account-selector__hover"
        dropdownToggle
        id="changeAccountButton"
        aria-controls="dropdown-basic"
      >
        {/* <!-- Selector (unopened state) --> */}
        <div className="w-100 d-flex flex-center justify-content-between pl-5px pr-5px">
          <div className="change-account-selector__ellipsis-restriction d-flex flex-row align-items-center cursor-pointer">
            <span className="fs-14px">
              {editionNumber} of {nftEntryResponses?.length}
            </span>
          </div>
          <i className="fas fa-angle-down change-account-selector__down-arrow"></i>
        </div>
      </div>
      {/* <!-- Drop-down (open state) --> */}
      {/* *dropdownMenu */}
      <div
        className="fs-14px fc-default px-5px cursor-pointer nft-edition-selector-list br-4px dropdown-menu"
        id="dropdown-basic"
        aria-labelledby="changeAccountButton"
      >
        {/* *ngFor="let nftEntry of nftEntryResponses; let rowNum = index" */}
        <div>
          {/* (mouseover)="hoverRow = rowNum"
        (click)="_switchToEdition(nftEntry.SerialNumber)" */}
          <div className="change-account-selector_list__inner pt-10px pb-10px pl-10px pr-10px d-flex align-items-center">
            {/* *ngIf="nftEntry.IsForSale" */}
            <span className="fs-12px nft-edition-list-item">
              Edition {nftEntry.SerialNumber} | For Sale
            </span>
            {/* *ngIf="!nftEntry.IsForSale" */}
            <span className="fs-12px nft-edition-list-item-sold">
              Edition {nftEntry.SerialNumber} | For Sale
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NFTEditionDropdown;
