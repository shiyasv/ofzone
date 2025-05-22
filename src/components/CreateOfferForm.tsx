
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Image } from "lucide-react";
import { addOffer, fileToBase64 } from "@/utils/offerData";

interface CreateOfferFormProps {
  onOfferAdded: () => void;
}

const CreateOfferForm = ({ onOfferAdded }: CreateOfferFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discountPercentage: 10,
    validUntil: "",
    code: "",
    category: "",
    isFeatured: false,
    isLimited: false,
    imageUrl: "",
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setFormData((prev) => ({ ...prev, [name]: numValue }));
    }
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image should be less than 2MB",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsUploading(true);
      const base64 = await fileToBase64(file);
      setImagePreview(base64);
      setFormData(prev => ({ ...prev, imageUrl: base64 }));
      toast({
        title: "Image uploaded",
        description: "Image has been uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, imageUrl: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.code || !formData.validUntil) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      addOffer(formData);
      toast({
        title: "Success",
        description: "Offer has been created successfully",
      });
      setFormData({
        title: "",
        description: "",
        discountPercentage: 10,
        validUntil: "",
        code: "",
        category: "",
        isFeatured: false,
        isLimited: false,
        imageUrl: "",
      });
      setImagePreview(null);
      onOfferAdded();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create offer",
        variant: "destructive",
      });
    }
  };

  const today = new Date();
  today.setDate(today.getDate() + 1); // Set default date to tomorrow
  const minDate = today.toISOString().split('T')[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Create New Offer</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Summer Sale"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Promo Code *</Label>
              <Input
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="SUMMER20"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Get amazing discounts on all summer products"
              required
            />
          </div>
          
          {/* Image Upload Section */}
          <div className="space-y-2">
            <Label htmlFor="imageUpload">Offer Image</Label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 bg-gray-50">
              {!imagePreview ? (
                <div className="text-center">
                  <Upload className="h-12 w-12 mx-auto text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Click to upload an image or drag and drop</p>
                  <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
                  <Input 
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="mt-4 w-auto mx-auto"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                </div>
              ) : (
                <div className="relative w-full">
                  <img
                    src={imagePreview}
                    alt="Offer preview"
                    className="max-h-40 mx-auto rounded-md object-contain"
                  />
                  <div className="flex justify-center mt-4 space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      type="button"
                      onClick={() => document.getElementById('imageUpload')?.click()}
                    >
                      Change
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      type="button"
                      onClick={removeImage}
                    >
                      Remove
                    </Button>
                    <Input 
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discountPercentage">Discount % *</Label>
              <Input
                id="discountPercentage"
                name="discountPercentage"
                type="number"
                min="1"
                max="100"
                value={formData.discountPercentage}
                onChange={handleNumberChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="summer, flash-sale, etc."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="validUntil">Valid Until *</Label>
            <Input
              id="validUntil"
              name="validUntil"
              type="date"
              min={minDate}
              value={formData.validUntil}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex space-x-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isFeatured"
                checked={formData.isFeatured}
                onCheckedChange={(checked) => 
                  handleCheckboxChange("isFeatured", checked as boolean)
                }
              />
              <Label htmlFor="isFeatured">Featured Offer</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isLimited"
                checked={formData.isLimited}
                onCheckedChange={(checked) => 
                  handleCheckboxChange("isLimited", checked as boolean)
                }
              />
              <Label htmlFor="isLimited">Limited Time Offer</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Create Offer
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateOfferForm;
