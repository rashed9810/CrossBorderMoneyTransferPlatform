import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const DangerAlert = () => {
  return (
    <div className="relative">
     
      <div className="absolute inset-0 bg-red-500/10 animate-pulse rounded-[10px]" />
      
      <Alert 
        variant="destructive" 
        className="mt-4 mb-2 border border-red-500 bg-red-50 rounded-[10px] relative"
      >
        <AlertTriangle className="h-4 w-4 text-red-500" />
        <AlertTitle className="text-red-500 text-xs xl:text-sm">
          Insufficient Balance
        </AlertTitle>
        <AlertDescription className="mt-1 text-xs">
          Your Main wallet &quot;Primary Wallet&quot; has no balance available.
          <div className="mt-2">
            <p className="font-medium">Please take one of the following actions:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Select a different wallet</li>
              <li>Add funds to continue</li>
            </ul>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default DangerAlert;