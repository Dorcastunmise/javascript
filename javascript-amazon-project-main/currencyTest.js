import { formatCurrency } from "./utils/currency";

describe('test suite: Formatting currencies', () => {
  it('test case: conversion of cents into dollars', () => {
    expects(formatCurrency(2095).toEqual('20.95'));
  });
});