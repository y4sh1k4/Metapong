import React, { ReactNode } from 'react';

interface CardProps {
  name: string;
  content: string;
  children?: ReactNode; // Allow children elements
  className?: string; // Optional className for flexibility
}

const Card: React.FC<CardProps> = ({ name, content, children, className }) => {
  return (
    <div
      className={`bg-transparent text-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center max-w-full mx-auto border border-[#1E293B] hover:shadow-[0_0_15px_#00FFFF] transition-shadow ${className || ''}`}
    >
       <div className="mb-5 self-center justify-self-center w-[40%] h-[50%]">{children}</div> 
      
      <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00FFFF] to-[#0088FF]">
        {name}
      </h1>

      <p className="text-gray-300 mt-2 text-sm">{content}</p>
    </div>
  );
};

export default Card;
