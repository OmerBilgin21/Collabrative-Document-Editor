// utils
import { db } from "../schemas/db.js";

// types
import { IDocumentVersion } from "../schemas/version.js";

export const getLatestVersionEntry = async (
  id: string,
): Promise<IDocumentVersion | undefined> => {
  const foundDoc = await db
    .select("*")
    .from("docs")
    .where({ id: parseInt(id) })
    .first();

  if (!foundDoc) {
    return;
  }

  const latestVersion = await db
    .select("*")
    .from("doc_versions")
    .where({ doc_id: id })
    .orderBy("created_at", "desc")
    .first();

  return latestVersion;
};
