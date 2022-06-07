import styles from "../../../styles/Messages/messagesFilterMenu.module.scss";

const MessagesFilterMenu = () => {
  return (
    <div className="fs-16px">
      <div className="mr-15px ml-15px pt-15px pb-5px divtext font-weight-bold border-color-blue border-bottom">
        Custom Inbox Settings
      </div>

      <div className="d-flex pt-15px pb-15px flex-row">
        <div className="divtext w-50 align-middle">Only show:</div>

        <div className="w-100 d-flex pl-5px flex-column">
          <div className="mt-5px d-flex flex-row align-items-center">
            {/* [(ngModel)]="messageFilterHoldsMe" */}
            <input
              id="holdsMeCheckbox"
              type="checkbox"
              name="holdsMe"
              className="w-10"
            />
            <label htmlFor="holdsMeCheckbox" className="cursor-pointer mb-0">
              Holders
            </label>
          </div>

          <div className="mt-5px d-flex flex-row align-items-center">
            {/* [(ngModel)]="messageFilterIHold" */}
            <input
              id="iHoldCheckbox"
              type="checkbox"
              style="vertical-align: middle"
              name="iHold"
              className="w-10"
            />
            <label htmlFor="iHoldCheckbox" className="cursor-pointer mb-0">
              Holdings
            </label>
          </div>

          <div className="mt-5px d-flex flex-row align-items-center">
            {/* [(ngModel)]="messageFilterFollowingMe" */}
            <input
              id="followingMeCheckbox"
              type="checkbox"
              style="vertical-align: middle"
              name="followingMe"
              className="w-10"
            />
            <label
              htmlFor="followingMeCheckbox"
              className="cursor-pointer mb-0"
            >
              Followers
            </label>
          </div>

          <div className="mt-5px d-flex flex-row align-items-center">
            {/* [(ngModel)]="messageFilterIFollow" */}
            <input
              id="iFollowCheckbox"
              type="checkbox"
              name="iFollow"
              className="w-10"
            />
            <label htmlFor="iFollowCheckbox" className="cursor-pointer mb-0">
              Following
            </label>
          </div>
        </div>
      </div>

      <div className="d-flex flex-row">
        <div className="divtext w-40 align-middle">Sort By:</div>

        <div className="w-100">
          <div className="btn-group pl-25px" dropdown>
            <button
              id="button-basic"
              dropdownToggle
              type="button"
              className="btn btn-secondary fs-16px dropdown-toggle text-grey5"
              aria-controls="dropdown-basic"
            >
              {{ sortAlgorithmToText(); }}
              <span className="caret"></span>
            </button>
            {/* *dropdownMenu */}
            <ul
              id="dropdown-basic"
              className="dropdown-menu"
              role="menu"
              aria-labelledby="button-basic"
            >
              {/* (click)="setSortAlgorithm('time')" */}
              <li role="menuitem">
                <a className="dropdown-item fs-16px">Most recent</a>
              </li>
              {/* (click)="setSortAlgorithm('deso')" */}
              <li role="menuitem">
                <a className="dropdown-item fs-16px">Most deso</a>
              </li>
              <li role="menuitem">
                {/* (click)="setSortAlgorithm('followers')" */}
                <a className="dropdown-item fs-16px">Most followed</a>
              </li>
              <li role="menuitem">
                {/* (click)="setSortAlgorithm('holders')" */}
                <a className="dropdown-item fs-16px">Largest Holder</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="d-flex flex-center w-100 pb-15px border-bottom border-color-grey">
        <div className="w-100 btn-default">
          {/* (click)="updateGlobalMessagesPreferences()" */}
          <button className="btn btn-primary btn-lg font-weight-bold mr-30px fs-13px mt-5px">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
export default MessagesFilterMenu;
