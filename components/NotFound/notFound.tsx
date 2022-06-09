import styles from "../../styles/NotFound/notFound.module.scss";

const NotFound = () => {
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-between w-100 px-15px fs-18px font-weight-bold fc-default border-bottom border-color-grey"
        style="min-height: 80px"
      >
        <div className="d-flex align-items-center">
          <top-bar-mobile-navigation-control class="mr-15px d-lg-none d-inline-block"></top-bar-mobile-navigation-control>
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
