import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../services/auth.service"
import { setSession } from "../auth/auth.utils"
import { useAppDispatch } from "../redux/store"
import { setAuth } from "../redux/auth/auth.slice"
import { RoleType } from "../types/user.types"

export const LoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [error, setError] = useState("")

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError("") // איפוס שגיאה קיימת
        const formData = new FormData(event.currentTarget)

        const name = formData.get("name")?.toString().trim() || ""
        const password = formData.get("password")?.toString() || ""

        if (!name || !password) {
            setError("אנא מלא את כל השדות")
            return
        }

        try {
            const token = await login(name, password)
            setSession(token)

            // שימוש זמני בפרטי משתמש עד שיתווסף API אמיתי
            const user = {
                id: 1,
                name,
                role: RoleType.Admin,
                phone: '05246545614',
                email: 'sara@gmail.com',
                address: '',
            }

            dispatch(setAuth(user))
            navigate("/home")
        } catch (err) {
            console.error("Login error:", err)
            setError("שם משתמש או סיסמה שגויים")
        }
    }

    return (
        <form onSubmit={onSubmit} style={{ maxWidth: 300, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10 }}>
            <h2>התחברות</h2>

            <input name="name" placeholder="שם משתמש" />
            <input name="password" type="password" placeholder="סיסמה" />

            {error && <div style={{ color: "red", fontSize: "0.9em" }}>{error}</div>}

            <button type="submit">התחבר</button>

            <p style={{ marginTop: 10 }}>
                עדיין לא רשום? <Link to="/auth/sign-up">הרשם</Link>
            </p>
        </form>
    )
}
export default LoginPage