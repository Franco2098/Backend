export default {
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

