import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Button, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

interface FormViewerProps {
  onGoToForm: () => void;
  submittedForms: any[];
  onEditForm: (formId: string) => void;
}

export default function FormViewer({ onGoToForm, submittedForms, onEditForm }: FormViewerProps) {
  const [isQrModalVisible, setIsQrModalVisible] = useState<boolean>(false);
  const [qrCodeData, setQrCodeData] = useState('');

  const showQrCode = (formData: any) => {
    try {
      // Convert formData to JSON
      // This string will be encoded into the QR code
      // NOTE: currently the information is directly converted to JSON which is the most conveninent way.
      //       However we could just send a list of the answers instead of both question ids and answers
      //       Or we could potentially compress the data which would take less space.
      const dataString = JSON.stringify(formData);
      setQrCodeData(dataString);
      setIsQrModalVisible(true);
    } catch (error) {
      console.error("Error converting form data to JSON for QR code:", error);
    }
  };

  const hideQrCode = () => {
    setIsQrModalVisible(false);
    setQrCodeData('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Submitted Forms</Text>

        {submittedForms.length === 0 ? (
          <Text style={styles.noFormsText}>No forms submitted yet. Go fill one out!</Text>
        ) : (
          submittedForms.map((form, index) => (
            <View key={form.id || index} style={styles.formItem}>
              <TouchableOpacity
                style={styles.editTouchable}
                onPress={() => onEditForm(form.id)}
              >
                <Text style={styles.formItemTitle}>Team: {form.teamNumber || 'N/A'}</Text>
                <Text style={styles.formItemText}>Teleop Points: {form.teleopPoints || 'N/A'}</Text>
                <Text style={styles.formItemTextSmall}>Click to View/Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.qrButton}
                // TODO: potentially figure out a better way to transfer the qr-code data (compress)
                onPress={() => showQrCode(form)} // Pass the entire form object to showQrCode
              >
                <FontAwesome name="qrcode" size={24} color="#ffffff" />
                <Text style={styles.qrButtonText}>QR</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        <View style={styles.buttonContainer}>
          <Button
            title="Go to Scouting Form"
            onPress={onGoToForm}
            color="#007AFF"
          />
        </View>

      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isQrModalVisible}
        onRequestClose={hideQrCode} // Handle Android back button press
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>QR Code for Form</Text>
            {qrCodeData ? (
              <QRCode
                value={qrCodeData}
                size={200}
                color="black"
                backgroundColor="white"
              />
            ) : (
              <Text style={styles.modalText}>No data available for QR code.</Text>
            )}
            <TouchableOpacity
              style={[styles.modalButton, styles.buttonClose]}
              onPress={hideQrCode}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e8f0',
    paddingTop: 50,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 30,
    marginTop: 20,
  },
  noFormsText: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 50,
  },
  formItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#cbd5e0',
  },
  editTouchable: {
    flex: 1,
    paddingRight: 10,
  },
  formItemTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 8,
  },
  formItemText: {
    fontSize: 16,
    color: '#4a5568',
    marginBottom: 3,
  },
  formItemTextSmall: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 8,
    fontStyle: 'italic',
  },
  qrButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 2,
  },
  buttonContainer: {
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 10,
  },
  // Modal Styles (for QR code modal)
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2d3748',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#4a5568',
  },
  modalButton: {
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    minWidth: 100,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonClose: {
    backgroundColor: '#007AFF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
