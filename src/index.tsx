import React from 'react';
import ReactDOM from 'react-dom/client';
import {createServer, Model} from 'miragejs'
import {App} from './App';

createServer({
  models:{
      transaction: Model,

  },
  seeds(server){
    server.db.loadData({
      transactions:[
        {
          id: 1,
          title: 'Salário',
          amount: 3000,
          type: 'deposit',
          category: 'salary',
          createdAt: new Date('2022-05-30')
        },
        {
          id: 2,
          title: 'Aluguel',
          amount: 2000,
          type: 'withdraw',
          category: 'aluguel',
          createdAt: new Date('2022-05-30')
        }
      ]
    })
  },
  routes() {
    this.namespace = 'api';
    this.get('/transactions', () => {
      return this.schema.all('transaction')
    });
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', data)
    })
  }
})


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
