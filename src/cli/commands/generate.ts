import { I_Command, } from '../../../../rotini/build';

export const generate: I_Command = {
  name: 'generate',
  aliases: [ 'init', 'gen', ],
  description: 'generate a rotini resource',
  arguments: [
    {
      name: 'type',
      description: 'the type of generation',
      variant: 'variadic',
      values: [ 'cli', 'docs', ],
    },
  ],
  operation: {
    handler: (): string => 'generate',
  },
};
