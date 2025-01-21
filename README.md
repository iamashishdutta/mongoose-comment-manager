
# Mongoose User CRUD 📦

A dynamic and easy-to-use user manager for MongoDB using Mongoose. This package allows you to perform CRUD operations for **one or many users** at a time, all while supporting a customizable user schema. 🚀

---

## Table of Contents 📜

- [Installation 🛠](#installation-)
- [Peer Dependencies ⚙️](#-peer-dependencies)
- [Usage 📘](#usage-)
- [Methods 💻](#methods-)
- [Schema 🔑](#schema-)
- [License 📝](#license-)

---

## Installation 🛠

To install the package via npm:

```bash
npm install mongoose-user-crud
```

---

## ⚙️ Peer Dependencies

This package requires **Mongoose** to work properly. You need to install Mongoose manually in your project.

Add **Mongoose** as a peer dependency:

```bash
npm install mongoose
```

---

## Usage 📘

To get started, require the `mongoose-user-crud` package and instantiate it by providing your MongoDB configuration and dynamic table name (the collection name for your user data).

```js
const UserManager = require('mongoose-user-crud');

const dbConfig = {
  uri: 'your-mongodb-uri',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
};

const tableName = 'users'; // This is your dynamic table name (collection name)

const userManager = new UserManager(dbConfig, tableName);
```

> **Note:** This package can handle both **single** and **multiple** user requests. You can pass a single user object or an array of users to most methods, making it flexible for both small and large operations.

---

## Methods 💻

### Create Users ✍️

Create one or more users at once. You can pass an array of user data or a single user object.

```js
// Single User
userManager.create([{ username: 'john_doe', email: 'john@example.com', password: 'securePassword123' }])
  .then(result => console.log(result))
  .catch(err => console.error(err));

// Multiple Users
const users = [
  { username: 'john_doe', email: 'john@example.com', password: 'securePassword123' },
  { username: 'jane_doe', email: 'jane@example.com', password: 'securePassword123' },
];

userManager.create(users)
  .then(result => console.log(result))
  .catch(err => console.error(err));
```

### Get Users 🔍

Retrieve one or more users by a field and value (e.g., username, email).

```js
// Single User
userManager.get([{ field: 'email', value: 'john@example.com' }])
  .then(result => console.log(result))
  .catch(err => console.error(err));

// Multiple Users
const usersToGet = [
  { field: 'email', value: 'john@example.com' },
  { field: 'email', value: 'jane@example.com' },
];

userManager.get(usersToGet)
  .then(result => console.log(result))
  .catch(err => console.error(err));
```

### Update Users ✏️

Update user data by a field and value. This method supports both single and multiple updates.

```js
// Single User
userManager.update([{ field: 'email', value: 'john@example.com', data: { first_name: 'John Updated' } }])
  .then(result => console.log(result))
  .catch(err => console.error(err));

// Multiple Users
const usersToUpdate = [
  { field: 'email', value: 'john@example.com', data: { first_name: 'John Updated' } },
  { field: 'email', value: 'jane@example.com', data: { first_name: 'Jane Updated' } },
];

userManager.update(usersToUpdate)
  .then(result => console.log(result))
  .catch(err => console.error(err));
```

### Soft Delete Users 🗑️

Soft delete users (mark as deleted or locked) by a field and value. This works for both single and multiple deletions.

```js
// Single User
userManager.softDelete([{ field: 'email', value: 'john@example.com' }])
  .then(result => console.log(result))
  .catch(err => console.error(err));

// Multiple Users
const usersToDelete = [
  { field: 'email', value: 'john@example.com' },
  { field: 'email', value: 'jane@example.com' },
];

userManager.softDelete(usersToDelete)
  .then(result => console.log(result))
  .catch(err => console.error(err));
```

### Strict Delete Users 🗑️💥

Permanently delete users by a field and value. This method supports both single and multiple deletions.

```js
// Single User
userManager.strictDelete([{ field: 'email', value: 'john@example.com' }])
  .then(result => console.log(result))
  .catch(err => console.error(err));

// Multiple Users
const usersToDelete = [
  { field: 'email', value: 'john@example.com' },
  { field: 'email', value: 'jane@example.com' },
];

userManager.strictDelete(usersToDelete)
  .then(result => console.log(result))
  .catch(err => console.error(err));
```

### Deactivate Users 🚫

Deactivate users (lock accounts) and set the `deactivated_at` timestamp. Works for both single and multiple deactivations.

```js
// Single User
userManager.deactivate([{ field: 'email', value: 'john@example.com' }])
  .then(result => console.log(result))
  .catch(err => console.error(err));

// Multiple Users
const usersToDeactivate = [
  { field: 'email', value: 'john@example.com' },
  { field: 'email', value: 'jane@example.com' },
];

userManager.deactivate(usersToDeactivate)
  .then(result => console.log(result))
  .catch(err => console.error(err));
```

### Reactivate Users 🔓

Reactivate users (unlock accounts) and set the `reactivated_at` timestamp. This method works for both single and multiple reactivations.

```js
// Single User
userManager.reactivate([{ field: 'email', value: 'john@example.com' }])
  .then(result => console.log(result))
  .catch(err => console.error(err));

// Multiple Users
const usersToReactivate = [
  { field: 'email', value: 'john@example.com' },
  { field: 'email', value: 'jane@example.com' },
];

userManager.reactivate(usersToReactivate)
  .then(result => console.log(result))
  .catch(err => console.error(err));
```

---

## Schema 🔑

This package supports a **dynamic schema** for users, where you can define a table (collection) name at runtime. The schema includes various fields for user data such as:

- **username**: Required and unique.
- **email**: Required and unique.
- **password**: Required.
- **role**: Enum (`admin`, `user`, `moderator`), default is `user`.
- **created_at**: Timestamp when the user is created.
- **updated_at**: Timestamp when the user data is updated.
- **deactivated_at**: Timestamp when the user account is deactivated.

Additional fields supported:

- `first_name`
- `last_name`
- `phone_number`
- `profile_picture`
- `bio`
- `address`
- `dob` (Date of birth)
- `gender` (Enum: `male`, `female`, `other`)
- `language_preference` (Default is `en`)
- `timezone`
- `locked` (Boolean, defaults to `false`)
- `newsletter_subscribed` (Boolean, defaults to `false`)
- `privacy_settings` (Flexible field)
- `deleted_at`, `activated_at`, `reactivated_at` (Timestamps for soft delete/reactivation)

---

## License 📝

This package is licensed under the ISC License.

---

Enjoy building your user management system with Mongoose! 🎉
```
