import ProfileDetails from "../../components/Profile/profileDetails";
import Page from "../../components/Wrappers/page";

const Profile = () => {
  return (
    <Page isNFTProfile={false} noCap={false}>
      <ProfileDetails></ProfileDetails>
    </Page>
  );
};
export default Profile;
