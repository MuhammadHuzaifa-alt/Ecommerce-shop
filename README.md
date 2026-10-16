# 🛒 E-Commerce Platform

A full-stack e-commerce application built with **React, Django REST Framework, PostgreSQL, and Docker**. The platform includes a customer-facing storefront, a separate admin dashboard, and a REST API backend.

## 🚀 Features

### Customer Storefront
- Browse products and categories
- View product details
- Shopping cart and wishlist
- Customer authentication
- Order placement and order management
- User profile management
- Blog and content pages

### Admin Dashboard
- Manage products and categories
- Manage customer orders and users
- Create and manage blog posts
- Centralized administration interface

### Backend API
- Django REST Framework API
- JWT-based authentication
- PostgreSQL database integration
- Containerized deployment with Docker

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| React | Customer storefront |
| TypeScript | Frontend development |
| Django | Backend application |
| Django REST Framework | REST API |
| PostgreSQL | Relational database |
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| Nginx | Frontend web server |

## 📁 Project Structure

```text
ecomerce/
├── backend/              # Django backend and REST API
├── frontend/             # Customer storefront
├── adminfrontend/        # Admin dashboard
├── docker-compose.yml    # Docker services configuration
├── .gitignore
└── README.md
```

## ⚙️ Prerequisites

Install the following before running the project:

- Git
- Docker Desktop or Docker Engine
- Docker Compose

## 🐳 Run with Docker

### 1. Clone the repository

```bash
git clone https://github.com/MuhammadHuzaifa-alt/ecomerce.git
cd ecomerce
```

### 2. Configure environment variables

Create the required environment files according to the backend and Docker Compose configuration.

Do not commit real credentials, database passwords, or Django production secrets.

### 3. Build and start the containers

```bash
docker compose up -d --build
```

### 4. Run database migrations

```bash
docker compose exec backend python manage.py migrate
```

### 5. Check running containers

```bash
docker compose ps
```

### 6. View application logs

```bash
docker compose logs -f
```

## 🌐 Access the Application

When running locally with the configured ports:

| Service | URL |
|---|---|
| Customer Storefront | http://localhost:1573 |
| Admin Dashboard | http://localhost:1574 |
| Django Backend | http://localhost:8000 |

The available API endpoints depend on the backend URL configuration.

## 🛠️ Useful Docker Commands

Stop the containers:

```bash
docker compose down
```

Rebuild and restart the application:

```bash
docker compose up -d --build
```

View backend logs:

```bash
docker compose logs -f backend
```

Open a Django shell:

```bash
docker compose exec backend python manage.py shell
```

## 🔐 Security

- Keep environment variables and secrets out of version control.
- Use strong credentials and secure Django settings.
- Configure HTTPS and production-grade application servers before public deployment.
- Restrict database access in production.

## 👨‍💻 Author

**Muhammad Huzaifa**

Software Engineer | Full-Stack Developer | AI/ML Engineer

GitHub: [MuhammadHuzaifa-alt](https://github.com/MuhammadHuzaifa-alt)

---

If you find this project useful, consider giving the repository a ⭐ on GitHub.

*Built with React, Django, PostgreSQL, and Docker.*
