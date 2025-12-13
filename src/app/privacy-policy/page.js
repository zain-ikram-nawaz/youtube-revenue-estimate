export const metadata = {
  title: "Privacy Policy | ChannelIncome",
  description:
    "We value your privacy. Learn how ChannelIncome handles your data and ensures your information is safe and anonymous.",
  keywords: [
    "ChannelIncome privacy policy",
    "YouTube analytics privacy",
    "data protection",
    "user data security",
  ],
  alternates: { canonical: "https://channelincome.com/privacy-policy" },
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        At <strong>ChannelIncome</strong>, your privacy is our top priority.
        We do not collect, store, or share any personal data from our users.
      </p>
      <p className="mb-4">
        This website uses Google APIs (such as YouTube Data API and reCAPTCHA)
        only to fetch public YouTube channel information and to protect against spam.
        We do not keep any of the data you enter on our servers.
      </p>
      <p className="mb-4">
        By using our website, you agree to this Privacy Policy.
        We may update it from time to time without prior notice.
      </p>
      <p className="text-sm text-gray-600">
        Last updated: December 2025
      </p>
    </div>
  );
}
