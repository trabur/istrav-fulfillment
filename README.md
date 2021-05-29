AAGHC.COM
========

```bash
# development
$ npm run dev
```

```bash
npm install
npm run build
npm start
```

```bash
git push
git tag
git tag v0.6
git push --tags
git push --delete origin v0.6
```

# git submodules used
```fish
$ git submodule add https://github.com/trabur/istrav-headless farmerless

$ cd farmerless
$ npm install
```

# pull latest git changes
```fish
$ git submodule update --init --recursive && git submodule foreach --recursive git fetch && git submodule foreach git merge origin master
```