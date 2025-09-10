
import React, { useState } from 'react';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Camera, Check, Star, Shield } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const BrokerProfile = () => {
  const { user, profile: userProfile } = useSupabaseAuth();
  const { t } = useLanguage();
  
  const [brokerProfile, setBrokerProfile] = useState({
    name: userProfile?.full_name || 'John Doe',
    email: userProfile?.email || 'johndoe@example.com',
    phone: userProfile?.phone || '+255 712 345 678',
    bio: 'Experienced real estate broker with over 5 years in the Dar es Salaam market. Specializing in residential properties and land.',
    location: 'Dar es Salaam, Tanzania',
    specialization: 'Residential Properties',
    yearsOfExperience: '5',
    rating: 4.8,
    reviewCount: 56,
    verified: true,
    profileImage: userProfile?.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(brokerProfile);
  
  const handleSaveProfile = () => {
    setBrokerProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully",
      duration: 3000,
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageUpload = () => {
    toast({
      title: "Feature coming soon",
      description: "Profile image upload will be available soon",
      duration: 3000,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-4">
          <div className="relative mb-4 sm:mb-0">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img 
            src={brokerProfile.profileImage}
            alt={brokerProfile.name}
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <button 
                onClick={handleImageUpload}
                className="absolute bottom-0 right-0 bg-dalali-600 text-white p-2 rounded-full shadow-md"
              >
                <Camera size={16} />
              </button>
            )}
            {brokerProfile.verified && !isEditing && (
              <div className="absolute bottom-0 right-0 bg-dalali-600 text-white p-1 rounded-full border-2 border-white">
                <Shield size={16} />
              </div>
            )}
          </div>
          
          <div className="flex-1 text-center sm:text-left">
            {!isEditing ? (
              <>
                <h2 className="text-xl font-semibold text-dalali-800">{brokerProfile.name}</h2>
                <div className="flex items-center justify-center sm:justify-start mt-1 mb-2">
                  <div className="flex items-center text-amber-500 mr-2">
                    <Star size={16} className="fill-current" />
                    <span className="ml-1 text-sm font-medium">{brokerProfile.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({brokerProfile.reviewCount} reviews)</span>
                  {brokerProfile.verified && (
                    <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800 border-green-200">
                      <Check size={12} className="mr-1" /> Verified
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-3">{brokerProfile.bio}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Email:</p>
                    <p className="text-gray-600">{brokerProfile.email}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Phone:</p>
                    <p className="text-gray-600">{brokerProfile.phone}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Location:</p>
                    <p className="text-gray-600">{brokerProfile.location}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Specialization:</p>
                    <p className="text-gray-600">{brokerProfile.specialization}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Experience:</p>
                    <p className="text-gray-600">{brokerProfile.yearsOfExperience} years</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-3 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <Input
                      name="name"
                      value={editedProfile.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={editedProfile.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <Input
                      name="phone"
                      value={editedProfile.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Location</label>
                    <Input
                      name="location"
                      value={editedProfile.location}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Specialization</label>
                    <Input
                      name="specialization"
                      value={editedProfile.specialization}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Years of Experience</label>
                    <Input
                      name="yearsOfExperience"
                      value={editedProfile.yearsOfExperience}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Bio</label>
                  <Textarea
                    name="bio"
                    value={editedProfile.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          {!isEditing ? (
            <Button 
              onClick={() => setIsEditing(true)}
              className="bg-dalali-600 text-white hover:bg-dalali-700"
            >
              Edit Profile
            </Button>
          ) : (
            <div className="space-x-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsEditing(false);
                  setEditedProfile(brokerProfile);
                }}
              >
                Cancel
              </Button>
              <Button 
                className="bg-dalali-600 text-white hover:bg-dalali-700"
                onClick={handleSaveProfile}
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h3 className="text-lg font-medium text-dalali-800 mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <div>
              <p className="font-medium">Notification Settings</p>
              <p className="text-sm text-gray-500">Manage your notification preferences</p>
            </div>
            <Button variant="outline" size="sm">Manage</Button>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b">
            <div>
              <p className="font-medium">Change Password</p>
              <p className="text-sm text-gray-500">Update your account password</p>
            </div>
            <Button variant="outline" size="sm">Update</Button>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b">
            <div>
              <p className="font-medium">Language Settings</p>
              <p className="text-sm text-gray-500">Change your preferred language</p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium text-red-600">Delete Account</p>
              <p className="text-sm text-gray-500">Permanently delete your account</p>
            </div>
            <Button variant="destructive" size="sm">Delete</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerProfile;
