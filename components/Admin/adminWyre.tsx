import styles from "../../styles/Admin/adminWyre.module.scss";

const AdminWyre = () => {
  return (
    <div>
      <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
        Get Wyre Orders for Public Key or Username:
        <div className="d-flex mt-5px">
          <input
            value={usernameToFetchWyreOrders}
            className="form-control w-100 fs-15px lh-15px"
            placeholder="Enter a username or public key."
          />
          {!loadingWyreOrders ? (
            <button
              onClick={() => _loadWyreOrders()}
              className="btn btn-outline-primary fs-15px ml-5px"
            >
              Fetch
            </button>
          ) : (
            <button className="btn btn-primary fs-15px ml-5px" disabled>
              Working...
            </button>
          )}
        </div>
      </div>
      {wyreOrders.map((order, index) => (
        <div key={index} className="px-15px">
          Order {order.LatestWyreWalletOrderWebhookPayload.orderId} --
          {order.LatestWyreWalletOrderWebhookPayload.orderStatus}
          <ul>
            <li>Created at: {order.Timestamp}</li>
            {order.LatestWyreWalletOrderWebhookPayload.failedReason ? (
              <li>
                Failed Reason:{" "}
                {order.LatestWyreWalletOrderWebhookPayload.failedReason}
              </li>
            ) : null}

            {order.LatestWyreTrackWalletOrderResponse ? (
              <li style="word-break: break-word">
                btc tx:{" "}
                {order.LatestWyreTrackWalletOrderResponse.blockchainNetworkTx}
              </li>
            ) : null}

            {order.LatestWyreTrackWalletOrderResponse ? (
              <li>
                Source amount:{" "}
                {order.LatestWyreTrackWalletOrderResponse.sourceAmount}
                {order.LatestWyreTrackWalletOrderResponse.sourceCurrency}
              </li>
            ) : null}

            {order.LatestWyreTrackWalletOrderResponse ? (
              <li>
                Destination amount:{" "}
                {order.LatestWyreTrackWalletOrderResponse.destAmount}
                {order.LatestWyreTrackWalletOrderResponse.destCurrency}
              </li>
            ) : null}

            {order.DeSoPurchasedNanos ? (
              <li>DeSo Nanos Purchased: {order.DeSoPurchasedNanos}</li>
            ) : null}

            {order.BasicTransferTxnHash ? (
              <li style={{ wordBreak: "break-word" }}>
                DeSo Basic Transfer Hash: {order.BasicTransferTxnHash}
              </li>
            ) : null}
          </ul>
        </div>
      ))}
    </div>
  );
};
export default AdminWyre;
