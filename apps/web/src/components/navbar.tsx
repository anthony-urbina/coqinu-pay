"use client";
import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import { OutlineButton } from "./buttons/OutlineButton";
import { useSIWE } from "connectkit";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { signIn, isSignedIn, data } = useSIWE();
  const router = useRouter();
  console.log({ isSignedIn, data });

  const redirectToEditProfilePage = async () => {
    router.push("/edit-profile");
  };

  return (
    <div className='flex justify-between p-3 md:p-8 items-center'>
      <section className='flex items-center gap-x-1 md:gap-x-2'>
        <div className='w-7 h-7 md:w-14 md:h-14 relative'>
          <Image alt='coqinu-logo' src={"/images/coqinu-logo.png"} fill />
        </div>
        <h1 className='text-2xl'>Registry</h1>
      </section>
      <section className='flex gap-x-2 items-center'>
        <OutlineButton onClick={redirectToEditProfilePage}>
          <div className='flex items-center gap-x-2'>
            <i className='fa-regular fa-user text-primary '></i>
            <p className='hidden md:contents'>Edit Profile</p>
          </div>
        </OutlineButton>
        <ConnectKitButton key={"connectkit-button"} theme='auto' showAvatar={false} />
      </section>
    </div>
  );
};
