import { useRouter } from 'next/navigation'
import qs from 'qs'
import { useDebounce } from 'react-use'


type DataObject = {
  [key: string]: string | number | string[] | null | undefined
}

export const useQuery = (filters: DataObject) => {
  const router = useRouter()

  useDebounce(
    () => {
      const query = qs.stringify(filters, {
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
