import React from 'react';
import Link from 'next/link';

export default function AboutUsPage() {
    return (
        <div className="min-h-screen bg-secondary py-8 px-4">
            <div className="max-w-5xl mx-auto space-y-4">

                {/* Header Section */}
                <div className="bg-background rounded-md shadow-sm border border-border p-5 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-md mb-3 shadow-sm">
                        <svg className="w-6 h-6 text-background" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                    </div>
                    <h1 className="text-lg md:text-xl font-bold text-foreground mb-2 leading-snug">
                        About ChannelIncome: Your Free YouTube Earnings Calculator & Advanced Analytics Platform
                    </h1>
                    <p className="text-xs text-muted leading-relaxed">
                        ChannelIncome empowers YouTube creators with precise revenue forecasts, comprehensive channel metrics, and strategic growth insights through our YouTube income calculator.
                    </p>
                </div>

                {/* Mission & Vision Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-background rounded-md shadow-sm border border-border p-4">
                        <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center mb-3">
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="text-sm font-bold text-foreground mb-2">Our Mission: Democratizing Creator Analytics</h2>
                        <p className="text-xs text-muted leading-relaxed mb-2">
                            To democratize access to YouTube analytics and earnings data, helping creators of all sizes make informed decisions about their channel growth, content strategy, and monetization optimization through our YouTube money calculator.
                        </p>
                        <p className="text-xs text-muted leading-relaxed">
                            We believe every creator deserves transparent insights into their potential YouTube earnings and revenue projections, regardless of their channel size or experience level.
                        </p>
                    </div>

                    <div className="bg-background rounded-md shadow-sm border border-border p-4">
                        <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center mb-3">
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h2 className="text-sm font-bold text-foreground mb-2">Our Vision: Driving Sustainable Creator Success</h2>
                        <p className="text-xs text-muted leading-relaxed mb-2">
                            To become the most trusted platform for YouTube creators worldwide, providing comprehensive analytics that drive real channel growth and sustainable revenue. This includes tracking vital metrics like engagement rates and monetization readiness through our YouTube revenue checker.
                        </p>
                        <p className="text-xs text-muted leading-relaxed">
                            We envision a creator economy where data-driven decisions, supported by ChannelIncome's YouTube earnings estimator, lead to more successful and profitable channels across all content niches.
                        </p>
                    </div>
                </div>

                {/* Our Story Section */}
                <div className="bg-background rounded-md shadow-sm border border-border p-5">
                    <h2 className="text-base font-bold text-foreground mb-3 text-center border-l-2 border-primary pl-3">
                        The ChannelIncome Story: Building the Ultimate YouTube Income Estimator
                    </h2>
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                        From Creator Frustration to Revolutionary Analytics Solution
                    </h3>

                    <div className="text-xs text-muted leading-relaxed space-y-3">
                        <p>
                            ChannelIncome was born when its founder, a YouTube enthusiast and developer, grew frustrated with the lack of accurate YouTube earnings calculators and transparent revenue estimation tools available in the market.
                        </p>
                        <p>
                            After struggling to find reliable data about potential YouTube income and watching fellow creators make important decisions based on incomplete information, the decision was made to build a comprehensive YouTube money estimator that offers deep channel analysis instantly.
                        </p>
                        <p>
                            What started as a personal project is now evolving into a comprehensive YouTube growth platform. Our goal is to serve thousands of creators with the most accurate YouTube revenue calculator and provide them with data-driven insights to help them grow and master <Link href="/guide" className="text-primary font-semibold underline hover:no-underline">YouTube optimization with our expert guides</Link>.
                        </p>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="bg-background rounded-md shadow-sm border border-border p-5">
                    <h2 className="text-base font-bold text-foreground mb-4 text-center">
                        Why Choose ChannelIncome for Your YouTube Revenue Analysis?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="text-center p-3 bg-secondary rounded-md">
                            <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center mx-auto mb-2">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xs font-bold text-foreground mb-1">Advanced YouTube Income Calculator</h3>
                            <p className="text-xs text-muted leading-relaxed">
                                Our algorithms are constantly refined with real market data to provide the most reliable YouTube earnings estimates, channel performance metrics, and revenue forecasting available.
                            </p>
                        </div>
                        <div className="text-center p-3 bg-secondary rounded-md">
                            <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center mx-auto mb-2">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xs font-bold text-foreground mb-1">Secure & Privacy-Focused</h3>
                            <p className="text-xs text-muted leading-relaxed">
                                We never store your YouTube channel data permanently and adhere to strict privacy standards. Our YouTube revenue checker only analyzes publicly available metrics.
                            </p>
                        </div>
                        <div className="text-center p-3 bg-secondary rounded-md">
                            <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center mx-auto mb-2">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xs font-bold text-foreground mb-1">Completely Free YouTube Tools</h3>
                            <p className="text-xs text-muted leading-relaxed">
                                Access all our advanced analytics, YouTube earnings calculator, and <Link href="/guide" className="text-primary font-semibold underline hover:no-underline">YouTube Growth Strategies</Link> without any cost. Empowering creators is our priority.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-background rounded-md shadow-sm border border-border p-5 text-center">
                    <h2 className="text-base font-bold text-foreground mb-2">Ready to Calculate Your YouTube Earnings?</h2>
                    <p className="text-xs text-muted mb-4 max-w-lg mx-auto leading-relaxed">
                        Use ChannelIncome's free YouTube income calculator to optimize your content strategy, track revenue potential, and achieve your financial goals with accurate earnings projections.
                    </p>
                    <Link
                        href="/tool/youtube-revenue-calculator"
                        className="inline-flex items-center px-4 py-2.5 bg-primary hover:bg-primary-hover text-background text-sm font-medium rounded-md transition-colors shadow-sm active:scale-95"
                    >
                        Start Your Free YouTube Revenue Analysis
                        <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>

            </div>
        </div>
    );
}