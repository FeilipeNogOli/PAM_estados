import { useState } from 'react';
import { TextInput, Button, Modal, Portal, Provider, Paragraph } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import Lista from './Lista';
 
const ViaCep = () => {
    const [cep, setCep] = useState("");
    const [dados, setDados] = useState(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [estadoSelecionado, setEstadoSelecionado] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isCadastroConcluido, setCadastroConcluido] = useState(false);
    const [editable, setEditable] = useState(true);
 
    const BuscaCep = (cep) => {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((resp) => resp.json())
            .then((dados) => {
                if (dados.erro) {
                    setShowModal(true);
                    setDados(null);
                    setEditable(true);
                } else {
                    setDados(dados);
                    setShowModal(false);
                    setEditable(false);
                }
            })
            .catch(console.log);
    };
 
    const handleConcluido = () => {
        if (nome && email && dados) {
            setCadastroConcluido(true);
            setCep(""); setDados(null); setNome(""); setEmail(""); setEstadoSelecionado(null);
            setEditable(true);
        }
    };
 
    return (
<Provider>
<ScrollView contentContainerStyle={styles.container}>
<Portal>
<Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={styles.modal}>
<Paragraph>CEP não encontrado. Preencha os dados manualmente.</Paragraph>
</Modal>
</Portal>
<View style={styles.row}><TextInput label="Nome" value={nome} onChangeText={setNome} mode="outlined" editable={editable} style={styles.halfInput} /></View>
<View style={styles.row}><TextInput label="E-mail" value={email} onChangeText={setEmail} mode="outlined" keyboardType="email-address" editable={editable} style={styles.halfInput} /></View>
<View style={styles.row}><TextInput label="CEP" value={cep} onChangeText={setCep} mode="outlined" onBlur={() => BuscaCep(cep)} editable={editable} style={styles.halfInput} /></View>
<View style={styles.row}><TextInput label="Rua" value={dados?.logradouro || ''} mode="outlined" editable={editable} style={styles.halfInput} /></View>
<View style={styles.row}><TextInput label="Bairro" value={dados?.bairro || ''} mode="outlined" editable={editable} style={styles.halfInput} /></View>
<View style={styles.row}><TextInput label="Estado" value={estadoSelecionado || (dados?.uf || '')} mode="outlined" editable={editable} style={styles.halfInput} /></View>
<View style={styles.row}><TextInput label="Cidade" value={dados?.localidade || ''} mode="outlined" editable={editable} style={styles.halfInput} /></View>
<View style={styles.row}><Lista dados={dados} onStateSelect={setEstadoSelecionado} style={styles.halfInput} /></View>
<Button mode="contained" onPress={handleConcluido} style={styles.button}>Concluído</Button>
                {isCadastroConcluido && <Paragraph style={styles.successMessage}>Cadastro realizado</Paragraph>}
</ScrollView>
</Provider>
    );
};
 
const styles = {
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    modal: {
        backgroundColor: '#333',
        padding: 20,
        margin: 20,
    },
    halfInput: {
        width: '50%',
        marginBottom: 10,
        backgroundColor: '#121212',
    },
    button: {
        marginTop: 10,
        width: '50%',
    },
    successMessage: {
        marginTop: 10,
        color: '#46F35F',
        textAlign: 'center',
    },
};
 
export default ViaCep;