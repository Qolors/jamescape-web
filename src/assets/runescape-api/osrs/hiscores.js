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
exports.getPlayer = void 0;
const got_1 = __importDefault(require("got"));
const oldschool_1 = require("../configs/oldschool");
const Oldschool_1 = require("../lib/Oldschool");
const Jagex_1 = require("../utils/Jagex");
// type GetPlayerOptions = {
//   gamemode: typeof hiscores.gamemodes[number]
// }
// TODO: Handle 404 (player does not exist) response
const getPlayer = (name, gamemode = "normal") => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof name !== "string") {
        throw new TypeError("Player name parameter must be a string");
    }
    if (![...oldschool_1.hiscores.gamemodes].includes(gamemode)) {
        throw new Error(`Invalid gamemode selected. Available options are: ${oldschool_1.hiscores.gamemodes.join(" | ")}`);
    }
    try {
        const response = yield got_1.default(oldschool_1.hiscores.endpoints[gamemode], {
            searchParams: {
                player: name,
            },
        });
        const player = Jagex_1.parseJagexOSRSPlayerToJSON(response.body);
        return new Oldschool_1.Player(name, player);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getPlayer = getPlayer;
//# sourceMappingURL=hiscores.js.map