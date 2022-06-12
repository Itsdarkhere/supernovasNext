import styles from "../../../styles/Messages/message.module.scss";
import { convertTstampToDateOrTime } from "../../../utils/global-context";

const Message = () => {
  return (
    <>
      {/* <!--                                         -->
<!-- LOGGED-IN USER *IS* THE MESSAGE SENDER. -->
<!--                                         --> */}
      {message.IsSender ? (
        <div className="message-container">
          {/* <!--"Pre-wrap" allows us to render new lines properly-->
<!--"overflow-wrap" prevents long words from overflowing messages container (such as URLs)-->
<!-- The messages are received from the backend encrypted. If we have the unencrypted
     text stored we use that instead. -->
<!-- Consider whether or not to show the timestamp. -->
<!--nextMessage ? message.IsSender != nextMessage.IsSender : true--> */}

          <Avatar
            classN="message__avatar mr-15px mt-5px"
            avatar={loggedInUser.PublicKeyBase58Check}
          ></Avatar>

          <div className="message-time-column">
            <div className="d-flex align-items-end">
              <p className="message-username">
                @{loggedInUser.ProfileEntryResponse.Username}
              </p>
              <div className="fs-12px fc-muted">
                {message.TstampNanos ? (
                  <span>{convertTstampToDateOrTime(message.TstampNanos)}</span>
                ) : (
                  <span>Sending...</span>
                )}
              </div>
            </div>
            {!message.TstampNanos ? (
              <div
                className="d-flex align-items-center messages-thread__border-radius fs-15px message__min-height message__sender-bubble-color"
                style="white-space: pre-wrap; overflow-wrap: anywhere"
              ></div>
            ) : null}

            {message.V2 && message.TstampNanos ? (
              <div
                className="d-flex align-items-center messages-thread__border-radius fs-15px message__min-height message__sender-bubble-color"
                style="white-space: pre-wrap; word-break: break-word; overflow-wrap: anywhere"
              >
                {message.DecryptedText}
              </div>
            ) : null}

            {!message.V2 && message.TstampNanos ? (
              <div
                className="d-flex align-items-center messages-thread__border-radius fs-15px message__min-height message__sender-bubble-color"
                style="white-space: pre-wrap; word-break: break-word; overflow-wrap: anywhere"
              >
                {messageMeta.decryptedMessgesMap[
                  loggedInUser.PublicKeyBase58Check + "" + message.TstampNanos
                ]
                  ? messageMeta.decryptedMessgesMap[
                      loggedInUser.PublicKeyBase58Check +
                        "" +
                        message.TstampNanos
                    ].DecryptedText
                  : "&#60;Message is not decryptable on this device&#62;"}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* <!--                                             -->
<!-- LOGGED-IN USER *IS NOT* THE MESSAGE SENDER. -->
<!--              --> */}
      {!message.IsSender ? (
        <div className="message-container">
          <Avatar avatar={message.SenderPublicKeyBase58Check} classN="message__avatar mr-15px mt-5px"></Avatar>
          {/* <!--"Pre-wrap" allows us to render new lines properly-->
<!-- Messages that the user receives can be returned from the backend unencrypted. --> */}
          <div className="message-time-column">
            <div className="message-name-stamp">
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
      ) : null}

      <div className="mt-10px"></div>
    </>
  );
};
export default Message;
