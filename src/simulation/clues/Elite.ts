import { randInt, roll } from 'e';

import Bank from '../../structures/Bank';
import Clue from '../../structures/Clue';
import LootTable from '../../structures/LootTable';
import { itemID } from '../../util';
import {
	BlessingTable,
	FirelighterTable,
	GildedTable,
	GiveHalfKeyTable,
	PrayerPageTable,
	TeleportScrollTable
} from './General';

export const Elite3rdageTable = new LootTable()
	.add('3rd age range coif')
	.add('3rd age range top')
	.add('3rd age range legs')
	.add('3rd age vambraces')
	.add('3rd age robe top')
	.add('3rd age robe')
	.add('3rd age mage hat')
	.add('3rd age amulet')
	.add('3rd age platelegs')
	.add('3rd age platebody')
	.add('3rd age full helmet')
	.add('3rd age plateskirt')
	.add('3rd age kiteshield')
	.add('3rd age longsword')
	.add('3rd age cloak')
	.add('3rd age wand')
	.add('3rd age bow');

export const EliteMegaRareTable = new LootTable()
	.add('Gilded scimitar')
	.add('Gilded boots')
	.add('Battlestaff', 100)
	.add('Crystal key')
	.add('Lava dragon mask')
	.add('Ranging potion(4)', 30)
	.add('Saradomin brew(4)', 30)
	.add('Super restore(4)', 30)
	.add('Ring of nature')
	.add('Extended antifire(4)', 30)
	.add('Gilded coif')
	.add("Gilded d'hide vambraces")
	.add("Gilded d'hide body")
	.add("Gilded d'hide chaps")
	.add('Gilded pickaxe')
	.add('Gilded axe')
	.add('Gilded Spade')
	.add(GildedTable, 1, 5)
	.add(Elite3rdageTable);

export const EliteTuxedoTable = new LootTable()
	.add('Dark tuxedo jacket')
	.add('Dark tuxedo cuffs')
	.add('Dark trousers')
	.add('Dark tuxedo shoes')
	.add('Dark bow tie')
	.add('Light tuxedo jacket')
	.add('Light tuxedo cuffs')
	.add('Light trousers')
	.add('Light tuxedo shoes')
	.add('Light bow tie');

export const EliteRareTable = new LootTable()
	.add('Dragon Cane')
	.add('Briefcase')
	.add('Sagacious spectacles')
	.add('Royal crown')
	.add('Royal sceptre')
	.add('Royal gown top')
	.add('Royal gown bottom')
	.add('Fury ornament kit')
	.add('Dragon chainbody ornament kit')
	.add('Dragon legs/skirt ornament kit')
	.add('Dragon sq shield ornament kit')
	.add('Dragon full helm ornament kit')
	.add('Bronze dragon mask')
	.add('Iron dragon mask')
	.add('Steel dragon mask')
	.add('Mithril dragon mask')
	.add('Afro')
	.add('Katana')
	.add('Big pirate hat')
	.add('Top hat')
	.add('Light infinity colour kit')
	.add('Dark infinity colour kit')
	.add("Black d'hide chaps (t)")
	.add("Black d'hide chaps (g)")
	.add("Black d'hide body (t)")
	.add("Black d'hide body (g)")
	.add('Musketeer hat')
	.add('Musketeer tabard')
	.add('Musketeer pants')
	.add('Deerstalker')
	.add("Blacksmith's helm")
	.add('Arceuus scarf')
	.add('Hosidius scarf')
	.add('Lovakengj scarf')
	.add('Piscarilius scarf')
	.add('Shayzien scarf')
	.add('Dragon scimitar ornament kit')
	.add('Holy wraps')
	.add('Ranger gloves')
	.add('Bucket helm')
	.add('Fremennik kilt')
	.add('Adamant dragon mask')
	.add('Rune dragon mask')
	.add("Rangers' tights")
	.add("Uri's hat")
	.add('Giant boot')
	.add("Rangers' tunic")
	.add('Monocle')
	.add(EliteMegaRareTable)
	.add(EliteTuxedoTable);

export const EliteSeedTable = new LootTable().add('Magic seed').add('Yew seed').add('Palm tree seed');

export const EliteStandardTable = new LootTable()
	.add('Coins', [20_000, 30_000])
	.add('Tuna potato', [15, 20])
	.add('Summer pie', [15, 20])
	.add('Law rune', [50, 75])
	.add('Death rune', [50, 75])
	.add('Blood rune', [50, 75])
	.add('Soul rune', [50, 75])
	.add('Oak plank', [60, 80])
	.add('Purple sweets', [9, 23])
	.add('Teak plank', [40, 50])
	.add('Mahogany plank', [20, 30])
	.add('Dragonstone bracelet')
	.add('Dragon necklace')
	.add('Dragonstone ring')
	.add('Runite bar', [1, 3])
	.add('Onyx bolt tips', [8, 12])
	.add('Dragon dagger')
	.add('Dragon longsword')
	.add('Rune platebody')
	.add('Rune platelegs')
	.add('Rune plateskirt')
	.add('Rune kiteshield')
	.add('Dragon mace')
	.add('Rune crossbow')
	.add(EliteSeedTable)
	.add(PrayerPageTable)
	.add(FirelighterTable)
	.add(GiveHalfKeyTable)
	.add(TeleportScrollTable, 1, 2)
	.add(BlessingTable);

export const EliteClueTable = new LootTable().add(EliteStandardTable, 1, 24).add(EliteRareTable, 1, 1);

export class EliteCasket extends Clue {
	public open(quantity = 1): Bank {
		const loot = new Bank();

		for (let i = 0; i < quantity; i++) {
			const numberOfRolls = randInt(4, 6);

			if (roll(5)) loot.add('Clue scroll (master)');

			for (let i = 0; i < numberOfRolls; i++) {
				loot.add(EliteClueTable.roll());
			}
		}

		return loot;
	}
}

const eliteCasket = new EliteCasket({ table: EliteClueTable });
eliteCasket.allItems.push(itemID('Clue scroll (master)'));
export default eliteCasket;
