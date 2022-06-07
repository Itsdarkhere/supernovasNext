import styles from "../../../styles/Mint/ethFlow.module.scss";

const ETHFlow = () => { 
    
    return (
        <!-- ethereum Blockchain steps -->
<eth-step-one
  *ngIf="step === 2"
  [postImageArweaveSrc]="postImageArweaveSrc"
  [animationType]="animationType"
  [CATEGORY]="CATEGORY"
  [NAME_OF_PIECE]="NAME_OF_PIECE"
  [DESCRIPTION]="DESCRIPTION"
  [mobile]="mobile"
  [isUploading]="isUploading"
  (prevStep)="previousStepEth()"
  (nextStep)="nextStepEth()"
  (setRoyaltyETH)="updateRoyaltyETH($event)"
  (uploadContent)="_handleFilesInput($event)"
  (emitDropFile)="dropFile($event)"
  (selectCategory)="selectCategory($event)"
  (selectDescription)="setDescription($event)"
  (selectName)="setName($event)"
></eth-step-one>
<eth-step-two
  *ngIf="step === 3"
  [mobile]="mobile"
  [animationType]="animationType"
  (prevStep)="previousStepEth()"
  (nextStep)="nextStepEth()"
  (setSellingPriceEth)="updateSellingPriceETH($event)"
  [isSubmitPress]="isSubmitPress"
  [sellingPriceETH]="sellingPriceETH"
  [CREATOR_ROYALTY]="CREATOR_ROYALTY"
></eth-step-two>
<eth-step-three
  (prevStep)="previousStepEth()"
  (nextStep)="nextStepEth()"
  (routeToViewPost)="viewEthPost()"
  (ethRepost)="quoteEthRepost($event)"
  [animationType]="animationType"
  [isSubmitPress]="isSubmitPress"
  *ngIf="step === 4"
  [mobile]="mobile"
></eth-step-three>
<eth-right-side-one [postImageArweaveSrc]="postImageArweaveSrc" *ngIf="!mobile && step === 2"></eth-right-side-one>
<eth-right-side-two
  [postImageArweaveSrc]="postImageArweaveSrc"
  [sellingPriceETH]="sellingPriceETH"
  [NAME_OF_PIECE]="NAME_OF_PIECE"
  *ngIf="!mobile && step >= 3"
></eth-right-side-two>

    )
}
export default ETHFlow;