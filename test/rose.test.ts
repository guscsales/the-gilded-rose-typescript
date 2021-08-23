import GildedRose, {
  ItemsNamesEnum,
  MAXIMUM_QUALITY_VALUE,
  MINIMUM_QUALITY_VALUE,
  RARE_ITEM_DAYS_TO_INCREASE_TWO_TIMES,
  ULTRA_RARE_ITEM_DAYS_TO_INCREASE_THREE_TIMES,
  ULTRA_RARE_ITEM_DAYS_TO_INCREASE_TWO_TIMES,
} from '../src';

describe('#unit', () => {
  describe('when calling updateQuality', () => {
    describe('and the quality is less than minimum value', () => {
      it('sets the quality as the minimum value', () => {
        const initialState = [
          {
            name: ItemsNamesEnum.DEXTERITY_VEST,
            sellIn: -1,
            quality: MINIMUM_QUALITY_VALUE - 10,
          },
        ];
        const response = [
          {
            name: ItemsNamesEnum.DEXTERITY_VEST,
            quality: MINIMUM_QUALITY_VALUE,
          },
        ];

        const gildedRose = new GildedRose(initialState);

        gildedRose.updateQuality();

        expect(gildedRose.items).toMatchObject(response);
      });
    });

    describe('and the quality is greater than maximum value', () => {
      it('sets the quality as the maximum value', () => {
        const initialState = [
          {
            name: ItemsNamesEnum.AGED_BRIE,
            sellIn: -1,
            quality: MAXIMUM_QUALITY_VALUE + 10,
          },
        ];
        const response = [
          {
            name: ItemsNamesEnum.AGED_BRIE,
            quality: MAXIMUM_QUALITY_VALUE,
          },
        ];

        const gildedRose = new GildedRose(initialState);

        gildedRose.updateQuality();

        expect(gildedRose.items).toMatchObject(response);
      });
    });

    describe('and the item is a "rare" item', () => {
      describe('and the sell in is less or equals than days to increase two times', () => {
        it('decreases the quality by 2', () => {
          const initialState = [
            {
              name: ItemsNamesEnum.AGED_BRIE,
              sellIn: RARE_ITEM_DAYS_TO_INCREASE_TWO_TIMES,
              quality: 10,
            },
          ];
          const response = [
            {
              name: ItemsNamesEnum.AGED_BRIE,
              quality: 12,
            },
          ];

          const gildedRose = new GildedRose(initialState);

          gildedRose.updateQuality();

          expect(gildedRose.items).toMatchObject(response);
        });
      });

      describe('and the sell in is greater than days to increase two times', () => {
        it('increases the quality', () => {
          const initialState = [
            {
              name: ItemsNamesEnum.AGED_BRIE,
              sellIn: RARE_ITEM_DAYS_TO_INCREASE_TWO_TIMES + 1,
              quality: 10,
            },
          ];
          const response = [
            {
              name: ItemsNamesEnum.AGED_BRIE,
              quality: 11,
            },
          ];

          const gildedRose = new GildedRose(initialState);

          gildedRose.updateQuality();

          expect(gildedRose.items).toMatchObject(response);
        });
      });

      it('decreases the sell in', () => {
        const initialState = [
          {
            name: ItemsNamesEnum.AGED_BRIE,
            sellIn: 2,
            quality: 10,
          },
        ];
        const response = [
          {
            name: ItemsNamesEnum.AGED_BRIE,
            sellIn: 1,
          },
        ];

        const gildedRose = new GildedRose(initialState);

        gildedRose.updateQuality();

        expect(gildedRose.items).toMatchObject(response);
      });
    });

    describe('and the item is a "ultra rare" item', () => {
      describe('and the item is not "BackstagePasses"', () => {
        describe('and the sell in is less or equals than days to increase three times', () => {
          it('increases the quality by 3', () => {
            const initialState = [
              {
                name: ItemsNamesEnum.BACKSTAGE_PASSES,
                sellIn: ULTRA_RARE_ITEM_DAYS_TO_INCREASE_THREE_TIMES,
                quality: 10,
              },
            ];
            const response = [
              {
                name: ItemsNamesEnum.BACKSTAGE_PASSES,
                quality: 13,
              },
            ];

            const gildedRose = new GildedRose(initialState);

            gildedRose.updateQuality();

            expect(gildedRose.items).toMatchObject(response);
          });
        });

        describe('and the sell in is less or equals than days to increase two times', () => {
          it('increases the quality by 2', () => {
            const initialState = [
              {
                name: ItemsNamesEnum.BACKSTAGE_PASSES,
                sellIn: ULTRA_RARE_ITEM_DAYS_TO_INCREASE_TWO_TIMES,
                quality: 10,
              },
            ];
            const response = [
              {
                name: ItemsNamesEnum.BACKSTAGE_PASSES,
                quality: 12,
              },
            ];

            const gildedRose = new GildedRose(initialState);

            gildedRose.updateQuality();

            expect(gildedRose.items).toMatchObject(response);
          });
        });

        describe('and the sell in is greater than days to increase three times', () => {
          it('increases the quality', () => {
            const initialState = [
              {
                name: ItemsNamesEnum.AGED_BRIE,
                sellIn: ULTRA_RARE_ITEM_DAYS_TO_INCREASE_THREE_TIMES + 1,
                quality: 10,
              },
            ];
            const response = [
              {
                name: ItemsNamesEnum.AGED_BRIE,
                quality: 11,
              },
            ];

            const gildedRose = new GildedRose(initialState);

            gildedRose.updateQuality();

            expect(gildedRose.items).toMatchObject(response);
          });
        });
      });

      describe('and the item is "BackstagePasses"', () => {
        describe('and the sell in is negative', () => {
          it('sets the item quality as zero', () => {
            const initialState = [
              {
                name: ItemsNamesEnum.BACKSTAGE_PASSES,
                sellIn: -1,
                quality: 10,
              },
            ];
            const response = [
              {
                name: ItemsNamesEnum.BACKSTAGE_PASSES,
                quality: 0,
              },
            ];

            const gildedRose = new GildedRose(initialState);

            gildedRose.updateQuality();

            expect(gildedRose.items).toMatchObject(response);
          });
        });
      });

      it('decreases the sell in', () => {
        const initialState = [
          {
            name: ItemsNamesEnum.AGED_BRIE,
            sellIn: 2,
            quality: 10,
          },
        ];
        const response = [
          {
            name: ItemsNamesEnum.AGED_BRIE,
            sellIn: 1,
          },
        ];

        const gildedRose = new GildedRose(initialState);

        gildedRose.updateQuality();

        expect(gildedRose.items).toMatchObject(response);
      });
    });

    describe('and the item is a "legendary" item', () => {
      it('does not changes any value', () => {
        const initialState = [
          {
            name: ItemsNamesEnum.SULFURAS,
            sellIn: 0,
            quality: 80,
          },
        ];

        const gildedRose = new GildedRose(initialState);

        gildedRose.updateQuality();

        expect(gildedRose.items).toMatchObject(initialState);
      });
    });

    describe('and the item is a "conjured" item', () => {
      it('decreases the quality by 2', () => {
        const initialState = [
          {
            name: ItemsNamesEnum.CONJURED_MANA_CAKE,
            sellIn: 0,
            quality: 2,
          },
        ];
        const response = [
          {
            name: ItemsNamesEnum.CONJURED_MANA_CAKE,
            quality: 0,
          },
        ];

        const gildedRose = new GildedRose(initialState);

        gildedRose.updateQuality();

        expect(gildedRose.items).toMatchObject(response);
      });

      it('decreases the sell in', () => {
        const initialState = [
          {
            name: ItemsNamesEnum.CONJURED_MANA_CAKE,
            sellIn: 0,
            quality: 10,
          },
        ];
        const response = [
          {
            name: ItemsNamesEnum.CONJURED_MANA_CAKE,
            sellIn: -1,
          },
        ];

        const gildedRose = new GildedRose(initialState);

        gildedRose.updateQuality();

        expect(gildedRose.items).toMatchObject(response);
      });
    });

    describe('and the item is a "common" item', () => {
      describe('and the sell in is less or equals zero', () => {
        it('decreases the quality by 2', () => {
          const initialState = [
            {
              name: ItemsNamesEnum.DEXTERITY_VEST,
              sellIn: -1,
              quality: 2,
            },
          ];
          const response = [
            {
              name: ItemsNamesEnum.DEXTERITY_VEST,
              quality: 0,
            },
          ];

          const gildedRose = new GildedRose(initialState);

          gildedRose.updateQuality();

          expect(gildedRose.items).toMatchObject(response);
        });
      });

      describe('and the sell in is greater than zero', () => {
        it('decreases the quality', () => {
          const initialState = [
            {
              name: ItemsNamesEnum.DEXTERITY_VEST,
              sellIn: 1,
              quality: 2,
            },
          ];
          const response = [
            {
              name: ItemsNamesEnum.DEXTERITY_VEST,
              quality: 1,
            },
          ];

          const gildedRose = new GildedRose(initialState);

          gildedRose.updateQuality();

          expect(gildedRose.items).toMatchObject(response);
        });
      });

      it('decreases the sell in', () => {
        const initialState = [
          {
            name: ItemsNamesEnum.DEXTERITY_VEST,
            sellIn: 0,
            quality: 10,
          },
        ];
        const response = [
          {
            name: ItemsNamesEnum.DEXTERITY_VEST,
            sellIn: -1,
          },
        ];

        const gildedRose = new GildedRose(initialState);

        gildedRose.updateQuality();

        expect(gildedRose.items).toMatchObject(response);
      });
    });
  });
});

