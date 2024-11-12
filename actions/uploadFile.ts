'use server'

import { storage } from "@/lib/apprite";
import { ID } from "appwrite";


const { APPWRITE_STORAGEID } = process.env;

export const uploadFile = async (form: FormData) => {
  const file: File = form.get('file') as unknown as File
  if (!file) return Promise.reject('File not found');

  return storage.createFile(
    APPWRITE_STORAGEID!,
    ID.unique(),
    file
  )
};

export const getFilePreview = async (fileId: string) => {
  return storage.getFilePreview(APPWRITE_STORAGEID!, fileId);
}