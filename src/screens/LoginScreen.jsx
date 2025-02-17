import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [userID, setUserID] = useState(Math.floor(Math.random() * 10000).toString());

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Enter User ID</Text>
      <TextInput
        style={{ borderWidth: 1, width: 200, padding: 5, marginVertical: 10 }}
        value={userID}
        onChangeText={setUserID}
      />
      <Button title="Login" onPress={() => navigation.navigate('Home', { userID })} />
    </View>
  );
}
