import { useLocation } from 'react-router-dom'

export const useLocationQuery = () => new URLSearchParams(useLocation().search)
