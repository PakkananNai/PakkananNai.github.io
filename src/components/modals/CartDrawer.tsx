import React, { useState } from 'react';
import { CartItem } from '../../types';
import { X, Trash2, ShoppingBag, CreditCard, QrCode, CheckCircle2, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (bookId: string) => void;
  onClearCart: () => void;
  onStartReading: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
  onStartReading,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'promptpay' | 'qr'>('promptpay');
  const [email, setEmail] = useState('user@example.com');

  const subtotal = items.reduce((acc, item) => acc + item.book.price * item.quantity, 0);
  const discount = subtotal > 400 ? 50 : 0;
  const total = Math.max(0, subtotal - discount);

  const handleCheckoutSuccess = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200 flex justify-end">
      
      {/* Backdrop Click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-purple-100/80 flex items-center justify-between bg-purple-50/40">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#8B6FD8]" />
            <h3 className="font-bold text-slate-900 text-base">
              {step === 'cart' && 'Your Cart'}
              {step === 'checkout' && 'Checkout'}
              {step === 'success' && 'Order Confirmed!'}
            </h3>
            {step === 'cart' && (
              <span className="px-2 py-0.5 rounded-full bg-purple-100 text-[#8B6FD8] text-xs font-extrabold">
                {items.length}
              </span>
            )}
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-6">
          
          {/* STEP 1: CART LIST */}
          {step === 'cart' && (
            <>
              {items.length > 0 ? (
                <div className="space-y-4">
                  {items.map(({ book, quantity }) => (
                    <div
                      key={book.id}
                      className="flex gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100/80 items-center justify-between"
                    >
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-14 h-18 object-cover rounded-xl shadow-2xs"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 text-xs line-clamp-1">
                          {book.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                          {book.author}
                        </p>
                        <div className="mt-1.5 flex items-center justify-between">
                          <span className="text-xs font-extrabold text-slate-900">
                            {book.price === 0 ? 'FREE' : `฿${book.price}`}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            Qty: {quantity}
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => onRemoveItem(book.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                        title="Remove book"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-purple-50 text-[#8B6FD8] mx-auto flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-base">Your cart is empty</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Explore our collection and add your favorite ebooks to start reading!
                  </p>
                </div>
              )}
            </>
          )}

          {/* STEP 2: CHECKOUT */}
          {step === 'checkout' && (
            <form onSubmit={handleCheckoutSuccess} className="space-y-6">
              
              {/* Contact Information */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Contact Information
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#8B6FD8]/30 focus:border-[#8B6FD8]"
                />
                <span className="text-[10px] text-slate-400 block">Ebooks will be delivered directly to this account.</span>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('promptpay')}
                    className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'promptpay'
                        ? 'border-[#8B6FD8] bg-purple-50 text-[#8B6FD8] shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    PromptPay
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#8B6FD8] bg-purple-50 text-[#8B6FD8] shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    Card
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('qr')}
                    className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'qr'
                        ? 'border-[#8B6FD8] bg-purple-50 text-[#8B6FD8] shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-emerald-600" />
                    QR Scan
                  </button>
                </div>
              </div>

              {/* Order Summary Mini List */}
              <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs space-y-2">
                <span className="font-bold text-slate-800 block">Selected Items</span>
                {items.map((item) => (
                  <div key={item.book.id} className="flex justify-between text-slate-600">
                    <span className="truncate max-w-[200px]">{item.book.title}</span>
                    <span className="font-bold">฿{item.book.price}</span>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#8B6FD8] text-white font-bold text-sm hover:bg-[#795BC7] transition-all shadow-md shadow-purple-500/20"
              >
                Pay ฿{total}
              </button>
            </form>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 'success' && (
            <div className="text-center py-10 space-y-5 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-slate-900">Your books are ready!</h4>
                <p className="text-xs text-slate-500 mt-1.5 max-w-xs mx-auto">
                  Thank you for your purchase. Your ebooks have been added to your library and are ready to read online.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left text-xs space-y-1">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Order Reference:</span>
                  <span className="text-[#8B6FD8]">#BK-2026-8891</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Delivered to:</span>
                  <span>{email}</span>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <button
                  onClick={() => {
                    onClose();
                    setStep('cart');
                    onStartReading();
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#8B6FD8] text-white font-bold text-sm hover:bg-[#795BC7] transition-all shadow-md flex items-center justify-center gap-2"
                >
                  Go to Library & Read
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Order Summary (Only shown on Cart step) */}
        {step === 'cart' && items.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-slate-50/60 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-800">฿{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Pastel Reader Discount</span>
                  <span className="font-bold">-฿{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total</span>
                <span className="text-[#8B6FD8] text-base">฿{total}</span>
              </div>
            </div>

            <button
              onClick={() => setStep('checkout')}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#8B6FD8] text-white font-bold text-sm hover:bg-[#795BC7] transition-all shadow-md shadow-purple-500/20 flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
