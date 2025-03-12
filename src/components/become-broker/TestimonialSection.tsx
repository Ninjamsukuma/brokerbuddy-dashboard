
import React from 'react';
import { Star } from 'lucide-react';

const TestimonialSection: React.FC = () => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-dalali-800 mb-4">
        What Our Brokers Say
      </h2>
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
            <img 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Testimonial" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium">Sarah Mwangi</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
        </div>
        <p className="text-gray-700 italic">
          "Joining Dalali Kiganjani was the best career decision I've made. The platform makes it easy to connect with clients, and I've doubled my income in just 6 months!"
        </p>
      </div>
    </section>
  );
};

export default TestimonialSection;
