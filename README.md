# 🐾 Pawfolio

A pet image gallery built with React and TypeScript. Browse, search, sort, select and download pet photos from a live API.

**Live Link :** [PawFolio](https://pets-portfolio.netlify.app/)

---

## Features

- **Gallery view** : Pets Images with their description displayed in a responsive 4-column grid (2 on tablet, 1 on mobile)
- **Search** :  Real-time filtering across pet name and description
- **Sort** : Name A–Z, Name Z–A, Newest first, Oldest first
- **Select & download** : Checkbox select individual pets, select all, bulk download
- **Persistent selection** : Selections survive navigation between gallery and detail pages
- **Pagination** : 8 pets per page are shown.
- **Detail page** : Full image, description, date, single download, and related pets
- **Loading states** : Shimmer skeleton UI while data fetches
- **Error & empty states** : Handled error and added Empty state UI.
- **About page** : Project overview and Developer profile

---

## Tech Stack

- React 19
- TypeScript
- styled-components
- React Router v7
- React Context + useReducer
- Fetch API

---

## Project Structure

```
src/
├── components/
│   ├── ErrorState/           
│   ├── Navbar/       
│   ├── SearchBar/    
│   ├── ShimmerUI/        
│   └── SortControls/ 
├── context/
│   ├── selectionContext.ts        
│   └── SelectionProvider.tsx       
├── hooks/
│   ├── useDownload.ts        
│   ├── usePets.ts        
│   └── useSelection.ts    
├── pages/
│   ├── AboutMe.tsx         
│   ├── Gallery.tsx    
│   ├── Home.tsx      
│   └── PetDetails.tsx       
├── theme/
│   ├── globalStyle.ts          
│   └── theme.ts  
├── types/
│   └── pet.ts        
└── utils/
    └── filter.ts    
```

---

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/prajapati-priyanka/Pet-Gallery.git
cd pet-gallery

# Install dependencies
npm install

# Start the development server
npm start
```

---

## API

```
GET https://eulerity-hackathon.appspot.com/pets
```

Returns an array of pet objects:

```json
[
  {
    "title": "Buddy",
    "description": "A friendly golden retriever who loves fetch.",
    "url": "https://images.pexels.com/...",
    "created": "Tue Apr 21 05:37:38 UTC 2026"
  }
]
```

---

## Author

**Priyanka**
Frontend Developer — ReactJS | JavaScript | TypeScript | Styled Component

---

## Submission

Built as part of the Eulerity Frontend Take-Home Challenge.