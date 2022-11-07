
import { useState, useEffect } from 'react';

import { db } from '../../services/firebaseConnection';
import { collection, docs,  getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore';

import Header from '../../components/Header';
import Title from '../../components/Title';
import Modal from '../../components/Modal';

import { Link } from 'react-router-dom';

import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 }  from 'react-icons/fi';
import './dashboard.css';

import { toast } from 'react-toastify';
import { format } from 'date-fns';

function Dashboard(){


    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();

    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();

    useEffect(() => {
      loadChamados();
      return () =>{

      }
    }, []);

    async function loadChamados(){
      await getDocs(query(collection(db, 'chamados'), orderBy('created','desc'), limit(5)))
      .then((snapshot) => {
         updateState(snapshot);
      })
      .catch(() => {
         toast.error('Ops! Ocorreu um erro');
         setLoadingMore(false);
      })

      setLoading(false);
    }

    async function updateState(snapshot){
      const isCollectionEmpty = snapshot.size === 0;

      if(!isCollectionEmpty){
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id, 
            assunto: doc.data().assunto,
            cliente: doc.data().cliente,
            clienteId: doc.data().clienteId,
            createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
            status: doc.data().status,
            complemento: doc.data().complemento,
          })
        });

        const lastDoc = snapshot.docs[snapshot.docs.length - 1];
        setChamados(chamados => [...chamados, ...lista]);
        setLastDocs(lastDoc);
      } else {
        setIsEmpty(true);
      }

      setLoadingMore(false);
    }

    async function handleMore(e){
      e.preventDefault();
      setLoadingMore(true);
      await getDocs(query(collection(db, 'chamados'), orderBy('created','desc'), limit(5), startAfter(lastDocs)))
      .then((snapshot) => {
          updateState(snapshot);
      })
      .catch(() => {
          toast.error("Ops! Ocorreu um erro ao buscar chamados.");
      })
      setLoadingMore(false);
    }

    function togglePostModal(item){
      setShowPostModal(!showPostModal);
      setDetail(item);
    }

    if(loading){
      return (
        <div>
          <Header />

          <div className='content'>
              <Title name="Atendimentos">
                    <FiMessageSquare size={25} />
              </Title>
          </div>
          <div className='container dashboard'>
              <span>Buscando chamados...</span>
          </div>
        </div>
      )
    } else { 

    return (
        <div>
          <Header />

          <div className='content'>
               <Title name="Atendimentos">
                    <FiMessageSquare size={25} />
               </Title>
                  
               {chamados.length === 0 ? (
                   <div className='container dashboard'>
                      <span>Nenhum chamado registrado...</span>
                      <Link to='/new' className='new'>
                          <FiPlus size={25} color="#FFF" />
                          Novo Chamado
                      </Link>
                    </div>
                  ) : (
                    <>
                      <Link to='/new' className='new'>
                          <FiPlus size={25} color="#FFF" />
                          Novo Chamado
                      </Link>

                      <table>
                        <thead>
                            <tr>
                              <th scope='col'>Cliente</th>
                              <th scope='col'>Assunto</th>
                              <th scope='col'>Status</th>
                              <th scope='col'>Data de Cadastro</th>
                              <th scope='col'>#</th>
                            </tr>
                        </thead>
                        <tbody>
                           {chamados.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td data-label='Cliente'>{item.cliente}</td>
                                  <td data-label='Assunto'>{item.assunto}</td>
                                  <td data-label='Status'>
                                    <span className='badge' style={{ backgroundColor: item.status === 'Aberto' ? "#5cb85c" : "#0275d8"}}>{item.status}</span>
                                  </td>
                                  <td data-label='Cadastrado'>{item.createdFormated}</td>
                                  <td data-label='#'>
                                    <button className='action' style={{ backgroundColor: "#3583f6" }} onClick={ () => togglePostModal(item) }>
                                      <FiSearch color='#FFF' size={17} />
                                    </button>
                                    <Link to={`/new/${item.id}`} className='action' style={{ backgroundColor: "#F6a935" }}>
                                      <FiEdit2 color='#FFF' size={17} />
                                    </Link>
                                  </td>
                                </tr>
                              )
                            })
                           }
                        </tbody>
                      </table>
                      
                      { loadingMore && <h3 style={{ textAlign:'center', marginTop:15 }}>Buscando dados...</h3> }
                      { !loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Buscar Mais</button> }
                    </>
                  )
                
                }

          </div>
          {showPostModal && (
            <Modal conteudo={detail} close={togglePostModal} />
          )}
        </div>
    );
  }
}

export default Dashboard;