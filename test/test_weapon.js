const assert = require("assert")
const _ = require("lodash")
const compose = _.flowRight
const weapon = require("../lib/weapon")

describe("weapons", () => {
  describe("creating weapons", () => {
    it("creates a new weapon", () => {
      compose(
        weapon.name.assert("Weapon"),
        weapon.type.assert(null),
        weapon.material.assert(null),
        weapon.handedness.assert("one-handed"),
        weapon.grade.assert(null)
      )(weapon.create())
    })
    it("creates a weapon with a full name", () => {
      compose(
        weapon.name.assert("Legendary Two-handed Carbon Axe"),
        weapon.type.set("axe"),
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
  describe("creating weapons of various weapon types", () => {
    it("creates Axes", () => {
      compose(
        weapon.name.assert("Axe"),
        weapon.type.assert("axe"),
        weapon.type.set("axe")
      )(weapon.create())
    })
    it("creates Bows", () => {
      compose(
        weapon.name.assert("Bow"),
        weapon.type.assert("bow"),
        weapon.type.set("bow")
      )(weapon.create())
    })
    it("creates Cleavers", () => {
      compose(
        weapon.name.assert("Cleaver"),
        weapon.type.assert("cleaver"),
        weapon.type.set("cleaver")
      )(weapon.create())
    })
    it("creates Clubs", () => {
      compose(
        weapon.name.assert("Club"),
        weapon.type.assert("club"),
        weapon.type.set("club")
      )(weapon.create())
    })
    it("creates Crossbows", () => {
      compose(
        weapon.name.assert("Crossbow"),
        weapon.type.assert("crossbow"),
        weapon.type.set("crossbow")
      )(weapon.create())
    })
    it("creates Daggers", () => {
      compose(
        weapon.name.assert("Dagger"),
        weapon.type.assert("dagger"),
        weapon.type.set("dagger")
      )(weapon.create())
    })
    it("creates Flails", () => {
      compose(
        weapon.name.assert("Flail"),
        weapon.type.assert("flail"),
        weapon.type.set("flail")
      )(weapon.create())
    })
    it("creates Glaives", () => {
      compose(
        weapon.name.assert("Glaive"),
        weapon.type.assert("glaive"),
        weapon.type.set("glaive")
      )(weapon.create())
    })
    it("creates Halberds", () => {
      compose(
        weapon.name.assert("Halberd"),
        weapon.type.assert("halberd"),
        weapon.type.set("halberd")
      )(weapon.create())
    })
    it("creates Maces", () => {
      compose(
        weapon.name.assert("Mace"),
        weapon.type.assert("mace"),
        weapon.type.set("mace")
      )(weapon.create())
    })
    it("creates Scythes", () => {
      compose(
        weapon.name.assert("Scythe"),
        weapon.type.assert("scythe"),
        weapon.type.set("scythe")
      )(weapon.create())
    })
    it("creates Spears", () => {
      compose(
        weapon.name.assert("Spear"),
        weapon.type.assert("spear"),
        weapon.type.set("spear")
      )(weapon.create())
    })
    it("creates Staves", () => {
      compose(
        weapon.name.assert("Staff"),
        weapon.type.assert("staff"),
        weapon.type.set("staff")
      )(weapon.create())
    })
    it("creates Swords", () => {
      compose(
        weapon.name.assert("Sword"),
        weapon.type.assert("sword"),
        weapon.type.set("sword")
      )(weapon.create())
    })
    it("creates Wands", () => {
      compose(
        weapon.name.assert("Wand"),
        weapon.type.assert("wand"),
        weapon.type.set("wand")
      )(weapon.create())
    })
    it("creates Whips", () => {
      compose(
        weapon.name.assert("Whip"),
        weapon.type.assert("whip"),
        weapon.type.set("whip")
      )(weapon.create())
    })
    it("fails to create weapons of invalid weapon types", () => {
      try {
        weapon.type.set("asdf", weapon.create())
        throw new Error("Expected invalid weapon type error")
      } catch (e) {
        assert.equal(e.message, "Invalid weapon type: asdf")
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
