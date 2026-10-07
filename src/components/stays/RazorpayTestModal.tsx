import React, { useState } from 'react';
import { ShieldCheck, CreditCard, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface RazorpayTestModalProps {
  orderId: string;
  amount: number;
  propertyName: string;
  roomName: string;
  onSuccess: (paymentDetails: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  onClose: () => void;
}

export const RazorpayTestModal: React.FC<RazorpayTestModalProps> = ({
  orderId,
  amount,
  propertyName,
  roomName,
  onSuccess,
  onClose,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorSimulated, setErrorSimulated] = useState(false);

  const handleSimulatePayment = (shouldSucceed: boolean) => {
    setIsProcessing(true);
    setErrorSimulated(false);

    setTimeout(() => {
      setIsProcessing(false);
      if (shouldSucceed) {
        const paymentId = `pay_test_${Date.now()}`;
        const signature = `test_sig_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
        onSuccess({
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: signature,
        });
      } else {
        setErrorSimulated(true);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Test Mode Banner */}
        <div className="bg-amber-500 text-white px-4 py-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <AlertTriangle size={14} />
            <span>Razorpay Test Mode — Zero Real Charges</span>
          </div>
          <span className="bg-amber-700/60 px-1.5 py-0.5 rounded text-[10px]">Staging Sandbox</span>
        </div>

        {/* Modal Header */}
        <div className="p-6 border-b border-stone-100 bg-[#FBF9F5]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#B85D28] font-bold">Checkout</p>
              <h3 className="text-lg font-serif font-bold text-stone-900">{propertyName}</h3>
              <p className="text-xs text-stone-500">{roomName}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-serif font-bold text-[#163E2E]">₹{amount.toLocaleString('en-IN')}</span>
              <p className="text-[10px] text-stone-400">Order: {orderId.slice(-8)}</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setSelectedMethod('upi')}
              className={`p-2.5 rounded-lg border text-center text-xs font-medium transition-all ${
                selectedMethod === 'upi'
                  ? 'border-[#163E2E] bg-[#163E2E]/5 text-[#163E2E] font-bold ring-1 ring-[#163E2E]'
                  : 'border-stone-200 text-stone-600 hover:border-stone-300'
              }`}
            >
              UPI / QR
            </button>
            <button
              onClick={() => setSelectedMethod('card')}
              className={`p-2.5 rounded-lg border text-center text-xs font-medium transition-all ${
                selectedMethod === 'card'
                  ? 'border-[#163E2E] bg-[#163E2E]/5 text-[#163E2E] font-bold ring-1 ring-[#163E2E]'
                  : 'border-stone-200 text-stone-600 hover:border-stone-300'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setSelectedMethod('netbanking')}
              className={`p-2.5 rounded-lg border text-center text-xs font-medium transition-all ${
                selectedMethod === 'netbanking'
                  ? 'border-[#163E2E] bg-[#163E2E]/5 text-[#163E2E] font-bold ring-1 ring-[#163E2E]'
                  : 'border-stone-200 text-stone-600 hover:border-stone-300'
              }`}
            >
              NetBanking
            </button>
          </div>

          <div className="bg-stone-50 rounded-lg p-3 text-xs text-stone-600 border border-stone-100 space-y-1">
            <div className="flex items-center gap-1.5 font-medium text-stone-800">
              <ShieldCheck size={14} className="text-[#163E2E]" />
              <span>Test Credentials Auto-filled</span>
            </div>
            {selectedMethod === 'upi' && <p>Simulating UPI ID: <code className="bg-white px-1 py-0.5 rounded border border-stone-200">guest@okhdfcbank</code></p>}
            {selectedMethod === 'card' && <p>Simulating Test Card: <code className="bg-white px-1 py-0.5 rounded border border-stone-200">4111 •••• •••• 1111</code> (Expires 12/28)</p>}
            {selectedMethod === 'netbanking' && <p>Simulating Bank: <code className="bg-white px-1 py-0.5 rounded border border-stone-200">State Bank of India (Sandbox)</code></p>}
          </div>

          {errorSimulated && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
              <AlertTriangle size={16} className="shrink-0" />
              <span>Simulated Payment Failure: Bank transaction declined. Temporary hold preserved.</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              disabled={isProcessing}
              onClick={() => handleSimulatePayment(true)}
              className="w-full py-3 bg-[#163E2E] hover:bg-[#0F2E22] text-white font-medium text-sm rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Simulating Razorpay Gateway...</span>
              ) : (
                <>
                  <CheckCircle size={16} />
                  <span>Simulate Successful Payment (₹{amount})</span>
                </>
              )}
            </button>

            <button
              disabled={isProcessing}
              onClick={() => handleSimulatePayment(false)}
              className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <XCircle size={14} className="text-red-500" />
              <span>Simulate Payment Failure (Test Rollback)</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
          <span>Uttarkunth Stays Staging Environment</span>
          <button onClick={onClose} className="hover:text-stone-700 text-xs font-semibold">Cancel</button>
        </div>
      </div>
    </div>
  );
};
