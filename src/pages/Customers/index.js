import { useState } from 'react';

import Header from '../../components/Header';
import Title from '../../components/Title';

import { db } from '../../services/firebaseConnection';
import { addDoc, collection } from 'firebase/firestore';

import { FiUser } from 'react-icons/fi';
import './customers.css';
import { toast } from 'react-toastify';

function Customers(){

    const [nomeFantasia, setNomeFantasia] = useState('');
    const[cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

    async function handleAdd(e){
      e.preventDefault();
      if(nomeFantasia !== '' && cnpj !== '' && endereco !== ''){
          await addDoc(collection(db, 'customers'), {
              nomeFantasia : nomeFantasia, 
              cnpj: cnpj,
              endereco : endereco
          })
          .then(() => {
              setNomeFantasia('');
              setCnpj('');
              setEndereco('');
              toast.success('Cliente cadastrado com sucesso.');
          })
          .catch(() => {
            toast.error('Ops! Não foi possível cadastrar este cliente.');
          })
      } else {
        toast.error('Preencha todos os campos!');
      }
    }
   return (
       <div>

           <Header />
           <div className='content'>
               <Title name="Clientes">
                    <FiUser size={25} />
               </Title>

                <div className='container'>
                    <form className='form-profile customers' onSubmit={handleAdd}>

                        <label>Nome Fantasia</label>
                        <input type='text' placeholder='Nome da sua empresa' value={nomeFantasia} onChange={ (e) => setNomeFantasia(e.target.value) } />

                        <label>CNPJ</label>
                        <input type='text' placeholder='Seu CNPJ'  value={cnpj} onChange={ (e) => setCnpj(e.target.value) } />

                        <label>Endereço</label>
                        <input type='text' placeholder='Endereço da empresa' value={endereco} onChange={ (e) => setEndereco(e.target.value) } />

                        <button type='submit'>
                            Cadastrar
                        </button>
                    </form>
                </div>
                
            </div>
       </div>
   )
}

export default Customers; 