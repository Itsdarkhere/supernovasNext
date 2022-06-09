import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { GetFullTikTokURL } from "../backendapi-context";

// This regex helps extract the correct videoID from the various forms of URLs that identify a youtube video.
export function youtubeParser(url): string | boolean {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([A-Za-z0-9_-]{11}).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
}

export function constructYoutubeEmbedURL(url: URL): string {
  const youtubeVideoID = youtubeParser(url.toString());
  // If we can't find the videoID, return the empty string which stops the iframe from loading.
  return youtubeVideoID
    ? `https://www.youtube.com/embed/${youtubeVideoID}`
    : "";
}

// Vimeo video URLs are simple -- anything after the last "/" in the url indicates the videoID.
export function vimeoParser(url: string): string | boolean {
  const regExp = /^.*((player\.)?vimeo\.com\/)(video\/)?(\d{0,15}).*/;
  const match = url.match(regExp);
  return match && match[4] ? match[4] : false;
}

export function constructVimeoEmbedURL(url: URL): string {
  const vimeoVideoID = vimeoParser(url.toString());
  return vimeoVideoID ? `https://player.vimeo.com/video/${vimeoVideoID}` : "";
}

export function giphyParser(url: string): string | boolean {
  const regExp =
    /^.*((media\.)?giphy\.com\/(gifs|media|embed|clips)\/)([A-Za-z0-9]+-)*([A-Za-z0-9]{0,20}).*/;
  const match = url.match(regExp);
  return match && match[5] ? match[5] : false;
}

export function constructGiphyEmbedURL(url: URL): string {
  const giphyId = giphyParser(url.toString());
  return giphyId ? `https://giphy.com/embed/${giphyId}` : "";
}

export function spotifyParser(url: string): string | boolean {
  const regExp =
    /^.*(open\.)?spotify\.com\/(((embed\/)?(track|artist|playlist|album))|((embed-podcast\/)?(episode|show)))\/([A-Za-z0-9]{0,25}).*/;
  const match = url.match(regExp);
  if (match && match[9]) {
    if (match[8]) {
      return `embed-podcast/${match[8]}/${match[9]}`;
    }
    if (match[5]) {
      return `embed/${match[5]}/${match[9]}`;
    }
  }
  return false;
}

export function constructSpotifyEmbedURL(url: URL): string {
  const spotifyEmbedSuffix = spotifyParser(url.toString());
  return spotifyEmbedSuffix
    ? `https://open.spotify.com/${spotifyEmbedSuffix}`
    : "";
}

export function soundCloudParser(url: string): string | boolean {
  const regExp = /^.*(soundcloud.com\/([a-z0-9-_]+)\/(sets\/)?([a-z0-9-_]+)).*/;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : false;
}

export function constructSoundCloudEmbedURL(url: URL): string {
  const soundCloudURL = soundCloudParser(url.toString());
  return soundCloudURL
    ? `https://w.soundcloud.com/player/?url=https://${soundCloudURL}?hide_related=true&show_comments=false`
    : "";
}

export function twitchParser(url: string): string | boolean {
  const regExp =
    /^.*((player\.|clips\.)?twitch\.tv)\/(videos\/(\d{8,12})|\?video=(\d{8,12})|\?channel=([A-Za-z0-9_]{1,30})|collections\/([A-Za-z0-9]{10,20})|\?collection=([A-Za-z0-9]{10,20}(&video=\d{8,12})?)|embed\?clip=([A-Za-z0-9_-]{1,80})|([A-Za-z0-9_]{1,30}(\/clip\/([A-Za-z0-9_-]{1,80}))?)).*/;
  const match = url.match(regExp);
  if (match && match[3]) {
    // https://www.twitch.tv/videos/1234567890
    if (match[3].startsWith("videos") && match[4]) {
      return `player.twitch.tv/?video=${match[4]}`;
    }
    // https://player.twitch.tv/?video=1234567890&parent=www.example.com
    if (match[3].startsWith("?video=") && match[5]) {
      return `player.twitch.tv/?video=${match[5]}`;
    }
    // https://player.twitch.tv/?channel=xxxyyy123&parent=www.example.com
    if (match[3].startsWith("?channel=") && match[6]) {
      return `player.twitch.tv/?channel=${match[6]}`;
    }
    // https://www.twitch.tv/xxxyyy123
    if (
      match[3] &&
      match[11] &&
      match[3] === match[11] &&
      !match[12] &&
      !match[13]
    ) {
      return `player.twitch.tv/?channel=${match[11]}`;
    }
    // https://www.twitch.tv/xxyy_1234m/clip/AbCD123JMn-rrMMSj1239G7
    if (match[12] && match[13]) {
      return `clips.twitch.tv/embed?clip=${match[13]}`;
    }
    // https://clips.twitch.tv/embed?clip=AbCD123JMn-rrMMSj1239G7&parent=www.example.com
    if (match[10]) {
      return `clips.twitch.tv/embed?clip=${match[10]}`;
    }
    // https://www.twitch.tv/collections/11jaabbcc2yM989x?filter=collections
    if (match[7]) {
      return `player.twitch.tv/?collection=${match[7]}`;
    }
    // https://player.twitch.tv/?collection=11jaabbcc2yM989x&video=1234567890&parent=www.example.com
    if (match[8]) {
      return `player.twitch.tv/?collection=${match[8]}`;
    }
  }
  return false;
}

