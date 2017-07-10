const assert = require("assert")
const util = require("../lib/util")
const compose = util.compose
const armor = require("../lib/armor")

describe("armor", () => {
  describe("creating armor", () => {
    it("creates a new armor", () => {
      compose(
        armor.name.assert("Armor"),
        armor.type.assert(null)
      )(armor.create())
    })
  })
  describe("creating armor of various types", () => {
    it("creates Plate Helmets", () => {
      compose(
        armor.name.assert("Plate Helmet"),
        armor.type.assert("plate.helmet"),
        armor.type.set("plate.helmet")
      )(armor.create())
    })
    it("creates Plate Cuirasses", () => {
      compose(
        armor.name.assert("Plate Cuirass"),
        armor.type.assert("plate.cuirass"),
        armor.type.set("plate.cuirass")
      )(armor.create())
    })
    it("creates Plate Greaves", () => {
      compose(
        armor.name.assert("Plate Greaves"),
        armor.type.assert("plate.greaves"),
        armor.type.set("plate.greaves")
      )(armor.create())
    })
    it("creates Plate Gauntlets", () => {
      compose(
        armor.name.assert("Plate Gauntlets"),
        armor.type.assert("plate.gauntlets"),
        armor.type.set("plate.gauntlets")
      )(armor.create())
    })
    it("creates Plate Boots", () => {
      compose(
        armor.name.assert("Plate Boots"),
        armor.type.assert("plate.boots"),
        armor.type.set("plate.boots")
      )(armor.create())
    })
    it("creates Scalemail Coifs", () => {
      compose(
        armor.name.assert("Scalemail Coif"),
        armor.type.assert("scalemail.coif"),
        armor.type.set("scalemail.coif")
      )(armor.create())
    })
    it("creates Scalemail Hauberks", () => {
      compose(
        armor.name.assert("Scalemail Hauberk"),
        armor.type.assert("scalemail.hauberk"),
        armor.type.set("scalemail.hauberk")
      )(armor.create())
    })
    it("creates Scalemail Leggings", () => {
      compose(
        armor.name.assert("Scalemail Leggings"),
        armor.type.assert("scalemail.leggings"),
        armor.type.set("scalemail.leggings")
      )(armor.create())
    })
    it("creates Chainmail Coifs", () => {
      compose(
        armor.name.assert("Chainmail Coif"),
        armor.type.assert("chainmail.coif"),
        armor.type.set("chainmail.coif")
      )(armor.create())
    })
    it("creates Chainmail Hauberks", () => {
      compose(
        armor.name.assert("Chainmail Hauberk"),
        armor.type.assert("chainmail.hauberk"),
        armor.type.set("chainmail.hauberk")
      )(armor.create())
    })
    it("creates Chainmail Leggings", () => {
      compose(
        armor.name.assert("Chainmail Leggings"),
        armor.type.assert("chainmail.leggings"),
        armor.type.set("chainmail.leggings")
      )(armor.create())
    })
    it("creates Hide Helmets", () => {
      compose(
        armor.name.assert("Helmet"),
        armor.type.assert("hide.helmet"),
        armor.type.set("hide.helmet")
      )(armor.create())
    })
    it("creates Hide Hats", () => {
      compose(
        armor.name.assert("Hat"),
        armor.type.assert("hide.hat"),
        armor.type.set("hide.hat")
      )(armor.create())
    })
    it("creates Hide Cowls", () => {
      compose(
        armor.name.assert("Cowl"),
        armor.type.assert("hide.cowl"),
        armor.type.set("hide.cowl")
      )(armor.create())
    })
    it("creates Hide Cuirasses", () => {
      compose(
        armor.name.assert("Cuirass"),
        armor.type.assert("hide.cuirass"),
        armor.type.set("hide.cuirass")
      )(armor.create())
    })
    it("creates Hide Vests", () => {
      compose(
        armor.name.assert("Vest"),
        armor.type.assert("hide.vest"),
        armor.type.set("hide.vest")
      )(armor.create())
    })
    it("creates Hide Leggings", () => {
      compose(
        armor.name.assert("Leggings"),
        armor.type.assert("hide.leggings"),
        armor.type.set("hide.leggings")
      )(armor.create())
    })
    it("creates Hide Bracers", () => {
      compose(
        armor.name.assert("Bracers"),
        armor.type.assert("hide.bracers"),
        armor.type.set("hide.bracers")
      )(armor.create())
    })
    it("creates Hide Gloves", () => {
      compose(
        armor.name.assert("Gloves"),
        armor.type.assert("hide.gloves"),
        armor.type.set("hide.gloves")
      )(armor.create())
    })
    it("creates Hide Boots", () => {
      compose(
        armor.name.assert("Boots"),
        armor.type.assert("hide.boots"),
        armor.type.set("hide.boots")
      )(armor.create())
    })
    it("creates Hide Shoes", () => {
      compose(
        armor.name.assert("Shoes"),
        armor.type.assert("hide.shoes"),
        armor.type.set("hide.shoes")
      )(armor.create())
    })
    it("creates Cloth Hats", () => {
      compose(
        armor.name.assert("Hat"),
        armor.type.assert("cloth.hat"),
        armor.type.set("cloth.hat")
      )(armor.create())
    })
    it("creates Cloth Cowls", () => {
      compose(
        armor.name.assert("Cowl"),
        armor.type.assert("cloth.cowl"),
        armor.type.set("cloth.cowl")
      )(armor.create())
    })
    it("creates Cloth Tunics", () => {
      compose(
        armor.name.assert("Tunic"),
        armor.type.assert("cloth.tunic"),
        armor.type.set("cloth.tunic")
      )(armor.create())
    })
    it("creates Cloth Robes", () => {
      compose(
        armor.name.assert("Robe"),
        armor.type.assert("cloth.robe"),
        armor.type.set("cloth.robe")
      )(armor.create())
    })
    it("creates Cloth Trousers", () => {
      compose(
        armor.name.assert("Trousers"),
        armor.type.assert("cloth.trousers"),
        armor.type.set("cloth.trousers")
      )(armor.create())
    })
    it("creates Cloth Gloves", () => {
      compose(
        armor.name.assert("Gloves"),
        armor.type.assert("cloth.gloves"),
        armor.type.set("cloth.gloves")
      )(armor.create())
    })
    it("creates Cloth Shoes", () => {
      compose(
        armor.name.assert("Shoes"),
        armor.type.assert("cloth.shoes"),
        armor.type.set("cloth.shoes")
      )(armor.create())
    })
    it("fails to create invalid armor types", () => {
      try {
        armor.type.set("asdf", armor.create())
        throw new Error("Expected invalid armor type error")
      } catch (e) {
        assert.equal(e.message, "Invalid armor type: asdf")
      }
    })
  })
})
