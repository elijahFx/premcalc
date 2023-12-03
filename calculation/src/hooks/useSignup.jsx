import { useState } from "react";
import { UseSelector } from "react-redux/es/hooks/useSelector";

export function useSignup () {
 const [error, setError] = useState(null)
 const [isLoading, setIsLoading] = useState(null)


 const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)
}

}