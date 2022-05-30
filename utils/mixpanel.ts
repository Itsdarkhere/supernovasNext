import mixpanel from "mixpanel-browser";

// Enabling the debug mode flag is useful during implementation,
// but it's recommended you remove it for production
mixpanel.init("28e1ccdde0bc00420d6819f0b695f62b", { debug: false });

// "Sign-up clicked"
export function track(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Login clicked"
export function track2(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Landing page viewed"
export function track3(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Viewed Feed"
export function track4(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Image Mint Selected"
export function track5(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Video Mint Selected"
export function track6(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Audio Mint Selected"
export function track7(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Open Auction Selected"
export function track8(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Buy Now Selected"
export function track9(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Mint Continued"
export function track10(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Minted NFT"
export function track11(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Submit Post"
export function track12(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Buy Now"
export function track13(name: string, data) {
  mixpanel.track(name, data);
  console.log(name);
}
// "Cancel Bid"
export function track14(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Open Place a Bid Modal"
export function track15(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Bid Placed"
export function track16(name: string, data) {
  mixpanel.track(name, data);
  console.log(name);
}
// "Update profile type"
export function track17(name: string, data) {
  mixpanel.track(name, data);
  console.log(name);
}
// "Marketplace Viewed"
export function track18(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Update email"
export function track19(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Update profile"
export function track20(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Submit Post on Feed"
export function track21(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Email address clicked"
export function track22(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// Creates alias
export function alias(name: string) {
  mixpanel.alias(name);
  console.log(name);
}
// "Verify Email clicked"
export function track23(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Creator Selected"
export function track24(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Collector Selected"
export function track25(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Validate Username"
export function track26(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// Identify
export function identify1(name: string) {
  mixpanel.identify(name);
  console.log(name);
}
// "Verify phone skipped"
export function track27(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Onboarding - Verify profile clicked"
export function track28(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Onboarding - Profile created clicked"
export function track29(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Onboarding - Buy Creator Coin"
export function track30(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Onboarding - Contact Support"
export function track31(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Onboarding - Buy DeSo"
export function track32(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Post Clicked"
export function track33(name: string, data) {
  mixpanel.track(name, data);
  console.log(name);
}
// "Activity page viewed"
export function track34(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Messages page viewed"
export function track35(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Wallet page viewed"
export function track36(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Get Create Profile Message"
export function track37(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "login landing page - NOT in USe"
export function track38(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Landing page - Signup clicked"
export function track39(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Liked"
export function track40(name: string, data) {
  mixpanel.track(name, data);
  console.log(name);
}
// "Send diamonds"
export function track41(name: string, data) {
  mixpanel.track(name, data);
  console.log(name);
}
// "NFT created"
export function track42(name: string, data) {
  mixpanel.track(name, data);
  console.log(name);
}
// "Discovery viewed"
export function track44(event) {
  mixpanel.track(event);
  console.log(event);
}
// People Set
export function peopleset(name) {
  mixpanel.people.set(name);
  console.log(name);
}
// People Set - ref
export function peoplesetRef(name) {
  mixpanel.people.set_once(name, {
    name: name,
  });
}
// This tracks referrals
export function trackRefer(referrer: string) {
  mixpanel.track("Referral", {
    referrer: referrer,
  });
}
// "Bid Created"
export function track45(name: string, data) {
  mixpanel.track(name, data);
  console.log(name);
}
// "NFT Updated"
export function track46(name: string, data) {
  mixpanel.track(name, data);
  console.log(name);
}
// "Accept NFT bid"
export function track47(name: string, data) {
  mixpanel.track(name, data);
  console.log(name);
}
// "Transfer NFT"
export function track48(name: string, data) {
  mixpanel.track(name, data);
  console.log(name);
}
// "Burn NFT"
export function track49(name: string, data) {
  mixpanel.track(name, data);
  console.log(name);
}
// "Accept NFT Transfer"
export function track50(name: string, data) {
  mixpanel.track(name, data);
  console.log(name);
}
// "ETH NFT Created"
export function track51(name: string, data) {
  mixpanel.track(name, data);
  console.log(name);
}
// "ETH Wallet connected"
export function track52(name: string, data) {
  mixpanel.track(name, data);
  console.log(name);
}
// "ETH Deposited"
export function track53(name: string, data) {
  mixpanel.track(name, data);
  console.log(name);
}
// "Login launched"
export function track54(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Buy ETH clicked"
export function track55(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "ETH NFT sold"
export function track56(name: string, data) {
  mixpanel.track(name, data);
  console.log(name);
}
// "Click login"
export function track57(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Click Create Profile"
export function track58(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Create a collection"
export function track59(name: string, data) {
  mixpanel.track(name, data);
  console.log(name);
}
// "Delete NFT from Collection"
export function track61(name: string, data) {
  mixpanel.track(name, data);
  console.log(name);
}
// "Add NFT to Collection"
export function track60(name: string, data) {
  mixpanel.track(name, data);
  console.log(name);
}
// "Signup page opened"
export function track62(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Verify phone clicked""
export function track63(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "End of signup flow"
export function track64(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Connect with Deso - Signup flow started"
export function track65(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Connect with Deso - Signup flow started"
export function track66(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Browse Supernovas clicked on Landing pg"
export function track67(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// "Repost"
export function track69(name: string, data) {
  mixpanel.track(name, data);
  console.log(name);
}
// "Onboarding complete?"
export function track68(name: string, data) {
  mixpanel.track(name, data);
  console.log(name);
}
// "On-chain activity"
export function track70(name: string) {
  mixpanel.track(name);
  console.log(name);
}
// People Set email
export function peoplesetemail(name) {
  mixpanel.people.set(name);
  console.log(name);
}
export function register_once(name, data) {
  mixpanel.register_once(name, data);
  console.log(name);
}
// People Set creator?
export function peoplesetcreator(name) {
  mixpanel.people.set(name);
  console.log(name);
}
