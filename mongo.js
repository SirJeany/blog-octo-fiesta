const {MongoClient} = require('mongodb');

async function main() {
    // Connection uri to my clusture
    const uri = "mongodb+srv://blog_man:s12572@blog-cluster-8ad2j.mongodb.net/test?retryWrites=true&w=majority";

    // Instance of the Mongo client
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Use MongoClient to connect to our clusture. client.connect returns a promise.
    await client.connect();

    // Ready to interact with the db:
    await listDatabases(client);

    try {
        await client.connect();

        await listDatabases(client);
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }

}

main().catch(console.error);

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};