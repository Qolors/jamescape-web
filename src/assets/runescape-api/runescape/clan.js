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
exports.getMembers = void 0;
const got_1 = __importDefault(require("got"));
const runescape_1 = require("../configs/runescape");
const RuneScape_1 = require("../lib/RuneScape");
const Jagex_1 = require("../utils/Jagex");
const getMembers = (search) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof search !== "string") {
        throw new TypeError("Search parameter must be a string");
    }
    try {
        const members = yield got_1.default(runescape_1.clan.endpoints.members, {
            searchParams: {
                clanName: search,
            },
        });
        const membersArray = Jagex_1.parseJagexClanToArray(members.body);
        return membersArray.map((member) => new RuneScape_1.ClanMember(member));
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getMembers = getMembers;
//# sourceMappingURL=clan.js.map