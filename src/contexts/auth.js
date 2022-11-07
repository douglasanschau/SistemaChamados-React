import { useState, useEffect, createContext } from 'react';

import { db, auth } from '../services/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { setDoc , doc, getDoc } from 'firebase/firestore';

import {toast} from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({children}){

   const [user, setUser] = useState(null);
   const [loadingAuth, setLoadingAuth] = useState(false);
   const [loading, setLoading] = useState(true);

   useEffect(() => {

      function loadStorage() { 
            const storageUser = localStorage.getItem('SistemaUser');

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);

      }

      loadStorage();
   }, [])


   async function logIn(email, password){
       setLoadingAuth(true);
       signInWithEmailAndPassword(auth, email, password)
       .then(async (register) => {
            const postRef = doc(db, 'users', register.user.uid);
            await getDoc(postRef)
            .then((doc) => {
                let data = {
                    uid: register.user.uid,
                    nome: doc.data().nome,
                    email: register.user.email,
                    avatarUrl: doc.data().avatarUrl,
                }
                setUser(data);
                salvarRegistro(data);
                setLoadingAuth(false);
                toast.success('Bem vindo de volta.');
            })
            .catch(() => {
                setLoadingAuth(false);
                toast.error('Ops! Não foi possível acessar a aplicação.');
            })
       })
       .catch((e) => {
            console.log(e);
            setLoadingAuth(false);
            toast.error('Ops! Não foi possível acessar a aplicação.');
       });
   }


   async function signUp(email, password, nome){
       setLoadingAuth(true);

       await createUserWithEmailAndPassword(auth, email, password)
       .then( async (register) => {
          await setDoc(doc(db, 'users', register.user.uid), {
               nome: nome,
               avatarUrl: null,
          })
          .then(() => {
              let data = {
                  uid: register.user.uid,
                  nome: nome,
                  email: register.user.email,
                  avatarUrl: null
              }
              setUser(data);
              salvarRegistro(data);
              setLoadingAuth(false);
              toast.success('Bem vindo a plataforma.');
          })
          .catch(() => {
            setLoadingAuth(false);
            toast.error('Ops! Ocorreu um erro de autenticação.');
          });
       })
       .catch(() => {
            setLoadingAuth(false);
            toast.error('Ops! Ocorreu um erro ao se cadastrar.');
       });
   }

   function salvarRegistro(data){
       localStorage.setItem('SistemaUser', JSON.stringify(data));
   }


   async function logOut(){
    await signOut(auth)
    .then(() => {
      setUser(null);
      localStorage.removeItem("SistemaUser");
    })
    .catch(() => {
        toast.error('Ops! Ocorreu um erro ao sair da aplicação.');
    })
   }


   return (
       <AuthContext.Provider value={{ signed: !!user, user, loading, logIn, signUp, logOut, loadingAuth, setUser, salvarRegistro }}>
           {children}
       </AuthContext.Provider>
   )

}

export default AuthProvider;