from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Habilita o CORS para o frontend em React conseguir fazer as requisições
CORS(app)

@app.route('/calculate', methods=['POST'])
def calculate():
    # Pega os dados JSON que o frontend enviou no fetch
    dados = request.get_json()
    
    if not dados:
        return jsonify({"erro": "Nenhum dado recebido"}), 400
        
    ip = dados.get('ip')
    prefixo = dados.get('prefixo')
    
    # Validação simples
    if ip == "" or prefixo == "":
        return jsonify({"erro": "Preencha o IP e o prefixo"}), 400
        
    prefixo = int(prefixo)
    
    if prefixo > 32 or prefixo < 0:
        return jsonify({"erro": "Prefixo invalido (deve ser entre 0 e 32)"}), 400

    # Lógica baseada no seu código original de terminal
    ip_address = f"{ip}/{prefixo}"
    
    full_octets = prefixo // 8
    partial_octetes = prefixo % 8
    
    # Descobrindo a máscara de subrede
    mask = [0, 0, 0, 0]
    for i in range(full_octets):
        mask[i] = 255
        
    for i in range(partial_octetes):
        mask[full_octets] += 2**(7-i)
        
    network_bits = prefixo
    host_bits = 32 - prefixo
    
    # Divide o IP em 4 partes numéricas
    ip_dividido = ip.split(".")
    ip_partes = []
    for parte in ip_dividido:
        ip_partes.append(int(parte))
        
    # Calcula o endereço da rede (Network)
    network = []
    for i in range(4):
        resultado = ip_partes[i] & mask[i]
        network.append(resultado)
        
    # Inverte a máscara para achar o Broadcast
    mask_invertida = []
    for i in range(4):
        mask_invertida.append(255 - mask[i])
        
    broadcast = []
    for i in range(4):
        resultado = network[i] | mask_invertida[i]
        broadcast.append(resultado)
        
    # Define o range de hosts utilizáveis (primeiro e ultimo)
    first_host = network.copy()
    last_host = broadcast.copy()
    
    # Soma 1 no primeiro host e diminui 1 no ultimo
    first_host[3] += 1
    last_host[3] -= 1
    
    # Converte os resultados para binario
    ip_binario = []
    mask_binario = []
    network_binario = []
    broadcast_binario = []
    
    for i in range(4):
        # O "08b" transforma o numero em string binária de 8 casas
        ip_binario.append(format(ip_partes[i], "08b"))
        mask_binario.append(format(mask[i], "08b"))
        network_binario.append(format(network[i], "08b"))
        broadcast_binario.append(format(broadcast[i], "08b"))

    # Funções simples de formatação para devolver como string
    def formatar(lista):
        string_parts = []
        for x in lista:
            string_parts.append(str(x))
        return ".".join(string_parts)
        
    def formatar_bin(lista):
        return ".".join(lista)

    # Monta o JSON de resposta final
    resposta = {
        "ip_address": ip_address,
        "subnet_mask": formatar(mask),
        "network_bits": network_bits,
        "host_bits": host_bits,
        "network_address": formatar(network),
        "broadcast_address": formatar(broadcast),
        "host_range": f"{formatar(first_host)} - {formatar(last_host)}",
        "ip_binary": formatar_bin(ip_binario),
        "subnet_mask_binary": formatar_bin(mask_binario),
        "network_binary": formatar_bin(network_binario),
        "broadcast_binary": formatar_bin(broadcast_binario)
    }
    
    return jsonify(resposta), 200

if __name__ == '__main__':
    # Roda o servidor do flask na porta 5000
    app.run(debug=True, port=5000)