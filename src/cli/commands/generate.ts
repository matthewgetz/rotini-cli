import { mkdirSync, writeFileSync, } from 'fs';

import { I_Command, } from '../../../../rotini/build';

export const generate: I_Command = {
  name: 'generate',
  aliases: [ 'init', 'gen', ],
  description: 'generate a rotini resource',
  arguments: [
    {
      name: 'directory',
      description: 'the name of the directory to be used for the generated program',
      type: 'string',
      variant: 'value',
      isValid: (value: string): void => {
        const allowedCharacters = /^[0-9A-Za-z_.-]+$/;
        const containsDisallowedCharacter = !allowedCharacters.test(value);
        if (containsDisallowedCharacter) {
          throw new Error(`Directory name "${value}" must only contain letters, numbers, hyphens, underscores, and periods.`);
        }
      },
    },
  ],
  flags: [
    {
      name: 'format',
      description: 'the project format to use for the generated program',
      variant: 'value',
      type: 'string',
      short_key: 'f',
      long_key: 'format',
      values: [ 'js', 'javascript', 'ts', 'typescript', ],
      default: 'js',
    },
    {
      name: 'type',
      description: 'the type of module to use for the generated program',
      variant: 'value',
      type: 'string',
      short_key: 't',
      long_key: 'type',
      values: [ 'cjs', 'commonjs', 'esm', 'module', ],
      default: 'cjs',

    },
  ],
  examples: [
    {
      description: 'simple generate (defaults to javascript commonjs example)',
      usage: 'rotini generate my-cli',
    },
    {
      description: 'generate a typescript esm example',
      usage: 'rotini generate my-cli -f ts -t esm',
    },
    {
      description: 'generate a javascript commonjs example',
      usage: 'rotini generate my-cli --type=cjs --format=js',
    },
  ],
  operation: {
    handler: ({ parsed, }): string => {
      const formats = {
        js: 'javascript',
        javascript: 'javascript',
        ts: 'typescript',
        typescript: 'typescript',
      };

      const types = {
        cjs: 'cjs',
        commonjs: 'cjs',
        esm: 'esm',
        module: 'esm',
      };

      const [ generate, ] = parsed.commands;
      const directory = generate.arguments.directory as string;
      const format = generate.flags.format as keyof typeof formats;
      const type = generate.flags.type as keyof typeof types;

      const resolved_format = formats[format];
      const resolved_type = types[type];

      mkdirSync(directory, { recursive: true, });
      // call github api to get hello-world example and put it in the created directory
      // unzip the example
      console.log(resolved_format, resolved_type);
      return `\ncd ${directory}\nnpm run setup\n${directory} hello-world\n`;
    },
  },
};
