import { RouteNames } from "./backendapi-context";

export function transferCreatorPath(username: string): string {
  return [
    "",
    RouteNames.USER_PREFIX,
    username,
    RouteNames.TRANSFER_CREATOR,
  ].join("/");
}

export function buyCreatorPath(username: string): string {
  return ["", RouteNames.USER_PREFIX, username, RouteNames.BUY_CREATOR].join(
    "/"
  );
}

export function sellCreatorPath(username: string): string {
  return ["", RouteNames.USER_PREFIX, username, RouteNames.SELL_CREATOR].join(
    "/"
  );
}

export function profilePath(username: string): string {
  return ["", RouteNames.USER_PREFIX, username].join("/");
}

export function userFollowingPath(username: string): string {
  return ["", RouteNames.USER_PREFIX, username, RouteNames.FOLLOWING].join("/");
}

export function userFollowersPath(username: string): string {
  return ["", RouteNames.USER_PREFIX, username, RouteNames.FOLLOWERS].join("/");
}

export function postPath(postHashHex: string): string {
  return ["", RouteNames.POSTS, postHashHex].join("/");
}
