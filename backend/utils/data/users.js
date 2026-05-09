import bcrypt from 'bcrypt';

const users = [
  {
    name: 'Admin User',
    email: 'admin@salesvision.com',
    password: 'password123', // seeder will hash this because of pre-save? Wait, insertMany bypasses pre-save! 
    role: 'admin',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
  },
];

// Pre-hash passwords since insertMany bypasses schema hooks
const hashedUsers = users.map(user => {
  return {
    ...user,
    password: bcrypt.hashSync(user.password, 10)
  }
});

export default hashedUsers;
