# SCO

This is the Space Climate Observatory webapp.

## Local installation

Clone the `SCO` repository and open the webapp folder using your terminal:
```
git clone https://github.com/MizarWeb/sco
cd sco
```

Ensure you are using Node v8 (or above) and NPM v5 and you are not log as `root`.  

Install dependencies with the following:
```
npm install
```

**Congratulation**, you're now ready to launch the application.

## Run options

Run the application with the following :
```
npm start
```

Then opens your browser at [http://localhost:3333/](http://localhost:3333/) to browse the application.

### Production build

```
npm run build
```

### Run tests :

It runs tests in then terminal, then creates a report in `reports/mocha/` folder:

```
npm test
```

### Run test:coverage :

To run tests with coverage, then creates coverage reports (lcov, xunit) inside `reports/coverage/` folder:

```
npm run test:coverage
```

### Lint :

You shall lint the entire app [using our Regards OSS lint rules](/blob/master/eslint-config-es6-rules) before commiting:
```
npm run lint:fix
```
### Upgrade Mizar

This webapp uses a fixed version of Mizar as long as it isn't available on npm.  
To use a newest version, open the `package.json` file and change the commit id in the `dependencies.Mizar` url.  
Then run `npm i`.  
Everytime there is a new file or a file deleted in the Mizar library, you need to adapt the `@sco/adapter` module.  
Run the app with `npm start` then edit the file `./web_modules/adapter/src/adapters/MizarLoader.js`.  
On one hand, you will see in the node console if `webpack` tries to import a file that doesn't exist.  
In another hand, you will see in the browser console if `require.js` requires a missing file.

### Dependencies

-	node v8.10
-	npm v5.7

### Known issues

When you install this application, all these NPM warnings can be safely ignored :  
- `npm WARN enoent SKIPPING OPTIONAL DEPENDENCY: ENOENT`
- `npm WARN optional SKIPPING OPTIONAL DEPENDENCY`
- `npm WARN enoent ENOENT: no such file or directory`
- `npm WARN <some dependency>@<version> requires a peer of <another dependency>@<version> but none is installed. You must install peer dependencies yourself.`
- `npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform`