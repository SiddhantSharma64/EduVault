import React from 'react';
import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EncryptionStatusProps {
  enabled: boolean;
  algorithm: string;
  lastUpdated: string;
}

const EncryptionStatus: React.FC<EncryptionStatusProps> = ({
  enabled,
  algorithm,
  lastUpdated
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Data Encryption</CardTitle>
          {enabled ? (
            <Badge variant="default" className="bg-green-600">Enabled</Badge>
          ) : (
            <Badge variant="destructive">Disabled</Badge>
          )}
        </div>
        <CardDescription>End-to-end encryption protects your data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-3">
            {enabled ? (
              <ShieldCheck className="h-10 w-10 text-green-600" />
            ) : (
              <ShieldAlert className="h-10 w-10 text-red-600" />
            )}
            <div>
              {enabled ? (
                <p className="text-sm font-medium">Your data is secured with encryption</p>
              ) : (
                <p className="text-sm font-medium">Your data is not encrypted</p>
              )}
              <p className="text-xs text-muted-foreground">
                {enabled 
                  ? `Using ${algorithm} encryption standard` 
                  : 'Enable encryption to secure your data'}
              </p>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Security Status</p>
                <p className="text-xs text-muted-foreground">Last updated: {lastUpdated}</p>
              </div>
              {enabled && (
                <Shield className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EncryptionStatus; 