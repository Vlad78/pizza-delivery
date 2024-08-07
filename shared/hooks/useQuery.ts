import { useRouter } from 'next/navigation'
import qs from 'qs'
import { useDebounce } from 'react-use'


type DataObject = {
  [key: string]: string | number | string[] | null | undefined | Set<string>
}

export const useQuery = (filters: DataObject) => {
  const router = useRouter()

  const checkedTypes = Object.entries(filters).reduce((acc, [key, val]) => {
    if (val) {
      acc = { ...acc, [key]: val instanceof Set ? Array.from(val) : val }
    }
    return acc
  }, {})

  useDebounce(
    () => {
      const query = qs.stringify(checkedTypes, {
        skipNulls: true,
        arrayFormat: 'comma',
        encodeValuesOnly: true,
        strictNullHandling: true,
      })

      router.push(`?${query}`, { scroll: false })
    },
    200,
    Object.values(filters)
  )
}
