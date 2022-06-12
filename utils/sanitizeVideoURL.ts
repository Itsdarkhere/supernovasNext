export function transformVideoURL(videoURL: string) {
  let url;
  try {
    url = new URL(videoURL);
  } catch (err) {
    return false;
  }
  // On this node, we also validate that it matches the expect video URL format
  const regExp = /^https:\/\/iframe\.videodelivery\.net\/[A-Za-z0-9]+$/;
  const match = videoURL.match(regExp);
  return match && match[0];
}
