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
exports.getQuests = exports.getProfile = exports.getMonthlyXp = void 0;
const got_1 = __importDefault(require("got"));
const runescape_1 = require("../configs/runescape");
const RuneScape_1 = require("../lib/RuneScape");
// TODO: Fail spectacularly if their profile is "unavailable" (may just mean they're private)
const getMonthlyXp = (name, skill) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof name !== "string") {
        throw new TypeError("Player name parameter must be a string");
    }
    if (typeof skill !== "number" && skill.constructor.name !== "Skill") {
        throw new TypeError("Skill parameter must be a number or Skill instance");
    }
    let skillId = undefined;
    if (typeof skill === "number") {
        skillId = skill;
    }
    else {
        skillId = skill.id;
    }
    try {
        const response = yield got_1.default(runescape_1.runemetrics.endpoints.monthlyXp, {
            searchParams: {
                searchName: name,
                skillid: skillId,
            },
        }).json();
        return new RuneScape_1.RuneMetricsMonthlyExperience(response.monthlyXpGain[0]);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getMonthlyXp = getMonthlyXp;
const getProfile = (name) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof name !== "string") {
        throw new TypeError("Player name parameter must be a string");
    }
    try {
        const profile = yield got_1.default(runescape_1.runemetrics.endpoints.profile, {
            searchParams: {
                activities: 20,
                user: name,
            },
        }).json();
        return new RuneScape_1.RuneMetricsProfile(profile);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getProfile = getProfile;
const getQuests = (name) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof name !== "string") {
        throw new TypeError("Player name parameter must be a string");
    }
    try {
        const response = yield got_1.default(runescape_1.runemetrics.endpoints.quests, {
            searchParams: {
                user: name,
            },
        }).json();
        return response.quests.map((quest) => new RuneScape_1.Quest(quest));
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getQuests = getQuests;
//# sourceMappingURL=runemetrics.js.map