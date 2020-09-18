module.exports = {
  name: 'product-details',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/product-details',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
