
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Users, Clock, ArrowUpRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const GrowthMetrics = () => {
  // Sample data - in a real app this would come from your Supabase database
  const userMetrics = {
    totalUsers: 2145,
    activeUsers: 1432,
    newUsers: 287,
    retentionRate: 76,
    growthRate: 24,
    averageSessionTime: "4m 32s",
  };
  
  const monthlyData = [
    { month: "Jan", users: 420 },
    { month: "Feb", users: 680 },
    { month: "Mar", users: 860 },
    { month: "Apr", users: 1020 },
    { month: "May", users: 1250 },
    { month: "Jun", users: 1480 },
    { month: "Jul", users: 1720 },
    { month: "Aug", users: 2145 },
  ];
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-launch-cyan">User Growth Dashboard</h1>
      <p className="text-launch-text-muted max-w-3xl">
        Track and analyze your user growth metrics to make data-driven decisions.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader className="pb-2">
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-3xl text-white">{userMetrics.totalUsers.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-400">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>24% increase</span>
              <span className="text-launch-text-muted ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader className="pb-2">
            <CardDescription>Active Users</CardDescription>
            <CardTitle className="text-3xl text-white">{userMetrics.activeUsers.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-400">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>18% increase</span>
              <span className="text-launch-text-muted ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader className="pb-2">
            <CardDescription>New Users (This Month)</CardDescription>
            <CardTitle className="text-3xl text-white">{userMetrics.newUsers.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-400">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>12% increase</span>
              <span className="text-launch-text-muted ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-launch-card-bg border-gray-800 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">User Growth Trend</CardTitle>
            <CardDescription>Monthly user acquisition</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {/* Chart would go here - using a placeholder */}
              <div className="w-full h-full bg-launch-dark rounded-md border border-gray-800 flex items-center justify-center">
                <div className="space-y-4 text-center">
                  <BarChart3 className="h-12 w-12 text-launch-cyan mx-auto" />
                  <p className="text-white">User Growth Chart</p>
                  <p className="text-launch-text-muted text-sm px-8">
                    In a real application, this would display a chart showing user growth over time.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Key Performance Metrics</CardTitle>
            <CardDescription>Current user engagement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Users className="h-4 w-4 text-launch-text-muted mr-2" />
                <span className="text-launch-text-muted">Retention Rate</span>
              </div>
              <span className="text-white font-medium">{userMetrics.retentionRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-launch-text-muted mr-2" />
                <span className="text-launch-text-muted">Growth Rate</span>
              </div>
              <span className="text-white font-medium">{userMetrics.growthRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-launch-text-muted mr-2" />
                <span className="text-launch-text-muted">Avg. Session Time</span>
              </div>
              <span className="text-white font-medium">{userMetrics.averageSessionTime}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Growth Strategies</CardTitle>
            <CardDescription>Recommendations to increase your user base</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-launch-dark rounded-md border border-gray-800">
              <div className="flex items-center gap-3">
                <div className="bg-launch-cyan/10 p-2 rounded-full">
                  <Zap className="h-5 w-5 text-launch-cyan" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Implement Referral Program</h3>
                  <p className="text-launch-text-muted text-sm mt-1">
                    Encourage existing users to invite friends with incentives for both parties.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-launch-dark rounded-md border border-gray-800">
              <div className="flex items-center gap-3">
                <div className="bg-launch-cyan/10 p-2 rounded-full">
                  <Zap className="h-5 w-5 text-launch-cyan" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Optimize Onboarding Flow</h3>
                  <p className="text-launch-text-muted text-sm mt-1">
                    Streamline the signup process and provide interactive tutorials for new users.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-launch-dark rounded-md border border-gray-800">
              <div className="flex items-center gap-3">
                <div className="bg-launch-cyan/10 p-2 rounded-full">
                  <Zap className="h-5 w-5 text-launch-cyan" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Re-engage Inactive Users</h3>
                  <p className="text-launch-text-muted text-sm mt-1">
                    Send targeted emails to dormant users highlighting new features and improvements.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Monthly Breakdown</CardTitle>
            <CardDescription>User acquisition by month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-16 text-launch-text-muted">{item.month}</div>
                  <div className="flex-1 h-2 bg-launch-dark rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-launch-cyan rounded-full" 
                      style={{ width: `${(item.users / monthlyData[monthlyData.length - 1].users) * 100}%` }}
                    ></div>
                  </div>
                  <div className="w-16 text-right text-white">{item.users}</div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Detailed Analytics</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default GrowthMetrics;
