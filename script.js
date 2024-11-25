function verifyToken(){
    const token = localStorage.getItem("token")

    if(!token){
        window.location.href = "/login-page/login.html"
        return
    }
}

verifyToken()