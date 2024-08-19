import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from '@prisma/client/runtime/library'


export const checkServerErrorType = (
  error: unknown,
  message?: string
): NextResponse<{
  message: string;
}> => {
  if (
    error instanceof PrismaClientKnownRequestError ||
    error instanceof PrismaClientUnknownRequestError
  ) {
    console.log("Server error " + message, error);
    return NextResponse.json(
      { message: message || "Couldn't find an item" },
      { status: 404 }
    );
  }

  if (error instanceof PrismaClientUnknownRequestError) {
    console.log("Unknown request", error);
    return NextResponse.json(
      { message: "Unknown request\n" + error.message },
      { status: 500 }
    );
  }

  if (error instanceof Stripe.errors.StripeError) {
    console.log("Stripe error", error);
    return NextResponse.json(
      { message: "Stripe error\n" + error.message },
      { status: 500 }
    );
  }

  console.log("Unknown server error", error);
  return NextResponse.json(
    { message: "Unknown server error" },
    { status: 500 }
  );
};
