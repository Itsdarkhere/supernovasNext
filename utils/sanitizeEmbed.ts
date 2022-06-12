import { isValidEmbedURL } from "./staticServices/embedURLParser";

export function transform(url) {
  return isValidEmbedURL(url)
    ? this.sanitizer.bypassSecurityTrustResourceUrl(url)
    : false;
}
