import { Item, GildedRose } from "../app/gilded-rose";

describe("Normal item", function () {
  it("SellIn must decremented by one when calling updateQuality", function () {
    let normalItem = new Item("Elixir of the Mongoose", 10, 5);
    const gildedRose = new GildedRose([normalItem]);
    [normalItem] = gildedRose.updateQuality();
    expect(normalItem.sellIn).toEqual(9);
  });

  it("Must decrement its quality before sellIn date", function () {
    let normalItem = new Item("Elixir of the Mongoose", 10, 5);
    const gildedRose = new GildedRose([normalItem]);
    [normalItem] = gildedRose.updateQuality();
    expect(normalItem.quality).toEqual(4);
  });

  it("Quality must be decremented only one when sellIn updates from 1 to 0", function() {
    let normalItem = new Item("Elixir of the Mongoose", 1, 5);
    const gildedRose = new GildedRose([normalItem]);
    [normalItem] = gildedRose.updateQuality();
    expect(normalItem.quality).toEqual(4);
  });

  it("Must decrement its quality in 2 after sellIn date", function () {
    let normalItems = [
      new Item("Elixir of the Mongoose", 0, 5),
      new Item("Elixir of the Mongoose", -2, 5)
    ];
    const gildedRose = new GildedRose(normalItems);
    normalItems = gildedRose.updateQuality();
    expect(normalItems[0].quality).toEqual(3);
    expect(normalItems[1].quality).toEqual(3);
  });

  it("Quality never decrements below 0", function () {
    let normalItems = [
      new Item("Elixir of the Mongoose", 5, 0),
      new Item("Elixir of the Mongoose", 0, 1)
    ];
    const gildedRose = new GildedRose(normalItems);
    normalItems = gildedRose.updateQuality();
    expect(normalItems[0].quality).toEqual(0);
    expect(normalItems[1].quality).toEqual(0);
  });
});

describe("Aged Brie", function () {
  it("SellIn must decremented by one when calling updateQuality", function () {
    let brieItem = new Item("Aged Brie", 10, 5);
    const gildedRose = new GildedRose([brieItem]);
    [brieItem] = gildedRose.updateQuality();
    expect(brieItem.sellIn).toEqual(9);
  });

  it("Must increment by 1 its quality before sellIn date", function () {
    let brieItem = new Item("Aged Brie", 10, 5);
    const gildedRose = new GildedRose([brieItem]);
    [brieItem] = gildedRose.updateQuality();
    expect(brieItem.quality).toEqual(6);
  });

  it("Quality must be decremented only one when sellIn updates from 1 to 0", function () {
    let brieItem = new Item("Aged Brie", 1, 5);
    const gildedRose = new GildedRose([brieItem]);
    [brieItem] = gildedRose.updateQuality();
    expect(brieItem.quality).toEqual(6);
  });

  it("Must increment its quality in 2 after sellIn date", function () {
    let brieItems = [
      new Item("Aged Brie", 0, 5),
      new Item("Aged Brie", -2, 5)
    ];
    const gildedRose = new GildedRose(brieItems);
    brieItems = gildedRose.updateQuality();
    expect(brieItems[0].quality).toEqual(7);
    expect(brieItems[1].quality).toEqual(7);
  });

  it("Quality never increments over 50", function () {
    let brieItems = [
      new Item("Aged Brie", 5, 50),
      new Item("Aged Brie", -2, 49)
    ];
    const gildedRose = new GildedRose(brieItems);
    brieItems = gildedRose.updateQuality();
    expect(brieItems[0].quality).toEqual(50);
    expect(brieItems[1].quality).toEqual(50);
  });
});

describe("Legendary item", function () {
  it("Never changes its sellIn nor quality", function () {
    let legendaryItems = [
      new Item("Sulfuras, Hand of Ragnaros", 10, 80),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -5, 80)
    ];
    const gildedRose = new GildedRose(legendaryItems);
    legendaryItems = gildedRose.updateQuality();
    expect(legendaryItems[0].sellIn).toEqual(10);
    expect(legendaryItems[0].quality).toEqual(80);
    expect(legendaryItems[1].sellIn).toEqual(0);
    expect(legendaryItems[1].quality).toEqual(80);
    expect(legendaryItems[2].sellIn).toEqual(-5);
    expect(legendaryItems[2].quality).toEqual(80);
  });
});

describe("Backstage ticket", function () {
  it("SellIn must decremented by one when calling updateQuality", function () {
    let backstageItem = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 5);
    const gildedRose = new GildedRose([backstageItem]);
    [backstageItem] = gildedRose.updateQuality();
    expect(backstageItem.sellIn).toEqual(9);
  });

  it("Must increment by 1 its quality if rests more than 10 days for sellIn", function () {
    let backstageItem = new Item("Backstage passes to a TAFKAL80ETC concert", 11, 5);
    const gildedRose = new GildedRose([backstageItem]);
    [backstageItem] = gildedRose.updateQuality();
    expect(backstageItem.quality).toEqual(6);
  });

  it("Must increment by 2 its quality if rests between 10 and 6 days for sellIn", function () {
    let backstageItems = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 5),
      new Item("Backstage passes to a TAFKAL80ETC concert", 6, 5)
    ];
    const gildedRose = new GildedRose(backstageItems);
    backstageItems = gildedRose.updateQuality();
    expect(backstageItems[0].quality).toEqual(7);
    expect(backstageItems[1].quality).toEqual(7);
  });

  it("Must increment by 3 its quality if rests between 5 and 1 days for sellIn", function () {
    let backstageItems = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 5),
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 5)
    ];
    const gildedRose = new GildedRose(backstageItems);
    backstageItems = gildedRose.updateQuality();
    expect(backstageItems[0].quality).toEqual(8);
    expect(backstageItems[1].quality).toEqual(8);
  });

  it("Before sellIn, quality will be 0", function () {
    let backstageItems = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 5),
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0)
    ];
    const gildedRose = new GildedRose(backstageItems);
    backstageItems = gildedRose.updateQuality();
    expect(backstageItems[0].quality).toEqual(0);
    expect(backstageItems[1].quality).toEqual(0);
  });
});
