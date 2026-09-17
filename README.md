# Wiki Voyage

Wiki Voyage is a React and TypeScript web application for exploring knowledge through **Wikipedia, Wikidata, and Wikimedia Commons**.

The application presents different kinds of entities—such as people, places, organizations, events, concepts, works, and species—through a common interface while allowing each entity type to display information relevant to it.

## Problem and Target Audience

Wikipedia is excellent for reading articles, while Wikidata provides structured information and relationships between entities. However, the structured nature of Wikidata can make it less intuitive to explore directly.

Wiki Voyage combines these sources into a simple browsing experience:

- **Wikipedia** provides readable article summaries.
- **Wikidata** provides structured facts and relationships.
- **Wikimedia Commons** provides images and media.
- A hierarchical navigation menu makes it possible to explore predefined topics and entities.

The project is primarily aimed at:

- People who want to explore knowledge interactively.
- Developers interested in consuming public knowledge APIs.
- Students learning React, TypeScript, APIs, and component-based frontend architecture.
- Recruiters and developers who want to see an example of a modern React application.

## Features

### Entity exploration

Entities are organized into categories such as:

- People
- Places
- Organizations
- Events
- Concepts
- Works
- Species

The application uses a shared entity page while providing specialized information components for each entity type.

### Multiple data sources

Each entity can combine information from three Wikimedia projects:

- **Wikipedia** – article summaries and readable content.
- **Wikidata** – structured information and relationships.
- **Wikimedia Commons** – image galleries.

### Wikidata and SPARQL

Wikidata is queried using **SPARQL**.

The application retrieves structured properties such as:

- Instance of
- Subclass of
- Birth and death information
- Occupations
- Nationality
- Locations
- Organizations
- Dates
- Relationships between entities

Item-valued Wikidata properties are represented as typed links. Where an English Wikipedia article exists, the value can link directly to that article.

### Responsive UI

The interface uses responsive layouts and reusable components to adapt the presentation to different screen sizes.

### Expandable information

Properties with many values can be collapsed and expanded so that large amounts of Wikidata information do not overwhelm the page.

### Image gallery

Images from Wikimedia Commons are presented in a horizontally scrollable gallery.

### Theme system

The application includes a theme selector with multiple visual themes.

Themes are implemented using:

- React Context
- CSS custom properties
- Tailwind CSS

The selected theme is also stored in `localStorage`.

### Navigation path

A navigation path shows where the selected entity is located in the application's topic hierarchy.

## Demo

**Live application:**

https://jolly-desert-0090d2903.6.azurestaticapps.net/

The application is deployed as an Azure Static Web App.

## Screenshots

The application is primarily intended to be experienced through the live deployment above.

## Technology Choices

### React

React is used to build the user interface from reusable components.

The application separates concerns into components such as Header, Navigation, Entity Page, Entity Information, Source Tabs, Image Gallery, Footer, and Theme Selector.

### TypeScript

TypeScript is used for static typing throughout the application.

The project defines explicit models for Wikidata entities, Wikidata links and statements, Wikipedia data, Wikimedia Commons images, and menu items. This makes data returned by external APIs easier to work with safely inside React components.

### Vite

Vite is used as the development server and build tool. The production build is generated in the `dist` directory.

### Tailwind CSS

Tailwind CSS is used for most UI styling. CSS custom properties provide theme-specific values for backgrounds, surfaces, text, borders, links, hover states, and active states.

### SPARQL and Wikidata Query Service

SPARQL is used to query the Wikidata knowledge graph. Instead of treating Wikidata like a traditional relational database, the application queries relationships between entities and properties.

### Public APIs

The application communicates directly with public Wikimedia APIs:

- Wikipedia API
- Wikidata Query Service
- Wikimedia Commons API

No application backend is required for the current version.

### ESLint

ESLint is configured for TypeScript and React, including React Hooks and React Refresh rules. TypeScript is also configured with checks such as `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch`.

## Architecture

The application follows a component-based architecture.

```text
App
├── Header
│   ├── Logo
│   ├── Menu
│   └── ThemeSelector
├── NavigationPath
├── EntityPage
│   ├── EntityImage
│   ├── EntityInfo
│   │   ├── PersonInfo
│   │   ├── PlaceInfo
│   │   ├── OrganizationInfo
│   │   ├── EventInfo
│   │   ├── ConceptInfo
│   │   ├── WorkInfo
│   │   └── SpeciesInfo
│   └── SourceTabs
│       ├── WikipediaContent
│       ├── WikidataContent
│       └── ImageGallery
└── Footer
```

API communication is separated from UI components through service modules:

```text
src/
├── components/
├── context/
├── data/
├── services/
│   ├── commons-api.ts
│   ├── wikidata-api.ts
│   └── wikipedia-api.ts
├── types/
└── utils/
```

This keeps external API logic separate from presentation components.

## Data Flow

```text
Menu selection
      ↓
   EntityPage
      ↓
 ┌────┴───────────────┐
 ↓                    ↓
Wikipedia          Wikidata
 ↓                    ↓
Article data       SPARQL data
                      ↓
                Typed entity model
                      ↓
                Entity information

Entity
  ↓
Wikimedia Commons
  ↓
Image gallery
```

