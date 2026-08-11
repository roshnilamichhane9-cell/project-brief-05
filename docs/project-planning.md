# Inventory Management System – Project Planning & Requirement Analysis

## 1. Project Title
Inventory Management System

## 2. Problem Statement
Many small and medium-sized businesses still rely on spreadsheets or manual methods to track inventory and supplier information. These approaches often lead to inaccurate stock records, delayed purchasing decisions, duplicate product entries, and inventory shortages.

The people affected are store managers, inventory staff, procurement teams, administrators, and small-to-medium business owners. A centralized web application is needed to enable businesses to monitor stock, manage suppliers, record inventory transactions, and improve operational efficiency.

## 3. Project Objective
To develop a secure, scalable, and user-friendly web-based Inventory Management System that helps businesses organize inventory operations, monitor stock levels, manage suppliers and purchase orders, and track stock movements in real time while applying full-stack MERN development concepts.

## 4. Target Users / Stakeholders
### Administrator
- Manages users, user roles, and permissions.
- Oversees products, suppliers, categories, inventory settings, and system-wide reports.
- Manages system settings and overall system access.

### Inventory Manager
- Manages inventory stock levels and inventory transactions.
- Creates and manages purchase orders for suppliers.
- Registers and manages supplier details.
- Reviews inventory history and stock reports.

### Staff
- Views current inventory stock quantities based on assigned permissions.
- Updates stock quantities and records stock-out transactions when products are sold or issued.
- Views product and inventory details.

## 5. Core Modules
1. User Management
2. Product Management
3. Category Management
4. Supplier Management
5. Inventory Management
6. Purchase Order Management

## 7. Project Scope
### Included Features
- User registration and login.
- JWT-based authentication.
- Role-based authorization for Administrator, Inventory Manager, and Staff.
- User profile management and password management.
- Add, view, edit, search, and delete products and product details.
- Create, edit, delete, and assign product categories.
- Add, update, delete, search, and manage supplier information.
- Record stock movement transactions (Stock In, Stock Out, Stock Adjustment).
- Current stock level monitoring and full inventory transaction history log.
- Create, update, track, and view history of Purchase Orders.
- Centralized Dashboard automatically displaying updated inventory levels and stock reports.
- Responsive web interface.

### Excluded Features
- Native mobile application.
- AI-driven inventory forecasting or predictive analytics.
- Integrated third-party payment gateways.
- Barcode hardware scanning and printer integrations.
- Multi-warehouse location and logistics tracking.
- Email or SMS automated stock threshold notifications.

## 7. Functional Requirements
### Authentication and Users
- The system shall allow new users to register.
- The system shall allow users to log in and log out securely.
- The system shall authenticate users using JWT (JSON Web Tokens).
- The system shall enforce Role-Based Authorization for Admin, Inventory Manager, and Staff.
- The system shall allow users to view and update their profile and password.

### Product & Category Management
- Authorized users shall be able to add, edit, search, and delete products.
- The system shall display detailed product information.
- Authorized users shall be able to create, edit, delete, and assign product categories.

### Supplier & Purchase Order Management
- Authorized users shall be able to add, update, delete, and search supplier records.
- Inventory Managers shall be able to create purchase orders for registered suppliers.
- The system shall support updating purchase order status and viewing purchase history.

### Inventory & Stock Tracking
- Staff and Inventory Managers shall be able to record Stock In, Stock Out, and Stock Adjustments.
- The system shall maintain an accurate Inventory History log of all stock movements.
- The dashboard shall automatically update stock counts upon inventory transaction records.

## 8. Non-Functional Requirements
### Security
- Passwords must be hashed using secure hashing algorithms before storage.
- Protected API endpoints must require a valid JWT.
- Role-based authorization checks must prevent unauthorized access to restricted routes.
- User inputs must be validated to prevent malicious data entry.

### Performance
- Fast inventory search execution and efficient stock updates.
- Fast and responsive API communication under classroom/testing scale usage.
- Database queries should be optimized using Mongoose index/references.

### Usability
- Web interface must be clean and responsive across desktop and mobile browsers.
- Inventory navigation and stock movement tracking must be simple and clear.
- Meaningful error messages must be shown for invalid operations.

### Reliability
- The system should handle bad or invalid requests gracefully without crashing.
- Database transaction errors should yield informative user messages.

### Maintainability
- The backend must follow modular MVC architecture (routes, controllers, models, middleware).
- The frontend must utilize clean, reusable React components.
- Project code must be well-organized and documented inside the repository.

### Scalability
- The database schema and code structure must allow future extensions such as barcode scanning, warehouse management, or advanced analytics.

## 9. Expected Outcome
The Inventory Management System will provide a centralized platform where businesses can organize inventory operations, eliminate spreadsheet manual tracking errors, manage suppliers, monitor purchase orders, and view real-time stock levels. It gives students practical experience with MERN stack web development, REST API design, MongoDB relationships (ObjectIds), JWT authentication, role-based access control, and git version control via GitHub.