# image-cli [![npm](https://img.shields.io/npm/v/image-cli.svg)](https://www.npmjs.com/package/image-cli) [![Build Status](https://travis-ci.org/egoist/image-cli.svg?branch=master)](https://travis-ci.org/egoist/image-cli)

8MB GIF Preview 😅

![preview](http://ww4.sinaimg.cn/large/a15b4afegw1f1ws1vl1h9g20v70i07wo.gif)

## Install

```bash
$ npm install -g image-cli
```

## Example

```bash
$ image a.jpg

$ image [Drag and Drop an image here from your file system]

$ image http://remote/path/to/image.jpg

# if a given image url is not ended with .xxx but something like .xxx:large
# you can specific the extension you actually need using `-e/--ext`:
$ image http://path/to/a.jpg/large -e .jpg
```

## License

MIT &copy; [EGOIST](https://github.com/egoist)
