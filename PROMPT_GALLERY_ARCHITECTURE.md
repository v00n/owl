# Prompt Gallery: App Architecture & Design

This document outlines the application architecture, database schema, and design principles for the Prompt Gallery app.

## 1. Database Schema (Firestore)

We'll use Firestore collections to organize the data. Here are the main collections and their data structures:

### `prompts` collection
This is the core collection for all the prompts in the gallery. Each document represents a single prompt.

-   **promptId** (Document ID): `string` (auto-generated)
-   **title**: `string` (e.g., "Cinematic Neon Portrait")
-   **promptText**: `string` (The full, detailed prompt)
-   **description**: `string` (A short, enticing description of the prompt)
-   **previewImageUrls**: `list<string>` (A list of URLs to multiple example images)
-   **categories**: `list<string>` (e.g., `["portraits", "cinematic", "neon"]`)
-   **modelCompatibility**: `list<string>` (e.g., `["Nano Banana", "Midjourney V6"]`)
-   **style**: `string` (e.g., "Hyperrealistic", "Anime", "Fantasy")
-   **mood**: `string` (e.g., "Dramatic", "Peaceful", "Energetic")
-   **copyCount**: `number` (To track popularity)
-   **shareCount**: `number`
-   **createdAt**: `timestamp`
-   **createdBy**: `string` (Reference to `users` collection, for community submissions)

### `categories` collection
This collection stores the different categories for filtering.

-   **categoryId** (Document ID): `string` (e.g., "portraits")
-   **name**: `string` (e.g., "Portraits")
-   **coverImageUrl**: `string` (URL for a representative image for the category)
-   **promptCount**: `number` (For display on the category card)

### `users` collection
This collection stores user data, primarily for favorites and future community features.

-   **userId** (Document ID): `string` (from Firebase Auth)
-   **email**: `string`
-   **displayName**: `string`
-   **photoUrl**: `string`
-   **favorites**: `list<reference>` (A list of references to documents in the `prompts` collection)
-   **createdAt**: `timestamp`

## 2. Navigation & User Flow

The app's navigation will be centered around a bottom navigation bar for easy access to key features.

**Bottom Navigation Bar:**
-   **Home:** The landing screen. Displays featured prompts, new additions, and popular categories.
-   **Categories:** A screen that shows all available categories in a grid or list format. Tapping a category leads to a filtered view of the prompt gallery.
-   **Favorites:** The user's personal library of saved prompts. Requires login.
-   **Search:** A dedicated screen with a search bar and advanced filtering options (style, mood, model, etc.).
-   **Profile:** User profile, app settings (like Dark/Light mode), and login/logout functionality.

**User Flow Example (Finding and Using a Prompt):**
1.  **Onboarding:** First-time users see a brief, skippable walkthrough of the app.
2.  **Home Screen:** User lands on the Home screen and browses the curated lists.
3.  **Explore:** User taps on the "Categories" tab and selects "Portraits."
4.  **Gallery View:** The screen displays all prompts in the "Portraits" category as image cards.
5.  **Detail View:** User taps on a card. This opens a full-screen detail view with the full prompt text, multiple preview images in a carousel, and action buttons.
6.  **Action:** User taps "Copy" to copy the prompt to their clipboard and "Favorite" to save it to their library.

## 3. UI/UX & Design Principles

To achieve the "clean, modern, minimalist, and elegant" look:

-   **Color Palette:**
    -   **Light Mode:** A soft, off-white background (`#F8F8F8`), with a gentle primary color for accents (e.g., a soft lavender `#E6E0FF` or sage green `#D8E2DC`). Text color would be a dark gray (`#333333`) instead of pure black.
    -   **Dark Mode:** A deep charcoal background (`#1A1A1A`) instead of pure black, with the same accent colors. Text would be a light gray (`#E0E0E0`).
-   **Typography:** Use a clean, sans-serif font like **Inter**, **Manrope**, or **Satoshi**. These are modern, highly readable, and available on Google Fonts (easy to import into FlutterFlow).
-   **Layout & Components:**
    -   **Card-Based Grid:** Use cards with a generous `border-radius` (e.g., 16-20px) for a soft, modern feel.
    -   **Spacing:** Be generous with whitespace (padding and margins) to create a clean, uncluttered look.
    -   **Subtle Animations:** Implement fluid, non-intrusive animations for screen transitions and interactions (e.g., a slight scale effect when tapping a card). FlutterFlow's animation tools are great for this.
-   **UI Kit / Inspiration:**
    -   For inspiration, look at designs on **Dribbble** with keywords like "minimalist mobile app" or "gallery app."
    -   You can use a pre-made UI kit for FlutterFlow like the ones available on the FlutterFlow marketplace or other UI design marketplaces to accelerate the design process, but customize it with the chosen color palette and typography.
