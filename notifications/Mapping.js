const { Model, ValidationError } = require("objection");
const { isExpoPushToken } = require("expo-server-sdk");

class Mapping extends Model {
  static get tableName() {
    return "mappings";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["upi", "token"],
      properties: {
        upi: { type: "string" },
        token: { type: "string" },
      },
    };
  }

  async $beforeInsert() {
    this.created_at = new Date().toISOString();
    this.updated_at = this.created_at;
  }

  /* eslint-disable no-unused-vars */
  async $beforeUpdate(opt) {
    this.updated_at = new Date().toISOString();
  }
  /* eslint-enable no-unused-vars */

  /* eslint-disable class-methods-use-this */
  $beforeValidate(jsonSchema, json) {
    if (!isExpoPushToken(json.token)) {
      throw new ValidationError(
        "The provided token is not a valid Expo push token",
      );
    }
    return jsonSchema;
  }
  /* eslint-enable class-methods-use-this */
}

module.exports = Mapping;
