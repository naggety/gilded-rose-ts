import { Item } from './Item'
import { ItemBase } from './ItemBase'
import { correctOutOfLimitsQuality } from './GildedRose'

export class BackstageItem implements ItemBase {
    private item: Item;

    constructor (item: Item) {
        this.item = new Item(item.name, item.sellIn, item.quality)
    }

    executeDailyUpdate(): void {
        this.item.sellIn--;
        if (this.item.sellIn >= 10)
            this.item.quality += 1;
        else if (this.item.sellIn >= 5) 
            this.item.quality += 2;
        else if (this.item.sellIn >= 0) 
            this.item.quality += 3;
        else
            this.item.quality = 0;
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