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
    let normalItem = new Item("Elixir of the Mongoose", 0, 5);
    const gildedRose = new GildedRose([normalItem]);
    [normalItem] = gildedRose.updateQuality();
    expect(normalItem.quality).toEqual(3);
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
});
