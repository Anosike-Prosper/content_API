# 3.1 Article Recommendation System

This project implements a **personalized article recommendation engine** based on user **interests** and **interactions** (views/likes).  

The logic ensures that users always see relevant content whether or not they have provided interests or interacted with articles.

---

## 🔎 Recommendation Logic

The recommendation system follows **3 main cases**:

### **Case 1: User has defined interests**
- When a user registers, they may provide one or more interests (e.g., `football`, `golf`, `cooking`).
- Articles are recommended if their **tags/categories** match **any** of the user’s interests.
- If the user has multiple interests, the query checks against all of them (`$in` in MongoDB).
- Example:  
  - User interests = `["football", "cooking"]`  
  - Recommended articles = Articles tagged with **football** OR **cooking**.

---

### **Case 2: User has no interests but has interactions**
- If the user hasn’t set interests but has **viewed or liked articles**, their history is used.
- The system recommends **popular articles** (sorted by likes/views) that the user has **not already interacted with**.
- This avoids showing duplicate content while still keeping recommendations relevant.

---

### **Case 3: User has no interests and no interactions**
- For completely new users (no interests and no interactions):
  - The system recommends **globally popular articles**, based on overall likes/views.
- This ensures new users always see trending or highly engaging content.

---

## ⚙️ Interaction Recording

- **Views**: Each view is stored as a separate record (a user may view the same article multiple times).  
- **Likes**: A user can only like an article **once**. Attempting to like the same article again returns an error.  

This design provides flexibility for analytics (tracking multiple views) while maintaining logical constraints for likes.

---

## 🚀 Benefits of this Approach

- **Personalized** → Users with interests get tailored recommendations.  
- **Adaptive** → If no interests are set, past interactions guide recommendations.  
- **Fair for new users** → Falls back to popular content so nobody sees an empty feed.  

---
---
---

# 4. Submission Guidelines

### Content Recommendation API

A **Node.js + TypeScript** API for managing users, articles, interactions, and generating personalized article recommendations using **OpenAI embeddings**.  
The system stores content in **MongoDB** and provides REST endpoints for CRUD operations and recommendations.  

---

### 🚀 Features
- User management with interests.  
- Article management with embeddings stored in MongoDB.  
- Track user interactions (likes, views, etc.).  
- Personalized recommendations using **content-based filtering** and vector similarity.  
- Pagination support for fetching articles.  

---

### 📦 Technology Stack
- **Node.js / Express** → Backend framework for APIs.  
- **TypeScript** → Static typing for better maintainability.  
- **MongoDB + Mongoose** → Database and ORM for managing users, articles, and interactions.  
- **OpenAI** → Used to generate embeddings for articles and match content relevance.  
- **dotenv** → Environment configuration.  
- **express-validator** → Input validation for API requests.  

---

## ⚙️ Setup & Installation

### 1. Clone Repository
```bash
git clone <repo-url>
cd content_api
```

## Install Dependencies
```
npm install
```
## Setup Environment
```
cp .example.env .env
```

## Fill in your environment variables such as:
```
MONGODB_URI=
OPENAI_API_KEY=
PORT=
```

## Run Project

#### Development
```

npm run dev
```

#### Build and Production
```
npm run build
npm start

```

## API END POINTS

| Method   | Endpoint                          | Description                                |
| -------- | --------------------------------- | ------------------------------------------ |
| **POST** | `/api/v1/user`                    | Create a new user                          |
| **GET**  | `/api/v1/article/:articleId`      | Get article by ID                          |
| **GET**  | `/api/v1/article?limit=&page=`    | Get all articles with pagination           |
| **POST** | `/api/v1/interaction`             | Record user interaction (like, view, etc.) |
| **GET**  | `/api/v1/recommendations/:userId` | Get recommendations for a user             |




# USER
```
Create User 
-- POST api/v1/user


request:
{
  "username": "jennifer55",
  "interests": ["football", "basketball"]
}



response:
{
  "user": {
    "username": "jennifer55",
    "interests": ["football", "basketball"],
    "_id": "68d1650bf9053a1190d9f5d2",
    "createdAt": "2025-09-22T15:02:35.616Z",
    "updatedAt": "2025-09-22T15:02:35.616Z",
    "__v": 0
  },
  "message": "success"
}
```
-------------
-------------
--------------

# Article
```
Get Article by ID
GET api/v1/article/:articleId


Response:

{
  "article": {
    "_id": "68cf20fe35bfedeea8af406d",
    "title": "what dogs eat",
    "content": "explain what they eat",
    "author": "anosike prosper",
    "summary": "now you know what they eat",
    "createdAt": "2025-09-20T21:47:42.482Z",
    "updatedAt": "2025-09-20T21:47:42.482Z",
    "__v": 0
  },
  "message": "success"
}
```
---
```
Get All Articles (Paginated)
GET api/v1/article?limit=10&page=1


Response:

{
  "article": [
    {
      "_id": "68d0bc7c3c9f488913cdff8f",
      "title": "travelling",
      "content": "how a travelling exposes you to a lot",
      "author": "anosike prosper",
      "summary": "exploring",
      "embedding": [ -0.0178655572, -0.0103860991, -0.0337639972 ],
      "createdAt": "2025-09-22T03:03:24.533Z",
      "updatedAt": "2025-09-22T03:03:24.533Z",
      "__v": 0
    }
  ],
  "message": "success"
}
```

-----
-----
# Interaction

```
Record Interaction
POST api/v1/interaction

request:
{
  "userId": "68d0babe0d765ff2f0ed3e95",
  "articleId": "68d0a24dda90c264981711e2",
  "interactionType": "like"
}

response:
{
  "interaction": {
    "userId": "68d0babe0d765ff2f0ed3e95",
    "articleId": "68d0a24dda90c264981711e2",
    "interactionType": "like",
    "_id": "68d16b3245226bde2348895a",
    "createdAt": "2025-09-22T15:28:50.638Z",
    "__v": 0
  },
  "message": "success"
}

```
-------
------
# Recommendations

```
Get Recommendations for a User
GET api/v1/recommendations/:userId

Response:

{
  "recommendations": [
    {
      "_id": "68d0a24dda90c264981711e2",
      "title": "football",
      "content": "my footballing skills have improved because of hardwork",
      "author": "anosike prosper",
      "summary": "work hard for improvement",
      "embedding": [0.0150259304, 0.0200997702, 0.0158658176],
      "createdAt": "2025-09-22T01:11:41.219Z",
      "updatedAt": "2025-09-22T01:11:41.219Z",
      "__v": 0
    }
  ],
  "message": "success"
}
```

-------------------
--------------------
------------------
## Technical Choices

- Express → Simple and widely adopted for REST APIs.

- TypeScript → Adds strong typing and reduces runtime bugs.

- MongoDB (Mongoose) → Handles flexible document storage for users, articles, and interactions.

- OpenAI Embeddings → Enables semantic similarity for better content recommendations.

- express-validator → Ensures request inputs are valid and clean.

----------------------------------------------
----------------------------------------------



## 🧩 Stretch Goal: Recommendation Logic

For recommendations, I implemented a hybrid content-based approach:

1. Each article is stored with a vector embedding.

2. When fetching recommendations:

- User’s interests are matched with article metadata.

- User’s past interactions (e.g., likes) are compared with embeddings using cosine similarity.

- Results are combined and ranked before returning.

This ensures personalized results that adapt as the user interacts more.


-------------------------
-------------------------


# What I Would Do Next

If I had more time, I would add:

- Authentication & Authorization (JWT-based).

- Unit & Integration Tests (Jest / Supertest).

- Advanced Error Handling with standardized error responses.



