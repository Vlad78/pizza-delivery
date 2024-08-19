import { ArrowRight, Package, Percent, Truck } from 'lucide-react'

import { calculatePriceWithoutVAT, calculateVAT } from '@/shared/lib'
import { cn } from '@/shared/lib/utils'

import { Button } from '../ui'
import { TotalPriceDetails } from './total-price-details'
import { WhiteBlock } from './white-block'


interface Props {
  totalPrice: number;
  delivery: number;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export const CheckoutSidebar = ({
  totalPrice,
  delivery,
  loading,
  disabled,
  className,
}: Props) => {
  return (
    <div className={cn("w-[450px]", className)}>
      <WhiteBlock title="4. Payment" className="p-6 sticky top-4">
        <div className="flex flex-col gap-1">
          <span className="text-xl">Total:</span>
          <span className="text-[36px] font-extrabold">
            {totalPrice + delivery} zł
          </span>
        </div>

        <TotalPriceDetails
          amount={totalPrice}
          title={
            <>
              <Package size={18} className="mr-2 text-gray-400" />
              {"Cost of goods:"}
            </>
          }
        />
        <TotalPriceDetails
          amount={delivery}
          title={
            <>
              <Truck size={18} className="mr-2 text-gray-400" />
              {"Delivery:"}
            </>
          }
        />
        <TotalPriceDetails
          amount={calculateVAT(
            calculatePriceWithoutVAT(delivery, 23) +
              calculatePriceWithoutVAT(totalPrice, 23),
            23
          )}
          title={
            <>
              <Percent size={18} className="mr-2 text-gray-400" />
              {"VAT:"}
            </>
          }
        />
        <Button
          type="submit"
          loading={loading}
          disabled={disabled}
          className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
        >
          Pay
          <ArrowRight className="w-5 ml-2" />
        </Button>
      </WhiteBlock>
    </div>
  );
};
