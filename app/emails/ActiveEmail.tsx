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
} from "@react-email/components";

export interface ActiveEmailProps {
  fullName: string;
}

export const ActiveEmail = ({ fullName }: ActiveEmailProps) => (
  <Html>
    <Head />
    <Preview>Keep up the great reading!</Preview>
    <Tailwind>
      <Body className="mx-auto my-auto bg-white px-2 font-sans">
        <Container className="mx-auto max-w-md px-4 py-8">
          <Heading className="mb-4 text-2xl font-semibold text-gray-900">
            You're doing great on BookWise!
          </Heading>
          <Hr />
          <Text className="mb-4 text-base text-gray-700">
            Hello, {fullName}
          </Text>
          <Text className="mb-4 text-base text-gray-700">
            We noticed you&apos;ve been actively engaging with BookWise. Your
            consistent reading and exploration are truly inspiring!
          </Text>
          <Text className="mb-4 text-base text-gray-700">
            Keep discovering new books, expanding your knowledge, and enjoying
            your reading journey.
          </Text>
          <Text className="text-base text-gray-500">— The BookWise team</Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default ActiveEmail;
