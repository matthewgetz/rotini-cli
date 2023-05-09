import { mkdirSync, writeFileSync, } from 'fs';
import axios from 'axios';
import extract from 'extract-zip';
import { rimrafSync, } from 'rimraf';
import { Command, OperationError, } from 'rotini';

export const generate: Command = {
  name: 'generate',
  aliases: [ 'init', 'gen', ],
  description: 'generate a rotini project',
  arguments: [
    {
      name: 'directory',
      description: 'the name of the directory to be used for the generated program',
      type: 'string',
      variant: 'value',
      validator: ({ coerced_value, }): void => {
        const allowedCharacters = /^[0-9A-Za-z_.-]+$/;
        const containsDisallowedCharacter = !allowedCharacters.test(coerced_value as string);
        if (containsDisallowedCharacter) {
          throw new Error(`Directory name "${coerced_value}" must only contain letters, numbers, hyphens, underscores, and periods.`);
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
      default: 'typescript',
    },
    {
      name: 'type',
      description: 'the type of module to use for the generated program',
      variant: 'value',
      type: 'string',
      short_key: 't',
      long_key: 'type',
      values: [ 'cjs', 'commonjs', 'esm', 'module', ],
      default: 'commonjs',

    },
    {
      name: 'example',
      description: 'the example project to use for the generated program',
      variant: 'value',
      type: 'string',
      short_key: 'e',
      long_key: 'example',
      values: [ 'hello-world', 'mama-rotinis', 'template', ],
      default: 'template',
    },
  ],
  examples: [
    {
      description: 'simple generate (defaults to typescript commonjs example)',
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
    handler: async ({ parsed, }): Promise<string | object> => {
      const cwd = process.cwd();

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

      const examples = {
        'hello-world': 'hello-world',
      };

      const [ generate, ] = parsed.commands;
      const { output, } = parsed.global_flags;
      const directory = generate.arguments.directory as string;
      const example = generate.flags.example as keyof typeof examples;
      const format = generate.flags.format as keyof typeof formats;
      const type = generate.flags.type as keyof typeof types;
      const resolved_format = formats[format];
      const resolved_type = types[type];

      const url = `https://raw.githubusercontent.com/matthewgetz/rotini/main/examples/${example}/${resolved_format}/${resolved_type}.zip`;

      try {
        const result = await axios.get(url, { headers: { Accept: 'application/zip', }, responseType: 'arraybuffer', });

        rimrafSync(`${cwd}/${directory}`);
        mkdirSync(directory, { recursive: true, });
        writeFileSync(`${cwd}/${directory}/rotini.zip`, result.data as string);
        await extract(`${cwd}/${directory}/rotini.zip`, { dir: `${cwd}/${directory}`, });
        rimrafSync(`${cwd}/${directory}/rotini.zip`);
      } catch (e) {
        const error = e as Error;
        throw new OperationError(error.message);
      }

      const result = output === 'json'
        ? { result: `cd ${directory} && npm run setup && ${example} --help`, }
        : `\ncd ${directory}\nnpm run setup\n${example} --help\n\n      🍝\n`;

      return result;
    },
  },
};
