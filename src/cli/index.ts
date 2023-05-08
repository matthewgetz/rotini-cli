import { Configuration, Definition, } from '../../../rotini/build';
import { version, } from '../../package.json';
import { commands, } from './commands';
import { global_flags, } from './global_flags';

export const definition: Definition = {
  name: 'rotini',
  description: 'The rotini cli framework companion cli.',
  documentation: 'https://rotini.dev',
  version,
  commands,
  global_flags,
};

export const configuration: Configuration = {
  strict_commands: true,
  strict_flags: true,
  strict_help: true,
  strict_mode: false,
};
