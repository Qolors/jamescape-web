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
exports.getWeaknesses = exports.getSlayerCategories = exports.getBeastsByWeakness = exports.getBeastsByTerms = exports.getBeastsBySlayerCategory = exports.getBeastsByLevelRange = exports.getBeastsByFirstLetter = exports.getBeastsByArea = exports.getBeast = exports.getAreas = void 0;
const got_1 = __importDefault(require("got"));
const runescape_1 = require("../configs/runescape");
const RuneScape_1 = require("../lib/RuneScape");
const getAreas = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const areas = yield got_1.default(runescape_1.bestiary.endpoints.areas).json();
        return areas.map((area) => new RuneScape_1.Area(area));
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getAreas = getAreas;
const getBeast = (search) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof search !== "number" &&
        search.constructor.name !== "BeastSearchResult") {
        throw new TypeError("Beast ID parameter must be a number or BeastSearchResult instance");
    }
    let searchId = undefined;
    if (typeof search === "number") {
        searchId = search;
    }
    else {
        searchId = search.id;
    }
    try {
        const beast = yield got_1.default(runescape_1.bestiary.endpoints.beast, {
            searchParams: {
                beastid: searchId,
            },
        }).json();
        return new RuneScape_1.Beast(beast);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getBeast = getBeast;
const getBeastsByArea = (search) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof search !== "string" && search.constructor.name !== "Area") {
        throw new TypeError("Search parameter must be a string or Area instance");
    }
    let searchId = undefined;
    if (typeof search === "string") {
        searchId = search;
    }
    else {
        searchId = search.name;
    }
    try {
        const beasts = yield got_1.default(runescape_1.bestiary.endpoints.beastArea, {
            searchParams: {
                identifier: searchId,
            },
        }).json();
        // TODO: the empty response for this endpoint is [ 'none' ]. Remove it for an empty array
        return beasts.map((beast) => new RuneScape_1.BeastSearchResult(beast));
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getBeastsByArea = getBeastsByArea;
// TODO: validate that the search string is any of the 52 approved strings (26 english letters -- upper and lowercase)
const getBeastsByFirstLetter = (search) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof search !== "string") {
        throw new TypeError("Search parameter must be a string");
    }
    if (search.length > 1) {
        throw new Error("Search query must be a single letter");
    }
    try {
        const beasts = yield got_1.default(runescape_1.bestiary.endpoints.beastLetter, {
            searchParams: {
                letter: search.toUpperCase(),
            },
        }).json();
        // TODO: either trim, or clean up the "NPC" objects in the results
        return beasts.map((beast) => new RuneScape_1.BeastSearchResult(beast));
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getBeastsByFirstLetter = getBeastsByFirstLetter;
const getBeastsByLevelRange = (min, max) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof min !== "number") {
        throw new TypeError("Minimum level parameter must be a number");
    }
    if (typeof max !== "number") {
        throw new TypeError("Maximum level parameter must be a number");
    }
    if (min > max) {
        throw new Error("Maximum level parameter must be greater or equal to the minumum expected level");
    }
    try {
        const beasts = yield got_1.default(runescape_1.bestiary.endpoints.beastLevel, {
            searchParams: {
                identifier: `${min}-${max}`,
            },
        }).json();
        return beasts.map((beast) => new RuneScape_1.BeastSearchResult(beast));
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getBeastsByLevelRange = getBeastsByLevelRange;
const getBeastsBySlayerCategory = (search) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof search !== "number" &&
        search.constructor.name !== "SlayerCategory") {
        throw new TypeError("Search parameter must be a number or SlayerCategory instance");
    }
    let searchId = undefined;
    if (typeof search === "number") {
        searchId = search;
    }
    else {
        searchId = search.id;
    }
    try {
        const beasts = yield got_1.default(runescape_1.bestiary.endpoints.beastSlayer, {
            searchParams: {
                identifier: searchId,
            },
        }).json();
        return beasts.map((beast) => new RuneScape_1.BeastSearchResult(beast));
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getBeastsBySlayerCategory = getBeastsBySlayerCategory;
const getBeastsByTerms = (search) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof search !== "string") {
        throw new TypeError("Search parameter must be a string");
    }
    try {
        const beasts = yield got_1.default(runescape_1.bestiary.endpoints.beastTerm, {
            searchParams: {
                term: search,
            },
        }).json();
        return beasts.map((beast) => new RuneScape_1.BeastSearchResult(beast));
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getBeastsByTerms = getBeastsByTerms;
const getBeastsByWeakness = (search) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof search !== "number" && search.constructor.name !== "Weakness") {
        throw new TypeError("Search parameter must be a number or Weakness instance");
    }
    let searchId = undefined;
    if (typeof search === "number") {
        searchId = search;
    }
    else {
        searchId = search.id;
    }
    try {
        const beasts = yield got_1.default(runescape_1.bestiary.endpoints.beastWeakness, {
            searchParams: {
                identifier: searchId,
            },
        }).json();
        return beasts.map((beast) => new RuneScape_1.BeastSearchResult(beast));
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getBeastsByWeakness = getBeastsByWeakness;
const getSlayerCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield got_1.default(runescape_1.bestiary.endpoints.slayerCategories).json();
        return Object.values(categories).map((category) => new RuneScape_1.SlayerCategory(category));
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getSlayerCategories = getSlayerCategories;
const getWeaknesses = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const weaknesses = yield got_1.default(runescape_1.bestiary.endpoints.weaknesses).json();
        return Object.values(weaknesses).map((i) => new RuneScape_1.Weakness(i));
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getWeaknesses = getWeaknesses;
//# sourceMappingURL=bestiary.js.map