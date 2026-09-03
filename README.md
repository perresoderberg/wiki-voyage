# Wiki Voyage

Wiki Voyage is a React-based exploration application that makes discovering Wikipedia content more guided and visual.

Instead of starting with a search term, the user can navigate through categories and subcategories using a cascading menu and select an entity to explore.
Wiki Voyage then combines information from **Wikipedia**, **Wikidata**, and **Wikimedia Commons**.

## Purpose

Wikipedia contains a huge amount of information, but discovering something interesting often requires the user to already know what they want to search for.

Wiki Voyage explores an alternative approach:

> **Navigate through categories → select an entity → explore its information.**

For example:

```text
Science
  └── Physics
       └── Physicists
            └── Albert Einstein
```

Selecting Albert Einstein retrieves information from Wikimedia projects and presents it in a single entity page.

## Main Features

- Hierarchical cascading navigation menu
- Predefined categories and entities stored in JSON
- Entity selection without leaving the page
- Navigation path showing the current location
- Wikipedia article summaries
- Structured information from Wikidata
- Images from Wikimedia Commons
- Source tabs for Wikipedia, Wikidata, and Images
- Responsive layout
- Reusable React components

## Technologies

- React
- TypeScript
- Vite
- Tailwind CSS
- Wikipedia REST API
- Wikidata SPARQL API
- Wikimedia Commons API

## Project Structure

```text
src/
├── components/
│   ├── Footer.tsx
│   ├── header/
│   │   ├── Logo.tsx
│   │   ├── Menu.tsx
│   │   └── MenuItem.tsx
│   └── main/
│       ├── NavigationPath.tsx
│       └── entity/
│           ├── EntityPage.tsx
│           ├── header/
│           │   ├── EntityImage.tsx
│           │   └── EntityInfo.tsx
│           └── content/
│               ├── ImageGallery.tsx
│               ├── SourceTabs.tsx
│               ├── WikidataContent.tsx
│               └── WikipediaContent.tsx
│
├── data/
│   └── menu.json
│
├── services/
│   ├── commons-api.ts
│   ├── wikidata-api.ts
│   └── wikipedia-api.ts
│
├── types/
│   ├── commons.ts
│   ├── menu.ts
│   ├── wikidata.ts
│   └── wikipedia.ts
│
├── utils/
│   └── menu.ts
│
├── App.tsx
├── index.css
└── main.tsx
```

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

### Included

- Category-based navigation
- Entity selection
- Wikipedia integration
- Wikidata integration
- Wikimedia Commons integration
- Basic entity presentation
- Images
- Responsive UI

### Not included in the initial version

- User accounts
- Favorites
- User-generated categories
- Advanced search
- Database
- Caching layer

## Architecture

The application separates responsibilities between components, services, types, and data.

**Components** are responsible for presentation and user interaction.

**Services** handle communication with external APIs.

**Types** describe application and API data.

**JSON data** defines the navigation structure independently from the React components.

This keeps the UI independent from the details of the external Wikimedia APIs and makes it easier to extend the application with additional entity types and information sources.
