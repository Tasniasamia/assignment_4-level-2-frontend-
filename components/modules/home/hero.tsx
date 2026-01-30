import React from 'react';

const Hero = () => {
    return (
  
             <section className="bg-gradient-to-r from-primary to-secondary py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 text-balance">
              Order Delicious Food
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 text-balance max-w-2xl mx-auto">
              Fast delivery from your favorite restaurants
            </p>
            <div className="flex justify-center gap-2 text-sm text-primary-foreground">
              <span>⚡ Fast Delivery</span>
              <span>•</span>
              <span>🔒 Safe Checkout</span>
              <span>•</span>
              <span>⭐ Fresh Food</span>
            </div>
          </div>
        </div>
      </section>
   
    );
};

export default Hero;