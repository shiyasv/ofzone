import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreateOfferForm from "@/components/CreateOfferForm";
import { getOffers, deleteOffer, Offer, getCategories, deleteCategory, updateCategory, Category } from "@/utils/offerData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CategoryForm from "@/components/CategoryForm";
import { Package, Gift, Link, Instagram, Edit, Trash2, Users, Heading2, Zap, TrendingUp, Plus, X } from "lucide-react";
import { getVisitorCount } from "@/utils/visitorCounter";

const Admin = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [instagramLink, setInstagramLink] = useState(localStorage.getItem('instagram_link') || '');
  const [appLink, setAppLink] = useState(localStorage.getItem('app_link') || '');
  const [googleAdsId, setGoogleAdsId] = useState(localStorage.getItem('google_ads_id') || '');
  const [googleAdScript, setGoogleAdScript] = useState(localStorage.getItem('google_ad_script') || '');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editName, setEditName] = useState('');
  const [editIcon, setEditIcon] = useState('');
  const [visitorCount, setVisitorCount] = useState(0);
  const [mainHeading, setMainHeading] = useState(localStorage.getItem('main_heading') || 'Trending Deals');
  const [customHeadings, setCustomHeadings] = useState<string[]>(() => {
    const saved = localStorage.getItem('custom_headings');
    return saved ? JSON.parse(saved) : [];
  });
  const [newHeading, setNewHeading] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Load offers, categories and visitor count
  useEffect(() => {
    setOffers(getOffers());
    setCategories(getCategories());
    setVisitorCount(getVisitorCount());
  }, []);

  const handleDeleteOffer = (id: string) => {
    if (deleteOffer(id)) {
      setOffers(getOffers());
      toast({
        title: "Success",
        description: "Offer has been deleted successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete offer",
        variant: "destructive",
      });
    }
  };

  const handleOfferAdded = () => {
    setOffers(getOffers());
  };

  const handleCategoryAdded = () => {
    setCategories(getCategories());
  };

  const handleDeleteCategory = (id: string) => {
    if (deleteCategory(id)) {
      setCategories(getCategories());
      toast({
        title: "Success",
        description: "Category has been deleted successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setEditName(category.name);
    setEditIcon(category.icon);
  };

  const handleSaveCategory = () => {
    if (editingCategory) {
      if (updateCategory(editingCategory.id, { name: editName, icon: editIcon })) {
        setCategories(getCategories());
        toast({
          title: "Success",
          description: "Category has been updated successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to update category",
          variant: "destructive",
        });
      }
      setEditingCategory(null);
    }
  };

  const handleSaveSocialLinks = () => {
    localStorage.setItem('instagram_link', instagramLink);
    localStorage.setItem('app_link', appLink);
    toast({
      title: "Links Saved",
      description: "Social links have been updated successfully",
    });
  };

  const handleSaveGoogleAds = () => {
    localStorage.setItem('google_ads_id', googleAdsId);
    localStorage.setItem('google_ad_script', googleAdScript);
    toast({
      title: "Google Ads Settings Saved",
      description: "Google Ads settings have been updated successfully",
    });
  };

  const handleSaveHeadings = () => {
    localStorage.setItem('main_heading', mainHeading);
    localStorage.setItem('custom_headings', JSON.stringify(customHeadings));
    toast({
      title: "Headings Saved",
      description: "Custom headings have been updated successfully",
    });
  };

  const handleAddCustomHeading = () => {
    if (newHeading.trim() && !customHeadings.includes(newHeading.trim())) {
      setCustomHeadings([...customHeadings, newHeading.trim()]);
      setNewHeading('');
      toast({
        title: "Heading Added",
        description: "Custom heading has been added successfully",
      });
    }
  };

  const handleRemoveCustomHeading = (headingToRemove: string) => {
    setCustomHeadings(customHeadings.filter(heading => heading !== headingToRemove));
    toast({
      title: "Heading Removed",
      description: "Custom heading has been removed successfully",
    });
  };

  const setPresetHeading = (heading: string) => {
    setMainHeading(heading);
  };

  const emojiOptions = ["💻", "👕", "🍴", "✈️", "✨", "🏠", "💼", "📱", "🎮", "🎁", "🚗", "📚", "💳", "⛽"];

  if (!isAuthenticated) {
    return null; // Prevent rendering if not authenticated
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        isAuthenticated={isAuthenticated}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogoutClick={logout}
      />

      <main className="flex-grow container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your offers, categories, and settings
          </p>
          <div className="mt-2 inline-flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-md">
            <span className="text-blue-600 font-medium">Logged in as:</span>
            <span>{user?.email}</span>
          </div>
          <div className="mt-2 inline-flex items-center gap-2 bg-green-50 px-3 py-1 rounded-md ml-2">
            <Users className="h-4 w-4 text-green-600" />
            <span className="text-green-600 font-medium">Visitors:</span>
            <span className="text-green-600">{visitorCount}</span>
          </div>
        </div>

        <Tabs defaultValue="offers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="offers" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              <span>Offers</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span>Categories</span>
            </TabsTrigger>
            <TabsTrigger value="headings" className="flex items-center gap-2">
              <Heading2 className="h-4 w-4" />
              <span>Headings</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              <span>Social Links</span>
            </TabsTrigger>
            <TabsTrigger value="google-ads" className="flex items-center gap-2">
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z"></path>
                <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
              </svg>
              <span>Google Ads</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Offers Tab */}
          <TabsContent value="offers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Offer</CardTitle>
                <CardDescription>
                  Add a new offer or discount to your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CreateOfferForm onOfferAdded={handleOfferAdded} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manage Existing Offers</CardTitle>
                <CardDescription>
                  View and manage all your current offers and discounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {offers.map((offer) => (
                    <div
                      key={offer.id}
                      className="p-4 border rounded-lg flex justify-between items-start"
                    >
                      <div>
                        <h3 className="font-medium">{offer.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {offer.discountPercentage}% off - Valid until{" "}
                          {new Date(offer.validUntil).toLocaleDateString()}
                        </p>
                        <p className="text-sm mt-1">{offer.description}</p>
                        <p className="text-sm mt-1 text-blue-600">
                          Deal URL: {offer.dealUrl || "Not set"}
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteOffer(offer.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
                {offers.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No offers available. Create your first offer above.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Category</CardTitle>
                <CardDescription>
                  Create new product categories for your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CategoryForm onCategoryAdded={handleCategoryAdded} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manage Categories</CardTitle>
                <CardDescription>
                  Add, edit or remove product categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className={`p-4 border rounded-lg ${
                        editingCategory?.id === category.id ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                    >
                      {editingCategory?.id === category.id ? (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`edit-name-${category.id}`}>Name</Label>
                            <Input
                              id={`edit-name-${category.id}`}
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`edit-icon-${category.id}`}>Icon</Label>
                            <div className="flex flex-wrap gap-2">
                              {emojiOptions.map((emoji) => (
                                <Button
                                  key={emoji}
                                  type="button"
                                  variant={editIcon === emoji ? "default" : "outline"}
                                  className="w-10 h-10 p-0 text-xl"
                                  onClick={() => setEditIcon(emoji)}
                                >
                                  {emoji}
                                </Button>
                              ))}
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              onClick={() => setEditingCategory(null)}
                            >
                              Cancel
                            </Button>
                            <Button onClick={handleSaveCategory}>
                              Save
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex items-center justify-center bg-blue-100 rounded-full mr-4 text-2xl">
                            {category.icon}
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-medium">{category.name}</h3>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditCategory(category)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteCategory(category.id)}
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {categories.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No categories available. Create your first category above.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Headings Tab */}
          <TabsContent value="headings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customize Headings</CardTitle>
                <CardDescription>
                  Customize headings displayed on your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="main-heading">
                      <div className="flex items-center gap-2">
                        <Heading2 className="h-4 w-4" />
                        <span>Main Offers Heading</span>
                      </div>
                    </Label>
                    <Input
                      id="main-heading"
                      placeholder="e.g., Trending Deals"
                      value={mainHeading}
                      onChange={(e) => setMainHeading(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      This heading will be displayed above the main offers section
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Quick Presets</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2 justify-start" 
                        onClick={() => setPresetHeading("Trending Deals")}
                      >
                        <TrendingUp className="h-4 w-4" />
                        <span>Trending Deals</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2 justify-start" 
                        onClick={() => setPresetHeading("Flash Sale Friday")}
                      >
                        <Zap className="h-4 w-4" />
                        <span>Flash Sale Friday</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2 justify-start" 
                        onClick={() => setPresetHeading("Limited Time Offers")}
                      >
                        <svg 
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>Limited Time Offers</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2 justify-start" 
                        onClick={() => setPresetHeading("Today's Best Deals")}
                      >
                        <svg 
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        <span>Today's Best Deals</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2 justify-start" 
                        onClick={() => setPresetHeading("Hot Deals")}
                      >
                        <svg 
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                        </svg>
                        <span>Hot Deals</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2 justify-start" 
                        onClick={() => setPresetHeading("Clearance Sale")}
                      >
                        <svg 
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <line x1="9" y1="15" x2="15" y2="9" />
                        </svg>
                        <span>Clearance Sale</span>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Add Custom Heading</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter custom heading..."
                        value={newHeading}
                        onChange={(e) => setNewHeading(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddCustomHeading();
                          }
                        }}
                      />
                      <Button 
                        onClick={handleAddCustomHeading}
                        disabled={!newHeading.trim()}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add</span>
                      </Button>
                    </div>
                  </div>

                  {customHeadings.length > 0 && (
                    <div className="space-y-4">
                      <Label>Your Custom Headings</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {customHeadings.map((heading, index) => (
                          <div 
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
                          >
                            <span 
                              className="cursor-pointer hover:text-blue-600 flex-grow"
                              onClick={() => setMainHeading(heading)}
                            >
                              {heading}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveCustomHeading(heading)}
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Click on any custom heading to use it as your main heading
                      </p>
                    </div>
                  )}
                  
                  <Button onClick={handleSaveHeadings} className="mt-4">
                    Save Headings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Links Tab */}
          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
                <CardDescription>
                  Manage your social media and application links
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagram">
                      <div className="flex items-center gap-2">
                        <Instagram className="h-4 w-4" />
                        <span>Instagram Link</span>
                      </div>
                    </Label>
                    <Input
                      id="instagram"
                      placeholder="https://instagram.com/yourprofile"
                      value={instagramLink}
                      onChange={(e) => setInstagramLink(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="app">
                      <div className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                          <circle cx="12" cy="18" r="1" />
                        </svg>
                        <span>Mobile App Link</span>
                      </div>
                    </Label>
                    <Input
                      id="app"
                      placeholder="https://play.google.com/store/apps/your-app"
                      value={appLink}
                      onChange={(e) => setAppLink(e.target.value)}
                    />
                  </div>
                  
                  <Button onClick={handleSaveSocialLinks} className="mt-4">
                    Save Links
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Google Ads Tab */}
          <TabsContent value="google-ads" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Google Ads Settings</CardTitle>
                <CardDescription>
                  Configure your Google Ads tracking and display settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="google-ads-id">Google Ads ID</Label>
                    <Input
                      id="google-ads-id"
                      placeholder="e.g., AW-123456789"
                      value={googleAdsId}
                      onChange={(e) => setGoogleAdsId(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      Your Google Ads tracking ID, usually starts with "AW-"
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="google-ad-script">Custom Ad Script</Label>
                    <Textarea
                      id="google-ad-script"
                      placeholder="<script>// Your custom Google Ads script here</script>"
                      value={googleAdScript}
                      onChange={(e) => setGoogleAdScript(e.target.value)}
                      rows={6}
                    />
                    <p className="text-sm text-muted-foreground">
                      Optional: Add any custom Google Ads script for advanced tracking or conversion
                    </p>
                  </div>
                  
                  <Button onClick={handleSaveGoogleAds} className="mt-4">
                    Save Google Ads Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
                <CardDescription>
                  Manage your account and application settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Settings management will be implemented in a future update.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
