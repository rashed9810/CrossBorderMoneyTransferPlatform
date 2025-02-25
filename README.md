# DiasporeX User Portal

## Overview
DiasporeX is a financial platform that facilitates secure and seamless transactions between users, banks, and agents. The system comprises a **Next.js**-powered frontend and a robust **Node.js** backend using **Prisma** for database management.

## Tech Stack
### Frontend:
- **Next.js** - React-based framework for server-side rendering.
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development.
- **ShadCN** - UI component library for enhanced styling and interactivity.
- **TypeScript** - Static typing for better code maintainability.

### Backend:
- **Node.js** - JavaScript runtime for scalable backend logic.
- **Next.js API Routes** - Server-side logic within the Next.js framework.
- **Prisma** - ORM for database management with PostgreSQL.
- **Express.js** - Lightweight backend framework.
- **JWT Authentication** - Secure user authentication.
- **WebSockets** - Real-time updates.

## Features
### User Portal
- **Dashboard**: Displays real-time account statistics.
- **Wallet**: Deposit, withdraw, and track transactions.
- **Send Money**: Transfer funds between wallets, banks, and agents.
- **Profile Management**: Update personal details and preferences.
- **2-Factor Authentication (2FA)**: Secure user accounts with additional verification.
- **Recipient Management**: Save trusted recipients for quick transactions.
- **Transaction History**: Track financial activity with detailed logs.

### Agent Portal
- **Role-Based Access Control**: Separate user and agent functionalities.
- **KYC Verification**: Ensures agent authenticity and compliance.
- **Real-Time Transactions**: Process financial transactions securely.

## Installation
### Prerequisites
- Node.js (v18+)
- PostgreSQL
- Git

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/rashed9810/diasporex.git
   cd diasporex
   ```
2. Install dependencies:
   ```sh
   cd backend
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file and set:
     ```env
     DATABASE_URL=postgres://youruser:yourpassword@localhost:5432/diasporex
     JWT_SECRET=your_secret_key
     ```
4. Run the backend:
   ```sh
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   - Create a `.env.local` file and set:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:3000/api
     ```
4. Start the frontend:
   ```sh
   npm run dev
   ```

## Deployment
- **Frontend**: Can be deployed using Vercel or Netlify.
- **Backend**: Can be hosted on AWS, DigitalOcean, or a cloud service with Docker support.

## Contribution
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Added new feature"`).
4. Push to your branch (`git push origin feature-name`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License.

---
🚀 **DiasporeX** – Secure and seamless transactions for everyone.
```