The application uses different external sources for different purposes rather than trying to retrieve all information from one API.

## Local Setup

### Prerequisites

Install:

- Node.js
- npm

The project does not require a separate backend or database.

### Clone the repository

```bash
git clone https://github.com/perresoderberg/wiki-voyage.git
cd wiki-voyage
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite will start a local development server, normally at:

```text
http://localhost:5173/
```

### Build for production

```bash
npm run build
```

The production files are generated in:

```text
dist/
```

### Preview the production build

```bash
npm run preview
```

### Run ESLint

```bash
npm run lint
```

## Project Structure

```text
src/
├── App.tsx
├── main.tsx
├── index.css
├── assets/
│   └── logo.png
├── components/
│   ├── Footer.tsx
│   ├── ThemeSelector.tsx
│   ├── header/
│   │   ├── Header.tsx
│   │   ├── Logo.tsx
│   │   ├── Menu.tsx
│   │   └── MenuItem.tsx
│   └── main/
│       ├── NavigationPath.tsx
│       └── entity/
│           ├── EntityPage.tsx
│           ├── categories/
│           ├── content/
│           └── header/
├── context/
│   └── ThemeContext.tsx
├── data/
│   └── menu.json
├── services/
│   ├── commons-api.ts
│   ├── wikidata-api.ts
│   └── wikipedia-api.ts
├── types/
│   ├── commons.ts
│   ├── menu.ts
│   ├── wikidata.ts
│   └── wikipedia.ts
└── utils/
    └── menu.ts
```

## Known Limitations

### Dependence on external APIs

The application depends on public Wikimedia services. If an API is unavailable, slow, rate-limited, or returns unexpected data, some parts of an entity page may fail to load.

### Wikidata data is inconsistent

Wikidata is community-maintained and not every entity contains the same properties or level of detail. Some fields may therefore be missing, while other entities may have many values for the same property.

### SPARQL query complexity

Wikidata queries can become expensive when retrieving many relationships at once. Complex queries may take longer to execute or can occasionally fail at the Wikidata Query Service.

### Predefined navigation

The current application uses a predefined menu structure in `menu.json`. It is not currently a general-purpose Wikipedia search engine.

### No application backend

API calls are made from the browser. There is currently no custom backend for caching, authentication, API aggregation, request throttling, or persistent application data.

### English Wikipedia links

The application uses English Wikipedia links when an English article exists for a linked Wikidata entity. Other language editions are not currently selected dynamically.

### Theme configuration

Themes are currently defined in CSS and the available theme options are selected in the React UI. The theme configuration could be centralized further to reduce duplication.

## Possible Next Steps

### Search

Add a search field allowing users to search for arbitrary Wikipedia/Wikidata entities instead of relying only on the predefined menu.

### Better API error handling

Improve loading and error states for each individual data source so that one failed API does not affect the presentation of the other sources.

### Caching

Add client-side caching to avoid repeatedly requesting the same Wikidata, Wikipedia, or Commons data.

### More languages

Allow users to choose the Wikipedia/Wikidata language used for labels and article links.

### More entity types

Extend the common entity architecture with additional categories and more specialized Wikidata properties.

### URL-based navigation

Store the selected entity in the URL so that pages can be bookmarked and shared directly.

### Improved accessibility

Continue improving keyboard navigation, semantic HTML, labels, focus states, and screen-reader support.

### Automated testing

Add unit and component tests for API mapping, Wikidata parsing, menu traversal, React components, and theme handling.

### API abstraction

If the application grows, introduce a small backend or API layer for caching, request aggregation, and better control over external service calls.

## Learning and Development Process

This project was built as a learning project with a focus on understanding React, TypeScript, external APIs, structured data, and frontend architecture.

An important part of the development process was learning how to work with Wikidata rather than simply consuming a traditional REST API.

The project required understanding:

- React component composition
- TypeScript union types and interfaces
- React state and context
- Async data fetching
- SPARQL queries
- RDF-style relationships
- Mapping external API responses into application-specific models
- Responsive UI design
- Tailwind CSS
- CSS custom properties
- Client-side persistence with `localStorage`
- Production builds and deployment

AI was used as a development aid for explanations, debugging, design discussions, and implementation guidance. The goal was to use AI to understand the underlying concepts and code rather than treating generated code as a black box.

## Deployment

The application is deployed using **Azure Static Web Apps**.

https://jolly-desert-0090d2903.6.azurestaticapps.net/

The production workflow is:

```text
Git repository
      ↓
Push to main
      ↓
GitHub Actions
      ↓
npm install / build
      ↓
Vite production build
      ↓
Azure Static Web Apps
```

The Vite build output directory is `dist`.

## License

This project is a personal educational and portfolio project.

The application uses data and services provided by Wikimedia projects. Their respective terms, licenses, and attribution requirements apply to content retrieved from those services.

## Author

**Per Söderberg**

Fullstack / .NET Developer transitioning into modern frontend development with React and TypeScript.
