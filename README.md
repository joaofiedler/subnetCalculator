# 🌐 Subnet Calculator Full-Stack

Uma calculadora de sub-redes (Subnetting) desenvolvida com foco total em separação de responsabilidades. O projeto consiste em uma interface web agradável em Dark Mode que consome uma API local em Python para processar toda a matemática de redes.

Projeto criado como forma de estudo prático unindo **Lógica de Redes** e **Desenvolvimento Full-Stack básico**.

---

## 💻 Tech Stack

- **Backend:** Python + Flask (Responsável por toda a manipulação de IPs e conversão de bits/ranges).
- **Frontend:** React + Ionic (Responsável por renderizar os inputs, estados e tratar a resposta da API em cartões responsivos).

---

## 🚀 Como Executar o Projeto

Você vai precisar rodar o Backend e o Frontend ao mesmo tempo em terminais separados.

### 1. Rodando a API (Backend)
No terminal, dentro da pasta raiz do projeto:

```bash
# Opcional (mas recomendado): Crie um ambiente virtual
python -m venv venv
source venv/bin/activate  # no Windows: venv\\Scripts\\activate

# Instale as dependências (Flask e Flask-CORS)
pip install -r requirements.txt

# Inicialize o servidor na porta 5000 (127.0.0.1)
python app.py
```

### 2. Rodando a Interface (Frontend)
Em outro terminal paralelo, entre na pasta do frontend:

```bash
# Entre no diretório do Frontend
cd frontend

# Baixe os pacotes Node
npm install

# Suba o servidor do React
npm run dev
```

Acesse no seu navegador a URL que aparecer no terminal (geralmente `http://localhost:5173`). Digite um IP válido e um prefixo CIDR (ex: `24`), aperte a tecla **Enter** ou clique em calcular e veja a mágica do Python acontecendo na interface!

---

## 🛠 Funcionalidades
A calculadora retorna os seguintes dados formatados:
- **Detalhes Decimais:** IP Address, Subnet Mask, Network Bits, Host Bits, Network Address, Broadcast Address e Range utilizável de Hosts.
- **Formato Binário:** Visão crua e didática dos octetos em binário para IP, Máscara, Rede e Broadcast.

---

> Desenvolvido com ☕ e foco em código limpo.
