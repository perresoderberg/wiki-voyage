# Wiki Voyage

**Wiki Voyage** is a React + TypeScript web application for exploring
people, places, organizations, events, concepts, works, and species
through data from **Wikipedia, Wikidata, and Wikimedia Commons**.

The application presents information from these Wikimedia projects in a
single interface, with a category-aware entity view, expandable Wikidata
properties, linked related entities, an image gallery, hierarchical
navigation, and a selectable visual theme.

---

## Features

### Explore knowledge through a hierarchical menu

Wiki Voyage starts with a structured exploration menu containing categories such as:

- Physics
- Biology
- Chemistry
- Psychology
- Linguistics
- Science Communication
- History
- Geography
- Organizations
- Works

Menu entries can contain multiple levels of submenus. Leaf entries
represent actual entities and contain metadata such as:

- Entity name
- Entity type
- Wikidata ID
- Wikipedia URL
- Optional concept type

The menu structure is stored in JSON rather than being hard-coded into React components.

### Entity information

Entities are classified into seven application-level types:

---

Entity type Example information

---

Person Birth/death, nationality, occupation, education, family

Place Country, continent, population, area, coordinates

Organization Headquarters, founder, leaders, employees, website

Event Dates, location, participants, organizers

Concept Classification, disciplines, causes, effects, relationships

Work Creator, publication date, genre, publisher, language

Species Scientific name, taxonomy, conservation status

---

The application uses TypeScript discriminated unions so that each entity
type can have its own strongly typed data model and UI.

### Wikipedia

The Wikipedia tab displays:

- Article title
- Description
- Introductory extract
- Link to the complete English Wikipedia article

Wikipedia data is retrieved through the Wikipedia REST API.

### Wikidata

The Wikidata integration has two layers.

#### Typed entity information

The main entity section maps selected Wikidata properties into an
entity-specific TypeScript model.

For example, a person can contain:

- Birth date
- Death date
- Place of birth
- Place of death
- Nationality
- Occupations
- Employers
- Education
- Awards
- Memberships
- Influences
- Residence
- Parents
- Spouse
- Children
- Siblings

Related Wikidata entities are represented by a `WikidataLink` containing:

```ts
type WikidataLink = {
  id: string;
  label: string;
  wikipediaUrl: string | null;
};
```

The UI displays the human-readable label rather than exposing Wikidata
Q-IDs as the primary user-facing text.

#### Generic Wikidata properties

The Wikidata tab also retrieves additional statements dynamically.

Each statement contains:

- Property ID
- Property label
- Value
- Optional value label
- Optional English Wikipedia article
- Value type (`item` or `literal`)

Statements are grouped by property and displayed together.

Properties with many values can be expanded and collapsed so that large
Wikidata records remain readable.

Some technical Wikidata properties are deliberately excluded from the
generic presentation, including:

- External IDs
- Commons media properties
- URL properties
- Permanent duplicate relationships
- Internal `.well-known/genid` values

### Wikimedia Commons image gallery

The Images tab retrieves images from Wikimedia Commons.

The gallery:

- Displays images horizontally
- Uses thumbnails where available
- Links each image to its Wikimedia Commons page
- Supports horizontal scrolling
- Provides left/right hover controls
- Continuously scrolls while the pointer remains over a control
- Displays multiple images per entity

The current entity page requests up to 30 Commons results.

### Multiple visual themes

Wiki Voyage uses CSS custom properties together with Tailwind CSS to
implement themes.

The project currently defines themes including:

- Default
- Forest
- Ocean
- Sunset
- Lavender
- Library
- Desert
- Matrix
- Space
- Synthwave
- Monochrome
- Royal
- Cyberpunk

Theme values are exposed to Tailwind through the `@theme` block in `index.css`.

The selected theme is applied to the document root through `data-theme` and persisted in `localStorage`.

### Navigation path

When an entity is selected, Wiki Voyage calculates its location in the
menu hierarchy and displays a navigation path such as:

```text
Explore → Physics → Physicists → Albert Einstein
```

This is calculated recursively from the menu tree.

