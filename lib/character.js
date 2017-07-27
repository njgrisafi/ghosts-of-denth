const assert = require("assert")
const _ = require("lodash")
const util = require("./util")
const curry = util.curry
const yamlload = util.yamlloader(`${__dirname}/../data`)
const self = module.exports = {}
const character = self

character.create = () => {
  return {
    race: null,
    specialization: null,
    level: 0,
    experience: 0,
    attributePoints: 0,
    strength: 5,
    intelligence: 5,
    dexterity: 5,
    endurance: 5,
    willpower: 5,
    luck: 5,
  }
}

character.race = {
  all: _.memoize(() => yamlload("characters/races.yml").races),
  byKey: _.memoize((key) => _.get(self.race.all(), key)),
  valid: _.memoize((race) => self.race.byKey(race) != null),
  set: curry((race, character) => {
    if (!self.race.valid(race)) {
      throw new Error(`Invalid race: ${race}`)
    }
    character = _.clone(character)
    character.race = race
    return character
  }),
  assert: curry((race, character) => {
    const actual = self.race.byKey(character.race)
    const expected = self.race.byKey(race)
    assert.deepEqual(actual, expected, "Unexpected character race")
    return character
  })
}

character.specialization = {
  all: _.memoize(() => yamlload("characters/specializations.yml").specializations),
  byKey: _.memoize((key) => _.get(self.specialization.all(), key)),
  valid: _.memoize((cspecialization) => self.specialization.byKey(cspecialization) != null),
  set: curry((cspecialization, character) => {
    if (!self.specialization.valid(cspecialization)) {
      throw new Error(`Invalid character specialization: ${cspecialization}`)
    }
    character = _.clone(character)
    character.specialization = cspecialization
    return character
  }),
  assert: curry((cspecialization, character) => {
    const actual = self.specialization.byKey(character.specialization)
    const expected = self.specialization.byKey(cspecialization)
    assert.deepEqual(actual, expected, "Unexpected character specialization")
    return character
  })
}

character.level = {
  up: (character) => {
    if (character.experience != self.experience.needed(1, character)) {
      throw new Error("Insufficient experience")
    }
    character = _.clone(character)
    character.level += 1
    character.attributePoints += 6
    character.experience = 0
    return character
  },
  assert: curry((expected, character) => {
    const actual = character.level
    assert.equal(actual, expected, "Unexpected level")
    return character
  })
}

character.experience = {
  needed: curry((levels, character) => {
    const SCALING_FACTOR = 0.07
    const target = character.level + levels
    let needed = 0
    if (target > 1) {
      needed = _.chain(levels)
        .times((i) => {
          const level = character.level + i
          return parseInt(
            Math.pow(level / SCALING_FACTOR, 2)
            + (level * SCALING_FACTOR * 100)
          )
        })
        .sum()
        .value()
    }
    return needed
  }),
  gain: curry((points, character) => {
    let needed = 0
    character = _.clone(character)
    while (points > 0) {
      needed = self.experience.needed(1, character)
      if ((character.experience + points) >= needed) {
        points -= (needed - character.experience)
        character.experience = needed
        character = self.level.up(character)
      } else {
        character.experience += points
        points = 0
      }
    }
    return character
  }),
  assert: curry((expected, character) => {
    const actual = character.experience
    assert.equal(actual, expected, "Unexpected experience")
    return character
  })
}

character.attributePoints = {
  assert: curry((expected, character) => {
    const actual = character.attributePoints
    assert.equal(actual, expected, "Unexpected attribute points")
    return character
  })
}

const attribute = (attribute) => {
  const module = {}
  module.base = {
    assert: curry((expected, character) => {
      const actual = character[attribute]
      assert.equal(actual, expected, `Unexpected base ${attribute}`)
      return character
    })
  }
  module.modifiers = {
    derive: (character) => {
      const modifiers = {}
      const race = self.race.byKey(character.race)
      const cspecialization = self.specialization.byKey(character.specialization)
      if (race && _.get(race, `modifiers.${attribute}`) > 0) {
        modifiers.race = _.get(race, `modifiers.${attribute}`)
      }
      if (cspecialization && _.get(cspecialization, `modifiers.${attribute}`) > 0) {
        modifiers.specialization = _.get(cspecialization, `modifiers.${attribute}`)
      }
      return modifiers
    },
    assert: curry((expected, character) => {
      const actual = module.modifiers.derive(character)
      const message = `Unexpected ${attribute} modifiers`
      assert.deepEqual(actual, expected, message)
      return character
    })
  }
  module.total = {
    derive: (character) => {
      const modifiers = module.modifiers.derive(character)
      return character[attribute] + _.sum(_.values(modifiers))
    },
    assert: curry((expected, character) => {
      const actual = module.total.derive(character)
      assert.deepEqual(actual, expected, `Unexpected total ${attribute}`)
      return character
    })
  }
  module.allocate = curry((points, character) => {
    if (character.attributePoints < points) {
      throw new Error("Insufficient attribute points")
    }
    character = _.clone(character)
    character[attribute] += points
    character.attributePoints -= points
    return character
  })
  module.assert = curry((base, modifiers, total, character) => {
    module.base.assert(base, character)
    module.modifiers.assert(modifiers, character)
    module.total.assert(total, character)
    return character
  })
  return module
}

character.strength = attribute("strength")
character.intelligence = attribute("intelligence")
character.dexterity = attribute("dexterity")
character.endurance = attribute("endurance")
character.willpower = attribute("willpower")
character.luck = attribute("luck")
