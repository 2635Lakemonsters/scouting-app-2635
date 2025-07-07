import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import formFields from '../data/form_fields/2025.js';

interface ScoutingFormProps {
  initialFormData: any;
  onSubmit: (data: any) => void;
  onCancelEdit: () => void;
  onDeleteForm: (formId: string) => void;
}

export default function ScoutingForm({ initialFormData, onSubmit, onCancelEdit, onDeleteForm }: ScoutingFormProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  const handleTextInputChange = (id: string, value: string) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSwitchChange = (id: string, value: boolean) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const confirmDelete = () => {
    setIsModalVisible(true);
  };

  const handleDeleteConfirmed = () => {
    if (formData.id) {
      onDeleteForm(formData.id);
      setIsModalVisible(false);
    }
  };

  const handleDeleteCancelled = () => {
    setIsModalVisible(false);
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case 'textInput':
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleTextInputChange(field.id, value)}
              value={formData[field.id]}
              placeholder={field.placeholder}
              keyboardType={field.keyboardType}
            />
            <Text style={styles.currentValue}>
              Current {field.label.replace(':', '')}: {formData[field.id] || 'None entered'}
            </Text>
          </View>
        );
      case 'switch':
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <View style={styles.switchContainer}>
              <Text style={styles.label}>{field.label}</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={formData[field.id] ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) => handleSwitchChange(field.id, value)}
                value={formData[field.id]}
              />
            </View>
            <Text style={styles.currentValue}>
              {field.label.replace(':', '')}: {formData[field.id] ? 'Yes' : 'No'}
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  const groupedFields = formFields.reduce((acc: any, field: any) => {
    if (!acc[field.section]) {
      acc[field.section] = [];
    }
    acc[field.section].push(field);
    return acc;
  }, {});

  const isEditing = !!formData.id;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>FRC Scouting Form</Text>

        <Text style={styles.formModeText}>
          {isEditing ? `Editing Form for Team: ${formData.teamNumber || 'N/A'}` : 'New Form Entry'}
        </Text>

        {Object.keys(groupedFields).map(sectionTitle => (
          <View key={sectionTitle} style={styles.section}>
            <Text style={styles.sectionTitle}>{sectionTitle}</Text>
            {groupedFields[sectionTitle].map((field: any) => renderField(field))}
          </View>
        ))}

        {/* Action Buttons Container */}
        <View style={styles.actionButtonRow}>
          {/* Submit/Update Button */}
          <TouchableOpacity
            style={[styles.actionButton, styles.submitButton]}
            onPress={() => onSubmit(formData)}
          >
            <FontAwesome
              name={isEditing ? "save" : "check"} // Save icon for update, check for submit
              size={24}
              color="#ffffff"
            />
            <Text style={styles.actionButtonText}>
              {isEditing ? "Update" : "Submit"}
            </Text>
          </TouchableOpacity>

          {isEditing && (
            <>
              {/* Cancel Edit Button */}
              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={onCancelEdit}
              >
                <FontAwesome name="times" size={24} color="#ffffff" /> {/* Times icon for cancel */}
                <Text style={styles.actionButtonText}>Cancel</Text>
              </TouchableOpacity>

              {/* Delete Form Button */}
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={confirmDelete}
              >
                <FontAwesome name="trash" size={24} color="#ffffff" /> {/* Trash icon for delete */}
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

      </ScrollView>

      {/* Delete Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleDeleteCancelled}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Confirm Deletion</Text>
            <Text style={styles.modalText}>Are you sure you want to delete this form?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.buttonCancel]}
                onPress={handleDeleteCancelled}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.buttonDelete]}
                onPress={handleDeleteConfirmed}
              >
                <Text style={styles.textStyle}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
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
  formModeText: {
    fontSize: 18,
    color: '#4a5568',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#edf2f7',
    paddingBottom: 10,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#4a5568',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderColor: '#cbd5e0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#2d3748',
    backgroundColor: '#f7fafc',
  },
  currentValue: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 10,
    fontStyle: 'italic',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  actionButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    marginBottom: 10, 
    paddingHorizontal: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'column', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    marginHorizontal: 2,
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#6b7280',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
  },
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
    marginBottom: 15,
    color: '#2d3748',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#4a5568',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#6b7280',
  },
  buttonDelete: {
    backgroundColor: '#ef4444',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
