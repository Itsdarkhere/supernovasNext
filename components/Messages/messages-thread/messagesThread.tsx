import styles from "../../../styles/Messages/messagesThread.module.scss";
import Avatar from "../../Reusables/avatar";

const MessagesThread = () => {
  //     (mouseover)="isHovered = true"
  //   (mouseleave)="isHovered = false"
  //   [ngClass]="{
  //     'messages-inbox__selected-thread': isHovered || isSelected,
  //     'message-thread-grey': isHovered,
  //     'unread-message-balloon':
  //       globalVars.messageResponse &&
  //       globalVars.messageResponse.UnreadStateByContact[thread.PublicKeyBase58Check] !== undefined &&
  //       globalVars.messageResponse.UnreadStateByContact[thread.PublicKeyBase58Check] === true
  //   }"
  return (
    <div className="d-flex align-items-center px-15px pb-15px pt-10px cursor-pointer border-bottom border-color-grey position-relative">
      <Avatar
        classN="messages-thread__avatar"
        avatar={thread.PublicKeyBase58Check}
      ></Avatar>
      {/* <!-- The CSS styles / classes get pretty dense here. Sorry! --> */}
      <div
        className="flex-grow-1 fs-15px ml-15px"
        style={{ overflow: "hidden" }}
      >
        <div
          className="d-flex align-items-center"
          style={{ overflow: "hidden", whiteSpace: "pre" }}
        >
          <div
            className="flex-grow-1 d-flex align-items-center"
            style={{ overflow: "hidden" }}
          >
            <div className="messages-thread__ellipsis-restriction-username">
              @
              {thread.ProfileEntryResponse &&
              thread.ProfileEntryResponse.Username
                ? thread.ProfileEntryResponse.Username
                : thread.PublicKeyBase58Check}
            </div>
            {thread.ProfileEntryResponse?.IsVerified ? (
              <span className="ml-1 text-primary">
                <i className="fas fa-check-circle fa-md align-middle"></i>
              </span>
            ) : null}
          </div>
          {thread.Messages.length > 0 ? (
            <div className="fc-muted">
              {globalVars.convertTstampToDateOrTime(
                thread.Messages[thread.Messages.length - 1].TstampNanos
              )}
            </div>
          ) : null}
        </div>
        {thread.Messages.length > 0 ? (
          <div>
            {/* <!-- If we are the sender, we need to bank on the decryptedMessageMap having the decrypted text. --> */}
            {thread.Messages[thread.Messages.length - 1].IsSender ? (
              <div className="messages-thread__ellipsis-restriction w-90">
                {globalVars.messageMeta.decryptedMessgesMap[
                  thread.Messages[thread.Messages.length - 1]
                    .SenderPublicKeyBase58Check +
                    "" +
                    thread.Messages[thread.Messages.length - 1].TstampNanos
                ]
                  ? globalVars.messageMeta.decryptedMessgesMap[
                      thread.Messages[thread.Messages.length - 1]
                        .SenderPublicKeyBase58Check +
                        "" +
                        thread.Messages[thread.Messages.length - 1].TstampNanos
                    ].DecryptedText
                  : thread.Messages[thread.Messages.length - 1].DecryptedText}
              </div>
            ) : (
              <div className="messages-thread__ellipsis-restriction w-90">
                {thread.Messages[thread.Messages.length - 1].DecryptedText}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default MessagesThread;
