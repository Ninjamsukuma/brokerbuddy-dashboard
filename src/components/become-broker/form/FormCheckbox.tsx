
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface FormCheckboxProps {
  name: string;
  label: string;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({ name, label }) => {
  const { control } = useFormContext();
  
  return (
    <FormField
      control={control}
      name={name}
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
              {label}
            </FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default FormCheckbox;
