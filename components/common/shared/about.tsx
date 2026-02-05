export default function About() {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container">
          {/* Main About Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About FoodHub</h2>
              <p className="text-lg text-gray-600 mb-4">
                FoodHub is your trusted platform for ordering delicious food from your favorite restaurants. We connect food lovers with restaurants that share our passion for quality and freshness.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Founded in 2020, we've grown to serve thousands of customers across the city, delivering not just food, but an experience of convenience and excellence.
              </p>
              <p className="text-lg text-gray-600">
                Our mission is to make ordering food easy, affordable, and accessible to everyone, while supporting local restaurants and businesses.
              </p>
            </div>
            <div className="bg-linear-to-br from-primary to-primary rounded-lg h-80 flex items-center justify-center text-white text-6xl font-bold">
              FoodHub
            </div>
          </div>
  
          {/* Stats Section */}
          <div className="bg-white rounded-lg p-8 mb-16">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primay mb-2">500+</div>
                <p className="text-gray-600">Partner Restaurants</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                <p className="text-gray-600">Happy Customers</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <p className="text-gray-600">Orders Delivered</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <p className="text-gray-600">Customer Support</p>
              </div>
            </div>
          </div>
  
          {/* Values Section */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Quality */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-4 mx-auto">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 text-center mb-2">Quality</h4>
                <p className="text-gray-600 text-center">
                  We partner only with restaurants that maintain the highest standards of food quality and hygiene.
                </p>
              </div>
  
              {/* Speed */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-4 mx-auto">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 text-center mb-2">Speed</h4>
                <p className="text-gray-600 text-center">
                  Fast and reliable delivery with real-time tracking so you always know where your food is.
                </p>
              </div>
  
              {/* Trust */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mb-4 mx-auto">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 text-center mb-2">Trust & Safety</h4>
                <p className="text-gray-600 text-center">
                  Secure transactions, protected customer data, and guaranteed satisfaction on every order.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  