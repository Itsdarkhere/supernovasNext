import { useEffect, useState } from "react";
import styles from "../../styles/Reusables/searchBar.module.scss";
import {
  GetProfiles,
  GetSingleProfile,
  ProfileEntryResponse,
  stringifyError,
} from "../../utils/backendapi-context";
import {
  isMaybePublicKey,
  nanosToUSD,
  _alertError,
} from "../../utils/global-context";
import _ from "lodash";
import Avatar from "./avatar";
import { useAppSelector } from "../../utils/Redux/hooks";
import searchIcon from "../../public/icons/desktop_search_icon.svg";
import Image from "next/image";

const SearchBar = ({
  placeHolder,
  isSearchForUsersToMessage,
  isSearchForUsersToSendDESO,
  showCloutavista,
  startingSearchText,
  sickSearchBar,
  sickSearchBarAvatarPublicKey,
  headerSearchBar,
  mintSearchBar,
  // Functions
  creatorToMessage,
}) => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCreatorIndex, setSelectedCreatorIndex] = useState(null);
  const [creatorSelected, setCreatorSelected] = useState(null);
  // Vars
  let creators: ProfileEntryResponse[] = [];
  const DEBOUNCE_TIME_MS = 300;
  let debouncedSearchFunction: () => void;
  // Redux
  let loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  let localNode = useAppSelector((state) => state.node.localNode);

  // Functions
  const _handleMouseOver = (creator: string, index: number) => {
    setCreatorSelected(creator);
    setSelectedCreatorIndex(index);
  };

  const _handleMouseOut = (creator: string, index: number) => {
    if (creatorSelected === creator) {
      setCreatorSelected("");
    }
    if (selectedCreatorIndex === index) {
      setSelectedCreatorIndex(-1);
    }
  };

  // This search bar is used for more than just navigating to a user profile. It is also
  // used for finding users to message.  We handle both cases here.
  const _handleCreatorSelect = (creator: any) => {
    if (creator && creator != "") {
      if (isSearchForUsersToMessage || isSearchForUsersToSendDESO) {
        creatorToMessage.emit(creator);
      } else {
        // this.router.navigate(["/" + this.globalVars.RouteNames.USER_PREFIX, creator.Username], {
        //   queryParamsHandling: "merge",
        // });
      }
      _exitSearch();
    } else {
      // If a user presses the enter key while the cursor is still in the search bar,
      // this user should be redirected to the profile page of the user with the username
      // equal to that of the current searchText.
      if (searchText !== "" && !isSearchForUsersToMessage) {
        if (isSearchForUsersToSendDESO) {
          creatorToMessage(creators[0]);
        } else {
          //   this.router.navigate(["/" + this.globalVars.RouteNames.USER_PREFIX, this.searchText], {
          //     queryParamsHandling: "merge",
          //   });
        }
        _exitSearch();
      }
    }
  };

  const _handleSearchTextChange = (change: string) => {
    // When the search text changes we reset the arrow key selections.
    setCreatorSelected("");
    setSelectedCreatorIndex(-1);

    if (change === "") {
      // clear out the creators list to prevent a future search
      // from flashing with a list of creators, and skip
      // making an empty search request as well
      creators = [];
    } else {
      // show the loader now before calling the debounced search
      // to improve the user experience
      setLoading(true);
      // Then we filter the creator list based on the search text.
      debouncedSearchFunction();
    }
  };

  const _exitSearch = () => {
    setSearchText("");
    setCreatorSelected("");
    setSelectedCreatorIndex(-1);
  };

  const _searchUsernamePrefix = () => {
    // store the search text for the upcoming API call
    let requestedSearchText = searchText;
    let readerPubKey = "";
    if (loggedInUser) {
      readerPubKey = loggedInUser.PublicKeyBase58Check;
    }

    // If we are searching for a public key, call get single profile with the public key.
    if (isMaybePublicKey(requestedSearchText)) {
      return GetSingleProfile(localNode, requestedSearchText, "").subscribe(
        (res) => {
          if (
            requestedSearchText === searchText ||
            requestedSearchText === startingSearchText
          ) {
            setLoading(false);
            if (res.IsBlacklisted) {
              return;
            }
            creators = [res.Profile];
            if (startingSearchText) {
              // If starting search text is set, we handle the selection of the creator.
              _handleCreatorSelect(res.Profile);
            }
          }
        },
        (err) => {
          if (
            requestedSearchText === searchText ||
            requestedSearchText === startingSearchText
          ) {
            setLoading(false);
            // a 404 occurs for anonymous public keys.
            if (err.status === 404 && isMaybePublicKey(requestedSearchText)) {
              const anonProfile = {
                PublicKeyBase58Check: requestedSearchText,
                Username: "",
                Description: "",
              };
              creators = [anonProfile];
              // If starting search text is set, we handle the selection of the creator.
              _handleCreatorSelect(anonProfile);
              return;
            }
          }
          console.error(err);
          _alertError("Error loading profiles: " + stringifyError(err));
        }
      );
    }

    return GetProfiles(
      localNode,
      "" /*PublicKeyBase58Check*/,
      "" /*Username*/,
      searchText.trim().replace(/^@/, "") /*UsernamePrefix*/,
      "" /*Description*/,
      "" /*Order by*/,
      20 /*NumToFetch*/,
      readerPubKey /*ReaderPublicKeyBase58Check*/,
      "" /*ModerationType*/,
      false /*FetchUsersThatHODL*/,
      false /*AddGlobalFeedBool*/
    ).subscribe(
      (response) => {
        // only process this response if it came from
        // the request for the current search text
        if (
          requestedSearchText === searchText ||
          requestedSearchText === startingSearchText
        ) {
          setLoading(false);
          creators = response.ProfilesFound;
          // If starting search text is set, we handle the selection of the creator.
          if (startingSearchText && response.ProfilesFound.length) {
            _handleCreatorSelect(response.ProfilesFound[0]);
          }
        }
      },
      (err) => {
        // only process this response if it came from
        // the request for the current search text
        if (
          requestedSearchText === searchText ||
          requestedSearchText === startingSearchText
        ) {
          setLoading(false);
        }
        console.error(err);
        _alertError("Error loading profiles: " + stringifyError(err));
      }
    );
  };

  // Lifecycle methods
  useEffect(() => {
    debouncedSearchFunction = _.debounce(
      _searchUsernamePrefix.bind(this),
      DEBOUNCE_TIME_MS
    );
  }, []);

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
                <span className={styles.search_bar__icon_header + " input-group-text search-bar__icon"}>
                  <Image
                    src={searchIcon}
                    alt="search icon"
                  />
                </span>
              ) : null}

              {sickSearchBar ? (
                <span className={styles.search_bar__icon_sick + " input-group-text search-bar__icon"}>
                  {/* <!-- IF this is null it gets a placeholder so thats fucking nice --> */}
                  <Avatar
                    avatar={sickSearchBarAvatarPublicKey}
                    classN={styles.sick_search_avatar}
                  ></Avatar>
                </span>
              ) : null}

              {mintSearchBar ? (
                <span className={styles.search_bar__icon_mint + " input-group-text search-bar__icon"}>
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
                className={styles.header_search_bar + " form-control shadow-none search-bar__fix-active"}
                style={{
                  fontSize: "15px",
                  paddingLeft: "0",
                  borderLeftColor: "rgba(0, 0, 0, 0)",
                }}
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
                   styles.sick_search_bar,
                  "form-control shadow-none search-bar__fix-active",
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
                  tabIndex={-2}
                  href={
                    "https://www.cloutavista.com/bitclout/posts?text=" +
                    searchText
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="search-bar__selected-color"></div>
                  <p>
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