### Menu interaction

The hierarchical menu supports:

- Hovering over categories to open submenus
- Clicking categories to open/close them
- Clicking leaf entries to select an entity
- Closing menus by clicking outside
- Closing menus with `Escape`

Menu items use recursive rendering, allowing the same component to
handle arbitrary submenu depth.

---

# Architecture

The application is deliberately divided into four main concerns:

```text
                    ┌─────────────────┐
                    │      App        │
                    └────────┬────────┘
                             │
             ┌───────────────┼────────────────┐
             │               │                │
             ▼               ▼                ▼
          Header       NavigationPath       Footer
             │
             ▼
           Menu
             │
             ▼
        MenuItem
             │
             │ entity selected
             ▼
        EntityPage
             │
       ┌─────┼─────────────┐
       │     │             │
       ▼     ▼             ▼
    Entity  Entity      SourceTabs
    Image   Info            │
            │        ┌──────┼───────┐
            │        ▼      ▼       ▼
            │    Wikipedia Wikidata Images
            │
            └── category-specific info
                ├── PersonInfo
                ├── PlaceInfo
                ├── OrganizationInfo
                ├── EventInfo
                ├── ConceptInfo
                ├── WorkInfo
                └── SpeciesInfo
```

The application follows a simple React component hierarchy rather than
introducing a global state-management library.

---

# Project structure

```text
.
├── README.md
├── dist/
│   └── ...                         # Production build output
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
│
└── src/
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    │
    ├── assets/
    │   ├── logo.png
    │   ├── react.svg
    │   └── vite.svg
    │
    ├── components/
    │   ├── Footer.tsx
    │   ├── ThemeSelector.tsx
    │   │
    │   ├── header/
    │   │   ├── Header.tsx
    │   │   ├── Logo.tsx
    │   │   ├── Menu.tsx
    │   │   └── MenuItem.tsx
    │   │
    │   └── main/
    │       ├── NavigationPath.tsx
    │       │
    │       └── entity/
    │           ├── EntityPage.tsx
    │           │
    │           ├── categories/
    │           │   ├── ConceptInfo.tsx
    │           │   ├── EventInfo.tsx
    │           │   ├── OrganizationInfo.tsx
    │           │   ├── PersonInfo.tsx
    │           │   ├── PlaceInfo.tsx
    │           │   ├── SpeciesInfo.tsx
    │           │   └── WorkInfo.tsx
    │           │
    │           ├── content/
    │           │   ├── ImageGallery.tsx
    │           │   ├── InfoComponents.tsx
    │           │   ├── SourceTabs.tsx
    │           │   ├── WikidataContent.tsx
    │           │   └── WikipediaContent.tsx
    │           │
    │           └── header/
    │               ├── EntityImage.tsx
    │               └── EntityInfo.tsx
    │
    ├── context/
    │   └── ThemeContext.tsx
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
    └── utils/
        └── menu.ts
```

---

# Data flow

Selecting an entity starts the main data-loading flow.

```text
menu.json
    │
    ▼
Menu
    │
    │ user clicks entity
    ▼
App
    │
    ▼
EntityPage
    │
    ├──────────────► Wikipedia REST API
    │                     │
    │                     ▼
    │                Article summary
    │
    ├──────────────► Wikimedia Commons API
    │                     │
    │                     ▼
    │                Image search
    │
    └──────────────► Wikidata SPARQL
                          │
                          ▼
                    Entity properties
                          │
                          ▼
                 Type-specific model
```

The entity page then passes the resulting data to the presentation
components.

---

# External APIs

## Wikipedia

Wiki Voyage uses the English Wikipedia REST API to retrieve article
summaries.

The application requests:

```text
/page/summary/{title}
```

The returned data is mapped to the application's `WikipediaArticle`
type:

```ts
type WikipediaArticle = {
  title: string;
  description: string | null;
  extract: string;
  wikipediaUrl: string;
  wikidataId: string | null;
  imageUrl: string | null;
};
```

---

## Wikidata

Wikidata is queried through its SPARQL endpoint.

