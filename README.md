# Notey
=====

[NodeJS](http://nodejs.org/) Note tracker command line utility inspired by [Rails](http://rubyonrails.org/) Rake Notes

## Description

Notey is a nodejs command line utility inspired by the notes rake task available for Rails. It retrieves all properly formatted notes from a directory / directories no matter how many levels deep. See a list of currently [supported note formats](#formats). 

## Install

```
$ npm install -g notey
```

## Usage

Notey accepts an infinite number of directories & files to look inside. When called by itself with no arguments, it will default to the **current working directory**.

For example specifying the multiple directories:

```
$ notey my_dir another_dir
```

```
# output:
my_dir/core.scss:
  * [Line   1] [TODO] add more fonts
  * [Line   5] [TODO] remove font below
 
another_dir/stuff.js:
  * [Line   4] [TODO] rename module
  * [Line  12] [TODO] refactor
  * [Line  23] [TODO] include new algorithm

another_dir/things.go
  * [Line 134] [TODO] remove unused struct
```

Or not specifying any directories

```
$ notey
```

```
# output:
User/person/dev/project/src/app/app.js:
  * [Line   4] [TODO] update routes
  * [Line  13] [TODO] add headers for CORS
  * [Line  28] [TODO] update resolves
  * [Line  39] [TODO] change fallback url

User/person/dev/project/src/app/controllers/main-controller.js:
  * [Line  14] [TODO] make var more descriptive

User/person/dev/project/src/app/controllers/main-controller.spec.js:
  * [Line   5] [TODO] remove hard-coded value
  * [Line  33] [TODO] make expectation more dynamic
```

## <a name="formats">Currently Supported Formats</a>

Warning: **Only notes w/ a trailing ':' will be considered valid.**

### Known Supported Languages

- C-Style Languages (C, JS, Go, Java, etc)
- HTML

**Note**: For all languages especially non-listed ones, single line comments for notes are highly recommended.

### Note Types

- TODO

**Future**:

- FIXME
- OPTIMIZE

**Note**: **Testing** is being done for the other note types. Thus, **TODO** is the only tested and supported type.

Examples:

**bad**

```
// todo: this is bad
// Todo: this is bad
// ToDo: this is bad
// todo this is bad
// TODO this is bad
```
**good**

```
// TODO: abstract into function

/**
 * TODO: change to camelCase
 */
```

## Development

Notey is tested using [Mocha](https://github.com/visionmedia/mocha) and [ShouldJS](https://github.com/shouldjs/should.js)

### Run All Specs

```
$ mocha
```