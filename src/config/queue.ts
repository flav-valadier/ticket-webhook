const queueConfig = {
  store: {
    type: 'sql',
    dialect: 'postgres',
    host: process.env.DB_HOSTNAME || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'test',
    password: process.env.DB_PASSWORD || 'test',
    dbname: process.env.DB_DATABASE || 'postgres',
    tableName: 'ticket_tasks',
  },
};

export default queueConfig;
