export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

const MAX_QUALITY = 50
const MIN_QUALITY = 0
enum ItemType {
    NORMAL, AGED_BRIE, LEGENDARY, BACKSTAGE_PASS
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            const itemType = getItemType(item);

            if (itemType === ItemType.LEGENDARY)
                continue;

            item.sellIn--

            switch (itemType) {
                case ItemType.NORMAL:
                    item.quality -= item.sellIn >= 0 ? 1 : 2;
                    break;
                case ItemType.AGED_BRIE:
                    item.quality += item.sellIn >= 0 ? 1 : 2;
                    break;
                case ItemType.BACKSTAGE_PASS:
                    if      (item.sellIn >= 10) item.quality += 1;
                    else if (item.sellIn >= 5)  item.quality += 2;
                    else if (item.sellIn >= 0)  item.quality += 3;
                    else                        item.quality = 0;
                    break;
                default:
                    console.error("Unknown type for Item: " + item.name);
                    break;
            }

            item.quality = correctOutOfLimitsQuality(item.quality);
        }

        return this.items;
    }
}

function getItemType (item: Item): ItemType {
    if (isAgedBrie(item))
        return ItemType.AGED_BRIE;
    else if (isBackstagePasses(item))
        return ItemType.BACKSTAGE_PASS;
    else if (isLegendary(item))
        return ItemType.LEGENDARY;
    else
        return ItemType.NORMAL;
}

function isAgedBrie(item: Item): boolean {
    return item.name === 'Aged Brie'
}

function isBackstagePasses(item: Item): boolean {
    return item.name === 'Backstage passes to a TAFKAL80ETC concert'
}

function isLegendary(item: Item): boolean {
    return item.name === 'Sulfuras, Hand of Ragnaros'
}

function correctOutOfLimitsQuality(quality: number, min: number = MIN_QUALITY, max: number = MAX_QUALITY) {
    if (quality > max)
        quality = max
    else if (quality < min)
        quality = min;
    return quality
}