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

            if (item.name === 'Sulfuras, Hand of Ragnaros')
                continue;

            item.sellIn--

            if (isNormalItem(item)) {
                item.quality -= item.sellIn >= 0 ? 1 : 2;
                item.quality = correctOutOfLimitsQuality(item.quality);
            }
            else if (isAgedBrie(item)) {
                item.quality += item.sellIn >= 0 ? 1 : 2;
                item.quality = correctOutOfLimitsQuality(item.quality);
            } else {
                if (item.quality < 50) {
                    item.quality = item.quality + 1
                    if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
                        if (item.sellIn < 10) {
                            if (item.quality < 50) {
                                item.quality = item.quality + 1
                            }
                        }
                        if (item.sellIn < 5) {
                            if (item.quality < 50) {
                                item.quality = item.quality + 1
                            }
                        }
                    }
                }
            }
            
            
            if (item.sellIn < 0) {
                if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
                    item.quality = item.quality - item.quality
                }
            }
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

function correctOutOfLimitsQuality(quality: number, min: number = MIN_QUALITY, max: number = MAX_QUALITY) {
    if (quality > max)
        quality = max
    else if (quality < min)
        quality = min;
    return quality
}