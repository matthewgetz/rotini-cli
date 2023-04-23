import { I_ProgramConfiguration, I_ProgramDefinition, } from '../../../rotini/build';
import { version, } from '../../package.json';
import { commands, } from './commands';
import { global_flags, } from './global_flags';

export const definition: I_ProgramDefinition = {
  name: 'rotini',
  description: 'The rotini cli framework companion cli.',
  documentation: 'https://rotini.dev',
  version,
  commands,
  global_flags,
};

export const configuration: I_ProgramConfiguration = {
  strict_commands: true,
  strict_flags: true,
  strict_usage: true,
};
