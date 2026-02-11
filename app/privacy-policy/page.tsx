import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Softwala",
    description: "Privacy Policy for Softwala Universal Legal Documents. Learn how we collect, use, and safeguard your information.",
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <header className="border-b border-zinc-800 pb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Privacy Policy</h1>
                    <p className="mt-2 text-sm text-zinc-500">Effective Date: 2026-02-12</p>
                </header>

                <section className="space-y-4">
                    <p>
                        Softwala ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how our mobile applications ("Apps") handle your information.
                    </p>
                    <p>
                        <strong>Core Principle:</strong> Our Apps are built with an "Offline-First" architecture. We do not operate a cloud backend to sync or store your personal user data. Your data stays on your device.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-xl font-semibold text-white">1. Information Collection and Use</h2>

                    <div className="space-y-2">
                        <h3 className="text-lg font-medium text-white/90">1.1. Personal User Data</h3>
                        <p>
                            We may ask for personal information such as your <strong>Name</strong> or <strong>Date of Birth</strong> within the App to provide personalized features (e.g., greetings, age calculation, or astrology).
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                            <li><strong>Storage:</strong> This data is stored 100% locally on your device (using technologies like Shared Preferences or Local Database).</li>
                            <li><strong>Transmission:</strong> We do NOT transmit this data to any external server owned by Softwala.</li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-medium text-white/90">1.2. Location Data</h3>
                        <p>
                            Some of our Apps require access to your device's location (Coarse or Fine) to function correctly (e.g., for calculating accurate Prayer Times, Qibla direction, or local astrology).
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                            <li><strong>Usage:</strong> Location coordinates are used strictly for local calculations within the App.</li>
                            <li><strong>Privacy:</strong> We do NOT track your movements, store your location history, or transmit your location to our servers.</li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-medium text-white/90">1.3. Third-Party Services & Ads</h3>
                        <p>
                            While we do not collect data, we use third-party services to support our App's functionality and business model (Ads). These third parties may collect data (such as Advertising ID, Device ID, crash logs, and diagnostics) to provide their services.
                        </p>
                        <p>Services we use include:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>
                                <strong className="text-white/80">Google AdMob:</strong> Used to display advertisements. AdMob may collect and use your device's advertising ID to serve personalized or non-personalized ads.
                                <br />
                                <a href="https://policies.google.com/privacy" className="text-blue-400 text-sm hover:underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>
                            </li>
                            <li>
                                <strong className="text-white/80">Google Play Services:</strong> Used for core infrastructure, updates, and libraries.
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-xl font-semibold text-white">2. Device Permissions</h2>
                    <p>To provide specific features, our Apps may request the following permissions:</p>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                            <h4 className="font-medium text-white mb-1">Location</h4>
                            <p className="text-sm text-zinc-400">Required for features dependant on geography (Prayer times, Qibla, etc.).</p>
                        </div>
                        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                            <h4 className="font-medium text-white mb-1">Notifications & Alarms</h4>
                            <p className="text-sm text-zinc-400">Used to schedule exact alarms for prayers, reminders, or tasks.</p>
                        </div>
                        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                            <h4 className="font-medium text-white mb-1">Storage / Photos</h4>
                            <p className="text-sm text-zinc-400">Requested only if you choose to save or share images/screenshots generated by the App.</p>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">3. Children’s Privacy</h2>
                    <p>
                        Our Apps do not knowingly collect personally identifiable information from children under 13 for marketing purposes. If user age is requested, it is strictly for internal app functionality (e.g. age calculation).
                    </p>
                    <p>
                        For Ad services, we implement checks where necessary to comply with applicable age-appropriate design codes (e.g. GDPR/COPPA) by utilizing Google's consent management tools.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">4. Data Security</h2>
                    <p>
                        We value your trust. Since our Apps function offline and store data locally, the security of your information is largely dependent on the security of your own device. We do not maintain a central database of user information to breach.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">5. Changes to This Policy</h2>
                    <p>
                        We may update our Privacy Policy from time to time. You are advised to review this page periodically for any changes.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">6. Contact Us</h2>
                    <p>
                        If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at:{" "}
                        <a href="mailto:getsoftwala@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                            getsoftwala@gmail.com
                        </a>
                    </p>
                </section>
            </div>
        </div>
    );
}
