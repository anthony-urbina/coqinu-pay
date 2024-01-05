"use client";
import { TextInput } from "@/components/inputs/TextInput";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProfileSchema, profileSchema } from "@/schemas/profile";
import { FilledButton } from "@/components/buttons/FilledButton";
import axios from "axios";

export default function ProfilePage() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileSchema>({
    defaultValues: {
      displayName: "",
      twitterUsername: "",
    },
    resolver: zodResolver(profileSchema),
  });

  const updateProfile: SubmitHandler<ProfileSchema> = async (data) => {
    try {
      const res = await axios.patch("api/profile/patch", data);
      console.log("res", res);
      reset();
      // TODO: show toast
    } catch (err) {
      console.error(err);
    }
  };

  console.log(errors);
  return (
    <div className='text-red-400'>
      <section className='pb-2 md:pb-4'>
        <h1 className='text-2xl'>Edit Profile</h1>
      </section>
      <section>
        <div className='w-20 h-20 md:w-32 md:h-32 relative'>
          <Image alt='coqinu-logo' src={"/images/coqinu-logo.png"} fill />
        </div>
      </section>
      <section className='pt-2'>
        <form className='flex flex-col gap-y-2' onSubmit={handleSubmit(updateProfile)}>
          <TextInput
            placeholder='Enter your display name'
            id='displayName'
            label='display name'
            control={control}
            error={errors.displayName?.message}
          />
          <TextInput
            placeholder='Enter your Twitter handle'
            id='twitterUsername'
            label='twitter username'
            control={control}
            icon={<i className='fa-regular fa-at' />}
            error={errors.twitterUsername?.message}
          />
          <FilledButton>Update Profile</FilledButton>
        </form>
      </section>
    </div>
  );
}
