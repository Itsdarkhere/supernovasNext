import { useRef } from "react";
import styles from "../../../styles/Messages/messagesInbox.module.scss";
import SearchBar from "../../Reusables/searchBar";
import MessagesThread from "../messages-thread/messagesThread";

const MessagesInbox = () => {
  const selectRef = useRef();
  return (
    <>
      {/* <!-- Top Bar --> */}
      <div className="w-100 messages-top-bar-height global__top-bar__height border-bottom border-color-grey d-flex align-items-center pl-15px fs-22px font-weight-bold">
        {/* <!-- Clear Inbox --> */}
        <img src="/assets/icons/chat-plane-icon.svg" className="mr-10px" />
        Messages
        {/* <!-- Settings --> */}
        <div className="d-flex w-100 h-100 justify-content-end align-items-center pr-10px">
          <div className="h-100 flex-center mr-10px">
            {!isSearchOpen ? (
              <img
                onClick={() => showSearchBar()}
                src="assets/icons/search-icon-mobile.svg"
                className="messages-search-icon"
                alt=""
              />
            ) : (
              <i className="icon-close" title="Close search"></i>
            )}
          </div>

          <button onClick={() => showSearchBar()} className="chat-new-message">
            <img src="/assets/icons/new-message.svg" className="pr-5px" />
            New
          </button>
        </div>
      </div>
      {messageThreads ? (
        <div className="messages-inbox__threads h-100 disable-scrollbars">
          {/* <!-- Search --> */}
          <div className="inbox-search-container border-bottom border-color-grey">
            {!isSearchOpen ? (
              <select
                onChange={() => _handleTabClick(selectRef.current.value)}
                ref={selectRef}
                id="message-inbox-select"
                className="inbox-select br-30px mt-15px mb-15px"
              >
                <option selected={activeTab === "All messages"}>
                  All messages
                </option>
                <option selected={activeTab === "My holders"}>
                  My holders
                </option>
              </select>
            ) : (
              <div className="inbox-search-cover mt-15px mb-15px">
                <SearchBar
                  showCloutavista={false}
                  isSearchForUsersToMessage={true}
                  startingSearchText={"Search"}
                  placeHolder={"Search to send a message..."}
                  messages={true}
                  creatorToMessage={(e) => _handleCreatorSelectedInSearch(e)}
                  nopads={true}
                ></SearchBar>
              </div>
            )}
          </div>
          {/* <!-- NOTE: We add any newMessageThread to the front of our messageThread array. -->
<!-- This is used to handle the creation of new message threads. --> */}
          {messageThreads.map((thread, ii) => (
            <div key={ii}>
              <MessagesThread
                click={() => _handleMessagesThreadClick(thread)}
                isSelected={
                  (selectedThread &&
                    selectedThread.PublicKeyBase58Check &&
                    thread.PublicKeyBase58Check ==
                      selectedThread.PublicKeyBase58Check) ||
                  (selectedThread === undefined && ii === 0)
                }
                thread={thread}
              ></MessagesThread>
            </div>
          ))}

          {/* *ngIf="showMoreButton()"*/}
          {showMoreButton() ? (
            <div
              onClick={() => loadMoreMessages()}
              className="w-100 py-15px d-flex align-items-center justify-content-center cursor-pointer creator-leaderboard__load-more"
            >
              {!fetchingMoreMessages ? (
                <div className="fs-15px">Load More</div>
              ) : (
                <div className="fs-15px">Loading...</div>
              )}
            </div>
          ) : null}

          {isMobile ? (
            <div>
              <div className="global__bottom-bar-mobile-height"></div>
              <div className="global__bottom-bar-mobile-height"></div>
              <div className="global__bottom-bar-mobile-height"></div>
            </div>
          ) : null}

          <div className="global__bottom-bar-mobile-height"></div>
        </div>
      ) : null}

      {isMobile ? (
        <BottomBarMobile showPostButton={showPostButton}></BottomBarMobile>
      ) : null}
    </>
  );
};
export default MessagesInbox;
