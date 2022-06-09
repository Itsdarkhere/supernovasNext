import styles from "../../styles/Reusables/searchBar.module.scss";

const SearchBar = () => {
  return (
    <>
      {/* [ngClass]="{ 'px-15px': isSearchForUsersToMessage }" #searchBarRoot */}
      <div className="w-100" id="searchBarRoot">
        {/* <!-- Input --> */}
        {/* [ngClass]="{ 'global__top-bar__height': !isSearchForUsersToMessage }" */}
        <div className="d-flex align-items-center w-100 text-grey8A fs-15px">
          <div className="input-group">
            <div className="input-group-prepend">
              {/* *ngIf="!sickSearchBar && !headerSearchBar && !mintSearchBar" */}
              <span className="input-group-text search-bar__icon">
                <i className="icon-search"></i>
              </span>
              {/*  *ngIf="!sickSearchBar && headerSearchBar" */}
              <span className="input-group-text search-bar__icon search_bar__icon_header">
                <img
                  src="/assets/icons/desktop_search_icon.svg"
                  alt="search icon"
                />
              </span>
              {/* *ngIf="sickSearchBar" */}
              <span className="input-group-text search-bar__icon search_bar__icon_sick">
                {/* <!-- IF this is null it gets a placeholder so thats fucking nice --> */}
                <Avatar
                  avatar={sickSearchBarAvatarPublicKey}
                  class="sick-search-avatar"
                ></Avatar>
              </span>
              {/* *ngIf="mintSearchBar" */}
              <span className="input-group-text search-bar__icon search_bar__icon_mint">
                <i className="icon-search"></i>
              </span>
            </div>
            {/* *ngIf="!sickSearchBar && !headerSearchBar && !mintSearchBar"
        #searchInput
        [(ngModel)]="searchText"
        (ngModelChange)="_handleSearchTextChange($event)"
        (keyup.arrowup)="_handleArrowKey('UP')"
        (keyup.arrowdown)="_handleArrowKey('DOWN')"
        (keyup.enter)="_handleCreatorSelect(creators[selectedCreatorIndex])"
        (keyup.escape)="_exitSearch()" */}
            {/* [ngClass]="{ 'br-12px': !isSearchForUsersToSendDESO }" */}
            <input
              type="text"
              className="form-control shadow-none search-bar__fix-active"
              style="font-size: 15px; padding-left: 0; border-left-color: rgba(0, 0, 0, 0)"
              placeholder="{{ placeHolder ? placeHolder : 'Search' }}"
            />
            {/* *ngIf="headerSearchBar"
        #searchInput
        [(ngModel)]="searchText"
        (ngModelChange)="_handleSearchTextChange($event)"
        (keyup.arrowup)="_handleArrowKey('UP')"
        (keyup.arrowdown)="_handleArrowKey('DOWN')"
        (keyup.enter)="_handleCreatorSelect(creators[selectedCreatorIndex])"
        (keyup.escape)="_exitSearch()" */}
            {/* [ngClass]="{ 'br-12px': !isSearchForUsersToSendDESO }" */}
            <input
              type="text"
              className="form-control header-search-bar shadow-none search-bar__fix-active"
              style="font-size: 15px; padding-left: 0; border-left-color: rgba(0, 0, 0, 0)"
              placeholder="Search for creators & collectors..."
            />
            {/* *ngIf="sickSearchBar"
        #searchInput
        [(ngModel)]="searchText"
        (ngModelChange)="_handleSearchTextChange($event)"
        (keyup.arrowup)="_handleArrowKey('UP')"
        (keyup.arrowdown)="_handleArrowKey('DOWN')"
        (keyup.enter)="_handleCreatorSelect(creators[selectedCreatorIndex])"
        (keyup.escape)="_exitSearch()" */}
            {/*  [ngClass]="{ 'br-12px': !isSearchForUsersToSendDESO }" */}
            <input
              type="text"
              className="form-control sick-search-bar shadow-none search-bar__fix-active"
              style="font-size: 15px; padding-left: 0; border-left-color: rgba(0, 0, 0, 0)"
              placeholder="{{ placeHolder ? placeHolder : 'Search' }}"
            />
            {/* *ngIf="mintSearchBar"
        #searchInput
        [(ngModel)]="searchText"
        (ngModelChange)="_handleSearchTextChange($event)"
        (keyup.arrowup)="_handleArrowKey('UP')"
        (keyup.arrowdown)="_handleArrowKey('DOWN')"
        (keyup.enter)="_handleCreatorSelect(creators[selectedCreatorIndex])"
        (keyup.escape)="_exitSearch()" */}
            <input
              type="text"
              className="form-control mint-search-bar shadow-none search-bar__fix-active"
              style="font-size: 15px; padding-left: 0;"
              placeholder="Search Deso profiles"
            />
          </div>
        </div>

        {/* <!-- Results Dropdown --> */}
        {/* *ngIf="searchText != '' && (creators.length > 0 || loading || showCloutavista)" */}
        <div className="w-100 search-bar__results-dropdown disable-scrollbars">
          {/* *ngIf="loading" */}
          <div className="d-flex justify-content-center fs-15px fc-muted p-5px">
            Loading...
          </div>
          {/* *ngIf="!loading && creators.length > 0" class="fs-15px" */}
          <div>
            {/* [ngClass]="{ 'search-bar__selected-color': creator.Username == creatorSelected }"
        (click)="_handleCreatorSelect(creators[selectedCreatorIndex])"
        (mouseover)="_handleMouseOver(creator.Username, ii)" *ngFor="let creator of creators; let ii = index"
        */}
            <div className="d-flex align-items-center">
              <Avatar
                class="search-bar__avatar m-10px"
                avatar={creator.PublicKeyBase58Check}
              ></Avatar>
              <div>
                <span>{creator.Username || creator.PublicKeyBase58Check}</span>
                {/* *ngIf="creator.IsReserved && !creator.IsVerified" */}
                {/* [matTooltip]="'This profile is reserved. Click to learn how to claim it.'" */}
                <span
                  className="d-inline-block ml-1 cursor-pointer lh-12px fc-muted"
                  matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
                >
                  <i className="far fa-clock fa-md align-middle"></i>
                </span>
                {/*  *ngIf="creator.IsVerified"
            (click)="tooltip.toggle()" */}
                {/* [matTooltip]="'This account is verified'"
            #tooltip="matTooltip" */}
                <span
                  className="ml-1 cursor-pointer text-primary"
                  matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
                >
                  <i className="fas fa-check-circle fa-md align-middle"></i>
                </span>
                {/* *ngIf="creator.CoinPriceDeSoNanos" */}
                <span>&nbsp;&middot;&nbsp;</span>
              </div>
              {/* *ngIf="creator.CoinPriceDeSoNanos" */}
              <div className="fc-muted">
                ~{globalVars.nanosToUSD(creator.CoinPriceDeSoNanos, 2)}
              </div>
            </div>
          </div>
          {/* <!-- Search Cloutavista --> */}
          {/* *ngIf="showCloutavista" */}
          <div className="main cloutavista-button">
            {/* [ngClass]="{ 'search-bar__selected-color': 'Cloutavista' == creatorSelected }"
        (mouseover)="_handleMouseOver('Cloutavista', -2)"
        (mouseout)="_handleMouseOut('Cloutavista', -2)" */}
            <a
              index="-2"
              href="https://www.cloutavista.com/bitclout/posts?text={{ searchText }}"
              target="_blank"
              rel="noreferrer"
            >
              <div className="search-bar__selected-color"></div>
              <p
                target="_blank"
                href="https://www.cloutavista.com/bitclout/posts?text={{ searchText }}"
              >
                <i className="fas fa-external-link-alt" aria-hidden="true"></i>
                Search on Cloutavista
              </p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchBar;
