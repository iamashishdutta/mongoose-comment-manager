Here’s an updated README with the correct package name:

---

# Mongoose User CRUD 📦

A dynamic and easy-to-use user manager for MongoDB using Mongoose. This package allows you to perform CRUD operations for **one or many users** at a time, all while supporting a customizable user schema. 🚀

## Table of Contents 📜

- [Installation 🛠](#installation)
- [Usage 📘](#usage)
- [Methods 💻](#methods)
- [Schema 🔑](#schema)
- [License 📝](#license)

---

## Installation 🛠

Install via npm:

```bash
npm install mongoose-user-crud
```

---

## Usage 📘

To get started, require the `mongoose-user-crud` package and instantiate it by providing your MongoDB configuration and dynamic table name (the collection name for your user data). 📊

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

---

## Methods 💻

### Create Users ✍️
Create multiple users at once. You can pass an array of user data.

```js
const users = [
  { username: 'john_doe', email: 'john@example.com', password: 'securePassword123' },
  { username: 'jane_doe', email: 'jane@example.com', password: 'securePassword123' },
];

userManager.create(users)
  .then(result => console.log(result))
  .catch(err => console.error(err));
```

### Get Users 🔍
Retrieve user(s) by a field and value (e.g., username, email).

```js
const usersToGet = [
  { field: 'email', value: 'john@example.com' },
  { field: 'email', value: 'jane@example.com' },
];

userManager.get(usersToGet)
  .then(result => console.log(result))
  .catch(err => console.error(err));
```

### Update Users ✏️
Update user data by a field and value. 

```js
const usersToUpdate = [
  { field: 'email', value: 'john@example.com', data: { first_name: 'John Updated' } },
];

userManager.update(usersToUpdate)
  .then(result => console.log(result))
  .catch(err => console.error(err));
```

### Soft Delete Users 🗑️
Soft delete users (mark as deleted, locked) by a field and value.

```js
const usersToDelete = [
  { field: 'email', value: 'john@example.com' },
];

userManager.softDelete(usersToDelete)
  .then(result => console.log(result))
  .catch(err => console.error(err));
```

### Strict Delete Users 🗑️💥
Permanently delete users by a field and value.

```js
const usersToDelete = [
  { field: 'email', value: 'john@example.com' },
];

userManager.strictDelete(usersToDelete)
  .then(result => console.log(result))
  .catch(err => console.error(err));
```

### Deactivate Users 🚫
Deactivate users (lock accounts) and set `deactivated_at` timestamp.

```js
const usersToDeactivate = [
  { field: 'email', value: 'john@example.com' },
];

userManager.deactivate(usersToDeactivate)
  .then(result => console.log(result))
  .catch(err => console.error(err));
```

### Reactivate Users 🔓
Reactivate users (unlock accounts) and set `reactivated_at` timestamp.

```js
const usersToReactivate = [
  { field: 'email', value: 'john@example.com' },
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

Here's a list of other fields included:

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

---

Let me know if you'd like further adjustments! 😊
