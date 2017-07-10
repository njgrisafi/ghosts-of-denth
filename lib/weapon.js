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
    class: null,
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
    weapon.grade = self.grade.byKey(grade)
    return weapon
  }),
  assert: curry((grade, weapon) => {
    const actual = weapon.grade
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
    weapon.handedness = self.handedness.byKey(handedness)
    return weapon
  }),
  assert: curry((handedness, weapon) => {
    const actual = weapon.handedness
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
    weapon.material = self.material.byKey(material)
    return weapon
  }),
  assert: curry((material, weapon) => {
    const actual = weapon.material
    const expected = self.material.byKey(material)
    assert.equal(actual, expected, "Unexpected weapon material")
    return weapon
  })
}

weapon.class = {
  all: _.memoize(() => yamlload("weapons/classes.yml").classes),
  byKey: _.memoize((key) => _.get(self.class.all(), key)),
  valid: _.memoize((wclass) => self.class.byKey(wclass) != null),
  set: curry((wclass, weapon) => {
    if (!self.class.valid(wclass)) {
      throw new Error(`Invalid weapon class: ${wclass}`)
    }
    weapon = _.clone(weapon)
    weapon.class = self.class.byKey(wclass)
    return weapon
  }),
  assert: curry((wclass, weapon) => {
    const actual = weapon.class
    const expected = self.class.byKey(wclass)
    assert.equal(actual, expected, "Unexpected weapon class")
    return weapon
  })
}

weapon.name = {
  derive: (weapon) => {
    const onehanded = self.handedness.byKey("one-handed")
    let pieces = []
    if (weapon.grade) {
      pieces.push(weapon.grade.name)
    }
    if (weapon.handedness && weapon.handedness != onehanded) {
      pieces.push(weapon.handedness.name)
    }
    if (weapon.material) {
      pieces.push(weapon.material.name)
    }
    pieces.push(weapon.class ? weapon.class.name : "Weapon")
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
