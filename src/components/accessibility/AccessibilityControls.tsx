import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Eye, 
  Moon, 
  Contrast, 
  Droplets, 
  PanelRight, 
  Volume2, 
  Languages, 
  RotateCcw,
  Plus,
  Minus
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface AccessibilityControlsProps {
  onFontSizeChange?: (size: number) => void;
  onContrastChange?: (isHighContrast: boolean) => void;
  onDarkModeChange?: (isDarkMode: boolean) => void;
  onTextToSpeechChange?: (isEnabled: boolean) => void;
  onLanguageChange?: (language: string) => void;
  onReset?: () => void;
}

const AccessibilityControls = ({
  onFontSizeChange,
  onContrastChange,
  onDarkModeChange,
  onTextToSpeechChange,
  onLanguageChange,
  onReset
}: AccessibilityControlsProps) => {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [textToSpeech, setTextToSpeech] = useState(false);
  const [language, setLanguage] = useState('en');
  
  // Font size controls
  const decreaseFontSize = () => {
    const newSize = Math.max(80, fontSize - 10);
    setFontSize(newSize);
    onFontSizeChange?.(newSize);
  };
  
  const increaseFontSize = () => {
    const newSize = Math.min(150, fontSize + 10);
    setFontSize(newSize);
    onFontSizeChange?.(newSize);
  };
  
  const handleFontSizeSlider = (value: number[]) => {
    const newSize = value[0];
    setFontSize(newSize);
    onFontSizeChange?.(newSize);
  };
  
  // Toggle high contrast
  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    onContrastChange?.(!highContrast);
  };
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    onDarkModeChange?.(!darkMode);
  };
  
  // Toggle text to speech
  const toggleTextToSpeech = () => {
    setTextToSpeech(!textToSpeech);
    onTextToSpeechChange?.(!textToSpeech);
  };
  
  // Language change
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    onLanguageChange?.(value);
  };
  
  // Reset all settings
  const resetSettings = () => {
    setFontSize(100);
    setHighContrast(false);
    setDarkMode(false);
    setTextToSpeech(false);
    setLanguage('en');
    onReset?.();
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accessibility Settings</CardTitle>
        <CardDescription>
          Customize your experience to meet your accessibility needs
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Font Size Controls */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Text Size
            </Label>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-7 w-7"
                onClick={decreaseFontSize}
                disabled={fontSize <= 80}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-10 text-center">{fontSize}%</span>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-7 w-7"
                onClick={increaseFontSize}
                disabled={fontSize >= 150}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          <Slider
            defaultValue={[100]}
            min={80}
            max={150}
            step={5}
            value={[fontSize]}
            onValueChange={handleFontSizeSlider}
          />
        </div>
        
        {/* High Contrast Mode */}
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium flex items-center gap-2">
            <Contrast className="h-4 w-4" />
            High Contrast
          </Label>
          <Switch 
            checked={highContrast} 
            onCheckedChange={toggleHighContrast} 
          />
        </div>
        
        {/* Dark Mode */}
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium flex items-center gap-2">
            <Moon className="h-4 w-4" />
            Dark Mode
          </Label>
          <Switch 
            checked={darkMode} 
            onCheckedChange={toggleDarkMode} 
          />
        </div>
        
        {/* Text to Speech */}
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            Text to Speech
          </Label>
          <Switch 
            checked={textToSpeech} 
            onCheckedChange={toggleTextToSpeech} 
          />
        </div>
        
        {/* Language Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium flex items-center gap-2">
            <Languages className="h-4 w-4" />
            Interface Language
          </Label>
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
              <SelectItem value="zh">中文</SelectItem>
              <SelectItem value="ja">日本語</SelectItem>
              <SelectItem value="ko">한국어</SelectItem>
              <SelectItem value="ar">العربية</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Reset Button */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={resetSettings}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Default Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default AccessibilityControls; 