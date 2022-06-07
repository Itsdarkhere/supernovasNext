import styles from "../../../styles/Messages/messagesInbox.module.scss";

const MessagesInbox = () => {
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
            {/* (click)="showSearchBar()"
             *ngIf="!isSearchOpen" */}
            <img
              src="assets/icons/search-icon-mobile.svg"
              className="messages-search-icon"
              alt=""
            />
            {/* *ngIf="isSearchOpen" (click)="showSearchBar()" */}
            <i className="icon-close" title="Close search"></i>
          </div>
          {/* (click)="showSearchBar()" */}
          <button className="chat-new-message">
            <img src="/assets/icons/new-message.svg" className="pr-5px" />
            New
          </button>
        </div>
      </div>
      {/* *ngIf="messageThreads" */}
      <div className="messages-inbox__threads h-100 disable-scrollbars">
        {/* <!-- Search --> */}
        <div className="inbox-search-container border-bottom border-color-grey">
          {/* *ngIf="!isSearchOpen"
      #selectElem 
      (change)="_handleTabClick(selectElem.value)"*/}
          <select
            id="message-inbox-select"
            className="inbox-select br-30px mt-15px mb-15px"
          >
            {/* [selected]="this.activeTab === 'All messages'" */}
            <option>All messages</option>
            {/* [selected]="this.activeTab === 'My holders'" */}
            <option>My holders</option>
          </select>
          {/* *ngIf="isSearchOpen" */}
          <div className="inbox-search-cover mt-15px mb-15px">
            {/* <search-bar
        [showCloutavista]="false"
        [isSearchForUsersToMessage]="true"
        [startingSearchText]="Search"
        placeHolder="Search to send a message..."
        [messages]="true"
        (creatorToMessage)="_handleCreatorSelectedInSearch($event)"
        [nopads]="true"
      ></search-bar> */}
          </div>
        </div>
        {/* <!-- NOTE: We add any newMessageThread to the front of our messageThread array. -->
  <!-- This is used to handle the creation of new message threads. --> */}
        {/* *ngFor="let thread of messageThreads; let ii = index" */}
        <div>
          {/* <messages-thread
      click="_handleMessagesThreadClick(thread)"
      isSelected="
        (selectedThread &&
          selectedThread.PublicKeyBase58Check &&
          thread.PublicKeyBase58Check == selectedThread.PublicKeyBase58Check) ||
        (selectedThread === undefined && ii === 0)
      "
      thread="thread"
    ></messages-thread> */}
        </div>
        {/* *ngIf="showMoreButton()"
    (click)="loadMoreMessages()" */}
        <div className="w-100 py-15px d-flex align-items-center justify-content-center cursor-pointer creator-leaderboard__load-more">
          {/* *ngIf="!fetchingMoreMessages" */}
          <div className="fs-15px">Load More</div>
          {/* *ngIf="fetchingMoreMessages" */}
          <div className="fs-15px">Loading...</div>
        </div>
        {/* *ngIf="isMobile" */}
        <div>
          <div className="global__bottom-bar-mobile-height"></div>
          <div className="global__bottom-bar-mobile-height"></div>
          <div className="global__bottom-bar-mobile-height"></div>
        </div>
        <div className="global__bottom-bar-mobile-height"></div>
      </div>
      {/* <bottom-bar-mobile
  *ngIf="isMobile"
  class="global__bottom-bar-mobile scrolled"
  [showPostButton]="showPostButton"
></bottom-bar-mobile> */}
    </>
  );
};
export default MessagesInbox;
