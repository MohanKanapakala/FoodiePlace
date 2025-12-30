# 🍴 FoodiePlace – Online Food Ordering Web App

FoodiePlace is a **React-based food ordering platform** that allows users to browse, add to cart, and order food items online. It features interactive UI, animations, discounts, email notifications, and QR code payments.

---

## **Features**

- **User Authentication**

  - SignUp / SignIn with personalized experience
  - User-specific cart and orders

- **Interactive Shopping Cart**

  - Add, remove, increase/decrease quantities
  - Real-time total calculations
  - SweetAlert2 popups for actions
  - Confetti animations for discounts and successful orders
  - Coupon system for applying discounts

- **Product Listing**

  - Categories: Veg, Non-Veg, Milk, Chocolates, Bakery
  - Search bar to filter products
  - Pagination for large product lists
  - Fetches products dynamically from backend/API

- **Email Notifications**

  - Sends order confirmation emails via **EmailJS**
  - Detailed order summary with items, discounts, shipping, tax, and total cost

- **Payment Options**

  - QR Code payments for UPI
  - Placeholder for future card payments

- **Order Management**

  - View past orders with details
  - User-specific order history

- **UI & Animations**

  - Confetti animations for discounts and order success
  - SweetAlert2 for interactive modals
  - Toast notifications for cart actions
  - Fully responsive and mobile-friendly design

- **Data Persistence**
  - Cart, orders, and authentication stored in **localStorage**
  - Cart is user-specific

---

## **Tech Stack**

- **Frontend:** React, Redux Toolkit, React Router
- **Styling:** CSS, SweetAlert2, Toastify, Animations
- **Email Service:** EmailJS
- **State Persistence:** LocalStorage
- **Hosting:** Vercel

## **Getting Started**

### **Install Dependencies**

```bash
npm install

Run Locally
     npm start

Build for Production
    npm run build

#Live Demo
   https://foodie-place-seven.vercel.app/

GitHub Repository
    https://github.com/MohanKanapakala/FoodiePlace

Author
    Mohana Rao Kanapakala
    📧 kanapakalamohanrao@gmail.com
```
