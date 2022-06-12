import styles from "../../styles/NotFound/notFound.module.scss";
import TopBarMobileNavigation from "../Navigation/TopBarMobile/topBarMobileNavigation";

const NotFound = () => {
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-between w-100 px-15px fs-18px font-weight-bold fc-default border-bottom border-color-grey"
        style={{ minHeight: "80px" }}
      >
        <div className="d-flex align-items-center">
          <TopBarMobileNavigation></TopBarMobileNavigation>
          Page not found
        </div>
      </div>

      <div className="text-center px-20px not-found__content-container">
        <h1>Page not found</h1>

        <div className="fc-muted mt-20px">This is a 404 error</div>

        <div className="mt-30px">
          Sorry! If this is a problem on our end, we've been notified and are
          working to fix it.
        </div>
      </div>
    </>
  );
};
export default NotFound;
