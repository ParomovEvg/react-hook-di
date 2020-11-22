import { Rule } from '../Rule';
import { Module } from '../../di-system';
import { MayFailBox, ResultBox } from 'value-box-ts';
import { ValidationError } from '../ValidationError';

export class RulesGroup implements Rule {
  constructor(private rules: Rule[]) {}

  test(module: Module): MayFailBox<ValidationError, Module> {
    return this.rules.reduce((res, rule) => {
      return res.chain(rule.test);
    }, ResultBox.of(module));
  }
}
