import { expect, test, describe } from "vitest";
import { FireworksAIProvider } from "./index";

describe("Fireworks provider tool calls", () => {
  test("should respond with tool call", async () => {
    const resp = await FireworksAIProvider.chat({
      model: "firefunction-v1",
      messages: [
        {
          role: "user",
          content:
            "Extract name from the following message: \n\n Message: Hi my name is John Doe. I'm 26 years old and I work in real estate.",
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "extract_data",
            description: "extract name from message",
            parameters: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "the name of the person, e.g. Alexa",
                },
              },
              required: ["name"],
            },
          },
        },
      ],
    });
    expect(resp.choices[0]?.message.tool_calls?.[0]?.function.name).toBe(
      "extract_data",
    );
    expect(
      resp.choices[0]?.message.tool_calls?.[0]?.function.arguments,
    ).contains("John Doe");
  }, 10000);
});
