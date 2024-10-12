import { writeFileSync } from "node:fs";

import { type Item, Items, Monsters } from "../src";

export function safeItemName(itemName: string) {
	let key = itemName;
	key = key.replace("3rd", "third");
	key = key.replace(/[^\w\s]|_/g, "");
	key = key.replace(/\s+/g, "_");
	key = key.toUpperCase();
	return key;
}

const startsWithNumber = (str: string): boolean => /^[0-9]/.test(str);

async function main() {
	const spritesheetJSON = await fetch(
		"https://raw.githubusercontent.com/oldschoolgg/oldschoolbot/refs/heads/master/src/lib/resources/images/spritesheet.json",
	).then(res => res.json());
	const osbItems = new Set(Object.keys(spritesheetJSON).map(stringID => Number(stringID)));

	function shouldIgnoreItem(item: Item) {
		return !osbItems.has(item.id);
	}

	const enumItems: [string, number][] = [];
	const exitingKeys = new Set<string>();
	const itemsToIgnore = new Set<string>();
	for (const item of Items.values()) {
		if (shouldIgnoreItem(item)) continue;
		const key = safeItemName(item.name);

		if (exitingKeys.has(key)) {
			itemsToIgnore.add(key);
			continue;
		}

		exitingKeys.add(key);
		enumItems.push([key, item.id]);
	}

	let str = "export enum EItem {";
	for (const [key, value] of enumItems) {
		if (itemsToIgnore.has(key)) continue;
		const codeKey = startsWithNumber(key) ? `'${key}'` : key;
		str += `\n\t${codeKey} = ${value},`;
	}
	str += "\n}";
	str += "\n";
	writeFileSync("./src/EItem.ts", str);

	// EMonster
	let monsterEnumStr = "export enum EMonster {";
	for (const monster of Monsters.values()) {
		let key = monster.name;
		key = key.replaceAll(" ", "_");
		key = key.replace(/[^a-zA-Z0-9_]/g, "").toUpperCase();
		monsterEnumStr += `\n\t${key} = ${monster.id},`;
	}
	monsterEnumStr += "\n}";
	writeFileSync("./src/EMonster.ts", monsterEnumStr);
}

main();
