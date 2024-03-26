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
      <UserButton afterSignOutUrl="/" />
      <p className="text-md text-base-content">
        {user.emailAddresses[0].emailAddress}
      </p>
    </div>
  );
}

export default MemberProfile;
