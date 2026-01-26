import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms and Conditions | Softwala",
    description: "Terms and Conditions for Softwala mobile applications.",
};

export default function TermsConditions() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <header className="border-b border-zinc-800 pb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Terms and Conditions</h1>
                    <p className="mt-2 text-sm text-zinc-500">Effective Date: 2026-01-26</p>
                </header>

                <section className="space-y-4">
                    <p>
                        By downloading or using our Apps, these terms will automatically apply to you.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">1. License</h2>
                    <p>
                        Softwala is committed to ensuring that the app is as useful and efficient as possible. We reserve the right to make changes to the app or to charge for its services, at any time and for any reason.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">2. Intellectual Property</h2>
                    <p>
                        The app itself, and all the trade marks, copyright, database rights, and other intellectual property rights related to it, still belong to Softwala.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">3. User Data</h2>
                    <p>
                        The app stores and processes personal data that you have provided to us, to provide our Service. It is your responsibility to keep your phone and access to the app secure.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">4. Third-Party Services</h2>
                    <p>
                        The app does use third-party services that declare their own Terms and Conditions (e.g., Google AdMob, Google Play Services).
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">5. Limitation of Liability</h2>
                    <p>
                        Softwala accepts no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">6. Updates</h2>
                    <p>
                        At some point, we may wish to update the app. The app is currently available on Android/iOS – the requirements for the system(s) (and for any additional systems we decide to extend the availability of the app to) may change, and you’ll need to download the updates if you want to keep using the app.
                    </p>
                </section>
            </div>
        </div>
    );
}
