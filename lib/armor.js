const assert = require("assert")
const _ = require("lodash")
const util = require("./util")
const curry = util.curry
const yamlload = util.yamlloader(`${__dirname}/../data`)
const self = module.exports = {}
const armor = self

armor.create = () => {
  return {}
}

armor.name = {
  derive: (armor) => {
    let name = "Armor"
    if (armor.type) {
      name = self.type.byKey(armor.type).name
    }
    return name
  },
  assert: curry((expected, armor) => {
    const actual = self.name.derive(armor)
    assert.equal(actual, expected, "Unexpected armor name")
  })
}

armor.type = {
  all: _.memoize(() => yamlload("armor/types.yml").types),
  byKey: _.memoize((key) => _.get(self.type.all(), key)),
  valid: _.memoize((type) => self.type.byKey(type) != null),
  set: curry((type, armor) => {
    if (!self.type.valid(type)) {
      throw new Error(`Invalid armor type: ${type}`)
    }
    armor = _.clone(armor)
    armor.type = type
    return armor
  }),
  assert: curry((type, armor) => {
    const actual = self.type.byKey(armor.type)
    const expected = self.type.byKey(type)
    assert.deepEqual(actual, expected, "Unexpected armor type")
    return armor
  })
}
