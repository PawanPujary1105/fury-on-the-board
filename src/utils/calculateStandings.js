export function calculateStandings(games, format) {
  const standings = {};

  games.forEach((game) => {
    if (game.format !== format) {
      return;
    }
    if (game.result === "Pending") {
      return;
    }

    if (!standings[game.white]) {
      standings[game.white] = {
        name: game.white,
        points: 0,
        wins: 0,
        draws: 0,
        losses: 0,
      };
    }

    if (!standings[game.black]) {
      standings[game.black] = {
        name: game.black,
        points: 0,
        wins: 0,
        draws: 0,
        losses: 0,
      };
    }

    if (game.result === "1-0") {
      standings[game.white].points += 2;
      standings[game.white].wins += 1;
      standings[game.black].losses += 1;
    }

    if (game.result === "0-1") {
      standings[game.black].points += 2;
      standings[game.black].wins += 1;
      standings[game.white].losses += 1;
    }

    if (game.result === "1-1") {
      standings[game.white].points += 1;
      standings[game.black].points += 1;
      standings[game.white].draws += 1;
      standings[game.black].draws += 1;
    }
  });

  return Object.values(standings).sort((a, b) => b.points - a.points);
}
