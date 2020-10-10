import {useState, useCallback, useEffect} from 'react'

export const useAuth = () => {
  const storageName = "userData"

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [ready, setReady] = useState(false);

  const login = useCallback((jwtToken, uId) => {
    setToken(jwtToken)  
    setUserId(uId)

    localStorage.setItem(storageName, JSON.stringify({
      userId: uId, token: jwtToken
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    if (data && data.token) {
      login(data.token, data.userId)
    }
    setReady(true)
  }, [login])

  return {login, logout, token, userId, ready}
}

