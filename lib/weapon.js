const assert = require("assert")
const fs = require("fs")
const _ = require("lodash")
const curry = _.curry
const yaml = require("js-yaml")
const yamlload = (p) => yaml.safeLoad(fs.readFileSync(`${__dirname}/${p}`))
const weapon = module.exports = {}
const grades = yamlload("../data/weapons/grades.yml").grades
const handednesses = yamlload("../data/weapons/handednesses.yml").handednesses
const materials = yamlload("../data/weapons/materials.yml").materials
const wclasses = yamlload("../data/weapons/classes.yml").classes

weapon.create = () => {
  const handednessset = module.exports.handedness.set
  let weapon = {
    grade: null,
    handedness: null,
    material: null,
    class: null,
    condition: 1
  }
  weapon = handednessset("one-handed", weapon)
  return weapon
}

weapon.grade = {
  valid: curry((grade) => {
    return _.get(grades, grade) != null
  }),
  set: curry((grade, weapon) => {
    const gradevalid = module.exports.grade.valid
    if (!gradevalid(grade)) {
      throw new Error(`Invalid weapon grade: ${grade}`)
    }
    weapon = _.clone(weapon)
    weapon.grade = _.get(grades, grade)
    return weapon
  }),
  assert: curry((grade, weapon) => {
    const actual = weapon.grade
    const expected = _.get(grades, grade)
    assert.equal(actual, expected, "Unexpected weapon grade")
    return weapon
  })
}

weapon.handedness = {
  valid: curry((handedness) => {
    return _.get(handednesses, handedness) != null
  }),
  set: curry((handedness, weapon) => {
    const handednessvalid = module.exports.handedness.valid
    if (!handednessvalid(handedness)) {
      throw new Error(`Invalid handedness: ${handedness}`)
    }
    weapon = _.clone(weapon)
    weapon.handedness = _.get(handednesses, handedness)
    return weapon
  }),
  assert: curry((handedness, weapon) => {
    const actual = weapon.handedness
    const expected = _.get(handednesses, handedness)
    assert.equal(actual, expected, "Unexpected weapon handedness")
    return weapon
  })
}

weapon.material = {
  valid: curry((material) => {
    return _.get(materials, material) != null
  }),
  set: curry((material, weapon) => {
    const materialvalid = module.exports.material.valid
    if (!materialvalid(material)) {
      throw new Error(`Invalid weapon material: ${material}`)
    }
    weapon = _.clone(weapon)
    weapon.material = _.get(materials, material)
    return weapon
  }),
  assert: curry((material, weapon) => {
    const actual = weapon.material
    const expected = _.get(materials, material)
    assert.equal(actual, expected, "Unexpected weapon material")
    return weapon
  })
}

weapon.class = {
  valid: curry((wclass) => {
    return _.get(wclasses, wclass) != null
  }),
  set: curry((wclass, weapon) => {
    const classvalid = module.exports.class.valid
    if (!classvalid(wclass)) {
      throw new Error(`Invalid weapon class: ${wclass}`)
    }
    weapon = _.clone(weapon)
    weapon.class = _.get(wclasses, wclass)
    return weapon
  }),
  assert: curry((wclass, weapon) => {
    const actual = weapon.class
    const expected = _.get(wclasses, wclass)
    assert.equal(actual, expected, "Unexpected weapon class")
    return weapon
  })
}

weapon.name = {
  derive: curry((weapon) => {
    const onehanded = _.get(handednesses, "one-handed")
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
  }),
  assert: curry((expected, weapon) => {
    const namederive = module.exports.name.derive
    const actual = namederive(weapon)
    assert.equal(actual, expected, "Unexpected weapon name")
    return weapon
  })
}

weapon.condition = {
  decline: curry((amount, weapon) => {
    const gradeset = module.exports.grade.set
    weapon = _.clone(weapon)
    weapon.condition = Math.max(weapon.condition - amount, 0)
    if (weapon.condition == 0) {
      weapon = gradeset("broken", weapon)
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
