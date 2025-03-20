import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Upload, X, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface UploadModalProps {
  buttonText?: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
  buttonClassName?: string;
  buttonSize?: "default" | "sm" | "lg" | "icon" | null | undefined;
  showIcon?: boolean;
}

const UploadModal: React.FC<UploadModalProps> = ({
  buttonText = "Upload Resource",
  buttonVariant = "default",
  buttonClassName = "rounded-full shadow-button button-hover",
  buttonSize = "lg",
  showIcon = true
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  });
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      category: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.title || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate upload
    setIsUploading(true);
    
    setTimeout(() => {
      setIsUploading(false);
      setOpen(false);
      
      toast({
        title: "Success",
        description: "Your resource has been uploaded",
        variant: "default",
      });
      
      // Reset form
      setSelectedFile(null);
      setFormData({
        title: '',
        description: '',
        category: '',
      });
    }, 2000);
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <>
      <Button 
        variant={buttonVariant}
        className={buttonClassName}
        size={buttonSize}
        onClick={() => setOpen(true)}
        type="button"
      >
        {showIcon && <Upload className="mr-2 h-4 w-4" />}
        {buttonText}
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[525px] p-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <DialogHeader className="px-6 pt-6 pb-4">
              <DialogTitle className="text-xl">Upload a New Resource</DialogTitle>
              <DialogDescription>
                Share your notes, papers, or study materials with other students.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 px-6">
              <div className="space-y-2">
                <Label htmlFor="file" className="text-sm font-medium">
                  File
                </Label>
                
                {!selectedFile ? (
                  <div className="border border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:bg-secondary/50 transition-colors">
                    <Input
                      id="file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="file" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, DOC, PPT, or TXT (max. 20MB)
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-md">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={removeFile}
                      className="rounded-full h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Calculus I - Final Exam Study Guide"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="rounded-md"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Briefly describe this resource..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="rounded-md min-h-24"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select 
                  onValueChange={handleSelectChange}
                  value={formData.category}
                  required
                >
                  <SelectTrigger id="category" className="rounded-md">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                    <SelectItem value="Psychology">Psychology</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Literature">Literature</SelectItem>
                    <SelectItem value="Economics">Economics</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter className="py-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setOpen(false)}
                  className="rounded-full"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="rounded-full"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Uploading...
                    </>
                  ) : (
                    "Upload Resource"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadModal; 