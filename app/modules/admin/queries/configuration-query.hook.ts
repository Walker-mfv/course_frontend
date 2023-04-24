import { useMutation, useQuery, useQueryClient, UseQueryOptions } from 'react-query'
import { fetchConfiguration, fetchPriceTiers, updateConfiguration } from 'app/apis/configuration.api'
import IConfiguration from '@shared/interfaces/models/configuration.interface'

const RQK_CONFIGURATION = 'configuration'
export function useConfigurationQuery(options?: UseQueryOptions<IConfiguration>) {
  return useQuery<IConfiguration>(RQK_CONFIGURATION, fetchConfiguration, {
    notifyOnChangeProps: 'tracked',
    ...options,
  })
}

const RQK_PRICE_TIERS = 'price-tiers'
export function usePriceTiers(options?: UseQueryOptions<number[]>) {
  return useQuery<number[]>(RQK_PRICE_TIERS, fetchPriceTiers, {
    notifyOnChangeProps: 'tracked',
    ...options,
  })
}

export const useUpdateConfiguration = () => {
  const queryClient = useQueryClient()
  return useMutation((data: Partial<IConfiguration>) => updateConfiguration(data), {
    onMutate: () => {},
    onSuccess: (_) => {
      queryClient.invalidateQueries(RQK_CONFIGURATION)
    },
  })
}
