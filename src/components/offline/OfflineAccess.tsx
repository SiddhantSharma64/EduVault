import React from 'react';
import { WifiOff, Download, FileText, Trash2, RefreshCw, Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface DownloadedResource {
  id: string;
  resourceId: string;
  title: string;
  downloadedAt: string;
  size: string;
  expiresAt: string;
}

interface OfflineAccessProps {
  downloadedResources: DownloadedResource[];
  storageUsed: string;
  storageLimit: string;
  autoSyncEnabled: boolean;
  onToggleAutoSync?: (enabled: boolean) => void;
  onDeleteResource?: (id: string) => void;
}

const OfflineAccess: React.FC<OfflineAccessProps> = ({
  downloadedResources,
  storageUsed,
  storageLimit,
  autoSyncEnabled,
  onToggleAutoSync,
  onDeleteResource
}) => {
  // Calculate storage percentage
  const storageUsedValue = parseInt(storageUsed.replace(/[^0-9.]/g, ''));
  const storageLimitValue = parseInt(storageLimit.replace(/[^0-9.]/g, ''));
  const storagePercentage = (storageUsedValue / storageLimitValue) * 100;
  
  const isStorageLow = storagePercentage > 80;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <WifiOff className="h-5 w-5 text-primary" />
          <CardTitle>Offline Access</CardTitle>
        </div>
        <CardDescription>
          Access your resources even without an internet connection
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-1">
            <div className="text-sm font-medium">Storage Used</div>
            <div className="text-sm text-muted-foreground">
              {storageUsed} of {storageLimit}
            </div>
          </div>
          <Progress value={storagePercentage} className={isStorageLow ? 'bg-red-200' : ''} />
          {isStorageLow && (
            <p className="text-xs text-red-500 mt-1">
              You're running low on offline storage space
            </p>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Auto-Sync Downloads</h3>
            <p className="text-xs text-muted-foreground">
              Automatically sync when online
            </p>
          </div>
          <Switch 
            checked={autoSyncEnabled} 
            onCheckedChange={(checked) => onToggleAutoSync && onToggleAutoSync(checked)}
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Downloaded Resources</h3>
            <Badge variant="outline" className="gap-1">
              <Database className="h-3.5 w-3.5 mr-1" />
              {downloadedResources.length} items
            </Badge>
          </div>
          
          <div className="space-y-3">
            {downloadedResources.map((resource) => (
              <div 
                key={resource.id}
                className="flex items-center justify-between p-3 rounded-md border"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium line-clamp-1">{resource.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{resource.size}</span>
                      <span>·</span>
                      <span>{resource.downloadedAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-50"
                    onClick={() => onDeleteResource && onDeleteResource(resource.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {downloadedResources.length === 0 && (
              <div className="text-center py-8 bg-muted/20 rounded-md">
                <WifiOff className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <h3 className="text-sm font-medium mb-1">No downloads yet</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Download resources to access them offline
                </p>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Browse Resources
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OfflineAccess; 