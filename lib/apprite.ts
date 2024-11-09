import { Client, Databases, Storage, ID } from "appwrite";

const { APPWRITE_ENDPOINT_URL, APPWRITE_PROJECTID } = process.env;

const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT_URL!)
    .setProject(APPWRITE_PROJECTID!);

const database = new Databases(client);
const storage = new Storage(client);

export {
    database,
    storage,
    ID
};