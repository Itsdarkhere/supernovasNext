import styles from "../../styles/Admin/adminJumio.module.scss";

const AdminJumio = () => {
  return (
    <div>
      <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
        Set Jumio Starter $DESI amount (in nanos):
        <div className="d-flex mt-5px">
          <input
            value={jumioDeSoNanos}
            className="form-control w-100 fs-15px lh-15px"
            placeholder="Enter an amount"
            type="number"
          />
          {!updatingJumioDeSoNanos ? (
            <button
              onClick={() => updateJumioDeSoNanos()}
              className="btn btn-outline-primary fs-15px ml-5px"
            >
              Update
            </button>
          ) : (
            <button className="btn btn-primary fs-15px ml-5px" disabled>
              Working...
            </button>
          )}
        </div>
      </div>
      <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
        Reset Jumio for Public Key or Username:
        <div className="d-flex mt-5px">
          <input
            value={usernameToResetJumio}
            className="form-control w-100 fs-15px lh-15px"
            placeholder="Enter a username or public key."
          />
          {!resettingJumio ? (
            <button
              onClick={() => _resetJumio()}
              className="btn btn-outline-primary fs-15px ml-5px"
            >
              Reset
            </button>
          ) : (
            <button className="btn btn-primary fs-15px ml-5px" disabled>
              Working...
            </button>
          )}
        </div>
      </div>
      <div className="fs-15px font-weight-bold mt-15px mb-15px px-15px">
        Execute Jumio Callback for Public Key or Username:
        <div className="d-flex mt-5px">
          <input
            value={usernameToExecuteJumioCallback}
            className="form-control w-100 fs-15px lh-15px"
            placeholder="Enter a username or public key."
          />
          {!executingJumioCallback ? (
            <button
              onClick={() => _executeJumioCallback()}
              className="btn btn-outline-primary fs-15px ml-5px"
            >
              Execute
            </button>
          ) : (
            <button className="btn btn-primary fs-15px ml-5px" disabled>
              Working...
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminJumio;
