export default {
    mongodb: {
        cnxStr: 'mongodb://localhost/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    mariaDb: {
        client: 'mysql',
        connection: {
            host:"localhost",
            port: 3306,
            user: "root",
            password: "",
            database: "francoDataBase"
        },
        pool: {min: 2, max:8}
    }
}

