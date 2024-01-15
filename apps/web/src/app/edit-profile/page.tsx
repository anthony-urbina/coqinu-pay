import { EditProfileForm } from "@/components/forms/edit-profile-form";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <div className='text-red-400'>
      <section className='pb-2 md:pb-4'>
        <h1 className=''>Edit Profile</h1>
      </section>
      <section className='md:pb-6'>
        <div className='relative w-20 h-20 md:w-32 md:h-32'>
          <Image alt='coqinu-logo' src={"/images/coqinu-logo.png"} fill />
        </div>
      </section>
      <section className='max-w-screen-lg pt-2'>
        <EditProfileForm />
      </section>
    </div>
  );
}
