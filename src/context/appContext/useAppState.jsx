import React, { useContext, useMemo, useState } from 'react';
// import { useRouter } from 'next/router';

// https://ricostacruz.com/til/state-management-with-react-hooks
// https://www.youtube.com/watch?v=5LrDIWkK_Bc

// Cria o contexto
const AppContext = React.createContext({});

// Cria o provedor que será implementado como componente PAI para os componentes que precisam de acesso a esse estado
const AppProvider = ({ children }) => {
  // const router = useRouter();
  // console.log(router.route);

  // console.log(['pt-BR', 'en'].includes(router));
  // Inicializa o estado, mas em alguns casos não é necessário
  const initialState = {
    language: 'PTBR',
    level: 1,
    characterClass: 'Alchemist',
    element: 'All',
    mainStat: 'armor',
    itemName: '',
    slot: 'All',
    orderBy: 'level',
    currentSet: {
      necklace: {},
      helmet: {},
      ring: {},
      weapon: {},
      armor: {},
      shield: {},
      book: {},
      accessorie: {},
      pants: {},
      shoe: {},
    },
  };

  // Esse componente tem um estado, que será acessado por todos os outros
  const [state, setState] = useState(initialState);
  /*
  Aqui construimos as ações, o get actions está ali em baixo e ele será
  responsável por criar todas as ações que alteram o estado deste componente
  Ainda não sei a utilidade do useMemo, mas dizem que é para performance,
  dica oferecida no site ricostacruz
  */
  const actions = useMemo(() => getActions(setState), [setState]);

  /*
  Aqui criamos o provedor e passamos o estado para ele, e esse estado será
  propagado para os filhos que chamarem pelo useAppContext()
  */
  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

/*
Aqui ficam as ações que farão alterações no estado,
ficou parecido com as actions do redux, para adicionar mais ações
é só colocar mais chaves: valor
*/
const getActions = setState => ({
  changeLanguage: newLanguage => {
    setState(state => ({ ...state, language: newLanguage }));
  },
  updateFilter: (filter, value) => {
    setState(state => ({ ...state, [filter]: value }));
  },
  updateCurrentSet: newSet => {
    setState(state => ({ ...state, currentSet: newSet }));
  },
  udateOneEquipment: (currentSet, newItem) => {
    setState(state => ({
      ...state,
      currentSet: { ...currentSet, [newItem.slot]: newItem },
    }));
  },
});

/*
Essa é a função que os conponentes utilizar para acessar o estado
e as funções que alteram o estado.
*/
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
