import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['image', 'video'],
      required: true
    },
    alt: {
      type: String,
      default: ''
    }
  },
  { _id: false } // ⬅️ importante: evita _id desnecessário nos subdocs
);

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String
  },
  description: {
    type: String
  },
  technologies: {
    type: [String],
    default: []
  },
  media: {
    type: [mediaSchema],
    default: []
  },
  projectUrl: {
    type: String
  },
  publish: {
    type: Boolean,
    default: false
  }
});

const Project = mongoose.model('Project', projectSchema);
export default Project;