The application builds a query containing the properties relevant to the
selected entity type.

Common properties include:

```text
P31  instance of
P279 subclass of
```

Additional properties depend on the entity type.

For example:

```text
Person
├── P569  birth date
├── P570  death date
├── P19   place of birth
├── P20   place of death
├── P106  occupation
├── P27   country of citizenship
├── P166  award
├── P108  employer
├── P69   educated at
├── P551  residence
├── P22   father
├── P25   mother
├── P26   spouse
├── P40   child
└── P3373 sibling
```

The API layer is responsible for transforming SPARQL bindings into
application-specific TypeScript objects.

This keeps SPARQL-specific details out of the React components.

---

## Wikimedia Commons

The Commons API is used to search for media in the file namespace.

The service returns:

```ts
type CommonsImage = {
  title: string;
  imageUrl: string;
  thumbnailUrl: string | null;
  width: number | null;
  height: number | null;
  pageUrl: string;
};
```

The UI consumes this application type rather than working directly with
the raw Commons API response.

---

# TypeScript model

The project uses a discriminated union for entity data:

```ts
type WikidataEntity =
  | WikidataPerson
  | WikidataPlace
  | WikidataOrganization
  | WikidataEvent
  | WikidataConcept
  | WikidataWork
  | WikidataSpecies;
```

The `type` property acts as the discriminator.

That allows React components to use a normal TypeScript `switch`:

```tsx
switch (entity.type) {
  case "person":
    return <PersonInfo person={entity} />;

  case "place":
    return <PlaceInfo place={entity} />;

  case "organization":
    return <OrganizationInfo organization={entity} />;

  // ...
}
```

TypeScript then knows which properties are available in each branch.

This is particularly useful for keeping the category-specific UI
strongly typed.

---

# Component responsibilities

## `App.tsx`

The application root.

Responsibilities:

- Holds the currently selected menu item
- Calculates the navigation path
- Renders the header, main content and footer
- Starts the entity page when an item is selected

---

## `Menu.tsx`

Owns menu interaction state.

Responsibilities:

- Tracks the currently open submenu path
- Opens menu levels
- Closes menu levels
- Detects clicks outside the navigation
- Handles `Escape`

---

## `MenuItem.tsx`

A recursive menu component.

A `MenuItem` renders itself and, when necessary, renders more `MenuItem`
components for its children.

This allows the menu hierarchy to be represented directly by the
recursive structure of `menu.json`.

---

## `EntityPage.tsx`

The main entity container.

It coordinates:

1.  Wikipedia data
2.  Wikimedia Commons images
3.  Wikidata data

It then composes:

```text
EntityPage
├── EntityImage
├── EntityInfo
└── SourceTabs
```

---

## `EntityInfo.tsx`

Selects the correct category-specific information component using the
entity discriminator.

```text
WikidataEntity
       │
       ├── person ─────────► PersonInfo
       ├── place ──────────► PlaceInfo
       ├── organization ───► OrganizationInfo
       ├── event ──────────► EventInfo
       ├── concept ────────► ConceptInfo
       ├── work ───────────► WorkInfo
       └── species ────────► SpeciesInfo
```

---

## `InfoComponents.tsx`

Contains reusable presentation components for entity metadata.

Examples:

- `InfoLabel`
- `InfoValue`
- `InfoRow`
- `InfoList`
- `InfoListRow`
- `InfoLink`
- `InfoLinkRow`
- `InfoLinkListRow`
- `InfoUrlRow`
- `ExpandCollapse`

This avoids duplicating the same label/value/link/expand-collapse
patterns across all entity categories.

---

## `SourceTabs.tsx`

Provides the three source views:

```text
WIKIPEDIA
WIKIDATA
IMAGES
```

Each tab delegates its content to a dedicated component.

---

# 🎨 Styling

The project uses **Tailwind CSS v4**.

Tailwind is integrated through the Vite plugin:

```ts
import tailwindcss from "@tailwindcss/vite";
```

and:

```ts
plugins: [react(), tailwindcss()];
```

The application also uses CSS custom properties for semantic theme
colors.