export function constructTwitchEmbedURL(url: URL): string {
  const twitchParsed = twitchParser(url.toString());
  return twitchParsed ? `https://${twitchParsed}` : "";
}

export function extractTikTokVideoID(fullTikTokURL: string): string | boolean {
  const regExp =
    /^.*((tiktok\.com\/)(v\/)|(@[A-Za-z0-9_-]{2,24}\/video\/)|(embed\/v2\/))(\d{0,30}).*/;
  const match = fullTikTokURL.match(regExp);
  return match && match[6] ? match[6] : false;
}

export function tiktokParser(
  localNode: string,
  url: string
): Observable<string | boolean> {
  let tiktokURL;
  try {
    tiktokURL = new URL(url);
  } catch (e) {
    return of(false);
  }
  if (tiktokURL.hostname === "vm.tiktok.com") {
    const regExp = /^.*(vm\.tiktok\.com\/)([A-Za-z0-9]{6,12}).*/;
    const match = url.match(regExp);
    if (!match || !match[2]) {
      return of(false);
    }
    return GetFullTikTokURL(localNode, match[2]).pipe(
      map((res) => {
        return extractTikTokVideoID(res);
      })
    );
  } else {
    return of(extractTikTokVideoID(url));
  }
}

export function constructTikTokEmbedURL(
  localNode: string,
  url: URL
): Observable<string> {
  return tiktokParser(localNode, url.toString()).pipe(
    map((res) => {
      return res ? `https://www.tiktok.com/embed/v2/${res}` : "";
    })
  );
}

export function getEmbedURL(
  localNode: string,
  embedURL: string
): Observable<string> {
  if (!embedURL) {
    return of("");
  }
  let url;
  try {
    url = new URL(embedURL);
  } catch (e) {
    // If the embed video URL doesn't start with http(s), try the url with that as a prefix.
    if (!embedURL.startsWith("https://") && !embedURL.startsWith("http://")) {
      return getEmbedURL(localNode, `https://${embedURL}`);
    }
    return of("");
  }
  if (isYoutubeFromURL(url)) {
    return of(constructYoutubeEmbedURL(url));
  }
  if (isVimeoFromURL(url)) {
    return of(constructVimeoEmbedURL(url));
  }
  if (isTiktokFromURL(url)) {
    return constructTikTokEmbedURL(localNode, url);
  }
  if (isGiphyFromURL(url)) {
    return of(constructGiphyEmbedURL(url));
  }
  if (isSpotifyFromURL(url)) {
    return of(constructSpotifyEmbedURL(url));
  }
  if (isSoundCloudFromURL(url)) {
    return of(constructSoundCloudEmbedURL(url));
  }
  if (isTwitchFromURL(url)) {
    return of(constructTwitchEmbedURL(url)).pipe(
      map((embedURL) =>
        embedURL ? embedURL + `&autoplay=false&parent=${location.hostname}` : ""
      )
    );
  }
  return of("");
}

export function isVimeoLink(link: string): boolean {
  try {
    const url = new URL(link);
    return isVimeoFromURL(url);
  } catch (e) {
    return false;
  }
}

export function isVimeoFromURL(url: URL): boolean {
  const pattern = /\bvimeo\.com$/;
  return pattern.test(url.hostname);
}

export function isYoutubeLink(link: string): boolean {
  try {
    const url = new URL(link);
    return isYoutubeFromURL(url);
  } catch (e) {
    return false;
  }
}

export function isYoutubeFromURL(url: URL): boolean {
  const patterns = [/\byoutube\.com$/, /\byoutu\.be$/];
  return patterns.some((p) => p.test(url.hostname));
}

export function isTikTokLink(link: string): boolean {
  try {
    const url = new URL(link);
    return isTiktokFromURL(url);
  } catch (e) {
    return false;
  }
}

export function isTiktokFromURL(url: URL): boolean {
  const pattern = /\btiktok\.com$/;
  return pattern.test(url.hostname);
}

export function isGiphyLink(link: string): boolean {
  try {
    const url = new URL(link);
    return isGiphyFromURL(url);
  } catch (e) {
    return false;
  }
}

