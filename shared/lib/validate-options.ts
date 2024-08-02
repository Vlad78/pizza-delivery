import { Option } from '@/shared/components/shared/option-selector'
import { ProductVariant } from '@prisma/client'


/**
 * Validates the options based on the given key, key type, and variants.
 *
 * @param {string | null} [key] - The key to validate.
 * @param {Option[]} [options] - The select options to validate.
 * @param {'size' | 'type'} [keyType] - The type of the key.
 * @param {readonly ProductVariant[]} [variants] - The variants of product.
 * @return {Option[]} The validated options.
 */
export const validateOptions = (
  key: string | null,
  options: Option[],
  keyType: 'size' | 'type',
  variants: readonly ProductVariant[]
) => {
  return options.map(option => {
    if (
      !variants.some(
        variant =>
          variant[keyType] === key &&
          variant[keyType === 'size' ? 'type' : 'size'] === option.key
      )
    ) {
      return { ...option, disabled: true }
    }
    return { ...option, disabled: false }
  })
}
