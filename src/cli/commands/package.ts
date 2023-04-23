import { I_Command, } from '../../../../rotini/build';

export const pack: I_Command = {
  name: 'package',
  aliases: [ 'pack', 'pkg', ],
  description: 'package a rotini cli',
  operation: {
    handler: (): string => 'package',
  },
};
