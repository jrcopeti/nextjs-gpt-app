import { SignIn } from "@clerk/nextjs";

function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <SignIn
        appearance={{
          elements: {
            card: "bg-gradient-to-r from-slate-400 to-slate-500",
            formButtonPrimary: "bg-gradient-to-r from-primary to-secondary",
          },
        }}
      />
    </div>
  );
}

export default SignInPage;
