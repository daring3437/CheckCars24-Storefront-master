module.exports = {
  name: 'contact',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/contact',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
