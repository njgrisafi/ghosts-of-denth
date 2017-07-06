const assert = require("assert")
const fs = require("fs")
const _ = require("lodash")
const yaml = require("js-yaml")
const yamlload = (p) => yaml.safeLoad(fs.readFileSync(`${__dirname}/${p}`))
const races = yamlload("../data/characters/races.yml").races
const cclasses = yamlload("../data/characters/classes.yml").classes

const create = (chain) => {
  chain.character = {
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

const update = (chain) => {
  return (update) => {
    return update(chain)
  }
}

const race = (chain) => {
  return {
    valid(race) {
      return _.get(races, race) != null
    },
    set(race) {
      if (!this.valid(race)) {
        throw new Error(`Invalid race: ${race}`)
      }
      chain.character.race = _.get(races, race)
      return chain
    },
    modify() {
      if (chain.character.race) {
        const modifiers = chain.character.race.modifiers
        chain.character.strength += modifiers.strength
        chain.character.intelligence += modifiers.intelligence
        chain.character.dexterity += modifiers.dexterity
        chain.character.endurance += modifiers.endurance
        chain.character.willpower += modifiers.willpower
        chain.character.luck += modifiers.luck
      }
      return chain
    },
    assert(race) {
      const actual = chain.character.race
      const expected = _.get(races, race)
      const message = `Expected race to be ${race}`
      assert.deepEqual(actual, expected, message)
      return chain
    },
  }
}

const cclass = (chain) => {
  return {
    valid(cclass) {
      return _.get(cclasses, cclass) != null
    },
    set(cclass) {
      if (!this.valid(cclass)) {
        throw new Error(`Invalid character class: ${cclass}`)
      }
      chain.character.class = _.get(cclasses, cclass)
      return chain
    },
    modify() {
      if (chain.character.class) {
        const modifiers = chain.character.class.modifiers
        chain.character.strength += modifiers.strength
        chain.character.intelligence += modifiers.intelligence
        chain.character.dexterity += modifiers.dexterity
        chain.character.endurance += modifiers.endurance
        chain.character.willpower += modifiers.willpower
        chain.character.luck += modifiers.luck
      }
      return chain
    },
    assert(cclass) {
      const actual = chain.character.cclass
      const expected = _.get(cclasses, cclass)
      const message = `Expected character class to be ${cclass}`
      assert.deepEqual(actual, expected, message)
      return chain
    },
  }
}

const level = (chain) => {
  return {
    up() {
      const needed = chain.experience.needed(1)
      if (chain.character.experience != needed) {
        throw new Error("Insufficient experience")
      }
      // increment level
      chain.character.level += 1
      // apply race and class modifiers
      chain.race.modify()
      chain.class.modify()
      // add attribute points
      chain.character.attributePoints += 6
      // reset experience
      chain.character.experience = 0
      return chain
    },
    assert(expected) {
      const actual = chain.character.level
      const message = `Expected level to be ${expected}, got ${actual}`
      assert.equal(actual, expected, message)
      return chain
    },
  }
}

const EXP_CONSTANT = 0.07

const experience = (chain) => {
  return {
    gain(points) {
      let needed = 0
      while (points > 0) {
        // calculate experience needed for the next level
        needed = chain.experience.needed(1)
        // determine if there are excess experience points
        if ((chain.character.experience + points) >= needed) {
          // level up
          points -= (needed - chain.character.experience)
          chain.character.experience = needed
          chain.level.up()
        } else {
          // gain experience points
          chain.character.experience += points
          points = 0
        }
      }
      return chain
    },
    needed(levels) {
      const level = chain.character.level + levels
      let needed = 0
      if (level > 1) {
        needed = _.chain(levels)
          .times((i) => {
            const level = chain.character.level + i
            return parseInt(
              Math.pow(level / EXP_CONSTANT, 2) + (level * EXP_CONSTANT * 100)
            )
          })
          .sum()
          .value()
      }
      return needed
    },
    assert(expected) {
      const actual = chain.character.experience
      const message = `Expected experience to be ${expected}, got ${actual}`
      assert.equal(actual, expected, message)
      return chain
    },
  }
}

const attributePoints = (chain) => {
  return {
    assert(expected) {
      const actual = chain.character.attributePoints
      const message = (
        `Expected attribute points to be ${expected}, got ${actual}`
      )
      assert.equal(actual, expected, message)
      return chain
    },
  }
}

const attribute = (attribute) => {
  return (chain) => {
    return {
      allocate(points) {
        if (chain.character.attributePoints < points) {
          throw new Error("Insufficient attribute points")
        }
        chain.character[attribute] += points
        chain.character.attributePoints -= points
        return chain
      },
      assert(expected) {
        const actual = chain.character[attribute]
        const message = `Expected ${attribute} to be ${expected}, got ${actual}`
        assert.equal(actual, expected, message)
        return chain
      },
    }
  }
}

const strength = attribute("strength")

const intelligence = attribute("intelligence")

const dexterity = attribute("dexterity")

const endurance = attribute("endurance")

const willpower = attribute("willpower")

const luck = attribute("luck")

module.exports = () => {
  let chain = {}
  chain.update = update(chain)
  chain.race = race(chain)
  chain.class = cclass(chain)
  chain.level = level(chain)
  chain.experience = experience(chain)
  chain.attributePoints = attributePoints(chain)
  chain.strength = strength(chain)
  chain.intelligence = intelligence(chain)
  chain.dexterity = dexterity(chain)
  chain.endurance = endurance(chain)
  chain.willpower = willpower(chain)
  chain.luck = luck(chain)
  create(chain)
  return chain
}
