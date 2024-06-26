from openai import AsyncOpenAI


async def execute(inputs, parameters):
    openai = AsyncOpenAI()
    messages = []
    for input in inputs:
        input.get("user_query")
        messages.append({"role": "user", "content": input.get("user_query")})
        chat_completion = await openai.chat.completions.create(
            messages=messages,
            model="gpt-3.5-turbo",
        )
        messages.append(
            {
                "role": chat_completion.choices[0].message.role,
                "content": chat_completion.choices[0].message.content,
            }
        )
        openai.chat.completions.create
    thread_length = len(messages)
    return {
        # setting the last response as the final output of the conversation
        "value": messages[thread_length - 1].get("content", ""),
        # saving the thread in metadata for eyeball and scoring output
        "metadata": {"messages": messages},
    }
