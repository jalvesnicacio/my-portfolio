import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const seedUser = async () => {
    const email = 'admin@myportfolio.com';

    const exists = await User.findOne({ email });
    if (exists) {
        console.log('Usuário admin já existe');
        return;
    }

    const hashedPassword = await bcrypt.hash('12345678', 10);

    await User.create({
        email,
        password: hashedPassword
    });

    console.log('Usuário admin criado');
};