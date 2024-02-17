import fs from "fs/promises";
import path from "path";
import { Request, Response } from "express";

const filePath = path.resolve(__dirname, "../data/settings.json");

interface Settings {
  sizeOfField: number;
  gameLevel: number;
  gameOptions: GameOptions;
}

interface GameOptions {
  gameType: "normal" | "extended";
  playerType: "player" | "AI";
}

// Takes a username in the request and finds the user and groups in the JSON file.
export const getSettings = async (req: Request, res: Response) => {
  try {
    const scoreData = await fs.readFile(filePath, { encoding: "utf-8" });

    const parsedJSON: Settings = JSON.parse(scoreData);
    console.log("get settings", parsedJSON);

    // HTTP OK
    res.status(200).send(parsedJSON);
  } catch (e: any) {
    console.log(`Settings file read failed. ${e}`);
    // Internal Server Error
    res.status(500).send(`Settings file read failed. ${e}`);
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  console.log("post settings is", req.body);
  try {
    // convert to json write format
    const formattedJSON = JSON.stringify(req.body);
    try {
      fs.writeFile(filePath, formattedJSON);
      console.log("Success wrote settings JSON");
      return res.send({ ok: true, error: false });
    } catch (e) {
      console.log("File read failed.", e);
    }
  } catch (e) {
    console.log(`Could not write to settings file. ${e}`);
    return res.send({ ok: false, error: true });
  }
};
