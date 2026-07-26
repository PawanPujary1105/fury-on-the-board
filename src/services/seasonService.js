import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase";

export async function getSeasons() {
  const querySnapshot = await getDocs(collection(db, "seasons"));

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function addSeason(season) {
  await addDoc(collection(db, "seasons"), season);
}

export async function updateSeason(id, season) {
  await updateDoc(doc(db, "seasons", id), season);
}

export async function deleteSeason(id) {
  await deleteDoc(doc(db, "seasons", id));
}

export async function deactivateOtherSeasons(currentSeasonId = null) {
  const seasons = await getSeasons();
  const activeSeason = seasons.find(
    (season) => season.active && season.id !== currentSeasonId,
  );

  if (!activeSeason) {
    return;
  }

  await updateSeason(activeSeason.id, {
    active: false,
  });
}
