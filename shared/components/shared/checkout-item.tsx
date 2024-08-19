"use client";

import { X } from 'lucide-react'
import React, { MouseEventHandler, useState } from 'react'

import { cn } from '@/shared/lib/utils'

import * as CartItemDetails from './cart-item-details'


interface Props {
  name: string;
  id: number;
  price: number;
  imageUrl?: string | null;
  quantity: number;
  description?: string;
  ingredients: string | null;
  disabled?: boolean;
  onCountChange?: (type: "plus" | "minus") => void;
  onRemove?: (id: number) => void;
  controls?: boolean;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  id,
  price,
  imageUrl,
  quantity,
  description,
  ingredients,
  className,
  onCountChange,
  onRemove,
  controls = true,
}) => {
  const [loading, setLoading] = useState(false);
  const handleOnRemove: MouseEventHandler<HTMLButtonElement> = () => {
    onRemove?.(id);
    setLoading(true);
  };
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        {
          "opacity-50 pointer-events-none": loading,
        },
        className
      )}
    >
      <div className="flex items-center gap-5 flex-1">
        <CartItemDetails.Image src={imageUrl} />
        <CartItemDetails.Info
          name={name}
          description={description}
          ingredients={ingredients}
        />
      </div>

      <CartItemDetails.Price
        value={controls ? price : `${quantity} x ${price}`}
      />

      {controls && (
        <div className="flex items-center gap-5 ml-20">
          <CartItemDetails.CountBlock
            onClick={onCountChange}
            quantity={quantity}
            disabled={loading}
          />
          <button type="button" onClick={handleOnRemove}>
            <X
              className={cn(
                "text-gray-400 cursor-pointer hover:text-gray-600",
                {
                  "opacity-50": loading,
                  "cursor-not-allowed": loading,
                }
              )}
              size={20}
            />
          </button>
        </div>
      )}
    </div>
  );
};
