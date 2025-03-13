
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '@/hooks/useLanguage';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

// Import our new components
import ProfessionalInfoSection from './form/ProfessionalInfoSection';
import ServiceInfoSection from './form/ServiceInfoSection';
import VerificationSection from './form/VerificationSection';

// Define validation schema using zod
const registrationFormSchema = z.object({
  professionalTitle: z.string().min(3, { message: "Title must be at least 3 characters" }),
  specialization: z.string().min(1, { message: "Please select a specialization" }),
  yearsOfExperience: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Please enter a valid number",
  }),
  serviceAreas: z.string().min(3, { message: "Please enter at least one service area" }),
  bio: z.string().min(20, { message: "Bio must be at least 20 characters" }),
  idNumber: z.string().min(5, { message: "ID number must be at least 5 characters" }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

interface RegistrationFormProps {
  onSubmit: (e: React.FormEvent) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const { t } = useLanguage();
  
  const methods = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      professionalTitle: "",
      specialization: "",
      yearsOfExperience: "",
      serviceAreas: "",
      bio: "",
      idNumber: "",
      termsAccepted: false,
    },
  });

  const handleSubmit = (values: RegistrationFormValues) => {
    // Create a synthetic event to maintain compatibility with the existing onSubmit prop
    const syntheticEvent = {
      preventDefault: () => {},
    } as React.FormEvent;
    
    console.log("Form values:", values);
    onSubmit(syntheticEvent);
  };

  return (
    <section className="mt-4">
      <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
        <h2 className="text-xl font-semibold text-dalali-800 mb-4">
          {t('becomeBroker.registration')}
        </h2>
        
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-6">
            <ProfessionalInfoSection />
            <ServiceInfoSection />
            <VerificationSection />
            
            <Button 
              type="submit"
              className="w-full bg-dalali-600 text-white py-3 rounded-lg font-semibold hover:bg-dalali-700 transition-colors"
            >
              {t('becomeBroker.submitRegistration')}
            </Button>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default RegistrationForm;
