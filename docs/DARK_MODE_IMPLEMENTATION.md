# Dark Mode Implementation

This document describes the dark mode implementation added to the e-commerce project.

## Features

✅ **Theme Toggle Button** - Located in the navbar next to language selector  
✅ **Persistent Theme Storage** - Theme preference saved in localStorage  
✅ **Ant Design Integration** - Full support for Ant Design components  
✅ **Tailwind CSS Integration** - Dark mode classes and CSS variables  
✅ **Smooth Transitions** - 200ms transition animations between themes  
✅ **System Integration** - Updates meta theme-color for mobile browsers

## Implementation Details

### 1. Theme Store (`src/store/useThemeStore.tsx`)

- Uses Zustand for state management
- Persists theme preference in localStorage
- Automatically applies theme classes to document root

### 2. Theme Provider (`src/components/layout/themeProvider.tsx`)

- Initializes theme on app startup
- Updates meta theme-color for mobile browsers
- Handles theme persistence and hydration

### 3. Theme Toggle (`src/components/navbar/navIcons/themeToggle.tsx`)

- Toggle button with light/dark mode icons
- Accessible with proper ARIA labels
- Smooth hover animations

### 4. Styling Updates

#### Tailwind Configuration

- Added `darkMode: "class"` configuration
- Extended color palette with dark mode colors
- CSS variables for consistent theming

#### Global Styles

- CSS variables for light and dark themes
- Dark mode scrollbar styling
- Smooth color transitions

#### Component Updates

- **Navbar**: Dark background and borders
- **Footer**: Dark theme support
- **Product Cards**: Dark backgrounds and text
- **Chat Components**: Dark modal and input styling
- **Container**: Base dark mode styling

## Usage

### For Users

1. Click the moon/sun icon in the navbar to toggle themes
2. Theme preference is automatically saved
3. Theme persists across browser sessions

### For Developers

#### Using Theme in Components

```tsx
import useThemeStore from "@/store/useThemeStore";

const MyComponent = () => {
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === "dark";

  return <div className="bg-white dark:bg-dark-bg">Content</div>;
};
```

#### Available Dark Mode Classes

- `dark:bg-dark-bg` - Main dark background
- `dark:bg-dark-bg-secondary` - Secondary dark background
- `dark:bg-dark-bg-tertiary` - Tertiary dark background
- `dark:text-dark-text` - Primary dark text
- `dark:text-dark-text-secondary` - Secondary dark text
- `dark:border-dark-border` - Dark borders

#### CSS Variables

```css
/* Light theme */
--background: #ffffff;
--foreground: #0f172a;
--card: #ffffff;
--primary: #f35c7a;

/* Dark theme */
--background: #0f172a;
--foreground: #f8fafc;
--card: #1e293b;
--primary: #f35c7a;
```

## Browser Support

- ✅ Modern browsers with CSS custom properties support
- ✅ Mobile browsers (with meta theme-color updates)
- ✅ RTL language support maintained
- ✅ Accessibility compliant

## Performance

- Minimal runtime overhead
- CSS-based transitions for smooth performance
- Efficient Zustand store with persistence
- No layout shifts during theme changes

## Run this command for list files includes white backgrounds or gray text colors classes:

cd src && find . -name "\*.tsx" -exec grep -l "bg-white\|text-gray" {} \; | head -10
