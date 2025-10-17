# Calculator MCP Server

A simple Model Context Protocol (MCP) server that provides basic calculator functionality through MCP tools.

## Features

This MCP server provides the following calculator tools:

- **add**: Add two numbers together
- **subtract**: Subtract second number from first number  
- **multiply**: Multiply two numbers together
- **divide**: Divide first number by second number (with zero-division protection)
- **power**: Raise first number to the power of second number
- **sqrt**: Calculate square root of a number (with negative number protection)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Build the TypeScript code:
```bash
npm run build
```

## Usage

### Running the Server

Start the MCP server:
```bash
npm start
```

Or run in development mode:
```bash
npm run dev
```

### MCP Client Configuration

To use this calculator MCP server with an MCP client (like Claude Desktop), add it to your MCP configuration:

```json
{
  "mcpServers": {
    "calculator": {
      "command": "node",
      "args": ["/path/to/calculator-mcp/dist/index.js"],
      "env": {}
    }
  }
}
```

### Available Tools

#### add
Adds two numbers together.
- Parameters: `a` (number), `b` (number)
- Example: `add(5, 3)` returns `5 + 3 = 8`

#### subtract
Subtracts the second number from the first.
- Parameters: `a` (number), `b` (number)
- Example: `subtract(10, 4)` returns `10 - 4 = 6`

#### multiply
Multiplies two numbers together.
- Parameters: `a` (number), `b` (number)
- Example: `multiply(6, 7)` returns `6 × 7 = 42`

#### divide
Divides the first number by the second.
- Parameters: `a` (number), `b` (number)
- Example: `divide(15, 3)` returns `15 ÷ 3 = 5`
- Error handling: Returns error for division by zero

#### power
Raises the base to the power of the exponent.
- Parameters: `base` (number), `exponent` (number)
- Example: `power(2, 8)` returns `2^8 = 256`

#### sqrt
Calculates the square root of a number.
- Parameters: `number` (number)
- Example: `sqrt(16)` returns `√16 = 4`
- Error handling: Returns error for negative numbers

## Development

### Project Structure

```
calculator-mcp/
├── src/
│   └── index.ts          # Main MCP server implementation
├── dist/                 # Compiled JavaScript output
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

### Building

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

## Error Handling

The calculator includes proper error handling for:
- Division by zero
- Square root of negative numbers
- Invalid tool names
- General execution errors

All errors are returned with appropriate error messages and the `isError` flag set to true.

## License

MIT
