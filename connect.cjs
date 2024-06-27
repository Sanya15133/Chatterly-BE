"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file
const uri = process.env.MONGODB_URI;
// Log the URI to ensure it is loaded correctly (remove this in production)
console.log(`MongoDB URI: ${uri}`);
if (!uri) {
    console.error('MongoDB URI is not defined. Please check your .env file.');
    process.exit(1);
}
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Attempting to connect to MongoDB...');
            yield client.connect();
            console.log('Connected to MongoDB server.');
            console.log('Pinging the MongoDB server...');
            yield client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        }
        catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
        finally {
            try {
                yield client.close();
                console.log('MongoDB connection closed.');
            }
            catch (closeError) {
                console.error('Error closing MongoDB connection:', closeError);
            }
        }
    });
}
run().catch(error => {
    console.error('Error in run function:', error);
});
