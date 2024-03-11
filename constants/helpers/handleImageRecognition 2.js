import OpenAI from "openai";
import OpenAIConstants from "../OpenAIConstants";

const openai = new OpenAI({ apiKey: OpenAIConstants.apiKey });
export const handleImageRecognition = async ({ url }) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text:
              "Tell me if the image presents a recyclable object, and if yes the type of recyclable item. The types are: plastic, paper or aluminium. Structure your response in two words: one word representing the response to the question Is it recyclable, and the second one the item type as presented above. " +
              "If the answer to what type of object is presented is carton then answer paper.",
          },
          {
            type: "image_url",
            image_url: {
              url: url,
            },
          },
        ],
      },
    ],
  });
  return response.choices[0].message;
};
