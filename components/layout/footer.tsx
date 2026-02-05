import Link from "next/link";

export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center font-bold text-white">F</div>
                <span className="text-xl font-bold">FoodHub</span>
              </div>
              <p className="text-gray-400 text-sm">Fast delivery from your favorite restaurants.</p>
            </div>
  
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li><Link href="/meal"  className="hover:text-white transition">Meals</Link></li>
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                <li><Link href="/contact"  className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
  
            {/* Services */}
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><span className="hover:text-white transition">Fast Delivery</span></li>
                <li><span className="hover:text-white transition">Safe Checkout</span></li>
                <li><span className="hover:text-white transition">Fresh Food</span></li>
                <li><span className="hover:text-white transition">24/7 Support</span></li>
              </ul>
            </div>
  
            {/* Contact Info */}
            <div>
              <h3 className="font-semibold mb-4">Get in Touch</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: <a href="mailto:support@foodhub.com" className="text-red-500 hover:text-red-400">support@foodhub.com</a></li>
                <li>Phone: <a href="tel:+1234567890" className="text-red-500 hover:text-red-400">+1 (234) 567-890</a></li>
                <li>Address: <span>123 Food Street,<br />City, State 12345</span></li>
              </ul>
            </div>
          </div>
  
          {/* Divider */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; 2024 FoodHub. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="www.facebook.com" className="text-gray-400 hover:text-white transition">Facebook</a>
              <a href="www.twitter.com" className="text-gray-400 hover:text-white transition">Twitter</a>
              <a href="www.instagram.com" className="text-gray-400 hover:text-white transition">Instagram</a>
              <a href="www.linkedin.com" className="text-gray-400 hover:text-white transition">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  