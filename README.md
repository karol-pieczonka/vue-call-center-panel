# Call Center Panel

Web application for managing customer support tickets in a call center.

**🚀 Live demo:**: [https://vue-call-center-panel.vercel.app/](https://vue-call-center-panel.vercel.app/)

## Tech Stack

- Vue 3 (Composition API)
- Pinia (state management)
- Vue Router
- TypeScript
- Sass
- Vitest (unit testing)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Production build
npm run build
```

## Testing

```bash
# Run unit tests
npm run test:unit
```

## Project Structure

```
src/
├── __tests__/           # Unit tests
├── components/
│   ├── common/          # Shared components
│   └── tickets/         # Ticket-related components
├── mocks/               # Mock data
├── views/               # Page views
├── stores/              # Pinia stores
├── services/            # API layer
├── utils/               # Helper functions
├── types/               # TypeScript types
└── styles/              # Global SCSS styles
```

## Features

- Ticket list with status filtering (All, New, In Progress, Closed)
- Ticket details view with full information
- Status change functionality
- Responsive design (table on desktop, cards on mobile)
- Loading states and error handling
