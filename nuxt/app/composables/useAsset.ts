export function useAsset() {
  const config = useRuntimeConfig()
  const base = config.public.assetBase.replace(/\/?$/, '/')
  return (file: string): string => `${base}${file}`
}
