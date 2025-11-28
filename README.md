# MovieFlix

MovieFlix is a full-stack movie management application with user and admin roles, featuring role-based authentication, real-time notifications, and secure backend APIs. Users can browse movies, manage orders, and track purchases, while admins can manage movies, reviews, and user orders.

![MovieFlix](https://img.shields.io/badge/MovieFlix-Full--Stack%20App-blue) 

## Features

### User Features
- Browse all movies and search without logging in
- Register/login to unlock full functionality
- Add movies to cart, favorites, and checkout
- Add reviews for movies
- View and track order details
- Edit personal information(email) provided at registration
- All user routes are authenticated
- *Real-time notifications* when new movies are added by admins(graphql subscription)

### Admin Features
- Add, modify, and remove movies
- Add reviews
- Track and update all user orders status
- All admin routes are authenticated

### General Features
- Backend and frontend routes secured with JWT authentication
- Joi validation for all input data
- Dynamic rate limiting
- Toast notifications for smooth user experience
- Fully responsive site
- Pagination for user order details and admin all orders
- *Real-time updates using GraphQL subscriptions*

## Tech Stack

- *Frontend:* Next.js, React, Apollo Client, Toastify
- *Backend:* Node.js, Express.js, GraphQL
- *Database:* MongoDB
- *Authentication:* JWT
- *Validation:* Joi
- *Others:* Nodemon, Axios, GraphQL Subscriptions

## Real-time Notifications

MovieFlix implements real-time notifications using GraphQL subscriptions. When an admin adds a new movie, all connected users receive an instant notification without needing to refresh the page.

### How it works:
1. Admin adds a new movie through the admin panel.
2. The backend publishes a notification via GraphQL subscription.
3. All subscribed clients receive the notification in real-time.
4. Users see a toast notification about the newly added movie and a notification bell icon that shows a alert

## REST API Overview

### Users
| Method | Route | Description | Protected |
|--------|-------|-------------|-----------|
| POST   | /user/register | Register new user | ❌ |
| POST   | /user/login    | Login user | ❌ |
| GET    | /user/userInfo | Get logged-in user info | ✅ |
| PUT    | /user/updateUser | Update email | ✅ |

### Movies
| Method | Route | Description | Protected |
|--------|-------|-------------|-----------|
| GET    | /movies/allmovies | Fetch all movies | ❌ |
| GET    | /movies/moviebyid/:id | Get movie by ID | ❌ |
| GET    | /movies/recentmovies | Get recently added movies | ❌ |
| GET    | /movies/genre/:genre | Get movies by genre | ❌ |
| GET    | /movies/language/:language | Get movies by language | ❌ |
| POST   | /movies/addmovie | Add a movie | ✅ Admin |
| PUT    | /movies/updatemovie/:id | Update movie | ✅ Admin |
| DELETE | /movies/deletemovie/:id | Delete movie | ✅ Admin |

### Cart
| Method | Route | Description | Protected |
|--------|-------|-------------|-----------|
| POST   | /cart/addtocart | Add movie to cart | ✅ |
| DELETE | /cart/deletecart | Remove movie from cart | ✅ |
| GET    | /cart/getcart | Get user cart | ✅ |

### Favorites
| Method | Route | Description | Protected |
|--------|-------|-------------|-----------|
| POST   | /fav/addtofav | Add movie to favorites | ✅ |
| DELETE | /fav/deletefav | Remove movie from favorites | ✅ |
| GET    | /fav/getfav | Get user favorites | ✅ |

### Orders
| Method | Route | Description | Protected |
|--------|-------|-------------|-----------|
| POST   | /order/placeorder | Place order | ✅ |
| GET    | /order/getordersHistory | User order history | ✅ |
| GET    | /order/getallorders | Admin: all orders | ✅ Admin |
| PUT    | /order/updateorderstatus/:id | Update order status | ✅ Admin |

### Reviews
| Method | Route | Description | Protected |
|--------|-------|-------------|-----------|
| POST   | /reviews/addReview/:movieId | Add or update review | ✅ |

## Installation & Running

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Clone the Repository

bash
# Clone the develop branch (recommended)
git clone --branch develop https://github.com/Mansahib-successiveTech/movieFlix.git

# If cloning the develop branch fails, clone normally and switch to develop
git clone https://github.com/Mansahib-successiveTech/movieFlix.git
cd movieFlix
git checkout develop

Alternatively, download the develop branch ZIP from GitHub.

### Backend Setup

```
cd backend
npm install
npm run dev
```

Backend runs at: http://localhost:8080

### Frontend Setup

```
cd frontend/my-movies
npm install
npm run dev
```

Frontend runs at: http://localhost:3000

### GraphQL Server Setup

```
cd graphql-training
npm install
npm run dev
```

GraphQL server runs at: http://localhost:4000

*Note:* All three (backend, frontend, GraphQL) should be running simultaneously in separate terminals.

### Database Seeding

**Note:** please use your mongodb compass connection string

If you are running the application for the first time or the database is empty, populate it with initial movie data:

```
cd backend
node src/seed.js
```
**Manual adding movies**

**Note:** By default, all users register as regular users. You can give admin access by updating the `role` field of a user to `admin` directly in MongoDB Compass. Once updated, that user will have full admin privileges to manage movies and orders.
This will add sample movies to your MongoDB database for testing.

## Usage Flow

### For Users
- Browse all movies without logging in
- Register/login to access:
  - Add to cart, favorites, and checkout
  - Add reviews
  - View and track order history
  - Edit personal information *(inside sidebar option accesed from navbar option **profile** )*
  - Receive real-time notifications when new movies are added

### For Admin
- Manage movies: add, edit, delete
- Manage reviews
- Track and update all user orders
- All routes are authenticated and validated using Joi
- When adding new movies, all users are automatically notified
-for adding new movies go to admin options in navbar there you will find button to add new movie 

## API Documentation

The application uses GraphQL for API operations. You can explore the GraphQL API at [http://localhost:4000/graphql](http://localhost:4000/graphql) when the server is running.

*Key Subscriptions:*
- newMovieAdded: Subscribes to notifications when new movies are added by admins


