'use server'

import { database } from "@/lib/apprite";
import { ID } from "appwrite";

const { APPWRITE_DATABASEID } = process.env;

export const createDocument = async (collectionId: string, document: { [key: string]: string }) => {
  return database.createDocument(
    APPWRITE_DATABASEID!,
    collectionId,
    ID.unique(),
    document
  );
};

/* 

queries: should be in this format of [Query.equal('name', 'John')]

*/

export const listDocuments = async (collectionId: string, queries: string[]) => {
  return database.listDocuments(
    APPWRITE_DATABASEID!,
    collectionId,
    queries
  );
};

