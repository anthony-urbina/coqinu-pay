import { ReactNode } from "react";
import { Controller } from "react-hook-form";

interface TextInputProps {
  id: string;
  label: string;
  placeholder: string;
  className?: string;
  icon?: ReactNode;
  error?: string;
  control: any;
}

export const TextInput = ({ label, placeholder, id, className, icon, error, control }: TextInputProps) => {
  return (
    <div className={`flex w-full flex-col ${className ?? ""}`}>
      <label htmlFor={id} className='pb-1 text-left text-sm font-semibold capitalize text-black'>
        {label}
      </label>
      <div className='relative'>
        <div className='absolute left-3 top-1/2 -translate-y-1/2 text-primary text-opacity-40'>{icon}</div>
        <Controller
          name={id as any}
          control={control as any}
          render={({ field }) => (
            <input
              type='text'
              id={id}
              className={`w-full rounded-[5px] border border-black bg-transparent p-3 text-black ${
                icon ? "pl-8" : ""
              } ${error ? "border-red-500" : ""}`}
              placeholder={placeholder}
              {...field}
            />
          )}
        />
      </div>
      {error && <p className='pt-1 text-2xs normal-case text-red-500'>{error}</p>}
    </div>
  );
};
