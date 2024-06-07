import type { Templates } from "../types/configs/Templates";
import defaultTemplate from "./templates/default";
import hikingRecommendationsChatbotTemplate from "./templates/hikingRecommendationsChatbot";
import irsTaxChatbotTemplate from "./templates/irsTaxChatbot";
import jsonFormatterAssistantTemplate from "./templates/jsonFormatterAssistant";
import marketingWritingAssistantTemplate from "./templates/marketingWritingAssistant";
import shakespeareWritingAssistantTemplate from "./templates/shakespeareWritingAssistant";
import xboxCustomerSupportAgentTemplate from "./templates/xboxCustomerSupportAgent";

const templates: Templates = [
  defaultTemplate,
  hikingRecommendationsChatbotTemplate,
  irsTaxChatbotTemplate,
  jsonFormatterAssistantTemplate,
  marketingWritingAssistantTemplate,
  shakespeareWritingAssistantTemplate,
  xboxCustomerSupportAgentTemplate,
];
export default templates;