For example:

```css
--theme-background
--theme-surface
--theme-header
--theme-primary
--theme-text
--theme-border
--theme-link
--theme-hover
```

These are exposed to Tailwind through:

```css
@theme {
  --color-background: var(--theme-background);
  --color-surface: var(--theme-surface);
  --color-header: var(--theme-header);
  --color-primary: var(--theme-primary);
  --color-text: var(--theme-text);
  --color-border: var(--theme-border);
}
```

Components can therefore use semantic classes such as:

```text
bg-background
bg-surface
bg-header
text-text
text-text-muted
text-link
border-border
bg-hover
```

instead of hard-coding individual colors into components.

---

# Tech stack

Technology Purpose

---

React UI and component architecture
TypeScript Static typing and domain models
Vite Development server and build tooling
Tailwind CSS Styling
CSS custom properties Theme system
Wikipedia REST API Article summaries
Wikidata SPARQL Structured knowledge
Wikimedia Commons API Image search
ESLint Code quality and linting

Current package versions are defined in `package.json`.

The project currently uses React 19, TypeScript 6, Vite 8, Tailwind CSS
4 and ESLint 10. fileciteturn84file0L49-L76

---

# Getting started

## Prerequisites

Install:

- Node.js
- npm

Check the installed versions:

```bash
node --version
npm --version
```

---

## Installation

Clone or copy the project and install dependencies:

```bash
npm install
```

---

## Start the development server

```bash
npm run dev
```

Vite will start the development server and display the local URL in the
terminal.

Open that URL in a browser.

---

# Production build

Create a production build:

```bash
npm run build
```

The build performs TypeScript checking followed by the Vite production
build:

```text
tsc -b
    ↓
vite build
    ↓
dist/
```

The generated `dist` directory contains the deployable application.

---

# Linting

Run ESLint:

```bash
npm run lint
```

The project uses:

- ESLint recommended rules
- TypeScript ESLint
- React Hooks rules
- React Refresh rules

The `dist` directory is ignored by ESLint.

---

# Preview the production build

After building:

```bash
npm run preview
```

This starts Vite's local preview server for the generated production
build.

---

# Adding a new entity

A typical new entity requires changes in several places.

## 1. Add the entity to `menu.json`

Provide at least:

```json
{
  "title": "Example",
  "id": "example",
  "entityType": "person",
  "wikidataId": "Q123"
}
```

For concepts, an optional `conceptType` can also be supplied.

---

## 2. Add the entity type if necessary

Entity types are defined in:

```text
src/types/wikidata.ts
```

Currently:

```text
person
place
organization
concept
event
work
species
```

---

## 3. Add Wikidata properties

The Wikidata service maintains a property configuration for each entity
type.

For example:

```ts
{
  id: "P569",
  name: "birthDate"
}
```

The service uses these definitions when constructing the SPARQL query.

---

## 4. Add or update the TypeScript model

Entity-specific fields belong in the corresponding type:

```text
WikidataPerson
WikidataPlace
WikidataOrganization
WikidataEvent
WikidataConcept
WikidataWork
WikidataSpecies
```

---

## 5. Add the UI

Create or modify the corresponding component in:

```text
src/components/main/entity/categories/
```

For example:

```text
PersonInfo.tsx
```

---

# Design principles

The project intentionally keeps responsibilities separated.

### Components should present data

React components should primarily decide:

- What to render
- How to render it
- How the user interacts with it

They should not contain large amounts of API parsing logic.

### Services should handle external APIs

The service layer contains:

```text
commons-api.ts
wikidata-api.ts
wikipedia-api.ts
```

These modules are responsible for:

- Building requests
- Calling external APIs
- Checking responses
- Parsing external data
- Mapping external data into application types

### Types describe application data

The `types` directory provides the contracts used between services and
components.

This keeps API-specific response formats separate from the application's
UI model.

### Entity type is an application concern

The entity categories are designed around how Wiki Voyage presents
information.

They are not intended to reproduce the entire Wikidata ontology.

Wikidata remains the underlying source of structured information.

### Keep generic Wikidata data generic

