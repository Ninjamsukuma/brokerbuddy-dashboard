
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import FormSection from './FormSection';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

const ProfessionalInfoSection: React.FC = () => {
  return (
    <FormSection title="Professional Information">
      <FormInput
        name="professionalTitle"
        label="Professional Title"
        placeholder="e.g. Real Estate Consultant"
      />
      
      <FormSelect
        name="specialization"
        label="Specialization"
        placeholder="Select your specialization"
        options={[
          { value: "residential", label: "Residential Properties" },
          { value: "commercial", label: "Commercial Properties" },
          { value: "land", label: "Land" },
          { value: "vehicles", label: "Vehicles" },
          { value: "machinery", label: "Machinery & Equipment" }
        ]}
      />
      
      <FormInput
        name="yearsOfExperience"
        label="Years of Experience"
        placeholder="Years of experience"
        type="number"
      />
    </FormSection>
  );
};

export default ProfessionalInfoSection;
