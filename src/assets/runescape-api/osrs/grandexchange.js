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
exports.getItemGraph = exports.getItem = void 0;
const got_1 = __importDefault(require("got"));
const oldschool_1 = require("../configs/oldschool");
const RuneScape_1 = require("../lib/RuneScape");
const getItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof id !== "number") {
        throw new TypeError("Item ID parameter must be a number");
    }
    try {
        const response = yield got_1.default(oldschool_1.grandexchange.endpoints.item, {
            searchParams: {
                item: id,
            },
        }).json();
        return new RuneScape_1.Item(response.item);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getItem = getItem;
const getItemGraph = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof id !== "number") {
        throw new TypeError("Item ID parameter must be a number");
    }
    try {
        const response = yield got_1.default(`${oldschool_1.grandexchange.endpoints.itemGraph}/${id}.json`).json();
        return new RuneScape_1.ItemGraph(id, response);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getItemGraph = getItemGraph;
//# sourceMappingURL=grandexchange.js.map