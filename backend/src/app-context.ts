import express from "express";

export interface AppContext {
  req: express.Request;
  res: express.Response;
  payload?: { userId: string };
}
