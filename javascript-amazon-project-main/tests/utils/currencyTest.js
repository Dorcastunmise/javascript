import { formatCurrency } from "../../utils/currency.js";

describe('test suite: Formatting currencies', () => {
  it('test case: conversion of cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('test case: converting with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounding up to the nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  it('rounding up to the nearest cent II', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00');
  });
});