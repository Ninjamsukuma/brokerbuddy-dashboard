
import React from 'react';

interface RegistrationFormProps {
  onSubmit: (e: React.FormEvent) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  return (
    <section className="mt-4">
      <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
        <h2 className="text-xl font-semibold text-dalali-800 mb-4">
          Complete Your Broker Registration
        </h2>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Professional Title
            </label>
            <input 
              type="text"
              placeholder="e.g. Real Estate Consultant"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specialization
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none">
              <option value="">Select your specialization</option>
              <option value="residential">Residential Properties</option>
              <option value="commercial">Commercial Properties</option>
              <option value="land">Land</option>
              <option value="vehicles">Vehicles</option>
              <option value="machinery">Machinery & Equipment</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Years of Experience
            </label>
            <input 
              type="number"
              min="0"
              placeholder="Years of experience"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Areas
            </label>
            <input 
              type="text"
              placeholder="e.g. Nairobi, Mombasa"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea 
              rows={4}
              placeholder="Tell clients about yourself and your expertise"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID/Passport Number
            </label>
            <input 
              type="text"
              placeholder="For verification purposes"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dalali-500 focus:outline-none"
            />
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox"
              id="terms"
              className="mr-2 h-4 w-4 text-dalali-600 focus:ring-dalali-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-dalali-600 text-white py-3 rounded-lg font-semibold hover:bg-dalali-700 transition-colors"
          >
            Complete Registration
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;
