import styles from "../../styles/Admin/networkInfo.module.scss";

const NetworkInfo = () => {
  return (
    <>
      <div className="fs-15px font-weight-bold mt-15px px-15px">
        Node Sync State
        <div>
          {globalVars.nodeInfo.DeSoStatus.State === 'SYNCING_BITCOIN' ? (
            <span style={{ color: "goldenrod" }}>Syncing Bitcoin Headers</span>
          ) : null}
          {globalVars.nodeInfo.DeSoStatus.State === 'SYNCING_HEADERS' ? (
            <span style={{ color: "goldenrod" }}>Syncing DeSo Headers</span>
          ) : null}
          {globalVars.nodeInfo.DeSoStatus.State === 'SYNCING_BLOCKS' ? (
            <span style={{ color: "goldenrod" }}>Syncing DeSo Blocks</span>
          ) : null}
          {globalVars.nodeInfo.DeSoStatus.State === 'NEED_BLOCKS' ? (
            <span style={{ color: "goldenrod" }}>Syncing Last DeSo Blocks</span>
          ) : null}
          {globalVars.nodeInfo.DeSoStatus.State === "FULLY_CURRENT" ? (
            <span style={{ color: "goldenrod" }}>Fully Synced</span>
          ) : null}
        </div>
      </div>

      <div className="fs-15px mt-15px px-15px">
        <span
          onClick={() => (isOpen.detailedSyncInfo = !isOpen.detailedSyncInfo)}
          className="font-weight-bold cursor-pointer"
        >
          {isOpen.detailedSyncInfo ? (
            <i className="fas fa-caret-down"></i>
          ) : (
            <i className="fas fa-caret-right"></i>
          )}
          Detailed Sync Info
        </span>
        {isOpen.detailedSyncInfo ? (
          <div className="ml-15px">
            {globalVars.nodeInfo.DeSoStatus.State === "SYNCING_HEADERS" ? (
              <div>
                DeSo Headers Left:
                <div className="fc-blue">
                  {nodeInfo.DeSoStatus.HeadersRemaining}
                </div>
              </div>
            ) : null}
            {globalVars.nodeInfo.DeSoStatus.State === "SYNCING_BLOCKS" ||
            globalVars.nodeInfo.DeSoStatus.State === "NEED_BLOCKS" ? (
              <div>
                <div>DeSo Blocks Left:</div>
                <div className="fc-blue">
                  {nodeInfo.DeSoStatus.BlocksRemaining}
                </div>
              </div>
            ) : null}
            Last Block Height:
            <div className="fc-blue d-flex align-items-center">
              <span>{nodeInfo.DeSoStatus.LatestHeaderHeight}</span>
              <div
                onClick={() => _copyNetworkInfo("lastBlockHeight")}
                className="btn btn-outline-secondary d-flex fs-15px p-5px ml-10px"
              >
                <i className="far fa-copy fa-xs"></i>
              </div>
              {isCopied.lastBlockHeight ? (
                <div className="fs-15px px-5px py-0px">
                  <i className="far fa-check-circle fa-xs"></i>
                </div>
              ) : null}
            </div>
            Last Block Hash:
            <div className="fc-blue d-flex align-items-center">
              {nodeInfo.DeSoStatus.LatestHeaderHash.slice(0, 15)}...
              <div
                onClick={() => _copyNetworkInfo("lastBlockHash")}
                className="btn btn-outline-secondary d-flex fs-15px p-5px ml-10px"
              >
                <i className="far fa-copy fa-xs"></i>
              </div>
              {isCopied.lastBlockHash ? (
                <div className="fs-15px px-5px py-0px">
                  <i className="far fa-check-circle fa-xs"></i>
                </div>
              ) : null}
            </div>
            Last Block Time:
            <div className="fc-blue">
              {_tstampToDate(nodeInfo.DeSoStatus.LatestHeaderTstampSecs)}
            </div>
            {globalVars.nodeInfo.DeSoStatus.LatestTxIndexHeight ? (
              <span>
                Last TxIndex Block Height:
                <div className="fc-blue">
                  {nodeInfo.DeSoStatus.LatestTxIndexHeight}
                </div>
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="fs-15px mt-15px px-15px">
        <span
          onClick={() => (isOpen.minerInfo = !isOpen.minerInfo)}
          className="font-weight-bold cursor-pointer"
        >
          {isOpen.minerInfo ? (
            <i className="fas fa-caret-down"></i>
          ) : (
            <i className="fas fa-caret-right"></i>
          )}
          Miner Info
        </span>
        {isOpen.minerInfo ? (
          <div className="ml-15px">
            Miner Status:
            {globalVars.nodeInfo.MinerPublicKeys != null &&
            globalVars.nodeInfo.MinerPublicKeys.length > 0 ? (
              <div className="font-weight-bold" style={{ color: "green" }}>
                Currently Mining
              </div>
            ) : null}
            {globalVars.nodeInfo.MinerPublicKeys == null ||
            globalVars.nodeInfo.MinerPublicKeys.length == 0 ? (
              <div className="font-weight-bold" style={{ color: "red" }}>
                Not Mining
              </div>
            ) : null}
            Miner Public Keys:
            {globalVars.nodeInfo.MinerPublicKeys != null &&
            globalVars.nodeInfo.MinerPublicKeys.length > 0 ? (
              <div>
                {globalVars.nodeInfo.MinerPublicKeys.map((key, ii) => (
                  <div key={ii} className="fc-blue d-flex">
                    {key.slice(0, 15)}...
                    <div
                      onClick={() => _copyNetworkInfo("minerPublicKey", ii)}
                      className="btn btn-outline-secondary d-flex fs-15px p-5px ml-10px"
                    >
                      <i className="far fa-copy fa-xs"></i>
                    </div>
                    {isCopied.minerPublicKeys[ii] ? (
                      <div className="fs-15px px-5px py-0px">
                        <i className="far fa-check-circle fa-xs"></i>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
            {globalVars.nodeInfo.MinerPublicKeys == null ||
            globalVars.nodeInfo.MinerPublicKeys.length == 0 ? (
              <div className="fc-blue">No miner public keys found.</div>
            ) : null}
            Update Miner Public Key List:
            <div className="fc-blue d-flex align-items-center">
              <input
                value={updatedMinerPubKeys}
                placeholder="Enter a new pub key."
                style={{ width: "200px", borderRadius: "3px" }}
              />
              {!updatingMiners ? (
                <div
                  onClick={() => updateMiners()}
                  className="btn btn-outline-secondary fs-15px lh-15px p-5px ml-5px"
                >
                  Update
                </div>
              ) : (
                <div className="btn btn-outline-secondary fs-15px lh-15px p-5px ml-5px">
                  Updating
                </div>
              )}
            </div>
            {!stoppingMiners ? (
              <div
                onClick={() => stopMining()}
                className="btn btn-outline-secondary fs-15px lh-15px p-5px mt-10px"
              >
                Stop Mining
              </div>
            ) : null}
            {stoppingMiners ? (
              <div className="btn btn-outline-secondary fs-15px lh-15px p-5px mt-10px">
                Stopping
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="fs-15px mt-15px px-15px">
        <span
          onClick={() => (isOpen.desoNode = !isOpen.desoNode)}
          className="font-weight-bold cursor-pointer"
        >
          {!isOpen.desoNode ? (
            <i className="fas fa-caret-right"></i>
          ) : (
            <i className="fas fa-caret-down"></i>
          )}
          DeSo Node Info
        </span>
        {isOpen.desoNode && updatingDeSoPeer ? (
          <div className="ml-15px fc-muted">Updating DeSo peers...</div>
        ) : null}

        {isOpen.desoNode && !updatingDeSoPeer ? (
          <div className="ml-15px">
            Outbound Peers ({nodeInfo.DeSoOutboundPeers.length}):
            <div
              className="fc-blue border border-color-grey px-5px pt-5px"
              style={{
                maxHeight: "150px",
                overflowY: "scroll",
                width: "fit-content",
              }}
            >
              {globalVars.nodeInfo.DeSoOutboundPeers == null ||
              globalVars.nodeInfo.DeSoOutboundPeers.length === 0 ? (
                <>
                  <div>Not connected to any outbound peers.</div>
                  {globalVars.nodeInfo.DeSoOutboundPeers.map(
                    (peer, peerIndex) => (
                      <div key={peerIndex}>
                        <div className="d-flex align-items-center justify-content-between pb-5px">
                          <div style="display: inline-block">
                            {peer.IP + ":" + peer.ProtocolPort}
                          </div>
                          <div className="d-flex">
                            {peer.isCopied !== true ? (
                              <div
                                onClick={() => copyPeer(peer)}
                                className="btn btn-outline-secondary d-flex fs-15px p-5px ml-10px"
                              >
                                <i className="far fa-copy fa-xs"></i>
                              </div>
                            ) : null}

                            {peer.isCopied === true ? (
                              <div className="fs-15px p-5px ml-10px">
                                <i className="far fa-check-circle fa-xs"></i>
                              </div>
                            ) : null}

                            <div
                              onClick={() =>
                                disconnectDeSoPeer(
                                  peer.IP + ":" + peer.ProtocolPort
                                )
                              }
                              className="btn btn-outline-secondary fs-15px lh-15px p-5px ml-5px"
                            >
                              Disconnect
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </>
              ) : null}
            </div>
            Inbound Peers ({nodeInfo.DeSoInboundPeers.length}):
            <div
              className="fc-blue border border-color-grey px-5px pt-5px"
              style={{
                maxHeight: "150px",
                overflowY: "scroll",
                width: "fit-content",
              }}
            >
              {globalVars.nodeInfo.DeSoInboundPeers == null ||
              globalVars.nodeInfo.DeSoInboundPeers.length === 0 ? (
                <>
                  <div>Not connected to any inbound peers.</div>
                  {globalVars.nodeInfo.DeSoInboundPeers.map(
                    (peer, peerIndex) => (
                      <div key={peerIndex}>
                        <div className="d-flex align-items-center justify-content-between pb-5px">
                          <div style="display: inline-block">
                            {peer.IP + ":" + peer.ProtocolPort}
                          </div>
                          <div className="d-flex">
                            {peer.isCopied !== true ? (
                              <div
                                onClick={() => copyPeer(peer)}
                                className="btn btn-outline-secondary d-flex fs-15px p-5px ml-10px"
                              >
                                <i className="far fa-copy fa-xs"></i>
                              </div>
                            ) : null}

                            {peer.isCopied === true ? (
                              <div className="fs-15px p-5px ml-10px">
                                <i className="far fa-check-circle fa-xs"></i>
                              </div>
                            ) : null}

                            <div
                              onClick={() =>
                                disconnectDeSoPeer(
                                  peer.IP + ":" + peer.ProtocolPort
                                )
                              }
                              className="btn btn-outline-secondary fs-15px lh-15px p-5px ml-5px"
                            >
                              Disconnect
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </>
              ) : null}
            </div>
            Unconnected Peers ({globalVars.nodeInfo.DeSoUnconnectedPeers.length}
            ):
            <div
              className="fc-blue border border-color-grey px-5px pt-5px"
              style={{
                maxHeight: "150px",
                overflowY: "scroll",
                width: "fit-content",
              }}
            >
              {globalVars.nodeInfo.DeSoUnconnectedPeers == null ||
              globalVars.nodeInfo.DeSoUnconnectedPeers.length === 0 ? (
                <>
                  <div>No other peers available.</div>
                  {globalVars.nodeInfo.DeSoUnconnectedPeers.map(
                    (peer, index) => (
                      <div key={index}>
                        <div className="d-flex align-items-center justify-content-between pb-5px">
                          <div style={{ display: "inline-block" }}>
                            {peer.IP + ":" + peer.ProtocolPort}
                          </div>
                          <div className="d-flex">
                            {peer.isCopied !== true ? (
                              <div
                                onClick={() => copyPeer(peer)}
                                className="btn btn-outline-secondary d-flex fs-15px p-5px ml-10px"
                              >
                                <i className="far fa-copy fa-xs"></i>
                              </div>
                            ) : null}

                            {peer.isCopied === true ? (
                              <div className="fs-15px p-5px ml-10px">
                                <i className="far fa-check-circle fa-xs"></i>
                              </div>
                            ) : null}

                            <div
                              onClick={() =>
                                connectDeSoPeer(
                                  peer.IP + ":" + peer.ProtocolPort
                                )
                              }
                              className="btn btn-outline-secondary fs-15px lh-15px p-5px ml-5px"
                            >
                              Connect
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </>
              ) : null}
            </div>
            Manual Connection:
            <div className="fc-blue d-flex align-items-center">
              <input
                value={manualDeSoPeer}
                placeholder="Enter an address."
                style={{ width: "200px", borderRadius: "3px" }}
              />
              <div
                onClick={() => connectDeSoPeer(manualDeSoPeer)}
                className="btn btn-outline-secondary fs-15px lh-15px p-5px ml-5px"
              >
                Connect
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* <!-- Spacer for scrolling past the bottom. --> */}
      <div style={{ width: "100%", height: "100%" }}></div>
    </>
  );
};
export default NetworkInfo;
