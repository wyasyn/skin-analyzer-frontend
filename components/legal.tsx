"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const TermsOfUsePage: React.FC = () => (
  <main className="wrapper py-10 my-24 lg:my-32">
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="max-w-3xl mx-auto"
    >
      <Card>
        <CardHeader>
          <CardTitle>Terms of Use</CardTitle>
          <CardDescription>Last updated: May 18, 2025</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Welcome to Aurora Skin Analyzer! By accessing or using our website,
            you agree to be bound by these Terms of Use. If you do not agree
            with any part of these terms, please do not use our services.
          </p>
          <h2 className="text-lg font-semibold">1. Use of Service</h2>
          <p>
            You must be at least 18 years old to use this Service. You agree not
            to misuse the Service or help anyone else do so.
          </p>
          <h2 className="text-lg font-semibold">2. Intellectual Property</h2>
          <p>
            All content, features, and functionality are owned by Aurora
            Organics AI and are protected by international copyright.
          </p>
          <h2 className="text-lg font-semibold">3. Limitation of Liability</h2>
          <p>
            In no event shall Aurora Organics AI be liable for any indirect,
            incidental, special, consequential or punitive damages arising out
            of your use of the Service.
          </p>
          <h2 className="text-lg font-semibold">4. Changes to Terms</h2>
          <p>
            We may modify these terms at any time. The updated terms will be
            effective upon posting.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  </main>
);

export const PrivacyPolicyPage: React.FC = () => (
  <main className="wrapper py-10 my-24 lg:my-32">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
      className="max-w-3xl mx-auto"
    >
      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
          <CardDescription>Last updated: May 18, 2025</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Aurora Skin Analyzer is committed to protecting your privacy. This
            Policy explains how we collect, use, and safeguard your information.
          </p>
          <h2 className="text-lg font-semibold">1. Information Collection</h2>
          <p>
            We collect images you upload for analysis, and any user-provided
            details (email, name) solely to provide the service.
          </p>
          <h2 className="text-lg font-semibold">2. Use of Information</h2>
          <p>
            We use your data to perform skin analysis, improve our models, and
            communicate updates. We do not sell your personal data.
          </p>
          <h2 className="text-lg font-semibold">3. Data Security</h2>
          <p>
            We implement technical and organizational measures to protect your
            data against unauthorized access or disclosure.
          </p>
          <h2 className="text-lg font-semibold">4. Your Rights</h2>
          <p>
            You can request to access, update, or delete your personal data by
            contacting us at info@auroraorganics.co.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  </main>
);

export default { TermsOfUsePage, PrivacyPolicyPage };
