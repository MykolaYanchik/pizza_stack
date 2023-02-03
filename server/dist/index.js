"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const admin_1 = __importDefault(require("./routes/admin"));
const body_parser_1 = require("body-parser");
const port = 5000;
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use("/api", admin_1.default);
mongoose_1.default.set("strictQuery", true);
mongoose_1.default.connect("mongodb+srv://Mykola:11october@cluster0.fk1ls.mongodb.net/?retryWrites=true&w=majority", () => {
    console.log("Database connected succesfull");
});
app.listen(port);
//# sourceMappingURL=index.js.map