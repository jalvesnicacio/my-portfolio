import express from 'express';
import Project from '../models/Project.js';
import authenticateToken from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Pasta onde os arquivos serão salvos
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage: storage });

// Criar novo projeto
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { title, summary, description, technologies, imageUrl, projectUrl, publish } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        const newProject = new Project({
            title,
            summary,
            description,
            technologies,
            imageUrl,
            projectUrl,
            publish,
        });

        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Error saving project' });
    }
});

// Listar todos os projetos
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects' });
    }
});

// Listar só os publicados
router.get('/published', async (req, res) => {
    try {
        const publishedProjects = await Project.find({ publish: true });
        res.json(publishedProjects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching published projects' });
    }
});

// Listar projeto por ID
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ message: 'Error fetching project' });
    }
});

// Upload de imagem
router.post('/upload', authenticateToken, upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    // const imageUrl = `/uploads/${req.file.filename}`;
    const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5001}`;
    const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
    res.status(201).json({ imageUrl });
});

// Atualizar projeto
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedProject);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: 'Error updating project' });
    }
});
// DELETE /api/projects/:id
router.delete("/:id", async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);

        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json({ message: "Project deleted successfully" });
    } catch (err) {
        console.error("Error deleting project:", err);
        res.status(500).json({ message: "Server error while deleting project" });
    }
});

export default router;