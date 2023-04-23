import { I_GlobalFlag, } from 'rotini';

export const global_flags: I_GlobalFlag[] = [
  {
    name: 'output',
    description: 'the command output format',
    short_key: 'o',
    long_key: 'output',
    type: 'string',
    variant: 'value',
    values: [ 'text', 'json', ],
    default: 'text',
  },
];
