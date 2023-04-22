import { I_ProgramConfiguration, I_ProgramDefinition, } from 'rotini';
import { version, } from '../../package.json';

export const definition: I_ProgramDefinition = {
  name: 'rotini',
  description: 'rotini cli framework companion cli',
  version,
};

export const configuration: I_ProgramConfiguration = {
  strict_commands: true,
  strict_flags: true,
};
