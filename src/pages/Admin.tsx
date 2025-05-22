
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
import { Package, Gift, Link, Instagram, Edit, Trash2 } from "lucide-react";

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

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Load offers and categories
  useEffect(() => {
    setOffers(getOffers());
    setCategories(getCategories());
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

  const emojiOptions = ["💻", "👕", "🍴", "✈️", "✨", "🏠", "💼", "📱", "🎮", "🎁", "🚗", "📚"];

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
        </div>

        <Tabs defaultValue="offers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="offers" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              <span>Offers</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span>Categories</span>
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
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
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
