
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import FormSection from './FormSection';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';

const ServiceInfoSection: React.FC = () => {
  return (
    <FormSection title="Service Information">
      <FormInput
        name="serviceAreas"
        label="Service Areas"
        placeholder="e.g. Nairobi, Mombasa"
      />
      
      <FormTextarea
        name="bio"
        label="Bio"
        placeholder="Tell clients about yourself and your expertise"
        rows={4}
      />
    </FormSection>
  );
};

export default ServiceInfoSection;
