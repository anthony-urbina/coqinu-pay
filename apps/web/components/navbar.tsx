"use client";
import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import { OutlineButton } from "./buttons/OutlineButton";

export const Navbar = () => {
  return (
    <div className='flex justify-between p-8'>
      <section className='flex items-center gap-x-2'>
        <Image width={60} height={60} alt='coqinu-logo' src={"/images/coqinu-logo.png"} />
        <h1>Registry</h1>
      </section>
      <section className='flex gap-x-2 items-center'>
        <OutlineButton>
          <div className='flex items-center gap-x-2'>
            <i className='fa-regular fa-user text-primary'></i>
            Edit Profile
          </div>
        </OutlineButton>
        <ConnectKitButton key={"connectkit-button"} showAvatar theme='retro' />
      </section>
    </div>
  );
};
