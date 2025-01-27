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

export const sendEmail = async ({
  email,
  subject,
  template,
  props,
}: {
  email: string;
  subject: string;
  template: "welcome" | "inactive" | "active";
  props: WelcomeEmailProps | InactivityEmailProps | ActiveEmailProps;
  // props: Record<string, any>;
}) => {
  let emailHtml;

  // Render the appropriate React email template
  if (template === "welcome") {
    emailHtml = render(
      React.createElement(WelcomeEmail, props as WelcomeEmailProps),
    );
  } else if (template === "inactive") {
    emailHtml = render(
      React.createElement(InactivityEmail, props as InactivityEmailProps),
    );
  } else if (template === "active") {
    emailHtml = render(
      React.createElement(ActiveEmail, props as ActiveEmailProps),
    );
  } else {
    throw new Error(`Unknown email template: ${template}`);
  }

  // Debug the rendered HTML (optional)
  console.log("Rendered Email HTML:", emailHtml);

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
      text: "Fallback for the email.",
    },
  });
};
