# 📝 MERN Quiz Application

A full-stack quiz application built using the MERN stack. Users can create an account, log in securely, attempt quizzes across different technologies and difficulty levels, and view their quiz performance and history.

---

## 🚀 Features

* User Signup & Login
* JWT-based Authentication
* Technology-wise quizzes
* Multiple difficulty levels (Basic, Intermediate, Advanced)
* Automatic score calculation
* Performance analysis based on quiz score
* Quiz history for each user
* Responsive and user-friendly interface

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Axios
* CSS Modules
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

---

## 📂 Project Structure

```text
MERN-Quiz-App/
│
├── Frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── Backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mern-quiz-app.git
```

### 2. Install Backend Dependencies

```bash
cd Backend
npm install
npm run dev
```

### 3. Install Frontend Dependencies

```bash
cd Frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the **Backend** folder and add:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=4000
```

---

## 🌟 Future Enhancements

* Leaderboard
* Admin Panel
* More quiz categories
* Dark Mode
* Question randomization
* Search and filter quiz history

---

## 👩‍💻 Author

**Khushi**

B.Tech CSE Student
