'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Smartphone, 
  RefreshCw, 
  Download, 
  Sparkles, 
  AlertCircle,
  Clock,
  Printer,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MpesaDepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageName?: string;
  initialAmount?: number;
}

const PRESET_AMOUNTS = [
  { label: 'Date Hold Deposit', amount: 100000, desc: 'Locks calendar date for 48 hours' },
  { label: 'Sapphire Intimate (40%)', amount: 192000, desc: 'Package starting deposit' },
  { label: 'Executive Summit (40%)', amount: 260000, desc: 'Corporate summit deposit' },
  { label: 'Royal Opulence (40%)', amount: 540000, desc: 'Most popular wedding deposit' },
  { label: 'Annual Gala (40%)', amount: 640000, desc: 'Gala production deposit' },
];

export default function MpesaDepositModal({
  isOpen,
  onClose,
  initialPackageName,
  initialAmount,
}: MpesaDepositModalProps) {
  const [phone, setPhone] = useState('0712345678');
  const [clientName, setClientName] = useState('');
  const [packageName, setPackageName] = useState(initialPackageName || 'Royal Opulence Wedding (40% Deposit)');
  const [amount, setAmount] = useState<number>(initialAmount || 540000);
  const [customAmount, setCustomAmount] = useState<string>('');
  
  // Stages: 'input' | 'stk_prompt' | 'processing' | 'success'
  const [stage, setStage] = useState<'input' | 'stk_prompt' | 'processing' | 'success'>('input');
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [simulatedPin, setSimulatedPin] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [receiptData, setReceiptData] = useState<any>(null);

  // Sync props when opened
  useEffect(() => {
    if (initialPackageName) setPackageName(initialPackageName);
    if (initialAmount) setAmount(initialAmount);
    setStage('input');
    setErrorMessage(null);
    setSimulatedPin('');
  }, [isOpen, initialPackageName, initialAmount]);

  // STK countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (stage === 'stk_prompt' && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (stage === 'stk_prompt' && timerSeconds === 0) {
      setErrorMessage('STK Prompt timed out. Please try again.');
      setStage('input');
    }
    return () => clearInterval(interval);
  }, [stage, timerSeconds]);

  const handleInitiateSTK = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const finalAmount = customAmount ? Number(customAmount) : amount;
    if (!finalAmount || finalAmount < 1000) {
      setErrorMessage('Please enter a valid deposit amount (min KES 1,000).');
      return;
    }

    setStage('processing');

    try {
      const res = await fetch('/api/mpesa/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          amount: finalAmount,
          packageName,
          clientName: clientName || 'Valued Client',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || 'Failed to initiate M-Pesa STK push.');
        setStage('input');
        return;
      }

      setReceiptData(data.transactionDetails);
      setTimerSeconds(30);
      setStage('stk_prompt');
    } catch (err) {
      setErrorMessage('Network connection error connecting to Safaricom Daraja API.');
      setStage('input');
    }
  };

  const handleConfirmPin = () => {
    setStage('processing');
    setTimeout(() => {
      setStage('success');
      // Confetti burst for luxury celebration!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#2563eb', '#10b981', '#fbbf24'],
      });
    }, 1800);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl max-h-[92vh] flex flex-col rounded-2xl glass-sapphire border border-emerald-500/30 shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Safaricom Daraja Banner */}
        <div className="p-5 border-b border-slate-800 bg-[#060e28] flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Safaricom M-Pesa Badge */}
            <div className="px-2.5 py-1 rounded bg-[#009b3a] text-white font-black text-xs tracking-tight shadow">
              M-PESA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-luxury text-lg font-bold text-white">
                  Daraja API Deposit Gateway
                </h3>
                <span className="px-2 py-0.2 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Instant STK
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Paybill <strong>782910</strong> • Silver Sky Events Ltd
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Depends on Stage */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* STAGE 1: INPUT DETAILS */}
          {stage === 'input' && (
            <form onSubmit={handleInitiateSTK} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Client Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Client / Host Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Mutua"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* Safaricom Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                  <span>Safaricom M-Pesa Phone Number</span>
                  <span className="text-[10px] text-emerald-400 font-mono">07XX / 01XX / 254...</span>
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="0712 345 678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs sm:text-sm font-mono text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  You will receive an instant prompt on this phone to enter your M-Pesa PIN.
                </p>
              </div>

              {/* Package Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Deposit Target & Event Package
                </label>
                <input
                  type="text"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* Preset Deposit Amounts */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Select Deposit Amount (KES)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PRESET_AMOUNTS.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setAmount(item.amount);
                        setCustomAmount('');
                      }}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                        amount === item.amount && !customAmount
                          ? 'bg-emerald-950/70 border-emerald-400 text-emerald-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="font-bold text-white">KES {item.amount.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-400 truncate">{item.label}</div>
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <input
                    type="number"
                    placeholder="Or enter custom amount in KES..."
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      if (e.target.value) setAmount(Number(e.target.value));
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>
              </div>

              {/* Security notice */}
              <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/20 text-[11px] text-slate-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Protected by Safaricom Daraja 256-bit encryption. Funds held in Silver Sky escrow.</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>Trigger M-Pesa STK Push (KES {(customAmount ? Number(customAmount) : amount).toLocaleString()})</span>
              </button>
            </form>
          )}

          {/* STAGE 2: STK PUSH PROMPT SIMULATOR */}
          {stage === 'stk_prompt' && (
            <div className="space-y-6 text-center py-2 animate-fadeIn">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5 animate-spin" />
                  <span>Prompt sent to {phone} ({timerSeconds}s remaining)</span>
                </div>
                <h4 className="font-serif-luxury text-xl font-bold text-white pt-2">
                  Check Your Phone for the M-Pesa Prompt
                </h4>
                <p className="text-xs text-slate-400">
                  A USSD notification has been dispatched by Safaricom Daraja API.
                </p>
              </div>

              {/* Realistic Safaricom Phone Screen Mockup */}
              <div className="max-w-xs mx-auto p-5 rounded-2xl bg-slate-900 border-2 border-emerald-500 shadow-2xl space-y-4 text-left">
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
                  <span className="font-bold text-emerald-400">SAFARICOM M-PESA</span>
                  <span>SIM 1</span>
                </div>

                <div className="text-xs text-slate-200 space-y-1">
                  <p className="font-semibold text-white">Do you want to pay KES {amount.toLocaleString()}?</p>
                  <p className="text-[11px] text-slate-300">To: <strong>Silver Sky Events Ltd</strong></p>
                  <p className="text-[11px] text-slate-300">Paybill: <strong>782910</strong></p>
                  <p className="text-[11px] text-slate-300">Account: <strong>SILVER-SKY-DEPOSIT</strong></p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="block text-[11px] font-bold text-emerald-400">
                    Enter M-Pesa PIN:
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    placeholder="••••"
                    value={simulatedPin}
                    onChange={(e) => setSimulatedPin(e.target.value)}
                    className="w-full text-center tracking-widest text-lg py-2 rounded-lg bg-black border border-emerald-500/60 font-mono text-emerald-300 focus:outline-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStage('input')}
                    className="w-1/2 py-2 rounded-lg bg-slate-800 text-slate-400 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmPin}
                    className="w-1/2 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow"
                  >
                    Send PIN
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-400">
                <span>Demo mode: Enter any 4-digit PIN (e.g. 1234) to confirm the deposit.</span>
              </div>
            </div>
          )}

          {/* STAGE 3: PROCESSING SPINNER */}
          {stage === 'processing' && (
            <div className="py-16 text-center space-y-4">
              <RefreshCw className="w-12 h-12 text-emerald-400 animate-spin mx-auto" />
              <div className="space-y-1">
                <h4 className="font-serif-luxury text-xl font-bold text-white">
                  Verifying with Safaricom Daraja...
                </h4>
                <p className="text-xs text-slate-400">
                  Validating payment confirmation and generating calendar booking reference.
                </p>
              </div>
            </div>
          )}

          {/* STAGE 4: SUCCESS CONFIRMATION & RECEIPT */}
          {stage === 'success' && receiptData && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif-luxury text-2xl font-bold text-white">
                  Deposit Successfully Confirmed!
                </h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Your event date has been locked on the master production calendar. An SMS and email confirmation have been dispatched.
                </p>
              </div>

              {/* Official Receipt Card */}
              <div className="p-5 rounded-xl bg-slate-950/90 border border-emerald-500/40 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <div className="font-bold text-white text-sm">SILVER SKY EVENTS LTD</div>
                    <div className="text-[10px] text-slate-400">Daraja M-Pesa Official Receipt</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-500/40">
                    PAID / CONFIRMED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-slate-300">
                  <div>
                    <span className="text-[10px] text-slate-500 block">RECEIPT NUMBER</span>
                    <strong className="text-white text-xs">{receiptData.receiptNumber}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">BOOKING REFERENCE</span>
                    <strong className="text-amber-300 text-xs">{receiptData.bookingRef}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">AMOUNT PAID</span>
                    <strong className="text-emerald-400 text-sm">KES {receiptData.amountKES.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">PHONE NUMBER</span>
                    <strong className="text-white text-xs">{receiptData.phone}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">PAYBILL / ACCOUNT</span>
                    <strong className="text-white text-xs">782910 / SILVER-SKY</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">TIMESTAMP</span>
                    <strong className="text-white text-[11px]">{receiptData.timestamp}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                  Event: {receiptData.packageName} • Client: {receiptData.clientName}
                </div>
              </div>

              {/* Action Buttons for Receipt */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handlePrintReceipt}
                  className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                >
                  <Printer className="w-4 h-4 text-slate-300" />
                  <span>Print Receipt</span>
                </button>

                <a
                  href={`https://wa.me/254700123456?text=${encodeURIComponent(
                    `Hello Silver Sky Events! I have successfully paid my deposit of KES ${receiptData.amountKES.toLocaleString()} via M-Pesa. Receipt: ${receiptData.receiptNumber}, Booking Ref: ${receiptData.bookingRef}. Please share the contract agreement.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Notify Concierge via WhatsApp</span>
                </a>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#060e28] flex items-center justify-between text-[11px] text-slate-400">
          <span>Safaricom Daraja API Integrated</span>
          <button
            onClick={onClose}
            className="text-xs text-slate-300 hover:text-white underline cursor-pointer"
          >
            {stage === 'success' ? 'Done & Return' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
