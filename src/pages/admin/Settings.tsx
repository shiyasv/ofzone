import React, { useState } from 'react';
import { 
  Save, 
  Layout, 
  Bell, 
  Sliders, 
  Shield, 
  Mail, 
  Image as ImageIcon,
  Check
} from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaved, setIsSaved] = useState(false);
  
  // Mock site settings
  const [siteSettings, setSiteSettings] = useState({
    siteName: 'OffZone',
    siteTagline: 'Discover the Best Deals and Discounts',
    emailAddress: 'admin@offzone.com',
    itemsPerPage: 12,
    enableNewsletter: true,
    showFeaturedOffers: true,
    enableNotifications: true,
    darkMode: false
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setSiteSettings({
      ...siteSettings,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show saved message
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    
    // Here you would normally save the settings to a database
    console.log('Settings saved:', siteSettings);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Settings</h1>
        
        {/* Save notification */}
        {isSaved && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md flex items-center animate-fade-in">
            <Check size={18} className="mr-2" />
            Settings saved successfully
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b overflow-x-auto">
          <button
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'general' 
                ? 'border-b-2 border-primary-600 text-primary-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('general')}
          >
            <Layout size={16} className="inline-block mr-2" />
            General
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'appearance' 
                ? 'border-b-2 border-primary-600 text-primary-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('appearance')}
          >
            <ImageIcon size={16} className="inline-block mr-2" />
            Appearance
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'notifications' 
                ? 'border-b-2 border-primary-600 text-primary-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={16} className="inline-block mr-2" />
            Notifications
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'advanced' 
                ? 'border-b-2 border-primary-600 text-primary-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('advanced')}
          >
            <Sliders size={16} className="inline-block mr-2" />
            Advanced
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'security' 
                ? 'border-b-2 border-primary-600 text-primary-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('security')}
          >
            <Shield size={16} className="inline-block mr-2" />
            Security
          </button>
        </div>
        
        {/* Settings content */}
        <form onSubmit={handleSave}>
          <div className="p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">General Settings</h2>
                  <p className="text-sm text-gray-500 mb-6">
                    These settings control the general aspects of your OffZone website.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="siteName" className="label">
                      Site Name
                    </label>
                    <input
                      type="text"
                      id="siteName"
                      name="siteName"
                      className="input"
                      value={siteSettings.siteName}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="siteTagline" className="label">
                      Site Tagline
                    </label>
                    <input
                      type="text"
                      id="siteTagline"
                      name="siteTagline"
                      className="input"
                      value={siteSettings.siteTagline}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="emailAddress" className="label">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        id="emailAddress"
                        name="emailAddress"
                        className="input pl-10"
                        value={siteSettings.emailAddress}
                        onChange={handleChange}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      This address will be used for admin notifications
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="itemsPerPage" className="label">
                      Items Per Page
                    </label>
                    <select
                      id="itemsPerPage"
                      name="itemsPerPage"
                      className="input"
                      value={siteSettings.itemsPerPage}
                      onChange={handleChange}
                    >
                      <option value="8">8 items</option>
                      <option value="12">12 items</option>
                      <option value="16">16 items</option>
                      <option value="24">24 items</option>
                      <option value="36">36 items</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Number of offers to display per page
                    </p>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Features</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="enableNewsletter"
                        name="enableNewsletter"
                        checked={siteSettings.enableNewsletter}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="enableNewsletter" className="ml-2 text-sm text-gray-700">
                        Enable newsletter signup
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="showFeaturedOffers"
                        name="showFeaturedOffers"
                        checked={siteSettings.showFeaturedOffers}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="showFeaturedOffers" className="ml-2 text-sm text-gray-700">
                        Show featured offers on homepage
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Appearance Settings</h2>
                  <p className="text-sm text-gray-500 mb-6">
                    Customize the look and feel of your OffZone website.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label">Theme Mode</label>
                    <div className="mt-2 space-y-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="lightMode"
                          name="darkMode"
                          value="false"
                          checked={!siteSettings.darkMode}
                          onChange={() => setSiteSettings({...siteSettings, darkMode: false})}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <label htmlFor="lightMode" className="ml-2 text-sm text-gray-700">
                          Light Mode
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="darkMode"
                          name="darkMode"
                          value="true"
                          checked={siteSettings.darkMode}
                          onChange={() => setSiteSettings({...siteSettings, darkMode: true})}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <label htmlFor="darkMode" className="ml-2 text-sm text-gray-700">
                          Dark Mode
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="label">Logo</label>
                    <div className="mt-2 flex items-center">
                      <div className="h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-600">O</span>
                      </div>
                      <button
                        type="button"
                        className="ml-4 btn btn-secondary text-sm"
                      >
                        Change Logo
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Colors</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="primaryColor" className="label">Primary Color</label>
                      <div className="flex">
                        <input
                          type="color"
                          id="primaryColor"
                          name="primaryColor"
                          value="#3366FF"
                          className="h-9 w-9 rounded-l-md border border-gray-300"
                        />
                        <input
                          type="text"
                          value="#3366FF"
                          className="rounded-r-md border border-l-0 border-gray-300 flex-1 px-3 py-1.5"
                          readOnly
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="accentColor" className="label">Accent Color</label>
                      <div className="flex">
                        <input
                          type="color"
                          id="accentColor"
                          name="accentColor"
                          value="#FF6633"
                          className="h-9 w-9 rounded-l-md border border-gray-300"
                        />
                        <input
                          type="text"
                          value="#FF6633"
                          className="rounded-r-md border border-l-0 border-gray-300 flex-1 px-3 py-1.5"
                          readOnly
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="backgroundColor" className="label">Background</label>
                      <div className="flex">
                        <input
                          type="color"
                          id="backgroundColor"
                          name="backgroundColor"
                          value="#F9FAFB"
                          className="h-9 w-9 rounded-l-md border border-gray-300"
                        />
                        <input
                          type="text"
                          value="#F9FAFB"
                          className="rounded-r-md border border-l-0 border-gray-300 flex-1 px-3 py-1.5"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h2>
                  <p className="text-sm text-gray-500 mb-6">
                    Control which notifications you receive and how they are delivered.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Receive email notifications for important updates
                      </p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="enableNotifications"
                        name="enableNotifications"
                        checked={siteSettings.enableNotifications}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">New Offer Notifications</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Receive notifications when new offers are added
                      </p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={true}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Comment Notifications</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Receive notifications for new comments
                      </p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={true}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Marketing Updates</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Receive updates about OffZone features and news
                      </p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={false}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Advanced Settings */}
            {activeTab === 'advanced' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Advanced Settings</h2>
                  <p className="text-sm text-gray-500 mb-6">
                    Configure advanced settings for your OffZone website.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="cacheTimeout" className="label">
                      Cache Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      id="cacheTimeout"
                      name="cacheTimeout"
                      min="0"
                      max="1440"
                      defaultValue="60"
                      className="input"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Set to 0 to disable caching
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="apiKey" className="label">
                      API Key
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="apiKey"
                        name="apiKey"
                        defaultValue="sk_live_51MzT6fGs7SKt7hTyWIX2VzN1KYjQJKO"
                        className="input pr-20"
                        readOnly
                      />
                      <button
                        type="button"
                        className="absolute right-1 top-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                      >
                        Regenerate
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Used for API access to your OffZone data
                    </p>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Import/Export</h3>
                  
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      className="btn btn-secondary text-sm"
                    >
                      Export Data
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary text-sm"
                    >
                      Import Data
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h2>
                  <p className="text-sm text-gray-500 mb-6">
                    Configure security settings for your OffZone website.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="currentPassword" className="label">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      className="input"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="md:pt-7 md:pb-1">
                    <p className="text-xs text-gray-500">
                      Enter your current password to make changes to security settings
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="newPassword" className="label">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      className="input"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="label">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="input"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700">
                      Two-factor authentication adds an extra layer of security to your account.
                    </p>
                    <button
                      type="button"
                      className="btn btn-secondary text-sm flex items-center mt-2"
                    >
                      <Shield size={16} className="mr-2" />
                      Enable Two-Factor Authentication
                    </button>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-sm font-medium text-red-600 mb-4">Danger Zone</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Delete All Data</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Permanently delete all offers, categories, and settings
                        </p>
                      </div>
                      <button
                        type="button"
                        className="px-3 py-1.5 bg-white text-red-600 text-sm border border-red-300 rounded hover:bg-red-50"
                      >
                        Delete Data
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Reset to Default</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Reset all settings to their default values
                        </p>
                      </div>
                      <button
                        type="button"
                        className="px-3 py-1.5 bg-white text-gray-700 text-sm border border-gray-300 rounded hover:bg-gray-50"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
            <button
              type="button"
              className="btn btn-secondary mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex items-center"
            >
              <Save size={18} className="mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;