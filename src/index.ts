#!/usr/bin/env node
import { rotini, } from 'rotini';
import { definition, configuration, } from './cli';

void (async (): Promise<void> => {
  const program = rotini({ definition, configuration, });
  const result = await program.run();
  result?.handler_result && console.info(result.handler_result);
})();
