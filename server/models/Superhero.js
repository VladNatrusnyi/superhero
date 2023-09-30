import mongoose from "mongoose";

const SuperheroSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    unique: true
  },
  real_name: {
    type: String,
    required: true,
  },
  origin_description: {
    type: String,
    required: true,
  },
  superpowers: {
    type: [String],
    required: true,
  },
  catch_phrase: {
    type: String,
    required: true,
  },
  Images: [String]
}, {
  timestamps: true
})

export default mongoose.model('Superhero', SuperheroSchema)
