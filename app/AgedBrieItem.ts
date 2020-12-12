import { Item } from './Item'
import { ItemBase } from './ItemBase'
import { correctOutOfLimitsQuality } from './GildedRose'

export class AgedBrieItem implements ItemBase {
    private item: Item;

    constructor (item: Item) {
        this.item = new Item(item.name, item.sellIn, item.quality)
    }

    executeDailyUpdate(): void {
        this.item.sellIn--;
        this.item.quality += this.item.sellIn >= 0 ? 1 : 2;
        this.item.quality = correctOutOfLimitsQuality(this.item.quality);
    }

    getName(): string {
        return this.item.name;
    }

    getQuality(): number {
        return this.item.quality;
    }

    getSellingDaysLimit(): number {
        return this.item.sellIn;
    }
}