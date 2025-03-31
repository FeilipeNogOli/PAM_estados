import { List } from 'react-native-paper';
import React from 'react';
import { View } from 'react-native';
 
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
        props.onStateSelect(estado);
    };
 
    return (
<View style={styles.container}>
<List.Section title={selectedValue == null ? "Selecione o estado" : selectedValue} style={styles.listSection}>
<List.Accordion
                    title="Selecione o estado"
                    left={props => <List.Icon {...props} icon="map-marker" />}
                    expanded={expanded}
                    onPress={handlePress}
                    style={styles.accordion}
>
                    {estados.map((estado, index) => (
<List.Item 
                            key={index} 
                            title={estado} 
                            onPress={() => handleItemPress(estado)} 
                            left={props => <List.Icon {...props} icon="map" />} 
                            titleStyle={styles.itemTitle}
                        />
                    ))}
</List.Accordion>
</List.Section>
</View>
    );
};
 
const styles = {
    container: {
        width: '50%',
        alignSelf: 'center',
    },
    listSection: {
        width: '100%',
    },
    accordion: {
        backgroundColor: '#333',
    },
    itemTitle: {
        color: '#bbb',
    },
};
 
export default Lista;