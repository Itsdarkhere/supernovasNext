import { useEffect, useState } from "react";
import styles from "../../styles/Reusables/creatorCard.module.scss";
import { GetSingleProfile, ProfileEntryResponse } from "../../utils/backendapi-context";
import Avatar from "./avatar";


const CreatorCard = (props) => {
    let failedFetchStep = 0;
    // State
    const [creatorProfile, setCreatorProfile] = useState<ProfileEntryResponse>(null);
    const [profileDeleted, setProfileDeleted] = useState(false);
    // State end

    // Lifecycle methods
    useEffect(() => {
        if (props.username != null) {
            loadProfile(props.username);
        }
    }, [props.username])
    // Lifecycle methods end

    // Functions
    const loadProfile = (username) => {
        GetSingleProfile(props.localNode, "", username).subscribe(
          (res) => {
            console.log(res.data.Profile)
            setCreatorProfile(res.data.Profile)
          },
          (error) => {
            if (failedFetchStep < 2) {
              loadProfile(props.extraUserNames[failedFetchStep]);
              failedFetchStep++;
            } else {
              setProfileDeleted(true)
            }
          }
        );
      }
    // Functions end

//   [routerLink]="['/' + globalVars.RouteNames.USER_PREFIX, creatorProfile?.Username]"
    return (
        <> 
        {profileDeleted ? 
        null
        :
        <div
        className={styles.creator_card_container}
            >  
            <div className={styles.creator_card_top_container}>
                <Avatar avatar={creatorProfile?.PublicKeyBase58Check} classN={styles.creator_card_avatar}></Avatar>
                <div className={styles.shader}></div>
            </div>
            <div className={styles.creator_card_bottom_container}>
                <label className={styles.cc_label}>Creator</label>
                {/* [routerLink]="['/' + globalVars.RouteNames.USER_PREFIX, creatorProfile?.Username]"
                queryParamsHandling="merge" */}
                <p
                className={styles.cc_username}
                >
                { creatorProfile?.Username }

                { creatorProfile?.IsVerified ?
                <i className="fas fs-14px fa-check-circle fa-md text-primary"></i>
                :
                null
                }
                </p>
                <div className={styles.cc_bio_box}>
                    <p className={styles.cc_p}>
                        { creatorProfile?.Description }
                    </p>
                    <div></div>
                </div>
                {/* <follow-button
                *ngIf="!globalVars.hasUserBlockedCreator(creatorProfile?.PublicKeyBase58Check)"
                [followButtonClasses]="[
                    'cc-follow-btn',
                    'mt-10px',
                    'ml-0px-important',
                    'font-weight-semiboldn',
                    'white-rounded-button'
                ]"
                [unfollowButtonClasses]="[
                    'cc-follow-btn',
                    'mt-10px',
                    'ml-0px-important',
                    'font-weight-semiboldn',
                    'white-rounded-button'
                ]"
                [followedPubKeyBase58Check]="creatorProfile?.PublicKeyBase58Check"
                ></follow-button> */}
            </div>
        </div>
        }
        </>
    )
}
export default CreatorCard;