import styles from "../../../styles/Messages/messagesThreadView.module.scss";
import Image from "next/image";
import whiteSendIcon from "../../../public/icons/white-send.svg";

const MessagesThreadView = () => {
  // [ngClass]="!isMobile ? 'messages-thread-view' : ''"
  return (
    <div className="d-flex flex-column h-100 position-relative">
      {/* <!-- Top Bar --> */}
      {/* *ngIf="!isMobile" */}
      <div className="w-100 border-bottom border-color-grey messages-top-bar-height d-flex align-items-center pl-15px fs-15px font-weight-bold top-bar-messages-thread">
        {/* *ngIf="messageThread" */}
        {/* [ngClass]="{ 'cursor-auto': !counterpartyUsername() }"
      [routerLink]="counterpartyUsername() ? AppRoutingModule.profilePath(counterpartyUsername()) : []" */}
        {/*  [avatar]="messageThread.PublicKeyBase58Check" */}
        <a
          className="messages-thread__avatar mr-15px"
          queryParamsHandling="merge"
        ></a>
        {/* *ngIf="messageThread" */}
        <div>
          {/* <!-- Show username if avaialble--> */}
          {/* *ngIf="counterpartyUsername(); else elseBlock" */}
          <div>
            {/* [routerLink]="AppRoutingModule.profilePath(counterpartyUsername())" */}
            <a className="link--unstyled" queryParamsHandling="merge">
              <span>{counterpartyUsername()}</span>
              {/* *ngIf="messageThread.ProfileEntryResponse.IsVerified" */}
              <span className="ml-1 text-primary">
                <i className="fas fa-check-circle fa-md align-middle"></i>
              </span>
            </a>
          </div>
          {/* <!-- Otherwise show public key--> */}
          {/* <ng-template #elseBlock>
        { messageThread.PublicKeyBase58Check }
      </ng-template> */}
        </div>
      </div>

      {/* <!-- Messages Container --> */}
      <div
        className="w-100 h-100 background-messages-light m-0px p-0px"
        style={{ overflow: "hidden" }}
      >
        {/* *ngIf="messageThread"
      [ngClass]="!isMobile ? 'messages_scroll_height' : 'messages_scroll_height_mobile'"
      #messagesContainer */}
        <div
          className="p-15px w-100 disable-scrollbars"
          style="overflow-y: scroll"
          id="messagesContainer"
        >
          {/* *ngFor="let message of messageThread.Messages; let ii = index" */}
          <Message
            counterpartyName="counterpartyUsername()"
            nextMessage="ii < messageThread.Messages.length - 1 ? messageThread.Messages[ii + 1] : null"
            message="message"
            profile="messageThread.ProfileEntryResponse"
          ></Message>
          <div className="global__top-bar__height"></div>
        </div>
      </div>

      {/* <!-- Create Message Input --> */}
      <div className="send-message-thread-container">
        <div className="fake-textarea-container">
          <div className="avatar-box-send-message">
            {/* [avatar]="this.globalVars.loggedInUser.PublicKeyBase58Check" */}
            <a className="messages-thread__avatar_send_message"></a>
          </div>
          {/* #autosize="cdkTextareaAutosize"
        (keypress)="_messageTextChanged($event)"
        [(ngModel)]="messageText" 
        cdkTextareaAutosize
            cdkAutosizeMinRows="1"
            cdkAutosizeMaxRows="5"*/}
          <textarea
            placeholder="Write something here..."
            className="py-5px fs-15px messages-thread__border-radius flex-grow-1 form-control messages-textarea disable-scrollbars"
            style={{ height: "50px" }}
          ></textarea>
          {/* *ngIf="!sendMessageBeingCalled"
        (click)="_sendMessage()" */}
          <button className="btn btn-send-message fs-15px ml-15px messages-thread__border-radius">
            <Image src={whiteSendIcon} alt="send icon" />
          </button>
          {/* *ngIf="sendMessageBeingCalled" */}
          <button className="btn btn-send-message fs-15px ml-15px messages-thread__border-radius">
            <i className="fa fa-spinner fa-spin"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
export default MessagesThreadView;
