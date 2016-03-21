# dazeus-plugin-coffee
Simple coffee management: determine who needs to do the long walk to the coffee
machine with a simple command in your IRC channel:

    }coffee

If you really need any of the advanced features you can always take a look at

    }coffee help

(Note: the command changes depending on the beverage selected in the config)

## Running
After having installed a somewhat recent version of nodejs and npm, simply
install dependencies using:

    npm install

After you've done that, copy `config.json.default` to `config.json` and edit
any options to suit your needs. Then run it using:

    node index.js

Alternatively for development you may want to use `bin/watch`. This command will
pass any arguments on to the script itself. Please see `node index.js --help`
for a list of options available.
