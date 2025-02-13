import { db } from "../services/firebaseConfig.js";
import { setDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

export async function savePlayerScore(playerName, Combo) {
  try {
    if (!playerName || typeof playerName !== 'string' || playerName.trim() === '') {
      throw new Error("O nome do jogador é inválido.");
    }
    

    await setDoc(doc(db, "Combos", playerName), {
      name: playerName,
      Combo: Combo,
      timestamp: serverTimestamp()
    });

    console.log(`Combo de ${Combo} salvo com sucesso para o jogador ${playerName}!`);
  } catch (error) {
    console.error("Erro ao salvar score: ", error.message);
  }
}

