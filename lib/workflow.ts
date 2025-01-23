import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient, resend } from "@upstash/qstash";
import config from "@/lib/config";

import WelcomeEmail, { WelcomeEmailProps } from "@/app/emails/WelcomeEmail";
import InactivityEmail, {
  InactivityEmailProps,
} from "@/app/emails/InactivityEmail";
import ActiveEmail, { ActiveEmailProps } from "@/app/emails/ActiveEmail";
import { render } from "@react-email/render";

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

  switch (template) {
    case "welcome":
      emailHtml = render(WelcomeEmail(props as WelcomeEmailProps));
      break;
    case "inactive":
      emailHtml = render(InactivityEmail(props as InactivityEmailProps));
      break;
    case "active":
      emailHtml = render(ActiveEmail(props as ActiveEmailProps));
      break;
  }

  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resendToken }),
    },
    body: {
      from: "Kitupala <contact@kimmo.io>",
      to: [email],
      subject,
      html: emailHtml,
    },
  });
};
