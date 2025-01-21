const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema (same structure, but now can use dynamic table name)
const createUserSchema = (tableName) => {
  return new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: String,
    last_name: String,
    phone_number: String,
    profile_picture: String,
    bio: String,
    role: { type: String, enum: ['admin', 'user', 'moderator'], default: 'user' },
    address: String,
    dob: Date,
    gender: { type: String, enum: ['male', 'female', 'other'] },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    last_login: Date,
    login_attempts: { type: Number, default: 0 },
    two_factor_enabled: { type: Boolean, default: false },
    language_preference: { type: String, default: 'en' },
    timezone: String,
    referral_code: String,
    newsletter_subscribed: { type: Boolean, default: false },
    privacy_settings: { type: Schema.Types.Mixed },
    locked: { type: Boolean, default: false },
    deleted_at: { type: Date, default: null },
    activated_at: { type: Date, default: null },
    reactivated_at: { type: Date, default: null },
    deactivated_at: { type: Date, default: null } // New field for deactivation timestamp
  }, { collection: tableName });
};

// General method for handling CRUD operations
class RecordManager {
  constructor(model) {
    this.Model = model;
  }

  async handleAction(action, users, options = {}) {
    const results = [];
    for (const user of users) {
      const { field, value } = user;
      let record;

      switch (action) {
        case 'create':
          record = new this.Model(user);
          record = await record.save();
          break;

        case 'get':
          record = await this.Model.findOne({ [field]: value });
          break;

        case 'update':
          record = await this.Model.findOneAndUpdate(
            { [field]: value },
            { ...options.data, updated_at: new Date() },
            { new: true }
          );
          break;

        case 'delete':
          if (options.strictMode) {
            record = await this.Model.findOneAndDelete({ [field]: value });
          } else {
            record = await this.Model.findOneAndUpdate(
              { [field]: value },
              { deleted_at: new Date(), locked: true },
              { new: true }
            );
          }
          break;

        case 'deactivate':
          record = await this.Model.findOneAndUpdate(
            { [field]: value },
            { deactivated_at: new Date(), locked: true },
            { new: true }
          );
          break;

        case 'reactivate':
          record = await this.Model.findOneAndUpdate(
            { [field]: value },
            { reactivated_at: new Date(), locked: false },
            { new: true }
          );
          break;

        default:
          throw new Error('Action not supported');
      }

      results.push(record);
    }
    return results;
  }
}

// UserManager class to handle user-specific logic, with support for dynamic table name
class UserManager {
  constructor(dbConfig, tableName) {
    if (mongoose.connection.readyState === 0) {
      mongoose.connect(dbConfig.uri, dbConfig.options)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('MongoDB connection error:', err));
    }

    // Dynamically create the schema for the provided table name
    const userSchema = createUserSchema(tableName);
    
    // Use the dynamically created schema to create the model
    this.Model = mongoose.model(tableName, userSchema);

    // Initialize the RecordManager with the dynamic model
    this.Manager = new RecordManager(this.Model);
  }

  // Create records for multiple users
  async create(users) {
    return await this.Manager.handleAction('create', users);
  }

  // Get records for multiple users by any field and value
  async get(users) {
    return await this.Manager.handleAction('get', users);
  }

  // Update records for multiple users
  async update(users, data) {
    return await this.Manager.handleAction('update', users, { data });
  }

  // Delete multiple users (soft or strict delete)
  async delete(users, strictMode = false) {
    return await this.Manager.handleAction('delete', users, { strictMode });
  }

  // Deactivate multiple users
  async deactivate(users) {
    return await this.Manager.handleAction('deactivate', users);
  }

  // Reactivate multiple users
  async reactivate(users) {
    return await this.Manager.handleAction('reactivate', users);
  }

  // Close the MongoDB connection
  async closeConnection() {
    try {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    } catch (error) {
      console.error('Error closing MongoDB connection:', error.message);
    }
  }
}

module.exports = UserManager;
