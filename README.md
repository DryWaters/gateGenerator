# gateGenerator
Generates random truth circuit using AND/OR/NOT gates (for testing CS154).
It will output all values from the truth table for the given design to 
"expected0Results.txt" and "expected1Results.txt"
that can be loaded into JFLAP.

To run:
1. First install packages (Live Server)
```npm install```

2. Generate random circuits
node generator #numInputs #numCircuits

Example to generate 5 circuits with 10 inputs use:
```
node generator 10 5
```
