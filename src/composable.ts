import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import PouchDBHttpAdapter from 'pouchdb-adapter-http';
PouchDB.plugin(PouchDBFind);
PouchDB.plugin(PouchDBHttpAdapter);

export default function composable() {
    const db = new PouchDB('metadentdb');

    // Remote Cosmos DB instance
    const remoteDB = new PouchDB('http://localhost:5984/patients', {
        auth: {
            username: 'admin',
            password: 'password',
        },
        adapter: 'http',
        skip_setup: true,
    });

    remoteDB
    .sync(db, {
        live: true,
        retry: true
    })
    .on('change', () => {
        console.log('change');
    })
    .on('paused', () => {
        console.log('paused');
    })
    .on('active', () => {
        console.log('active');
    })
    .on('error', () => {
        console.log('error');
    });

    return {
        db,
        remoteDB
    }
}