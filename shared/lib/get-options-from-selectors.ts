import { Option } from '@/shared/components/shared/option-selector'
import { mapSizes } from '@/shared/constants/pizza'
import { ProductVariant } from '@prisma/client'


/**
 * Returns an array of size and type options from the given array of product variants.
 *
 * @param {ProductVariant[]} variants - An array of product variants.
 * @return {[Option[], Option[]]} - An array containing two arrays of options: allSizes and allTypes.
 */
export const getOptionsFromSelectors = (
  variants: readonly ProductVariant[]
) => {
  const allSizes = variants.reduce<Option[]>((acc, variant) => {
    if (
      !acc.some(option => variant.size !== null && option.key === variant.size)
    ) {
      acc.push({ key: variant.size!, name: mapSizes[variant.size!] })
    }
    return acc
  }, [])

  const allTypes = variants.reduce<Option[]>((acc, variant) => {
    if (
      !acc.some(option => variant.type !== null && option.key === variant.type)
    ) {
      acc.push({ key: variant.type!, name: variant.type! })
    }
    return acc
  }, [])
  return [allSizes, allTypes]
}
