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
exports.getTotalUsers = exports.getAvatar = void 0;
const got_1 = __importDefault(require("got"));
const runescape_1 = require("../configs/runescape");
const getAvatar = (name) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof name !== "string") {
        return new TypeError("Search parameter must be a string");
    }
    try {
        const response = yield got_1.default.get(`https://secure.runescape.com/m=avatar-rs/g=runescape/${encodeURI(name)}/chat.png`);
        return response.url;
    }
    catch (error) {
        return runescape_1.miscellaneous.endpoints.defaultAvatarUrl;
    }
});
exports.getAvatar = getAvatar;
const getTotalUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield got_1.default(runescape_1.miscellaneous.endpoints.totalUsers).json();
        return response.accounts;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getTotalUsers = getTotalUsers;
//# sourceMappingURL=miscellaneous.js.map