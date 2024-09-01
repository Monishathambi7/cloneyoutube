import History from "../models/History.js";
import  users from '../models/auth.js'
import mongoose from "mongoose";

export const HistoryController = async (req, res) => {
  const HistoryData = req.body;
  const addToHistory = new History(HistoryData);
  console.log(HistoryData)
  try {
    await addToHistory.save();
    const user = await users.findById(HistoryData.Viewer);
    user.points += 5;
    await user.save();
    console.log("points:"+user.points);
    res.status(200).json({ message: "added to History",user });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getAllHistoryController = async (req, res) => {
  try {
    const files = await History.find();
    //console.log(files)
    res.status(200).send(files);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const deleteHistoryController = async (req, res) => {
  const { userId:userId } = req.params;
  // console.log(userId)
  try {
    await History.deleteMany({
        Viewer:userId
    });
    res.status(200).json({ message: "Removed  from your watch Laters" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};