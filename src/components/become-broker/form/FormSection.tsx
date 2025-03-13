
import React, { ReactNode } from 'react';

interface FormSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const FormSection: React.FC<FormSectionProps> = ({ 
  title, 
  children, 
  className = "" 
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {title && <h3 className="text-md font-medium text-dalali-800">{title}</h3>}
      {children}
    </div>
  );
};

export default FormSection;
