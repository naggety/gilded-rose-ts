import { Item } from './Item'
import { ItemBase } from './ItemBase'

export class LegendaryItem implements ItemBase {
    private item: Item;

    constructor (item: Item) {
        this.item = new Item(item.name, item.sellIn, item.quality)
    }

    executeDailyUpdate(): void {
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