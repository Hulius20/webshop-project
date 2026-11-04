# Webshop – Full-Stack Marketplace

A full-stack second-hand marketplace where users can list items for sale, browse and search other users' listings, add them to a cart and buy them. It has a **Django REST Framework** API with JWT authentication and a **React** single-page app built with Vite.

Built as the course project for *Web Technologies* (Åbo Akademi University, 2025).

## Features

**Shopping**
- Browse all items for sale. Your own listings are hidden from your shop view.
- Live search over product titles and descriptions
- Shopping cart that persists in the browser
- Checkout verifies each item against the API before payment:
  - flags items that were sold or taken off sale since they were added to the cart
  - detects price changes and asks the user to accept the new price before continuing

**Selling and account management**
- Register, log in and log out with JWT access and refresh tokens
- Create listings with a title, description, price and image URL
- Take your own listings on or off sale. Sold items are locked.
- Account page with filters: *All*, *For sale*, *Sold* and *Purchased*
- Change your password

**Backend rules**
- Anyone can read products, but only logged-in users can create, edit or buy them
- Sellers can only modify their own products
- You can't buy your own product or buy an item twice
- One-click endpoint that fills the database with demo users and products

## Tech stack

| Layer    | Technologies |
|----------|--------------|
| Frontend | React 19, React Router 7, Axios, Vite, Context API (cart state), CSS |
| Backend  | Python, Django 4.2, Django REST Framework, SimpleJWT, django-filter, django-cors-headers |
| Database | SQLite |

## Project structure

```
backend/            Django project
  mysite/           settings and root URL config
  accounts/         registration, login (JWT), current user, change password
  first_app/        Product model, ViewSet, permissions, demo-data endpoint
my-app/             React frontend (Vite)
  src/pages/        Home, Cart, Account, Sign in / Sign up
  src/components/   Navbar, product cards, search bar, etc.
  src/context/      Cart context and provider
  src/api/          Axios clients (public and authenticated)
```

## API overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/accounts/register/` | Create an account |
| POST | `/api/accounts/login/` | Get a JWT access and refresh token pair |
| POST | `/api/accounts/token/refresh/` | Refresh the access token |
| GET  | `/api/accounts/me/` | Current user |
| POST | `/api/accounts/change_password/` | Change password |
| GET / POST | `/api/products/` | List products (filter by `seller`, `buyer`, `for_sale`, `is_purchased`) or create one |
| GET / PUT / PATCH / DELETE | `/api/products/{id}/` | Read or modify one product |
| POST | `/api/products/{id}/toggle_sale/` | Seller puts the product on or off sale |
| POST | `/api/products/{id}/purchase/` | Buy a product |
| POST | `/api/populate-db/` | Reset the database with demo data |

## Running locally

You need Python 3.10+ and Node.js 18+.

**Backend** (runs on `http://127.0.0.1:8000`)
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**Frontend** (runs on `http://localhost:5173`)
```bash
cd my-app
npm install
npm run dev
```

### Demo data
Click the **Populate database** button on the home page, or send a `POST` request to `/api/populate-db/`. This **deletes all existing data** and creates:
- 6 users, `testuser1` to `testuser6`, with passwords `pass1` to `pass6`
- 10 products each for `testuser1` to `testuser3`

Log in as `testuser4`, for example, to shop from the other users.

## Notes

This is a course project meant to run locally. It uses Django development settings (`DEBUG`, a hard-coded dev `SECRET_KEY`, open CORS) and a SQLite database. These would need to change before any real deployment.

## Author

Julius Nyström – [github.com/Judas20](https://github.com/Judas20)
