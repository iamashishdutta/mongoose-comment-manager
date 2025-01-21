---

# UserManager README 📖

## Overview
The `UserManager` class is designed for managing user data with MongoDB, using Mongoose. It supports dynamic table names and provides methods for handling user records efficiently. This module allows you to handle operations for both single and multiple users with ease.

---

## Peer Dependencies 🔗
The `UserManager` class has the following peer dependencies:

- `mongoose`: A required dependency to interact with MongoDB. Ensure that you install the appropriate version of Mongoose that is compatible with your project.

To install the required peer dependency, run:
```bash
npm install mongoose
```

---

## Supported Operations 🔧
The following methods are supported for managing user records:

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

### 4️⃣ **softDelete** 🗑️
- **Description**: Soft delete one or multiple user records (mark as deleted and locked).
- **Supports**: Single and multiple requests.
- **Usage**:
  ```js
  userManager.softDelete([{ field: 'email', value: 'john@example.com' }]);
  ```

### 5️⃣ **strictDelete** 💀
- **Description**: Permanently delete one or multiple user records.
- **Supports**: Single and multiple requests.
- **Usage**:
  ```js
  userManager.strictDelete([{ field: 'email', value: 'john@example.com' }]);
  ```

### 6️⃣ **deactivate** 🔒
- **Description**: Deactivate (lock) one or multiple user accounts and update `deactivated_at`.
- **Supports**: Single and multiple requests.
- **Usage**:
  ```js
  userManager.deactivate([{ field: 'email', value: 'john@example.com' }]);
  ```

### 7️⃣ **reactivate** 🔓
- **Description**: Reactivate (unlock) one or multiple user accounts and update `reactivated_at`.
- **Supports**: Single and multiple requests.
- **Usage**:
  ```js
  userManager.reactivate([{ field: 'email', value: 'john@example.com' }]);
  ```

---

## User Schema 📊

The schema for the user model is dynamic and can be used for different collections. Below is the schema in a table format:

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
npm install user-manager
```

### 2️⃣ **Example Usage**
```js
const UserManager = require('user-manager');

// Initialize the UserManager with database configuration and dynamic table name
const userManager = new UserManager({
  uri: 'mongodb://localhost:27017/yourDB',
  options: { useNewUrlParser: true, useUnifiedTopology: true }
}, 'users');

// Create users
userManager.create([{ username: 'john', email: 'john@example.com' }]);

// Get user records by email
userManager.get([{ field: 'email', value: 'john@example.com' }]);

// Update user bio
userManager.update([{ field: 'email', value: 'john@example.com', data: { bio: 'Updated bio' } }]);

// Soft delete a user
userManager.softDelete([{ field: 'email', value: 'john@example.com' }]);

// Deactivate a user account
userManager.deactivate([{ field: 'email', value: 'john@example.com' }]);

// Close the connection
userManager.closeConnection();
```

---

## Support & License 📑

Feel free to reach out if you have any issues or suggestions!  
License: MIT 🎉

--- 
