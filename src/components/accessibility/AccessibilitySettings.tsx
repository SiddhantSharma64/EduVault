import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const AccessibilitySettings = () => {
  const [fontSize, setFontSize] = useState(100);
  const [contrast, setContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [textToSpeech, setTextToSpeech] = useState(false);
  const [language, setLanguage] = useState('english');

  const handleReset = () => {
    setFontSize(100);
    setContrast(false);
    setReduceMotion(false);
    setDarkMode(false);
    setTextToSpeech(false);
    setLanguage('english');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accessibility Settings</CardTitle>
        <CardDescription>Customize your experience for better accessibility</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="font-size">Font Size ({fontSize}%)</Label>
            <Button variant="outline" size="sm" onClick={() => setFontSize(100)}>
              Reset
            </Button>
          </div>
          <Slider
            id="font-size"
            min={75}
            max={200}
            step={5}
            value={[fontSize]}
            onValueChange={(value) => setFontSize(value[0])}
            className="w-full"
          />
        </div>

        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="high-contrast">High Contrast</Label>
            <Switch
              id="high-contrast"
              checked={contrast}
              onCheckedChange={setContrast}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="reduce-motion">Reduce Motion</Label>
            <Switch
              id="reduce-motion"
              checked={reduceMotion}
              onCheckedChange={setReduceMotion}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="text-to-speech">Screen Reader Support</Label>
            <Switch
              id="text-to-speech"
              checked={textToSpeech}
              onCheckedChange={setTextToSpeech}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Español</SelectItem>
              <SelectItem value="french">Français</SelectItem>
              <SelectItem value="german">Deutsch</SelectItem>
              <SelectItem value="chinese">中文</SelectItem>
              <SelectItem value="japanese">日本語</SelectItem>
              <SelectItem value="arabic">العربية</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleReset}>
          Reset All
        </Button>
        <Button>Save Settings</Button>
      </CardFooter>
    </Card>
  );
};

export default AccessibilitySettings; 