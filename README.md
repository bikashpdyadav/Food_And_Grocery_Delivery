# 🍔🛒 Food & Grocery Delivery Platform

A comprehensive full-stack food and grocery delivery application built with React, featuring multiple user roles, real-time order tracking, and integrated payment systems.

## 🌟 Features

### 🍽️ Food Delivery
- **Restaurant Discovery**: Browse through a curated list of restaurants with ratings and reviews
- **Menu Browsing**: Detailed restaurant menus with prices, descriptions, and images
- **Smart Cart**: Add/remove items with quantity management
- **Order Tracking**: Real-time order status updates
- **Location Services**: Google Maps integration for delivery tracking

### 🛒 Grocery Shopping
- **Category-based Shopping**: Organized grocery categories for easy navigation
- **Fresh Produce**: Specialized sections for vegetables, fruits, and daily essentials
- **Bulk Ordering**: Support for large quantity purchases
- **Smart Recommendations**: Personalized product suggestions

### 👥 Multi-Role System
- **Customer Portal**: User-friendly interface for ordering food and groceries
- **Admin Dashboard**: Complete restaurant and order management system
- **Delivery Partner Portal**: Dedicated interface for delivery personnel
- **Restaurant Management**: Tools for restaurant owners to manage their offerings

### 🔧 Technical Features
- **Real-time Updates**: Live order status and delivery tracking
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **State Management**: Redux Toolkit for efficient state handling
- **Authentication**: Firebase-based user authentication
- **Payment Integration**: Secure payment processing
- **Offline Support**: Progressive Web App capabilities

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern React with hooks and functional components
- **React Router DOM 6.28.0** - Client-side routing
- **Redux Toolkit 2.3.0** - State management
- **Tailwind CSS 3.4.15** - Utility-first CSS framework
- **Material-UI 6.4.1** - React component library

### Backend & Services
- **Firebase 11.2.0** - Authentication and real-time database
- **Google Maps API** - Location services and delivery tracking
- **Axios 1.7.9** - HTTP client for API requests

### Development Tools
- **React Scripts 5.0.1** - Build and development tools
- **Testing Library** - Component testing utilities
- **Web Vitals** - Performance monitoring

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Firebase project setup
- Google Maps API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd food_grocery_delivery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGINGID=your_messaging_sender_id
   REACT_APP_FIREBASE_APPID=your_app_id
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## 📱 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── food/                 # Food delivery components
│   │   ├── FoodBody.js       # Main food page
│   │   ├── FoodCart.js       # Shopping cart
│   │   ├── RestaurantMenu.js # Restaurant menu display
│   │   └── ...
│   ├── grocery/              # Grocery shopping components
│   │   ├── GroceryBody.js    # Main grocery page
│   │   ├── GroceryCart.js    # Grocery cart
│   │   └── ...
│   ├── deliveryPartner/      # Delivery partner components
│   │   ├── DeliveryDashboard.js
│   │   └── DeliveryPartnerLogin.js
│   ├── server/               # Admin components
│   │   ├── AdminHome.js
│   │   ├── Dashboard.js
│   │   └── ...
│   ├── map/                  # Location services
│   │   ├── MapComponent.js
│   │   └── CallMap.js
│   └── utils/                # Utility functions and stores
│       ├── appStore.js       # Redux store configuration
│       ├── cartSlice.js      # Cart state management
│       ├── userSlice.js      # User state management
│       └── firebase.js       # Firebase configuration
├── App.js                    # Main application component
└── index.js                  # Application entry point
```

## 🎯 Key Features Breakdown

### 🍔 Food Delivery System
- **Restaurant Listings**: Curated list with ratings, cuisines, and delivery times
- **Menu Management**: Dynamic menu loading with real-time updates
- **Cart Functionality**: Persistent cart with local storage backup
- **Order Processing**: Complete order lifecycle management

### 🛒 Grocery Shopping
- **Category Navigation**: Organized product categories
- **Search & Filter**: Advanced product discovery
- **Bulk Ordering**: Support for large quantity purchases
- **Fresh Produce**: Specialized handling for perishable items

### 👨‍💼 Admin Dashboard
- **Restaurant Management**: Add, edit, and manage restaurant information
- **Order Management**: View and process customer orders
- **Analytics**: Sales and performance metrics
- **User Management**: Customer and delivery partner management

### 🚚 Delivery System
- **Order Assignment**: Automatic delivery partner assignment
- **Route Optimization**: Google Maps integration for efficient delivery
- **Real-time Tracking**: Live order status updates
- **Delivery Confirmation**: Photo and signature capture

## 🔐 Authentication & Security

- **Firebase Authentication**: Secure user login and registration
- **Role-based Access**: Different interfaces for customers, admins, and delivery partners
- **Protected Routes**: Secure access to admin and delivery partner portals
- **Session Management**: Persistent login sessions

## 📱 Responsive Design

- **Mobile-first**: Optimized for mobile devices
- **Progressive Web App**: Installable on mobile devices
- **Cross-platform**: Works on all modern browsers
- **Accessibility**: WCAG compliant design

## 🚀 Deployment

### Firebase Hosting
The application is configured for Firebase hosting:

```bash
npm run build
firebase deploy
```

### Environment Variables
Ensure all required environment variables are set in your deployment environment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common issues

## 🔮 Future Enhancements

- [ ] Real-time chat support
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] AI-powered recommendations
- [ ] Voice ordering capabilities
- [ ] Integration with more payment gateways
- [ ] Advanced delivery tracking with ETA predictions

---

**Built with ❤️ using React, Firebase, and modern web technologies**