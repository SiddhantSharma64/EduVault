import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  Download, 
  History, 
  RotateCcw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export interface Version {
  id: string;
  versionNumber: string;
  uploadedBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  dateUploaded: string;
  changeDescription?: string;
  fileSize: string;
  downloads: number;
  isCurrent: boolean;
}

interface VersionControlProps {
  versions: Version[];
  onVersionDownload: (versionId: string) => void;
  onRestoreVersion?: (versionId: string) => void;
  maxShown?: number;
}

const VersionControl = ({ 
  versions, 
  onVersionDownload, 
  onRestoreVersion,
  maxShown = 3 
}: VersionControlProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Sort versions by date (newest first)
  const sortedVersions = [...versions].sort((a, b) => 
    a.isCurrent ? -1 : b.isCurrent ? 1 : 0
  );
  
  const displayVersions = isOpen 
    ? sortedVersions 
    : sortedVersions.slice(0, maxShown);
  
  const hasMoreVersions = sortedVersions.length > maxShown;
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Version History</CardTitle>
            <CardDescription>
              View and download previous versions of this resource
            </CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <History className="h-3 w-3" />
            {sortedVersions.length} versions
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
          <div className="version-timeline">
            {displayVersions.map((version) => (
              <div key={version.id} className="version-item pb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant={version.isCurrent ? "default" : "outline"} className="version-tag">
                        v{version.versionNumber}
                      </Badge>
                      {version.isCurrent && (
                        <Badge variant="secondary" className="text-xs">Current</Badge>
                      )}
                    </div>
                    
                    <div className="mt-2 flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={version.uploadedBy.avatar} alt={version.uploadedBy.name} />
                        <AvatarFallback>{version.uploadedBy.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{version.uploadedBy.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{version.dateUploaded}</span>
                      <span>•</span>
                      <span>{version.fileSize}</span>
                      <span>•</span>
                      <span>{version.downloads} downloads</span>
                    </div>
                    
                    {version.changeDescription && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {version.changeDescription}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8"
                      onClick={() => onVersionDownload(version.id)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    
                    {onRestoreVersion && !version.isCurrent && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8"
                        onClick={() => onRestoreVersion(version.id)}
                      >
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Restore
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {hasMoreVersions && (
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-2"
              >
                {isOpen ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-2" /> 
                    Show less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-2" /> 
                    Show all versions ({sortedVersions.length})
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
          )}
          
          <CollapsibleContent />
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default VersionControl; 