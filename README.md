# Subnet Calculator

Calculadora de subnet com Python (Flask) no backend e React + Ionic no frontend.

## Como rodar

### Backend

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse: http://localhost:5173

## O que faz

Recebe IP + CIDR, calcula e retorna:

- network
- broadcast
- range de hosts
- subnet mask
- versão em binário
