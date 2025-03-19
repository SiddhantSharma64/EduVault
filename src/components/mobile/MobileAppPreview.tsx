import React from 'react';
import { motion } from 'framer-motion';
import { Apple, Download, Smartphone, Camera, Search, BookOpen, BellRing, WifiOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MobileAppPreviewProps {
  appVersion: string;
  platforms: string[];
  features: string[];
  downloadLinks: {
    ios: string;
    android: string;
  };
  screenshots: string[];
}

const MobileAppPreview: React.FC<MobileAppPreviewProps> = ({
  appVersion,
  platforms,
  features,
  downloadLinks,
  screenshots
}) => {
  const getFeatureIcon = (feature: string) => {
    if (feature.toLowerCase().includes('search')) return <Search className="h-4 w-4" />;
    if (feature.toLowerCase().includes('camera') || feature.toLowerCase().includes('scan')) return <Camera className="h-4 w-4" />;
    if (feature.toLowerCase().includes('notification')) return <BellRing className="h-4 w-4" />;
    if (feature.toLowerCase().includes('offline')) return <WifiOff className="h-4 w-4" />;
    return <BookOpen className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>EduVault Mobile</CardTitle>
              <CardDescription>Take your learning on the go</CardDescription>
            </div>
            <div className="flex space-x-2">
              {platforms.map((platform) => (
                <Badge key={platform} variant="outline">
                  {platform === 'iOS' ? (
                    <Apple className="h-3.5 w-3.5 mr-1" />
                  ) : (
                    <Smartphone className="h-3.5 w-3.5 mr-1" />
                  )}
                  {platform}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-bold mb-2">Download Our App</h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-md">
                    Access all your educational resources on the go with our mobile app.
                    Available for iOS and Android devices.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <Button
                      variant="default"
                      className="gap-2"
                      onClick={() => window.open(downloadLinks.ios, '_blank')}
                    >
                      <Apple className="h-5 w-5" />
                      App Store
                    </Button>
                    <Button
                      variant="default"
                      className="gap-2"
                      onClick={() => window.open(downloadLinks.android, '_blank')}
                    >
                      <Smartphone className="h-5 w-5" />
                      Google Play
                    </Button>
                  </div>
                </div>
                <div className="relative h-[240px] w-[120px] rounded-xl bg-black overflow-hidden">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <div className="relative h-full w-full overflow-hidden">
                      {screenshots.map((screenshot, index) => (
                        <motion.div
                          key={index}
                          className="absolute inset-0"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                          <div 
                            className="h-full w-full bg-cover bg-center"
                            style={{ 
                              backgroundImage: `url(https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1vYmlsZSUyMGFwcHxlbnwwfHwwfHx8MA%3D%3D)` 
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center p-3 rounded-lg border bg-background/50"
                  >
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      {getFeatureIcon(feature)}
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t pt-4 flex justify-between items-center">
              <div className="text-xs text-muted-foreground">
                Current Version: {appVersion}
              </div>
              <Download className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileAppPreview; 