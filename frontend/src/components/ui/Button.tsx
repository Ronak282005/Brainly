import React from "react";

interface ButtonProp {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick: () => void;
  children?: React.ReactNode;
}

export const Button = (props: ButtonProp) => {
  const { variant, size, text, startIcon, endIcon, onClick } = props;

  // Define Tailwind classes for variant and size
  const variantClasses = {
    primary: "bg-blue-500 text-[#3e3a37] hover:bg-blue-600 focus:ring-blue-300",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Combine classes
  const buttonClasses = `${variantClasses[variant]} ${sizeClasses[size]} rounded-md font-medium focus:outline-none inline-flex items-center space-x-2`;

  return (
    <button className={buttonClasses} onClick={onClick}>
      {/* Start Icon */}
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {/* Button Text */}
      <span>{text}</span>
      {/* End Icon */}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};
