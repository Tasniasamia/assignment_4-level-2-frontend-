import Banner from "@/components/layout/banner";
import { SignupForm } from "@/components/modules/authentication/signupForm";

export default function Page() {
  return (
    <div>
      <Banner routeName="Signup" />
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full lg:max-w-md">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
