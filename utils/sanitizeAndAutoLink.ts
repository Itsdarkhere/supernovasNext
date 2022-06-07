import Autolinker from "autolinker";
import _ from "lodash";
export function SanitizeAndAutoLink(unsafeText: string, args?: any): any {
  // FIXME: TODO: someone should audit this function for XSS issues
  // Escape to remove any HTML tags that may have been added by users
  let text = _.escape(unsafeText);

  // limit of two newlines in a row
  text = _.replace(text, /\n\n+/g, "\n\n");

  // display newlines
  text = _.replace(text, /\n/g, "<br>");

  // This expands @-mentions and $-cashtags into links to profiles.
  // This is going to expand anything that's prefixed with @/$ into links, not just usernames.
  // Maybe we should have more code to validate whether an @-mention is a legit username (e.g.
  // the server could return something) and only link if so
  //
  // We don't use the npm library because we need to customize the regexes for usernames and cashtags
  const twitter = require("../vendor/twitter-text-3.1.0.js");
  let entities = twitter.extractEntitiesWithIndices(text, {
    extractUrlsWithoutProtocol: false,
  });

  // Only link usernames and cashtags for now (not hashtags etc)
  entities = _.filter(
    entities,
    (entity) => entity.screenName || entity.cashtag
  );

  // Hardcoded strings now instead of dynamic vars
  const textWithMentionLinks = twitter.autoLinkEntities(text, entities, {
    usernameUrlBase: `/u/`,
    usernameClass: "js-app-component__dynamically-added-router-link-class",
    usernameIncludeSymbol: true,
    cashtagUrlBase: `/u/`,
    cashtagClass: "js-app-component__dynamically-added-router-link-class",
  });

  return Autolinker.link(textWithMentionLinks);
}
