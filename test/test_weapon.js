const assert = require("assert")
const weapon = require("../lib/weapon")

describe("weapons", () => {
  describe("creating weapons", () => {
    it("creates a new weapon", () => {
      weapon()
        .grade.assert(null)
        .handedness.assert("one-handed")
        .material.assert(null)
        .class.assert(null)
        .name.assert("Weapon")
    })
    it("creates a weapon with a full name", () => {
      weapon()
        .grade.set("legendary")
        .handedness.set("two-handed")
        .material.set("carbon")
        .class.set("axe")
        .name.assert("Legendary Two-handed Carbon Axe")
    })
  })
  describe("creating weapons of various grades", () => {
    it("creates Broken weapons", () => {
      weapon()
        .grade.set("broken")
        .grade.assert("broken")
        .name.assert("Broken Weapon")
    })
    it("creates Flawed weapons", () => {
      weapon()
        .grade.set("flawed")
        .grade.assert("flawed")
        .name.assert("Flawed Weapon")
    })
    it("creates Inferior weapons", () => {
      weapon()
        .grade.set("inferior")
        .grade.assert("inferior")
        .name.assert("Inferior Weapon")
    })
    it("creates Common weapons", () => {
      weapon()
        .grade.set("common")
        .grade.assert("common")
        .name.assert("Common Weapon")
    })
    it("creates Exquisite weapons", () => {
      weapon()
        .grade.set("exquisite")
        .grade.assert("exquisite")
        .name.assert("Exquisite Weapon")
    })
    it("creates Flawless weapons", () => {
      weapon()
        .grade.set("flawless")
        .grade.assert("flawless")
        .name.assert("Flawless Weapon")
    })
    it("creates Epic weapons", () => {
      weapon()
        .grade.set("epic")
        .grade.assert("epic")
        .name.assert("Epic Weapon")
    })
    it("creates Mythic weapons", () => {
      weapon()
        .grade.set("mythic")
        .grade.assert("mythic")
        .name.assert("Mythic Weapon")
    })
    it("creates Legendary weapons", () => {
      weapon()
        .grade.set("legendary")
        .grade.assert("legendary")
        .name.assert("Legendary Weapon")
    })
    it("fails to create weapons of invalid grades", () => {
      try {
        weapon().grade.set("asdf")
        throw new Error("Expected invalid grade error")
      } catch (e) {
        assert.equal(e.message, "Invalid weapon grade: asdf")
      }
    })
  })
  describe("creating weapons with handedness", () => {
    it("creates one-handed weapons", () => {
      weapon()
        .handedness.set("one-handed")
        .handedness.assert("one-handed")
        .name.assert("Weapon")
    })
    it("creates two-handed weapons", () => {
      weapon()
        .handedness.set("two-handed")
        .handedness.assert("two-handed")
        .name.assert("Two-handed Weapon")
    })
    it("fails to created weapons with invalid handedness", () => {
      try {
        weapon().handedness.set("asdf")
        throw new Error("Expected invalid handedness error")
      } catch (e) {
        assert.equal(e.message, "Invalid handedness: asdf")
      }
    })
  })
  describe("creating weapons from various materials", () => {
    it("creates Copper weapons", () => {
      weapon()
        .material.set("copper")
        .material.assert("copper")
        .name.assert("Copper Weapon")
    })
    it("creates Bronze weapons", () => {
      weapon()
        .material.set("bronze")
        .material.assert("bronze")
        .name.assert("Bronze Weapon")
    })
    it("creates Iron weapons", () => {
      weapon()
        .material.set("iron")
        .material.assert("iron")
        .name.assert("Iron Weapon")
    })
    it("creates Steel weapons", () => {
      weapon()
        .material.set("steel")
        .material.assert("steel")
        .name.assert("Steel Weapon")
    })
    it("creates Titanium weapons", () => {
      weapon()
        .material.set("titanium")
        .material.assert("titanium")
        .name.assert("Titanium Weapon")
    })
    it("creates Tempered Steel weapons", () => {
      weapon()
        .material.set("tempered-steel")
        .material.assert("tempered-steel")
        .name.assert("Tempered Steel Weapon")
    })
    it("creates Carbon weapons", () => {
      weapon()
        .material.set("carbon")
        .material.assert("carbon")
        .name.assert("Carbon Weapon")
    })
    it("fails to create weapons from invalid materials", () => {
      try {
        weapon().material.set("asdf")
        throw new Error("Expected invalid weapon material error")
      } catch (e) {
        assert.equal(e.message, "Invalid weapon material: asdf")
      }
    })
  })
  describe("creating weapons of various weapon classes", () => {
    it("creates Axes", () => {
      weapon()
        .class.set("axe")
        .class.assert("axe")
        .name.assert("Axe")
    })
    it("creates Bows", () => {
      weapon()
        .class.set("bow")
        .class.assert("bow")
        .name.assert("Bow")
    })
    it("creates Crossbows", () => {
      weapon()
        .class.set("crossbow")
        .class.assert("crossbow")
        .name.assert("Crossbow")
    })
    it("creates Daggers", () => {
      weapon()
        .class.set("dagger")
        .class.assert("dagger")
        .name.assert("Dagger")
    })
    it("creates Maces", () => {
      weapon()
        .class.set("mace")
        .class.assert("mace")
        .name.assert("Mace")
    })
    it("creates Polearms", () => {
      weapon()
        .class.set("polearm")
        .class.assert("polearm")
        .name.assert("Polearm")
    })
    it("creates Staves", () => {
      weapon()
        .class.set("staff")
        .class.assert("staff")
        .name.assert("Staff")
    })
    it("creates Swords", () => {
      weapon()
        .class.set("sword")
        .class.assert("sword")
        .name.assert("Sword")
    })
    it("creates Wands", () => {
      weapon()
        .class.set("wand")
        .class.assert("wand")
        .name.assert("Wand")
    })
    it("fails to create weapons of invalid weapon classes", () => {
      try {
        weapon().class.set("asdf")
        throw new Error("Expected invalid weapon class error")
      } catch (e) {
        assert.equal(e.message, "Invalid weapon class: asdf")
      }
    })
  })
  describe("changing weapon condition", () => {
    it("declines and improves weapon condition", () => {
      weapon()
        .condition.assert(1)
        .condition.decline(0.23)
        .condition.assert(0.77)
        .condition.improve(0.12)
        .condition.assert(0.89)
    })
    it("declines condition no lower than 0%", () => {
      weapon()
        .condition.assert(1)
        .condition.decline(1)
        .condition.assert(0)
        .condition.decline(0.1)
        .condition.assert(0)
    })
    it("breaks weapons if condition declines to 0%", () => {
      weapon()
        .condition.assert(1)
        .condition.decline(1)
        .condition.assert(0)
        .grade.assert("broken")
        .name.assert("Broken Weapon")
    })
    it("fails to improve condition higher than 100%", () => {
      let c = weapon()
      try {
        c.condition.improve(0.1)
        throw new Error("Expected condition improvement failure")
      } catch (e) {
        const expected = "Unable to improve weapon condition higher than 100%"
        assert.equal(e.message, expected)
        c.condition.assert(1)
      }
    })
  })
})
