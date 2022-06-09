import ActivityContent from "../components/Activity/activityContent";
import Page from "../components/Wrappers/page";
import styles from "../styles/Activity/activity.module.scss";

const Activity = () => {
  return (
    <Page isNFTProfile={false} noCap={false}>
      <ActivityContent></ActivityContent>
    </Page>
  );
};
export default Activity;
