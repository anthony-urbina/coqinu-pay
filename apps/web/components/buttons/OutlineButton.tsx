export interface OutlineButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const OutlineButton = ({ children, className, ...props }: OutlineButtonProps) => {
  return (
    <button
      className={`bg-transparent border border-primary rounded-md px-4 py-2 text-primary hover:bg-opacity-10 hover:bg-orange duration-100 ease-in-out active:scale-[99%] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
