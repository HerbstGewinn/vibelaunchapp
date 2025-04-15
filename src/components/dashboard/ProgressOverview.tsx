
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProgressOverview = () => {
  return (
    <Card className="bg-launch-card-bg border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Overall Progress</CardTitle>
        <p className="text-launch-text-muted">Total completion: 65%</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Total Progress</span>
            <span>65%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full">
            <div 
              className="h-full bg-launch-cyan rounded-full" 
              style={{ width: '65%' }} 
            />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
          <div className="space-y-3">
            {/* Activity items */}
            <div className="flex justify-between text-sm">
              <span>Completed domain setup</span>
              <span className="text-launch-text-muted">2 days ago</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Added Google Analytics</span>
              <span className="text-launch-text-muted">3 days ago</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Updated meta tags</span>
              <span className="text-launch-text-muted">5 days ago</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressOverview;
