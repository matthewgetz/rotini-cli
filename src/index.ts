#!/usr/bin/env node
import { rotini, } from 'rotini';
import { definition, configuration, } from './cli';

void (async (): Promise<void> => {
  const result = await rotini({ definition, configuration, }).run();
  result?.handler_result && console.info(result.handler_result);
})();
