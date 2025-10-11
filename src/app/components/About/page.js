import React from 'react'
import Link from 'next/link'

export default function page() {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-white to-red-50 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Header Section */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full mb-4 md:mb-6 shadow-lg">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About YouTube Channel Revenue Estimator
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering YouTube creators with accurate revenue insights and data-driven growth strategies.
            </p>
          </div>

          {/* Mission & Vision Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                To democratize access to YouTube analytics and revenue data, helping creators of all sizes make informed decisions about their channel growth and monetization strategies.
              </p>
              <p className="text-gray-700">
                We believe every creator deserves transparent insights into their earning potential, regardless of their channel size or experience level.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 mb-4">
                To become the most trusted platform for YouTube creators worldwide, providing comprehensive analytics that drive real channel growth and sustainable revenue.
              </p>
              <p className="text-gray-700">
                We envision a creator economy where data-driven decisions lead to more successful and profitable YouTube channels across all niches.
              </p>
            </div>
          </div>

          {/* Our Story Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
           <h3 className="text-xl font-semibold text-gray-800 mb-4">
  From Creator Frustration to Innovative Solution
</h3>

            <p className="text-gray-700 mb-4">
  YouTube Channel Revenue Estimator was born when it&apos;s founder, a YouTube enthusiast and developer, grew frustrated with the lack of transparent revenue estimation tools available in the market.
</p>
            <p className="text-gray-700 mb-4">
              After struggling to find accurate data about potential earnings and watching fellow creators make important decisions based on incomplete information, the decision was made to build a better solution.
            </p>
            <p className="text-gray-700">
              What started as a personal project is now evolving into a comprehensive YouTube revenue estimation platform. Our goal is to serve thousands of creators and provide them with the most accurate, data-driven insights possible to help them grow.
            </p>
          </div>

          {/* From the Founder Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">From the Founder</h2>
            <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-orange-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-3xl">
                ZI
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Zain Ikram</h3>
              <p className="text-red-600 font-medium mb-4">Founder & Developer</p>
            <p className="text-gray-600 text-sm">
  &quot;As the sole creator behind YouTube Channel Revenue Estimator, I am passionate about empowering content creators with the data they need to succeed. As a developer and YouTube enthusiast, I built this platform to offer the transparency and accuracy I felt was missing from other tools. My commitment is to continuously improve this platform to help every creator understand their channel&apos;s true potential.&quot;
</p>

            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose YouTube Channel Revenue Estimator?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Commitment to Accuracy</h3>
                <p className="text-gray-600 text-sm">
                  Our algorithms are constantly refined with real market data to provide the most reliable YouTube revenue estimates available.
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Privacy First</h3>
                <p className="text-gray-600 text-sm">
                  We never store your YouTube channel data permanently and adhere to strict privacy standards to protect your information.
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Completely Free</h3>
                <p className="text-gray-600 text-sm">
                  Access all our YouTube revenue estimation features without any cost. We believe in empowering creators, not charging them.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ready to Analyze Your YouTube Channel?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of successful creators who use YouTube Channel Revenue Estimator to make data-driven decisions about their YouTube strategy and monetization.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
            >
              Try Our Revenue Calculator
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}