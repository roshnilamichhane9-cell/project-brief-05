project title
Inventory Management system 
Team Member
 Roshni lamichhane
 Aniket Saha
 Bhoben Sharma
 Deba Basumatary
 Vivek Magar
 Project Domain
 Business
Brief Project description
The Inventory Management System is a web-based business application developed using the MERN Stack (MongoDB, Express.js, React.js, and Node.js). It helps businesses efficiently manage products, categories, suppliers, inventory levels, and purchase orders from a centralized platform.

The system enables users to monitor stock movement, maintain accurate inventory records, reduce stock shortages, improve purchasing decisions, and generate inventory reports. It supports different user roles such as Administrator, Inventory Manager, and Staff, providing secure role-based access and efficient inventory management operations.

### This is why people needs to follow the instructions properly

## Backend MongoDB Setup

The backend connects to the MongoDB database named in `MONGODB_URI` and creates
the initial `products` collection if it does not exist.

1. Make sure MongoDB Community Server or an Atlas cluster is available.
2. Create `server/.env` from `server/.env.example`.
3. Set `MONGODB_URI` to a connection string that names the `InventoryDB`
   database (or the database selected for your project).
4. Run `npm --prefix server install` and `npm --prefix server start`.

The server logs whether the database connection succeeds. If MongoDB is
unavailable, the existing API routes still start. Do not commit `server/.env`;
it is excluded by `.gitignore`.