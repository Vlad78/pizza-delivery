import { CartItemWithNestedFields } from '@/@types/prisma'
import { CheckoutItem, WhiteBlock } from '@/shared/components/shared/'
import { calcTotalProductPrice, getItemDescription, getStringOfIngredients } from '@/shared/lib'


interface Props {
  title: string;
  loading?: boolean;
  items: CartItemWithNestedFields[];
  className?: string;
  handleOnCountChange?: (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => void;
  onRemove?: (id: number) => void;
  controls?: boolean;
}

export const CheckoutItemsList = ({
  title,
  className,
  items,
  loading,
  handleOnCountChange,
  onRemove,
  controls = true,
}: Props) => {
  return (
    <WhiteBlock title={title} className={className}>
      <div className="flex flex-col gap-5">
        {items.map((item) => (
          <CheckoutItem
            key={item.id}
            id={item.id}
            name={item.product?.name || item.productVariant!.product.name}
            disabled={loading}
            quantity={item.quantity}
            ingredients={getStringOfIngredients(item.additionIngredients)}
            imageUrl={item.productVariant?.imageUrl || item.product!.imageUrl}
            description={getItemDescription(
              item.productVariant?.size,
              item.productVariant?.type,
              item.product?.description
            )}
            price={calcTotalProductPrice(
              item.additionIngredients,
              item.productVariant?.price,
              item.product?.price
            )}
            onCountChange={(type) =>
              handleOnCountChange?.(item.id, item.quantity, type)
            }
            onRemove={onRemove}
            controls={controls}
          />
        ))}
      </div>
    </WhiteBlock>
  );
};
