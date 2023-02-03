import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import _ from "lodash";

import Admin from "../models/admin";

export const registerAdmin: RequestHandler = async (req: any, res: any) => {
  try {
    const { email, pass, roles, name, phone } = req.body;

    const candidate = await Admin.findOne({ email });

    if (candidate) {
      res.status(400).json("This user already exists");
    }

    const hash = await bcrypt.hash(pass, 12);

    const newAdmin = new Admin({
      email,
      pass: hash,
      roles,
      name,
      phone,
    });

    await newAdmin.save();

    res.status(200).json(newAdmin);
  } catch (err: any) {
    console.log(err);
  }
};

export const loginAdmin: RequestHandler = async (req: any, res: any) => {
  try {
    const { email, pass } = req.body;

    const candidate = await Admin.findOne({ email });

    if (!candidate) return res.status(400).json("This user already exists");

    const isMatch = await bcrypt.compare(pass, candidate.pass);

    if (!isMatch) return res.status(400).json("The password is incorrect.");

    const token = jwt.sign({ candidateId: candidate._id }, "MERN", {
      expiresIn: "2h",
    });

    return res
      .status(200)
      .json({ token, candidateID: candidate._id, roles: candidate.roles });
  } catch (err: any) {
    console.log(err);
  }
};

export const getAdmin: RequestHandler = async (req: any, res: any) => {
  try {
    const candidate = await Admin.findById(req.params.id);

    return res.status(200).json(candidate);
  } catch (err: any) {
    console.log(err);
  }
};

export const deleteAdmin: RequestHandler = async (req: any, res: any) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    return res.status(200).json("Delete success");
  } catch (err: any) {
    console.log(err);
  }
};

export const updateAdmin: RequestHandler = async (req: any, res: any) => {
  try {
    let candidate = (await Admin.findByIdAndUpdate(req.params.id)) as {
      email: string;
      pass: string;
      roles: string;
      name: string;
      phone: string;
    };
    if (req.body.oldPass) {
      const isMatch = await bcrypt.compare(req.body.oldPass, candidate.pass);
      if (isMatch) {
        candidate.pass = await bcrypt.hash(req.body.newPass, 12);
        delete req.body.newPass;
        delete req.body.oldPass;
        delete req.body.pass;
      } else return res.status(400).json("Old password is not correct.");
    }

    const updateCandidate = _.extend(candidate, req.body);

    await updateCandidate.save();

    return res.status(200).json(updateCandidate);
  } catch (err: any) {
    console.log(err);
  }
};

export const getAllAdmin: RequestHandler = async (_req: any, res: any) => {
  try {
    const admins = await Admin.find({});
    return res.status(200).json(admins);
  } catch (err: any) {
    console.log(err);
  }
};
