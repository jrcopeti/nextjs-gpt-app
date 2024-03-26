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
      <UserProfile />
    </div>
  );
}

export default ProfilePage;
