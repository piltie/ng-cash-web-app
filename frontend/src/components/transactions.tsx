import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../pages/appLayout";
import api from "../services/api";

export default function Transactions() {
  const { user } = useUser();
  console.log("i");
  return user ? (
    <>
      <h3>PÁGINA DE TRANSAÇÕES! :D</h3> {user.balance}
    </>
  ) : (
    <h2>Carregando...</h2>
  );
}
