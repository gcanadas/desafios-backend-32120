const { knex } = require('knex');

// import knex from 'knex';


const optionsMysql = {
    client: 'mysql',
    connection: {
        host: process.env.HOST_DB || '127.0.0.1',
        port: process.env.PORT_DB || 3306,
        user: process.env.USER_DB || 'root',
        password: process.env.PASS_DB || '',
        database: process.env.NAME_DB || 'desafio7-sql',
    },
};

const optionsSqlite3 = {
    client: 'sqlite3',
    connection: {
        filename: './db/ecommerce.sqlite'
    },
    useNullAsDefault: true,
};

function setDB (type) {
    if(type === 'product') {
        return {knexInstance: knex(optionsMysql), table: 'productos'}
    } else if (type === 'message') {
        return {knexInstance: knex(optionsSqlite3), table: 'mensajes'}
    } else {
        console.log('Tipo de base de datos desconocida');
        throw error
    }
}
  
async function createTableProducts() {
    const knexInstance = knex(optionsMysql)
    try {
        const exist = await knexInstance.schema.hasTable('productos')
        if(exist) {
            console.log('La tabla productos ya existe.')
            return
        }
        await knexInstance.schema.createTable('productos', (table) => {
            table.increments('id').notNullable()
            table.string('title', 20).notNullable()
            table.float('price').notNullable()
            table.string('thumbnail', 70).notNullable()
            table.integer('stock').notNullable()
            table.primary('id')
        })
        console.log('Tabla de productos creada.')
    } catch (error) {
        console.error(error.message)
        throw error
    } finally {
        knexInstance.destroy()
    }
}

async function createTableMessages() {
    const knexInstance = knex(optionsSqlite3)
    try {
        const exist = await knexInstance.schema.hasTable('mensajes')
        if(exist) {
            console.log('La tabla de mensajes ya existe.')
            return
        }
        await knexInstance.schema.createTable('mensajes', (table) => {
            table.increments('id').notNullable()
            table.string('message', 250).notNullable()
            table.string('email', 40).notNullable()
            table.string('date', 50).notNullable()
            table.primary('id')
        })
        console.log('Tabla de mensajes creada.')
    } catch (error) {
        console.error(error.message)
        throw error
    } finally {
        knexInstance.destroy()
    }
}

async function insertDB(data, type) {
    const {knexInstance, table} = setDB(type);
    try {
        await knexInstance(table).insert(data)
        console.log(`${table} agregados a la DB con exito`)
    } catch (error) {
        console.error(error)
        throw error
    } finally {
        knexInstance.destroy()
    }
}

async function getDB(type) {
    const {knexInstance, table} = setDB(type);
    try {
        const rows = await knexInstance(table).select('*')
        console.log(`${table} encontrados en la BD con exito`, rows.length)
        return rows
    } catch (error) {
        console.error(error)
        throw error
    } finally {
        knexInstance.destroy()
    }
}

//Funciones implementadas para ser utilizadas en futuras entregas
async function updateDB(data, type, conditons) {
    const {knexInstance, table} = setDB(type);
    try {
        await knexInstance(table).update(data).where(conditons)
        console.log('Elementos editados')
    } catch (error) {
        console.error(error.message)
        throw error
    } finally {
        knexInstance.destroy()
    }
}

async function deleteElementsDB(type, conditions) {
    const {knexInstance, table} = setDB(type);
    try {
        if (conditions) {
            await knexInstance.from(table).del().where(conditions)
        } else {
            await knexInstance.from(table).del()
        }
        console.log('Elementos eliminados')
    } catch (error) {
        console.error(error.message)
        throw error
    } finally {
        knexInstance.destroy()
    }
}

module.exports = {
    createTableProducts,
    createTableMessages,
    insertDB,
    getDB,
    updateDB,
    deleteElementsDB
};