import { useEffect, useState } from "react";
import { GetFollows } from "../../utils/backendapi-context";
import { nanosToUSD } from "../../utils/global-context";
import { useAppSelector } from "../../utils/Redux/hooks";

const UserBalanceFollowsSection = ({ loggedInUser, localNode }) => {
  let satoshisPerDeSoExchangeRate = useAppSelector(
    (state) => state.exhange.satoshisPerDeSoExchangeRate
  );
  const [followerCount, setFollowerCount] = useState(0);

  // Functions
  const refreshFollowers = () => {
    GetFollows(
      localNode,
      loggedInUser?.ProfileEntryResponse?.Username,
      "" /* PublicKeyBase58Check */,
      true /* get followers */,
      "" /* GetEntriesFollowingUsername */,
      0 /* NumToFetch */
    ).subscribe({
      next: (res) => {
        setFollowerCount(res.data.NumFollowers);
      },
      error: (err) => console.log(err),
    });
  };

  // Lifecycle method
  useEffect(() => {
    refreshFollowers();
  }, []);

  return (
    <div className="global__sidebar__inner">
      <div className="right-bar-creators__balance-box smaller-font d-flex pt-15px justify-content-between">
        <div className="d-flex flex-column mr-30px">
          <div className="rb-name">Wallet balance</div>
          <div className="rb-value d-flex flex-center-start">
            {satoshisPerDeSoExchangeRate ? (
              <span>{nanosToUSD(loggedInUser.BalanceNanos, 2)}</span>
            ) : null}
          </div>
        </div>

        {loggedInUser ? (
          <div className="d-flex flex-column">
            <div className="rb-name">Followers</div>
            <div className="d-flex">
              <div className="rb-value">
                <span>{followerCount}</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default UserBalanceFollowsSection;
