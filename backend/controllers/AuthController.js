const loginController = (req, res)=>{
    res.send('login route set');
}

const registerController = (req, res) => {
    res.send('register route set');
}


export {loginController, registerController};