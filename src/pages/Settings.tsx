
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, User, Bell, Lock, Globe, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useAuth } from '@/contexts/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-launch-cyan">Settings</h1>
      <p className="text-launch-text-muted max-w-3xl">
        Manage your account settings and preferences.
      </p>
      
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="bg-launch-card-bg border-gray-800 mb-6">
          <TabsTrigger value="account" className="data-[state=active]:bg-launch-cyan data-[state=active]:text-black">
            <User className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-launch-cyan data-[state=active]:text-black">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-launch-cyan data-[state=active]:text-black">
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-launch-cyan data-[state=active]:text-black">
            <Globe className="h-4 w-4 mr-2" />
            Appearance
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
                    defaultValue={user?.user_metadata?.name || ''} 
                    className="bg-launch-dark border-gray-800 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-launch-text-muted">Email</label>
                  <Input 
                    defaultValue={user?.email || ''} 
                    disabled 
                    className="bg-launch-dark border-gray-800 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-launch-text-muted">Bio</label>
                <textarea 
                  className="w-full bg-launch-dark border border-gray-800 rounded-md p-2 h-24 text-white resize-none focus:outline-none focus:ring-2 focus:ring-launch-cyan"
                  placeholder="Tell us about yourself"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-launch-cyan hover:bg-launch-cyan/80 text-black font-medium">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
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
        
        <TabsContent value="security">
          <Card className="bg-launch-card-bg border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-white font-medium">Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-launch-text-muted">Current Password</label>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="bg-launch-dark border-gray-800 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-launch-text-muted">New Password</label>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="bg-launch-dark border-gray-800 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-launch-text-muted">Confirm New Password</label>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="bg-launch-dark border-gray-800 text-white"
                    />
                  </div>
                </div>
                <Button className="bg-launch-cyan hover:bg-launch-cyan/80 text-black font-medium">
                  Update Password
                </Button>
              </div>
              
              <div className="pt-4 border-t border-gray-800 space-y-4">
                <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Enable 2FA</p>
                    <p className="text-launch-text-muted text-sm">Add an extra layer of security to your account</p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-800 space-y-4">
                <h3 className="text-white font-medium">Sessions</h3>
                <div className="p-4 bg-launch-dark rounded-md border border-gray-800">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white">Current Session</p>
                      <p className="text-launch-text-muted text-sm">Chrome on MacOS • Last active now</p>
                    </div>
                    <div className="text-green-400 text-sm">Active</div>
                  </div>
                </div>
                <Button variant="outline">Sign Out of All Devices</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card className="bg-launch-card-bg border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Appearance Settings</CardTitle>
              <CardDescription>Customize how the application looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-white font-medium">Theme</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border border-launch-cyan rounded-md p-4 cursor-pointer bg-launch-dark">
                    <div className="h-24 w-full bg-gradient-to-b from-launch-dark to-black rounded-md mb-2"></div>
                    <p className="text-white text-center">Dark (Default)</p>
                  </div>
                  <div className="border border-gray-800 rounded-md p-4 cursor-pointer">
                    <div className="h-24 w-full bg-gradient-to-b from-gray-100 to-white rounded-md mb-2"></div>
                    <p className="text-white text-center">Light</p>
                  </div>
                  <div className="border border-gray-800 rounded-md p-4 cursor-pointer">
                    <div className="h-24 w-full bg-gradient-to-b from-blue-900 to-purple-900 rounded-md mb-2"></div>
                    <p className="text-white text-center">Night</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-800 space-y-4">
                <h3 className="text-white font-medium">Accent Color</h3>
                <div className="flex flex-wrap gap-3">
                  {['#00C2FF', '#6366F1', '#10B981', '#F59E0B', '#EF4444', '#EC4899'].map((color, index) => (
                    <div 
                      key={index} 
                      className={`h-8 w-8 rounded-full cursor-pointer ${index === 0 ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900' : ''}`}
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-800 space-y-4">
                <h3 className="text-white font-medium">Font Size</h3>
                <div className="flex items-center space-x-4">
                  <span className="text-launch-text-muted text-sm">A</span>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    defaultValue="3" 
                    className="w-full h-2 bg-launch-dark rounded-lg appearance-none cursor-pointer accent-launch-cyan"
                  />
                  <span className="text-launch-text-muted text-base font-bold">A</span>
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
      </Tabs>
    </div>
  );
};

export default Settings;
