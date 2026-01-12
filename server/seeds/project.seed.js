import Project from '../models/Project.js';

const seedProjects = async () => {
    const count = await Project.countDocuments();

    if (count > 0) {
        console.log('Seed de projetos ignorado (já existem dados)');
        return;
    }

    await Project.create([
        {
            title: 'Projeto Exemplo',
            summary: 'Projeto criado automaticamente via seed',
            description:
                'Este projeto existe apenas para facilitar o desenvolvimento inicial do dashboard.',
            technologies: ['React', 'Node.js', 'MongoDB'],
            media: [
                {
                    url: '/uploads/example-image.jpg',
                    type: 'image',
                    alt: 'Screenshot da página inicial do projeto'
                },
                {
                    url: '/uploads/example-video.mp4',
                    type: 'video',
                    alt: 'Vídeo demonstrando o funcionamento do projeto'
                }
            ],
            projectUrl: 'https://example.com',
            publish: true
        }
    ]);

    console.log('Seed de projetos executado com sucesso');
};

export default seedProjects;