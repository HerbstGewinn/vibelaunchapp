import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, User, Bell, Save, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BillingSection from '@/components/settings/BillingSection';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const Settings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'account';
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: ''
  });

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('name, bio')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          name: data.name || '',
          bio: data.bio || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          bio: formData.bio,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  // Validate tab parameter on component mount
  useEffect(() => {
    const validTabs = ['account', 'notifications', 'billing'];
    if (!validTabs.includes(activeTab)) {
      setSearchParams({ tab: 'account' });
    }
  }, [activeTab, setSearchParams]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-launch-cyan">Settings</h1>
      <p className="text-launch-text-muted max-w-3xl">
        Manage your account settings and preferences.
      </p>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="bg-launch-card-bg border-gray-800 mb-6">
          <TabsTrigger value="account" className="data-[state=active]:bg-launch-cyan data-[state=active]:text-black">
            <User className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-launch-cyan data-[state=active]:text-black">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-launch-cyan data-[state=active]:text-black">
            <CreditCard className="h-4 w-4 mr-2" />
            Billing
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Card className="bg-launch-card-bg border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Account Information</CardTitle>
              <CardDescription>Manage your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-launch-text-muted">Name</label>
                  <Input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-launch-dark border-gray-800 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-launch-text-muted">Email</label>
                  <Input 
                    value={user?.email || ''} 
                    disabled 
                    className="bg-launch-dark border-gray-800 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-launch-text-muted">Bio</label>
                <textarea 
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full bg-launch-dark border border-gray-800 rounded-md p-2 h-24 text-white resize-none focus:outline-none focus:ring-2 focus:ring-launch-cyan"
                  placeholder="Tell us about yourself"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="bg-launch-cyan hover:bg-launch-cyan/80 text-black font-medium"
                onClick={handleSaveChanges}
                disabled={isLoading}
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="bg-launch-card-bg border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-white font-medium">Email Notifications</h3>
                <div className="space-y-3">
                  {[
                    { label: "Product updates", description: "Get notified about new features and improvements" },
                    { label: "Security alerts", description: "Receive alerts about security incidents and unusual activity" },
                    { label: "Newsletter", description: "Receive our monthly newsletter with tips and updates" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-white">{item.label}</p>
                        <p className="text-launch-text-muted text-sm">{item.description}</p>
                      </div>
                      <Switch />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-white font-medium">In-App Notifications</h3>
                <div className="space-y-3">
                  {[
                    { label: "Task reminders", description: "Get notified about upcoming and overdue tasks" },
                    { label: "Comments and mentions", description: "Receive notifications when someone mentions you" },
                    { label: "System notifications", description: "Important system alerts and messages" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-white">{item.label}</p>
                        <p className="text-launch-text-muted text-sm">{item.description}</p>
                      </div>
                      <Switch defaultChecked={index !== 2} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-launch-cyan hover:bg-launch-cyan/80 text-black font-medium">
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing">
          <BillingSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
