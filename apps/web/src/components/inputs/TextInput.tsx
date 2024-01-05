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
  const isDateType = placeholder.toLowerCase().includes("date");
  return (
    <div className={`flex w-full flex-col ${className ?? ""}`}>
      <label htmlFor={id} className='pb-1 text-left text-sm font-semibold capitalize'>
        {label}
      </label>
      <div className='relative'>
        <div className='absolute left-3 top-1/2 -translate-y-1/2'>{!isDateType ? "" : icon}</div>
        <Controller
          name={id as any}
          control={control as any}
          render={({ field }) => (
            <input
              type='text'
              id={id}
              className={`w-full rounded-[5px] border border-primary bg-transparent p-3 placeholder:text-opacity-20 ${
                error ? "border-red-500" : ""
              }`}
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
