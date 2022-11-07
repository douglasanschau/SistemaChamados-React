import { useState, useContext } from 'react';

import { AuthContext } from '../../contexts/auth';

import { db, storage } from '../../services/firebaseConnection';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setDoc , doc, getDoc, updateDoc } from 'firebase/firestore';

import Header from '../../components/Header';
import Title from '../../components/Title';

import { FiSettings, FiUpload } from 'react-icons/fi';

import avatar from '../../assets/avatar.png';
import './profile.css';
import { toast } from 'react-toastify';

function Profile(){

    const { user, logOut, setUser, salvarRegistro } = useContext(AuthContext);

    const [ nome, setNome ]  = useState(user && user.nome);
    const [ email, setEmail ]  = useState(user && user.email);
    const [ avatarUrl, setAvatarUrl ]  = useState(user && user.avatarUrl);

    const [ imgAvatar, setImgAvatar ] = useState(null);

    function handleFile(e){
        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                setImgAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]));
            } else {
                toast.error('Envie uma imagem jpg ou png.');
                setImgAvatar(null);
                return null;
            }
        }
    }

    async function handleUpload(){
      const currentUid = user.uid;
      const referencia  = ref(storage, `images/${currentUid}/${imgAvatar.name}`);
      const uploadTask = await uploadBytes(referencia, imgAvatar)
      .then(async () => {
         await getDownloadURL(referencia).
         then( async (url) => {
             const docRef = doc(db, 'users', user.uid);

             await updateDoc(docRef, {
                avatarUrl: url,
                nome: nome,
             })
             .then(() => {
                 let data = {
                     ...user,
                     avatarUrl: url,
                     nome: nome,
                 }
                 setUser(data);
                 salvarRegistro(data);
             })
             .catch(() => {
                toast.error('Não foi possível atualizar imagem.');
             });
         })
         .catch(() => {
            toast.error('Não foi encontrar esta imagem.');
         })
      })
      .catch((e) => {
          toast.error('Não foi possível atualizar imagem.');
      });
    }

    async function handleSave(e){
      e.preventDefault();

      if(imgAvatar == null && nome !== ''){
          const docRef = doc(db, 'users', user.uid);
          await updateDoc(docRef, {
             nome: nome,
          })
          .then(() => {
             let data = {
                 ...user,
                 nome: nome
             }
             setUser(data);
             salvarRegistro(data);
          })
          .catch(() => {

          })
      } else if(nome !== '' && imgAvatar !== null) {
          handleUpload();
      }
      toast.success('Atualizado com sucesso.');
    }

    return (
        <div>
            <Header />
            <div className='content'>
                <Title name='Meu Perfil'>
                   <FiSettings size='25' />
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleSave}>
                         <label className='label-avatar'>
                             <span>
                                 <FiUpload color='#FFF' size={25} />
                             </span>
                             <input type='file' accept='imagem/*'  onChange={handleFile}/> <br />
                             { avatarUrl == null ? 
                               <img src={avatar} alt='Foto de Perfil do Usuários'/>
                               :
                               <img src={avatarUrl} alt='Foto de Perfil do Usuários' />
                            }
                         </label>

                         <label>Nome</label>
                         <input type='text' value={nome} onChange={ (e) => setNome(e.target.value) } />

                         <label>E-mail</label>
                         <input type='text' value={email} disabled={true} />

                         <button type='submit'>Salvar</button>
                    </form>
                </div>

                <div className='container'>
                    <button className="logout-btn" onClick={ () => logOut() }>
                        Sair
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Profile;