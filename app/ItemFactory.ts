import { Item } from './Item'
import { ItemBase } from './ItemBase'
import { NormalItem } from './NormalItem';
import { AgedBrieItem } from './AgedBrieItem';
import { BackstageItem } from './BackstageItem';
import { LegendaryItem } from './LegendaryItem';

enum ItemType {
    NORMAL, AGED_BRIE, LEGENDARY, BACKSTAGE_PASS
}

export function createItem (item: Item): ItemBase {
    switch (getItemType(item)) {
        case ItemType.NORMAL:
            return new NormalItem(item);
        case ItemType.AGED_BRIE:
            return new AgedBrieItem(item);
        case ItemType.BACKSTAGE_PASS:
            return new BackstageItem(item);
        case ItemType.LEGENDARY:
            return new LegendaryItem(item);
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
