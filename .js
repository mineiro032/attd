const updateTotals = () => {
    // Reiniciar os totais
    dailyTotal = 0;
    weeklyTotal = 0;
    monthlyTotal = 0;

    // Carregar vendas do Local Storage
    const salesData = JSON.parse(localStorage.getItem(attendantName)) || [];
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    salesData.forEach(sale => {
        const saleDate = new Date(sale.data);
        const valor = sale.valor;

        // Atualiza saldo diário
        if (saleDate.toDateString() === today.toDateString()) {
            dailyTotal += valor;
        }
        
        // Atualiza saldo semanal
        if (saleDate >= startOfWeek) {
            weeklyTotal += valor;
        }

        // Atualiza saldo mensal
        if (saleDate >= startOfMonth) {
            monthlyTotal += valor;
        }
    });

    // Atualiza os displays
    dailyTotalDisplay.innerText = `R$ ${dailyTotal.toFixed(2)}`;
    weeklyTotalDisplay.innerText = `R$ ${weeklyTotal.toFixed(2)}`;
    monthlyTotalDisplay.innerText = `R$ ${monthlyTotal.toFixed(2)}`;
};

// Carregar vendas ao iniciar
const loadSales = () => {
    const salesData = JSON.parse(localStorage.getItem(attendantName)) || [];
    salesData.forEach(sale => {
        addSaleToTable(sale.descricao, sale.valor, sale.data);
    });
    // Atualiza totais após carregar as vendas
    updateTotals();
};