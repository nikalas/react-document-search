# React document search and filter demo

This is a demo of a document search and filter using React. The documents and categories are loaded from an external REST API.

There is a translate [ function ](src/components/translations.jsx) that fetches UI strings from another REST endpoint, but this has been disabled for the demo project.

External libraries used:

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [tailwindcss](https://tailwindcss.com/)
- [react-select](https://github.com/jedwatson/react-select)

## Installation

```bash
npm install
```

## Running

```bash
npm run dev
```

## Lessons learned

- Debouncing is important. Use it.
- Don't try to implement your own caching.

Both of these can and should be solved by using [TanStack Query](https://tanstack.com/query/latest).

- Use different layout components for mobile and larger table views. Sure this was good experience, but just bad practice.
- Do. not. try. custom. tags! This was just plain stupid.
