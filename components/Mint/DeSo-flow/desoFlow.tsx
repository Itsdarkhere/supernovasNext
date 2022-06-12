import styles from "../../../styles/Mint/desoFlow.module.scss";
import RightSideOneDeso from "./rightSideOneDeso";
import RightSideTwoDeso from "./rightSideTwoDeso";
import StepFourDeso from "./stepFourDeso";
import StepOneDeso from "./stepOneDeso";
import StepThreeDeso from "./stepThreeDeso";
import StepTwoDeso from "./stepTwoDeso";

const DesoFlow = () => {
  return (
    <>
      {step === 2 ? (
        <StepOneDeso
          previous={() => previousStep()}
          next={() => nextStep()}
          mobile={mobile}
          animationType={animationType}
          oneEdition={oneEdition}
          multipleEditions={multipleEditions}
          isBuyNow={isBuyNow}
          openAuction={openAuction}
          selectOneEdition={() => oneEditionSelected()}
          selectMultipleEditions={() => multipleEditionsSelected()}
          selectBuyNow={() => buyNowSelected()}
          selectOpenAuction={() => openAuctionSelected()}
        ></StepOneDeso>
      ) : null}

      {step === 3 ? (
        <StepTwoDeso
          previous={() => previousStep()}
          next={() => nextStep()}
          updateFilesInputCoverImage={(e) => _handleFilesInputCoverImage(e)}
          uploadContent={(e) => _handleFilesInput(e)}
          selectCategory={(e) => selectCategory(e)}
                    selectionEditionNumber={(e) => setEditionAmount(e)}
          selectDescription={(e) => setDescription(e)}
          selectName={(e) => setName(e)}
          singleFileInput={(e) => _handleFileInput(e)}
          modelType={modelType}
          audioType={audioType}
          videoType={videoType}
          imageType={imageType}
          mobile={mobile}
          animationType={animationType}
          isUploading={isUploading}
          readyToStream={readyToStream}
          isBuyNow={isBuyNow}
          NAME_OF_PIECE={NAME_OF_PIECE}
          EDITIONAMOUNTNUM={EDITIONAMOUNTNUM}
          DESCRIPTION={DESCRIPTION}
          CATEGORY={CATEGORY}
          postImageArweaveSrc={postImageArweaveSrc}
          postVideoArweaveSrc={postVideoArweaveSrc}
          postAudioArweaveSrc={postAudioArweaveSrc}
          postModelArweaveSrc={postModelArweaveSrc}
          postVideoDESOSrc={postVideoDESOSrc}
          KEY={KEY}
          VALUE={VALUE}
          KVAdd={(e) => addKV(e)}
          KVMap={KVMap}
          KVDelete={(e) => deleteKV(e)}
          oneEdition={oneEdition}
          multipleEditions={multipleEditions}
        ></StepTwoDeso>
      ) : null}
      {step === 4 ? (
        <StepThreeDeso
          previous={() => previousStep()}
          next={() => nextStep()}
          mobile={mobile}
          animationType={animationType}
          isBuyNow={isBuyNow}
          openAuction={openAuction}
          postImageArweaveSrc={postImageArweaveSrc}
          postVideoArweaveSrc={postVideoArweaveSrc}
          postAudioArweaveSrc={postAudioArweaveSrc}
          postModelArweaveSrc={postModelArweaveSrc}
          postVideoDESOSrc={postVideoDESOSrc}
          additionalDESORoyalties={additionalDESORoyalties}
          additionalCoinRoyalties={additionalCoinRoyalties}
          setNewCoinRoyalty={(e) => addNewCoinRoyalty(e)}
          setNewDESORoyalty={(e) => addNewDESORoyalty(e)}
          removeRoyalty={(e) => removeRoyalty(e)}
          toggleUnlockable={() => toggleUnlockableContent()}
          toggleForSale={() => togglePutForSale()}
          CREATOR_ROYALTY={CREATOR_ROYALTY}
          COIN_ROYALTY={COIN_ROYALTY}
          MIN_PRICE={MIN_PRICE}
          PUT_FOR_SALE={PUT_FOR_SALE}
          UNLOCKABLE_CONTENT={UNLOCKABLE_CONTENT}
          BUY_NOW_PRICE_USD={BUY_NOW_PRICE_USD}
          PRICE_USD={PRICE_USD}
          buyNowPriceDESO={buyNowPriceDESO}
          isSubmitPress={isSubmitPress}
          setBidAmountUSD={(e) => updateBidAmountUSD(e)}
          setCoinRoyalty={(e) => updateCoinRoyalty(e)}
          setCreatorRoyalty={(e) => updateCreatorRoyalty(e)}
          setBuyNowBidAmountUSD={(e) => updateBuyNowBidAmountUSD(e)}
          setMinBidClicked={() => handleMinBidClicked()}
          minBidClicked={minBidClicked}
          mint={() => _createPost()}
        ></StepThreeDeso>
      ) : null}

      {step === 5 ? (
        <StepFourDeso
          previous={() => previousStep()}
          next={() => nextStep()}
          mobile={mobile}
          animationType={animationType}
          openRepostModal={(e) => openModal(e)}
          seePost={() => seePost()}
        ></StepFourDeso>
      ) : null}

      {!mobile && 1 < step && step < 4 ? (
        <RightSideOneDeso
          postImageArweaveSrc={postImageArweaveSrc}
          isCoverImageUploading={isCoverImageUploading}
          modelType={modelType}
          audioType={audioType}
          readyToStream={readyToStream}
          postVideoDESOSrc={postVideoDESOSrc}
          videoUploadPercentage={videoUploadPercentage}
          updateFilesInputCoverImage={(e) => _handleFilesInputCoverImage(e)}
          step={step}
          deleteImage={() => deleteImage()}
        ></RightSideOneDeso>
      ) : null}

      {!mobile && step >= 4 ? (
        <RightSideTwoDeso
          audioType={audioType}
          videoType={videoType}
          MIN_PRICE={MIN_PRICE}
          NAME_OF_PIECE={NAME_OF_PIECE}
          postImageArweaveSrc={postImageArweaveSrc}
          postVideoArweaveSrc={postVideoArweaveSrc}
        ></RightSideTwoDeso>
      ) : null}
    </>
  );
};
export default DesoFlow;
