
import React, { useState } from 'react';
import { 
  Camera, Upload, Check, X, Facebook, Instagram, Twitter, Send, Copy, QrCode, Download 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { PropertyListing, MarketingMaterial } from './types';

interface MarketingGeneratorProps {
  listing?: PropertyListing;
}

const MarketingGenerator: React.FC<MarketingGeneratorProps> = ({ listing }) => {
  const [currentListing, setCurrentListing] = useState<PropertyListing | undefined>(listing);
  const [generatedMaterial, setGeneratedMaterial] = useState<MarketingMaterial | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState("");
  
  // Mock function to generate marketing material
  const generateMaterial = () => {
    if (!currentListing) return;
    
    setIsGenerating(true);
    
    // In a real implementation, this would be an API call to a backend service
    setTimeout(() => {
      const mockMaterial: MarketingMaterial = {
        id: Math.random().toString(36).substring(2, 9),
        propertyId: currentListing.id,
        imageUrl: selectedImage || currentListing.images[0],
        qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://dalali-kiganjani.com/property/" + currentListing.id,
        caption: caption || `Beautiful ${currentListing.type} in ${currentListing.location}, priced at ${currentListing.price.toLocaleString()} KSh`,
        hashtags: hashtags ? hashtags.split(' ') : ['#realestate', '#property', '#dalalikiganjani'],
        shares: 0,
        views: 0,
        leads: 0,
        createdAt: new Date().toISOString(),
      };
      
      setGeneratedMaterial(mockMaterial);
      setIsGenerating(false);
      
      toast({
        title: "Marketing Material Generated",
        description: "Your social media post is ready to share!",
        duration: 3000,
      });
    }, 2000);
  };
  
  const handleShare = (platform: string) => {
    // In a real implementation, this would integrate with social media APIs
    toast({
      title: `Shared on ${platform}`,
      description: "Your property has been shared successfully!",
      duration: 3000,
    });
    
    // Update share count
    if (generatedMaterial) {
      setGeneratedMaterial({
        ...generatedMaterial,
        shares: generatedMaterial.shares + 1,
      });
    }
  };
  
  const handleCopyLink = () => {
    // In a real implementation, this would copy a link to the clipboard
    navigator.clipboard.writeText(`https://dalali-kiganjani.com/property/${currentListing?.id}`);
    
    toast({
      title: "Link Copied",
      description: "Property link copied to clipboard!",
      duration: 3000,
    });
  };
  
  const handleDownloadImage = () => {
    // In a real implementation, this would download the generated image
    toast({
      title: "Image Downloaded",
      description: "Marketing image has been downloaded!",
      duration: 3000,
    });
  };
  
  // If no listing is selected and none is passed as prop, show a form to select a listing
  if (!currentListing) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Select a Property Listing</h2>
        <p className="text-gray-600 mb-6">Please select a property to create marketing materials for it</p>
        <Button 
          className="w-full"
          onClick={() => {
            // This is a mock - in a real app, this would open a listing selector
            toast({
              title: "Feature coming soon",
              description: "Listing selection will be available soon.",
              duration: 3000,
            });
          }}
        >
          Select Listing
        </Button>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Generate Marketing Material</h2>
      
      {!generatedMaterial ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Primary Image
            </label>
            <div className="grid grid-cols-3 gap-2">
              {currentListing.images.map((img, index) => (
                <div 
                  key={index}
                  className={`relative rounded-lg overflow-hidden h-20 cursor-pointer border-2 ${
                    selectedImage === img ? 'border-dalali-600' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img 
                    src={img} 
                    alt={`Property ${index+1}`} 
                    className="w-full h-full object-cover"
                  />
                  {selectedImage === img && (
                    <div className="absolute top-1 right-1 bg-dalali-600 rounded-full p-0.5">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Custom Caption (Optional)
            </label>
            <Textarea
              placeholder={`Beautiful ${currentListing.type} in ${currentListing.location}...`}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hashtags (Optional)
            </label>
            <Input
              placeholder="#realestate #property"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">Separate hashtags with spaces</p>
          </div>
          
          <Button 
            className="w-full bg-dalali-600 hover:bg-dalali-700"
            onClick={generateMaterial}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Marketing Material'}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden border border-gray-200">
            <img 
              src={generatedMaterial.imageUrl} 
              alt="Generated marketing material" 
              className="w-full h-auto"
            />
            
            {/* QR Code Overlay */}
            <div className="absolute bottom-3 right-3 h-24 w-24 p-1 bg-white rounded-lg shadow-md">
              <img 
                src={generatedMaterial.qrCodeUrl}
                alt="QR Code" 
                className="w-full h-full"
              />
            </div>
            
            {/* Property Details Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
              <h3 className="font-bold">{currentListing.title}</h3>
              <p>{currentListing.location} • {currentListing.price.toLocaleString()} KSh</p>
              <div className="flex items-center mt-1">
                <span className="text-xs bg-dalali-600 px-2 py-0.5 rounded-full">
                  {currentListing.bedrooms} Bed
                </span>
                {currentListing.bathrooms && (
                  <span className="text-xs bg-dalali-600 px-2 py-0.5 rounded-full ml-1">
                    {currentListing.bathrooms} Bath
                  </span>
                )}
                {currentListing.area && (
                  <span className="text-xs bg-dalali-600 px-2 py-0.5 rounded-full ml-1">
                    {currentListing.area} m²
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-1">Caption</h3>
            <p className="text-gray-600 p-2 bg-gray-50 rounded-lg text-sm">
              {generatedMaterial.caption}
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-1">Hashtags</h3>
            <p className="text-dalali-600 p-2 bg-gray-50 rounded-lg text-sm">
              {generatedMaterial.hashtags.join(' ')}
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-2">Share</h3>
            <div className="grid grid-cols-5 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex flex-col items-center p-2 h-auto border-green-500 text-green-600 hover:bg-green-50"
                onClick={() => handleShare('WhatsApp')}
              >
                <Send size={18} />
                <span className="text-xs mt-1">WhatsApp</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex flex-col items-center p-2 h-auto border-blue-500 text-blue-600 hover:bg-blue-50"
                onClick={() => handleShare('Facebook')}
              >
                <Facebook size={18} />
                <span className="text-xs mt-1">Facebook</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex flex-col items-center p-2 h-auto border-pink-500 text-pink-600 hover:bg-pink-50"
                onClick={() => handleShare('Instagram')}
              >
                <Instagram size={18} />
                <span className="text-xs mt-1">Instagram</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex flex-col items-center p-2 h-auto border-sky-500 text-sky-600 hover:bg-sky-50"
                onClick={() => handleShare('Twitter')}
              >
                <Twitter size={18} />
                <span className="text-xs mt-1">Twitter</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex flex-col items-center p-2 h-auto border-cyan-500 text-cyan-600 hover:bg-cyan-50"
                onClick={() => handleShare('Telegram')}
              >
                <Send size={18} />
                <span className="text-xs mt-1">Telegram</span>
              </Button>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleCopyLink}
            >
              <Copy size={16} className="mr-2" />
              Copy Link
            </Button>
            
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleDownloadImage}
            >
              <Download size={16} className="mr-2" />
              Download
            </Button>
          </div>
          
          <div className="pt-2 mt-2 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <div>
                <span className="text-gray-500">Shares:</span>
                <span className="font-medium ml-1">{generatedMaterial.shares}</span>
              </div>
              
              <div>
                <span className="text-gray-500">Views:</span>
                <span className="font-medium ml-1">{generatedMaterial.views}</span>
              </div>
              
              <div>
                <span className="text-gray-500">Leads:</span>
                <span className="font-medium ml-1">{generatedMaterial.leads}</span>
              </div>
            </div>
          </div>
          
          <Button 
            variant="outline"
            className="w-full"
            onClick={() => setGeneratedMaterial(null)}
          >
            Create New
          </Button>
        </div>
      )}
    </div>
  );
};

export default MarketingGenerator;
