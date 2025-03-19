import React, { useState } from 'react';
import { MessageSquare, Send, InfoIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface FeedbackFormProps {
  categories: string[];
  onSubmit?: (feedback: {
    category: string;
    subject: string;
    description: string;
  }) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  categories,
  onSubmit
}) => {
  const [category, setCategory] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !subject || !description) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit && onSubmit({ category, subject, description });
      setIsSubmitting(false);
      setIsSuccess(true);
      setCategory('');
      setSubject('');
      setDescription('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <CardTitle>Submit Feedback</CardTitle>
        </div>
        <CardDescription>
          Help us improve by sharing your thoughts and suggestions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Subject</label>
            <Input 
              placeholder="Brief summary of your feedback"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Description</label>
            <Textarea 
              placeholder="Please provide details of your feedback..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px]"
              required
            />
          </div>
          
          {isSuccess && (
            <div className="bg-green-500/10 text-green-600 rounded-md p-3 flex items-center">
              <InfoIcon className="h-4 w-4 mr-2" />
              <span className="text-sm">Thank you for your feedback!</span>
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || !category || !subject || !description}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            <Send className="h-4 w-4 ml-2" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm; 