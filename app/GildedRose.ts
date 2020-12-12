import { Item } from './Item'
import { ItemBase } from './ItemBase'
import { createItem } from './ItemFactory'

export class GildedRose {
    items: Array<ItemBase>;

    constructor(items = [] as Array<Item>) {
        this.items = items.map(createItem);
    }

    updateQuality() {
        for (let item of this.items) {
            item.executeDailyUpdate();
        }
        return this.items.map(itemBase => new Item(itemBase.getName(), itemBase.getSellingDaysLimit(), itemBase.getQuality()));
    }
}

const MAX_QUALITY = 50
const MIN_QUALITY = 0

export function correctOutOfLimitsQuality(quality: number, min: number = MIN_QUALITY, max: number = MAX_QUALITY) {
    if (quality > max)
        quality = max
    else if (quality < min)
        quality = min;
    return quality
}