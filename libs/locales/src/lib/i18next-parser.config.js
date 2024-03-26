// i18next-parser.config.js
module.exports = {
  // Key separator used in your translation keys
  contextSeparator: '.',

  // Save the \_old files
  createOldCatalogs: false,

  // Default namespace used in your i18next config
  defaultNamespace: 'translation',

  // Default value to give to empty keys
  defaultValue: '__NOT_TRANSLATED__',

  // Indentation of the catalog files
  indentation: 2,

  // Keep keys from the catalog that are no longer in code
  keepRemoved: false,

  // Key separator used in your translation keys
  // If you want to use plain english keys, separators such as `.` and `:` will conflict.
  // You might want to set `keySeparator: false` and `namespaceSeparator: false`.
  // That way, `t('Status: Loading...')` will not think that there are a namespace and three separator
  // dots for instance.
  // see below for more details
  keySeparator: '.',

  lexers: {
    ts: ['JavascriptLexer'],
    tsx: ['JsxLexer'],
    default: ['JavascriptLexer'],
  },

  // Control the line ending. See options at https://github.com/ryanve/eol
  lineEnding: 'auto',

  // An array of the locales in your applications
  locales: ['cs', 'en'],

  // Namespace separator used in your translation keys
  // If you want to use plain english keys, separators such as `.` and `:` will conflict.
  // You might want to set `keySeparator: false` and `namespaceSeparator: false`.
  // That way, `t('Status: Loading...')` will not think that
  // there are a namespace and three separator dots for instance.
  namespaceSeparator: ':',

  // Supports $LOCALE and $NAMESPACE injection
  // Supports JSON (.json) and YAML (.yml) file formats
  // Where to write the locale files relative to process.cwd()
  output: 'libs/locales/src/lib/locale-$LOCALE-$NAMESPACE.json',

  // An array of globs that describe where to look for source files
  // relative to the location of the configuration file
  input: undefined,

  // Whether or not to sort the catalog
  sort: true,

  // Whether to ignore default values.
  skipDefaultValues: false,

  // Whether to use the keys as the default value; ex. "Hello": "Hello", "World": "World"
  // This option takes precedence over the `defaultValue` and `skipDefaultValues` options
  useKeysAsDefaultValue: false,

  // Display info about the parsing including some stats
  verbose: false,

  // Exit with an exit code of 1 on warnings
  failOnWarnings: false,

  // If you wish to customize the value output the value as an object, you can set your own format.
  // ${defaultValue} is the default value you set in your translation function.
  // Any other custom property will be automatically extracted.
  //
  // Example:
  // {
  //   message: "${defaultValue}",
  //   description: "${maxLength}", // t('my-key', {maxLength: 150})
  // }
  customValueTemplate: null,
};
