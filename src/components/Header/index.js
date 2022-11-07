import { useContext } from 'react';

import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';

import { FiHome, FiUser, FiSettings } from "react-icons/fi";

import './header.css';
import avatar from '../../assets/avatar.png';

function Header(){

   const { user } = useContext(AuthContext);

   return (
       <div className='sidebar'>
           <div>
              <img src={user.avatarUrl !== null ? user.avatarUrl : avatar} alt="Foto Avatar"/>
            </div>

            <Link to='/dashboard'>
                <FiHome color="#FFF" size={24} />
                Chamados
            </Link>

            <Link to='/customers'>
                <FiUser color="#FFF" size={24} />
                Clientes
            </Link>

            <Link to='/profile'>
                <FiSettings color="#FFF" size={24} />
                 Perfil
            </Link>
           
       </div>
   )
}


export default Header;