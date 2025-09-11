# Prompt Gallery: Admin Dashboard Requirements

This document outlines the requirements for an Admin Dashboard to manage the content and users of the Prompt Gallery app. This dashboard could be built as a separate web application using a tool like FlutterFlow, Retool, or by creating a restricted "admin" area within the main app.

## Core Features

### 1. Dashboard Home
-   **At-a-Glance Stats:** A main dashboard showing key metrics:
    -   Total Prompts
    -   Total Categories
    -   Total Users
    -   New Community Submissions (count)
    -   Most Copied / Favorited Prompts this week.

### 2. Prompt Management (CRUD)
A table view of the `prompts` collection with full CRUD functionality.
-   **Create:** A form to add a new prompt. Fields should match the `prompts` schema (title, promptText, description, etc.). Should include an image uploader that connects to Firebase Storage.
-   **Read:** View all prompts in a searchable, sortable table.
-   **Update:** Click on any prompt to open an edit form and modify its details.
-   **Delete:** Ability to delete a prompt. This should trigger a confirmation dialog to prevent accidents.

### 3. Category Management (CRUD)
A simple interface to manage the `categories` collection.
-   **Create:** A form to add a new category (name, coverImageUrl).
-   **Read:** View all categories.
-   **Update:** Edit a category's name or cover image.
-   **Delete:** Remove a category. (Note: A decision needs to be made on what happens to prompts in a deleted category. They could be uncategorized or the deletion could be prevented if prompts still use it).

### 4. Community Submissions Queue
A dedicated section for moderating user-submitted prompts.
-   **View Submissions:** A queue of all prompts submitted by the community that are pending review.
-   **Review Interface:** For each submission, an admin can:
    -   **Approve:** The prompt is moved from the "submissions" queue to the main `prompts` collection and becomes visible to all users.
    -   **Edit & Approve:** Edit the submission for typos or clarity before approving it.
    -   **Reject:** The prompt is deleted from the queue. An optional reason for rejection could be sent to the user.

### 5. User Management
A basic interface to view and manage users.
-   **View Users:** A searchable list of all users from the `users` collection.
-   **View Details:** See a user's details (email, sign-up date, number of favorites, number of submitted prompts).
-   **Admin Roles:** Ability to grant or revoke admin privileges for other users.
-   **Ban/Suspend:** Ability to temporarily or permanently ban a user if they abuse the community submission system.
