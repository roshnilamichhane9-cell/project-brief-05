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

## Sprint 14: Product Schema and Model

The backend defines a Mongoose `Product` model backed by the `products`
collection. A schema describes a document's fields and validation; the model
provides the application interface for creating and validating those documents.

| Field | Type | Required | Rules / default |
| --- | --- | --- | --- |
| `name` | String | Yes | Trimmed; 2-100 characters |
| `category` | String | Yes | Trimmed; 2-100 characters |
| `quantity` | Number | No | Defaults to `0`; non-negative whole number |
| `price` | Number | Yes | Non-negative |
| `createdAt`, `updatedAt` | Date | Auto | Maintained by Mongoose timestamps |

Run `npm --prefix server test` to verify model defaults and validation.

## Product CRUD API

The database-backed product endpoints are:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/products` | Create a product |
| `GET` | `/api/products` | List products |
| `GET` | `/api/products/:id` | Retrieve one product |
| `PUT` | `/api/products/:id` | Update a product |
| `DELETE` | `/api/products/:id` | Delete a product |

Requests use JSON with `name`, `category`, `quantity`, and `price` fields.
Responses return the record or records in `data`. Invalid input or IDs return
`400`, missing products return `404`, and unexpected database failures return
`500`. Run `npm --prefix server test` for model and controller tests.

## Sprint 16: React Product Integration

The Products page loads, creates, edits, and deletes products through the
frontend service at `client/src/services/productService.js`. It defaults to
`http://localhost:5000/api`; set `VITE_API_URL` in the client environment to
override the API base URL. Run `npm --prefix client run build` to validate the
frontend.

## Sprint 17: Category CRUD Module

Categories are stored separately in the `categories` collection and managed
through the `/categories` page. The Category schema requires a unique,
trimmed name of 2-60 characters; description is optional and limited to 250
characters; `isActive` defaults to `true`. Mongoose maintains timestamps.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/categories` | Create a category |
| `GET` | `/api/categories` | List categories |
| `GET` | `/api/categories/:id` | Retrieve one category |
| `PUT` | `/api/categories/:id` | Update a category |
| `DELETE` | `/api/categories/:id` | Delete a category |

Duplicate category names return `409`; invalid input or IDs return `400`,
missing categories return `404`, and unexpected database failures return
`500`. The Categories page provides loading and error feedback plus create,
edit, and confirmed delete actions. Product and Category services share the
Axios API client at `client/src/services/apiClient.js`.

## Sprint 18: Authentication Foundation

The User model stores a trimmed name, normalized unique email, password hash,
and Mongoose timestamps in the `users` collection. Registration hashes
passwords with `bcryptjs`; the original password is never returned, and the
password field is excluded from normal User queries. Passwords must contain
at least 8 characters and fit within bcrypt's 72-byte input limit.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create an account |
| `POST` | `/api/auth/login` | Verify email and password |

Duplicate emails return `409`, invalid input returns `400`, and incorrect or
unknown login credentials return the same `401` response. Successful responses
contain only the user's public ID, name, email, and timestamps. The React
pages at `/register` and `/login` use `client/src/services/authService.js` and
provide validation, loading, and success/error feedback. This sprint verifies
credentials only; JWTs, persistent login state, authorization, and protected
routes are intentionally deferred.
