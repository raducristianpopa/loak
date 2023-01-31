import { SignIn } from "@clerk/nextjs/app-beta/client";

export default function SignInPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-black">
      <SignIn
        appearance={{
          elements: {
            card: "bg-black border border-white shadow-sm shadow-white",
            headerTitle: "text-white text-center",
            headerSubtitle: "text-white text-center",
            socialButtons:
              "bg-white hover:bg-black rounded-md group transition-all duration-300",
            socialButtonsBlockButton:
              "transition-all duration-300 border-white group-hover:text-white rounded-md",
            socialButtonsBlockButtonArrow:
              "text-white opacity-100 duration-500",
            footer: "invisible",
          },
        }}
      />
    </div>
  );
}
