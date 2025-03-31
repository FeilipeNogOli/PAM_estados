import { List } from 'react-native-paper';
import React from 'react';


//coloquei os estados em const para usar eles dps na lista
const estados = [
  'Acre', 'Alagoas', 'Amazonas', 'Bahia', 'Ceará', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 
  'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 
  'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 
  'Sergipe', 'Tocantins'
];


const Lista = (props) => {
    const [expanded, setExpanded] = React.useState(false);
    const handlePress = () => setExpanded(!expanded);
    const [selectedValue, setSelectedValue] = React.useState<string | null>(null);

    const handleItemPress = (estado: string) => {
        setSelectedValue(estado);
        setExpanded(false);
        props.onStateSelect(estado);  //basicamente para passar o estado para o "label"
    };

    
    return (
        <List.Section title={selectedValue == null ? "Selecione o estado" : selectedValue}>
            <List.Accordion
                title="Selecione o estado"
                left={props => <List.Icon {...props} icon="map-marker" />}
                expanded={expanded}
                onPress={handlePress}
                style={{ backgroundColor: '#333' }}
            >
                {estados.map((estado, index) => (
                    <List.Item 
                        key={index} 
                        title={estado} 
                        onPress={() => handleItemPress(estado)} 
                        left={props => <List.Icon {...props} icon="map" />}  //os icones nos itens 
                        titleStyle={{ color: '#bbb' }}  //serve apra ver a cor dos itens
                    />
                ))}
            </List.Accordion>
        </List.Section>
    );
};

export default Lista;
