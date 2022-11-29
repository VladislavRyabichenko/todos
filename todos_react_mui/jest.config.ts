// export default {
//   transform: {
//     '^.+\\.tsx?$': 'ts-jest',
//   },
// };

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
