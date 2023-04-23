import { I_Command, } from '../../../../rotini/build';

import { generate, } from './generate';
import { pack, } from './package';

export const commands: I_Command[] = [
  generate,
  pack,
];
