import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Project from './models/Project.js';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const seedProjects = async () => {
  const existing = await Project.find();
  if (existing.length === 0) {
    await Project.create([
      {
        title: "Meu Primeiro Projeto",
        description: "Este é um teste de projeto salvo no MongoDB",
        technologies: ["React", "Node", "MongoDB"],
        imageUrl: "https://placehol.co/150",
        projectUrl: "https://meusite.com",
        publish: true
      }
    ]);
    console.log("Projeto de teste inserido!");
  }
};

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    // seedProjects();
  })
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);




const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
