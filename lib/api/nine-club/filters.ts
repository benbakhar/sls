import { INineClubResponse } from ".";

export const filterTopScores = (response: INineClubResponse, numOfScores: number = Infinity): INineClubResponse =>
  Object.keys(response)
    .slice(0, numOfScores)
    .reduce((acc, score) => ({
      ...acc,
      [score]: response[score],
    }), {});

export const filterBySkater = (response: INineClubResponse, skater: string): INineClubResponse =>
  Object.keys(response).reduce((acc, score) => {
    const results = response[score].filter((result) => result.skater === skater);

    if (results.length) {
      acc[score] = results;
    }

    return acc;
  }, {} as INineClubResponse);
