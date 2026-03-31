import { useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  const [ip, setIp] = useState('');
  const [prefixo, setPrefixo] = useState('');
  const [resultado, setResultado] = useState<any>(null);

  const calcularSubnet = () => {
    if (ip === '' || prefixo === '') {
      alert('Por favor, digite o IP e o Prefixo antes de calcular.');
      return;
    }

    fetch('http://127.0.0.1:5000/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ip: ip,
        prefixo: Number(prefixo)
      })
    })
    .then((resposta) => resposta.json()) 
    .then((dados) => {
      if (dados.erro) {
        alert("Ops, deu um erro: " + dados.erro);
      } else {
        setResultado(dados);
      }
    })
    .catch((erro) => {
      console.error(erro);
      alert('NetworkError: O Flask está rodando? Verifique se o backend está ligado na porta 5000.');
    });
  };

  // Função para conseguir dar Enviar ao apertar Enter pelo formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calcularSubnet();
  };

  return (
    <IonPage>
      {/* O header agora acompanha o visual customizado */}
      <IonHeader className="ion-no-border">
        <IonToolbar className="custom-toolbar">
          <IonTitle>Calculadora de Subnet</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      {/* Removemos o color="dark" nativo pra usar nosso CSS customizado e homogêneo */}
      <IonContent className="ion-padding custom-content">
        
        {/* Formulário permite dar Tab e apertar Enter nativamente */}
        <form onSubmit={handleSubmit}>
          <IonCard className="custom-card">
            <IonCardHeader>
              <IonCardTitle>Dados da Rede</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem lines="none" className="custom-input-item">
                <IonInput 
                  label="Endereço IPv4:" 
                  labelPlacement="floating" 
                  placeholder="Exemplo: 192.168.0.1" 
                  value={ip} 
                  onIonInput={(e: any) => setIp(e.target.value)} 
                />
              </IonItem>
              
              <IonItem lines="none" className="custom-input-item" style={{ marginTop: '10px' }}>
                <IonInput 
                  label="CIDR (Prefixo):" 
                  labelPlacement="floating" 
                  type="number" 
                  placeholder="Exemplo: 24" 
                  value={prefixo} 
                  onIonInput={(e: any) => setPrefixo(e.target.value)} 
                />
              </IonItem>

              {/* Botão com type="submit" para funcionar com o Enter do form */}
              <IonButton 
                expand="block" 
                type="submit" 
                className="custom-button"
              >
                Calcular
              </IonButton>
            </IonCardContent>
          </IonCard>
        </form>

        {resultado !== null && (
          <div className="results-wrapper">
            <IonCard className="custom-card">
              <IonCardHeader>
                <IonCardTitle>Dados Decimais</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p><strong>IP Address:</strong> {resultado.ip_address}</p>
                <p><strong>Subnet Mask:</strong> {resultado.subnet_mask}</p>
                <p><strong>Network Bits:</strong> {resultado.network_bits}</p>
                <p><strong>Host Bits:</strong> {resultado.host_bits}</p>
                <p><strong>Network Address:</strong> {resultado.network_address}</p>
                <p><strong>Broadcast Address:</strong> {resultado.broadcast_address}</p>
                <p><strong>Host Range:</strong> {resultado.host_range}</p>
              </IonCardContent>
            </IonCard>

            <IonCard className="custom-card">
              <IonCardHeader>
                <IonCardTitle>Dados Binários</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p><strong>IP:</strong> <span className="binary-text">{resultado.ip_binary}</span></p>
                <p><strong>Máscara:</strong> <span className="binary-text">{resultado.subnet_mask_binary}</span></p>
                <p><strong>Network:</strong> <span className="binary-text">{resultado.network_binary}</span></p>
                <p><strong>Broadcast:</strong> <span className="binary-text">{resultado.broadcast_binary}</span></p>
              </IonCardContent>
            </IonCard>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