export function isGiphyFromURL(url: URL): boolean {
  const pattern = /\bgiphy\.com$/;
  return pattern.test(url.hostname);
}

export function isSpotifyLink(link: string): boolean {
  try {
    const url = new URL(link);
    return isSpotifyFromURL(url);
  } catch (e) {
    return false;
  }
}

export function isSpotifyFromURL(url: URL): boolean {
  const pattern = /\bspotify\.com$/;
  return pattern.test(url.hostname);
}

export function isSoundCloudLink(link: string): boolean {
  try {
    const url = new URL(link);
    return isSoundCloudFromURL(url);
  } catch (e) {
    return false;
  }
}

export function isSoundCloudFromURL(url: URL): boolean {
  const pattern = /\bsoundcloud\.com$/;
  return pattern.test(url.hostname);
}

export function isTwitchLink(link: string): boolean {
  try {
    const url = new URL(link);
    return isTwitchFromURL(url);
  } catch (e) {
    return false;
  }
}

export function isTwitchFromURL(url: URL): boolean {
  const pattern = /\btwitch\.tv$/;
  return pattern.test(url.hostname);
}

export function isValidVimeoEmbedURL(link: string): boolean {
  const regExp = /(https:\/\/player\.vimeo\.com\/video\/(\d{0,15}))$/;
  return !!link.match(regExp);
}

export function isValidYoutubeEmbedURL(link: string): boolean {
  const regExp = /(https:\/\/www\.youtube\.com\/embed\/[A-Za-z0-9_-]{11})$/;
  return !!link.match(regExp);
}

export function isValidTiktokEmbedURL(link: string): boolean {
  const regExp = /(https:\/\/www\.tiktok\.com\/embed\/v2\/(\d{0,30}))$/;
  return !!link.match(regExp);
}

export function isValidGiphyEmbedURL(link: string): boolean {
  const regExp = /(https:\/\/giphy\.com\/embed\/([A-Za-z0-9]{0,20}))$/;
  return !!link.match(regExp);
}

export function isValidSpotifyEmbedURL(link: string): boolean {
  const regExp =
    /(https:\/\/open.spotify.com\/(((embed\/)(track|artist|playlist|album))|((embed-podcast\/)(episode|show)))\/[A-Za-z0-9]{0,25})$/;
  return !!link.match(regExp);
}

export function isValidSoundCloudEmbedURL(link: string): boolean {
  const regExp =
    /(https:\/\/w\.soundcloud\.com\/player\/\?url=https:\/\/soundcloud.com\/([a-z0-9-_]+)\/(sets\/)?([a-z0-9-_]+))\?hide_related=true&show_comments=false$/;
  return !!link.match(regExp);
}

export function isValidTwitchEmbedURL(link: string): boolean {
  const regExp =
    /(https:\/\/(player|clips)\.twitch\.tv\/(\?channel=[A-Za-z0-9_]{1,30}|\?video=\d{8,12}|embed\?clip=[A-Za-z0-9_-]{1,80}|\?collection=[A-Za-z0-9]{10,20}(&video=\d{8,12})?))$/;
  return !!link.match(regExp);
}

export function isValidTwitchEmbedURLWithParent(link: string): boolean {
  const regExp = new RegExp(
    `https://(player|clips).twitch.tv/(\\?channel=[A-Za-z0-9_]{1,30}|\\?video=\\d{8,12}|embed\\?clip=[A-Za-z0-9_-]{1,80}|\\?collection=[A-Za-z0-9]{10,20}(&video=\\d{8,12})?)&autoplay=false&parent=${location.hostname}$`
  );
  return !!link.match(regExp);
}

export function isValidEmbedURL(link: string): boolean {
  if (link) {
    return (
      isValidVimeoEmbedURL(link) ||
      isValidYoutubeEmbedURL(link) ||
      isValidTiktokEmbedURL(link) ||
      isValidGiphyEmbedURL(link) ||
      isValidSpotifyEmbedURL(link) ||
      isValidSoundCloudEmbedURL(link) ||
      isValidTwitchEmbedURL(link) ||
      isValidTwitchEmbedURLWithParent(link)
    );
  }
  return false;
}

export function getEmbedHeight(link: string): number {
  if (isValidTiktokEmbedURL(link)) {
    return 700;
  }
  if (isValidSpotifyEmbedURL(link)) {
    return link.indexOf("embed-podcast") > -1 ? 232 : 380;
  }
  if (isValidSoundCloudEmbedURL(link)) {
    return link.indexOf("/sets/") > -1 ? 350 : 180;
  }
  return 315;
}

export function getEmbedWidth(link: string): string {
  return isValidTiktokEmbedURL(link) ? "325px" : "";
}
