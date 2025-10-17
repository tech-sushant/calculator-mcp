#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
// Create the MCP server
const server = new Server({
    name: "calculator-mcp",
    version: "1.0.0",
});
// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "add",
                description: "Add two numbers together",
                inputSchema: {
                    type: "object",
                    properties: {
                        a: {
                            type: "number",
                            description: "First number to add",
                        },
                        b: {
                            type: "number",
                            description: "Second number to add",
                        },
                    },
                    required: ["a", "b"],
                },
            },
            {
                name: "subtract",
                description: "Subtract second number from first number",
                inputSchema: {
                    type: "object",
                    properties: {
                        a: {
                            type: "number",
                            description: "Number to subtract from",
                        },
                        b: {
                            type: "number",
                            description: "Number to subtract",
                        },
                    },
                    required: ["a", "b"],
                },
            },
            {
                name: "multiply",
                description: "Multiply two numbers together",
                inputSchema: {
                    type: "object",
                    properties: {
                        a: {
                            type: "number",
                            description: "First number to multiply",
                        },
                        b: {
                            type: "number",
                            description: "Second number to multiply",
                        },
                    },
                    required: ["a", "b"],
                },
            },
            {
                name: "divide",
                description: "Divide first number by second number",
                inputSchema: {
                    type: "object",
                    properties: {
                        a: {
                            type: "number",
                            description: "Dividend (number to be divided)",
                        },
                        b: {
                            type: "number",
                            description: "Divisor (number to divide by)",
                        },
                    },
                    required: ["a", "b"],
                },
            },
            {
                name: "power",
                description: "Raise first number to the power of second number",
                inputSchema: {
                    type: "object",
                    properties: {
                        base: {
                            type: "number",
                            description: "Base number",
                        },
                        exponent: {
                            type: "number",
                            description: "Exponent",
                        },
                    },
                    required: ["base", "exponent"],
                },
            },
            {
                name: "sqrt",
                description: "Calculate square root of a number",
                inputSchema: {
                    type: "object",
                    properties: {
                        number: {
                            type: "number",
                            description: "Number to calculate square root of",
                        },
                    },
                    required: ["number"],
                },
            },
        ],
    };
});
// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    try {
        switch (name) {
            case "add": {
                const { a, b } = args;
                const result = a + b;
                return {
                    content: [
                        {
                            type: "text",
                            text: `${a} + ${b} = ${result}`,
                        },
                    ],
                };
            }
            case "subtract": {
                const { a, b } = args;
                const result = a - b;
                return {
                    content: [
                        {
                            type: "text",
                            text: `${a} - ${b} = ${result}`,
                        },
                    ],
                };
            }
            case "multiply": {
                const { a, b } = args;
                const result = a * b;
                return {
                    content: [
                        {
                            type: "text",
                            text: `${a} × ${b} = ${result}`,
                        },
                    ],
                };
            }
            case "divide": {
                const { a, b } = args;
                if (b === 0) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Error: Division by zero is not allowed",
                            },
                        ],
                        isError: true,
                    };
                }
                const result = a / b;
                return {
                    content: [
                        {
                            type: "text",
                            text: `${a} ÷ ${b} = ${result}`,
                        },
                    ],
                };
            }
            case "power": {
                const { base, exponent } = args;
                const result = Math.pow(base, exponent);
                return {
                    content: [
                        {
                            type: "text",
                            text: `${base}^${exponent} = ${result}`,
                        },
                    ],
                };
            }
            case "sqrt": {
                const { number } = args;
                if (number < 0) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: "Error: Cannot calculate square root of negative number",
                            },
                        ],
                        isError: true,
                    };
                }
                const result = Math.sqrt(number);
                return {
                    content: [
                        {
                            type: "text",
                            text: `√${number} = ${result}`,
                        },
                    ],
                };
            }
            default:
                return {
                    content: [
                        {
                            type: "text",
                            text: `Unknown tool: ${name}`,
                        },
                    ],
                    isError: true,
                };
        }
    }
    catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: `Error executing ${name}: ${error instanceof Error ? error.message : String(error)}`,
                },
            ],
            isError: true,
        };
    }
});
// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Calculator MCP server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map