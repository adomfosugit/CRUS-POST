import { Client, Account, Databases } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('6530efde8f70bcf5da37');                 // Your project ID

 export const databases = new Databases(client);


