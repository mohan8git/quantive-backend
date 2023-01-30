const mongoose = require("mongoose");

const CardSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  cardIds: {
    type: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// export model user with CardSchema
module.exports = mongoose.model("card", CardSchema);
