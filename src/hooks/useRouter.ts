import { useMemo } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { parseQueries } from 'utils'

export const useRouter = () => {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  return useMemo(() => {
    return {
      navigate,
      pathname: location.pathname,
      query: {
        ...parseQueries(location.search),
        ...params,
      },
      location,
    }
  }, [params, location, navigate])
}
