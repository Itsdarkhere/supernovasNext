import styles from "../styles/Discovery/discovery.module.scss";
import Page from "../components/Wrappers/page";
import NFTSection from "../components/Discovery/nftSection";
import CreatorSection from "../components/Discovery/creatorSection";
import CategorySection from "../components/Discovery/categorySection";
import PromotedNFT from "../components/Discovery/promotedNFT";
import SectionTitle from "../components/Discovery/sectionTitle";
import BottomButtons from "../components/Discovery/bottomButtons";
import {
  GetNFTShowcase,
  post,
  GetSecondaryListings,
  GetRecentSales,
  GetFreshDrops,
  AdminGetVerifiedUsers,
} from "../utils/backendapi-context";
import { useState } from "react";
// Redux
import { useAppSelector, useAppDispatch } from "../utils/Redux/hooks";
import {
  setMarketplaceContentFormat,
  setMarketplaceStatus,
  setMarketplaceNFTCategory,
  setMarketplaceMarketType,
  setMarketplaceSortType,
} from "../utils/Redux/Slices/sortSlice";
import FormatSection from "../components/Discovery/formatSection";
// Redux end

const Discovery = () => {
  const dispatch = useAppDispatch();
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

  // Redux
  const localNode = useAppSelector((state) => state.node.localNode);
  const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);

  // Functions
  const getFeatured = () => {
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

        // This is used in the 'main' nft
        setPromotedNFT(featured[0]["PostEntryResponse"]);
        // The rest is 'trending auctions'
        setDataToShowOne(
          featured.slice(1, getCardsPerRow() + 1).map((nft, index) => {
            return nft["PostEntryResponse"];
          })
        );
        setTimeout(() => {
          setSectionLoadingOne(false);
        }, 0);
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
    // dont get if we have the data
    if (dataToShowThree.length !== 0) {
      return;
    }
    setSectionLoadingThree(true);
    GetRecentSales(localNode, loggedInUser?.PublicKeyBase58Check).subscribe({
      next: (res) => {
        setDataToShowThree(
          res.data["PostEntryResponse"].slice(0, getCardsPerRow())
        );
        setTimeout(() => {
          setSectionLoadingThree(false);
        }, 0);
      },
      error: (err) => console.log(err),
    });
  };

  const getSecondaryListings = () => {
    // dont get if we have the data
    if (dataToShowFour.length !== 0) {
      return;
    }
    setSectionLoadingFour(true);
    GetSecondaryListings(
      localNode,
      loggedInUser?.PublicKeyBase58Check
    ).subscribe({
      next: (res) => {
        setDataToShowFour(
          res.data["PostEntryResponse"].slice(0, getCardsPerRow())
        );
        setTimeout(() => {
          setSectionLoadingFour(false);
        }, 0);
      },
      error: (err) => console.log(err),
    });
  };

  const getFreshDrops = () => {
    // dont get if we have the data
    if (dataToShowTwo.length !== 0) {
      return;
    }

    setSectionLoadingTwo(true);
    GetFreshDrops(
      localNode,
      loggedInUser?.PublicKeyBase58Check,
      "BC1YLiiQ36NSLSK2bpLqi4PsP85mzBaKRTLxBAoTdNELohuRdrSMX9w"
    ).subscribe({
      next: (res) => {
        setDataToShowTwo(
          res.data["PostEntryResponse"].slice(0, getCardsPerRow())
        );
        setTimeout(() => {
          setSectionLoadingTwo(false);
        }, 0);
      },
      error: (err) => console.log(err),
    });
  };

  const loadVerifiedUsers = () => {
    // Dont load if we have the content
    if (dataToShowFive.length !== 0) {
      return;
    }
    setSectionLoadingFive(true);
    AdminGetVerifiedUsers(
      localNode,
      "BC1YLiiQ36NSLSK2bpLqi4PsP85mzBaKRTLxBAoTdNELohuRdrSMX9w"
    ).subscribe({
      next: (res) => {
        let arrayHolder = res.data.VerifiedUsers.sort(
          () => Math.random() - 0.5
        );

        setDataToShowFive(arrayHolder.slice(0, getCardsPerRow()));
        console.log(arrayHolder);
        console.log(dataToShowFive);
        // Some of the users might have deleted their profiles
        // So if fetch in creatorCard fails, we can try again with an additional profile
        setDataToShowExtra(arrayHolder.slice(8, 10));
        setTimeout(() => {
          setSectionLoadingFive(false);
        }, 300);
      },
      error: (err) => {
        console.log(err);
        setSectionLoadingFive(true);
      },
    });
  };

  // OH lord... rewrite
  const routeViewAll = (category: string) => {
    // Redux end
    switch (category) {
      // There is cases where old state store effects how these work in reality
      // Imo the issue is small enough not to set all to default b4
      case "trending":
        dispatch(setMarketplaceStatus("has bids"));
        break;
      case "art":
        dispatch(setMarketplaceNFTCategory("art"));
        break;
      case "collectibles":
        dispatch(setMarketplaceNFTCategory("collectibles"));
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
  };
  // Functions end

  // Lifecycle methods
  useState(() => {
    getFeatured();
    loadVerifiedUsers();
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
        <NFTSection
          loading={sectionLoadingOne}
          fetching="one"
          function={null}
          nftData={dataToShowOne}
        ></NFTSection>
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
        <NFTSection
          loading={sectionLoadingTwo}
          fetching="two"
          function={getFreshDrops}
          nftData={dataToShowTwo}
        ></NFTSection>
        <SectionTitle
          title={"Recent Sales"}
          viewAll={true}
          whatAllToShow={undefined}
          routeViewAll={undefined}
        ></SectionTitle>
        <NFTSection
          loading={sectionLoadingThree}
          fetching="three"
          function={getRecentSales}
          nftData={dataToShowThree}
        ></NFTSection>
        <SectionTitle
          title={"Secondary Listings"}
          viewAll={true}
          whatAllToShow={undefined}
          routeViewAll={undefined}
        ></SectionTitle>
        <NFTSection
          loading={sectionLoadingFour}
          fetching="four"
          function={getSecondaryListings}
          nftData={dataToShowFour}
        ></NFTSection>
        <SectionTitle
          title={"Verified Creators Snapshot"}
          viewAll={false}
          whatAllToShow={undefined}
          routeViewAll={undefined}
        ></SectionTitle>
        <CreatorSection
          localNode={localNode}
          loading={sectionLoadingFive}
          userData={dataToShowFive}
          dataToShowExtra={dataToShowExtra}
        ></CreatorSection>
        <SectionTitle
          title={"Explore content formats"}
          viewAll={false}
          whatAllToShow={undefined}
          routeViewAll={undefined}
        ></SectionTitle>
        <FormatSection routeViewAll={routeViewAll}></FormatSection>
        <BottomButtons></BottomButtons>
      </div>
    </Page>
  );
};
export default Discovery;
