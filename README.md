# SCO
Space Climate Observatory

This is the Space Climate Observatory webapp.

## Local installation

Clone the `SCO` repository and open the webapp folder using your terminal:
```
git clone https://github.com/MizarWeb/Sco
cd Sco
```

Ensure you are using Node v8 and NPM v5 and you are not log as `root`.  
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

### Dependencies

-	node v8
-	npm v5