The generic Wikidata view does not attempt to predict every possible
Wikidata property.

Instead, it retrieves additional statements dynamically and presents
them grouped by property.

This means the application can expose information that is not explicitly
modeled in the category-specific UI.

---

# Linking related entities

When a Wikidata property points to another Wikidata item, the
application attempts to obtain:

```text
Wikidata ID
        +
English label
        +
English Wikipedia article, if available
```

The UI then displays the label as a link.

For example:

```text
Residence     Down House
```

rather than exposing an internal Wikidata URI directly.

If no English Wikipedia article exists, the application can fall back to
the Wikidata entity page.

---

# Responsive and reusable UI

The entity information components use a shared label/value layout.

Typical structure:

```text
┌──────────────────┬────────────────────────────────────┐
│ Birth date       │ 14 March 1879                      │
│ Place of birth   │ Ulm                                │
│ Nationality      │ German                             │
│ Occupations      │ Physicist, Professor               │
└──────────────────┴────────────────────────────────────┘
```

Lists of related entities can use multiple columns when there are
several values.

Long lists are collapsed initially and can be expanded by the user.

---

# Current limitations

This project is intentionally lightweight and currently has some areas that can be improved.

### Error handling

`EntityPage` currently performs several asynchronous API calls directly
and does not yet provide a complete user-facing error state for every
failure scenario.

A production application could distinguish between:

- Wikipedia unavailable
- Wikidata unavailable
- Commons unavailable
- Entity not found
- Network failure
- API rate limiting

### Loading states

The current loading experience is intentionally simple.

More polished loading states could use:

- Skeleton components
- Independent loading states for each source
- Partial rendering when one source is unavailable

### API calls

The application calls Wikimedia APIs directly from the browser.

A larger production application could introduce a backend/API layer for:

- Caching
- Rate limiting
- Request aggregation
- Server-side error handling
- API monitoring

### Menu search

The current application uses a predefined exploration tree.

A future version could provide direct entity search instead of requiring users to navigate the menu.

### Theme typing

The theme selector and CSS contain more theme names than the current `Theme` union in `ThemeContext.tsx`.

Before extending the theme system further, the list of valid themes
should be centralized so that the selector, TypeScript type, and CSS
remain synchronized.

---

# Possible future improvements

Potential extensions include:

- Search for any Wikipedia/Wikidata entity
- Interactive maps for geographic entities
- Wikidata statistics and visualizations
- Entity relationship graphs
- Improved dark/light theme handling
- More mobile-specific navigation
- Client-side caching
- Parallel API requests
- Automated tests
- Accessibility improvements
- More Wikimedia projects
- Support for additional Wikipedia languages
- Browser history integration
- Shareable entity URLs
- Favorites/bookmarks

---

# 📚 Learning goals

Wiki Voyage is also a practical learning project.

It provides experience with:

- React component composition
- React state and effects
- Context API
- TypeScript discriminated unions
- Type-safe props
- Recursive React components
- Fetching REST APIs
- Working with SPARQL
- Mapping external data into domain models
- Tailwind CSS
- CSS custom properties
- Theme systems
- Responsive layouts
- Asynchronous UI
- ESLint
- Vite
- Modern frontend project structure

The project is intentionally structured so that the UI, domain types,
API services, and static data have clear responsibilities.

---

# 📜 Available npm scripts

```bash
npm run dev
```

Start the Vite development server.

```bash
npm run build
```

Type-check and create a production build.

```bash
npm run lint
```

Run ESLint.

```bash
npm run preview
```

Preview the production build locally.

These scripts are defined in `package.json`.
fileciteturn84file0L53-L57

---

# 📄 License

No license has been specified for the project yet.

If this project is going to be published publicly, add an appropriate
license here.

---

# 🙌 Credits

Wiki Voyage builds on publicly available Wikimedia data and APIs:

- Wikipedia
- Wikidata
- Wikimedia Commons

The project is a frontend application that presents and combines
information from these sources into a single exploratory interface.

---

**Wiki Voyage --- Explore knowledge. Follow connections.**
