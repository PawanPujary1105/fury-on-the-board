import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

export async function getGames() {
  const querySnapshot = await getDocs(collection(db, "games"));

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addGame(game) {
  await addDoc(collection(db, "games"), game);
}

export async function deleteGame(id) {
  await deleteDoc(doc(db, "games", id));
}

export async function updateGame(id, game) {
  await updateDoc(doc(db, "games", id), game);
}
