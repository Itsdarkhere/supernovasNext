import styles from "../../../styles/Messages/message.module.scss";

const Message = () => {
  return (
    <>
      {/* <!--                                         -->
<!-- LOGGED-IN USER *IS* THE MESSAGE SENDER. -->
<!--                                         --> */}
      {/* *ngIf="message.IsSender" */}
      <div className="message-container">
        {/* <!--"Pre-wrap" allows us to render new lines properly-->
  <!--"overflow-wrap" prevents long words from overflowing messages container (such as URLs)-->
  <!-- The messages are received from the backend encrypted. If we have the unencrypted
       text stored we use that instead. -->
  <!-- Consider whether or not to show the timestamp. -->
  <!--nextMessage ? message.IsSender != nextMessage.IsSender : true--> */}

        {/* [avatar]="globalVars.loggedInUser.PublicKeyBase58Check" */}
        <div className="message__avatar mr-15px mt-5px"></div>

        <div className="message-time-column">
          {/* *ngIf="message.IsSender" */}
          <div className="d-flex align-items-end">
            <p className="message-username">
              @{globalVars.loggedInUser.ProfileEntryResponse.Username}
            </p>
            <div className="fs-12px fc-muted">
              {/* *ngIf="message.TstampNanos" */}
              <span>
                {globalVars.convertTstampToDateOrTime(message.TstampNanos)}
              </span>
              {/* *ngIf="!message.TstampNanos" */}
              <span>Sending...</span>
            </div>
          </div>
          {/* *ngIf="!message.TstampNanos" */}
          <div
            className="d-flex align-items-center messages-thread__border-radius fs-15px message__min-height message__sender-bubble-color"
            style="white-space: pre-wrap; overflow-wrap: anywhere"
          ></div>
          {/* *ngIf="message.V2 && message.TstampNanos" */}
          <div
            className="d-flex align-items-center messages-thread__border-radius fs-15px message__min-height message__sender-bubble-color"
            style="white-space: pre-wrap; word-break: break-word; overflow-wrap: anywhere"
          >
            {message.DecryptedText}
          </div>
          {/* *ngIf="!message.V2 && message.TstampNanos" */}
          <div
            className="d-flex align-items-center messages-thread__border-radius fs-15px message__min-height message__sender-bubble-color"
            style="white-space: pre-wrap; word-break: break-word; overflow-wrap: anywhere"
          >
            {globalVars.messageMeta.decryptedMessgesMap[
              globalVars.loggedInUser.PublicKeyBase58Check +
                "" +
                message.TstampNanos
            ]
              ? globalVars.messageMeta.decryptedMessgesMap[
                  globalVars.loggedInUser.PublicKeyBase58Check +
                    "" +
                    message.TstampNanos
                ].DecryptedText
              : "&#60;Message is not decryptable on this device&#62;"}
          </div>
        </div>
      </div>

      {/* <!--                                             -->
<!-- LOGGED-IN USER *IS NOT* THE MESSAGE SENDER. -->
<!--              --> */}
      {/* *ngIf="!message.IsSender" */}
      <div className="message-container">
        {/* [avatar]="message.SenderPublicKeyBase58Check" */}
        <div className="message__avatar mr-15px mt-5px"></div>
        {/* <!--"Pre-wrap" allows us to render new lines properly-->
  <!-- Messages that the user receives can be returned from the backend unencrypted. --> */}
        <div className="message-time-column">
          {/* *ngIf="!message.IsSender" */}
          <div className="message-name-stamp">
            {/* <!--<div class="message__avatar-placeholder"></div>--> */}
            {/* <!--nextMessage ? message.IsSender != nextMessage.IsSender : true--> */}
            <p className="message-username">@{counterpartyName}</p>
            <div className="fs-12px fc-muted">
              {globalVars.convertTstampToDateOrTime(message.TstampNanos)}
            </div>
          </div>
          <div
            className="d-flex align-items-center py-5px messages-thread__border-radius fs-15px message__min-height background-color-message-selected disable-scrollbars"
            style="white-space: pre-wrap; word-break: break-word; overflow-wrap: anywhere"
          >
            {message.DecryptedText}
          </div>
        </div>
      </div>

      <div className="mt-10px"></div>
    </>
  );
};
export default Message;
