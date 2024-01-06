"use client";
import { displayErrorToast, displaySuccessToast } from "@/utils/display-toast";
import { TextInput } from "../inputs/TextInput";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProfileSchema, profileSchema } from "@/schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSIWE } from "connectkit";
import { FilledButton } from "../buttons/FilledButton";
import { useEffect, useState } from "react";
import { useUserContext } from "@/contexts/UserContext";

export const EditProfileForm = () => {
  const { isSignedIn } = useSIWE();
  const [isSendingUpdateRequest, setIsSendingUpdateRequest] = useState(false);
  const { me, refreshMe } = useUserContext();
  console.log({ me });

  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<ProfileSchema>({
    defaultValues: {
      displayName: "",
      twitterUsername: "",
    },
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    fillFormIfValuesExist();
  }, [me, resetForm]);

  const fillFormIfValuesExist = () => {
    if (me) {
      resetForm({
        displayName: me?.displayName || "",
        twitterUsername: me?.twitterUsername || "",
      });
    }
  };

  const submitForm: SubmitHandler<ProfileSchema> = async (data) => {
    if (!isSignedIn) return;
    try {
      setIsSendingUpdateRequest(true);
      console.log("submit form data:", data);
      const res = await sendUpdateProfileRequest(data);
      setIsSendingUpdateRequest(false);
      console.log({ res });
      const { message } = res.data;
      handleSuccess(message);
    } catch (err: any) {
      handleError(err);
    }
  };

  const sendUpdateProfileRequest = async (data: ProfileSchema) => {
    const res = await axios.patch("/api/profile/patch", data);
    return res;
  };

  const handleSuccess = (successMessage: string) => {
    displaySuccessToast(successMessage);
    refreshMe();
  };

  const handleError = (err: any) => {
    console.error(err);
    setIsSendingUpdateRequest(false);
    const { message } = err.response.data;
    displayErrorToast(message);
  };

  return (
    <form className='flex flex-col gap-y-2' onSubmit={handleSubmit(submitForm)}>
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
      <FilledButton isLoading={isSendingUpdateRequest}>Update Profile</FilledButton>
    </form>
  );
};
