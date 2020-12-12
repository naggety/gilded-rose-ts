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

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];

            if (isLegendary(item))
                continue;

            item.sellIn--

            if (isNormalItem(item)) {
                item.quality -= item.sellIn >= 0 ? 1 : 2;
            }
            else if (isAgedBrie(item)) {
                item.quality += item.sellIn >= 0 ? 1 : 2;
            } else if (isBackstagePasses(item)) {
                if      (item.sellIn >= 10) item.quality += 1;
                else if (item.sellIn >= 5)  item.quality += 2;
                else if (item.sellIn >= 0)  item.quality += 3;
                else                        item.quality = 0;
            }
            else {
                console.error("Unknown type for Item: " + item.name);
            }

            item.quality = correctOutOfLimitsQuality(item.quality);
        }

        return this.items;
    }
}

function isNormalItem (item: Item): boolean {
    return item.name !== 'Aged Brie'
            && item.name !== 'Backstage passes to a TAFKAL80ETC concert'
            && item.name !== 'Sulfuras, Hand of Ragnaros';
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