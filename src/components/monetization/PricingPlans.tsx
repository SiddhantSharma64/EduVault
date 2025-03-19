import React from 'react';
import { Check, X, CreditCard, Shield, Zap, Crown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PlanFeature {
  name: string;
  available: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  features: string[];
  recommended: boolean;
}

interface PricingPlansProps {
  plans: Plan[];
  currentPlan: string;
  onSelectPlan?: (planId: string) => void;
  onContactSales?: () => void;
}

const PricingPlans: React.FC<PricingPlansProps> = ({
  plans,
  currentPlan,
  onSelectPlan,
  onContactSales
}) => {
  const getPlanIcon = (planName: string) => {
    const name = planName.toLowerCase();
    if (name.includes('premium')) return <Crown className="h-5 w-5 text-amber-500" />;
    if (name.includes('enterprise')) return <Shield className="h-5 w-5 text-blue-600" />;
    return <Zap className="h-5 w-5 text-primary" />;
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-md mx-auto mb-4">
        <h2 className="text-2xl font-bold mb-2">Upgrade Your Experience</h2>
        <p className="text-muted-foreground">
          Choose the plan that's right for you and get access to premium features
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isPlanActive = currentPlan === plan.id;
          const isEnterprise = plan.price.toLowerCase().includes('contact');
          
          return (
            <Card 
              key={plan.id}
              className={`flex flex-col ${plan.recommended ? 'border-primary shadow-md' : ''}`}
            >
              {plan.recommended && (
                <div className="bg-primary text-primary-foreground text-center py-1 text-xs font-medium">
                  RECOMMENDED
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getPlanIcon(plan.name)}
                    <CardTitle>{plan.name}</CardTitle>
                  </div>
                  {isPlanActive && (
                    <Badge variant="outline" className="border-green-500 text-green-600">
                      Current
                    </Badge>
                  )}
                </div>
                <CardDescription>
                  <div className="mt-2">
                    <span className="text-2xl font-bold">{plan.price}</span>
                    {!isEnterprise && <span className="text-muted-foreground ml-1">/ month</span>}
                  </div>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-2">
                {isEnterprise ? (
                  <Button 
                    className="w-full" 
                    variant={plan.recommended ? "default" : "outline"}
                    onClick={onContactSales}
                  >
                    Contact Sales
                  </Button>
                ) : isPlanActive ? (
                  <Button className="w-full" variant="outline" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button 
                    className="w-full" 
                    variant={plan.recommended ? "default" : "outline"}
                    onClick={() => onSelectPlan && onSelectPlan(plan.id)}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    {plan.price === '$0/month' ? 'Get Started' : 'Subscribe'}
                  </Button>
                )}
                
                {plan.price !== '$0/month' && !isEnterprise && (
                  <p className="text-xs text-center text-muted-foreground">
                    7-day free trial, cancel anytime
                  </p>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      <div className="text-center text-sm text-muted-foreground mt-8">
        All plans include a 30-day money-back guarantee
      </div>
    </div>
  );
};

export default PricingPlans; 