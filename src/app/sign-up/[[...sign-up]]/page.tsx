import { SignUp } from "@clerk/nextjs";

function SignupPage() {
  return (
    <div className='min-h-screen flex justify-center items-center '>
      <SignUp />
    </div>
  );
}

export default SignupPage;
