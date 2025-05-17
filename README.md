
```
# 📝 Blogging Application - Backend (MERN Stack)

This is the backend API for a full-stack Blogging Application built using **Node.js**, **Express.js**, and **MongoDB (Atlas)**. It follows **MVC architecture**, uses **JWT** for authentication, and allows users to perform full **CRUD operations** on blog posts.

---

## 🚀 Features

- 👤 User Registration and Login (with JWT Auth)
- 🔐 Protected Routes for Blog Management
- 📚 Create, Read, Update, and Delete Blogs
- 🔎 Filter Blogs by `category` and `author`
- 🧱 MVC Project Structure
- ✅ Proper HTTP Status Codes and Error Handling

---
```
## 📁 Project Structure

```

.
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── blogController.js
├── middleware/
│   └── auth.js
├── models/
│   ├── User.js
│   └── Blog.js
├── routes/
│   ├── authRoutes.js
│   └── blogRoutes.js
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md

````

---

## ⚙️ Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv

---

## 📦 Installation & Setup

1. **Clone the repo**
```bash
git clone https://github.com/your-username/blog-backend.git
cd blog-backend
````

2. **Install dependencies**

```bash
npm install
```

3. **Create a `.env` file**

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. **Start the server**

```bash
npm run dev
```

---

## 🔐 API Endpoints

### 🧑 Authentication

| Method | Endpoint       | Description             |
| ------ | -------------- | ----------------------- |
| POST   | `/auth/signup` | Register a new user     |
| POST   | `/auth/login`  | Login and get JWT token |

### 📝 Blog Management

| Method | Endpoint     | Description                         |
| ------ | ------------ | ----------------------------------- |
| GET    | `/blogs`     | Get all blogs (filterable)          |
| POST   | `/blogs`     | Create a blog (auth required)       |
| PUT    | `/blogs/:id` | Update blog (only owner can edit)   |
| DELETE | `/blogs/:id` | Delete blog (only owner can delete) |

**Query Filters:**

* `/blogs?category=Finance&author=John`

---

## 🔐 Protected Routes

To access protected routes like `/blogs`, you must pass the JWT token in the header:

```
Authorization: Bearer <your_token>
```

---

## ✅ Example Blog Schema

```js
{
  title: String,
  category: String,
  author: String,
  content: String,
  image: String,
  userId: ObjectId, // references User
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🧪 Sample Test with Postman

* Use `/auth/signup` to register.
* Use `/auth/login` to get a token.
* Use the token to create/read/update/delete blogs.

---

## 📬 Contact

For any issues, reach out to:
**\[Somashekar]** – \[(mailto:somugowda.work@gmail.com)]
GitHub: [github.com/somugowdasoft]

```
