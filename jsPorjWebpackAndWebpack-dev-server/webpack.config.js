const path = require('path');

module.exports = {
    entry: './src/code.ts',   // defaults to ./src, Here the application starts executing and webpack starts bundling
    output: {
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        // Rules for modules (configure loaders, parser options, etc.)
        // States include the test which extension file we need to compile, loader tells which loader we will go to use to work done. 
        // In our case, we have already download ts-loader. exclude contains, which folder we don’t need to include in out transpile process.
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
};