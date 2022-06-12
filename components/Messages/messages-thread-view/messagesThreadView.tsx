import styles from "../../../styles/Messages/messagesThreadView.module.scss";
import Image from "next/image";
import whiteSendIcon from "../../../public/icons/white-send.svg";
import Link from "next/link";
import { profilePath } from "../../../utils/routingFunctions";
import Avatar from "../../Reusables/avatar";

const MessagesThreadView = () => {
  return (
    <div
      className={[
        "d-flex flex-column h-100 position-relative",
        isMobile ? "messages-thread-view" : "",
      ].join(" ")}
    >
      {/* <!-- Top Bar --> */}
      {!isMobile ? (
        <div className="w-100 border-bottom border-color-grey messages-top-bar-height d-flex align-items-center pl-15px fs-15px font-weight-bold top-bar-messages-thread">
          {messageThread ? (
            <Avatar
              classN={[
                "messages-thread__avatar mr-15px",
                !counterpartyUsername() ? cursor - auto : "",
              ].join(" ")}
              avatar={messageThread.PublicKeyBase58Check}
            ></Avatar>
          ) : null}

          {messageThread ? (
            <div>
              {/* <!-- Show username if avaialble--> */}
              {counterpartyUsername() ? (
                <div>
                  <Link href={profilePath(counterpartyUsername())}>
                    <a className="link--unstyled">
                      <span>{counterpartyUsername()}</span>
                      {messageThread.ProfileEntryResponse.IsVerified ? (
                        <span className="ml-1 text-primary">
                          <i className="fas fa-check-circle fa-md align-middle"></i>
                        </span>
                      ) : null}
                    </a>
                  </Link>
                </div>
              ) : (
                <p>{messageThread.PublicKeyBase58Check}</p>
              )}
            </div>
          ) : null}
        </div>
      ) : null}

      {/* <!-- Messages Container --> */}
      <div
        className="w-100 h-100 background-messages-light m-0px p-0px"
        style={{ overflow: "hidden" }}
      >
        {messageThread ? (
          <div
            className={[
              "p-15px w-100 disable-scrollbars",
              !isMobile
                ? "messages_scroll_height"
                : "messages_scroll_height_mobile",
            ].join(" ")}
            style={{ overflowY: "scroll" }}
            id="messagesContainer"
          >
            {messageThread.Messages.map((message, ii) => (
              <Message
                key={ii}
                counterpartyName={counterpartyUsername()}
                nextMessage={
                  ii < messageThread.Messages.length - 1
                    ? messageThread.Messages[ii + 1]
                    : null
                }
                message={message}
                profile={messageThread.ProfileEntryResponse}
              ></Message>
            ))}

            <div className="global__top-bar__height"></div>
          </div>
        ) : null}
      </div>

      {/* <!-- Create Message Input --> */}
      <div className="send-message-thread-container">
        <div className="fake-textarea-container">
          <div className="avatar-box-send-message">
            <Avatar
              avatar={loggedInUser.PublicKeyBase58Check}
              classN="messages-thread__avatar_send_message"
            ></Avatar>
          </div>
          {/* #autosize="cdkTextareaAutosize" 
        cdkTextareaAutosize
            cdkAutosizeMinRows="1"
            cdkAutosizeMaxRows="5"*/}
          <textarea
            onKeyDownCapture={(e) => _messageTextChanged(e)}
            value={messageText}
            placeholder="Write something here..."
            className="py-5px fs-15px messages-thread__border-radius flex-grow-1 form-control messages-textarea disable-scrollbars"
            style={{ height: "50px" }}
          ></textarea>
          {!sendMessageBeingCalled ? (
            <button
              onClick={() => _sendMessage()}
              className="btn btn-send-message fs-15px ml-15px messages-thread__border-radius"
            >
              <Image src={whiteSendIcon} alt="send icon" />
            </button>
          ) : (
            <button className="btn btn-send-message fs-15px ml-15px messages-thread__border-radius">
              <i className="fa fa-spinner fa-spin"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default MessagesThreadView;
