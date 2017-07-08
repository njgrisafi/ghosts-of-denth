const assert = require("assert")
const _ = require("lodash")
const compose = _.flowRight
const weapon = require("../lib/weapon")

describe("weapons", () => {
  describe("creating weapons", () => {
    it("creates a new weapon", () => {
      compose(
        weapon.name.assert("Weapon"),
        weapon.class.assert(null),
        weapon.material.assert(null),
        weapon.handedness.assert("one-handed"),
        weapon.grade.assert(null)
      )(weapon.create())
    })
    it("creates a weapon with a full name", () => {
      compose(
        weapon.name.assert("Legendary Two-handed Carbon Axe"),
        weapon.class.set("axe"),
        weapon.material.set("carbon"),
        weapon.handedness.set("two-handed"),
        weapon.grade.set("legendary")
      )(weapon.create())
    })
  })
  describe("creating weapons of various grades", () => {
    it("creates Broken weapons", () => {
      compose(
        weapon.name.assert("Broken Weapon"),
        weapon.grade.assert("broken"),
        weapon.grade.set("broken")
      )(weapon.create())
    })
    it("creates Flawed weapons", () => {
      compose(
        weapon.name.assert("Flawed Weapon"),
        weapon.grade.assert("flawed"),
        weapon.grade.set("flawed")
      )(weapon.create())
    })
    it("creates Inferior weapons", () => {
      compose(
        weapon.name.assert("Inferior Weapon"),
        weapon.grade.assert("inferior"),
        weapon.grade.set("inferior")
      )(weapon.create())
    })
    it("creates Common weapons", () => {
      compose(
        weapon.name.assert("Common Weapon"),
        weapon.grade.assert("common"),
        weapon.grade.set("common")
      )(weapon.create())
    })
    it("creates Exquisite weapons", () => {
      compose(
        weapon.name.assert("Exquisite Weapon"),
        weapon.grade.assert("exquisite"),
        weapon.grade.set("exquisite")
      )(weapon.create())
    })
    it("creates Flawless weapons", () => {
      compose(
        weapon.name.assert("Flawless Weapon"),
        weapon.grade.assert("flawless"),
        weapon.grade.set("flawless")
      )(weapon.create())
    })
    it("creates Epic weapons", () => {
      compose(
        weapon.name.assert("Epic Weapon"),
        weapon.grade.assert("epic"),
        weapon.grade.set("epic")
      )(weapon.create())
    })
    it("creates Mythic weapons", () => {
      compose(
        weapon.name.assert("Mythic Weapon"),
        weapon.grade.assert("mythic"),
        weapon.grade.set("mythic")
      )(weapon.create())
    })
    it("creates Legendary weapons", () => {
      compose(
        weapon.name.assert("Legendary Weapon"),
        weapon.grade.assert("legendary"),
        weapon.grade.set("legendary")
      )(weapon.create())
    })
    it("fails to create weapons of invalid grades", () => {
      try {
        weapon.grade.set("asdf", weapon.create())
        throw new Error("Expected invalid grade error")
      } catch (e) {
        assert.equal(e.message, "Invalid weapon grade: asdf")
      }
    })
  })
  describe("creating weapons with handedness", () => {
    it("creates one-handed weapons", () => {
      compose(
        weapon.name.assert("Weapon"),
        weapon.handedness.assert("one-handed"),
        weapon.handedness.set("one-handed")
      )(weapon.create())
    })
    it("creates two-handed weapons", () => {
      compose(
        weapon.name.assert("Two-handed Weapon"),
        weapon.handedness.assert("two-handed"),
        weapon.handedness.set("two-handed")
      )(weapon.create())
    })
    it("fails to created weapons with invalid handedness", () => {
      try {
        weapon.handedness.set("asdf", weapon.create())
        throw new Error("Expected invalid handedness error")
      } catch (e) {
        assert.equal(e.message, "Invalid handedness: asdf")
      }
    })
  })
  describe("creating weapons from various materials", () => {
    it("creates Copper weapons", () => {
      compose(
        weapon.name.assert("Copper Weapon"),
        weapon.material.assert("copper"),
        weapon.material.set("copper")
      )(weapon.create())
    })
    it("creates Bronze weapons", () => {
      compose(
        weapon.name.assert("Bronze Weapon"),
        weapon.material.assert("bronze"),
        weapon.material.set("bronze")
      )(weapon.create())
    })
    it("creates Iron weapons", () => {
      compose(
        weapon.name.assert("Iron Weapon"),
        weapon.material.assert("iron"),
        weapon.material.set("iron")
      )(weapon.create())
    })
    it("creates Steel weapons", () => {
      compose(
        weapon.name.assert("Steel Weapon"),
        weapon.material.assert("steel"),
        weapon.material.set("steel")
      )(weapon.create())
    })
    it("creates Titanium weapons", () => {
      compose(
        weapon.name.assert("Titanium Weapon"),
        weapon.material.assert("titanium"),
        weapon.material.set("titanium")
      )(weapon.create())
    })
    it("creates Tempered Steel weapons", () => {
      compose(
        weapon.name.assert("Tempered Steel Weapon"),
        weapon.material.assert("tempered-steel"),
        weapon.material.set("tempered-steel")
      )(weapon.create())
    })
    it("creates Carbon weapons", () => {
      compose(
        weapon.name.assert("Carbon Weapon"),
        weapon.material.assert("carbon"),
        weapon.material.set("carbon")
      )(weapon.create())
    })
    it("fails to create weapons from invalid materials", () => {
      try {
        weapon.material.set("asdf", weapon.create())
        throw new Error("Expected invalid weapon material error")
      } catch (e) {
        assert.equal(e.message, "Invalid weapon material: asdf")
      }
    })
  })
  describe("creating weapons of various weapon classes", () => {
    it("creates Axes", () => {
      compose(
        weapon.name.assert("Axe"),
        weapon.class.assert("axe"),
        weapon.class.set("axe")
      )(weapon.create())
    })
    it("creates Bows", () => {
      compose(
        weapon.name.assert("Bow"),
        weapon.class.assert("bow"),
        weapon.class.set("bow")
      )(weapon.create())
    })
    it("creates Crossbows", () => {
      compose(
        weapon.name.assert("Crossbow"),
        weapon.class.assert("crossbow"),
        weapon.class.set("crossbow")
      )(weapon.create())
    })
    it("creates Daggers", () => {
      compose(
        weapon.name.assert("Dagger"),
        weapon.class.assert("dagger"),
        weapon.class.set("dagger")
      )(weapon.create())
    })
    it("creates Maces", () => {
      compose(
        weapon.name.assert("Mace"),
        weapon.class.assert("mace"),
        weapon.class.set("mace")
      )(weapon.create())
    })
    it("creates Polearms", () => {
      compose(
        weapon.name.assert("Polearm"),
        weapon.class.assert("polearm"),
        weapon.class.set("polearm")
      )(weapon.create())
    })
    it("creates Staves", () => {
      compose(
        weapon.name.assert("Staff"),
        weapon.class.assert("staff"),
        weapon.class.set("staff")
      )(weapon.create())
    })
    it("creates Swords", () => {
      compose(
        weapon.name.assert("Sword"),
        weapon.class.assert("sword"),
        weapon.class.set("sword")
      )(weapon.create())
    })
    it("creates Wands", () => {
      compose(
        weapon.name.assert("Wand"),
        weapon.class.assert("wand"),
        weapon.class.set("wand")
      )(weapon.create())
    })
    it("fails to create weapons of invalid weapon classes", () => {
      try {
        weapon.class.set("asdf", weapon.create())
        throw new Error("Expected invalid weapon class error")
      } catch (e) {
        assert.equal(e.message, "Invalid weapon class: asdf")
      }
    })
  })
  describe("changing weapon condition", () => {
    it("declines and improves weapon condition", () => {
      compose(
        weapon.condition.assert(0.89),
        weapon.condition.improve(0.12),
        weapon.condition.assert(0.77),
        weapon.condition.decline(0.23),
        weapon.condition.assert(1)
      )(weapon.create())
    })
    it("declines condition no lower than 0%", () => {
      compose(
        weapon.condition.assert(0),
        weapon.condition.decline(0.1),
        weapon.condition.assert(0),
        weapon.condition.decline(1),
        weapon.condition.assert(1)
      )(weapon.create())
    })
    it("breaks weapons if condition declines to 0%", () => {
      compose(
        weapon.name.assert("Broken Weapon"),
        weapon.grade.assert("broken"),
        weapon.condition.assert(0),
        weapon.condition.decline(1),
        weapon.condition.assert(1)
      )(weapon.create())
    })
    it("fails to improve condition higher than 100%", () => {
      try {
        weapon.condition.improve(0.1, weapon.create())
        throw new Error("Expected condition improvement failure")
      } catch (e) {
        const expected = "Unable to improve weapon condition higher than 100%"
        assert.equal(e.message, expected)
      }
    })
  })
})
