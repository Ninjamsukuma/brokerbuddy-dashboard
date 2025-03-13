
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '@/hooks/useLanguage';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

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
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

interface RegistrationFormProps {
  onSubmit: (e: React.FormEvent) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const { t } = useLanguage();
  
  const form = useForm<RegistrationFormValues>({
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
          {t('becomeBroker.registration') || "Complete Your Broker Registration"}
        </h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="professionalTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Professional Title
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. Real Estate Consultant"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Specialization
                  </FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none">
                        <SelectValue placeholder="Select your specialization" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="residential">Residential Properties</SelectItem>
                      <SelectItem value="commercial">Commercial Properties</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                      <SelectItem value="vehicles">Vehicles</SelectItem>
                      <SelectItem value="machinery">Machinery & Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="yearsOfExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Years of Experience
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      min="0"
                      placeholder="Years of experience"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="serviceAreas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Service Areas
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. Nairobi, Mombasa"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Bio
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      rows={4}
                      placeholder="Tell clients about yourself and your expertise"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="idNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    ID/Passport Number
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="For verification purposes"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="termsAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mr-2 h-4 w-4 text-dalali-600 focus:ring-dalali-500 border-gray-300 rounded"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-gray-700">
                      I agree to the Terms of Service and Privacy Policy
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <Button 
              type="submit"
              className="w-full bg-dalali-600 text-white py-3 rounded-lg font-semibold hover:bg-dalali-700 transition-colors"
            >
              Complete Registration
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default RegistrationForm;
