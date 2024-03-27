import { SignUp } from "@clerk/nextjs";

function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <SignUp
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

export default SignupPage;
