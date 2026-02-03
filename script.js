document.addEventListener("DOMContentLoaded", () => {

  let credits = 1000;
  let level = 1;
  let connected = false;

  const creditsEl = document.getElementById("credits");
  const levelEl = document.getElementById("level");
  const walletBtn = document.getElementById("walletBtn");

  function atualizar() {
    creditsEl.textContent = credits.toLocaleString("pt-BR");
    levelEl.textContent = level;
  }

  function checarNivel() {
    if (credits >= level * 2000) {
      level++;
      alert("🎉 Você subiu para o nível " + level);
    }
  }

  walletBtn.addEventListener("click", async () => {
    if (!window.ethereum) {
      alert("MetaMask não encontrada");
      return;
    }

    const contas = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    connected = true;
    walletBtn.textContent =
      contas[0].slice(0, 6) + "..." + contas[0].slice(-4);
  });

  document.getElementById("snake").onclick = () => {
    if (!connected) return alert("Conecte a carteira");
    credits += 50;
    checarNivel();
    atualizar();
  };

  document.getElementById("slots").onclick = () => {
    if (!connected) return alert("Conecte a carteira");
    if (credits < 10) return alert("Créditos insuficientes");

    credits -= 10;

    if (Math.random() < 0.35) {
      credits += 100;
      alert("🍒 JACKPOT! +100 créditos");
    } else {
      alert("😢 Não foi dessa vez");
    }

    checarNivel();
    atualizar();
  };

  atualizar();
  console.log("Royal Casino carregado com sucesso");
});
