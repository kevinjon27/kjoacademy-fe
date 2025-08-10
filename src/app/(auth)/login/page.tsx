'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

function LoginPage() {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    errorMsg: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormData(prev => ({ ...prev, errorMsg: '' }));
    setIsLoading(true);
    
    try {
      // TODO: Implement login logic
      console.log('Phone number submitted:', formData.phoneNumber);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, show error if phone number is empty
      if (!formData.phoneNumber.trim()) {
        setFormData(prev => ({ ...prev, errorMsg: 'Please enter a valid phone number' }));
      }
    } catch (err) {
      setFormData(prev => ({ ...prev, errorMsg: 'An error occurred. Please try again.' }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center">
      <Card className="w-full max-w-sm sm:max-w-md">
        <CardHeader className="pb-6">
          <CardTitle className="text-center text-xl sm:text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} autoComplete='off' className="space-y-6">
            <div className="space-y-4">
              <label htmlFor="phone" className="text-sm font-medium text-foreground block mb-2">
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={(e) => {
                  setFormData(prev => ({ 
                    ...prev, 
                    phoneNumber: e.target.value,
                    errorMsg: prev.errorMsg ? '' : prev.errorMsg // Clear error when user types
                  }));
                }}
                className="text-base"
                disabled={isLoading}
              />
            </div>
            
            {/* Error message area */}
            {formData.errorMsg && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">{formData.errorMsg}</p>
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full h-11 sm:h-12 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
