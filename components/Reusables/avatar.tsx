import { useEffect, useRef } from "react";
import _ from "lodash";
import {
  GetDefaultProfilePictureURL,
  GetSingleProfilePictureURL,
} from "../../utils/backendapi-context";
import { useAppSelector } from "../../utils/Redux/hooks";

const Avatar = ({ avatar, classN }) => {
  const avatarRef = useRef<HTMLDivElement>();
  let currentAvatar = "default";
  const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  const localNode = useAppSelector((state) => state.node.localNode);
  const profileUpdateTimestamp = useAppSelector(
    (state) => state.loggedIn.profileUpdateTimestamp
  );
  // Functions
  const setAvatar = () => {
    currentAvatar = avatar;
    if (!avatar) {
      setURLOnElement(GetDefaultProfilePictureURL(window.location.host));
      return;
    }
    // The fallback route is the route to the pic we use if we can't find an avatar for the user.
    let fallbackRoute = `fallback=${GetDefaultProfilePictureURL(
      window.location.host
    )}`;

    // If fetching the avatar for the current user, use the last timestamp of profile update to bust
    // the cache so we get the updated avatar.
    let cacheBuster = "";
    if (
      loggedInUser &&
      avatar === loggedInUser?.PublicKeyBase58Check &&
      profileUpdateTimestamp
    ) {
      cacheBuster = `&${profileUpdateTimestamp}`;
    }

    // Although it would be hard for an attacker to inject a malformed public key into the app,
    // we do a basic _.escape anyways just to be extra safe.
    const profPicURL = _.escape(
      GetSingleProfilePictureURL(localNode, avatar, fallbackRoute)
    );

    // Set the URL on the element.
    setURLOnElement(profPicURL + cacheBuster);
  };

  const setURLOnElement = (profilePicURL: string) => {
    if (typeof avatarRef !== "undefined") {
      avatarRef.current.style.backgroundImage = `url(${profilePicURL})`;
    }
  };
  // Functions end

  // Lifecycle methods
  useEffect(() => {
    if (avatar !== currentAvatar) {
      setAvatar();
    }
  }, [avatar]);
  // Lifecycle methods end

  return <div ref={avatarRef} className={classN}></div>;
};
export default Avatar;
