export interface FilledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const FilledButton = ({ children, className, ...props }: FilledButtonProps) => {
  return (
    <button
      className={`border border-primary rounded-md px-4 py-2 text-white hover:bg-opacity-90 bg-orange duration-100 ease-in-out active:scale-[99%] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
