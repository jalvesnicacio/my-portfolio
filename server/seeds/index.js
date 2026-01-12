import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import { seedUser } from './user.seed.js';
// import { seedProjects } from './project.seed.js';
import seedProjects from './project.seed.js';

dotenv.config();

(async () => {
    try {
        await connectDB();

        await seedUser();
        await seedProjects();

        console.log('Seed finalizado');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();