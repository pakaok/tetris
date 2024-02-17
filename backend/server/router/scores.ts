import fs from "fs/promises";
import path from "path";
import { Request, Response } from "express";

const filePath = path.resolve(__dirname, "../data/scores.json");

interface Score {
  rank: number;
  name: string;
  score: number;
}

// Takes a username in the request and finds the user and groups in the JSON file.
export const getScores = async (req: Request, res: Response) => {
  try {
    const scoreData = await fs.readFile(filePath, { encoding: "utf-8" });

    const parsedJSON: Score[] = JSON.parse(scoreData);
    console.log("get scores", parsedJSON);

    // HTTP OK
    res.status(200).send(parsedJSON);
  } catch (e: any) {
    console.log(`Scores file read failed. ${e}`);
    // Internal server error
    res.status(500).send(`Scores file read failed. ${e}`);
  }
};

export const updateScores = async (req: Request, res: Response) => {
  const { name, score } = req.body;
  try {
    const scoreData = await fs.readFile(filePath, { encoding: "utf-8" });

    const parsedJSON: Score[] = JSON.parse(scoreData);

    // push existing user to array with rank of 0

    // sort by score descending

    // map everyones ranks based on index + 1

    // save to json
    res.send({ ok: true, error: false });
  } catch (e: any) {
    console.log(`Could not write to Scores file. ${e}`);
    res.send({ ok: false, error: true });
  }
};
