# Recipe App

A web application for searching and managing recipes, built with Next.js and Fastsify and Postgres.

## 📦 Project Structure

```bash
.
├── backend/
├── frontend/
├── docker-compose.prod.yml
├── docker-compose.dev.yml
└── README.md
```

### 🔧 Frontend Technologies

- **Next.js**: React framework for production, offering server-side rendering and static site generation
- **TypeScript**: For type-safe code and better developer experience
- **CSS Modules**: For component-scoped styling with no conflicts
- **Classnames (cx)**: Utility for conditionally joining class names
- **Google Fonts**: Using Geist and Geist Mono for modern typography
- **React Hooks**: Custom hooks for state management (e.g., useFavorites)
- **Next/Router**: For client-side navigation and routing
- **Next/Link**: For optimized client-side transitions between pages
- **Vitest**: For unit testing

The frontend is built with a component-based architecture, focusing on reusability and maintainability. Each component is self-contained with its own styles and logic, following React best practices.

### 🔧 Backend Technologies

- **Node.js**: The runtime environment for the backend
- **Fastify**: A fast and efficient web framework for Node.js
- **TypeScript**: For type-safe code and better developer experience
- **PostgreSQL**: For database storage

## 🚀 Quick Start

### Prod

1. Clone the repository

```bash
git clone https://github.com/pietrograndi/recipe-app.git
cd recipe-app
```

2. Start the containers

```bash
docker compose -f docker-compose.prod.yml up -d

```

3. Prepare the database

```bash
docker exec -it recipe-finder-backend-1 bash 
npm run migrate
npm run seed
exit
```

4. Start the application

```bash
cd frontend
npm install
npm run build
npm run start
```

### 🛠️ Dev Start

```bash
docker compose -f docker-compose.dev.yml up -d
cd backend
npm install
npm run migrate
npm run seed
npm run dev

// on another terminal tab

cd frontend
npm install
npm run dev
```

## About the Frontend

The structure of the site is quite simple, it consists of a:

- **home page**: '/' where you can search recipes by ingredient name and recipe name, and filter some recipes based on the ingredients they have.
- **recipe page**: '/recipe/:slug' where you can see the recipe details and add it to your favorites. all the recipe page are statically generated using ISG by Next.js
- **favorites page**: '/favorites' where you can see and handle all your favorite recipes (based on local storage)

### testing

The frontend is tested with Vitest + @testing-librarary stuff

```bash
npm run test
```

## The idea

The search input is the starting point of the search, the user can start typing something about the recipe name (eg "no" for "norma"), it could match the "norma" recipe and all the matching ingredients with "no"...(eg "no" for "pinoli" or "peperoncino").  

- if the user chooses a recipe, they will be redirected to the recipe page
- When the user selects an ingredient, it is added to the list of ingredients and the search is filtered based on the ingredients already in the list.

On the recipe card in the results or on the recipe page the user can add the recipe to the favourites list, the favourites list is managed using the browser's local memory.

All favourite recipes are displayed on the favourites page.
