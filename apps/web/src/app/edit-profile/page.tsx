import Image from "next/image";

export default function ProfilePage() {
  return (
    <div className='text-red-400'>
      <section className='pb-2 md:pb-4'>
        <h1 className='text-2xl'>Profile Page</h1>
      </section>
      <div className='w-20 h-20 md:w-32 md:h-32 relative'>
        <Image alt='coqinu-logo' src={"/images/coqinu-logo.png"} fill />
      </div>
    </div>
  );
}
