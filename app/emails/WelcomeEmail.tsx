import * as React from "react";
import { Body, Html, Text } from "@react-email/components";

export const WelcomeEmail = () => (
  <Html>
    <Body>
      <Text>Simple Test Email</Text>
    </Body>
  </Html>
);
export default WelcomeEmail;
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
