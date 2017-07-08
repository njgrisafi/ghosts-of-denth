const assert = require("assert")
const _ = require("lodash")
const compose = _.flowRight
const character = require("../lib/character")

describe("characters", () => {
  describe("creating characters", () => {
    it("creates a new character", () => {
      compose(
        character.luck.assert(5, {}, 5),
        character.willpower.assert(5, {}, 5),
        character.endurance.assert(5, {}, 5),
        character.dexterity.assert(5, {}, 5),
        character.intelligence.assert(5, {}, 5),
        character.strength.assert(5, {}, 5),
        character.attributePoints.assert(0),
        character.experience.assert(0),
        character.level.assert(0),
        character.class.assert(null),
        character.race.assert(null)
      )(character.create())
    })
  })
  describe("creating characters of various races", () =>  {
    it("creates Dwarves", () => {
      compose(
        character.luck.assert(5, { race: 2 }, 7),
        character.willpower.assert(5, {}, 5),
        character.endurance.assert(5, { race: 1 }, 6),
        character.dexterity.assert(5, { race: 1 }, 6),
        character.intelligence.assert(5, {}, 5),
        character.strength.assert(5, { race: 2 }, 7),
        character.level.up(),
        character.race.assert("dwarf"),
        character.race.set("dwarf")
      )(character.create())
    })
    it("creates Elves", () => {
      compose(
        character.luck.assert(5, {}, 5),
        character.willpower.assert(5, { race: 1 }, 6),
        character.endurance.assert(5, {}, 5),
        character.dexterity.assert(5, { race: 3 }, 8),
        character.intelligence.assert(5, { race: 2 }, 7),
        character.strength.assert(5, {}, 5),
        character.level.up(),
        character.race.assert("elf"),
        character.race.set("elf")
      )(character.create())
    })
    it("creates Humans", () => {
      compose(
        character.luck.assert(5, { race: 1 }, 6),
        character.willpower.assert(5, { race: 1 }, 6),
        character.endurance.assert(5, { race: 1 }, 6),
        character.dexterity.assert(5, { race: 1 }, 6),
        character.intelligence.assert(5, { race: 1 }, 6),
        character.strength.assert(5, { race: 1 }, 6),
        character.level.up(),
        character.race.assert("human"),
        character.race.set("human")
      )(character.create())
    })
    it("creates Orcs", () => {
      compose(
        character.luck.assert(5, {}, 5),
        character.willpower.assert(5, {}, 5),
        character.endurance.assert(5, { race: 2 }, 7),
        character.dexterity.assert(5, { race: 1 }, 6),
        character.intelligence.assert(5, {}, 5),
        character.strength.assert(5, { race: 3 }, 8),
        character.level.up(),
        character.race.assert("orc"),
        character.race.set("orc")
      )(character.create())
    })
    it("fails to create invalid races", () => {
      try {
        character.race.set("asdf", character.create())
        throw new Error("Expected invalid race error")
      } catch (e) {
        assert.equal(e.message, "Invalid race: asdf")
      }
    })
  })
  describe("creating characters of various character classes", () => {
    it("creates Archers", () => {
      compose(
        character.luck.assert(5, { class: 2 }, 7),
        character.willpower.assert(5, {}, 5),
        character.endurance.assert(5, {}, 5),
        character.dexterity.assert(5, { class: 3 }, 8),
        character.intelligence.assert(5, {}, 5),
        character.strength.assert(5, { class: 1 }, 6),
        character.level.up(),
        character.class.assert("archer"),
        character.class.set("archer")
      )(character.create())
    })
    it("creates Magicians", () => {
      compose(
        character.luck.assert(5, {}, 5),
        character.willpower.assert(5, { class: 3 }, 8),
        character.endurance.assert(5, {}, 5),
        character.dexterity.assert(5, {}, 5),
        character.intelligence.assert(5, { class: 3 }, 8),
        character.strength.assert(5, {}, 5),
        character.level.up(),
        character.class.assert("magician"),
        character.class.set("magician")
      )(character.create())
    })
    it("creates Rogues", () => {
      compose(
        character.luck.assert(5, { class: 3 }, 8),
        character.willpower.assert(5, {}, 5),
        character.endurance.assert(5, {}, 5),
        character.dexterity.assert(5, { class: 2 }, 7),
        character.intelligence.assert(5, {}, 5),
        character.strength.assert(5, { class: 1 }, 6),
        character.level.up(),
        character.class.assert("rogue"),
        character.class.set("rogue")
      )(character.create())
    })
    it("creates Warriors", () => {
      compose(
        character.luck.assert(5, {}, 5),
        character.willpower.assert(5, {}, 5),
        character.endurance.assert(5, { class: 2 }, 7),
        character.dexterity.assert(5, { class: 1 }, 6),
        character.intelligence.assert(5, {}, 5),
        character.strength.assert(5, { class: 3 }, 8),
        character.level.up(),
        character.class.assert("warrior"),
        character.class.set("warrior")
      )(character.create())
    })
    it("fails to create invalid character classes", () => {
      try {
        character.class.set("asdf", character.create())
        throw new Error("Expected invalid character class error")
      } catch (e) {
        assert.equal(e.message, "Invalid character class: asdf")
      }
    })
  })
  describe("creating characters of races and character classes", () => {
    it("creates Dwarf Rogues", () => {
      compose(
        character.luck.assert(5, { race: 2, class: 3 }, 10),
        character.willpower.assert(5, {}, 5),
        character.endurance.assert(5, { race: 1 }, 6),
        character.dexterity.assert(5, { race: 1, class: 2 }, 8),
        character.intelligence.assert(5, {}, 5),
        character.strength.assert(5, { race: 2, class: 1 }, 8),
        character.level.up(),
        character.class.assert("rogue"),
        character.class.set("rogue"),
        character.race.assert("dwarf"),
        character.race.set("dwarf")
      )(character.create())
    })
    it("creates Elf Archers", () => {
      compose(
        character.luck.assert(5, { class: 2 }, 7),
        character.willpower.assert(5, { race: 1 }, 6),
        character.endurance.assert(5, {}, 5),
        character.dexterity.assert(5, { race: 3, class: 3 }, 11),
        character.intelligence.assert(5, { race: 2 }, 7),
        character.strength.assert(5, { class: 1 }, 6),
        character.level.up(),
        character.class.assert("archer"),
        character.class.set("archer"),
        character.race.assert("elf"),
        character.race.set("elf")
      )(character.create())
    })
    it("creates Human Magicians", () => {
      compose(
        character.luck.assert(5, { race: 1 }, 6),
        character.willpower.assert(5, { race: 1, class: 3 }, 9),
        character.endurance.assert(5, { race: 1 }, 6),
        character.dexterity.assert(5, { race: 1 }, 6),
        character.intelligence.assert(5, { race: 1, class: 3 }, 9),
        character.strength.assert(5, { race: 1 }, 6),
        character.level.up(),
        character.class.assert("magician"),
        character.class.set("magician"),
        character.race.assert("human"),
        character.race.set("human")
      )(character.create())
    })
    it("creates Orc Warriors", () => {
      compose(
        character.luck.assert(5, {}, 5),
        character.willpower.assert(5, {}, 5),
        character.endurance.assert(5, { race: 2, class: 2 }, 9),
        character.dexterity.assert(5, { race: 1, class: 1 }, 7),
        character.intelligence.assert(5, {}, 5),
        character.strength.assert(5, { race: 3, class: 3 }, 11),
        character.level.up(),
        character.class.assert("warrior"),
        character.class.set("warrior"),
        character.race.assert("orc"),
        character.race.set("orc")
      )(character.create())
    })
  })
  describe("gaining experience", () => {
    it("gains experience", () => {
      compose(
        character.attributePoints.assert(6),
        character.experience.assert(5),
        character.level.assert(1),
        character.experience.gain(5),
        character.level.up()
      )(character.create())
    })
    it("gains experience and levels up", () => {
      compose(
        character.attributePoints.assert(12),
        character.experience.assert(0),
        character.level.assert(2),
        (c) => character.experience.gain(character.experience.needed(1, c), c),
        character.level.up()
      )(character.create())
    })
    it("gains experience and levels up twice", () => {
      compose(
        character.attributePoints.assert(18),
        character.experience.assert(0),
        character.level.assert(3),
        (c) => character.experience.gain(character.experience.needed(2, c), c),
        character.level.up()
      )(character.create())
    })
    it("fails to level up with insufficient experience", () => {
      try {
        compose(
          character.level.up(),
          character.level.up()
        )(character.create())
        throw new Error("Expected insufficient experience error")
      } catch (e) {
        assert.equal(e.message, "Insufficient experience")
      }
    })
  })
  describe("allocating attribute points", () => {
    it("allocates attribute points", () => {
      const alloc1assert = (a, e) => compose(
        character.attributePoints.assert(e),
        a.assert(6, {}, 6),
        a.allocate(1)
      )
      compose(
        alloc1assert(character.luck, 0),
        alloc1assert(character.willpower, 1),
        alloc1assert(character.endurance, 2),
        alloc1assert(character.dexterity, 3),
        alloc1assert(character.intelligence, 4),
        alloc1assert(character.strength, 5),
        character.attributePoints.assert(6),
        character.level.up()
      )(character.create())
    })
    it("can't allocate insufficient attribute points", () => {
      const tryalloc7 = (a) => {
        return (c) => {
          try {
            a.allocate(7, c)
            throw new Error("Expected insufficient attribute points error")
          } catch (e) {
            assert.equal(e.message, "Insufficient attribute points")
          }
          return compose(
            a.assert(5, {}, 5),
            character.attributePoints.assert(6)
          )(c)
        }
      }
      compose(
        tryalloc7(character.luck),
        tryalloc7(character.willpower),
        tryalloc7(character.endurance),
        tryalloc7(character.dexterity),
        tryalloc7(character.intelligence),
        tryalloc7(character.strength),
        character.level.up()
      )(character.create())
    })
  })
})
