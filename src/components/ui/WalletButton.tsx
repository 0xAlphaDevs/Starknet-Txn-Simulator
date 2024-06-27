import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const WalletButton = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`px-2 py-1 rounded-md text-white disabled:opacity-50 ${props.className}`}
    >
      {children}
    </button>
  );
};
