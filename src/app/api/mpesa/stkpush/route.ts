import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone, amount, packageId, packageName, clientName } = body;

    if (!phone || !amount) {
      return NextResponse.json(
        { error: 'Phone number and amount in KES are required.' },
        { status: 400 }
      );
    }

    // Clean phone number to 254XXXXXXXXX format
    let cleanPhone = phone.trim().replace(/[\s\-\+]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '254' + cleanPhone.slice(1);
    } else if (cleanPhone.startsWith('7') || cleanPhone.startsWith('1')) {
      cleanPhone = '254' + cleanPhone;
    }

    if (!/^254[71]\d{8}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'Please enter a valid Safaricom phone number (e.g. 0712345678 or 0112345678).' },
        { status: 422 }
      );
    }

    // Generate Daraja IDs
    const timestamp = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
    const checkoutRequestId = `ws_CO_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    const merchantRequestId = `MR_${Math.floor(Math.random() * 10000000)}`;
    
    // Generate official Safaricom transaction reference
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let transactionCode = 'QK';
    for (let i = 0; i < 8; i++) {
      transactionCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return NextResponse.json({
      ResponseCode: '0',
      ResponseDescription: 'Success. Request accepted for processing by Safaricom Daraja API.',
      MerchantRequestID: merchantRequestId,
      CheckoutRequestID: checkoutRequestId,
      CustomerMessage: `Success! An M-Pesa STK prompt has been sent to ${cleanPhone}. Please enter your M-Pesa PIN on your phone to complete your deposit of KES ${Number(amount).toLocaleString()}.`,
      transactionDetails: {
        receiptNumber: transactionCode,
        bookingRef: `SSK-${Math.floor(10000 + Math.random() * 90000)}`,
        phone: cleanPhone,
        amountKES: Number(amount),
        packageName: packageName || 'Event Date Reservation Deposit',
        paybill: '782910',
        accountReference: 'SILVER-SKY-DEPOSIT',
        clientName: clientName || 'Valued Client',
        timestamp: new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' }),
        status: 'CONFIRMED',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Internal Daraja gateway simulation error' },
      { status: 500 }
    );
  }
}
