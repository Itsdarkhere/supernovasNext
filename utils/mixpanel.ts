import mixpanel from "mixpanel-browser";

// Enabling the debug mode flag is useful during implementation,
// but it's recommended you remove it for production
mixpanel.init("28e1ccdde0bc00420d6819f0b695f62b", { debug: false });

export class MixpanelService {
  constructor() {}

  // "Sign-up clicked"
  track(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Login clicked"
  track2(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Landing page viewed"
  track3(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Viewed Feed"
  track4(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Image Mint Selected"
  track5(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Video Mint Selected"
  track6(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Audio Mint Selected"
  track7(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Open Auction Selected"
  track8(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Buy Now Selected"
  track9(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Mint Continued"
  track10(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Minted NFT"
  track11(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Submit Post"
  track12(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Buy Now"
  track13(name: string, data) {
    mixpanel.track(name, data);
    console.log(name);
  }
  // "Cancel Bid"
  track14(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Open Place a Bid Modal"
  track15(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Bid Placed"
  track16(name: string, data) {
    mixpanel.track(name, data);
    console.log(name);
  }
  // "Update profile type"
  track17(name: string, data) {
    mixpanel.track(name, data);
    console.log(name);
  }
  // "Marketplace Viewed"
  track18(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Update email"
  track19(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Update profile"
  track20(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Submit Post on Feed"
  track21(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Email address clicked"
  track22(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // Creates alias
  alias(name: string) {
    mixpanel.alias(name);
    console.log(name);
  }
  // "Verify Email clicked"
  track23(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Creator Selected"
  track24(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Collector Selected"
  track25(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Validate Username"
  track26(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // Identify
  identify1(name: string) {
    mixpanel.identify(name);
    console.log(name);
  }
  // "Verify phone skipped"
  track27(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Onboarding - Verify profile clicked"
  track28(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Onboarding - Profile created clicked"
  track29(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Onboarding - Buy Creator Coin"
  track30(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Onboarding - Contact Support"
  track31(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Onboarding - Buy DeSo"
  track32(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Post Clicked"
  track33(name: string, data) {
    mixpanel.track(name, data);
    console.log(name);
  }
  // "Activity page viewed"
  track34(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Messages page viewed"
  track35(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Wallet page viewed"
  track36(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Get Create Profile Message"
  track37(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "login landing page - NOT in USe"
  track38(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Landing page - Signup clicked"
  track39(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Liked"
  track40(name: string, data) {
    mixpanel.track(name, data);
    console.log(name);
  }
  // "Send diamonds"
  track41(name: string, data) {
    mixpanel.track(name, data);
    console.log(name);
  }
  // "NFT created"
  track42(name: string, data) {
    mixpanel.track(name, data);
    console.log(name);
  }
  // "Discovery viewed"
  track44(event) {
    mixpanel.track(event);
    console.log(event);
  }
  // People Set
  peopleset(name) {
    mixpanel.people.set(name);
    console.log(name);
  }
  // People Set - ref
  peoplesetRef(name) {
    mixpanel.people.set_once(name, {
      name: name,
    });
  }
  // This tracks referrals
  trackRefer(referrer: string) {
    mixpanel.track("Referral", {
      referrer: referrer,
    });
  }
  // "Bid Created"
  track45(name: string, data) {
    mixpanel.track(name, data);
    console.log(name);
  }
  // "NFT Updated"
  track46(name: string, data) {
    mixpanel.track(name, data);
    console.log(name);
  }
  // "Accept NFT bid"
  track47(name: string, data) {
    mixpanel.track(name, data);
    console.log(name);
  }
  // "Transfer NFT"
  track48(name: string, data) {
    mixpanel.track(name, data);
    console.log(name);
  }
  // "Burn NFT"
  track49(name: string, data) {
    mixpanel.track(name, data);
    console.log(name);
  }
  // "Accept NFT Transfer"
  track50(name: string, data) {
    mixpanel.track(name, data);
    console.log(name);
  }
  // "ETH NFT Created"
  track51(name: string, data) {
    mixpanel.track(name, data);
    console.log(name);
  }
  // "ETH Wallet connected"
  track52(name: string, data) {
    mixpanel.track(name, data);
    console.log(name);
  }
  // "ETH Deposited"
  track53(name: string, data) {
    mixpanel.track(name, data);
    console.log(name);
  }
  // "Login launched"
  track54(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Buy ETH clicked"
  track55(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "ETH NFT sold"
  track56(name: string, data) {
    mixpanel.track(name, data);
    console.log(name);
  }
  // "Click login"
  track57(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Click Create Profile"
  track58(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Create a collection"
  track59(name: string, data) {
    mixpanel.track(name, data);
    console.log(name);
  }
  // "Delete NFT from Collection"
  track61(name: string, data) {
    mixpanel.track(name, data);
    console.log(name);
  }
  // "Add NFT to Collection"
  track60(name: string, data) {
    mixpanel.track(name, data);
    console.log(name);
  }
  // "Signup page opened"
  track62(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Verify phone clicked""
  track63(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "End of signup flow"
  track64(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Connect with Deso - Signup flow started"
  track65(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Connect with Deso - Signup flow started"
  track66(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Browse Supernovas clicked on Landing pg"
  track67(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // "Repost"
  track69(name: string, data) {
    mixpanel.track(name, data);
    console.log(name);
  }
  // "Onboarding complete?"
  track68(name: string, data) {
    mixpanel.track(name, data);
    console.log(name);
  }
  // "On-chain activity"
  track70(name: string) {
    mixpanel.track(name);
    console.log(name);
  }
  // People Set email
  peoplesetemail(name) {
    mixpanel.people.set(name);
    console.log(name);
  }
  register_once(name, data) {
    mixpanel.register_once(name, data);
    console.log(name);
  }
  // People Set creator?
  peoplesetcreator(name) {
    mixpanel.people.set(name);
    console.log(name);
  }
}
