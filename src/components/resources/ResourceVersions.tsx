import React from 'react';
import { Clock, Download, History, FileUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface ResourceVersion {
  id: string;
  version: string;
  uploadedBy: string;
  uploadDate: string;
  changeDescription: string;
  downloadCount: number;
  fileSize: string;
}

interface ResourceVersionsProps {
  versions: ResourceVersion[];
}

const ResourceVersions: React.FC<ResourceVersionsProps> = ({ versions }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" /> Version History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {versions.map((version, index) => (
          <div key={version.id} className="border rounded-lg p-3 hover:border-primary/50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <Badge variant={index === 0 ? "default" : "secondary"}>
                  v{version.version}
                </Badge>
                {index === 0 && (
                  <Badge variant="outline" className="text-xs">Latest</Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Download this version">
                <Download className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-sm mb-2">{version.changeDescription}</p>
            
            <div className="text-xs text-muted-foreground space-y-1">
              <div className="flex items-center gap-2">
                <FileUp className="h-3 w-3" />
                <span>Uploaded by {version.uploadedBy}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                <span>{version.uploadDate}</span>
              </div>
              <div className="flex justify-between">
                <span>{version.fileSize}</span>
                <span>{version.downloadCount} downloads</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ResourceVersions; 