import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient, resend } from "@upstash/qstash";
import config from "@/lib/config";

import WelcomeEmail, { WelcomeEmailProps } from "@/app/emails/WelcomeEmail";
import InactivityEmail, {
  InactivityEmailProps,
} from "@/app/emails/InactivityEmail";
import ActiveEmail, { ActiveEmailProps } from "@/app/emails/ActiveEmail";
import { render } from "@react-email/render";
import React from "react";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

enum EmailTemplate {
  WELCOME = "welcome",
  INACTIVE = "inactive",
  ACTIVE = "active",
}

// Helper function for rendering email templates
const renderEmailTemplate = (
  template: EmailTemplate,
  props: WelcomeEmailProps | InactivityEmailProps | ActiveEmailProps,
): Promise<string> => {
  switch (template) {
    case EmailTemplate.WELCOME:
      return render(
        React.createElement(WelcomeEmail, props as WelcomeEmailProps),
      );
    case EmailTemplate.INACTIVE:
      return render(
        React.createElement(InactivityEmail, props as InactivityEmailProps),
      );
    case EmailTemplate.ACTIVE:
      return render(
        React.createElement(ActiveEmail, props as ActiveEmailProps),
      );
    default:
      throw new Error(`Unknown email template: ${template}`);
  }
};

export const sendEmail = async ({
  email,
  subject,
  template,
  props,
}: {
  email: string;
  subject: string;
  template: EmailTemplate;
  props: WelcomeEmailProps | InactivityEmailProps | ActiveEmailProps;
}) => {
  // Render the email HTML using the helper function
  const emailHtml = await renderEmailTemplate(template as EmailTemplate, props);

  // Generate plain-text fallback from the rendered HTML (simple fallback logic)
  const fallbackText = emailHtml.replace(/<[^>]*>/g, "").trim(); // Removes HTML tags

  // Send the email using qstashClient
  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resendToken }),
    },
    body: {
      from: "Kitupala <contact@kimmo.io>",
      to: [email],
      subject,
      react: emailHtml,
      text: fallbackText, // Use extracted fallback text
    },
  });
};
