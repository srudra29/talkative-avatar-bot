
import React from 'react';
import { Eye, EyeOff, Volume2, VolumeX, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface AccessibilityControlsProps {
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  fontSize: string;
  setFontSize: (size: string) => void;
  speechEnabled: boolean;
  setSpeechEnabled: (enabled: boolean) => void;
}

const AccessibilityControls: React.FC<AccessibilityControlsProps> = ({
  highContrast,
  setHighContrast,
  fontSize,
  setFontSize,
  speechEnabled,
  setSpeechEnabled
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" aria-label="Accessibility controls">
          <Eye className="w-4 h-4 mr-1" />
          Accessibility
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <Card className="p-4 border-0 shadow-none">
          <h3 className="font-semibold mb-4 text-sm">Accessibility Settings</h3>
          
          <div className="space-y-4">
            {/* High Contrast Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {highContrast ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <label htmlFor="high-contrast" className="text-sm font-medium">
                  High Contrast
                </label>
              </div>
              <Switch
                id="high-contrast"
                checked={highContrast}
                onCheckedChange={setHighContrast}
                aria-label="Toggle high contrast mode"
              />
            </div>

            {/* Speech Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <label htmlFor="speech-enabled" className="text-sm font-medium">
                  Voice Output
                </label>
              </div>
              <Switch
                id="speech-enabled"
                checked={speechEnabled}
                onCheckedChange={setSpeechEnabled}
                aria-label="Toggle voice output"
              />
            </div>

            {/* Font Size Selector */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Type className="w-4 h-4" />
                <label htmlFor="font-size" className="text-sm font-medium">
                  Font Size
                </label>
              </div>
              <Select value={fontSize} onValueChange={setFontSize}>
                <SelectTrigger className="w-24" id="font-size">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Keyboard shortcuts info */}
            <div className="pt-2 border-t">
              <h4 className="text-xs font-semibold mb-2 text-gray-600 dark:text-gray-400">
                Keyboard Shortcuts
              </h4>
              <div className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                <div>• Enter: Send message</div>
                <div>• Shift+Enter: New line</div>
                <div>• Tab: Navigate controls</div>
              </div>
            </div>
          </div>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default AccessibilityControls;
