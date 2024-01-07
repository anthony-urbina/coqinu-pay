"use client";
import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import { OutlineButton } from "../buttons/OutlineButton";
import { useSIWE } from "connectkit";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Navbar = () => {
  const { signIn, isSignedIn, data } = useSIWE();
  const router = useRouter();
  console.log({ isSignedIn, data });

  const redirectToEditProfilePage = async () => {
    router.push("/edit-profile");
  };

  return (
    <div className='flex items-center justify-between p-3 md:p-8'>
      <section>
        <Link href={"/"} className='flex items-baseline md:gap-x-2'>
          <h1 className='text-2xl'>C</h1>

          <div className='relative w-3.5 h-3.5 md:w-14 md:h-14'>
            <Image alt='coqinu-logo' src={"/images/coqinu-logo.png"} fill />
          </div>
          <h1 className='text-2xl lowercase'>qInu</h1>

          <h1 className='text-2xl'>Pay</h1>
        </Link>
      </section>
      <section className='flex items-center gap-x-2'>
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