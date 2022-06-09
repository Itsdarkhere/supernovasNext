import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { GetVideoStatus } from "./backendapi-context";

export const extractVideoID = (url: string): string => {
  const regExp = /^https:\/\/iframe\.videodelivery\.net\/([A-Za-z0-9]+)$/;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : "";
};

// Returns two booleans - the first indicates if a video is ready to stream, the second indicates if we should stop polling
export const checkVideoStatusByVideoID = (
  videoID: string
): Observable<[boolean, boolean]> => {
  if (videoID === "") {
    console.error("invalid VideoID");
    return of([false, true]);
  }
  return GetVideoStatus(
    process.env.NEXT_PUBLIC_uploadVideoHostname,
    videoID
  ).pipe(
    catchError((error) => {
      console.error(error);
      return of({
        ReadyToStream: false,
        Error: error,
      });
    }),
    map((res) => {
      return [res.ReadyToStream, res.Error || res.ReadyToStream];
    })
  );
};

export const checkVideoStatusByURL = (
  videoURL: string
): Observable<[boolean, boolean]> => {
  const videoID = extractVideoID(videoURL);
  if (videoID == "") {
    console.error("unable to extract VideoID");
    return of([false, true]);
  }
  return checkVideoStatusByVideoID(extractVideoID(videoURL));
};
