
import { useState } from 'react';
import { TextInput, Button, Modal, Portal, Provider, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native';
import Lista from './Lista';

const ViaCep = () => {
    const [cep, setCep] = useState("");
    const [dados, setDados] = useState<any>(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [estadoSelecionado, setEstadoSelecionado] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isCadastroConcluido, setCadastroConcluido] = useState(false);
    const [editable, setEditable] = useState(true); //entendi nd mas é para ele começar estando editavel

    const BuscaCep = (cep: string) => {
        let url = `https://viacep.com.br/ws/${cep}/json/`;


        
        fetch(url)
            .then((resp) => resp.json())
            .then((dados) => {
                if (dados.erro) {
                    setShowModal(true);
                    setDados(null);  //klimpa os campos se o cep estiver errado ou n ecxistir
                    setEditable(true);  //permitir q edite manualmente
                } else {
                    setDados(dados);
                    setShowModal(false);
                    setEditable(false);  //desabilitar edição se o cep for encontrado
                }
            })
            .catch((x) => {
                console.log(x);
            });
    };

    const handleConcluido = () => {
        if (nome && email && dados) { 
            setCadastroConcluido(true);
            setCep("");
            setDados(null);
            setNome("");
            setEmail("");
            setEstadoSelecionado(null);
            setEditable(true);
        }
    };


    const handleStateSelect = (estado: string) => {
        setEstadoSelecionado(estado);
    };

    return (
        <Provider>
            <ScrollView style={styles.scrollContainer}>
                <Portal>
                    <Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={styles.modal}>
                        <Paragraph>CEP não encontrado. Você pode preencher os dados manualmente</Paragraph>
                    </Modal>
                </Portal>

                <TextInput
                    label="Nome"
                    value={nome}
                    onChangeText={setNome}
                    mode="outlined"
                    editable={editable}  //só pra deixar o campo editavel msm sem o cep
                    left={<TextInput.Icon name="account" />}
                    style={styles.input}
                    outlineColor="#6b2363"
                    activeOutlineColor="#e176d5"
                />


                <TextInput
                    label="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    keyboardType="email-address"
                    editable={editable}  //mesmo do anterior soq pro email
                    left={<TextInput.Icon name="email" />}
                    style={styles.input}
                    outlineColor="#6b2363"
                    activeOutlineColor="#e176d5"
                />


                <TextInput
                    label="CEP"
                    value={cep}
                    onChangeText={setCep}
                    mode="outlined"
                    onBlur={() => BuscaCep(cep)}
                    editable={editable}  // Torna o campo editável antes de inserir o CEP
                    left={<TextInput.Icon name="map-marker" />}  // Ícone de CEP
                    style={styles.input}
                    outlineColor="#6b2363"
                    activeOutlineColor="#e176d5"
                />
                
                
                <TextInput
                    label="Rua"
                    value={dados?.logradouro || ''}
                    mode="outlined"
                    editable={editable}  //deixa o label editavel caso n ache o bendito cep
                    left={<TextInput.Icon name="home" />}
                    style={styles.input}
                    outlineColor="#6b2363"
                    activeOutlineColor="#e176d5"
                />
                
                <TextInput
                    label="Bairro"
                    value={dados?.bairro || ''}
                    mode="outlined"
                    editable={editable} 
                    left={<TextInput.Icon name="google-maps" />}
                    style={styles.input}
                    outlineColor="#6b2363"
                    activeOutlineColor="#e176d5"
                />
                
                <TextInput
                    label="Estado"
                    value={estadoSelecionado || (dados?.uf || '')}
                    mode="outlined"
                    editable={editable}
                    left={<TextInput.Icon name="map" />}
                    style={styles.input}
                    outlineColor="#6b2363"
                    activeOutlineColor="#e176d5"
                />
                
                <TextInput
                    label="Cidade"
                    value={dados?.localidade || ''}
                    mode="outlined"
                    editable={editable}
                    left={<TextInput.Icon name="city" />}
                    style={styles.input}
                    outlineColor="#6b2363"
                    activeOutlineColor="#e176d5"
                />

    
                <Lista dados={dados} onStateSelect={handleStateSelect} />

                
                <Button 
                    mode="contained" 
                    onPress={handleConcluido} 
                    style={styles.button} labelStyle={styles.buttonText}>
                        Concluído
                </Button>


                {isCadastroConcluido && <Paragraph style={styles.successMessage}>Cadastro realizado</Paragraph>}
            </ScrollView>
        </Provider>
    );
};

const styles = {
    scrollContainer: {
        flex: 1,
    },
    modal: {
        backgroundColor: '#333',
        padding: 20,
        margin: 20,
    },
    button: {
        display: 'flex',
        marginTop: 20,
        backgroundColor: '#5CA3D0',
        borderRadius: 10,
        
      },
      buttonText: {
        color: '#121212',
      },
    successMessage: {
        marginTop: 20,
        color: '#46F35F',
        textAlign: 'center',
    },
    input: {
        marginBottom: 10,
        backgroundColor: '#12121212',
        color: '#fff',
        
    },
};

export default ViaCep;
