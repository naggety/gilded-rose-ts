import { Item, GildedRose } from "../app/gilded-rose";

describe("Gilded Rose", function () {
  it("Normal item must decrement its quality before sellIn date", function () {
    let normalItem = new Item("Elixir of the Mongoose", 10, 5);
    const gildedRose = new GildedRose([normalItem]);
    [normalItem] = gildedRose.updateQuality();
    expect(normalItem.sellIn).toEqual(9);
    expect(normalItem.quality).toEqual(4);
  });
});
