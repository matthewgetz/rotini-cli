#!/usr/bin/env node
import { rotini, } from 'rotini';
import { definition, configuration, } from './cli';

void (async (): Promise<void> => {
  const program = rotini({ definition, configuration, });
  const result = await program.run().catch(program.error);
  result && console.info(result);
})();
