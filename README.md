
---

# user-mongoose-crud 📖

## Overview
The `user-mongoose-crud` package is designed to manage user data in MongoDB using Mongoose. It supports dynamic table names and flexible schema management, allowing you to create, read, update, delete, deactivate, and reactivate user records efficiently. This module provides a robust framework for handling user data in various collections with customizable schemas.

## Peer Dependencies 📦
To use `user-mongoose-crud`, you'll need to install the following peer dependency:
- `mongoose`: A popular ODM (Object Document Mapper) for MongoDB.

Install it using the following command:
```bash
npm install mongoose
```

## Supported Operations 🔧
The following methods are available for managing user records:

### 1️⃣ **create** 📝
- **Description**: Create one or multiple user records.
- **Supports**: Single and multiple requests.
- **Usage**:
  ```js
  userManager.create([{ username: 'john', email: 'john@example.com' }]);
  ```

### 2️⃣ **get** 🔍
- **Description**: Retrieve user records by a specific field and value.
- **Supports**: Single and multiple requests.
- **Usage**:
  ```js
  userManager.get([{ field: 'username', value: 'john' }]);
  ```

### 3️⃣ **update** ✏️
- **Description**: Update one or multiple user records by a specific field and value.
- **Supports**: Single and multiple requests.
- **Usage**:
  ```js
  userManager.update([{ field: 'username', value: 'john', data: { bio: 'Updated bio' } }]);
  ```

### 4️⃣ **delete** 🗑️
- **Description**: Delete one or multiple user records. Supports both soft delete (mark as deleted) and strict delete (permanent deletion).
- **Supports**: Single and multiple requests.
- **Usage**:
  ```js
  userManager.delete([{ field: 'email', value: 'john@example.com' }], true); // Strict delete
  userManager.delete([{ field: 'email', value: 'john@example.com' }]); // Soft delete
  ```

### 5️⃣ **deactivate** 🔒
- **Description**: Deactivate one or multiple user accounts and update `deactivated_at`.
- **Supports**: Single and multiple requests.
- **Usage**:
  ```js
  userManager.deactivate([{ field: 'email', value: 'john@example.com' }]);
  ```

### 6️⃣ **reactivate** 🔓
- **Description**: Reactivate one or multiple user accounts and update `reactivated_at`.
- **Supports**: Single and multiple requests.
- **Usage**:
  ```js
  userManager.reactivate([{ field: 'email', value: 'john@example.com' }]);
  ```

### 7️⃣ **replaceSchema** 🔄
- **Description**: Replace the user schema with a new one.
- **Usage**:
  ```js
  userManager.replaceSchema({ bio: { type: String }, newField: { type: String } });
  ```

### 8️⃣ **extendSchema** ➕
- **Description**: Extend the user schema by adding additional fields.
- **Usage**:
  ```js
  userManager.extendSchema({ newField: { type: String } });
  ```

--- 

## User Schema 📊

The schema for the user model is dynamic, and the table name can be provided when creating the `UserManager` instance. The schema includes the following fields:

| Field                  | Type                  | Description                                            |
|------------------------|-----------------------|--------------------------------------------------------|
| `username`             | String (Required, Unique) | User's unique username.                               |
| `email`                | String (Required, Unique) | User's email address.                                  |
| `password`             | String (Required)      | User's password.                                       |
| `first_name`           | String                | User's first name.                                     |
| `last_name`            | String                | User's last name.                                      |
| `phone_number`         | String                | User's phone number.                                   |
| `profile_picture`      | String                | URL to the user's profile picture.                     |
| `bio`                  | String                | Bio description of the user.                           |
| `role`                 | String ('admin', 'user', 'moderator') | Role of the user. Default is 'user'.            |
| `address`              | String                | User's home address.                                   |
| `dob`                  | Date                  | User's date of birth.                                  |
| `gender`               | String ('male', 'female', 'other') | User's gender.                                      |
| `created_at`           | Date (Default: Date.now) | Account creation date.                                 |
| `updated_at`           | Date (Default: Date.now) | Account last updated date.                             |
| `last_login`           | Date                  | Last login timestamp.                                  |
| `login_attempts`       | Number (Default: 0)    | Number of failed login attempts.                       |
| `two_factor_enabled`   | Boolean (Default: false) | Indicates if two-factor authentication is enabled.    |
| `language_preference`  | String (Default: 'en') | User's preferred language.                             |
| `timezone`             | String                | User's timezone.                                       |
| `referral_code`        | String                | Referral code used by the user.                        |
| `newsletter_subscribed`| Boolean (Default: false) | Whether the user is subscribed to the newsletter.    |
| `privacy_settings`     | Mixed                 | User's privacy settings.                               |
| `locked`               | Boolean (Default: false) | Indicates if the user account is locked.               |
| `deleted_at`           | Date (Default: null)   | Soft delete timestamp.                                 |
| `activated_at`         | Date (Default: null)   | Account activation timestamp.                          |
| `reactivated_at`       | Date (Default: null)   | Account reactivation timestamp.                        |
| `deactivated_at`       | Date (Default: null)   | Account deactivation timestamp.                        |

---

## Setup and Usage 🔌

### 1️⃣ **Installation**
Install the package using npm:
```bash
npm install user-mongoose-crud
```

### 2️⃣ **Example Usage**
```js
const UserManager = require('user-mongoose-crud');

// Initialize the UserManager with database configuration and dynamic table name
const userManager = new UserManager({
  uri: 'mongodb://localhost:27017/yourDB',
  options: { useNewUrlParser: true, useUnifiedTopology: true }
}, 'users');

// Create users with a password field
userManager
  .create([
    { username: 'john', email: 'john@example.com', password: 'john123' },
    { username: 'rambo', email: 'rambo@example.com', password: 'rambo456' }
  ])
  .then(() => {
    console.log('Users created successfully.');
    
    // Get user records by email (multiple conditions)
    return userManager.get([
      { field: 'email', value: 'john@example.com' },
      { field: 'email', value: 'rambo@example.com' }
    ]);
  })
  .then((result) => {
    console.log('User records:', result);
    
    // Update user bio
    return userManager.update([
      { field: 'email', value: 'john@example.com', data: { bio: 'Updated bio for John' } },
      { field: 'email', value: 'rambo@example.com', data: { bio: 'Updated bio for Rambo' } }
    ]);
  })
  .then(() => {
    console.log('User bios updated successfully.');
    
    // Soft delete users
    return userManager.delete([
      { field: 'email', value: 'john@example.com' },
      { field: 'email', value: 'rambo@example.com' }
    ]);
  })
  .then(() => {
    console.log('Users soft deleted successfully.');
    
    // Deactivate user accounts
    return userManager.deactivate([
      { field: 'email', value: 'john@example.com' },
      { field: 'email', value: 'rambo@example.com' }
    ]);
  })
  .then(() => {
    console.log('Users deactivated successfully.');
    
    // Close the connection
    return userManager.closeConnection();
  })
  .then(() => {
    console.log('Database connection closed.');
  })
  .catch((err) => {
    console.error('An error occurred:', err);
    userManager.closeConnection(); // Ensure the connection is closed even if an error occurs
  });
```

---

## Support & License 📑

Feel free to reach out if you have any issues or suggestions!  
License: MIT 🎉

---

This version reflects the new flexibility with schema modification methods like `replaceSchema` and `extendSchema`.
