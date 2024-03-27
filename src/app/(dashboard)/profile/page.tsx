import { fetchUserTokensbyId } from "@/utils/actions";
import { UserProfile, auth } from "@clerk/nextjs";
import { RiTokenSwapLine } from "react-icons/ri";

async function ProfilePage() {
  const { userId } = auth();

  if (!userId) {
    return <div>Not signed in</div>;
  }
  const currentTokens = await fetchUserTokensbyId(userId);

  return (
    <div>
      <h2 className="mb-8 ml-8 flex items-center gap-2 text-2xl font-extrabold">
        <RiTokenSwapLine /> Token amount:{" "}
        {currentTokens ? currentTokens.tokens : 0}
      </h2>
      <UserProfile
        appearance={{
          elements: {
            card: "bg-gradient-to-r from-slate-400 to-slate-500",
            profileSectionPrimaryButton: "text-primary",
          },
        }}
      />
    </div>
  );
}

export default ProfilePage;

// card: "bg-base-content",
// headerTitle: "text-base-content",
// headerSubtitle: "text-base-content",
// profileSectionTitleText: "text-base-content",
// profileSectionPrimaryButton: "text-primary",
// profileSectionContent: "text-base-content ",
// profileSectionTitle__activeDevices: "text-base-content",
// profileSectionSubtitle__activeDevices: "text-base-content",
// profileSectionSubtitle__sessions: "text-base-content",
// accordionTriggerButton:
//   "text-primary bg-base-content hover:bg-secondary",
// accordionTriggerButtonActive: "text-primary",
// accordionContent: "text-base-content",
// profileSection__activeDevices: "text-base-content",
// activeDevice__current: "text-primary",
// badge: "bg-primary",
// profileSectionTitleText__activeDevices: "text-base-content",
// profileSectionPrimaryButton__activeDevices: "text-primary",
// profileSectionTitle__danger: "text-base-content",
// profileSectionTitleText__danger: "text-base-content",
// profileSectionContent__danger: "text-base-content",
// navbarButtons__account: "text-primary",
