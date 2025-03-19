import React, { useState } from 'react';
import { Search, Mic, X, Filter, Clock, Bookmark } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from '@/components/ui/collapsible';

interface AdvancedSearchProps {
  recentSearches: string[];
  popularFilters: string[];
  sampleVoiceSearch?: {
    transcript: string;
    confidence: number;
    results: number;
  };
  onSearch?: (query: string, filters: string[]) => void;
  onVoiceSearch?: () => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  recentSearches,
  popularFilters,
  sampleVoiceSearch,
  onSearch,
  onVoiceSearch
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch && onSearch(searchQuery, selectedFilters);
    }
  };
  
  const handleVoiceSearch = () => {
    setIsListening(true);
    
    // Simulate voice search
    setTimeout(() => {
      if (sampleVoiceSearch) {
        setSearchQuery(sampleVoiceSearch.transcript);
      }
      setIsListening(false);
      
      // Automatically search after voice input
      setTimeout(() => {
        onSearch && onSearch(sampleVoiceSearch?.transcript || '', selectedFilters);
      }, 500);
    }, 2000);
    
    onVoiceSearch && onVoiceSearch();
  };
  
  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };
  
  const handleRecentSearch = (query: string) => {
    setSearchQuery(query);
    onSearch && onSearch(query, selectedFilters);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Advanced Search</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSearch} className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10 pr-10"
              placeholder="Search for resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
          
          <Button type="button" size="icon" variant="outline" onClick={handleVoiceSearch} disabled={isListening}>
            {isListening ? (
              <div className="h-4 w-4 rounded-full bg-primary animate-pulse" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>
          
          <Button type="button" size="icon" variant={isFilterOpen ? "default" : "outline"} onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <Filter className="h-4 w-4" />
          </Button>
          
          <Button type="submit">Search</Button>
        </form>
        
        {isListening && (
          <div className="bg-muted/50 p-3 rounded-md text-center animate-pulse">
            Listening...
          </div>
        )}
        
        {selectedFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map(filter => (
              <Badge key={filter} variant="secondary" className="gap-1">
                {filter}
                <button onClick={() => toggleFilter(filter)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {selectedFilters.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 text-xs px-2"
                onClick={() => setSelectedFilters([])}
              >
                Clear all
              </Button>
            )}
          </div>
        )}
        
        <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <CollapsibleContent className="space-y-4">
            <div className="border rounded-md p-4 space-y-3">
              <h3 className="text-sm font-medium mb-2">Filter Results</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {popularFilters.map((filter) => (
                  <div key={filter} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`filter-${filter}`}
                      checked={selectedFilters.includes(filter)}
                      onCheckedChange={() => toggleFilter(filter)}
                    />
                    <label 
                      htmlFor={`filter-${filter}`}
                      className="text-sm cursor-pointer"
                    >
                      {filter}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        {recentSearches.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Recent Searches</h3>
              <Button variant="ghost" size="sm" className="h-6 text-xs">Clear</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <Badge 
                  key={index} 
                  variant="outline"
                  className="cursor-pointer flex items-center"
                  onClick={() => handleRecentSearch(search)}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  {search}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {sampleVoiceSearch && (
          <div className="text-xs text-muted-foreground italic">
            Try saying: "{sampleVoiceSearch.transcript}"
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdvancedSearch; 