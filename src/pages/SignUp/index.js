import { useState, useContext } from 'react';

import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';

import logo from '../../assets/logo.png';

function SignUp(){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {signUp} = useContext(AuthContext);

    function handleSubmit(){
     if(nome !== '' && email !== '' && password !== ''){
        signUp(email, password, nome);
      } 
    }
    return (
        <div className='container-center'>
          <div className='login'>
              <div className='logo-area'>
                <img src={logo} alt='Sistema Logo'/>
              </div>

              <form onClick={handleSubmit}>
                <h1>Cadastre-se</h1>
                <input type='text' placeholder="Seu Nome" value={nome} onChange={ (e) => setNome(e.target.value) } />
                <input type='text' placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value) } />
                <input type='password' placeholder="*****"  value={password} onChange={ (e) => setPassword(e.target.value) } />
                <button type='button'>Cadastrar</button>
              </form>

              <Link to='/'>Já possui uma conta? Entrar </Link>
          </div>
        </div>
    );
}

export default SignUp;