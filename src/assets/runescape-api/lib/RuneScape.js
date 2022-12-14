"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weakness = exports.SlayerCategory = exports.Skill = exports.RuneMetricsProfile = exports.RuneMetricsMonthlyExperience = exports.Quest = exports.Player = exports.ItemGraph = exports.Item = exports.GrandExchangeCategory = exports.ClanMember = exports.BeastSearchResult = exports.Beast = exports.Area = void 0;
const runescape_1 = require("../configs/runescape");
const Jagex_1 = require("../utils/Jagex");
class Area {
    constructor(area) {
        this.name = area;
    }
}
exports.Area = Area;
class Beast {
    constructor(beast) {
        this.id = beast.id;
        this.name = beast.name;
        this.examine = beast.description;
        this.members = beast.members;
        this.level = beast.level;
        this.attack = beast.attack;
        this.defence = beast.defence;
        this.magic = beast.magic;
        this.ranged = beast.ranged;
        this.lifepoints = beast.lifepoints;
        this.xp = beast.xp;
        this.areas = beast.areas;
        this.animations = beast.animations;
        this.size = beast.size;
        this.attackable = beast.attackable;
        this.aggressive = beast.aggressive;
        this.poisonous = beast.poisonous;
        this.weakness = beast.weakness ? new Weakness(beast.weakness) : undefined;
    }
    get meta() {
        return {
            id: this.id,
            name: this.name,
            examine: this.examine,
            members: this.members,
        };
    }
    get combatModifiers() {
        return {
            attackable: this.attackable,
            aggressive: this.aggressive,
            poisonous: this.poisonous,
            weakness: this.weakness,
        };
    }
    get combatStats() {
        return {
            magic: this.magic,
            defence: this.defence,
            ranged: this.ranged,
            attack: this.attack,
            lifepoints: this.lifepoints,
        };
    }
}
exports.Beast = Beast;
class BeastSearchResult {
    constructor(beast) {
        this.id = beast.value;
        this.name = beast.label;
    }
}
exports.BeastSearchResult = BeastSearchResult;
class ClanMember {
    constructor(member) {
        const [name, rank, experience, kills] = member.split(",");
        const regex = new RegExp(/\uFFFD/g);
        this.name = name.replace(regex, " ");
        this.rank = rank;
        this.experience = parseInt(experience);
        this.kills = parseInt(kills);
    }
}
exports.ClanMember = ClanMember;
class GrandExchangeCategory {
    constructor(category) {
        if (typeof category === "string") {
            this.id = runescape_1.grandexchange.categories.indexOf(category);
            this.name = category;
        }
        else {
            this.id = category;
            this.name = runescape_1.grandexchange.categories[category];
        }
    }
}
exports.GrandExchangeCategory = GrandExchangeCategory;
class Item {
    constructor(item) {
        this.id = item.id;
        this.name = item.name;
        this.examine = item.description;
        this.category = new GrandExchangeCategory(item.type);
        this.members = item.members === "true" ? true : false;
        this.icons = {
            default: item.icon,
            large: item.icon_large,
        };
        this.trends = {
            current: item.current,
            today: item.today,
            day30: item.day30,
            day90: item.day90,
            day180: item.day180,
        };
    }
}
exports.Item = Item;
class ItemGraph {
    constructor(id, graph) {
        this.id = id;
        this.daily = graph.daily;
        this.average = graph.average;
    }
}
exports.ItemGraph = ItemGraph;
class Player {
    constructor(name, player) {
        this.name = name;
        this.activities = player.activities;
        this.skills = player.skills;
    }
}
exports.Player = Player;
class Quest {
    constructor(quest) {
        this.name = quest.title;
        this.status = quest.status;
        this.difficulty = quest.difficulty;
        this.members = quest.members;
        this.questPoints = quest.questPoints;
        this.eligible = quest.userEligible;
    }
}
exports.Quest = Quest;
class RuneMetricsMonthlyExperience {
    constructor(monthlyExperienceGain) {
        this.skill = new Skill(monthlyExperienceGain.skillId);
        this.totalExperience = monthlyExperienceGain.totalXp;
        this.totalGain = monthlyExperienceGain.totalGain;
        this.monthData = monthlyExperienceGain.monthData;
    }
}
exports.RuneMetricsMonthlyExperience = RuneMetricsMonthlyExperience;
class RuneMetricsProfile {
    constructor(profile) {
        this.name = profile.name;
        this.combatLevel = profile.combatlevel;
        this.experience_distribution = {
            magic: profile.magic,
            melee: profile.melee,
            ranged: profile.ranged,
        };
        this.overall = {
            rank: 23,
            level: profile.totalskill,
            experience: profile.totalxp,
        };
        this.skills = Jagex_1.formatRuneMetricsProfileSkills(profile.skillvalues);
        this.quests = {
            complete: profile.questscomplete,
            started: profile.questsstarted,
            not_started: profile.questsnotstarted,
        };
        this.activities = profile.activities.map(({ text, details, date }) => {
            return {
                title: text,
                description: details,
                date,
            };
        });
    }
}
exports.RuneMetricsProfile = RuneMetricsProfile;
class Skill {
    constructor(skill) {
        if (typeof skill === "string") {
            this.id = runescape_1.hiscores.skills.indexOf(skill);
            this.name = skill;
        }
        else {
            this.id = skill;
            this.name = runescape_1.hiscores.skills[skill];
        }
    }
}
exports.Skill = Skill;
class SlayerCategory {
    constructor(category) {
        if (typeof category === "string") {
            const [{ id }] = runescape_1.bestiary.slayerCategories.filter(({ name }) => name === category);
            this.id = id;
            this.name = category;
        }
        else {
            const [{ name }] = runescape_1.bestiary.slayerCategories.filter(({ id }) => id === category);
            this.id = category;
            this.name = name;
        }
    }
}
exports.SlayerCategory = SlayerCategory;
class Weakness {
    constructor(weakness) {
        if (typeof weakness === "string") {
            this.id = runescape_1.bestiary.weaknesses.indexOf(weakness);
            this.name = weakness;
        }
        else {
            this.id = weakness;
            this.name = runescape_1.bestiary.weaknesses[weakness];
        }
    }
}
exports.Weakness = Weakness;
//# sourceMappingURL=RuneScape.js.map