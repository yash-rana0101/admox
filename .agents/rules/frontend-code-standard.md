---
trigger: always_on
---

# Frontend Development Rules & Standards

## Core Principles

### 1. Component First Architecture

* Always create reusable components before writing page-specific UI.
* Avoid duplicate code.
* If a UI element appears more than once, convert it into a reusable component.

Examples:

* Button
* Input
* Select
* Modal
* Card
* Table
* Badge
* Avatar
* Loader
* Empty State
* Alert
* Tooltip
* Dialog

---

## Maximum File Size

### Rule

A single file should NEVER exceed:

* 300 lines maximum
* Preferred: 150-250 lines

### If file exceeds 300 lines:

Break into:

```text
Feature/
├── components/
├── hooks/
├── services/
├── types/
├── constants/
├── utils/
└── page.tsx
```

---

## Page Structure

### Bad

```tsx
DashboardPage.tsx
- API Calls
- State Management
- Tables
- Forms
- Charts
- Modals
- Business Logic
```

### Good

```text
Dashboard/
├── page.tsx
├── components/
│   ├── StatsCard.tsx
│   ├── UserTable.tsx
│   ├── RevenueChart.tsx
│   └── FilterPanel.tsx
├── hooks/
│   └── useDashboard.ts
├── services/
│   └── dashboard.service.ts
└── types/
```

---

# UI Development Rules

## Never Write Raw UI Repeatedly

### Wrong

```tsx
<button>
<button>
<button>
<button>
```

### Correct

```tsx
<Button />
```

---

### Wrong

```tsx
<div className="card">
...
</div>
```

Repeated across project.

### Correct

```tsx
<Card>
...
</Card>
```

---

## Mandatory Reusable Components

Create these first before building pages.

### Foundation Components

```text
components/ui/

Button
Input
Textarea
Select
Checkbox
Radio
Switch
Badge
Avatar
Tooltip
Modal
Drawer
Tabs
Dropdown
Skeleton
Loader
Alert
Toast
```

---

### Layout Components

```text
components/layout/

Navbar
Sidebar
Header
Footer
Container
PageWrapper
Section
```

---

### Data Components

```text
components/data/

DataTable
Pagination
SearchBar
FilterPanel
EmptyState
```

---

### AI Components

```text
components/ai/

ChatMessage
ChatInput
ThinkingLoader
AIResponseCard
PromptBox
```

---

## State Management Rules

### Never

```tsx
const [data1]
const [data2]
const [data3]
const [data4]
const [data5]
```

inside giant components.

### Use

Custom Hooks

```tsx
useDashboard()
useUsers()
useTradingSignals()
useAuth()
```

---

## API Rules

### Never

```tsx
fetch(...)
```

inside UI components.

### Always

```text
services/
```

Example:

```tsx
services/user.service.ts
services/auth.service.ts
services/trading.service.ts
```

UI should only consume services.

---

## Business Logic Rules

### Never

```tsx
Page Component
  ├── API Logic
  ├── Validation Logic
  ├── Data Transformation
  └── UI
```

### Always

```text
utils/
hooks/
services/
```

Keep pages clean.

---

## Folder Structure

```text
src/

app/

components/
│
├── ui/
├── layout/
├── forms/
├── charts/
├── tables/
├── ai/
└── shared/

hooks/

services/

store/

types/

constants/

utils/

assets/

lib/
```

---

## Component Design Pattern

### Structure

```tsx
interface ComponentProps {}

export function ComponentName({
 props
}: ComponentProps) {

 return (
   <div>
     UI
   </div>
 )
}
```

---

## Styling Rules

### Use

```tsx
Tailwind
```

### Avoid

```tsx
Inline CSS
```

Bad:

```tsx
style={{}}
```

---

## Props Rules

### Never

```tsx
<Component
 a
 b
 c
 d
 e
 f
 g
 h
 i
/>
```

More than 7 props.

### Instead

```tsx
<Component
 config={config}
/>
```

or

```tsx
<Component
 user={user}
/>
```

---

## Forms

Every form must have:

```text
Validation
Loading State
Error State
Success State
```

Use:

```tsx
React Hook Form
Zod
```

---

## Data Fetching

Use:

```tsx
TanStack Query
```

Never manually manage:

```tsx
Loading
Error
Refetch
Caching
```

for every page.

---

## Performance Rules

### Always

```tsx
React.memo
useMemo
useCallback
Lazy Loading
Dynamic Imports
```

when required.

---

## Code Review Checklist

Before committing:

### Component

* Is it reusable?
* Can it be split further?
* Is file under 300 lines?

### API

* Is service separated?

### Logic

* Is business logic outside UI?

### Performance

* Unnecessary rerenders removed?

### Types

* Fully typed?

### Accessibility

* Labels added?
* Keyboard navigation works?

---

## Golden Rule

When creating UI:

1. Build reusable UI components first.
2. Assemble pages using components.
3. Keep files below 300 lines.
4. Keep business logic outside components.
5. Keep API calls inside services.
6. Keep state inside hooks/store.
7. Never duplicate UI code.
8. Think like a design system engineer, not a page builder.

If a component becomes too large:

```text
Split It.
```

If code is duplicated:

```text
Create Component.
```

If page becomes complex:

```text
Create Feature Module.
```
