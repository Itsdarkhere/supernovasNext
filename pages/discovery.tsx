import styles from "../styles/Discovery/discovery.module.scss";
import Page from "../components/Wrappers/page";
import NFTSection from "../components/Discovery/nftSection";
import CreatorSection from "../components/Discovery/creatorSection";
import CategorySection from "../components/Discovery/categorySection";
import PromotedNFT from "../components/Discovery/promotedNFT";
import SectionTitle from "../components/Discovery/sectionTitle";
import BottomButtons from "../components/Discovery/bottomButtons";
import { GetNFTShowcase, post, GetSecondaryListings, GetRecentSales, GetFreshDrops, AdminGetVerifiedUsers } from "../utils/backendapi-context";
import { useState } from "react";
// Redux
import { useAppSelector, useAppDispatch } from "../utils/Redux/hooks";
import { setMarketplaceContentFormat, setMarketplaceStatus, setMarketplaceNFTCategory, 
    setMarketplaceMarketType, setMarketplaceSortType } from "../utils/Redux/Slices/sortSlice";
// Redux end

const Discovery = () => {
  // State
  const [sectionLoadingOne, setSectionLoadingOne] = useState(true);
  const [sectionLoadingTwo, setSectionLoadingTwo] = useState(true);
  const [sectionLoadingThree, setSectionLoadingThree] = useState(true);
  const [sectionLoadingFour, setSectionLoadingFour] = useState(true);
  const [sectionLoadingFive, setSectionLoadingFive] = useState(true);
  // Data
  const [dataToShowOne, setDataToShowOne] = useState([]);
  const [dataToShowTwo, setDataToShowTwo] = useState([]);
  const [dataToShowThree, setDataToShowThree] = useState([]);
  const [dataToShowFour, setDataToShowFour] = useState([]);
  const [dataToShowFive, setDataToShowFive] = useState([]);
  // Extra creator array ,, used incase a profile does not exist anymore
  const [dataToShowExtra, setDataToShowExtra] = useState([]);
  // PromotedNFT
  const [promotedNFT, setPromotedNFT] = useState(null);
  // State end

  // Functions
  const getFeatured = () => {
    const localNode = useAppSelector((state) => state.node.localNode);
    // dont get if we have the data
    if (dataToShowOne.length !== 0) {
      return;
    }
    setSectionLoadingOne(true);
    GetNFTShowcase(
      localNode,
      "BC1YLj2eXukwT9ZGSNDSZ48SEteTw7qmbUdsXvhA1P9dnSTPvM86y3C",
      "BC1YLj2eXukwT9ZGSNDSZ48SEteTw7qmbUdsXvhA1P9dnSTPvM86y3C"
    ).subscribe({
      next: (res) => {
        let featured = [];
        featured = res.data["NFTCollections"].sort(() => Math.random() - 0.5);
        console.log(res.data["NFTCollections"]);

        // This is used in the 'main' nft
        setPromotedNFT(featured[0]["PostEntryResponse"]);
        // The rest is 'trending auctions'
        setDataToShowOne(featured.slice(1, getCardsPerRow() + 1).map((nft, index) => {
            return nft["PostEntryResponse"]
        }));
        setTimeout(() => {
          setSectionLoadingOne(false);
        }, 350);
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  const getCardsPerRow = () => {
    let windowWidth = 1000;
    if (typeof window !== "undefined") {
      windowWidth = window.innerWidth;
    }
    if (windowWidth <= 992 || windowWidth >= 1400) {
      return 8;
    } else if (windowWidth > 1060) {
      return 6;
    } else {
      return 4;
    }
  };

  const getRecentSales = () => {
    const localNode = useAppSelector((state) => state.node.localNode);
    const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
    // dont get if we have the data
    if (dataToShowThree.length !== 0) {
      return;
    }
    setSectionLoadingThree(true);
    GetRecentSales(localNode, loggedInUser?.PublicKeyBase58Check)
      .subscribe({
        next: (res) => {
            setDataToShowThree(res["PostEntryResponse"].slice(0, getCardsPerRow()))
            setTimeout(() => {
                setSectionLoadingThree(false)
            }, 350);
        },
        error: (err) => console.log(err),
      });
  }

  const getSecondaryListings = () =>  {
    const localNode = useAppSelector((state) => state.node.localNode);
    const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
    // dont get if we have the data
    if (dataToShowFour.length !== 0) {
      return;
    }
    setSectionLoadingFour(true)
    GetSecondaryListings(localNode, loggedInUser?.PublicKeyBase58Check)
      .subscribe({
        next: (res) => {
            setDataToShowFour(res["PostEntryResponse"].slice(0, getCardsPerRow()))
            setTimeout(() => {
                setSectionLoadingFour(false)
            }, 350);
        },
        error: (err) => console.log(err),
      });
  }

  const getFreshDrops = () => {
    const localNode = useAppSelector((state) => state.node.localNode);
    const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
    // dont get if we have the data
    if (dataToShowTwo.length !== 0) {
      return;
    }

    setSectionLoadingTwo(true)
    GetFreshDrops(
        localNode,
        loggedInUser?.PublicKeyBase58Check,
        "BC1YLiiQ36NSLSK2bpLqi4PsP85mzBaKRTLxBAoTdNELohuRdrSMX9w"
      )
      .subscribe({
        next: (res) => {
            setDataToShowTwo(res["PostEntryResponse"].slice(0, getCardsPerRow()))
            setTimeout(() => {
            setSectionLoadingTwo(false);
            }, 300);
        },
        error: (err) => console.log(err),
      });
  }

  const loadVerifiedUsers = () =>  {
    const localNode = useAppSelector((state) => state.node.localNode);
    const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
    // Dont load if we have the content
    if (dataToShowFive.length !== 0) {
      return;
    }
    setSectionLoadingFive(true)
    AdminGetVerifiedUsers(localNode, "BC1YLiiQ36NSLSK2bpLqi4PsP85mzBaKRTLxBAoTdNELohuRdrSMX9w")
      .subscribe({
        next: (res) => {
            let arrayHolder = res.VerifiedUsers.sort(() => Math.random() - 0.5);

            setDataToShowFive(arrayHolder.slice(0, getCardsPerRow()))

            // Some of the users might have deleted their profiles
            // So if fetch in creatorCard fails, we can try again with an additional profile
            setDataToShowExtra(arrayHolder.slice(8, 10))
            setTimeout(() => {
                setSectionLoadingFive(false)
            }, 300);
        },
        error: (err) => {
            console.log(err);
            setSectionLoadingFive(true)
        }
      });
  }

  // OH lord... rewrite
  const routeViewAll = (category: string) => {
    // Redux 
    const dispatch = useAppDispatch();
    // Redux end
    switch (category) {
      // There is cases where old state store effects how these work in reality
      // Imo the issue is small enough not to set all to default b4
      case "trending":
        dispatch(setMarketplaceStatus("has bids"))
        break;
      case "art":
        dispatch(setMarketplaceNFTCategory("art"));
        break;
      case "collectibles":
        dispatch(setMarketplaceNFTCategory("collectibles"))
        break;
      case "generative":
        dispatch(setMarketplaceNFTCategory("generative art"));
        break;
      case "metaverse":
        dispatch(setMarketplaceNFTCategory("metaverse"));
        break;
      case "categorymusic":
        dispatch(setMarketplaceNFTCategory("music"));
        break;
      case "profilepic":
        dispatch(setMarketplaceNFTCategory("profile picture"));
        break;
      case "photography":
        dispatch(setMarketplaceNFTCategory("photography"));
        break;
      case "fresh":
        dispatch(setMarketplaceSortType("most recent first"));
        break;
      case "mostdiamonds":
        dispatch(setMarketplaceSortType("most diamonds first"));
        break;
      case "recentsales":
        dispatch(setMarketplaceSortType("most recent first"));
        dispatch(setMarketplaceStatus("sold"));
        break;
      case "secondarylistings":
        dispatch(setMarketplaceMarketType("secondary"));
        dispatch(setMarketplaceStatus("for sale"));
        break;
      case "image":
        dispatch(setMarketplaceContentFormat("images"));
        break;
      case "video":
        dispatch(setMarketplaceContentFormat("video"));
        break;
      case "formatmusic":
        dispatch(setMarketplaceContentFormat("music"));
        break;
      case "model":
        dispatch(setMarketplaceContentFormat("3d"));
        break;
      default:
        break;
    }
    // Navigate to marketplace after setting what to search by
    // FIX NAVIGATE
    // router.navigate(["/" + globalVars.RouteNames.TRENDS]);
  }
  // Functions end

  // Lifecycle methods
  useState(() => {
    getFeatured();
  }, []);
  // Lifecycle methods end

  return (
    <Page isNFTProfile={false} noCap={false}>
      <div style={{ height: "100%", width: "100%", overflow: "hidden" }}>
        <PromotedNFT post={promotedNFT} mobile={false}></PromotedNFT>
        <SectionTitle
          title={"Featured"}
          viewAll={false}
          whatAllToShow={undefined}
          routeViewAll={undefined}
        ></SectionTitle>
        <NFTSection loading={false} nftData={dataToShowOne}></NFTSection>
        <SectionTitle
          title={"Explore categories"}
          viewAll={false}
          whatAllToShow={undefined}
          routeViewAll={undefined}
        ></SectionTitle>
        <CategorySection viewAll={undefined}></CategorySection>
        <SectionTitle
          title={"Fresh drops"}
          viewAll={true}
          whatAllToShow={undefined}
          routeViewAll={undefined}
        ></SectionTitle>
        <NFTSection loading={sectionLoadingTwo} nftData={dataToShowTwo}></NFTSection>
        <SectionTitle
          title={"Recent Sales"}
          viewAll={true}
          whatAllToShow={undefined}
          routeViewAll={undefined}
        ></SectionTitle>
        <NFTSection loading={sectionLoadingThree} nftData={dataToShowThree}></NFTSection>
        <SectionTitle
          title={"Secondary Listings"}
          viewAll={true}
          whatAllToShow={undefined}
          routeViewAll={undefined}
        ></SectionTitle>
        <NFTSection loading={sectionLoadingFour} nftData={dataToShowFour}></NFTSection>
        <SectionTitle
          title={"Verified Creators Snapshot"}
          viewAll={false}
          whatAllToShow={undefined}
          routeViewAll={undefined}
        ></SectionTitle>
        <CreatorSection
          loading={false}
          userData={undefined}
        ></CreatorSection>
        <BottomButtons></BottomButtons>
      </div>
    </Page>
  );
};
export default Discovery;
