import { fetchOrGenerateTokensForUser } from "@/utils/actions";
import { UserButton, auth, currentUser } from "@clerk/nextjs";

async function MemberProfile() {
  const user = await currentUser();
  const { userId } = auth();

  if (!user || !userId) {
    return <div>Not signed in</div>;
  }

  await fetchOrGenerateTokensForUser(userId);

  return (
    <div className="flex items-center gap-3 px-4">
      <UserButton
        afterSignOutUrl="/"
        userProfileMode="navigation"
        userProfileUrl="/profile"
        appearance={{
          elements: {
            card: " bg-gradient-to-r from-slate-500 to-slate-400 shadow-lg",
          },
        }}
      />
      <p className="text-md text-base-content">
        {user.emailAddresses[0].emailAddress}
      </p>
    </div>
  );
}

export default MemberProfile;

// card: "bg-base-content",
// headerTitle: "text-base-content",
// headerSubtitle: "text-base-content",
// profileSectionTitleText: "text-base-content",
// profileSectionPrimaryButton: "text-primary",
// profileSectionContent: "text-base-content ",
// profileSectionTitle__activeDevices: "text-base-content",
// profileSectionSubtitle__activeDevices: "text-base-content",
// profileSectionSubtitle__sessions: "text-base-content",
// accordionTriggerButton: "text-primary bg-white",
// accordionTriggerButtonActive: "text-primary",
// accordionContent: "text-base-content",
// profileSection__activeDevices: "text-base-content",
// activeDevice__current: "text-primary",
// badge: "bg-primary",
// profileSectionTitleText__activeDevices: "text-base-content",
// profileSectionPrimaryButton__activeDevices: "text-primary",
// profileSectionTitleText__danger: "text-base-content",
// navbarButtons__account: "text-primary",
