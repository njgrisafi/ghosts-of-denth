const assert = require("assert")
const character = require("../lib/character")

describe("characters", () => {
  describe("creating characters", () => {
    it("creates a new character", () => {
      character()
        .race.assert(null)
        .class.assert(null)
        .level.assert(0)
        .experience.assert(0)
        .attributePoints.assert(0)
        .strength.assert(5)
        .intelligence.assert(5)
        .dexterity.assert(5)
        .endurance.assert(5)
        .willpower.assert(5)
        .luck.assert(5)
    })
  })
  describe("creating characters of various races", () =>  {
    it("creates Dwarves", () => {
      character()
        .race.set("dwarf")
        .race.assert("dwarf")
        .level.up()
        .strength.assert(7)
        .intelligence.assert(5)
        .dexterity.assert(6)
        .endurance.assert(6)
        .willpower.assert(5)
        .luck.assert(7)
    })
    it("creates Elves", () => {
      character()
        .race.set("elf")
        .race.assert("elf")
        .level.up()
        .strength.assert(5)
        .intelligence.assert(7)
        .dexterity.assert(8)
        .endurance.assert(5)
        .willpower.assert(6)
        .luck.assert(5)
    })
    it("creates Humans", () => {
      character()
        .race.set("human")
        .race.assert("human")
        .level.up()
        .strength.assert(6)
        .intelligence.assert(6)
        .dexterity.assert(6)
        .endurance.assert(6)
        .willpower.assert(6)
        .luck.assert(6)
    })
    it("creates Orcs", () => {
      character()
        .race.set("orc")
        .race.assert("orc")
        .level.up()
        .strength.assert(8)
        .intelligence.assert(5)
        .dexterity.assert(6)
        .endurance.assert(7)
        .willpower.assert(5)
        .luck.assert(5)
    })
    it("fails to create invalid races", () => {
      try {
        character().race.set("asdf")
        throw new Error("Expected invalid race error")
      } catch (e) {
        assert.equal(e.message, "Invalid race: asdf")
      }
    })
  })
  describe("creating characters of various character classes", () => {
    it("creates Archers", () => {
      character()
        .class.set("archer")
        .race.assert("archer")
        .level.up()
        .strength.assert(6)
        .intelligence.assert(5)
        .dexterity.assert(8)
        .endurance.assert(5)
        .willpower.assert(5)
        .luck.assert(7)
    })
    it("creates Magicians", () => {
      character()
        .class.set("magician")
        .race.assert("magician")
        .level.up()
        .strength.assert(5)
        .intelligence.assert(8)
        .dexterity.assert(5)
        .endurance.assert(5)
        .willpower.assert(8)
        .luck.assert(5)
    })
    it("creates Rogues", () => {
      character()
        .class.set("rogue")
        .race.assert("rogue")
        .level.up()
        .strength.assert(6)
        .intelligence.assert(5)
        .dexterity.assert(7)
        .endurance.assert(5)
        .willpower.assert(5)
        .luck.assert(8)
    })
    it("creates Warriors", () => {
      character()
        .class.set("warrior")
        .race.assert("warrior")
        .level.up()
        .strength.assert(8)
        .intelligence.assert(5)
        .dexterity.assert(6)
        .endurance.assert(7)
        .willpower.assert(5)
        .luck.assert(5)
    })
    it("fails to create invalid character classes", () => {
      try {
        character().class.set("asdf")
        throw new Error("Expected invalid character class error")
      } catch (e) {
        assert.equal(e.message, "Invalid character class: asdf")
      }
    })
  })
  describe("gaining experience", () => {
    it("gains experience", () => {
      const points = 5
      character()
        .level.up()
        .experience.gain(points)
        .level.assert(1)
        .experience.assert(5)
        .attributePoints.assert(6)
    })
    it("gains experience and levels up", () => {
      character()
        .level.up()
        .update((c) => c.experience.gain(c.experience.needed(1)))
        .level.assert(2)
        .experience.assert(0)
        .attributePoints.assert(12)
    })
    it("gains experience and levels up twice", () => {
      character()
        .level.up()
        .update((c) => c.experience.gain(c.experience.needed(2)))
        .level.assert(3)
        .experience.assert(0)
        .attributePoints.assert(18)
    })
    it("fails to level up with insufficient experience", () => {
      let c = character().level.up()
      try {
        c.level.up()
        throw new Error("Expected insufficient experience error")
      } catch (e) {
        assert.equal(e.message, "Insufficient experience")
        c.level.assert(1)
      }
    })
  })
  describe("allocating attribute points", () => {
    it("allocates attribute points", () => {
      const test = (chain, attribute, expected) => {
        chain[attribute].allocate(1)
        chain[attribute].assert(6)
        chain.attributePoints.assert(expected)
        return chain
      }
      character()
        .level.up()
        .update((c) => test(c, "strength", 5))
        .update((c) => test(c, "intelligence", 4))
        .update((c) => test(c, "dexterity", 3))
        .update((c) => test(c, "endurance", 2))
        .update((c) => test(c, "willpower", 1))
        .update((c) => test(c, "luck", 0))
    })
    it("can't allocate insufficient attribute points", () => {
      const test = (chain, attribute) => {
        try {
          chain[attribute].allocate(7)
          throw new Error("Expected insufficient attribute points error")
        } catch (e) {
          assert.equal(e.message, "Insufficient attribute points")
          chain[attribute].assert(5).attributePoints.assert(6)
        }
        return chain
      }
      character()
        .level.up()
        .update((c) => test(c, "strength"))
        .update((c) => test(c, "intelligence"))
        .update((c) => test(c, "dexterity"))
        .update((c) => test(c, "endurance"))
        .update((c) => test(c, "willpower"))
        .update((c) => test(c, "luck"))
    })
  })
})
