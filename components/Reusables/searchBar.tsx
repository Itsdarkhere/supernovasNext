import styles from "../../styles/Reusables/searchBar.module.scss";
import { nanosToUSD } from "../../utils/global-context";
import Avatar from "./avatar";

const SearchBar = () => {
  return (
    <>
      {/* #searchBarRoot */}
      <div
        className={["w-100", isSearchForUsersToMessage ? "px-15px" : ""].join(
          " "
        )}
        id="searchBarRoot"
      >
        {/* <!-- Input --> */}
        <div
          className={[
            "d-flex align-items-center w-100 text-grey8A fs-15px",
            !isSearchForUsersToMessage ? "global__top-bar__height" : "",
          ].join(" ")}
        >
          <div className="input-group">
            <div className="input-group-prepend">
              {!sickSearchBar && !headerSearchBar && !mintSearchBar ? (
                <span className="input-group-text search-bar__icon">
                  <i className="icon-search"></i>
                </span>
              ) : null}

              {!sickSearchBar && headerSearchBar ? (
                <span className="input-group-text search-bar__icon search_bar__icon_header">
                  <img
                    src="/assets/icons/desktop_search_icon.svg"
                    alt="search icon"
                  />
                </span>
              ) : null}

              {sickSearchBar ? (
                <span className="input-group-text search-bar__icon search_bar__icon_sick">
                  {/* <!-- IF this is null it gets a placeholder so thats fucking nice --> */}
                  <Avatar
                    avatar={sickSearchBarAvatarPublicKey}
                    classN="sick-search-avatar"
                  ></Avatar>
                </span>
              ) : null}

              {mintSearchBar ? (
                <span className="input-group-text search-bar__icon search_bar__icon_mint">
                  <i className="icon-search"></i>
                </span>
              ) : null}
            </div>
            {/*
        #searchInput
        (keyup.arrowup)="_handleArrowKey('UP')"
        (keyup.arrowdown)="_handleArrowKey('DOWN')"
        (keyup.enter)="_handleCreatorSelect(creators[selectedCreatorIndex])"
        (keyup.escape)="_exitSearch()" */}
            {/* [ngClass]="{ 'br-12px': !isSearchForUsersToSendDESO }" */}
            {!sickSearchBar && !headerSearchBar && !mintSearchBar ? (
              <input
                value={searchText}
                onChange={(e) => _handleSearchTextChange(e)}
                type="text"
                className="form-control shadow-none search-bar__fix-active"
                style="font-size: 15px; padding-left: 0; border-left-color: rgba(0, 0, 0, 0)"
                placeholder="{{ placeHolder ? placeHolder : 'Search' }}"
              />
            ) : null}

            {/*
        #searchInput
        [(ngModel)]="searchText"
        (ngModelChange)="_handleSearchTextChange($event)"
        (keyup.arrowup)="_handleArrowKey('UP')"
        (keyup.arrowdown)="_handleArrowKey('DOWN')"
        (keyup.enter)="_handleCreatorSelect(creators[selectedCreatorIndex])"
        (keyup.escape)="_exitSearch()" */}
            {/* [ngClass]="{ 'br-12px': !isSearchForUsersToSendDESO }" */}
            {headerSearchBar ? (
              <input
                type="text"
                className="form-control header-search-bar shadow-none search-bar__fix-active"
                style="font-size: 15px; padding-left: 0; border-left-color: rgba(0, 0, 0, 0)"
                placeholder="Search for creators & collectors..."
              />
            ) : null}

            {/*
        #searchInput
        (ngModelChange)="_handleSearchTextChange($event)"
        (keyup.arrowup)="_handleArrowKey('UP')"
        (keyup.arrowdown)="_handleArrowKey('DOWN')"
        (keyup.enter)="_handleCreatorSelect(creators[selectedCreatorIndex])"
        (keyup.escape)="_exitSearch()" */}
            {sickSearchBar ? (
              <input
                value={searchText}
                type="text"
                className={[
                  "form-control sick-search-bar shadow-none search-bar__fix-active",
                  !isSearchForUsersToSendDESO ? "br-12px" : "",
                ].join(" ")}
                style={{
                  fontSize: "15px",
                  paddingLeft: "0",
                  borderLeftColor: "rgba(0, 0, 0, 0)",
                }}
                placeholder={placeHolder ? placeHolder : "Search"}
              />
            ) : null}

            {/*
            #searchInput
            (ngModelChange)="_handleSearchTextChange($event)"
            (keyup.arrowup)="_handleArrowKey('UP')"
            (keyup.arrowdown)="_handleArrowKey('DOWN')"
            (keyup.enter)="_handleCreatorSelect(creators[selectedCreatorIndex])"
            (keyup.escape)="_exitSearch()" */}
            {mintSearchBar ? (
              <input
                value={searchText}
                type="text"
                className="form-control mint-search-bar shadow-none search-bar__fix-active"
                style={{ fontSize: "15px", paddingLeft: "0" }}
                placeholder="Search Deso profiles"
              />
            ) : null}
          </div>
        </div>

        {/* <!-- Results Dropdown --> */}
        {searchText != "" &&
        (creators.length > 0 || loading || showCloutavista) ? (
          <div className="w-100 search-bar__results-dropdown disable-scrollbars">
            {loading ? (
              <div className="d-flex justify-content-center fs-15px fc-muted p-5px">
                Loading...
              </div>
            ) : null}

            {!loading && creators.length > 0 ? (
              <div className="fs-15px">
                {creators.map((creator, ii) => (
                  <div
                    key={ii}
                    onMouseOver={() => _handleMouseOver(creator.Username, ii)}
                    onClick={() =>
                      _handleCreatorSelect(creators[selectedCreatorIndex])
                    }
                    className={[
                      "d-flex align-items-center",
                      creator.Username == creatorSelected
                        ? "search-bar__selected-color"
                        : "",
                    ].join(" ")}
                  >
                    <Avatar
                      classN="search-bar__avatar m-10px"
                      avatar={creator.PublicKeyBase58Check}
                    ></Avatar>
                    <div>
                      <span>
                        {creator.Username || creator.PublicKeyBase58Check}
                      </span>
                      {/* [matTooltip]="'This profile is reserved. Click to learn how to claim it.'" */}
                      {creator.IsReserved && !creator.IsVerified ? (
                        <span
                          className="d-inline-block ml-1 cursor-pointer lh-12px fc-muted"
                          matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
                        >
                          <i className="far fa-clock fa-md align-middle"></i>
                        </span>
                      ) : null}

                      {/* [matTooltip]="'This account is verified'"
          #tooltip="matTooltip" */}
                      {creator.IsVerified ? (
                        <span
                          onClick={() => tooltip.toggle()}
                          className="ml-1 cursor-pointer text-primary"
                          matTooltipClass="global__mat-tooltip global__mat-tooltip-font-size"
                        >
                          <i className="fas fa-check-circle fa-md align-middle"></i>
                        </span>
                      ) : null}

                      {creator.CoinPriceDeSoNanos ? (
                        <span>&nbsp;&middot;&nbsp;</span>
                      ) : null}
                    </div>
                    {creator.CoinPriceDeSoNanos ? (
                      <div className="fc-muted">
                        ~{nanosToUSD(creator.CoinPriceDeSoNanos, 2)}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}

            {/* <!-- Search Cloutavista --> */}
            {showCloutavista ? (
              <div className="main cloutavista-button">
                <a
                  className={
                    "Cloutavista" == creatorSelected
                      ? "search-bar__selected-color"
                      : ""
                  }
                  onMouseOver={() => _handleMouseOver("Cloutavista", -2)}
                  onMouseOut={() => _handleMouseOut("Cloutavista", -2)}
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
                    <i
                      className="fas fa-external-link-alt"
                      aria-hidden="true"
                    ></i>
                    Search on Cloutavista
                  </p>
                </a>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
};
export default SearchBar;
