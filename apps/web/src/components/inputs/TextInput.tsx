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
      <label htmlFor={id} className='pb-1 text-sm font-semibold text-left text-white capitalize'>
        {label}
      </label>
      <div className='relative'>
        <div className='absolute -translate-y-1/2 left-3 top-1/2 text-primary text-opacity-40'>{icon}</div>
        <Controller
          name={id as any}
          control={control as any}
          render={({ field }) => (
            <input
              type='text'
              id={id}
              className={`w-full rounded-[5px] border border-white/60 bg-transparent p-3 text-white placeholder:text-white/60 ${
                icon ? "pl-8" : ""
              } ${error ? "border-red-500" : ""}`}
              placeholder={placeholder}
              {...field}
            />
          )}
        />
      </div>
      {error && <p className='pt-1 text-red-500 normal-case text-2xs'>{error}</p>}
    </div>
  );
};
