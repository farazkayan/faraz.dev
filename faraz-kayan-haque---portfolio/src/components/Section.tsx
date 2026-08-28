import React from 'react';

export const Section = ({
  id,
  children,
  className = '',
  containerClassName = '',
  fullHeight = true,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  fullHeight?: boolean;
}) => {
  return (
    <section 
      id={id} 
      className={`relative ${fullHeight ? 'min-h-screen flex flex-col justify-center' : ''} ${className}`}
    >
      {children}
    </section>
  );
};
