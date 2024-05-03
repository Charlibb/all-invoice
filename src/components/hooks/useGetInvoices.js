import { useState, useRef } from "react";

const useGetInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  //the useRef prevents multiple rerenders
  const oneRender = useRef(true);

  const getData = async () => {
    oneRender.current = false;
    const response = await fetch("/myinvoices", { method: "POST", headers: { "Content-Type": "application/json" }, });
    const data = await response.json();
    if(data) {
      const s = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      setInvoices(s);
    }
  };
  oneRender.current && getData();

  return [invoices];
};

export default useGetInvoices;
