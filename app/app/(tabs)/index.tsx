import { StyleSheet, Text } from 'react-native';

export default function Dashboard() {
  return (
    <Text style={styles.heading}>Dashboard</Text>
  );
}

const styles = StyleSheet.create({
  heading: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "baseline",
    minHeight: "100%",
    fontWeight: 'bold',
    fontSize: 24, 
    color: "white",
    margin: 30,
  }
});
