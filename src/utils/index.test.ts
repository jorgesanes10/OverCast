import {
  convertUTCToLocalTime,
  getFormattedCondition,
  getPreferredUnitOfMeasurement,
} from './index';

describe('tests utility functions', () => {
  test('getFormattedCondition returns correct values', () => {
    expect(getFormattedCondition('Rain')).toEqual('Rainy');
    expect(getFormattedCondition('Clear')).toEqual('Clear');
    expect(getFormattedCondition('Snow')).toEqual('Snowy');
    expect(getFormattedCondition('Clouds')).toEqual('Cloudy');
    expect(getFormattedCondition('Whatever')).toEqual('Clear');
  });

  test('convertUTCToLocalTime returns correct value', () => {
    expect(convertUTCToLocalTime(1737963959, 0)).toEqual('02:45 AM');
    expect(convertUTCToLocalTime(1737992393, 0)).toEqual('10:39 AM');
  });

  test('getPreferredUnitOfMeasurement returns correct value', () => {
    expect(getPreferredUnitOfMeasurement('en-US')).toEqual('imperial');
    expect(getPreferredUnitOfMeasurement('en-MM')).toEqual('imperial');
    expect(getPreferredUnitOfMeasurement('my-MM')).toEqual('imperial');
    expect(getPreferredUnitOfMeasurement('en-LR')).toEqual('imperial');
    expect(getPreferredUnitOfMeasurement('es-CO')).toEqual('metric');
  });
});
