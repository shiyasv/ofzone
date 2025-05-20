
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { addOffer } from "@/utils/offerData";

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
  });

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
      });
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
