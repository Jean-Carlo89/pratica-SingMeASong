import pg from 'pg'

const {Pool} = pg

const databaseConfig={
    user:'postgres',
    password:'123456',
    port:5432,
    database:process.env.NODE_ENV==='test' ? "sing_me_a_song_test" : "sing_me_a_song"
}

const connection = new Pool(databaseConfig)



export default connection


