export function calculatePlayerStats(games, playerName) {
  let wins = 0;
  let draws = 0;
  let losses = 0;

  games.forEach((game) => {
    if (game.result === "Pending") {
      return;
    }

    const isWhite = game.white === playerName;

    const isBlack = game.black === playerName;

    if (!isWhite && !isBlack) {
      return;
    }

    if (game.result === "1-1") {
      draws++;
      return;
    }

    if (game.result === "1-0" && isWhite) {
      wins++;
      return;
    }

    if (game.result === "0-1" && isBlack) {
      wins++;
      return;
    }

    losses++;
  });

  return {
    wins,
    draws,
    losses,
  };
}
