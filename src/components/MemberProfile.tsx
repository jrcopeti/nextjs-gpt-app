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
    <div className="flex items-center gap-2 px-4 text-primary">
      <UserButton afterSignOutUrl="/" />
      <p>{user.emailAddresses[0].emailAddress}</p>
    </div>
  );
}

export default MemberProfile;
