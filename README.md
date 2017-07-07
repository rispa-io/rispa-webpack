# Rispa Webpack [![Build Status](https://api.travis-ci.org/rispa-io/rispa-webpack.svg?branch=master)](https://travis-ci.org/rispa-io/rispa-webpack)
**Rispa** plugin for building modules with `webpack`.

### How to use
### Install
Add this plugin and some plugin with specific webpack configuration, for example [@rispa/webpack-javascript](https://github.com/rispa-io/rispa-webpack-javascript):
```bash  
ris add @rispa/webpack @rispa/webpack-javascript
```

Use the following commands to build your code and run dev server.

### Build
For start build javascript sources into output folder, run:
```bash  
ris run @rispa/webpack build
```
