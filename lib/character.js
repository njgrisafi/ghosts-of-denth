const assert = require("assert")
const fs = require("fs")
const _ = require("lodash")
const curry = _.curry
const yaml = require("js-yaml")
const yamlload = (p) => yaml.safeLoad(fs.readFileSync(`${__dirname}/${p}`))
const races = yamlload("../data/characters/races.yml").races
const cclasses = yamlload("../data/characters/classes.yml").classes
const character = module.exports = {}

character.create = () => {
  return {
    race: null,
    class: null,
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
  valid: curry((race) => {
    return _.get(races, race) != null
  }),
  set: curry((race, character) => {
    const racevalid = module.exports.race.valid
    if (!racevalid(race)) {
      throw new Error(`Invalid race: ${race}`)
    }
    character = _.clone(character)
    character.race = _.get(races, race)
    return character
  }),
  assert: curry((race, character) => {
    const actual = character.race
    const expected = _.get(races, race)
    assert.deepEqual(actual, expected, "Unexpected character race")
    return character
  })
}

character.class = {
  valid: curry((cclass) => {
    return _.get(cclasses, cclass) != null
  }),
  set: curry((cclass, character) => {
    const classvalid = module.exports.class.valid
    if (!classvalid(cclass)) {
      throw new Error(`Invalid character class: ${cclass}`)
    }
    character = _.clone(character)
    character.class = _.get(cclasses, cclass)
    return character
  }),
  assert: curry((cclass, character) => {
    const actual = character.class
    const expected = _.get(cclasses, cclass)
    assert.deepEqual(actual, expected, "Unexpected character class")
    return character
  })
}

character.level = {
  up: curry((character) => {
    const experienceneeded = module.exports.experience.needed
    if (character.experience != experienceneeded(1, character)) {
      throw new Error("Insufficient experience")
    }
    character = _.clone(character)
    character.level += 1
    character.attributePoints += 6
    character.experience = 0
    return character
  }),
  assert: curry((expected, character) => {
    const actual = character.level
    assert.equal(actual, expected, "Unexpected level")
    return character
  })
}

character.experience = {
  needed: curry((levels, character) => {
    const EXP_CONSTANT = 0.07
    const target = character.level + levels
    let needed = 0
    if (target > 1) {
      needed = _.chain(levels)
        .times((i) => {
          const level = character.level + i
          return parseInt(
            Math.pow(level / EXP_CONSTANT, 2) + (level * EXP_CONSTANT * 100)
          )
        })
        .sum()
        .value()
    }
    return needed
  }),
  gain: curry((points, character) => {
    const experienceneeded = module.exports.experience.needed
    const levelup = module.exports.level.up
    let needed = 0
    character = _.clone(character)
    while (points > 0) {
      needed = experienceneeded(1, character)
      if ((character.experience + points) >= needed) {
        points -= (needed - character.experience)
        character.experience = needed
        character = levelup(character)
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
    derive: curry((character) => {
      const modifiers = {}
      const race = character.race
      const cclass = character.class
      if (race && _.get(race, `modifiers.${attribute}`) > 0) {
        modifiers.race = _.get(race, `modifiers.${attribute}`)
      }
      if (cclass && _.get(cclass, `modifiers.${attribute}`) > 0) {
        modifiers.class = _.get(cclass, `modifiers.${attribute}`)
      }
      return modifiers
    }),
    assert: curry((expected, character) => {
      const modifiersderive = module.modifiers.derive
      const actual = modifiersderive(character)
      const message = `Unexpected ${attribute} modifiers`
      assert.deepEqual(actual, expected, message)
      return character
    })
  }
  module.total = {
    derive: curry((character) => {
      const modifiersderive = module.modifiers.derive
      const modifiers = modifiersderive(character)
      return character[attribute] + _.sum(_.values(modifiers))
    }),
    assert: curry((expected, character) => {
      const totalderive = module.total.derive
      const actual = totalderive(character)
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
    const baseassert = module.base.assert
    const modifiersassert = module.modifiers.assert
    const totalassert = module.total.assert
    baseassert(base, character)
    modifiersassert(modifiers, character)
    totalassert(total, character)
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
