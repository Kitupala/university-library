import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Tailwind,
  Hr,
  Button,
} from "@react-email/components";

export interface InactivityEmailProps {
  fullName: string;
}

export const InactivityEmail = ({ fullName }: InactivityEmailProps) => (
  <Html>
    <Head />
    <Preview>We miss you!</Preview>
    <Tailwind>
      <Body className="mx-auto my-auto bg-white px-2 font-sans">
        <Container className="mx-auto max-w-md px-4 py-8">
          <Heading className="mb-4 text-2xl font-semibold text-gray-900">
            We miss you! 💔
          </Heading>
          <Hr />
          <Text className="mb-4 text-base text-gray-700">
            Hello, {fullName}
          </Text>
          <Text className="mb-4 text-base text-gray-700">
            We noticed you haven&apos;t been around lately. We&apos;d love to
            see you back on the platform!
          </Text>
          <Button
            href="https://university-library-indol.vercel.app/sign-in"
            className="block w-full rounded-md bg-black px-4 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-gray-800"
          >
            Return to BookWise
          </Button>
          <Text className="mb-4 text-base text-gray-700">
            If you have any questions or need assistance, our support team is
            here to help.
          </Text>
          <Text className="text-base text-gray-500">— The BookWise team</Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default InactivityEmail;
