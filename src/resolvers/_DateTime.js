const { GraphQLScalarType, Kind } = require('graphql');
const moment = require('moment');

const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'A valid date time value',
  serialize(value) {
    return moment(value).toISOString();
  },
  parseValue(value) {
    if (moment(value, moment.ISO_8601, true).isValid()) {
      return new Date(value);
    }
    throw new Error(`Invalid DateTime: ${value}`);
  },
  parseLiteral(ast) {
    if (
      ast.kind === Kind.STRING &&
      moment(ast.value, moment.ISO_8601, true).isValid()
    ) {
      return new Date(ast.value);
    }
    throw new Error(`Invalid DateTime: ${ast.value}`);
  },
});

module.exports = DateTime;
