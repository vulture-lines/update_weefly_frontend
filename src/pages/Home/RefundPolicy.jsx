import React from "react";

export default function ServiceDeliveryAndRefundPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center py-8 mb-8 border-b border-gray-300">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Service Delivery and Refund Policy
          </h1>
          <p className="text-lg text-black">Last Updated: July 29, 2025</p>
        </div>

        {/* Main Content */}
        <div className="bg-white">
          {/* Introduction */}
          <div className="border-l-4 border-black p-6 mb-8">
            <p className="text-lg mb-4 text-black leading-relaxed">
              Thank you for booking with Weefly. This policy outlines how our
              services are delivered and the terms that apply to cancellations,
              changes, and refunds.
            </p>
            <p className="text-black leading-relaxed">
              Our primary role is to act as a travel intermediary, facilitating
              your bookings with various third-party Service Providers.
              Therefore, our refund and cancellation policy is largely governed
              by the terms and conditions of these end providers.
            </p>
          </div>

          {/* General Principles */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-black">
              General Principles
            </h2>
            <div className="border border-black p-6">
              <ul className="space-y-4 text-black">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div>
                    <strong>Service Provider Policies:</strong> All
                    cancellations, changes, and refunds are subject to the
                    policies of the respective Service Provider. Weefly is bound
                    by these rules and cannot override them.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div>
                    <strong>Weefly Administrative Fees:</strong> For processing
                    any cancellations or modifications that are permitted by the
                    Service Provider, Weefly may charge a non-refundable
                    administrative fee. This fee is separate from any charges
                    levied by the Service Provider and covers the cost of our
                    assistance.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div>
                    <strong>Non-Refundable Fees:</strong> Any booking fees or
                    service charges applied by Weefly at the time of the
                    original booking are non-refundable.
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 1 - Flight Bookings */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-black">
              1. Flight Bookings
            </h2>

            <div className="space-y-6">
              {/* Service Delivery */}
              <div>
                <h3 className="text-lg font-semibold text-black mb-4">
                  a) Service Delivery:
                </h3>
                <div className="border border-black p-6">
                  <ul className="space-y-3 text-black">
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 bg-black rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                      <span>
                        Upon successful payment and confirmation from the
                        airline, your e-ticket and booking confirmation will be
                        delivered electronically to the email address you
                        provided during the booking process.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 bg-black rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                      <span>
                        Delivery is considered complete once this confirmation
                        email has been sent from our system. Please check your
                        spam or junk folder if you do not receive it in your
                        inbox.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Cancellations and Refunds */}
              <div>
                <h3 className="text-lg font-semibold text-black mb-4">
                  b) Cancellations and Refunds:
                </h3>
                <div className="space-y-4 text-black">
                  <div className="border border-black p-4">
                    <p className="font-semibold text-black mb-2">
                      Important Notice:
                    </p>
                    <p>
                      Your ability to cancel a flight and receive a refund is
                      entirely dependent on the <strong>fare rules</strong>{" "}
                      associated with your ticket. Many fares, especially
                      discounted or promotional ones, are{" "}
                      <strong>non-refundable</strong>.
                    </p>
                  </div>

                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 bg-black rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                      <span>
                        To request a cancellation, you must contact our customer
                        support team or use the Booking management section of
                        our Platform.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 bg-black rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                      <span>
                        If your ticket is refundable, the final refund amount
                        will be the amount returned by the airline,{" "}
                        <strong>less</strong> any applicable airline
                        cancellation penalties and our non-refundable
                        administrative fee.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 bg-black rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                      <span>
                        Refunds from airlines can take significant time to
                        process, ranging from a few weeks to several months. We
                        will process your refund as soon as we receive the funds
                        from the airline.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Changes and Modifications */}
              <div>
                <h3 className="text-lg font-semibold text-black mb-4">
                  c) Changes and Modifications:
                </h3>
                <div className="border border-black p-6">
                  <ul className="space-y-3 text-black">
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 bg-black rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                      <span>
                        Changes to your flight (e.g., date or time) are also
                        subject to the fare rules of your ticket.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 bg-black rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                      <span>
                        If changes are permitted, you will be responsible for
                        paying any airline change fees, any difference in the
                        new fare price, and our non-refundable administrative
                        fee.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 - How to Request */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4 pb-2 border-b-2 border-black">
              2. How to Request a Change or Refund
            </h2>

            <div className="border border-black p-6">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-2">
                      Contact Us:
                    </h3>
                    <p className="text-black">
                      To initiate any request for a change, cancellation, or
                      refund, please contact our customer support team via email
                      at <strong className="underline">info@weefly.cv</strong>{" "}
                      or through the appropriate section of our website.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-2">
                      Provide Details:
                    </h3>
                    <p className="text-black">
                      Please include your Weefly Booking Reference number, the
                      lead traveler's name, and a clear description of your
                      request.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-2">
                      Review Process:
                    </h3>
                    <p className="text-black">
                      We will review your request based on the relevant Service
                      Provider's policies and inform you of your options,
                      including any applicable fees and the potential refund
                      amount.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 border border-black">
                <p className="text-black font-semibold text-center">
                  Your request is not confirmed until you receive a confirmation
                  email from Weefly outlining the change or cancellation.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-8">
            <div className="border border-black p-6 text-center">
              <h3 className="text-lg font-semibold text-black mb-3">
                Need Help with Your Booking?
              </h3>
              <p className="text-black mb-4">
                Our customer support team is here to assist you with any
                questions about cancellations, changes, or refunds.
              </p>
              <a
                href="mailto:info@weefly.cv"
                className="inline-block bg-black text-white font-semibold py-3 px-6 border border-black hover:bg-white hover:text-black transition-colors duration-200"
              >
                Contact Support: info@weefly.cv
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
