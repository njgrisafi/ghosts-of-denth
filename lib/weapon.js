const assert = require("assert")
const _ = require("lodash")
const util = require("./util")
const curry = util.curry
const yamlload = util.yamlloader(`${__dirname}/../data`)
const self = module.exports = {}
const weapon = self

weapon.create = () => {
  let weapon = {
    grade: null,
    handedness: null,
    material: null,
    type: null,
    condition: 1
  }
  weapon = self.handedness.set("one-handed", weapon)
  return weapon
}

weapon.grade = {
  all: _.memoize(() => yamlload("weapons/grades.yml").grades),
  byKey: _.memoize((key) => _.get(self.grade.all(), key)),
  valid: _.memoize((grade) => self.grade.byKey(grade) != null),
  set: curry((grade, weapon) => {
    if (!self.grade.valid(grade)) {
      throw new Error(`Invalid weapon grade: ${grade}`)
    }
    weapon = _.clone(weapon)
    weapon.grade = grade
    return weapon
  }),
  assert: curry((grade, weapon) => {
    const actual = self.grade.byKey(weapon.grade)
    const expected = self.grade.byKey(grade)
    assert.equal(actual, expected, "Unexpected weapon grade")
    return weapon
  })
}

weapon.handedness = {
  all: _.memoize(() => yamlload("weapons/handedness.yml").handedness),
  byKey: _.memoize((key) => _.get(self.handedness.all(), key)),
  valid: _.memoize((handedness) => self.handedness.byKey(handedness) != null),
  set: curry((handedness, weapon) => {
    if (!self.handedness.valid(handedness)) {
      throw new Error(`Invalid handedness: ${handedness}`)
    }
    weapon = _.clone(weapon)
    weapon.handedness = handedness
    return weapon
  }),
  assert: curry((handedness, weapon) => {
    const actual = self.handedness.byKey(weapon.handedness)
    const expected = self.handedness.byKey(handedness)
    assert.equal(actual, expected, "Unexpected weapon handedness")
    return weapon
  })
}

weapon.material = {
  all: _.memoize(() => yamlload("weapons/materials.yml").materials),
  byKey: _.memoize((key) => _.get(self.material.all(), key)),
  valid: _.memoize((material) => self.material.byKey(material) != null),
  set: curry((material, weapon) => {
    if (!self.material.valid(material)) {
      throw new Error(`Invalid weapon material: ${material}`)
    }
    weapon = _.clone(weapon)
    weapon.material = material
    return weapon
  }),
  assert: curry((material, weapon) => {
    const actual = self.material.byKey(weapon.material)
    const expected = self.material.byKey(material)
    assert.equal(actual, expected, "Unexpected weapon material")
    return weapon
  })
}

weapon.type = {
  all: _.memoize(() => yamlload("weapons/types.yml").types),
  byKey: _.memoize((key) => _.get(self.type.all(), key)),
  valid: _.memoize((type) => self.type.byKey(type) != null),
  set: curry((type, weapon) => {
    if (!self.type.valid(type)) {
      throw new Error(`Invalid weapon type: ${type}`)
    }
    weapon = _.clone(weapon)
    weapon.type = type
    return weapon
  }),
  assert: curry((type, weapon) => {
    const actual = self.type.byKey(weapon.type)
    const expected = self.type.byKey(type)
    assert.equal(actual, expected, "Unexpected weapon type")
    return weapon
  })
}

weapon.name = {
  derive: (weapon) => {
    let pieces = []
    if (weapon.grade) {
      pieces.push(self.grade.byKey(weapon.grade).name)
    }
    if (weapon.handedness && weapon.handedness != "one-handed") {
      pieces.push(self.handedness.byKey(weapon.handedness).name)
    }
    if (weapon.material) {
      pieces.push(self.material.byKey(weapon.material).name)
    }
    pieces.push(weapon.type ? self.type.byKey(weapon.type).name : "Weapon")
    return pieces.join(" ")
  },
  assert: curry((expected, weapon) => {
    const actual = self.name.derive(weapon)
    assert.equal(actual, expected, "Unexpected weapon name")
    return weapon
  })
}

weapon.condition = {
  decline: curry((amount, weapon) => {
    weapon = _.clone(weapon)
    weapon.condition = Math.max(weapon.condition - amount, 0)
    if (weapon.condition == 0) {
      weapon = self.grade.set("broken", weapon)
    }
    return weapon
  }),
  improve: curry((amount, weapon) => {
    if (weapon.condition + amount > 1) {
      throw new Error("Unable to improve weapon condition higher than 100%")
    }
    weapon = _.clone(weapon)
    weapon.condition += amount
    return weapon
  }),
  assert: curry((expected, weapon) => {
    const actual = weapon.condition
    assert.equal(actual, expected, "Unexpected weapon condition")
    return weapon
  })
}
