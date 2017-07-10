const fs = require("fs")
const _ = require("lodash")
const yaml = require("js-yaml")
const self = module.exports = {}
const util = self

util.curry = _.curry

util.compose = _.flowRight

util.yamlloader = util.curry((r, p) => {
  return util.compose(yaml.safeLoad, fs.readFileSync)(`${r}/${p}`)
})
