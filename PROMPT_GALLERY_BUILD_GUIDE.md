# Prompt Gallery: Step-by-Step Build Guide (FlutterFlow)

This guide provides a high-level, step-by-step roadmap for building the Prompt Gallery app using FlutterFlow and Firebase.

### Phase 1: Project Setup & Backend Configuration

**Step 1: Set Up Firebase**
1.  Create a new project in the [Firebase Console](https://console.firebase.google.com/).
2.  Enable the following services:
    *   **Firestore Database:** Start in test mode for easy development.
    *   **Firebase Storage:** To store prompt preview images.
    *   **Firebase Authentication:** Enable the sign-in methods you want (e.g., Email/Password, Google).
3.  Keep the Firebase project configuration details handy.

**Step 2: Set Up FlutterFlow**
1.  Create a new project in FlutterFlow.
2.  In the project settings, connect your Firebase project using the Firebase project ID. FlutterFlow will provide instructions to automatically configure the necessary rules and permissions.
3.  Enable the platforms you want to build for (iOS, Android, Web).

**Step 3: Define Firestore Collections in FlutterFlow**
1.  Go to the "Firestore" tab in FlutterFlow.
2.  Recreate the database schema defined in `PROMPT_GALLERY_ARCHITECTURE.md`.
    *   Create the `prompts`, `categories`, and `users` collections.
    *   For each collection, define the fields and their data types (e.g., `title` as a `String`, `previewImageUrls` as a `List<String>`). FlutterFlow's UI makes this straightforward.

### Phase 2: Building the Core App Screens

**Step 4: User Authentication**
1.  Use FlutterFlow's pre-built authentication templates to create a Login Page and a Sign-Up Page.
2.  Connect the forms to the Firebase Authentication actions (e.g., "Create Account," "Login").
3.  Set up the navigation logic (e.g., if not logged in, show Login Page; if logged in, go to Home Page).

**Step 5: Build the Main Navigation**
1.  Create a new page that will be your main app shell.
2.  Add FlutterFlow's `NavBar` widget to this page.
3.  Configure the `NavBar` with the five main icons and labels as defined in the architecture document (Home, Categories, Favorites, Search, Profile).

**Step 6: Build the Home Screen**
1.  Create the Home screen UI.
2.  Use "Backend Query" in FlutterFlow to fetch data from your `prompts` collection.
3.  Create a horizontal scrolling list for "Featured Prompts" (e.g., query for the 10 most recent prompts).
4.  Create another list or grid for "Popular Categories," querying your `categories` collection.

**Step 7: Build the Prompt Gallery & Detail Screens**
1.  Create a reusable "Prompt Card" component. This card will display a preview image, title, and favorite/copy buttons.
2.  Create the main Gallery screen (this will be used for Categories, Search results, etc.). Use a `GridView` or `ListView` widget.
3.  Set up a Backend Query on the grid to display documents from the `prompts` collection.
4.  Create the Prompt Detail screen. When a user taps a Prompt Card, navigate to this screen and pass the `prompt` document reference as a parameter.
5.  On the Detail screen, display all the prompt's information: full text, a carousel for multiple `previewImageUrls`, etc.
6.  Implement the "Copy to Clipboard" and "Add to Favorites" actions on the buttons. The favorites action will update the `favorites` list in the current user's document.

### Phase 3: Content & Advanced Features

**Step 8: Upload Initial Content**
1.  Manually upload your preview images to Firebase Storage. Get the public URLs for each image.
2.  In the Firebase console, go to Firestore and start manually creating documents in your `prompts` and `categories` collections.
3.  Use the content from `PROMPT_GALLERY_CATEGORIES.md` and `PROMPT_GALLERY_CONTENT.md` to populate your database. This is your initial app content.

**Step 9: Implement Search & Filtering**
1.  On the Search screen, add a text input field.
2.  Use FlutterFlow's built-in search capabilities to filter the `prompts` collection based on the text input.
3.  Add filter chips or dropdowns for categories, styles, etc. Modify the Firestore query to include `where` clauses based on the selected filters.

**Step 10: Implement Dark & Light Mode**
1.  Go to the "Theme Settings" in FlutterFlow.
2.  Define your primary and secondary colors for both Light Mode and Dark Mode, using the color palette from the architecture document.
3.  FlutterFlow makes it easy to preview and test both themes. Add a toggle button in the Profile/Settings screen to allow users to switch themes.

### Phase 4: Deployment

**Step 11: Test Your App**
1.  Use FlutterFlow's "Test Mode" to run a live, web-based version of your app to find and fix bugs.
2.  Test all features: login, browsing, searching, favoriting, etc.

**Step 12: Deploy**
1.  **Web App (PWA):** Deploying to the web is as simple as clicking a button in FlutterFlow. You can use their hosting or connect a custom domain.
2.  **iOS & Android:** Follow FlutterFlow's detailed guides to deploy your app to the Apple App Store and Google Play Store. This involves setting up developer accounts with Apple and Google and using FlutterFlow's deployment tools to generate the final app bundles.
