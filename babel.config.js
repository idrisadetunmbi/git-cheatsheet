const presets = [[
  '@babel/env',
  {
    targets: {
      node: true,
    },
  },
], ['@babel/preset-react'],
];
const plugins = [['@babel/plugin-proposal-class-properties']];

module.exports = { presets, plugins };
