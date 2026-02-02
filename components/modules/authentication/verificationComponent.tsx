'use client'
import { verifyEmail } from '@/actions/user.action';
import { Loader2, Mail } from 'lucide-react';
import React, { useState } from 'react';

const VerificationComponent = ({token}:{token:string }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleVerifyEmail = () => {
      return verifyEmail(token);
    };
    return (
        <div>
        <div className="min-h-screen bg-linear-to-br from-background to-secondary/5 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Mail className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Verify Your Email
              </h1>
              <p className="text-muted-foreground mt-2 text-base">
                Please click here and verify your email
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
            
            </div>

            <button
              onClick={handleVerifyEmail}
              className="w-full cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Click here'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
        </div>
    );
};

export default VerificationComponent;