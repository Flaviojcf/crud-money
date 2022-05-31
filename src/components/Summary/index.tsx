import { Container } from "./styles";
import IncomeImg from "../../assets/entradas.svg";
import OutcomeImg from "../../assets/saidas.svg";
import TotalImg from "../../assets/total.svg";
import { useContext } from "react";
import { useTransactions } from "../../hooks/useTransactions";

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
        acc.deposits += transaction.amount;
        acc.total += transaction.amount
    }
    else {
        acc.withdraws += transaction.amount
        acc.total -= transaction.amount
    }
    return acc;
}, {
    deposits: 0,
    withdraws: 0,
    total: 0
})

  return (
    <Container>
    <div>
        <header>
            <p>Entradas</p>
            <img src={IncomeImg} alt="Imagem que mostra o simbolo de entrada" />
        </header>
        <strong> {
            new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(summary.deposits)}
            </strong>
    </div>
    <div>
        <header>
            <p>Saídas</p>
            <img src={OutcomeImg} alt="Imagem que mostra o simbolo de saída" />
        </header>
        <strong>-{
            new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(summary.withdraws)}
            </strong>
    </div>
    <div className="highLight-background">
        <header>
            <p>Total</p>
            <img src={TotalImg} alt="Imagem que mostra o simbolo do total" />
        </header>
        <strong>{
            new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(summary.total)}
            </strong>
    </div>
</Container>
  );
}
