# Trends Dashboard – Frontend

Interactive trends dashboard built with Vue 3, Pinia, Tailwind CSS, and ApexCharts.

## Setup

```sh
pnpm install
pnpm dev      # Dev server
pnpm build    # Production
pnpm lint     # Linting
```

## Features

- **Location dropdown**: Triggers updates on metric cards and trend chart.
- **Metric cards**: Displays five metrics, handles nulls with --, includes star rating.
- **Trend chart**: Chart with metric switching, gradients, shadows, grid lines.
- **UI/UX**: Fully responsive, Figma-compliant design, transitions, tooltips, loading states.

## Notes

- Data is local in public/.
- App loads with first location pre-selected.
- Local-only app; no backend or APIs required.
- Numbers are formatted (%, rounding) and missing values shown as "--".
- Chart uses time-based X-axis, with distinct color-coded lines for each metric.
- Includes component-based architecture and custom loading/transition animations.
- Bonus animated chart updates, tooltip on hover, custom star rating, vertical grid lines.
