import CompleteProfile from "../components/CompleteProfile/completeProfile";
import Page from "../components/Wrappers/page";

const UpdateProfile = () => {

    return (
        <Page isNFTProfile={false} noCap={false}>
            <CompleteProfile></CompleteProfile>
        </Page>
    )
}
export default UpdateProfile;