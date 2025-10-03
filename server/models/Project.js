
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: String,
  summary: String,
  description: String,
  technologies: [String],
  imageUrl: String,
  projectUrl: String,
  publish: {
    type: Boolean,
    default: false
  }
});

const Project = mongoose.model('Project', projectSchema)
export default Project