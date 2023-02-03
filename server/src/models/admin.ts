import * as mongoose from "mongoose";
import { Model } from "mongoose";

type AdminType = AdminModel & mongoose.Document;

export interface AdminModel {
  email: string;
  name: string;
  pass: string;
  roles: string;
  phone: string;
}

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  roles: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Admin: Model<AdminType> = mongoose.model<AdminType>("Admin", AdminSchema);
export default Admin;
