"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAdmin = exports.updateAdmin = exports.deleteAdmin = exports.getAdmin = exports.loginAdmin = exports.registerAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = __importDefault(require("lodash"));
const admin_1 = __importDefault(require("../models/admin"));
const registerAdmin = async (req, res) => {
    try {
        const { email, pass, roles, name, phone } = req.body;
        const candidate = await admin_1.default.findOne({ email });
        if (candidate) {
            res.status(400).json("This user already exists");
        }
        const hash = await bcryptjs_1.default.hash(pass, 12);
        const newAdmin = new admin_1.default({
            email,
            pass: hash,
            roles,
            name,
            phone,
        });
        await newAdmin.save();
        res.status(200).json(newAdmin);
    }
    catch (err) {
        console.log(err);
    }
};
exports.registerAdmin = registerAdmin;
const loginAdmin = async (req, res) => {
    try {
        const { email, pass } = req.body;
        const candidate = await admin_1.default.findOne({ email });
        if (!candidate)
            return res.status(400).json("This user already exists");
        const isMatch = await bcryptjs_1.default.compare(pass, candidate.pass);
        if (!isMatch)
            return res.status(400).json("The password is incorrect.");
        const token = jsonwebtoken_1.default.sign({ candidateId: candidate._id }, "MERN", {
            expiresIn: "2h",
        });
        return res
            .status(200)
            .json({ token, candidateID: candidate._id, roles: candidate.roles });
    }
    catch (err) {
        console.log(err);
    }
};
exports.loginAdmin = loginAdmin;
const getAdmin = async (req, res) => {
    try {
        const candidate = await admin_1.default.findById(req.params.id);
        return res.status(200).json(candidate);
    }
    catch (err) {
        console.log(err);
    }
};
exports.getAdmin = getAdmin;
const deleteAdmin = async (req, res) => {
    try {
        await admin_1.default.findByIdAndDelete(req.params.id);
        return res.status(200).json("Delete success");
    }
    catch (err) {
        console.log(err);
    }
};
exports.deleteAdmin = deleteAdmin;
const updateAdmin = async (req, res) => {
    try {
        let candidate = (await admin_1.default.findByIdAndUpdate(req.params.id));
        if (req.body.oldPass) {
            const isMatch = await bcryptjs_1.default.compare(req.body.oldPass, candidate.pass);
            if (isMatch) {
                candidate.pass = await bcryptjs_1.default.hash(req.body.newPass, 12);
                delete req.body.newPass;
                delete req.body.oldPass;
                delete req.body.pass;
            }
            else
                return res.status(400).json("Old password is not correct.");
        }
        const updateCandidate = lodash_1.default.extend(candidate, req.body);
        await updateCandidate.save();
        return res.status(200).json(updateCandidate);
    }
    catch (err) {
        console.log(err);
    }
};
exports.updateAdmin = updateAdmin;
const getAllAdmin = async (_req, res) => {
    try {
        const admins = await admin_1.default.find({});
        return res.status(200).json(admins);
    }
    catch (err) {
        console.log(err);
    }
};
exports.getAllAdmin = getAllAdmin;
//# sourceMappingURL=admin.js.map