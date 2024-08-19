import React from 'react'


interface Props {
  orderId: number;
  totalPrice: number;
  paymentUrl: string;
}

export const NewOrder: React.FC<Props> = ({
  orderId,
  totalPrice,
  paymentUrl,
}) => (
  <div>
    <h1>Order #{orderId}</h1>

    <p>
      Pay <b>{totalPrice} zł</b> for the order. Go to{" "}
      <a href={paymentUrl}>this link</a>.
    </p>
  </div>
);
