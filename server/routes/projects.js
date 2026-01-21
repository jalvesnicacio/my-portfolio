import express from 'express';
import Project from '../models/Project.js';
import authenticateToken from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';
import { removeMediaFiles } from "../utils/removeMediaFiles.js";



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

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/gif',
            'video/mp4',
            'video/webm',
            'video/ogg'
        ];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Unsupported media type'), false);
        }
    }
});

// Criar novo projeto
router.post('/', authenticateToken, async (req, res) => {
    try {
        const {
            title,
            summary,
            description,
            technologies,
            projectUrl,
            publish,
            media = [] } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        const newProject = new Project({
            title,
            summary,
            description,
            technologies,
            projectUrl,
            publish,
            media
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
router.post('/upload', authenticateToken, upload.array('files', 10), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
    }

    const baseUrl =
        process.env.BASE_URL || `http://localhost:${process.env.PORT || 5001}`;

    const media = req.files.map(file => {
        const isVideo = file.mimetype.startsWith('video/');
        return {
            url: `/uploads/${file.filename}`,
            type: isVideo ? 'video' : 'image',
            alt: ''
        };
    });

    res.status(201).json({ media });
});

// Atualizar projeto
router.put("/:id", authenticateToken, async (req, res) => {
    try {
        const incomingMedia = req.body.media || [];
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // 🔍 Detecta mídias removidas
        const oldUrls = project.media.map(m => m.url);
        const newUrls = incomingMedia.map(m => m.url);

        const removedMedia = project.media.filter(
            m => !newUrls.includes(m.url)
        );

        // 🧹 Remove arquivos físicos
        removeMediaFiles(removedMedia);

        // 🔄 Atualiza projeto
        project.set(req.body);
        await project.save();

        res.json(project);
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ message: "Error updating project" });
    }
});

// DELETE /api/projects/:id
router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // 🧹 Remove arquivos físicos das mídias
        removeMediaFiles(project.media);

        // 🗑️ Remove o projeto do banco
        await project.deleteOne();

        res.json({ message: "Project deleted successfully" });
    } catch (err) {
        console.error("Error deleting project:", err);
        res.status(500).json({ message: "Server error while deleting project" });
    }
});

export default router;