import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

export async function getPlayers() {
  const querySnapshot = await getDocs(collection(db, "players"));

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addPlayer(player) {
  await addDoc(collection(db, "players"), player);
}

export async function deletePlayer(id) {
  await deleteDoc(doc(db, "players", id));
}

export async function updatePlayer(id, player) {
  await updateDoc(doc(db, "players", id), player);
}
