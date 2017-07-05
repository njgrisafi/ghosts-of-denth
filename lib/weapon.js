const assert = require("assert")
const _ = require("lodash")

const grades = {
  legendary: {
    name: "Legendary",
  },
  mythic: {
    name: "Mythic",
  },
  epic: {
    name: "Epic",
  },
  flawless: {
    name: "Flawless",
  },
  exquisite: {
    name: "Exquisite",
  },
  common: {
    name: "Common",
  },
  inferior: {
    name: "Inferior",
  },
  flawed: {
    name: "Flawed",
  },
  broken: {
    name: "Broken",
  },
}

const handednesses = {
  1: {
    name: "One-handed",
  },
  2: {
    name: "Two-handed",
  },
}

const materials = {
  copper: {
    name: "Copper",
  },
  bronze: {
    name: "Bronze",
  },
  iron: {
    name: "Iron",
  },
  steel: {
    name: "Steel",
  },
  titanium: {
    name: "Titanium",
  },
  "tempered-steel": {
    name: "Tempered Steel",
  },
  carbon: {
    name: "Carbon",
  },
}

const wclasses = {
  axe: {
    name: "Axe",
  },
  bow: {
    name: "Bow",
  },
  crossbow: {
    name: "Crossbow",
  },
  dagger: {
    name: "Dagger",
  },
  mace: {
    name: "Mace",
  },
  polearm: {
    name: "Polearm",
  },
  staff: {
    name: "Staff",
  },
  sword: {
    name: "Sword",
  },
  wand: {
    name: "Wand",
  },
}

const create = (chain) => {
  chain.weapon = {
    grade: null,
    handedness: null,
    material: null,
    class: null,
    condition: 1
  }
  chain
    .handedness.set(1)
    .name.set()
}

const name = (chain) => {
  return {
    set() {
      let pieces = []
      if (chain.weapon.grade) {
        pieces.push(chain.weapon.grade.name)
      }
      if (
        chain.weapon.handedness
        && chain.weapon.handedness != _.get(handednesses, 1)
      ) {
        pieces.push(chain.weapon.handedness.name)
      }
      if (chain.weapon.material) {
        pieces.push(chain.weapon.material.name)
      }
      if (chain.weapon.class) {
        pieces.push(chain.weapon.class.name)
      } else {
        pieces.push("Weapon")
      }
      chain.weapon.name = pieces.join(" ")
    },
    assert(expected) {
      const actual = chain.weapon.name
      const message = `Expected weapon name to be ${expected}, got ${actual}`
      assert.equal(actual, expected, message)
      return chain
    },
  }
}

const grade = (chain) => {
  return {
    valid(grade) {
      return _.get(grades, grade) != null
    },
    set(grade) {
      if (!this.valid(grade)) {
        throw new Error(`Invalid weapon grade: ${grade}`)
      }
      chain.weapon.grade = _.get(grades, grade)
      chain.name.set()
      return chain
    },
    assert(grade) {
      const actual = chain.weapon.grade
      const expected = _.get(grades, grade)
      const message = `Expected weapon grade to be ${grade}`
      assert.equal(actual, expected, message)
      return chain
    }
  }
}

const handedness = (chain) => {
  return {
    valid(handedness) {
      return [1, 2].indexOf(handedness) >= 0
    },
    set(handedness) {
      if (!this.valid(handedness)) {
        throw new Error(`Invalid handedness: ${handedness}`)
      }
      chain.weapon.handedness = _.get(handednesses, handedness)
      chain.name.set()
      return chain
    },
    assert(handedness) {
      const actual = chain.weapon.handedness
      const expected = _.get(handednesses, handedness)
      const message = `Expected weapon handedness to be ${handedness}`
      assert.equal(actual, expected, message)
      return chain
    },
  }
}

const material = (chain) => {
  return {
    valid(material) {
      return _.get(materials, material) != null
    },
    set(material) {
      if (!this.valid(material)) {
        throw new Error(`Invalid weapon material: ${material}`)
      }
      chain.weapon.material = _.get(materials, material)
      chain.name.set()
      return chain
    },
    assert(material) {
      const actual = chain.weapon.material
      const expected = _.get(materials, material)
      const message = `Expected weapon material to be ${material}`
      assert.equal(actual, expected, message)
      return chain
    },
  }
}

const wclass = (chain) => {
  return {
    valid(wclass) {
      return _.get(wclasses, wclass) != null
    },
    set(wclass) {
      if (!this.valid(wclass)) {
        throw new Error(`Invalid weapon class: ${wclass}`)
      }
      chain.weapon.class = _.get(wclasses, wclass)
      chain.name.set()
      return chain
    },
    assert(wclass) {
      const actual = chain.weapon.class
      const expected = _.get(wclasses, wclass)
      const message = `Expected weapon class to be ${wclass}`
      assert.equal(actual, expected, message)
      return chain
    },
  }
}

const condition = (chain) => {
  return {
    decline(amount) {
      chain.weapon.condition = Math.max(chain.weapon.condition - amount, 0)
      if (chain.weapon.condition == 0) {
        chain.grade.set("broken")
        chain.name.set()
      }
      return chain
    },
    improve(amount) {
      if (chain.weapon.condition + amount > 1) {
        throw new Error("Unable to improve weapon condition higher than 100%")
      }
      chain.weapon.condition += amount
      return chain
    },
    assert(expected) {
      const actual = chain.weapon.condition
      const message = `Expected weapon condition to be ${expected}, `
        + `got ${actual}`
      assert.equal(actual, expected, message)
      return chain
    }
  }
}

module.exports = () => {
  let chain = {}
  chain.name = name(chain)
  chain.grade = grade(chain)
  chain.handedness = handedness(chain)
  chain.material = material(chain)
  chain.class = wclass(chain)
  chain.condition = condition(chain)
  create(chain)
  return chain
}
