import React, { useState } from 'react';
import { CartItem } from '../types';
import { CreditCard, QrCode, ShieldCheck, CheckCircle2, ArrowRight, Lock } from 'lucide-react';

interface CheckoutPageProps {
  cartItems: CartItem[];
  onCompleteOrder: () => void;
  onGoToLibrary: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cartItems,
  onCompleteOrder,
  onGoToLibrary,
}) => {
  const [email, setEmail] = useState('user@example.com');
  const [paymentMethod, setPaymentMethod] = useState<'promptpay' | 'card' | 'qr'>('promptpay');
  const [isPaid, setIsPaid] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.book.price * item.quantity, 0);
  const discount = subtotal > 400 ? 50 : 0;
  const total = Math.max(0, subtotal - discount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaid(true);
    onCompleteOrder();
  };

  if (isPaid) {
    return (
      <div className="py-16 max-w-xl mx-auto px-4 text-center space-y-6 animate-in zoom-in-95 duration-300">
        <div className="w-24 h-24 rounded-full bg-emerald-50 text-emerald-500 mx-auto flex items-center justify-center shadow-xl shadow-emerald-500/10">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900">Your books are ready!</h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Payment confirmed. We've delivered your purchased ebooks to <strong className="text-slate-800">{email}</strong> and added them to your digital library.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-2xs text-left text-xs space-y-3">
          <div className="flex justify-between font-bold text-slate-900 border-b border-slate-100 pb-2">
            <span>Transaction Receipt</span>
            <span className="text-[#8B6FD8]">#BK-2026-9941</span>
          </div>
          <div className="space-y-1.5 text-slate-600">
            <div className="flex justify-between">
              <span>Date:</span>
              <span>2026-08-21 02:28</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Method:</span>
              <span className="capitalize">{paymentMethod}</span>
            </div>
            <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-100">
              <span>Total Paid:</span>
              <span className="text-[#8B6FD8]">฿{total}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onGoToLibrary}
          className="w-full py-4 px-6 rounded-2xl bg-[#8B6FD8] text-white font-bold text-sm hover:bg-[#795BC7] transition-all shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
        >
          Go to Library & Start Reading
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
      
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Checkout</h1>
        <p className="text-xs text-slate-500">Complete your order to access your ebooks instantly</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-2xs space-y-6">
          
          {/* Section 1: Contact */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-purple-100 text-[#8B6FD8] text-xs flex items-center justify-center font-extrabold">1</span>
              <span>Contact Information</span>
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address for book delivery"
              className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#8B6FD8]/30 focus:border-[#8B6FD8]"
            />
          </div>

          {/* Section 2: Payment Options */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-purple-100 text-[#8B6FD8] text-xs flex items-center justify-center font-extrabold">2</span>
              <span>Select Payment Method</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('promptpay')}
                className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'promptpay'
                    ? 'border-[#8B6FD8] bg-purple-50 text-[#8B6FD8] shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <QrCode className="w-5 h-5 text-[#8B6FD8]" />
                PromptPay
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#8B6FD8] bg-purple-50 text-[#8B6FD8] shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                Credit Card
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('qr')}
                className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'qr'
                    ? 'border-[#8B6FD8] bg-purple-50 text-[#8B6FD8] shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <QrCode className="w-5 h-5 text-emerald-600" />
                Scan QR
              </button>
            </div>

            {/* Simulated Payment Details Graphic */}
            <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100 flex items-center gap-4">
              <div className="w-16 h-16 bg-white p-2 rounded-xl border border-purple-200 flex items-center justify-center shrink-0">
                <QrCode className="w-10 h-10 text-slate-800" />
              </div>
              <div className="text-xs space-y-0.5">
                <span className="font-bold text-slate-900 block">PromptPay Instant Transfer</span>
                <p className="text-slate-500">Scan QR code using any bank application. Instant order approval.</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-[#8B6FD8] text-white font-bold text-base hover:bg-[#795BC7] transition-all shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            Pay ฿{total}
          </button>
        </form>

        {/* Right Order Summary */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs space-y-6">
          <h3 className="font-bold text-slate-900 text-base">Order Summary</h3>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {cartItems.map(({ book, quantity }) => (
              <div key={book.id} className="flex gap-3 items-center">
                <img src={book.cover} alt={book.title} className="w-12 h-16 object-cover rounded-lg shadow-2xs" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 text-xs truncate">{book.title}</h4>
                  <p className="text-[11px] text-slate-400">{book.author}</p>
                </div>
                <span className="text-xs font-bold text-slate-900">
                  ฿{book.price * quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-slate-800">฿{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount</span>
                <span>-฿{discount}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-100">
              <span>Total</span>
              <span className="text-[#8B6FD8]">฿{total}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 text-[11px] text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>256-bit Encrypted Security & 30-day Money Back Guarantee</span>
          </div>
        </div>

      </div>

    </div>
  );
};
