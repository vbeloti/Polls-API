export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/polls-api',
  // mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/polls-api',
  port: process.env.PORT || 3333,
  jwtSecret: process.env.JWT_SECRET || 'tj61s5saqa=-1as'
};
