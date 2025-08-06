import React from "react";
import { ServerCrash, Clock, Shield } from "lucide-react";

export default function PaymentInternalErrorPro() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Main Container */}
        <div className="bg-white shadow-sm border border-gray-200">
          {/* Status Bar */}
          <div className="h-1 bg-red-500"></div>

          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <ServerCrash className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Payment Processing Failed
                  </h1>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-md text-sm font-medium">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  CANCELLED
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  {new Date().toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-6">
            {/* Main Message */}
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-3">
                What happened?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Your flight booking payment could not be completed due to an
                internal server error. This is a technical issue on our end and
                does not reflect any problem with your payment method.
              </p>

              <div className="bg-orange-50 border border-orange-200 p-4 mb-4">
                <h3 className="font-medium text-orange-900 mb-2">
                  Important Information
                </h3>
                <ul className="text-sm text-orange-800 space-y-1">
                  <li>• No charges have been applied to your account</li>
                  <li>• Your payment information remains secure</li>
                  <li>• The flight booking was not created</li>
                </ul>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 mb-6">
                <Shield className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">
                    Security Notice
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    All payment data is encrypted and no sensitive information
                    was compromised during this error.
                  </p>
                </div>
              </div>
            </div>

            {/* Transaction Status */}
            <div className="border border-gray-200 p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-3">
                Transaction Status
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Payment</span>
                  <span className="font-medium text-red-600">Failed</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Booking</span>
                  <span className="font-medium text-gray-500">Not Created</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-medium text-green-600">
                    CVE 0.00 Charged
                  </span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900 mb-3">Next Steps</h3>
              <div className="space-y-2">
                <a
                  href="/Contact"
                  className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium py-2 px-4 transition-colors inline-block text-center no-underline"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
