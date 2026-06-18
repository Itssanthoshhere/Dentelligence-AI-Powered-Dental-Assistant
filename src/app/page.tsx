import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <SignOutButton>
        <SignInButton />
      </SignOutButton>

      <SignInButton>
        <div className="flex flex-col gap-4 items-center">
          <UserButton />
          <SignOutButton />
        </div>
      </SignInButton>
    </main>
  );
}
