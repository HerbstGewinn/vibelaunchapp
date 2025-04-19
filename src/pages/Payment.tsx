import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTaskProgress } from '@/hooks/useTaskProgress';

const Payment = () => {
  const navigate = useNavigate();
  const { toggleTaskComplete } = useTaskProgress();

  const handleTaskComplete = () => {
    toggleTaskComplete(
      'setup_payment', 
      true, 
      'payment',
      'Configure payment processing system' // Add task name
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold mb-4">Payment Configuration</h1>
      <p className="text-gray-500 mb-6">
        Configure your payment processing system to start accepting payments.
      </p>
      <Button onClick={handleTaskComplete}>Mark Payment Setup as Complete</Button>
    </div>
  );
};

export default Payment;
