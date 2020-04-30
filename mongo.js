// https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database
// const {MongoClient} = require('mongodb');

// async function main() {
//     // Connection uri to my clusture
//     const uri = "mongodb+srv://blog_man:s12572@blog-cluster-8ad2j.mongodb.net/test?retryWrites=true&w=majority";
    
//     // Instance of the Mongo client
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//     // Use MongoClient to connect to our clusture. client.connect returns a promise.
//     await client.connect();

//     // Ready to interact with the db:
//     await listDatabases(client);

//     try {
//         await client.connect();

//         await listDatabases(client);
//     } catch (error) {
//         console.log(error);
//     } finally {
//         await client.close();
//     }

// }

// main().catch(console.error);

// async function listDatabases(client) {
//     databasesList = await client.db().admin().listDatabases();

//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };


const {MongoClient} = require('mongodb');

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See http://bit.ly/NodeDocs_lauren for more details
     */
    const uri = "mongodb+srv://blog_man:s12572@blog-cluster-8ad2j.mongodb.net/test?retryWrites=true&w=majority";
   
    /**
     * The Mongo Client you will use to interact with your database
     * See bit.ly/Node_MongoClient for more details
     */
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls

        // Create a single new listing
        // await createListing(client,
        //     {
        //         name: "Lovely Loft",
        //         summary: "A charming loft in Paris",
        //         bedrooms: 1,
        //         bathrooms: 1
        //     }
        // );
  
        // // Create 3 new listings
        // await createMultipleListings(client, [
        //     {
        //         name: "Infinite Views",
        //         summary: "Modern home with infinite views from the infinity pool",
        //         property_type: "House",
        //         bedrooms: 5,
        //         bathrooms: 4.5,
        //         beds: 5
        //     },
        //     {
        //         name: "Private room in London",
        //         property_type: "Apartment",
        //         bedrooms: 1,
        //         bathroom: 1
        //     },
        //     {
        //         name: "Beautiful Beach House",
        //         summary: "Enjoy relaxed beach living in this house with a private beach",
        //         bedrooms: 4,
        //         bathrooms: 2.5,
        //         beds: 7,
        //         last_review: new Date()
        //     }
        // ]);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * Create a new Airbnb listing
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {Object} newListing The new listing to be added
 */
async function createListing(client, newListing){
    // See http://bit.ly/Node_InsertOne for the insertOne() docs
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

/**
 * Create multiple Airbnb listings
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {Object[]} newListings The new listings to be added
 */
async function createMultipleListings(client, newListings){
    // See http://bit.ly/Node_InsertMany for the insertMany() docs
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);

    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
}