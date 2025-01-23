// import * as React from "react";
// import {
//   Body,
//   Container,
//   Head,
//   Heading,
//   Html,
//   Preview,
//   Text,
//   Tailwind,
//   Hr,
// } from "@react-email/components";
//
// export interface WelcomeEmailProps {
//   fullName: string;
// }
//
// export const WelcomeEmail = ({ fullName }: WelcomeEmailProps) => (
//   <Html>
//     <Head />
//     <Preview>Welcome to the BookWise</Preview>
//     <Tailwind>
//       <Body className="mx-auto my-auto bg-white px-2 font-sans">
//         <Container className="mx-auto max-w-md px-4 py-8">
//           <Heading className="mb-4 text-2xl font-semibold text-gray-900">
//             Welcome to the BookWise!
//           </Heading>
//           <Hr />
//           <Text className="mb-4 text-base text-gray-700">
//             Hello, {fullName}
//           </Text>
//           <Text className="mb-4 text-base text-gray-700">
//             Thanks for submitting your account information. We&apos;re excited
//             to have you on board!
//           </Text>
//           <Text className="mb-4 text-base text-gray-700">
//             If you have any questions, feel free to reach out to our support
//             team.
//           </Text>
//           <Text className="text-base text-gray-500">— The BookWise team</Text>
//         </Container>
//       </Body>
//     </Tailwind>
//   </Html>
// );
//
// export default WelcomeEmail;

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export interface WelcomeEmailProps {
  validationCode?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const LinearLoginCodeEmail = ({ validationCode }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Your login code for Linear</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/static/linear-logo.png`}
          width="42"
          height="42"
          alt="Linear"
          style={logo}
        />
        <Heading style={heading}>Your login code for Linear</Heading>
        <Section style={buttonContainer}>
          <Button style={button} href="https://linear.app">
            Login to Linear
          </Button>
        </Section>
        <Text style={paragraph}>
          This link and code will only be valid for the next 5 minutes. If the
          link does not work, you can use the login verification code directly:
        </Text>
        <code style={code}>{validationCode}</code>
        <Hr style={hr} />
        <Link href="https://linear.app" style={reportLink}>
          Linear
        </Link>
      </Container>
    </Body>
  </Html>
);

LinearLoginCodeEmail.PreviewProps = {
  validationCode: "tt226-5398x",
} as WelcomeEmailProps;

export default LinearLoginCodeEmail;

const logo = {
  borderRadius: 21,
  width: 42,
  height: 42,
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const buttonContainer = {
  padding: "27px 0 27px",
};

const button = {
  backgroundColor: "#5e6ad2",
  borderRadius: "3px",
  fontWeight: "600",
  color: "#fff",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "11px 23px",
};

const reportLink = {
  fontSize: "14px",
  color: "#b4becc",
};

const hr = {
  borderColor: "#dfe1e4",
  margin: "42px 0 26px",
};

const code = {
  fontFamily: "monospace",
  fontWeight: "700",
  padding: "1px 4px",
  backgroundColor: "#dfe1e4",
  letterSpacing: "-0.3px",
  fontSize: "21px",
  borderRadius: "4px",
  color: "#3c4149",
};
