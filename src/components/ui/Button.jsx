import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  icon: Icon,
  iconPosition = 'right',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 select-none tracking-tight disabled:opacity-40 disabled:cursor-not-allowed group';

  const variants = {
    primary: 'bg-[#181818] text-[#F5F2EC] hover:bg-[#2C2A29] active:scale-[0.98]',
    secondary: 'bg-[#F5F2EC] text-[#181818] border border-[#181818] hover:bg-[#EAE4D9] active:scale-[0.98]',
    ivory: 'bg-white text-[#181818] hover:bg-[#F5F2EC] shadow-sm active:scale-[0.98]',
    bronze: 'bg-[#72503C] text-white hover:bg-[#5C4030] active:scale-[0.98]',
    outline: 'border border-[#D7C5AF] text-[#181818] hover:border-[#181818] hover:bg-black/5 active:scale-[0.98]',
    ghost: 'text-[#181818] hover:text-[#72503C] hover:bg-black/5',
    ghostWhite: 'text-[#F5F2EC] hover:text-white hover:bg-white/10',
  };

  const sizes = {
    sm: 'text-xs px-4 py-2 rounded-full gap-2',
    md: 'text-sm px-6 py-3 rounded-full gap-2.5',
    lg: 'text-base px-8 py-3.5 rounded-full gap-3',
  };

  const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} onClick={onClick} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} onClick={onClick} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={combinedClasses} onClick={onClick} disabled={disabled} {...props}>
      {content}
    </button>
  );
}
