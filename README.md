# Gate Generator
Generates random circuit using AND/OR/NOT gates (for testing CS154 group project).

It will output expected 0 and 1 values for the given circuit to
"expected0Results.txt" and "expected1Results.txt"
that can be loaded into [JFLAP](http://www.jflap.org/).

Currently setup to do a maximum of 20 tests per table to keep from
overflowing on large input circuits.

Web interface (index.html) allows user to display these generated circuits
and an option to display a user defined string.  Each circuit can be
tested with defined input values to test the final output.

A gate with a red line represents a positive (1) and a black line 
represents a negative (0) output.

* [Instructions](#instructions)
* [Getting Started](#getting-started)
* [Prerequisites](#prerequisites)
* [Built With](#built-with)
* [Contributing](#contributing)
* [Example](#example)
* [Authors](#authors)

## Instructions

1. Clone repo to your local machine
2. Install NPM Packages using ``` npm install ```
3. Run with
``` 
node generator #number of inputs per circuit #number of circuits to generate 
```

Example to generate 5 circuits with 10 inputs use:
```
node generator 10 5
```

## Getting Started
Only NPM package needed is **live-server**.
Package is needed to serve the generated JS to the browser.

## Prerequisites
All needed NPM packages are included in the package.json file.

## Built With
[NodeJS](https://nodejs.org/)

## Contributing
Feel free to fork into your own repo to add additional features.

## Example
![Example of Output](https://raw.githubusercontent.com/DryWaters/gateGenerator/master/example.png)

## Authors
[Daniel Waters](https://www.watersjournal.com)

