import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function getAdminPIN() {
  const docRef = doc(db, "settings", "admin");
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Admin PIN not found");
  }

  return docSnap.data();
}
