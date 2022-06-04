import DesoDetails from "./desoDetails";
import ETHDetails from "./ethDetails";
import DiscoveryDetails from "./discoveryDetails";
import {
  NFTEntryResponse,
  GetNFTEntriesForNFTPost,
  DecryptUnlockableTexts,
  PostEntryResponse,
  NFTBidData,
  ProfileEntryResponse,
} from "../../../utils/backendapi-context";
import _ from "lodash";
import { useAppSelector } from "../../../utils/Redux/hooks";
import { useEffect, useState } from "react";
// This component shows all different states of an nft to users
// Information about the current sale state of the nft in question
// Also the actions related:
// Such as bid, buy now, cancel bid, bid again etc ...
// Split into 3 components, deso, eth and discovery
// isNFTDetail: boolean,
//   postContent: PostEntryResponse,
//   highestBidOwner: any,
//   ethNFTOwnerWalletAddress: string,
//   ethNFTCreatorWalletAddress: string,
//   ethNFTCreatorDesoProfile: ProfileEntryResponse,
//   ethNFTOwnerDesoPublicKey: string,
//   nftBidData: NFTBidData
const BidBox = (props) => {
  // Redux
  const loggedInUser = useAppSelector((state) => state.loggedIn.loggedInUser);
  const localNode = useAppSelector((state) => state.node.localNode);
  const isEthQuoteRepost = useAppSelector((state) => state.imx.isEthQuoteRepost);
  // Redux end

  // Vars
  let nftEntryResponses: NFTEntryResponse[];
  // Vars end

  // State
  const [highBid, setHighBid] = useState(null);
  const [buyNowPriceNanos, setBuyNowPriceNanos] = useState(null);
  const [nftMinBidAmountNanos, setNFTMinBidAmountNanos] = useState(null);
  const [lastAcceptedBidAmountNanos, setLastAcceptedBidAmountNanos] =
    useState(null);
  const [showPlaceABid, setShowPlaceABid] = useState(false);
  const [nftEntryResponse, setNFTEntryResponse] = useState(null);
  const [buyNowEqualMinBid, setBuyNowEqualMinBid] = useState(false);
  // Edition specific states
  const [editionIsBuyNow, setEditionIsBuyNow] = useState(false);
  const [editionForSale, setEditionForSale] = useState(false);
  const [editionHasBeenSold, setEditionHasBeenSold] = useState(false);
  const [ownsEdition, setOwnsEdition] = useState(false);
  const [editionHasUnlockable, setEditionHasUnlockable] = useState(false);
  const [editionHasBids, setEditionHasBids] = useState(false);
  const [editionHasBidByUser, setEditionHasBidByUser] = useState(false);
  // Its set to 1 to avoid errors, but we need to make it a var to trigger updates immidiately
  const [editionNumber, setEditionNumber] = useState(1);
  // Statefull object arrays
  const [decryptableNFTEntryResponses, setDecryptableNFTEntryResponses] =
    useState<NFTEntryResponse[]>([]);
  const [mySerialNumbersNotForSale, setMySerialNumbersNotForSale] =
    useState<NFTEntryResponse[]>([]);
  const [availableSerialNumbers, setAvailableSerialNumbers] = useState<NFTEntryResponse[]>([]);
  // State end

  // Lifecycle methods
  useEffect(() => {
    if (props.postContent?.PostHashHex) {
      getNFTEntries();
    }

    // Put back ,,, check if its eth before doing tho
    // await this.updateEthNFTForSaleStatus();
    // await this.ownsEthNFTStatus();
  }, [props.postContent]);
  // Lifecycle methods end

  // Functions
  const getNFTEntries = () => {
    GetNFTEntriesForNFTPost(
      localNode,
      loggedInUser?.PublicKeyBase58Check,
      props.postContent.PostHashHex
    ).subscribe((res) => {
      nftEntryResponses = res.data.NFTEntryResponses;
      // Set serialnumber of which to use in logic to be one that the user owns
      // or the first one if user does not own any
      setSerialNumberToUse();

      // Insert selected ser into variable
      console.log(" HERE");
      console.log(nftEntryResponses);
      console.log(editionNumber);
      nftEntryResponses.forEach((item) => {
        console.log(item.SerialNumber + " numbas " + editionNumber);
        if (item.SerialNumber === editionNumber) {
          setNFTEntryResponse(item);
        }
      });

      // Update buy now related stuff
      updateBuyNow();

      // Put back / rewrite ,,, right now loading logic is inside each child component
      // loadingEditionDetails = true;

      // Update edition specifics
      updateEditionSpecificLogic();

      nftEntryResponses.sort((a, b) => a.SerialNumber - b.SerialNumber);
      setDecryptableNFTEntryResponses(
        nftEntryResponses.filter(
          (sn) =>
            sn.OwnerPublicKeyBase58Check ===
              loggedInUser?.PublicKeyBase58Check &&
            sn.EncryptedUnlockableText &&
            sn.LastOwnerPublicKeyBase58Check
        )
      );

      if (decryptableNFTEntryResponses.length) {
        DecryptUnlockableTexts(
          loggedInUser?.PublicKeyBase58Check,
          decryptableNFTEntryResponses
        ).subscribe((res) => setDecryptableNFTEntryResponses(res));
      }
      setAvailableSerialNumbers(
        nftEntryResponses.filter(
          (nftEntryResponse) => nftEntryResponse.IsForSale
        )
      );

      setMySerialNumbersNotForSale(
        nftEntryResponses.filter(
          (nftEntryResponse) =>
            !nftEntryResponse.IsForSale &&
            nftEntryResponse.OwnerPublicKeyBase58Check ===
              loggedInUser?.PublicKeyBase58Check
        )
      );

      const myAvailableSerialNumbers = availableSerialNumbers.filter(
        (nftEntryResponse) =>
          nftEntryResponse.OwnerPublicKeyBase58Check ===
          loggedInUser?.PublicKeyBase58Check
      );

      setShowPlaceABid(
        !!(availableSerialNumbers.length - myAvailableSerialNumbers.length)
      );
      setHighBid(
        _.maxBy(availableSerialNumbers, "HighestBidAmountNanos")
          ?.HighestBidAmountNanos || 0
      );

      if (nftEntryResponses.length === 1) {
        setLastAcceptedBidAmountNanos(
          nftEntryResponses[0].LastAcceptedBidAmountNanos
        );
        if (nftEntryResponses[0].MinBidAmountNanos >= 0) {
          setNFTMinBidAmountNanos(nftEntryResponses[0].MinBidAmountNanos);
        }
      } else {
        setLastAcceptedBidAmountNanos(
          nftEntryResponses[0]?.LastAcceptedBidAmountNanos
        );
        setNFTMinBidAmountNanos(nftEntryResponses[0]?.MinBidAmountNanos);
      }
    });
  };

  // If user owns a serial number we want to show stuff related to that serial number
  const setSerialNumberToUse = () => {
    const loggedInPubKey = loggedInUser?.PublicKeyBase58Check;
    if (!nftEntryResponses) {
      return;
    }
    let serialList = nftEntryResponses.filter(
      (NFTEntryResponse) =>
        NFTEntryResponse.OwnerPublicKeyBase58Check === loggedInPubKey
    );
    if (serialList.length > 0) {
      setEditionNumber(serialList[0].SerialNumber);
    } else {
      setEditionNumber(nftEntryResponses[0].SerialNumber);
    }
  };

  const updateBuyNow = () => {
    if (nftEntryResponse?.IsBuyNow) {
      setEditionIsBuyNow(true);
      if (
        editionIsBuyNow &&
        nftEntryResponse.BuyNowPriceNanos === nftEntryResponse.MinBidAmountNanos
      ) {
        setBuyNowEqualMinBid(true);
      } else {
        setBuyNowEqualMinBid(false);
      }
    } else {
      setEditionIsBuyNow(false);
    }
    setBuyNowPriceNanos(nftEntryResponse?.BuyNowPriceNanos);
  };

  const updateEditionSpecificLogic = () => {
    // Check if user owns this edition
    setOwnsEdition(
      nftEntryResponse?.OwnerPublicKeyBase58Check ==
        loggedInUser?.PublicKeyBase58Check
    );
    // Check if this edition is for sale
    setEditionForSale(nftEntryResponse?.IsForSale);
    // Check if edition has bids
    if (props.nftBidData?.BidEntryResponses) {
      setEditionHasBids(props.nftBidData?.BidEntryResponses?.length > 0);
    }
    // Check if edition has unlockable
    if (!editionIsBuyNow) {
      setEditionHasUnlockable(nftEntryResponse?.DecryptedUnlockableText != null);
    }
    // Check if user has made a bid on this edition
    if (!ownsEdition && props.nftBidData?.BidEntryResponses) {
      setEditionHasBidByUser(
        props.nftBidData?.BidEntryResponses.filter(
          (bid) =>
            bid.PublicKeyBase58Check === loggedInUser?.PublicKeyBase58Check
        )?.length > 0
      );
    }
  };
  // Functions end

  // Dom manipulation
  const showCorrectDetails = () => {
    if (props.isNFTDetail) {
      return (
        <DesoDetails
          nftEntryResponse={nftEntryResponse}
          buyNowPriceNanos={buyNowPriceNanos}
          highBid={highBid}
          highestBidOwner={props.highestBidOwner}
          nftMinBidAmountNanos={nftMinBidAmountNanos}
          editionForSale={editionForSale}
          ownsEdition={ownsEdition}
          editionHasUnlockable={editionHasUnlockable}
          editionHasBeenSold={editionHasBeenSold}
          editionHasBids={editionHasBids}
          editionIsBuyNow={editionIsBuyNow}
          buyNowEqualMinBid={buyNowEqualMinBid}
          editionHasBidByUser={editionHasBidByUser}
        ></DesoDetails>
      );
    } else if (!props.isNFTDetail && !props.postContent?.PostExtraData?.isEthereumNFT) {
      return (
        <DiscoveryDetails
          buyNowPriceNanos={buyNowPriceNanos}
          nftEntryResponse={nftEntryResponse}
          highBid={highBid}
          nftMinBidAmountNanos={nftMinBidAmountNanos}
          lastAcceptedBidAmountNanos={lastAcceptedBidAmountNanos}
          hightestBidOwner={props.highestBidOwner}
          showPlaceABid={showPlaceABid}
          postContent={props.postContent}
          nftEntryResponses={nftEntryResponses}
          decryptableNFTEntryResponses={decryptableNFTEntryResponses}
          mySerialNumbersNotForSale={mySerialNumbersNotForSale}
          availableSerialNumbers={availableSerialNumbers}
          nftBidData={props.nftBidData}
          editionIsBuyNow={editionIsBuyNow}
          editionForSale={editionForSale}
          editionHasBeenSold={editionHasBeenSold}
        ></DiscoveryDetails>
      );
    } else if (props.postContent?.PostExtraData?.isEthereumNFT && !isEthQuoteRepost) {
      return (
        <ETHDetails
          ethNFTOwnerWalletAddress={props.ethNFTOwnerWalletAddress}
          ethNFTCreatorWalletAddress={props.ethNFTCreatorWalletAddress}
          ethNFTCreatorDesoProfile={props.ethNFTCreatorDesoProfile}
          ethNFTOwnerDesoPublicKey={props.ethNFTOwnerDesoPublicKey}
        ></ETHDetails>
      );
    }
  };
  // Dom manipulation end

  return <>{showCorrectDetails()}</>;
};
export default BidBox;
