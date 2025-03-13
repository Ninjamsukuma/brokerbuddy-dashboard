
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import FormSection from './FormSection';
import FormInput from './FormInput';
import FormCheckbox from './FormCheckbox';

const VerificationSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <FormSection title="Verification">
      <FormInput
        name="idNumber"
        label="ID/Passport Number"
        placeholder="For verification purposes"
      />
      
      <FormInput
        name="phoneVerification"
        label="Phone Number for Verification"
        placeholder="e.g. +255712345678"
        type="tel"
      />
      
      <FormCheckbox
        name="termsAccepted"
        label={t('becomeBroker.termsLabel')}
      />
    </FormSection>
  );
};

export default VerificationSection;
