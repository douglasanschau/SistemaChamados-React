import { useState, useEffect, useContext } from 'react';

import { db } from '../../services/firebaseConnection';
import { getDocs, getDoc, updateDoc, doc, collection, query, orderBy, addDoc } from 'firebase/firestore';

import { useNavigate, useParams } from 'react-router-dom';

import Header from '../../components/Header';
import Title from '../../components/Title';

import { AuthContext } from '../../contexts/auth';

import { FiPlusCircle } from 'react-icons/fi';

import './new.css';

import { toast, ToastContainer } from 'react-toastify';


function New(){

   const { id } = useParams();
   const navigate = useNavigate();

   const [idCustomer, setIdCustomer] = useState(false);

   const [loadCustomers, setLoadCustomers] = useState(true);
   const [customers, setCustomers] = useState([]);

   const [customer, setCustomer] = useState('');
   const [assunto, setAssunto] = useState('Suporte');
   const [status, setStatus] = useState('Aberto');
   const [complemento, setComplemento] = useState('');

   const { user } = useContext(AuthContext);

   useEffect(() => {
       async function loadCustomers(){
         const customersRef = collection(db, 'customers'); 
         await getDocs(query(customersRef), orderBy('nomeFantasia'))
         .then((snapshot) => {
            let lista = [];
            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    nomeFantasia: doc.data().nomeFantasia,
                });
            });

            if(lista.length === 0){
                toast.error(("Nenhuma empresa encontrada"));
                setCustomers([ {id: '1', nomeFantasia: ''} ])
                setLoadCustomers(false);
                return; 
            }

            setCustomers(lista);
            setLoadCustomers(false);

            if(id){
                loadId();
            }
         })
         .catch(() => {
            toast.error("Ops! Não foi possível encontrar os clientes");
            setLoadCustomers(false);
            setCustomers([ {id: '1', nomeFantasia: ''} ])
         });
       } 

       loadCustomers();
   }, [id]);


   async function loadId(){
       const docRef = doc(db, 'chamados', id);
       await getDoc(docRef, {})
       .then((snapshot) => {
          setAssunto(snapshot.data().assunto);
          setStatus(snapshot.data().status);
          setComplemento(snapshot.data().complemento);
          setCustomer(snapshot.data().clienteId);
          setIdCustomer(true);
       })
       .catch(() => {
         toast.error("Ops! Chamado não encontado");
         setIdCustomer(false);
       })
   }

  async function handleRegister(e){
    e.preventDefault();
    let cliente = '';
    customers.forEach((item) => {
        if(item.id === customer){
            cliente = item.nomeFantasia;
        }
    });

    if(idCustomer){
        const docRef = doc(db, 'chamados', id);
        await updateDoc(docRef, {
            clienteId: customer,
            cliente: cliente,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userUid: user.uid
        })
        .then(() => {
            toast.success("Chamado editado com successo!");
            setCustomer('');
            setComplemento('');
            navigate('/dashboard');

        })
        .catch(() => {
            toast.error("Ops! Ocorreu um erro ao editar");
        })
        return;
    }

    await addDoc(collection(db, 'chamados'), {
        created: new Date(),
        clienteId: customer,
        cliente: cliente,
        assunto: assunto,
        status: status,
        complemento: complemento,
        userUid: user.uid
    })
    .then(() => {
        toast.success('Chamado cadastrado com sucesso.');
        setComplemento('');
        setCustomer('');
        setAssunto('Suporte');
        setStatus('Aberto');
    })
    .catch(() => {
       toast.error('Ops! Ocorreu um erro ao cadastrar chamado');
    }) 
  }

  return (
      <div>
          <Header />
          <div className='content'>
              <Title name='Novo Chamado'>
                  <FiPlusCircle size={25} />
              </Title>

              <div className='container'>
                  <form className='form-profile' onSubmit={handleRegister}>

                     <label>Cliente</label>
                        {loadCustomers ? (
                            <input type='text' disabled={true} value="Carregando Clientes..."/>
                            ) 
                            :
                            (
                            <select value={customer} onChange={ (e) => setCustomer(e.target.value) }>
                                {customers.map((item, index) => {
                                    return (
                                        <option key={item.id} value={item.id}>
                                            {item.nomeFantasia}
                                        </option>
                                    )
                                })}
                            </select>
                            )
                        }

                     <label>Assunto</label>
                         <select value={assunto} onChange={ (e) => setAssunto(e.target.value) }>
                            <option value='Suporte'>Suporte</option>
                            <option value='Visita Tecnica'>Visita Técnica</option>
                            <option value='Financeiro'>Financeiro</option>
                         </select>

                     <label>Status</label>
                     <div className='status'>
                        <input type='radio' name='radio' onChange={ (e) => setStatus(e.target.value) } value='Aberto' checked={status === "Aberto" ? 'checked' : ''} />
                        <span>Em Aberto </span>

                        <input type='radio' name='radio' onChange={ (e) => setStatus(e.target.value) } value='Progresso' checked={status === "Progresso" ? 'checked' : ''}  />
                        <span>Progresso</span>

                        <input type='radio' name='radio' onChange={ (e) => setStatus(e.target.value) } value='Atendido'  checked={status === "Atendido" ? 'checked' : ''}  />
                        <span>Atendido</span>
                     </div>

                     <label>Complemento</label>
                     <textarea type='text' placeholder="Descreva seu problema (opcional)."  value={complemento} onChange={ (e) => setComplemento(e.target.value) } rows='8'/>

                      <button type='submit'>Registrar</button>
                  </form>
              </div>
          </div>
      </div>
  )
}

export default New;