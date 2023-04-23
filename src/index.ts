#!/usr/bin/env node
import { rotini, } from '../../rotini/build';
import { definition, configuration, } from './cli';

void (async (): Promise<void> => {
  const program = rotini({ definition, configuration, });
  await program.run().catch(program.error);
})();
