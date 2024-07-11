"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectMongoose = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function connectMongoose() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = process.env.DATABASE_URL;
        try {
            if (!url) {
                console.error("Missing MONGODB_URI environment variable");
                process.exit(1);
            }
            yield mongoose_1.default.connect(url, {});
        }
        catch (error) {
            console.error("Error:", error);
        }
    });
}
function disconnectMongoose() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    });
}
exports.disconnectMongoose = disconnectMongoose;
exports.default = connectMongoose;
