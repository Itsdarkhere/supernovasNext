import styles from "../../styles/Reusables/changeAccountDropdown.module.scss";
import { Dropdown } from "rsuite";
import { useAppSelector } from "../../utils/Redux/hooks";
import switchProfileIcon from "../../public/icons/cas_switch_profile_icon.svg";
import supportIcon from "../../public/icons/cas_support_icon.svg";
import logoutIcon from "../../public/icons/cas_logout_icon.svg";
import backIcon from "../../public/icons/cas_back_icon.svg";
import addAccountIcon from "../../public/icons/cas_add_acc_icon.svg";
import lockIcon from "../../public/icons/cas_lock_icon.svg";
import settingsIcon from "../../public/icons/cas_settings_icon.svg";
import Image from "next/image";
import Avatar from "./avatar";
import { useState } from "react";
import UserBalanceFollowsSection from "./userBalanceFollowsSection";
import MenuIcon from "@rsuite/icons/Menu";
import CloseIcon from "@rsuite/icons/Close";
const ChangeAccountDropdown = () => {
  let loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  let localNode = useAppSelector((state) => state.node.localNode);
  let userList = useAppSelector((state) => state.loggedIn.userList);
  const [pageOne, setPageOne] = useState(true);
  const [dropDownOpen, setDropdownOpen] = useState(false);

  // Functions
  const clickSwitchProfile = (event) => {
    event.stopPropagation();
    setPageOne(false);
  };
  const clickBack = (event) => {
    event.stopPropagation();
    setPageOne(true);
  };
  const getDropdownToggle = (props, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={
          styles.change_account_selector +
          " fs-14px fc-default pl-5px cursor-pointer"
        }
      >
        {/* <!-- Selector (unopened state) --> */}
        <div
          id={styles.cas_selector}
          className="d-flex align-items-center justify-content-between h-100 w-100"
        >
          {loggedInUser ? (
            <div
              className={
                styles.change_account_selector__ellipsis_restriction +
                " d-flex flex-row flex-start align-items-center cursor-pointer"
              }
            >
              <Avatar
                avatar={loggedInUser.PublicKeyBase58Check}
                classN={
                  styles.change_account_selector__account_image +
                  " align-items-center"
                }
              ></Avatar>
              <div
                className={[
                  styles.change_account_selector__acount_name,
                  styles.cas_dont_copy,
                  styles.change_account_selector__ellipsis_restriction,
                ].join(" ")}
              >
                {loggedInUser.ProfileEntryResponse?.Username
                  ? loggedInUser.ProfileEntryResponse.Username
                  : loggedInUser.PublicKeyBase58Check}
              </div>
              {loggedInUser.ProfileEntryResponse?.IsVerified ? (
                <span
                  className={
                    styles.cas_dont_copy +
                    " ml-1 d-inline-block align-center text-primary fs-12px"
                  }
                >
                  <i className="fas fa-check-circle fa-md"></i>
                </span>
              ) : null}
            </div>
          ) : null}

          <div
            id={styles.nav_icon3}
            className={styles.cas_dont_copy + " h-100 d-flex flex-center"}
          >
            {dropDownOpen ? (
              <CloseIcon style={{ fontSize: "1.2em" }} />
            ) : (
              <MenuIcon style={{ fontSize: "1.2em" }} />
            )}
          </div>
        </div>
      </button>
    );
  };
  return (
    <div>
      {!loggedInUser ? (
        <div className={styles.cas_logged_out}>
          <button
            onClick={() => createProfile()}
            className={styles.cas_logged_out_btn_1}
          >
            Create profile
          </button>
          <button
            onClick={() => globalVars.launchLoginFlow()}
            className={styles.cas_logged_out_btn_2}
          >
            <Image src={lockIcon} alt="lock" />
            Log in
          </button>
        </div>
      ) : (
        <Dropdown
          onOpen={() => setDropdownOpen(true)}
          onClose={() => setDropdownOpen(false)}
          placement="bottomEnd"
          renderToggle={getDropdownToggle}
          className={[
            styles.cas_dont_copy,
            styles.cas_dropdown_menu,
            styles.change_account_selector_list__hover,
            styles.change_account_selector_list,
            styles.button,
            "fs-14px fc-default cursor-pointer disable-scrollbars br-4px",
          ].join(" ")}
          id="dropdown-basic"
        >
          {/* [@casSwipeAnimation]="animationType" */}
          {pageOne ? (
            <div className={styles.cas_page_one + " w-100 h-100"}>
              <Dropdown.Item panel className="pt-10px px-20px" disabled>
                <UserBalanceFollowsSection
                  loggedInUser={loggedInUser}
                  localNode={localNode}
                ></UserBalanceFollowsSection>
              </Dropdown.Item>
              <hr />
              <Dropdown.Item
                className={styles.cas_button}
                onClick={(e) => clickSwitchProfile(e)}
              >
                <Image src={switchProfileIcon} alt="cas icon" />
                Switch profile
              </Dropdown.Item>
              {/* [routerLink]="'/' + globalVars.RouteNames.UPDATE_PROFILE" */}
              <Dropdown.Item className={styles.cas_button}>
                <Image src={settingsIcon} alt="cas icon" />
                Settings
              </Dropdown.Item>
              {/*  href="https://support.supernovas.app/en/"
                target="_blank"
                rel="noreferrer" */}
              <Dropdown.Item className={styles.cas_button}>
                <Image src={supportIcon} alt="cas icon" />
                Support
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => launchLogoutFlow()}
                className={styles.cas_button}
              >
                <Image src={logoutIcon} alt="cas icon" />
                Log out
              </Dropdown.Item>
              <hr />
              <Dropdown.Item disabled className={styles.cas_bottom_one}>
                {/* [routerLink]="'/' + globalVars.RouteNames.DAO_PAGE" */}
                <a>DAO</a>
                <a
                  href="https://www.blog.supernovas.app"
                  target="_blank"
                  rel="noreferrer"
                >
                  Blog
                </a>
                <a
                  href="https://careers.supernovas.app"
                  target="_blank"
                  rel="noreferrer"
                >
                  Careers
                </a>
              </Dropdown.Item>
            </div>
          ) : (
            <div className={styles.cas_page_two + " w-100 h-100"}>
              {/* [@casSwipeAnimation]="animationType" THIS WAS ABOVE */}
              <Dropdown.Item
                onClick={(e) => clickBack(e)}
                className={styles.cas_back_button}
              >
                <Image src={backIcon} alt="cas icon" />
                Back
              </Dropdown.Item>
              <hr />
              <Dropdown.Item className={styles.cas_account_list}>
                {userList.map((user, index) => (
                  <div key={index}>
                    {user.PublicKeyBase58Check !=
                    loggedInUser.PublicKeyBase58Check ? (
                      <div
                        onClick={() => _switchToUser(user)}
                        onMouseOver={() => setHoverRow(rowNum)} 
                        className={
                          styles.change_account_selector_list__inner +
                          " pt-10px pb-10px pl-15px pr-15px d-flex align-items-center"
                        }
                      >
                        <div
                          className={
                            styles.change_account_selector_list_item +
                            " align-items-center d-flex flex-row"
                          }
                          style={{ flexGrow: "1" }}
                        >
                          <Avatar
                            avatar={user.PublicKeyBase58Check}
                            classN={
                              styles.change_account_selector__account_image +
                              " feed-create-post__avatar d-inline-block"
                            }
                          ></Avatar>
                          <div
                            className={[
                              styles.change_account_selector__ellipsis_restriction,
                              styles.change_account_selector__acount_name,
                              "d-inline-block",
                            ].join(" ")}
                          >
                            {user.ProfileEntryResponse?.Username
                              ? user.ProfileEntryResponse.Username
                              : user.PublicKeyBase58Check}
                          </div>

                          {user.ProfileEntryResponse?.IsVerified ? (
                            <span className="ml-1 d-inline-block align-center text-primary fs-12px">
                              <i className="fas fa-check-circle fa-md align-middle"></i>
                            </span>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </Dropdown.Item>
              <hr />
              <Dropdown.Item onClick={() => globalVars.launchLoginFlow()} className={styles.cas_add_acc_button}>
                <Image src={addAccountIcon} alt="cas icon" />
                <p>Add account</p>
              </Dropdown.Item>
            </div>
          )}
        </Dropdown>
      )}
    </div>
  );
};

export default ChangeAccountDropdown;