describe('#integration', () => {
  describe('when initializing the app', () => {
    const gildedRose = new GildedRose();

    describe('and the initial state is the default of project', () => {
      it('matches the correct values', () => {
        expect(gildedRose).not.toBeNull();

        gildedRose.updateQuality();

        expect(gildedRose.items).toEqual([
          { name: '+5 Dexterity Vest', sellIn: 9, quality: 19 },
          { name: 'Aged Brie', sellIn: 1, quality: 1 },
          { name: 'Elixir of the Mongoose', sellIn: 4, quality: 6 },
          { name: 'Sulfuras, Hand of Ragnaros', sellIn: 0, quality: 80 },
          {
            name: 'Backstage passes to a TAFKAL80ETC concert',
            sellIn: 14,
            quality: 21,
          },
          { name: 'Conjured Mana Cake', sellIn: 2, quality: 4 },
        ]);
      });
    });

    describe('and run update quality for the first day', () => {
      it('matches the correct values', () => {
        gildedRose.updateQuality();

        expect(gildedRose.items).toEqual([
          { name: '+5 Dexterity Vest', sellIn: 8, quality: 18 },
          { name: 'Aged Brie', sellIn: 0, quality: 2 },
          { name: 'Elixir of the Mongoose', sellIn: 3, quality: 5 },
          { name: 'Sulfuras, Hand of Ragnaros', sellIn: 0, quality: 80 },
          {
            name: 'Backstage passes to a TAFKAL80ETC concert',
            sellIn: 13,
            quality: 22,
          },
          { name: 'Conjured Mana Cake', sellIn: 1, quality: 2 },
        ]);
      });
    });

    describe('and run update quality for the second day', () => {
      it('matches the correct values', () => {
        gildedRose.updateQuality();

        expect(gildedRose.items).toEqual([
          { name: '+5 Dexterity Vest', sellIn: 7, quality: 17 },
          { name: 'Aged Brie', sellIn: -1, quality: 4 },
          { name: 'Elixir of the Mongoose', sellIn: 2, quality: 4 },
          { name: 'Sulfuras, Hand of Ragnaros', sellIn: 0, quality: 80 },
          {
            name: 'Backstage passes to a TAFKAL80ETC concert',
            sellIn: 12,
            quality: 23,
          },
          { name: 'Conjured Mana Cake', sellIn: 0, quality: 0 },
        ]);
      });
    });

    describe('and run update quality for the third day', () => {
      it('matches the correct values', () => {
        gildedRose.updateQuality();

        expect(gildedRose.items).toEqual([
          { name: '+5 Dexterity Vest', sellIn: 6, quality: 16 },
          { name: 'Aged Brie', sellIn: -2, quality: 6 },
          { name: 'Elixir of the Mongoose', sellIn: 1, quality: 3 },
          { name: 'Sulfuras, Hand of Ragnaros', sellIn: 0, quality: 80 },
          {
            name: 'Backstage passes to a TAFKAL80ETC concert',
            sellIn: 11,
            quality: 24,
          },
          { name: 'Conjured Mana Cake', sellIn: -1, quality: 0 },
        ]);
      });
    });

    describe('and run update quality for the fourth day', () => {
      it('matches the correct values', () => {
        gildedRose.updateQuality();

        expect(gildedRose.items).toEqual([
          { name: '+5 Dexterity Vest', sellIn: 5, quality: 15 },
          { name: 'Aged Brie', sellIn: -3, quality: 8 },
          { name: 'Elixir of the Mongoose', sellIn: 0, quality: 2 },
          { name: 'Sulfuras, Hand of Ragnaros', sellIn: 0, quality: 80 },
          {
            name: 'Backstage passes to a TAFKAL80ETC concert',
            sellIn: 10,
            quality: 25,
          },
          { name: 'Conjured Mana Cake', sellIn: -2, quality: 0 },
        ]);
      });
    });

    describe('and run update quality for the fifth day', () => {
      it('matches the correct values', () => {
        gildedRose.updateQuality();

        expect(gildedRose.items).toEqual([
          { name: '+5 Dexterity Vest', sellIn: 4, quality: 14 },
          { name: 'Aged Brie', sellIn: -4, quality: 10 },
          { name: 'Elixir of the Mongoose', sellIn: -1, quality: 0 },
          { name: 'Sulfuras, Hand of Ragnaros', sellIn: 0, quality: 80 },
          {
            name: 'Backstage passes to a TAFKAL80ETC concert',
            sellIn: 9,
            quality: 27,
          },
          { name: 'Conjured Mana Cake', sellIn: -3, quality: 0 },
        ]);
      });
    });

    describe('and run update quality for the more 10 days', () => {
      it('matches the correct values', () => {
        for (let i = 0; i < 10; i++) {
          gildedRose.updateQuality();
        }

        expect(gildedRose.items).toEqual([
          { name: '+5 Dexterity Vest', sellIn: -6, quality: 0 },
          { name: 'Aged Brie', sellIn: -14, quality: 30 },
          { name: 'Elixir of the Mongoose', sellIn: -11, quality: 0 },
          { name: 'Sulfuras, Hand of Ragnaros', sellIn: 0, quality: 80 },
          {
            name: 'Backstage passes to a TAFKAL80ETC concert',
            sellIn: -1,
            quality: 0,
          },
          { name: 'Conjured Mana Cake', sellIn: -13, quality: 0 },
        ]);
      });
    });
  });

  describe('when initialize the app with the initial state containing negatives sellIn', () => {
    it('matches the correct values', () => {
      const negativeSellInInitialState = [
        {
          name: ItemsNamesEnum.DEXTERITY_VEST,
          sellIn: -1,
          quality: 20,
        },
        {
          name: ItemsNamesEnum.AGED_BRIE,
          sellIn: -1,
          quality: 0,
        },
        {
          name: ItemsNamesEnum.ELIXIR_OF_THE_MONGOOSE,
          sellIn: -1,
          quality: 7,
        },
        {
          name: ItemsNamesEnum.SULFURAS,
          sellIn: 0,
          quality: 80,
        },
        {
          name: ItemsNamesEnum.BACKSTAGE_PASSES,
          sellIn: -1,
          quality: 20,
        },
        {
          name: ItemsNamesEnum.CONJURED_MANA_CAKE,
          sellIn: -1,
          quality: 6,
        },
      ];
      const negativeSellInValuesAfterUpdate = [
        { name: '+5 Dexterity Vest', sellIn: -2, quality: 18 },
        { name: 'Aged Brie', sellIn: -2, quality: 2 },
        { name: 'Elixir of the Mongoose', sellIn: -2, quality: 5 },
        { name: 'Sulfuras, Hand of Ragnaros', sellIn: 0, quality: 80 },
        {
          name: 'Backstage passes to a TAFKAL80ETC concert',
          sellIn: -2,
          quality: 0,
        },
        { name: 'Conjured Mana Cake', sellIn: -2, quality: 4 },
      ];

      const gildedRose = new GildedRose(negativeSellInInitialState);

      gildedRose.updateQuality();

      expect(gildedRose.items).toEqual(negativeSellInValuesAfterUpdate);
    });
  });
});
