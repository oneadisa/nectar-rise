# The Evolution of Nectar: Building a Modern React Native E-commerce App

When I first set out to build Nectar, I had a clear vision in mind: create a beautiful, performant e-commerce app that would make grocery shopping a delightful experience. Looking back at the journey, I'm proud of the architectural and design decisions we made together to bring this vision to life.

## Starting with a Strong Foundation

We chose Expo as our foundation, which proved to be an excellent decision. The ability to quickly iterate across multiple platforms without getting bogged down in native configuration details allowed us to focus on what mattered most - creating an exceptional user experience. The file-based routing system provided by Expo Router simplified navigation management considerably, letting us organize our screens in a way that mirrors the user's journey through the app.

## Component Architecture: Reusability and Consistency

One of the key decisions we made early on was to establish a robust component architecture. We organized our components into logical categories:

- **UI components**: Basic building blocks like `ThemedText`, `ThemedView`, and `CustomButton`
- **Figma components**: SVG-based visual elements like Carrot, `LocationPin`, and other icons
- **Cards**: Reusable product and category display components
- **Buttons**: Various interactive elements with consistent styling

This modular approach paid dividends throughout development. When we needed to update the visual language of the app, we could make changes in one place rather than hunting through the codebase for every instance. The SVG components imported from Figma ensured pixel-perfect rendering across devices while keeping our bundle size manageable.

## State Management: Context API for the Win

We debated various state management solutions, but ultimately settled on React's Context API for managing cart and favorites functionality. This decision struck the right balance between simplicity and power:

```jsx
<CartProvider>
  <FavoritesProvider>
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {/* App content */}
    </ThemeProvider>
  </FavoritesProvider>
</CartProvider>

By nesting these providers, we created a clean hierarchy of state that any component could access. This approach eliminated prop drilling while avoiding the complexity of Redux or other external state management libraries.

Thoughtful Navigation Structure
The apps navigation structure reflects careful consideration of the user journey. We implemented a tab-based main navigation for quick access to key sections, while using stack navigation for deeper flows like product details and checkout.

The onboarding flow exists in its own navigation stack, ensuring new users get a smooth introduction to the app before entering the main experience. This separation of concerns made the codebase more maintainable and the user experience more intuitive.

Performance Optimizations
Performance was always a priority. We implemented several optimizations:

Custom hooks: Creating hooks like useColorScheme allowed us to centralize logic and reduce re-renders
Lazy loading: Components and screens load only when needed
Reanimated: For smooth, native-thread animations that don't block the JS thread
SVG optimization: Using react-native-svg-transformer to efficiently handle vector graphics
These decisions resulted in a responsive app that feels native on both iOS and Android platforms.

Design System and Visual Language
The consistent use of custom fonts (Gilroy family) and a carefully curated color palette gives Nectar its distinctive visual identity. We implemented a theming system that supports both light and dark modes, ensuring the app looks great regardless of user preference.

The product detail screens showcase our attention to detail, with subtle animations, parallax effects, and thoughtful micro-interactions that make browsing products a joy rather than a chore.

Looking Forward
As we continue to evolve Nectar, I'm excited about the foundation we've built. The modular architecture will make it easy to add new features, while our performance optimizations ensure the app will remain snappy even as we scale.

The decisions we made weren't always the easiest path forward, but they were the right ones for creating a sustainable, maintainable codebase that delivers an exceptional user experience. From the custom SVG components to the context-based state management, each choice reflects our commitment to quality and craftsmanship.

In the end, that's what makes Nectar special - not just what users see on the surface, but the care and thought that went into every line of code beneath it.
