import Modal from "react-modal";
import { Container, TransactionTypeButton, RadioBox } from "./styles";
import closeImg from "../../assets/fechar.svg";
import IncomeImg from "../../assets/entradas.svg";
import OutcomeImg from "../../assets/saidas.svg";
import { FormEvent, useState } from "react";
import {  useTransactions } from "../../hooks/useTransactions";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {

  const {createTransaction} = useTransactions();

  const [type, setType] = useState("deposit");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

   await createTransaction({
      title,
      category,
      amount,
      type,
    })
    setType('deposit');
    setCategory('')
    setAmount(0)
    setTitle('')
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container onSubmit={handleCreateNewTransaction}>
        <button
          className="reactModalClose"
          onClick={onRequestClose}
          type="button"
        >
          <img src={closeImg} alt="fechar" />
        </button>
        <h2>Cadastrar Transação</h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <TransactionTypeButton>
          <RadioBox
            type="button"
            onClick={() => setType("deposit")}
            isActive={type=== "deposit"}
            activeColor="green"
          >
            <img src={IncomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setType("withdraw")}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={OutcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeButton>
        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
