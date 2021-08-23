class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export enum ItemsNamesEnum {
  DEXTERITY_VEST = '+5 Dexterity Vest',
  AGED_BRIE = 'Aged Brie',
  ELIXIR_OF_THE_MONGOOSE = 'Elixir of the Mongoose',
  SULFURAS = 'Sulfuras, Hand of Ragnaros',
  BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert',
  CONJURED_MANA_CAKE = 'Conjured Mana Cake',
}

export const MINIMUM_QUALITY_VALUE = 0;
export const MAXIMUM_QUALITY_VALUE = 50;
export const RARE_ITEM_DAYS_TO_INCREASE_TWO_TIMES = 0;
export const ULTRA_RARE_ITEM_DAYS_TO_INCREASE_TWO_TIMES = 10;
export const ULTRA_RARE_ITEM_DAYS_TO_INCREASE_THREE_TIMES = 5;

export const itemsInitialState: Item[] = [
  {
    name: ItemsNamesEnum.DEXTERITY_VEST,
    sellIn: 10,
    quality: 20,
  },
  {
    name: ItemsNamesEnum.AGED_BRIE,
    sellIn: 2,
    quality: 0,
  },
  {
    name: ItemsNamesEnum.ELIXIR_OF_THE_MONGOOSE,
    sellIn: 5,
    quality: 7,
  },
  {
    name: ItemsNamesEnum.SULFURAS,
    sellIn: 0,
    quality: 80,
  },
  {
    name: ItemsNamesEnum.BACKSTAGE_PASSES,
    sellIn: 15,
    quality: 20,
  },
  {
    name: ItemsNamesEnum.CONJURED_MANA_CAKE,
    sellIn: 3,
    quality: 6,
  },
];

export default class GildedRose {
  items: Item[];

  readonly rareItems: ItemsNamesEnum[] = [ItemsNamesEnum.AGED_BRIE];
  readonly ultraRareItems: ItemsNamesEnum[] = [ItemsNamesEnum.BACKSTAGE_PASSES];
  readonly legendaryItems: ItemsNamesEnum[] = [ItemsNamesEnum.SULFURAS];
  readonly conjuredItems: ItemsNamesEnum[] = [
    ItemsNamesEnum.CONJURED_MANA_CAKE,
  ];

  constructor(items = itemsInitialState) {
    this.items = items.map(
      ({ name, sellIn, quality }) => new Item(name, sellIn, quality)
    );
  }

  updateQuality(): this {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const isRareItem = this.rareItems.includes(item.name as ItemsNamesEnum);
      const isUltraRareItem = this.ultraRareItems.includes(
        item.name as ItemsNamesEnum
      );
      const isLegendaryItem = this.legendaryItems.includes(
        item.name as ItemsNamesEnum
      );
      const isConjuredItem = this.conjuredItems.includes(
        item.name as ItemsNamesEnum
      );

      switch (true) {
        case isRareItem:
          this.updateAsRareItemQuality(i);
          this.decreaseSellIn(i);

          break;

        case isUltraRareItem:
          if (
            this.isBackstagePassesRareItem(i) &&
            this.isNegativeSellInItem(i)
          ) {
            this.setQualityAsZero(i);
          } else {
            this.updateAsUltraRareItemQuality(i);
          }

          this.decreaseSellIn(i);

          break;

        case isLegendaryItem:
          /* TODO: discover other rules with Product Team,
              than create a "updateAsLegendaryItemQuality(itemIndex: number) => void"
          */
          break;

        case isConjuredItem:
          this.updateAsConjuredItemQuality(i);
          this.decreaseSellIn(i);

          break;

        default:
          this.updateAsCommonItemQuality(i);
          this.decreaseSellIn(i);
      }
    }
    return this;
  }

  private decreaseSellIn(itemIndex: number) {
    this.items[itemIndex].sellIn -= 1;
  }

  private decreaseQuality(itemIndex: number, times: number = 1) {
    let newQualityValue = this.items[itemIndex].quality - times;

    if (newQualityValue < MINIMUM_QUALITY_VALUE) {
      newQualityValue = MINIMUM_QUALITY_VALUE;
    }

    this.items[itemIndex].quality = newQualityValue;
  }

  private increaseQuality(itemIndex: number, times: number = 1) {
    let newQualityValue = this.items[itemIndex].quality + times;

    if (newQualityValue > MAXIMUM_QUALITY_VALUE) {
      newQualityValue = MAXIMUM_QUALITY_VALUE;
    }

    this.items[itemIndex].quality = newQualityValue;
  }

  private setQualityAsZero(itemIndex: number) {
    this.items[itemIndex].quality = 0;
  }

  private isNegativeSellInItem(itemIndex: number) {
    return this.items[itemIndex].sellIn <= 0;
  }

  private isBackstagePassesRareItem(itemIndex: number) {
    return this.items[itemIndex].name == ItemsNamesEnum.BACKSTAGE_PASSES;
  }

  private updateAsRareItemQuality(itemIndex: number) {
    const { sellIn } = this.items[itemIndex];

    if (sellIn <= RARE_ITEM_DAYS_TO_INCREASE_TWO_TIMES) {
      this.increaseQuality(itemIndex, 2);
    } else {
      this.increaseQuality(itemIndex);
    }
  }

  private updateAsUltraRareItemQuality(itemIndex: number) {
    const { sellIn } = this.items[itemIndex];

    if (sellIn <= ULTRA_RARE_ITEM_DAYS_TO_INCREASE_THREE_TIMES) {
      this.increaseQuality(itemIndex, 3);
    } else if (sellIn <= ULTRA_RARE_ITEM_DAYS_TO_INCREASE_TWO_TIMES) {
      this.increaseQuality(itemIndex, 2);
    } else {
      this.increaseQuality(itemIndex);
    }
  }

  private updateAsCommonItemQuality(itemIndex: number) {
    const { sellIn } = this.items[itemIndex];

    if (sellIn <= 0) {
      this.decreaseQuality(itemIndex, 2);
    } else {
      this.decreaseQuality(itemIndex);
    }
  }

  private updateAsConjuredItemQuality(itemIndex: number) {
    this.decreaseQuality(itemIndex, 2);
  }
}
